export const siteConfig = {
  name: 'Ben Shoemaker',
  title: 'Ben Shoemaker — AI-Assisted Development',
  description:
    'Personal site and thought leadership platform for Ben Shoemaker — AI-assisted development practitioner, builder, and consultant.',
  url: 'https://benshoemaker.us',
  ogImage: '/og-default.png',

  author: {
    name: 'Ben Shoemaker',
    email: 'ben@benshoemaker.us', // Replace with actual email
    calendarUrl: 'https://calendar.google.com/calendar/appointments/...', // Replace with actual booking link
  },

  social: {
    github: 'https://github.com/benjaminshoemaker',
    linkedin: 'https://linkedin.com/in/benjaminshoemaker',
    twitter: 'https://x.com/benjaminshoemaker',
  },

  nav: [
    { label: 'Home', href: '/' },
    { label: 'Writing', href: '/writing' },
    { label: 'Projects', href: '/projects' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
  ],
} as const;
