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
    title: "Fintech & payments",
    icon: "bulb",
    accent: "mustard",
    blurb: "Money movement that is fast, compliant and trusted.",
    points: ["Cross-border payments and FX", "Stablecoin settlement (USDT, USDC)", "Multicurrency accounts and cards"],
  },
  {
    title: "Risk, KYC & compliance",
    icon: "doc",
    accent: "cobalt",
    blurb: "Compliance designed in, not bolted on.",
    points: ["Tiered KYC and KYB flows", "Fraud detection and AML screening", "Onboarding without the drop-off"],
  },
  {
    title: "Technical product leadership",
    icon: "cursor",
    accent: "terracotta",
    blurb: "Fluent with engineering on the decisions that matter.",
    points: ["API design and integrations", "Architecture and trade-off calls", "Data pipelines and ML integration"],
  },
  {
    title: "Strategy & growth",
    icon: "target",
    accent: "forest",
    blurb: "Roadmaps tied to revenue, retention and trust.",
    points: ["0→1 launches and go-to-market", "Pricing, ARR and monetisation", "Partnerships and ecosystem"],
  },
];
