// General site content. Edit freely.

export const site = {
  name: 'Abhi Ram',
  initials: 'AR',
  location: 'Bengaluru, India',
  photo: 'profile.jpg', // lives in /public — replace the file to change the photo
  updated: 'October 2026', // bump this when you change something
};

export const navLinks = [
  { id: 'work', label: 'Work' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const hero = {
  // The headline is split so the second half can be set in italic accent.
  headline: ['I build ML systems that work', 'outside the notebook.'],
  intro:
    "Final-year AI & Data Science student at VTU, Bengaluru. I've written an object detector from scratch, shipped a full-stack app that flags anomalies in real time, and trained an RL trading agent at a hackathon. Right now I'm going deeper on PyTorch and agentic AI.",
  available: 'Open to ML/AI roles and internships',
};

// Short facts shown in a row under the hero.
export const facts = [
  { label: 'Based in', value: 'Bengaluru, India' },
  { label: 'Studying', value: 'AI & Data Science, VTU' },
  { label: 'Focus', value: 'Deep learning, RL, agents' },
  { label: 'Looking for', value: 'Roles & internships, remote or on-site' },
];

export const contact = {
  email: 'pabhiram356@gmail.com',
  links: [
    { type: 'email', label: 'Email', handle: 'pabhiram356@gmail.com', href: 'mailto:pabhiram356@gmail.com' },
    { type: 'linkedin', label: 'LinkedIn', handle: 'pathipati-abhiram', href: 'https://www.linkedin.com/in/pathipati-abhiram' },
    { type: 'github', label: 'GitHub', handle: 'abhiram35', href: 'https://github.com/abhiram35' },
  ],
};

// Contact form API (see /server). In dev, Vite proxies /api to the local server.
// For production builds, set VITE_API_URL to the deployed API, e.g. https://portfolio-api.onrender.com
// With neither, the form falls back to opening the visitor's mail client with a prefilled message.
const apiBase = import.meta.env.VITE_API_URL;
export const CONTACT_ENDPOINT = apiBase
  ? `${apiBase.replace(/\/$/, '')}/api/contact`
  : import.meta.env.DEV
    ? '/api/contact'
    : '';
