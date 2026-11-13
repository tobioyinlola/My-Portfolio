/** Single source of truth for identity, links and navigation. */
export const site = {
  name: "Justus Oyinlola",
  fullName: "Justus Oyinlola",
  initials: "J",
  title: "Justus Oyinlola — Senior & Technical Product Manager",
  description:
    "Senior and Technical Product Manager with 6+ years taking products from idea to scale across fintech, blockchain, HR tech and AI. Owner of full product funnels in regulated, multi-market environments, including a platform scaled past $45M in monthly transaction volume.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_US",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "tobioyinlola16@gmail.com",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "https://cal.com/tobi-oyinlola-cesd2w/30min",
  jobTitle: "Senior Product Manager",
  location: "Lagos, Nigeria",
  links: {
    linkedin: "https://www.linkedin.com/in/justusoyinlola",
    /** Videos are hidden from the site until real uploads exist; this only serves the unlinked /videos pages. */
    youtube: "https://www.youtube.com/",
    resume: "/resume.pdf",
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: readonly NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Teardowns", href: "/#teardowns" },
  { label: "Experience", href: "/#experience" },
  { label: "Writing", href: "/writing" },
];

/** Home-page sections the command palette and nav can jump to. */
export const sections: readonly NavItem[] = [
  { label: "Selected work", href: "/#work" },
  { label: "What I lead", href: "/#focus" },
  { label: "Product teardowns", href: "/#teardowns" },
  { label: "How-to library", href: "/#how-tos" },
  { label: "Platforms I have shipped", href: "/#built" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact & booking", href: "/#contact" },
];
