import { GITHUB_TOKEN } from 'astro:env/server';

export interface GitHubStats {
  contributionsThisYear: number;
  topLanguages: { name: string; percentage: number }[];
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionMonth {
  name: string;
  totalWeeks: number;
  firstDay: string;
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
  months: ContributionMonth[];
}

export interface RepoInfo {
  name: string;
  url: string;
  stargazerCount: number;
  pushedAt: string;
}

export interface RecentRepo {
  name: string;
  description: string | null;
  url: string;
  pushedAt: string;
  defaultBranchRef: {
    target: {
      messageHeadline: string;
      committedDate: string;
    };
  } | null;
}

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

// Module-level memoization to prevent duplicate API calls during dev hot-reloads
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string): T | undefined {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data as T;
  }
  cache.delete(key);
  return undefined;
}

function setCache(key: string, data: unknown): void {
  cache.set(key, { data, timestamp: Date.now() });
}

async function graphqlRequest(query: string, variables?: Record<string, unknown>): Promise<Record<string, unknown> | null> {
  const token = GITHUB_TOKEN;
  if (!token) {
    console.warn('GITHUB_TOKEN not set — skipping GitHub API call');
    return null;
  }

  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    console.warn(`GitHub API error: ${response.status}`);
    return null;
  }

  const json = await response.json();
  return json.data ?? null;
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats | null> {
  const cacheKey = `stats:${username}`;
  const cached = getCached<GitHubStats>(cacheKey);
  if (cached) return cached;

  try {
    const data = await graphqlRequest(
      `query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
          repositories(first: 100, ownerAffiliations: OWNER, orderBy: { field: STARGAZERS, direction: DESC }) {
            nodes {
              languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
                edges {
                  size
                  node { name }
                }
              }
            }
          }
        }
      }`,
      { username },
    );

    const user = (data as Record<string, unknown>)?.user as Record<string, unknown> | undefined;
    if (!user) {
      console.warn('GitHub user not found');
      return null;
    }

    const langMap = new Map<string, number>();
    const repos = (user.repositories as Record<string, unknown>)?.nodes as Record<string, unknown>[];
    for (const repo of repos) {
      const edges = ((repo.languages as Record<string, unknown>)?.edges || []) as { size: number; node: { name: string } }[];
      for (const edge of edges) {
        const current = langMap.get(edge.node.name) || 0;
        langMap.set(edge.node.name, current + edge.size);
      }
    }

    const totalSize = Array.from(langMap.values()).reduce((a, b) => a + b, 0);
    const topLanguages = Array.from(langMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, size]) => ({
        name,
        percentage: Math.round((size / totalSize) * 100),
      }));

    const contributionsCollection = user.contributionsCollection as Record<string, unknown>;
    const calendar = contributionsCollection.contributionCalendar as Record<string, unknown>;

    const result: GitHubStats = {
      contributionsThisYear: calendar.totalContributions as number,
      topLanguages,
    };

    setCache(cacheKey, result);
    return result;
  } catch (error) {
    console.warn('Failed to fetch GitHub stats:', error);
    return null;
  }
}

export async function fetchContributionCalendar(username: string): Promise<ContributionCalendar | null> {
  const cacheKey = `calendar:${username}`;
  const cached = getCached<ContributionCalendar>(cacheKey);
  if (cached) return cached;

  try {
    const data = await graphqlRequest(
      `query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
              months {
                name
                totalWeeks
                firstDay
              }
            }
          }
        }
      }`,
      { username },
    );

    const user = (data as Record<string, unknown>)?.user as Record<string, unknown> | undefined;
    if (!user) return null;

    const contributionsCollection = user.contributionsCollection as Record<string, unknown>;
    const calendar = contributionsCollection.contributionCalendar as ContributionCalendar;

    setCache(cacheKey, calendar);
    return calendar;
  } catch (error) {
    console.warn('Failed to fetch contribution calendar:', error);
    return null;
  }
}

export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
}

export async function fetchRepoDetails(
  username: string,
  githubUrls: string[],
): Promise<Map<string, RepoInfo> | null> {
  const cacheKey = `repoDetails:${username}:${githubUrls.sort().join(',')}`;
  const cached = getCached<Map<string, RepoInfo>>(cacheKey);
  if (cached) return cached;

  const parsed = githubUrls
    .map((url) => ({ url, parsed: parseGitHubUrl(url) }))
    .filter((entry): entry is { url: string; parsed: { owner: string; repo: string } } => entry.parsed !== null);

  if (parsed.length === 0) return null;

  // Build aliased query — sanitize alias names
  const fragments = parsed.map((entry) => {
    const alias = `repo_${entry.parsed.repo.replace(/[^a-zA-Z0-9_]/g, '_')}`;
    return `${alias}: repository(owner: "${entry.parsed.owner}", name: "${entry.parsed.repo}") {
      name
      url
      stargazerCount
      pushedAt
    }`;
  });

  const query = `query { ${fragments.join('\n')} }`;

  try {
    const data = await graphqlRequest(query);
    if (!data) return null;

    const result = new Map<string, RepoInfo>();
    for (const entry of parsed) {
      const alias = `repo_${entry.parsed.repo.replace(/[^a-zA-Z0-9_]/g, '_')}`;
      const repo = (data as Record<string, unknown>)[alias] as RepoInfo | null;
      if (repo) {
        result.set(entry.url, repo);
      }
    }

    setCache(cacheKey, result);
    return result;
  } catch (error) {
    console.warn('Failed to fetch repo details:', error);
    return null;
  }
}

export async function fetchRecentlyActiveRepos(
  username: string,
  count: number = 5,
): Promise<RecentRepo[] | null> {
  const cacheKey = `recentRepos:${username}:${count}`;
  const cached = getCached<RecentRepo[]>(cacheKey);
  if (cached) return cached;

  try {
    // Fetch more than needed to account for forks/archived filtering
    const data = await graphqlRequest(
      `query($username: String!, $first: Int!) {
        user(login: $username) {
          repositories(
            first: $first
            ownerAffiliations: OWNER
            orderBy: { field: PUSHED_AT, direction: DESC }
            privacy: PUBLIC
            isFork: false
          ) {
            nodes {
              name
              description
              url
              pushedAt
              isArchived
              defaultBranchRef {
                target {
                  ... on Commit {
                    messageHeadline
                    committedDate
                  }
                }
              }
            }
          }
        }
      }`,
      { username, first: count * 2 },
    );

    const user = (data as Record<string, unknown>)?.user as Record<string, unknown> | undefined;
    if (!user) return null;

    const repositories = (user.repositories as Record<string, unknown>)?.nodes as (RecentRepo & { isArchived: boolean })[];
    const filtered = repositories
      .filter((repo) => !repo.isArchived)
      .slice(0, count);

    const result: RecentRepo[] = filtered.map(({ isArchived: _, ...repo }) => repo);

    setCache(cacheKey, result);
    return result;
  } catch (error) {
    console.warn('Failed to fetch recently active repos:', error);
    return null;
  }
}

export function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) return diffYears === 1 ? '1 year ago' : `${diffYears} years ago`;
  if (diffMonths > 0) return diffMonths === 1 ? '1 month ago' : `${diffMonths} months ago`;
  if (diffDays > 0) return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  if (diffHours > 0) return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  if (diffMinutes > 0) return diffMinutes === 1 ? '1 minute ago' : `${diffMinutes} minutes ago`;
  return 'just now';
}
