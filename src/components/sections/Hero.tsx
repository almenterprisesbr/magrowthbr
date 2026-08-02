import { ArrowDown, MessageCircle, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ds/Button";
import { Eyebrow, Heading, Lead } from "@/components/ds/Section";
import { TiltCard } from "@/components/ds/TiltCard";
import { Magnetic } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { site, whatsappUrl } from "@/lib/site";

const highlights = [
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
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col items-start gap-7">
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
            <Lead>
              Contrate exatamente o que o seu negócio precisa hoje: de Landing Pages de alta
              conversão a automações no WhatsApp e gestão estratégica de redes sociais.
            </Lead>
          </Reveal>

          <Reveal delay={0.22} className="flex flex-wrap gap-3">
            {highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-border bg-surface/60 px-4 py-2 text-xs text-muted-foreground"
              >
                {h}
              </span>
            ))}
          </Reveal>

          <Reveal delay={0.3} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
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

        <Reveal variant="scale" delay={0.2}>
          <TiltCard className="w-full">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="grid size-16 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-xl font-bold text-primary-foreground shadow-[var(--shadow-brand)]"
                >
                  MA
                </span>
                <div>
                  <p className="text-base font-semibold">{site.founder}</p>
                  <p className="text-sm text-muted-foreground">Fundador · MA Growth</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Publicidade e Propaganda (UNISANTA). Especialista em Inteligência Artificial,
                Design e Conteúdo. Você fala direto com quem executa.
              </p>

              <ul className="grid gap-2 text-sm">
                {["Sem fidelidade forçada", "Atendimento direto", "IA aplicada ao projeto"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-muted-foreground">
                      <Sparkles aria-hidden className="size-4 text-brand" />
                      {item}
                    </li>
                  ),
                )}
              </ul>

              <div className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                <span>{site.location}</span>
                <span>{site.instagramHandle}</span>
              </div>
            </div>
          </TiltCard>
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
