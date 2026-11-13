"use client";

import { m } from "framer-motion";
import { useMotionPref } from "@/lib/use-motion-pref";

/** Slides its child in from the right when it scrolls into view (fade only for reduced motion). */
export function SlideIn({ children, className }: { children: React.ReactNode; className?: string }) {
  const { reduced } = useMotionPref();
  return (
    <m.div
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: 140, rotate: 1.5 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reduced ? { duration: 0.3 } : { type: "spring", stiffness: 90, damping: 18 }}
    >
      {children}
    </m.div>
  );
}
