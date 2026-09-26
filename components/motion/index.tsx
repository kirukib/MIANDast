"use client";

import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type HTMLMotionProps,
  type Transition,
} from "framer-motion";

/** Spec §8 — ease-out, 150/200/300ms, no bounce */
export const easeOut = [0.2, 0.8, 0.2, 1] as const;

export const transitions = {
  fast: { duration: 0.15, ease: easeOut } satisfies Transition,
  base: { duration: 0.2, ease: easeOut } satisfies Transition,
  reveal: { duration: 0.3, ease: easeOut } satisfies Transition,
};

export { motion, AnimatePresence, useReducedMotion };

type FadeInProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  /** Wrap as section for semantic landing blocks */
  as?: "div" | "section";
};

/** Scroll reveal once — 8px rise, 300ms (spec §8). Honours prefers-reduced-motion. */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 8,
  as = "div",
  ...rest
}: FadeInProps) {
  const reduce = useReducedMotion();
  const Comp = as === "section" ? motion.section : motion.div;

  if (reduce) {
    const Tag = as === "section" ? "section" : "div";
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ ...transitions.reveal, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
};

/** Stagger children on enter — max ~4 items (spec). */
export function Stagger({ children, className, stagger = 0.06 }: StaggerProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: transitions.reveal },
};
