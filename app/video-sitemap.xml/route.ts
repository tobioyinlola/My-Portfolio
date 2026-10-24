import { site } from "@/config/site";
import { getVideos } from "@/lib/content";
import { esc, xmlResponse } from "@/lib/xml";
import { isPlaceholderVideo, thumbUrl, watchUrl } from "@/lib/youtube";

export const dynamic = "force-static";

export function GET() {
  const entries = getVideos()
    .filter((v) => !isPlaceholderVideo(v.meta.youtubeId))
    .map(
      (v) => `<url><loc>${new URL(`/videos/${v.slug}`, site.url).toString()}</loc><video:video><video:thumbnail_loc>${thumbUrl(v.meta.youtubeId)}</video:thumbnail_loc><video:title>${esc(v.meta.title)}</video:title><video:description>${esc(v.meta.summary)}</video:description><video:player_loc>https://www.youtube-nocookie.com/embed/${v.meta.youtubeId}</video:player_loc><video:content_loc>${esc(watchUrl(v.meta.youtubeId))}</video:content_loc><video:duration>${v.meta.durationSeconds}</video:duration><video:publication_date>${v.meta.publishedAt}</video:publication_date></video:video></url>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${entries}</urlset>`;
  return xmlResponse(xml, "application/xml");
}
