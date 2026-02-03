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
    githubUrl: 'https://github.com/benjaminshoemaker/vibecode_spec_generator',
    liveUrl: 'https://vibescaffold.dev/',
    featured: true,
  },
  {
    name: 'AI Coding Project Base',
    description: 'Structured prompt framework for building software products with AI coding assistants — guides you through specification, technical design, and implementation planning.',
    techStack: ['Shell', 'Markdown'],
    githubUrl: 'https://github.com/benjaminshoemaker/ai_coding_project_base',
    liveUrl: 'https://benjaminshoemaker.github.io/ai_coding_project_base/',
    featured: false,
  },
  {
    name: 'Notes Brain',
    description: 'Second brain for everyone who just can\'t get by with one.',
    techStack: ['TypeScript', 'PostgreSQL'],
    githubUrl: 'https://github.com/benjaminshoemaker/notes_brain',
    liveUrl: 'https://notes-brain-web.vercel.app',
    featured: false,
  },
  {
    name: 'Simple QR Code Generator',
    description: 'An honest QR code generator — free static codes and no-hostage dynamic codes that never expire.',
    techStack: ['TypeScript'],
    githubUrl: 'https://github.com/benjaminshoemaker/simple-qr-code-generator',
    liveUrl: 'https://simple-qr-code-generator-gamma.vercel.app',
    featured: false,
  },
  {
    name: 'LetGo',
    description: 'AI-powered mobile web app — photograph items you want to get rid of and get recommendations to sell, donate, recycle, or dispose with estimated value and next steps.',
    techStack: ['TypeScript', 'AI Vision'],
    githubUrl: 'https://github.com/benjaminshoemaker/letgo',
    liveUrl: 'https://letgo-delta.vercel.app',
    featured: false,
  },
  {
    name: 'Tally Analytics',
    description: 'Privacy-friendly analytics platform with real-time dashboards.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL'],
    githubUrl: 'https://github.com/benjaminshoemaker/tally_analytics',
    liveUrl: 'https://usetally.xyz',
    featured: true,
  },
  {
    name: 'NFL Game Explainer',
    description: 'Pulls NFL play-by-play data from ESPN and generates advanced analytics reports with success rate, explosive plays, and win probability deltas.',
    techStack: ['Python', 'TypeScript'],
    githubUrl: 'https://github.com/benjaminshoemaker/nfl_game_explainer',
    liveUrl: 'https://windelta.app/',
    featured: false,
  },
  {
    name: 'Job Seeker Toolkit',
    description: 'Open source tools and curated reviews to help job seekers navigate the market.',
    techStack: ['TypeScript', 'CSS', 'Docker'],
    githubUrl: 'https://github.com/benjaminshoemaker/job_seeker_toolkit',
    featured: false,
  },
];
