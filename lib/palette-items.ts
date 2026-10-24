import "server-only";
import { sections } from "@/config/site";
import { getCaseStudies, getHowTos, getTeardowns, getVideos } from "@/lib/content";
import type { PaletteItem } from "@/lib/palette";

export function getPaletteItems(): PaletteItem[] {
  return [
    ...sections.map((s) => ({ id: `section-${s.href}`, label: s.label, group: "Sections", href: s.href })),
    ...getCaseStudies().map((c) => ({
      id: `case-${c.slug}`,
      label: `${c.meta.title} — ${c.meta.subtitle}`,
      group: "Case studies",
      href: `/work/${c.slug}`,
    })),
    ...getTeardowns().map((t) => ({ id: `td-${t.slug}`, label: t.meta.title, group: "Teardowns", href: `/teardowns/${t.slug}`, keywords: t.meta.industry })),
    ...getHowTos().map((h) => ({ id: `ht-${h.slug}`, label: h.meta.title, group: "How-tos", href: `/writing/${h.slug}`, keywords: h.meta.tags.join(" ") })),
    ...getVideos().map((v) => ({ id: `vid-${v.slug}`, label: v.meta.title, group: "Videos", href: `/videos/${v.slug}`, keywords: v.meta.series })),
  ];
}
