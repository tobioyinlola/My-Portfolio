"use client";

import { useState } from "react";
import type { VideoMeta } from "@/lib/schemas";
import { clock, cn } from "@/lib/utils";
import { embedUrl, isPlaceholderVideo } from "@/lib/youtube";
import { VideoThumb } from "@/components/video/video-thumb";

interface VideoPlayerProps {
  meta: Pick<VideoMeta, "title" | "youtubeId" | "accent" | "durationSeconds" | "chapters">;
  showChapters?: boolean;
}

/** Click-to-load YouTube facade (no iframe until play) with a chapter list that seeks. */
export function VideoPlayer({ meta, showChapters = false }: VideoPlayerProps) {
  const [loaded, setLoaded] = useState(false);
  const [start, setStart] = useState(0);
  const placeholder = isPlaceholderVideo(meta.youtubeId);

  const play = (seconds = 0) => {
    if (placeholder) return;
    setStart(seconds);
    setLoaded(true);
  };

  return (
    <div className={cn("grid gap-4", showChapters && "lg:grid-cols-[1fr_17rem]")}>
      <div className="min-w-0">
        {loaded ? (
          <iframe
            key={start}
            src={embedUrl(meta.youtubeId, start)}
            title={meta.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="aspect-video w-full rounded-2xl border-2 border-line"
          />
        ) : (
          <button
            type="button"
            onClick={() => play()}
            disabled={placeholder}
            aria-label={placeholder ? undefined : `Play video: ${meta.title} (${clock(meta.durationSeconds)})`}
            className="block w-full text-left"
          >
            <VideoThumb {...meta} showPlay />
          </button>
        )}
      </div>

      {showChapters && (
        <section aria-label="Chapters" className="self-start rounded-2xl border-2 border-line bg-surface p-3">
          <h2 className="px-2 pb-2 font-mono text-xs font-semibold uppercase tracking-widest">Chapters</h2>
          <ol className="max-h-72 overflow-auto" data-lenis-prevent>
            {meta.chapters.map((c) => (
              <li key={c.t}>
                <button
                  type="button"
                  onClick={() => play(c.t)}
                  disabled={placeholder}
                  className={cn("flex w-full items-baseline gap-3 rounded-xl px-2 py-2 text-left text-sm", !placeholder && "hover:bg-mustard hover:text-[#16130f]")}
                >
                  <span className="font-mono text-xs font-semibold tabular-nums">{clock(c.t)}</span>
                  <span>{c.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
