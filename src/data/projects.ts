export interface Project {
  name: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    name: 'VibeScaffold',
    description: 'AI coding toolkit for scaffolding projects with best practices built in.',
    techStack: ['TypeScript', 'Claude Code', 'Markdown'],
    githubUrl: 'https://github.com/benjaminshoemaker/vibescaffold',
    featured: true,
  },
  {
    name: 'Tally Analytics',
    description: 'Privacy-friendly analytics platform with real-time dashboards.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    liveUrl: 'https://tally-analytics.example.com',
    githubUrl: 'https://github.com/benjaminshoemaker/tally-analytics',
    featured: true,
  },
];
