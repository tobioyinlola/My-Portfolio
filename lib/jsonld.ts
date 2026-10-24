import { site } from "@/config/site";
import { isoDuration } from "@/lib/utils";
import type { VideoMeta } from "@/lib/schemas";

const abs = (path: string) => new URL(path, site.url).toString();

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    url: site.url,
    jobTitle: site.jobTitle,
    description: site.description,
    image: abs("/avatar.svg"),
    sameAs: [site.links.linkedin, site.links.x, site.links.youtube, site.links.github],
  };
}

export function articleJsonLd(args: { title: string; description: string; path: string; date: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.title,
    description: args.description,
    datePublished: args.date,
    dateModified: args.date,
    mainEntityOfPage: abs(args.path),
    image: abs(`/api/og?title=${encodeURIComponent(args.title.slice(0, 120))}`),
    author: { "@type": "Person", name: site.fullName, url: site.url },
  };
}

export function videoJsonLd(args: { slug: string; meta: VideoMeta }) {
  const { meta } = args;
  const embed = `https://www.youtube-nocookie.com/embed/${meta.youtubeId}`;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: meta.title,
    description: meta.summary,
    thumbnailUrl: [`https://i.ytimg.com/vi/${meta.youtubeId}/maxresdefault.jpg`, `https://i.ytimg.com/vi/${meta.youtubeId}/hqdefault.jpg`],
    uploadDate: meta.publishedAt,
    duration: isoDuration(meta.durationSeconds),
    embedUrl: embed,
    contentUrl: `https://www.youtube.com/watch?v=${meta.youtubeId}`,
    url: abs(`/videos/${args.slug}`),
    publisher: { "@type": "Person", name: site.fullName, url: site.url },
    hasPart: meta.chapters.map((c, i) => ({
      "@type": "Clip",
      name: c.label,
      startOffset: c.t,
      endOffset: meta.chapters[i + 1]?.t ?? meta.durationSeconds,
      url: `https://www.youtube.com/watch?v=${meta.youtubeId}&t=${c.t}s`,
    })),
  };
}
