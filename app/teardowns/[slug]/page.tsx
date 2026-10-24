import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findBySlug, getTeardowns, headings } from "@/lib/content";
import { articleJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { ArticleShell } from "@/components/content/article-shell";
import { Mdx } from "@/components/content/mdx";
import { JsonLd } from "@/components/ui/json-ld";
import { Button } from "@/components/ui/button";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getTeardowns().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const t = findBySlug(getTeardowns(), slug);
  if (!t) return {};
  return pageMetadata({ title: t.meta.title, description: t.meta.summary, path: `/teardowns/${slug}`, kicker: `Teardown · ${t.meta.industry}`, type: "article", publishedTime: t.meta.date });
}

export default async function TeardownPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const t = findBySlug(getTeardowns(), slug);
  if (!t) notFound();
  const { meta } = t;

  return (
    <>
      <JsonLd data={articleJsonLd({ title: meta.title, description: meta.summary, path: `/teardowns/${slug}`, date: meta.date })} />
      <ArticleShell
        backHref="/teardowns"
        backLabel="All teardowns"
        accent={meta.accent}
        kicker={`Teardown · ${meta.industry}`}
        title={meta.title}
        subtitle={meta.summary}
        toc={headings(t.body)}
        header={
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {meta.metricsToTrack.map((m) => (
              <span key={m} className="rounded-full border-2 border-current px-3 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-wider">
                Track: {m}
              </span>
            ))}
            {meta.prototypeUrl && (
              <Button href={meta.prototypeUrl} size="sm" variant="cream" target="_blank" rel="noopener noreferrer">
                Open the prototype ↗
              </Button>
            )}
          </div>
        }
      >
        <Mdx source={t.body} />
      </ArticleShell>
    </>
  );
}
