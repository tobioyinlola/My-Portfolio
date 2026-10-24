import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findBySlug, getCaseStudies, headings } from "@/lib/content";
import { articleJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { accentClass } from "@/lib/accent";
import { ArticleShell } from "@/components/content/article-shell";
import { Mdx } from "@/components/content/mdx";
import { JsonLd } from "@/components/ui/json-ld";
import { ScreenshotFrame } from "@/components/ui/screenshot-frame";
import { cn } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = findBySlug(getCaseStudies(), slug);
  if (!cs) return {};
  return pageMetadata({ title: `${cs.meta.title}: ${cs.meta.subtitle}`, description: cs.meta.outcomeHeadline, path: `/work/${slug}`, kicker: "Case study", type: "article", publishedTime: cs.meta.date });
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const all = getCaseStudies();
  const index = all.findIndex((c) => c.slug === slug);
  const cs = all[index];
  if (!cs) notFound();
  const next = all[(index + 1) % all.length];
  const { meta } = cs;

  const summary: [string, string][] = [
    ["Role", meta.role],
    ["Timeline", meta.timeline],
    ["Team", meta.team],
    ["Stack", meta.stack.join(" · ")],
    ["Status", meta.status],
  ];

  return (
    <>
      <JsonLd data={articleJsonLd({ title: meta.title, description: meta.outcomeHeadline, path: `/work/${slug}`, date: meta.date })} />
      <ArticleShell
        backHref="/#work"
        backLabel="All work"
        accent={meta.accent}
        kicker={`Case study · ${meta.subtitle}`}
        title={meta.title}
        subtitle={meta.outcomeHeadline}
        toc={headings(cs.body)}
        header={
          <>
            <dl className="mt-8 grid gap-x-8 gap-y-4 border-t-2 border-current pt-6 sm:grid-cols-2 lg:grid-cols-5">
              {summary.map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-widest">{k}</dt>
                  <dd className="mt-1 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Key metrics">
              {meta.metrics.map((m) => (
                <li key={m.label} className="rounded-full border-2 border-current px-3 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-wider">
                  {m.label}: {m.value}
                </li>
              ))}
            </ul>
          </>
        }
        after={
          next && next.slug !== slug ? (
            <Link
              href={`/work/${next.slug}`}
              className={cn("group mt-4 flex flex-wrap items-center justify-between gap-6 rounded-3xl border-2 border-line p-6 shadow-[0_6px_0_var(--line)] transition-transform hover:-translate-y-1 sm:p-8", accentClass[next.meta.accent])}
            >
              <span>
                <span className="block font-mono text-xs font-semibold uppercase tracking-widest">Next case study</span>
                <span className="mt-1 block font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {next.meta.title} <span aria-hidden>→</span>
                </span>
                <span className="mt-1 block">{next.meta.subtitle}</span>
              </span>
              <ScreenshotFrame label={`[${next.meta.title.toUpperCase()}]`} tilt={3} className="max-w-[12rem]" />
            </Link>
          ) : null
        }
      >
        <Mdx source={cs.body} />
      </ArticleShell>
    </>
  );
}
