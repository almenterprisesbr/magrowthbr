import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/** Spotlight that follows the mouse. Desktop / fine-pointer only. */
export function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 180, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 30, mass: 0.4 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ left: sx, top: sy }}
      className="pointer-events-none fixed z-[55] hidden size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 mix-blend-screen blur-3xl md:block"
    >
      <div className="size-full rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--brand)_22%,transparent),transparent_65%)]" />
    </motion.div>
  );
}
