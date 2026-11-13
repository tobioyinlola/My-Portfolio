import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getCaseStudies, getHowTos, getTeardowns } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (p: string) => new URL(p, site.url).toString();
  return [
    { url: abs("/"), changeFrequency: "monthly", priority: 1 },
    { url: abs("/writing"), changeFrequency: "weekly", priority: 0.8 },
    { url: abs("/teardowns"), changeFrequency: "weekly", priority: 0.8 },
    ...getCaseStudies().map((c) => ({ url: abs(`/work/${c.slug}`), lastModified: c.meta.date, priority: 0.9 })),
    ...getTeardowns().map((t) => ({ url: abs(`/teardowns/${t.slug}`), lastModified: t.meta.date, priority: 0.7 })),
    ...getHowTos().map((h) => ({ url: abs(`/writing/${h.slug}`), lastModified: h.meta.date, priority: 0.7 })),
  ];
}
