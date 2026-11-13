import type { Accent } from "@/lib/schemas";

export interface ExperienceEntry {
  company: string;
  years: string;
  role: string;
  accent: Accent;
  highlights: readonly string[];
}

/** Newest first; the stack builds from the bottom (oldest) up. */
export const experience: readonly ExperienceEntry[] = [
  { company: "Campus Tech Founders", years: "2022 – Present", role: "Operational Lead · Mentored 1,000+ student innovators across Africa", accent: "forest", highlights: ["Facilitated ecosystem partnerships with Infinix, Cloudplexo and other tech stakeholders", "Organised startup, innovation and tech events on African campuses", "Mentored 1,000+ student innovators in product thinking and entrepreneurship"] },
  { company: "Bitstac", years: "Jan 2026 – Aug 2026", role: "Senior Product Manager · Canada (Remote)", accent: "cobalt", highlights: ["Scaled a blockchain-enabled trade finance platform to $45M+ in monthly transaction volume", "Integrated USDT and USDC stablecoin rails for fast, low-cost cross-border settlement", "Designed a tiered KYB flow with fraud detection, AML screening and cybersecurity checkpoints"] },
  { company: "Tiaago Technology", years: "Mar 2024 – Dec 2025", role: "Lead Product Manager · US / Colombia (Remote)", accent: "terracotta", highlights: ["Led an AI-powered B2B recruitment suite from ideation to launch", "Integrated a dataset of 850M talent profiles and launched Pipeline as a Service", "Cut recruiter time to shortlist by ~40%; designed subscription and usage-based pricing"] },
  { company: "Vurt", years: "Mar 2023 – Feb 2024", role: "Product Manager · Fintech", accent: "lilac", highlights: ["Led cross-border settlement and multi-currency exchange features across African and global markets", "Cut transaction-related fraud by 30% within 6 months through KYC and detection workflows", "Integrated real-time transaction processing APIs to reduce settlement delays"] },
  { company: "TellerOne", years: "Sep 2022 – Feb 2023", role: "Product Manager · Fintech", accent: "mustard", highlights: ["Launched the first mobile and web platforms from scratch, doubling daily active users in 3 months", "Improved payment success rates by 25% through backend optimisation and UX redesign", "Contributed to the company's $250K seed round with traction and a growth roadmap"] },
  { company: "TalentSync", years: "Sep 2021 – Mar 2022", role: "Product Manager (Volunteer) · SaaS Marketplace", accent: "forest", highlights: ["Designed a three-tier subscription model that lifted conversion by 45%", "Onboarded 10,000+ talents and built a Talent Vetting Engine for recruiter trust", "Established employer partnerships to grow verified opportunities"] },
  { company: "Myqpay", years: "Aug 2020 – Dec 2021", role: "Associate Product Manager · Fintech", accent: "cobalt", highlights: ["Shipped a secure payment gateway for freelancers that facilitated $300K+ in transactions", "Reduced merchant drop-off at critical funnel stages through feedback-led iteration", "Improved reliability by prioritising backend issues, cutting downtime"] },
];
