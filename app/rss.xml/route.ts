import { site } from "@/config/site";
import { getHowTos } from "@/lib/content";
import { esc, xmlResponse } from "@/lib/xml";

export const dynamic = "force-static";

export function GET() {
  const items = getHowTos()
    .map((h) => {
      const url = new URL(`/writing/${h.slug}`, site.url).toString();
      return `<item><title>${esc(h.meta.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(h.meta.date).toUTCString()}</pubDate><description>${esc(h.meta.excerpt)}</description></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(site.name)} — Writing</title><link>${site.url}</link><description>${esc(site.description)}</description>${items}</channel></rss>`;
  return xmlResponse(xml, "application/rss+xml");
}
