import type { Accent } from "@/lib/schemas";

export interface DiagramNode {
  id: string;
  label: string;
  sub?: string;
  /** Column (0 = left) and row within the diagram grid. */
  col: number;
  row: number;
  accent: Accent;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

export interface BuiltProject {
  slug: string;
  name: string;
  tagline: string;
  accent: Accent;
  status: string;
  stack: readonly string[];
  deployment: readonly string[];
  notes: readonly string[];
  nodes: readonly DiagramNode[];
  edges: readonly DiagramEdge[];
  caseStudy: string;
}

/** Architecture shown here is drawn from what each case study states; it is a product-level view, not a vendor diagram. */
export const builtProjects: readonly BuiltProject[] = [
  {
    slug: "bitstac",
    name: "Bitstac",
    tagline: "Blockchain-enabled trade finance, China to Africa",
    accent: "cobalt",
    status: "$45M+ monthly volume",
    stack: ["USDT and USDC stablecoin rails", "Wallet architecture and on-chain transaction flows", "Tiered KYB with AML screening and fraud checks", "API integrations for enterprise clients"],
    deployment: ["Remote, cross-border team", "Enterprise early-access clients first", "Scaled through African SME and trade-network partnerships"],
    notes: ["Compliance checkpoints are part of the flow, which cut onboarding risk without a separate review queue.", "Stablecoin settlement trades FX friction for custody and on-chain design decisions.", "Trade-offs on reliability and scale were made with engineering, not handed over."],
    nodes: [
      { id: "sme", label: "SME / importer", sub: "Onboarding", col: 0, row: 1, accent: "cobalt" },
      { id: "kyb", label: "Tiered KYB", sub: "Fraud, AML, security", col: 1, row: 1, accent: "mustard" },
      { id: "wallet", label: "Wallet layer", sub: "Custody, on-chain flows", col: 2, row: 0, accent: "terracotta" },
      { id: "rails", label: "Stablecoin rails", sub: "USDT / USDC", col: 3, row: 1, accent: "forest" },
      { id: "api", label: "Trade finance API", sub: "Enterprise integration", col: 2, row: 2, accent: "lilac" },
    ],
    edges: [
      { from: "sme", to: "kyb" },
      { from: "kyb", to: "wallet" },
      { from: "kyb", to: "api" },
      { from: "wallet", to: "rails" },
    ],
    caseStudy: "bitstac",
  },
  {
    slug: "tiaago",
    name: "Tiaago",
    tagline: "AI-powered B2B recruitment suite",
    accent: "terracotta",
    status: "Launched",
    stack: ["ML model integration for screening and skill assessment", "Sourcing index of 850M talent profiles", "Pipeline as a Service: embeddable hiring pipelines", "Usage-based and subscription billing"],
    deployment: ["B2B platform sold to recruiting teams", "Partner integrations with HR and EdTech communities", "Embedded delivery through client products"],
    notes: ["Sourcing at scale is a data-pipeline problem before it is an AI problem.", "Pipeline as a Service turned a feature into a platform clients build on.", "Pricing was designed alongside architecture so usage cost mapped to revenue."],
    nodes: [
      { id: "client", label: "Recruiters / clients", sub: "Web and embedded", col: 0, row: 1, accent: "cobalt" },
      { id: "api", label: "Platform API", sub: "Pipeline as a Service", col: 1, row: 1, accent: "mustard" },
      { id: "ml", label: "ML screening", sub: "Resume and skill scoring", col: 2, row: 0, accent: "terracotta" },
      { id: "billing", label: "Pricing engine", sub: "Subscription and usage", col: 2, row: 2, accent: "lilac" },
      { id: "data", label: "Talent index", sub: "850M profiles", col: 3, row: 1, accent: "forest" },
    ],
    edges: [
      { from: "client", to: "api" },
      { from: "api", to: "ml" },
      { from: "api", to: "billing" },
      { from: "ml", to: "data" },
    ],
    caseStudy: "tiaago",
  },
  {
    slug: "cover-founder",
    name: "Cover Founder",
    tagline: "AI newsroom for founders",
    accent: "lilac",
    status: "Live",
    stack: ["React · TypeScript · Vite", "FastAPI · Postgres · Redis", "Remotion · HeyGen · LiveKit", "LLMs · Stripe"],
    deployment: ["Railway and Vercel", "Versioned production rulebook with saved reference videos", "Queue to keep video production fair under load"],
    notes: ["Founder approval comes before charging, which protects trust.", "Distribution catalogue availability is kept separate from confirmed placement.", "Credits, refunds and referrals are recorded in a full ledger."],
    nodes: [
      { id: "web", label: "Web app", sub: "Interview and approval", col: 0, row: 1, accent: "cobalt" },
      { id: "api", label: "API", sub: "FastAPI", col: 1, row: 1, accent: "mustard" },
      { id: "agent", label: "Interview agent", sub: "LiveKit + LLMs", col: 2, row: 0, accent: "terracotta" },
      { id: "video", label: "Video pipeline", sub: "Remotion + HeyGen", col: 2, row: 2, accent: "lilac" },
      { id: "db", label: "Postgres + Redis", sub: "Ledger, queue", col: 3, row: 1, accent: "forest" },
    ],
    edges: [
      { from: "web", to: "api" },
      { from: "api", to: "agent" },
      { from: "api", to: "video" },
      { from: "api", to: "db" },
    ],
    caseStudy: "cover-founder",
  },
];
