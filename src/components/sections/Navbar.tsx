import { Menu, X } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ds/Button";
import { Magnetic } from "@/components/motion/MagneticButton";
import { whatsappUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "#metodo", label: "Método" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#resultados", label: "Resultados" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setCompact(v > 40));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3"
    >
      <nav
        aria-label="Navegação principal"
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 transition-all duration-500 ease-[var(--ease-lux)]",
          compact
            ? "surface-panel h-14 shadow-[var(--shadow-deep)]"
            : "h-16 border border-transparent bg-transparent",
        )}
      >
        <a
          href="#topo"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          aria-label="MA Growth, início"
        >
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-xl bg-[image:var(--gradient-gold)] text-[13px] font-bold text-primary-foreground"
          >
            MA
          </span>
          <span className="hidden sm:inline">
            MA <span className="text-gold-gradient">Growth</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-right after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Magnetic className="hidden sm:inline-block">
            <Button asChild size="sm">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp
              </a>
            </Button>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid size-11 place-items-center rounded-full border border-border text-foreground transition-colors duration-300 hover:border-gold/60 hover:text-gold md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="mx-auto max-w-6xl overflow-hidden md:hidden"
      >
        <ul className="surface-panel mt-2 space-y-1 rounded-3xl p-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="p-1">
            <Button asChild className="w-full" size="sm">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                Falar no WhatsApp
              </a>
            </Button>
          </li>
        </ul>
      </motion.div>
    </motion.header>
  );
}
