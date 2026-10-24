import Link from "next/link";
import type { Entry } from "@/lib/content";
import type { VideoMeta } from "@/lib/schemas";
import { VideoThumb } from "@/components/video/video-thumb";
import { formatDate } from "@/lib/utils";

export function VideoCard({ video }: { video: Entry<VideoMeta> }) {
  const { meta, slug } = video;
  return (
    <article className="group relative flex flex-col gap-3">
      <VideoThumb youtubeId={meta.youtubeId} title={meta.title} accent={meta.accent} durationSeconds={meta.durationSeconds} />
      <div>
        <h3 className="font-display text-lg font-extrabold leading-tight tracking-tight">
          <Link href={`/videos/${slug}`} className="after:absolute after:inset-0 after:content-[''] group-hover:underline decoration-2 underline-offset-4">
            {meta.title}
          </Link>
        </h3>
        <p className="mt-1 font-mono text-[0.68rem] font-semibold uppercase tracking-wider text-muted">{formatDate(meta.publishedAt)}</p>
      </div>
    </article>
  );
}
