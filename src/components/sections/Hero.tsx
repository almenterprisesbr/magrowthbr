import { ArrowDown, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ds/Button";
import { Eyebrow, Heading, Lead } from "@/components/ds/Section";
import { Magnetic } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { whatsappUrl } from "@/lib/site";

const highlights = [
  "Social Media",
  "Landing pages de alta conversão",
  "Automação de WhatsApp & CRM",
  "Tráfego pago focado em vendas",
];

export function Hero() {
  return (
    <section
      id="topo"
      className="relative flex min-h-[100svh] w-full items-center px-5 pt-28 pb-20 sm:px-8"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-7 text-center">
        <Reveal variant="blur">
          <Eyebrow>Marketing digital pontual & sem contrato engessado</Eyebrow>
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
            conversão a automações no WhatsApp e gestão estratégica de redes sociais.
          </Lead>
        </Reveal>

        <Reveal delay={0.22} className="flex flex-wrap justify-center gap-3">
          {highlights.map((h) => (
            <span
              key={h}
              className="rounded-full border border-border bg-surface/60 px-4 py-2 text-xs text-muted-foreground"
            >
              {h}
            </span>
          ))}
        </Reveal>

        <Reveal delay={0.28}>
          <p className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["Sem fidelidade forçada", "Atendimento direto conosco", "IA no processo"].map(
              (item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Sparkles aria-hidden className="size-4 text-brand" />
                  {item}
                </span>
              ),
            )}
          </p>
        </Reveal>

        <Reveal delay={0.34} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Magnetic>
            <Button asChild size="lg" className="w-full min-h-12 sm:w-auto">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden />
                Montar Meu Projeto no WhatsApp
              </a>
            </Button>
          </Magnetic>
          <Button asChild variant="outline" size="lg" className="min-h-12">
            <a href="#servicos">
              Montar estratégia
              <ArrowDown aria-hidden />
            </a>
          </Button>
        </Reveal>
      </div>

      <motion.span
        aria-hidden
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-xs tracking-[0.3em] text-muted-foreground uppercase md:block"
      >
        scroll
      </motion.span>
    </section>
  );
}
