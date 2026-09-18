export const site = {
  name: "Abhishek Kumar",
  url: "https://example.com",
  title: "Abhishek Kumar — notes and projects",
  description:
    "Work, writing, and personal stories from Abhishek Kumar, a backend software engineer.",
  oneLiner:
    "I write what I am thinking, and I keep a record of the software I am building.",
  location: "India",
  email: "abhishekkumar25802@gmail.com",
  now: "Building this site, reading DDIA and platform engineering, and looking for a full-time software role.",
  nav: [
    { href: "/writing", label: "Writing" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
  ],
  links: [
    { label: "GitHub", href: "" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/abhishek-kumar-88a6711aa/" },
    { label: "Resume", href: "" },
  ],
} as const;

export const areas = [
  {
    slug: "tech",
    label: "Tech",
    blurb: "Systems, code, and how software actually gets made.",
  },
  {
    slug: "ml",
    label: "ML",
    blurb: "Machine learning notes, experiments, and what I am learning next.",
  },
  {
    slug: "sports",
    label: "Sports",
    blurb: "Games, bodies, and the stories around them.",
  },
  {
    slug: "personal",
    label: "Personal life",
    blurb: "Family, days, and whatever does not fit a cleaner label.",
  },
] as const;

export type AreaSlug = (typeof areas)[number]["slug"];

export function publicLinks() {
  return site.links.filter((link) => link.href.trim().length > 0);
}
