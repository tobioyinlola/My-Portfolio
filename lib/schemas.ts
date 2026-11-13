import { z } from "zod";
import { howToTags, videoSeries } from "@/lib/taxonomy";

export const accentSchema = z.enum(["cobalt", "mustard", "terracotta", "forest", "lilac"]);
export type Accent = z.infer<typeof accentSchema>;

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");

export const metricSchema = z.object({ label: z.string(), value: z.string() });

export const caseStudySchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  outcomeHeadline: z.string(),
  accent: accentSchema,
  role: z.string(),
  timeline: z.string(),
  team: z.string(),
  stack: z.array(z.string()).min(1),
  status: z.string(),
  metrics: z.array(metricSchema).min(1),
  date: isoDate,
  order: z.number().int(),
  /** Public path under /public, e.g. /work/tiaago.png. Omit to show a placeholder frame. */
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
});
export type CaseStudyMeta = z.infer<typeof caseStudySchema>;

export const teardownSchema = z.object({
  title: z.string(),
  product: z.string(),
  industry: z.string(),
  summary: z.string(),
  metricsToTrack: z.array(z.string()).min(1),
  hasPrototype: z.boolean().default(false),
  prototypeUrl: z.string().optional(),
  accent: accentSchema,
  date: isoDate,
});
export type TeardownMeta = z.infer<typeof teardownSchema>;

export const howToSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  tags: z.array(z.enum(howToTags)).min(1),
  accent: accentSchema,
  date: isoDate,
});
export type HowToMeta = z.infer<typeof howToSchema>;

export const videoSchema = z.object({
  title: z.string(),
  summary: z.string(),
  /** YouTube video id. Use "PLACEHOLDER" until the video is live. */
  youtubeId: z.string(),
  series: z.enum(videoSeries),
  durationSeconds: z.number().int().positive(),
  publishedAt: isoDate,
  featured: z.boolean().default(false),
  accent: accentSchema,
  chapters: z.array(z.object({ t: z.number().int().nonnegative(), label: z.string() })).min(1),
  related: z
    .object({
      teardown: z.string().optional(),
      howTo: z.string().optional(),
      caseStudy: z.string().optional(),
    })
    .default({}),
});
export type VideoMeta = z.infer<typeof videoSchema>;

