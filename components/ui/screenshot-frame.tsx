import Image from "next/image";
import { cn } from "@/lib/utils";

interface ScreenshotFrameProps {
  src?: string;
  alt?: string;
  label?: string;
  tilt?: number;
  className?: string;
}

/** White-bordered, taped screenshot. Tape peels on hover (transform only). Falls back to a drawn mock UI. */
export function ScreenshotFrame({ src, alt = "", label = "[SCREENSHOT]", tilt = 2, className }: ScreenshotFrameProps) {
  return (
    <figure
      className={cn("group relative mx-auto w-full max-w-md transition-transform duration-300 hover:rotate-0", className)}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <span
        aria-hidden
        className="absolute -top-3 left-4 z-10 h-6 w-16 origin-left -rotate-6 bg-mustard/90 shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:-rotate-[16deg]"
      />
      <span
        aria-hidden
        className="absolute -top-3 right-4 z-10 h-6 w-16 origin-right rotate-6 bg-lilac/90 shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[16deg]"
      />
      <div className="overflow-hidden rounded-md border-[6px] border-white bg-white shadow-[0_6px_0_rgba(22,19,15,0.35)]">
        {src ? (
          <Image src={src} alt={alt} width={960} height={600} className="aspect-[8/5] w-full object-cover" sizes="(max-width: 768px) 80vw, 420px" />
        ) : (
          <div role="img" aria-label={alt || label} className="aspect-[8/5] w-full bg-[#ece6d8] p-3 text-[#16130f]">
            <div className="flex gap-1.5">
              <span className="size-2 rounded-full bg-terracotta" />
              <span className="size-2 rounded-full bg-mustard" />
              <span className="size-2 rounded-full bg-forest" />
            </div>
            <div className="mt-3 grid h-[calc(100%-1.5rem)] grid-cols-[28%_1fr] gap-3">
              <div className="space-y-2 rounded bg-white/70 p-2">
                <div className="h-2 w-3/4 rounded bg-[#16130f]/20" />
                <div className="h-2 w-1/2 rounded bg-[#16130f]/20" />
                <div className="h-2 w-2/3 rounded bg-[#16130f]/20" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="grid flex-1 place-items-center rounded bg-white/80 font-mono text-[0.65rem] font-semibold uppercase tracking-widest">
                  {label}
                </div>
                <div className="h-6 rounded bg-cobalt/70" />
              </div>
            </div>
          </div>
        )}
      </div>
    </figure>
  );
}
