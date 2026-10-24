"use client";

import { useEffect } from "react";
import { useMotionPref } from "@/lib/use-motion-pref";

export function SmoothScroll() {
  const { reduced } = useMotionPref();

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let destroy: (() => void) | undefined;
    // Load and start after first paint so smooth-scroll setup never competes with hydration.
    const timer = window.setTimeout(async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      const lenis = new Lenis({ autoRaf: true, anchors: { offset: -88 }, lerp: 0.1 });
      destroy = () => lenis.destroy();
    }, 600);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      destroy?.();
    };
  }, [reduced]);

  return null;
}
