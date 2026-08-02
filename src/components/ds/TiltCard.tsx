import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Glass card with 3D tilt, spotlight follow and animated border on hover. */
export function TiltCard({
  children,
  className,
  tilt = 7,
}: {
  children: ReactNode;
  className?: string;
  tilt?: number;
}) {
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${mx}% ${my}%, color-mix(in oklab, var(--brand) 14%, transparent), transparent 70%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px * 100);
    my.set(py * 100);
    ry.set((px - 0.5) * tilt * 2);
    rx.set(-(py - 0.5) * tilt * 2);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={cn(
        "animated-border surface-panel group relative overflow-hidden rounded-3xl p-7 transition-shadow duration-500 hover:shadow-[var(--shadow-deep)]",
        className,
      )}
    >
      <motion.span
        aria-hidden
        style={{ backgroundImage: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span aria-hidden className="noise-layer pointer-events-none absolute inset-0" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}
