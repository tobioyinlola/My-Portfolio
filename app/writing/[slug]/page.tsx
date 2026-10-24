import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findBySlug, getHowTos, headings } from "@/lib/content";
import { articleJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { ArticleShell } from "@/components/content/article-shell";
import { Mdx } from "@/components/content/mdx";
import { JsonLd } from "@/components/ui/json-ld";
import { formatDate } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getHowTos().map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const h = findBySlug(getHowTos(), slug);
  if (!h) return {};
  return pageMetadata({ title: h.meta.title, description: h.meta.excerpt, path: `/writing/${slug}`, kicker: "How-to", type: "article", publishedTime: h.meta.date });
}

export default async function HowToPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const h = findBySlug(getHowTos(), slug);
  if (!h) notFound();
  const { meta } = h;

  return (
    <>
      <JsonLd data={articleJsonLd({ title: meta.title, description: meta.excerpt, path: `/writing/${slug}`, date: meta.date })} />
      <ArticleShell
        backHref="/writing"
        backLabel="All writing"
        accent={meta.accent}
        kicker={`How-to · ${h.minutes} min read · ${formatDate(meta.date)}`}
        title={meta.title}
        subtitle={meta.excerpt}
        toc={headings(h.body)}
        header={
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tags">
            {meta.tags.map((t) => (
              <li key={t} className="rounded-full border-2 border-current px-3 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-wider">
                {t}
              </li>
            ))}
          </ul>
        }
      >
        <Mdx source={h.body} />
      </ArticleShell>
    </>
  );
}
