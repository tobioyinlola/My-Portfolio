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

/**
 * Architecture here is a generic layered placeholder. Replace node labels, stack and
 * deployment notes with what is actually running in production.
 */
export const builtProjects: readonly BuiltProject[] = [
  {
    slug: "tiaago",
    name: "Tiaago",
    tagline: "AI recruitment platform",
    accent: "cobalt",
    status: "[STATUS: e.g. Live]",
    stack: ["[Frontend]", "[API]", "[LLM provider]", "[Database]", "[Queue / jobs]"],
    deployment: ["[Hosting: e.g. Vercel + managed DB]", "[CI/CD: e.g. GitHub Actions]", "[Observability: logs, traces, eval dashboards]"],
    notes: ["[Why this architecture: one sentence.]", "[Biggest technical trade-off you made.]", "[What you would change at 10× scale.]"],
    nodes: [
      { id: "web", label: "Web app", sub: "[Frontend]", col: 0, row: 1, accent: "cobalt" },
      { id: "api", label: "API layer", sub: "[Backend]", col: 1, row: 1, accent: "mustard" },
      { id: "llm", label: "LLM gateway", sub: "[Model(s)]", col: 2, row: 0, accent: "terracotta" },
      { id: "evals", label: "Eval harness", sub: "[Offline + online]", col: 2, row: 2, accent: "lilac" },
      { id: "db", label: "Datastore", sub: "[DB / vectors]", col: 3, row: 1, accent: "forest" },
    ],
    edges: [
      { from: "web", to: "api" },
      { from: "api", to: "llm" },
      { from: "api", to: "evals" },
      { from: "api", to: "db" },
    ],
    caseStudy: "tiaago",
  },
  {
    slug: "riskos",
    name: "RiskOS",
    tagline: "Financial risk intelligence API",
    accent: "terracotta",
    status: "[STATUS: e.g. Live]",
    stack: ["[API framework]", "[Data pipeline]", "[LLM provider]", "[Database]", "[Auth / rate limits]"],
    deployment: ["[Hosting: e.g. containers on managed cloud]", "[CI/CD]", "[Monitoring & audit logging]"],
    notes: ["[Why API-first.]", "[How outputs are validated before reaching customers.]", "[Latency and cost budget.]"],
    nodes: [
      { id: "client", label: "Customer systems", sub: "[Consumers]", col: 0, row: 1, accent: "cobalt" },
      { id: "gateway", label: "API gateway", sub: "[Auth, quotas]", col: 1, row: 1, accent: "mustard" },
      { id: "engine", label: "Risk engine", sub: "[Scoring + LLM]", col: 2, row: 0, accent: "terracotta" },
      { id: "guard", label: "Guardrails", sub: "[Validation]", col: 2, row: 2, accent: "lilac" },
      { id: "store", label: "Data store", sub: "[Sources + audit]", col: 3, row: 1, accent: "forest" },
    ],
    edges: [
      { from: "client", to: "gateway" },
      { from: "gateway", to: "engine" },
      { from: "gateway", to: "guard" },
      { from: "engine", to: "store" },
    ],
    caseStudy: "riskos",
  },
];
