"use client";

/**
 * The dossier motion language. Three primitives, one shared easing, no springs
 * and no loops (the terminal caret and availability dot are the only exceptions,
 * and they live in CSS). Every primitive is neutralised by `prefers-reduced-motion`
 * via <MotionProvider>, so reduced-motion users get an instant, fully-composed page.
 */

import {
  motion,
  MotionConfig,
  type Variants,
  type HTMLMotionProps,
} from "framer-motion";
import type { ReactNode } from "react";

// A precise, non-bouncy ease — the whole site moves on this curve.
export const EASE = [0.25, 0.1, 0.25, 1] as const;

const VIEWPORT = { once: true, margin: "-80px" } as const;

/** Wrap the app so all primitives below honour the user's reduced-motion setting. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/**
 * Primitive 1 — "ink settle". Opacity + an 8px rise, once, on scroll into view.
 * Use once per block; for several children use <Stagger> instead of many Reveals.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  ...rest
}: { children: ReactNode; delay?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.45, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

/** A container that reveals its <RevealItem> children in sequence (cap ~4). */
export function Stagger({
  children,
  className,
  ...rest
}: { children: ReactNode } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  ...rest
}: { children: ReactNode } & HTMLMotionProps<"div">) {
  return (
    <motion.div className={className} variants={staggerItem} {...rest}>
      {children}
    </motion.div>
  );
}

/**
 * Primitive 2 — "the drawn rule". A hairline that draws from the left. The site's
 * most repeated gesture: section tops, table headers, metric dividers.
 * Keep it <= 1px tall and never let it glow.
 */
export function RuleDraw({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`h-px w-full origin-left ${className}`}
      style={{ backgroundColor: "rgba(255,255,255,0.14)" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE }}
    />
  );
}
