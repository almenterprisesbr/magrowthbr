import { ArrowDown, MessageCircle, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ds/Button";
import { Eyebrow, Heading, Lead } from "@/components/ds/Section";
import { Magnetic } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { whatsappUrl } from "@/lib/site";

const services = [
  "Social Media",
  "Landing Pages / Sites de Alta Conversão",
  "Logo & Identidade Visual",
  "Consultoria Estratégica & Diagnóstico Digital",
];

const valueBadges = ["Flexibilidade", "Atendimento direto conosco", "IA no processo"];

export function Hero() {
  return (
    <section
      id="topo"
      className="relative flex min-h-[100svh] w-full items-center px-5 pt-28 pb-20 sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 text-center">
        <Reveal variant="blur">
          <Eyebrow>Diagnóstico & Estratégia Digital</Eyebrow>
        </Reveal>

        <Reveal variant="blur" delay={0.08}>
          <Heading as="h1" className="text-5xl sm:text-6xl md:text-7xl">
            Sua marca precisa de{" "}
            <span className="text-brand-gradient">resultados reais</span> — não de pacotes que
            você não usa.
          </Heading>
        </Reveal>

        <Reveal delay={0.16}>
          <Lead className="mx-auto max-w-2xl">
            Contrate exatamente o que o seu negócio precisa hoje: de Landing Pages de alta
            conversão até estratégias completas de geração de leads.
          </Lead>
        </Reveal>

        {/* Service pills */}
        <Reveal delay={0.22} className="flex flex-wrap justify-center gap-2.5">
          {services.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 + i * 0.06, ease: [0.22, 1, 0.36, 1], duration: 0.6 }}
              className="rounded-full border border-border bg-surface/60 px-4 py-2 text-xs text-muted-foreground transition-colors duration-300 hover:border-brand/40 hover:text-foreground"
            >
              {s}
            </motion.span>
          ))}
        </Reveal>

        {/* Value badges */}
        <Reveal delay={0.34}>
          <p className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {valueBadges.map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-brand shadow-[0_0_8px_var(--brand)]"
                />
                {item}
              </span>
            ))}
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.4} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Magnetic>
            <Button asChild size="lg" className="w-full min-h-12 sm:w-auto">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden />
                Montar Meu Projeto no WhatsApp
              </a>
            </Button>
          </Magnetic>
          <Button asChild variant="outline" size="lg" className="min-h-12">
            <a href="#ecossistema" className="flex items-center gap-2">
              Montar estratégia
              <ChevronRight aria-hidden className="size-4" />
            </a>
          </Button>
        </Reveal>

        {/* Scroll hint */}
        <motion.div
          className="mt-4 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} className="text-muted-foreground/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
