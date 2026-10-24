export type AudienceId = "hire" | "build" | "fractional";

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
    label: "Hire a PM full-time",
    reason: "Full-time role",
    headline: "A PM who can read the spec and the stack trace.",
    body: "[Replace: two sentences on what you bring to a full-time AI/Technical PM seat — scope you have owned, the teams you have worked with, the kind of company you want to join.]",
    bullets: ["[Strength 1: e.g. 0→1 AI features]", "[Strength 2: e.g. evals & guardrails]", "[Strength 3: e.g. shipping with engineers]"],
    cta: "Book an intro call",
  },
  {
    id: "build",
    label: "Get a product built or led",
    reason: "Product build / leadership",
    headline: "From fuzzy idea to deployed product.",
    body: "[Replace: describe how you take a product from discovery through design to a live deployment, and what an engagement looks like — timeline, team shape, deliverables.]",
    bullets: ["[Deliverable 1: e.g. spec & architecture]", "[Deliverable 2: e.g. working prototype]", "[Deliverable 3: e.g. production launch]"],
    cta: "Scope a build",
  },
  {
    id: "fractional",
    label: "Fractional / advisory",
    reason: "Fractional / advisory",
    headline: "Senior product judgment, a few days a month.",
    body: "[Replace: describe the advisory/fractional offer — what you review, how often you meet, the decisions you help unblock for AI product teams.]",
    bullets: ["[Offer 1: e.g. AI roadmap review]", "[Offer 2: e.g. eval strategy]", "[Offer 3: e.g. PM coaching]"],
    cta: "Talk fractional",
  },
];
