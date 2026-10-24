import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findBySlug, getCaseStudies, getHowTos, getTeardowns, getVideos, splitTranscript } from "@/lib/content";
import { videoJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { CtaBlock } from "@/components/content/cta-block";
import { Mdx } from "@/components/content/mdx";
import { JsonLd } from "@/components/ui/json-ld";
import { MonoPill } from "@/components/ui/pill";
import { VideoPlayer } from "@/components/video/video-player";
import { SubscribeLink } from "@/components/video/subscribe-link";
import { clock, formatDate } from "@/lib/utils";
import { isPlaceholderVideo, watchUrl } from "@/lib/youtube";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getVideos().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const v = findBySlug(getVideos(), slug);
  if (!v) return {};
  return pageMetadata({ title: v.meta.title, description: v.meta.summary, path: `/videos/${slug}`, kicker: `Video · ${v.meta.series}`, type: "article", publishedTime: v.meta.publishedAt });
}

export default async function VideoPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const v = findBySlug(getVideos(), slug);
  if (!v) notFound();
  const { meta } = v;
  const { prose, transcript } = splitTranscript(v.body);

  const related: { label: string; title: string; href: string }[] = [];
  const td = meta.related.teardown && findBySlug(getTeardowns(), meta.related.teardown);
  const ht = meta.related.howTo && findBySlug(getHowTos(), meta.related.howTo);
  const cs = meta.related.caseStudy && findBySlug(getCaseStudies(), meta.related.caseStudy);
  if (td) related.push({ label: "Teardown", title: td.meta.title, href: `/teardowns/${td.slug}` });
  if (ht) related.push({ label: "How-to", title: ht.meta.title, href: `/writing/${ht.slug}` });
  if (cs) related.push({ label: "Case study", title: `${cs.meta.title}: ${cs.meta.subtitle}`, href: `/work/${cs.slug}` });

  return (
    <article className="px-4 pb-8 pt-10 sm:px-6">
      {/* Placeholder ids have no real video yet, so don't advertise them to search engines. */}
      {!isPlaceholderVideo(meta.youtubeId) && <JsonLd data={videoJsonLd({ slug, meta })} />}
      <div className="mx-auto max-w-6xl">
        <Link href="/videos" className="font-mono text-xs font-semibold uppercase tracking-widest underline-offset-4 hover:underline">
          ← All videos
        </Link>
        <header className="mt-5 flex flex-col gap-3">
          <MonoPill className="self-start">{meta.series}</MonoPill>
          <h1 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">{meta.title}</h1>
          <p className="max-w-3xl text-xl text-muted">{meta.summary}</p>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted">
            {formatDate(meta.publishedAt)} · {clock(meta.durationSeconds)}
          </p>
        </header>

        <div className="mt-8">
          <VideoPlayer meta={meta} showChapters />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <SubscribeLink />
          {!isPlaceholderVideo(meta.youtubeId) && (
            <a href={watchUrl(meta.youtubeId)} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline underline-offset-4">
              Watch on YouTube ↗
            </a>
          )}
          <a href={site.links.youtube} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline underline-offset-4">
            Channel ↗
          </a>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="min-w-0 max-w-3xl">
            {prose && <Mdx source={prose} />}

            <section aria-labelledby="timestamps" className="mt-10">
              <h2 id="timestamps" className="font-display text-3xl font-extrabold tracking-tight">
                Timestamps
              </h2>
              <ol className="mt-4 space-y-1 font-mono text-sm">
                {meta.chapters.map((c) => (
                  <li key={c.t}>
                    <span className="font-semibold tabular-nums">{clock(c.t)}</span> {c.label}
                  </li>
                ))}
              </ol>
            </section>

            {transcript && (
              <details className="mt-10 rounded-2xl border-2 border-line bg-surface p-5">
                <summary className="cursor-pointer font-display text-2xl font-extrabold tracking-tight">Full transcript</summary>
                <div className="mt-4 max-h-[32rem] overflow-auto pr-2" data-lenis-prevent>
                  <Mdx source={transcript} />
                </div>
              </details>
            )}
          </div>

          {related.length > 0 && (
            <aside aria-label="Related" className="self-start rounded-2xl border-2 border-line bg-surface p-5">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-widest">Related</h2>
              <ul className="mt-3 space-y-4">
                {related.map((r) => (
                  <li key={r.href}>
                    <span className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">{r.label}</span>
                    <Link href={r.href} className="block font-display text-lg font-bold leading-tight underline decoration-2 underline-offset-4">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>

        <div className="mx-auto max-w-3xl">
          <CtaBlock />
        </div>
      </div>
    </article>
  );
}
