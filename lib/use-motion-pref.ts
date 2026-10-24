"use client";

import { useReducedMotion } from "framer-motion";

/** True when the visitor prefers reduced motion; components swap springs/parallax for fades. */
export function useMotionPref(): { reduced: boolean } {
  return { reduced: useReducedMotion() ?? false };
}
