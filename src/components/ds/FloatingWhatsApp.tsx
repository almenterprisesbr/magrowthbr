import { MessageCircle } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

import { whatsappUrl } from "@/lib/site";

export function FloatingWhatsApp() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setVisible(v > 500));

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp com a MA Growth"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6, y: visible ? 0 : 20 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[image:var(--gradient-gold)] text-primary-foreground shadow-[var(--shadow-gold)] transition-transform duration-300 hover:scale-110 focus-visible:scale-110"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <span
        aria-hidden
        className="animate-pulse-ring absolute inset-0 rounded-full border border-gold"
      />
      <MessageCircle className="size-6" aria-hidden />
    </motion.a>
  );
}
