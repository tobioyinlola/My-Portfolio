"use client";

import Link from "next/link";
import { m, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useMotionPref } from "@/lib/use-motion-pref";

type Variant = "ink" | "cobalt" | "mustard" | "cream" | "terracotta";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  ink: "bg-ink text-paper",
  cobalt: "bg-cobalt text-cream",
  mustard: "bg-mustard text-[#16130f]",
  cream: "bg-cream text-[#16130f]",
  terracotta: "bg-terracotta text-cream",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  /** Pulls the button toward the cursor on hover (desktop, motion allowed). */
  magnetic?: boolean;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  "aria-haspopup"?: "dialog";
}

const MotionLink = m.create(Link);

export function Button({
  children,
  variant = "ink",
  size = "md",
  magnetic = false,
  href,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  const { reduced } = useMotionPref();
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });
  const active = magnetic && !reduced;

  const handlers = active
    ? {
        onPointerMove: (e: React.PointerEvent) => {
          if (e.pointerType !== "mouse" || !ref.current) return;
          const r = ref.current.getBoundingClientRect();
          x.set((e.clientX - (r.left + r.width / 2)) * 0.28);
          y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
        },
        onPointerLeave: () => {
          x.set(0);
          y.set(0);
        },
      }
    : {};

  const classes = cn(
    "btn inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-line font-display font-bold tracking-tight disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );
  const style = active ? { x: sx, y: sy } : undefined;
  const setRef = (el: HTMLElement | null) => {
    ref.current = el;
  };

  if (href) {
    const external = /^(https?:|mailto:)/.test(href);
    if (external) {
      return (
        <m.a ref={setRef} href={href} className={classes} style={style} {...handlers} {...rest}>
          {children}
        </m.a>
      );
    }
    return (
      <MotionLink ref={setRef} href={href} className={classes} style={style} {...handlers} {...rest}>
        {children}
      </MotionLink>
    );
  }
  return (
    <m.button ref={setRef} type={type} className={classes} style={style} {...handlers} {...rest}>
      {children}
    </m.button>
  );
}
