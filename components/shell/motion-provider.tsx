"use client";

import { domAnimation, LazyMotion } from "framer-motion";

/** Loads framer-motion's animation features once, so every `m.*` element stays small. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
