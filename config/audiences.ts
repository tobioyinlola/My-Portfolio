export type AudienceId = "hire" | "recruit" | "advise";

export interface Audience {
  id: AudienceId;
  /** Label on the selector pill. */
  label: string;
  /** Pre-selects the reason in the contact form. */
  reason: string;
  headline: string;
  body: string;
  bullets: readonly string[];
  cta: string;
}

export const audiences: readonly Audience[] = [
  {
    id: "hire",
    label: "Hire me as a product leader",
    reason: "Senior / Lead / Head of Product role",
    headline: "A product leader who owns the funnel and reads the architecture.",
    body: "I have owned end-to-end consumer and SME funnels in regulated fintech, from onboarding and KYC through cross-border settlement and revenue. I work best where product, engineering and compliance have to move as one, and I am ready to step into Head of Product scope.",
    bullets: ["Scaled a platform past $45M in monthly volume", "Cut transaction fraud by 30% through KYC redesign", "0→1 launches across fintech, HR tech and SaaS"],
    cta: "Book an intro call",
  },
  {
    id: "recruit",
    label: "Recruiter or agency",
    reason: "Recruiter / agency opportunity",
    headline: "The short version, before you open the CV.",
    body: "Six years in product, five companies, four markets. Payments, cross-border, blockchain settlement and AI. Open to remote, hybrid and relocation. Targeting Senior, Lead, Director and Head of Product roles in fintech, payments, infrastructure and AI.",
    bullets: ["Fintech, payments, crypto and AI product", "Regulated and multi-market delivery", "Open to remote, hybrid and relocation"],
    cta: "Send a role",
  },
  {
    id: "advise",
    label: "Advisory or fractional",
    reason: "Advisory / fractional product leadership",
    headline: "Senior product judgment for teams scaling payments.",
    body: "Roadmaps, onboarding and KYC funnel design, cross-border and stablecoin product strategy, pricing and monetisation, and the operating rhythm that gets product and engineering shipping together. Focused engagements, clear decisions.",
    bullets: ["Onboarding and KYC/KYB funnel review", "Cross-border and stablecoin product strategy", "Roadmap, pricing and PM team coaching"],
    cta: "Talk advisory",
  },
];
