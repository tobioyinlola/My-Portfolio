export const howToTags = [
  "AI PM",
  "PRDs",
  "Roadmapping",
  "Evals",
  "Shipping with Claude Code",
  "Discovery",
] as const;

export const videoSeries = ["Case study walkthroughs", "Teardowns", "How-tos", "Building in public"] as const;
export type VideoSeries = (typeof videoSeries)[number];
