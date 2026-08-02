import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Living background: gradient blobs, grid, noise and floating particles. */
export function LivingBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const hue = useTransform(scrollYProgress, [0, 1], [0.35, 0.75]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="grid-layer absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_50%_20%,#000,transparent_75%)]" />
      </motion.div>

      <motion.div
        style={{ opacity: hue }}
        className="animate-drift absolute -top-40 -left-32 size-[46rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--brand)_16%,transparent),transparent_65%)] blur-3xl"
      />
      <div
        className="animate-drift absolute top-1/3 -right-40 size-[38rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--brand-deep)_18%,transparent),transparent_65%)] blur-3xl"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="animate-drift absolute bottom-0 left-1/3 size-[32rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--brand-soft)_10%,transparent),transparent_65%)] blur-3xl"
        style={{ animationDelay: "-15s" }}
      />

      <svg className="absolute inset-0 size-full opacity-[0.18]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineBrand" x1="0" x2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="var(--brand)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {[18, 42, 66, 88].map((top, i) => (
          <line
            key={top}
            x1="0"
            x2="100%"
            y1={`${top}%`}
            y2={`${top}%`}
            stroke="url(#lineBrand)"
            strokeWidth="1"
            strokeDasharray="6 14"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-200"
              dur={`${14 + i * 5}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
      </svg>

      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="animate-float-slow absolute size-1 rounded-full bg-brand/50"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 61) % 100}%`,
            animationDelay: `${-i * 1.3}s`,
            animationDuration: `${6 + (i % 5)}s`,
          }}
        />
      ))}

      <div className="noise-layer absolute inset-0" />
    </div>
  );
}
