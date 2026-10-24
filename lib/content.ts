import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import type { z } from "zod";
import {
  caseStudySchema,
  howToSchema,
  teardownSchema,
  videoSchema,
  type CaseStudyMeta,
  type HowToMeta,
  type TeardownMeta,
  type VideoMeta,
} from "@/lib/schemas";

const ROOT = path.join(process.cwd(), "content");

export interface Entry<T> {
  slug: string;
  meta: T;
  body: string;
  minutes: number;
}

export interface TocItem {
  id: string;
  title: string;
}

function loadDir<S extends z.ZodTypeAny>(dir: string, schema: S, requiredHeadings?: readonly string[]): Entry<z.infer<S>>[] {
  const folder = path.join(ROOT, dir);
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(folder, file), "utf8");
      const { data, content } = matter(raw);
      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        const issues = parsed.error.issues.map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`).join("\n");
        throw new Error(`Invalid frontmatter in content/${dir}/${file}\n${issues}`);
      }
      if (requiredHeadings) {
        const found = headings(content).map((h) => h.title);
        const missing = requiredHeadings.filter((h) => !found.includes(h));
        if (missing.length) {
          throw new Error(`content/${dir}/${file} is missing required sections: ${missing.join(", ")}`);
        }
      }
      return { slug, meta: parsed.data as z.infer<S>, body: content, minutes: Math.max(1, Math.ceil(readingTime(content).minutes)) };
    });
}

/** H2 headings outside code fences, with ids matching rehype-slug. */
export function headings(body: string): TocItem[] {
  const slugger = new GithubSlugger();
  let fenced = false;
  const items: TocItem[] = [];
  for (const line of body.split("\n")) {
    if (line.trim().startsWith("```")) fenced = !fenced;
    if (fenced) continue;
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m?.[1]) items.push({ id: slugger.slug(m[1]), title: m[1] });
  }
  return items;
}

export const CASE_STUDY_SECTIONS = [
  "Context and problem",
  "Who it's for",
  "Discovery and key insight",
  "Options considered and decisions",
  "AI approach",
  "What I built",
  "Outcomes",
  "What I'd do differently",
] as const;

export const TEARDOWN_SECTIONS = [
  "What it does well",
  "Where it breaks",
  "Metrics I'd track",
  "How I'd improve it",
] as const;

const byDateDesc = <T extends { meta: { date: string } }>(a: T, b: T) => b.meta.date.localeCompare(a.meta.date);

export function getCaseStudies(): Entry<CaseStudyMeta>[] {
  return loadDir("case-studies", caseStudySchema, CASE_STUDY_SECTIONS).sort((a, b) => a.meta.order - b.meta.order);
}

export function getTeardowns(): Entry<TeardownMeta>[] {
  return loadDir("teardowns", teardownSchema, TEARDOWN_SECTIONS).sort(byDateDesc);
}

export function getHowTos(): Entry<HowToMeta>[] {
  return loadDir("how-tos", howToSchema).sort(byDateDesc);
}

export function getVideos(): Entry<VideoMeta>[] {
  return loadDir("videos", videoSchema).sort((a, b) => b.meta.publishedAt.localeCompare(a.meta.publishedAt));
}

export function findBySlug<T>(entries: Entry<T>[], slug: string): Entry<T> | undefined {
  return entries.find((e) => e.slug === slug);
}

/** Split a video MDX body into summary prose and the transcript (everything after "## Transcript"). */
export function splitTranscript(body: string): { prose: string; transcript: string } {
  const idx = body.search(/^##\s+Transcript\s*$/m);
  if (idx === -1) return { prose: body, transcript: "" };
  return { prose: body.slice(0, idx).trim(), transcript: body.slice(idx).replace(/^##\s+Transcript\s*/m, "").trim() };
}
