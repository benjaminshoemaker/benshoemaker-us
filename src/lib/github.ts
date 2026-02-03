import { GITHUB_TOKEN } from 'astro:env/server';

export interface GitHubStats {
  contributionsThisYear: number;
  topLanguages: { name: string; percentage: number }[];
}

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

export async function fetchGitHubStats(username: string): Promise<GitHubStats | null> {
  const token = GITHUB_TOKEN;
  if (!token) {
    console.warn('GITHUB_TOKEN not set — skipping GitHub stats');
    return null;
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query($username: String!) {
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
          }
        `,
        variables: { username },
      }),
    });

    if (!response.ok) {
      console.warn(`GitHub API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const user = data.data?.user;

    if (!user) {
      console.warn('GitHub user not found');
      return null;
    }

    // Aggregate languages across repos
    const langMap = new Map<string, number>();
    for (const repo of user.repositories.nodes) {
      for (const edge of repo.languages?.edges || []) {
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

    return {
      contributionsThisYear: user.contributionsCollection.contributionCalendar.totalContributions,
      topLanguages,
    };
  } catch (error) {
    console.warn('Failed to fetch GitHub stats:', error);
    return null;
  }
}
