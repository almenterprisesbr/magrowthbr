import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade-up" | "blur" | "scale";
  as?: "div" | "section" | "li" | "span";
};

const variants: Record<string, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(14px)", y: 22 },
    show: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1 },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "fade-up",
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants[variant]}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
