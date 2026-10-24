import type { Accent } from "@/lib/schemas";
import type { PixelIconName } from "@/components/ui/pixel-icons";

export interface FocusArea {
  title: string;
  icon: PixelIconName;
  accent: Accent;
  blurb: string;
  points: readonly string[];
}

export const focusAreas: readonly FocusArea[] = [
  {
    title: "AI product management",
    icon: "bulb",
    accent: "mustard",
    blurb: "LLM features that survive contact with real users.",
    points: ["Evals and quality bars", "Guardrails and failure modes", "Cost / latency / quality trade-offs"],
  },
  {
    title: "Technical PM",
    icon: "doc",
    accent: "cobalt",
    blurb: "Specs engineers actually want to build from.",
    points: ["Specs, APIs and architecture", "Sequencing and scope", "Shipping alongside engineers"],
  },
  {
    title: "0→1 product building",
    icon: "cursor",
    accent: "terracotta",
    blurb: "Design to deployment, end to end.",
    points: ["Prototype fast, validate faster", "Build with modern AI tooling", "Deploy and iterate in public"],
  },
  {
    title: "Strategy & discovery",
    icon: "target",
    accent: "forest",
    blurb: "Finding the problem worth solving.",
    points: ["Customer discovery", "Roadmaps tied to outcomes", "Positioning and prioritisation"],
  },
];
