"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Accent } from "@/lib/schemas";
import { accentClass } from "@/lib/accent";
import { clock, cn } from "@/lib/utils";
import { PixelIcon } from "@/components/ui/pixel-icons";
import { isPlaceholderVideo, thumbUrl } from "@/lib/youtube";

interface VideoThumbProps {
  youtubeId: string;
  title: string;
  accent: Accent;
  durationSeconds: number;
  className?: string;
  /** Show the big play button (the player facade does; list cards don't). */
  showPlay?: boolean;
}

/** Thumbnail with duration badge. Hovering cycles YouTube's preview frames; placeholder ids draw a poster. */
export function VideoThumb({ youtubeId, title, accent, durationSeconds, className, showPlay = false }: VideoThumbProps) {
  const [hovering, setHovering] = useState(false);
  const [tick, setTick] = useState(0);
  const placeholder = isPlaceholderVideo(youtubeId);
  const frame: "hq" | 1 | 2 | 3 = hovering && !placeholder ? ((((tick % 3) + 1) as 1 | 2 | 3)) : "hq";

  useEffect(() => {
    if (!hovering || placeholder) return;
    const timer = setInterval(() => setTick((t) => t + 1), 700);
    return () => clearInterval(timer);
  }, [hovering, placeholder]);

  return (
    <div
      className={cn("relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-line", placeholder && accentClass[accent], className)}
      onPointerEnter={() => {
        setTick(0);
        setHovering(true);
      }}
      onPointerLeave={() => setHovering(false)}
    >
      {placeholder ? (
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-2 text-center">
            <PixelIcon name="play" fill="var(--cream)" size={showPlay ? 64 : 40} />
            <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-widest">[VIDEO COMING SOON]</span>
            <span className="sr-only">{title}</span>
          </div>
          <div aria-hidden className="checker absolute -bottom-2 -right-2 h-14 w-24 opacity-20" />
        </div>
      ) : (
        <>
          <Image
            src={thumbUrl(youtubeId, frame)}
            alt={`Thumbnail for ${title}`}
            fill
            sizes="(max-width: 768px) 90vw, 480px"
            unoptimized={frame !== "hq"}
            className="object-cover"
          />
          {showPlay && (
            <span className="absolute inset-0 grid place-items-center bg-black/20">
              <span className="grid size-16 place-items-center rounded-full border-2 border-line bg-mustard text-[#16130f] shadow-[0_4px_0_var(--line)]">
                <svg viewBox="0 0 24 24" className="ml-1 size-7" fill="currentColor" aria-hidden>
                  <path d="M6 4l14 8-14 8z" />
                </svg>
              </span>
            </span>
          )}
        </>
      )}
      <span className="absolute bottom-2 right-2 rounded-md bg-black/85 px-2 py-0.5 font-mono text-xs font-semibold text-white">
        {clock(durationSeconds)}
      </span>
    </div>
  );
}
