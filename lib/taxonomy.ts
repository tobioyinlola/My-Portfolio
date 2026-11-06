export const howToTags = [
  "AI PM",
  "PRDs",
  "Roadmapping",
  "Evals",
  "MVPs",
  "Adoption",
  "Launches",
] as const;

export const videoSeries = ["Case study walkthroughs", "Teardowns", "How-tos", "Building in public"] as const;
export type VideoSeries = (typeof videoSeries)[number];
