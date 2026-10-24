"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { subscribePointer } from "@/lib/pointer";
import { useMotionPref } from "@/lib/use-motion-pref";

export type MascotShape = "blob" | "block" | "spike" | "tri" | "bean";

interface ShapeDef {
  body: React.ReactNode;
  eyes: ReadonlyArray<readonly [number, number]>;
}

const INK = "#16130f";

function shapeDef(shape: MascotShape, fill: string): ShapeDef {
  const common = { fill, stroke: INK, strokeWidth: 4, strokeLinejoin: "round" as const };
  switch (shape) {
    case "blob":
      return {
        body: <path {...common} d="M20 62C8 40 24 12 52 14c30 2 44 26 36 48-6 18-26 26-44 22C30 80 24 72 20 62Z" />,
        eyes: [[40, 44], [64, 40]],
      };
    case "block":
      return {
        body: (
          <>
            <rect {...common} x="14" y="14" width="72" height="66" rx="6" />
            <rect {...common} x="24" y="80" width="14" height="12" />
            <rect {...common} x="62" y="80" width="14" height="12" />
          </>
        ),
        eyes: [[38, 42], [62, 42]],
      };
    case "spike":
      return {
        body: <polygon {...common} points="50,4 61,30 90,22 72,46 96,64 66,66 62,94 48,72 26,92 30,62 4,50 32,40 28,10 46,28" />,
        eyes: [[40, 48], [60, 48]],
      };
    case "tri":
      return {
        body: <path {...common} d="M50 8 94 84H6Z" />,
        eyes: [[40, 56], [60, 56]],
      };
    case "bean":
      return {
        body: <rect {...common} x="24" y="6" width="52" height="90" rx="26" />,
        eyes: [[42, 36], [60, 34]],
      };
  }
}

const EYE_R = 9;
const MAX_LOOK = 4.5;

interface MascotProps {
  shape: MascotShape;
  fill: string;
  size?: number;
  /** Resting tilt in degrees. */
  tilt?: number;
  /** Scroll parallax multiplier (negative moves up as the page scrolls). */
  parallax?: number;
  delay?: number;
  className?: string;
}

/** Original googly-eyed mascot. Pupils track the cursor; the body floats and drifts with scroll. */
export function Mascot({ shape, fill, size = 96, tilt = 0, parallax = -0.15, delay = 0, className }: MascotProps) {
  const { reduced } = useMotionPref();
  const svgRef = useRef<SVGSVGElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 900 * parallax]);
  const def = shapeDef(shape, fill);

  useEffect(() => {
    if (reduced) return;
    return subscribePointer((px, py) => {
      const svg = svgRef.current;
      if (!svg) return;
      svg.querySelectorAll<SVGGElement>("[data-eye]").forEach((eye) => {
        const white = eye.querySelector("circle");
        const pupil = eye.querySelector<SVGCircleElement>("[data-pupil]");
        if (!white || !pupil) return;
        const r = white.getBoundingClientRect();
        const dx = px - (r.left + r.width / 2);
        const dy = py - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        const look = Math.min(MAX_LOOK, dist / 30);
        pupil.style.transform = `translate(${(dx / dist) * look}px, ${(dy / dist) * look}px)`;
      });
    });
  }, [reduced]);

  return (
    <m.div
      aria-hidden
      className={className}
      style={reduced ? undefined : { y, willChange: "transform" }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={reduced ? { duration: 0.3 } : { type: "spring", stiffness: 160, damping: 12, delay: 0.5 + delay }}
    >
      <div
        style={{
          width: size,
          height: size,
          ["--r" as string]: `${tilt}deg`,
          transform: `rotate(${tilt}deg)`,
          animation: reduced ? undefined : `float ${5 + delay * 2}s ease-in-out ${delay}s infinite`,
        }}
      >
        <svg ref={svgRef} viewBox="0 0 100 100" width="100%" height="100%" overflow="visible">
          {def.body}
          {def.eyes.map(([cx, cy], i) => (
            <g key={i} data-eye>
              <circle cx={cx} cy={cy} r={EYE_R} fill="#fff" stroke={INK} strokeWidth={3} />
              <circle data-pupil cx={cx} cy={cy} r={4.2} fill={INK} />
            </g>
          ))}
        </svg>
      </div>
    </m.div>
  );
}
