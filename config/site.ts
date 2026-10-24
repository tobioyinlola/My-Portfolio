/**
 * Single source of truth for identity, links and navigation.
 * Anything wrapped in [BRACKETS] is a placeholder you need to replace.
 */
export const site = {
  name: "Justus",
  fullName: "Justus [LAST NAME]",
  initials: "J",
  title: "Justus — AI Product Manager & Technical PM",
  description:
    "AI Product Manager and Technical PM with 5+ years of experience. I design, build and deploy real products — case studies, teardowns, how-tos and videos.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@[YOUR-DOMAIN]",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  jobTitle: "AI Product Manager & Technical PM",
  location: "[CITY, COUNTRY]",
  links: {
    linkedin: "https://www.linkedin.com/in/[YOUR-HANDLE]",
    x: "https://x.com/[YOUR-HANDLE]",
    youtube: "https://www.youtube.com/@[YOUR-CHANNEL]",
    github: "https://github.com/[YOUR-HANDLE]",
    resume: "/resume.pdf",
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: readonly NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Playground", href: "/#teardowns" },
  { label: "About", href: "/#experience" },
  { label: "Videos", href: "/videos" },
  { label: "Writing", href: "/writing" },
];

/** Home-page sections the command palette and nav can jump to. */
export const sections: readonly NavItem[] = [
  { label: "Selected work", href: "/#work" },
  { label: "What I work on", href: "/#focus" },
  { label: "Product teardowns", href: "/#teardowns" },
  { label: "How-to library", href: "/#how-tos" },
  { label: "Videos", href: "/#videos" },
  { label: "Built by me", href: "/#built" },
  { label: "Experience", href: "/#experience" },
  { label: "Word of mouth", href: "/#word-of-mouth" },
  { label: "Contact & booking", href: "/#contact" },
];
