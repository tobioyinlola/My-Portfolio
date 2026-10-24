import { getVideos } from "@/lib/content";
import { videoSeries } from "@/lib/taxonomy";
import { Highlight } from "@/components/ui/pill";
import { SectionTitle } from "@/components/ui/section-title";
import { VideoCard } from "@/components/video/video-card";
import { VideoPlayer } from "@/components/video/video-player";
import { SubscribeLink } from "@/components/video/subscribe-link";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

/** Featured video + one row per series. `full` shows every series (the /videos page). */
export function VideoShelf({ full = false }: { full?: boolean }) {
  const FeaturedHeading = full ? "h2" : "h3";
  const videos = getVideos();
  const featured = videos.find((v) => v.meta.featured) ?? videos[0];
  if (!featured) return null;

  return (
    <section id="videos" aria-labelledby="videos-title" className="px-4 pt-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          id="videos-title"
          as={full ? "h1" : "h2"}
          icon="play"
          kicker="Watch · YouTube"
          intro="Walkthroughs, teardowns and build logs. Every video has its own page with chapters and a transcript."
        >
          <Highlight>Videos</Highlight>
        </SectionTitle>

        <div className="rounded-3xl border-2 border-line bg-surface p-4 sm:p-6">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest">Featured · {featured.meta.series}</p>
          <VideoPlayer meta={featured.meta} showChapters={false} />
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <FeaturedHeading className="font-display text-2xl font-extrabold tracking-tight">{featured.meta.title}</FeaturedHeading>
              <p className="mt-1 text-muted">{featured.meta.summary}</p>
              <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-wider text-muted">{formatDate(featured.meta.publishedAt)}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={`/videos/${featured.slug}`} variant="cream" size="sm">
                Chapters & transcript
              </Button>
              <SubscribeLink />
            </div>
          </div>
        </div>

        {full ? (
          <div className="mt-12 space-y-12">
            {videoSeries.map((series) => {
              const list = videos.filter((v) => v.meta.series === series);
              if (list.length === 0) return null;
              return (
                <div key={series}>
                  <h2 className="mb-4 font-display text-2xl font-extrabold tracking-tight">{series}</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((v) => (
                      <VideoCard key={v.slug} video={v} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-12">
            <h3 className="mb-4 font-display text-2xl font-extrabold tracking-tight">Latest</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {videos
                .filter((v) => v.slug !== featured.slug)
                .slice(0, 3)
                .map((v) => (
                  <VideoCard key={v.slug} video={v} />
                ))}
            </div>
          </div>
        )}

        {!full && (
          <div className="mt-10">
            <Button href="/videos" variant="ink">
              All videos & playlists →
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
