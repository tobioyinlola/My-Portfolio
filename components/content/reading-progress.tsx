"use client";

import { m, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[55] h-1.5">
      <m.div className="h-full origin-left bg-terracotta" style={{ scaleX }} />
    </div>
  );
}
