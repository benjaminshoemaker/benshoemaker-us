export const siteConfig = {
  name: 'Ben Shoemaker',
  title: 'Ben Shoemaker — AI-Assisted Development',
  description:
    'Personal site and thought leadership platform for Ben Shoemaker — AI-assisted development practitioner, builder, and consultant.',
  url: 'https://benshoemaker.us',
  ogImage: '/og-default.png',

  author: {
    name: 'Ben Shoemaker',
    email: 'ben.shoemaker.xyz@gmail.com', // Replace with actual email
    calendarUrl: 'https://calendar.app.google/9bkLGHVSQdJ8j5uv9', // Replace with actual booking link
  },

  social: {
    github: 'https://github.com/benjaminshoemaker',
    linkedin: 'https://www.linkedin.com/in/benshoemaker000/',
    twitter: 'https://x.com/BensHasThoughts',
  },

  nav: [
    { label: 'Home', href: '/' },
    { label: 'Writing', href: '/writing' },
    { label: 'Projects', href: '/projects' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
  ],
} as const;
