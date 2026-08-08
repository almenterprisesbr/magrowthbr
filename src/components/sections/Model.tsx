import { Check, X } from "lucide-react";

import { Eyebrow, Heading, Lead, Section } from "@/components/ds/Section";
import { Reveal } from "@/components/motion/Reveal";

const traditional = [
  "Pacotes caros com serviços que você não usa",
  "Fidelidade de 12 meses",
  "Atendentes genéricos e trocas constantes",
  "Relatórios sem leitura estratégica",
];

const maGrowth = [
  "Contratação cirúrgica: só o que gera resultado agora",
  "Sem fidelidade forçada",
  "Atendimento direto conosco, sem intermediários",
  "Tecnologia de IA inclusa no processo",
];

export function Model() {
  return (
    <Section id="modelo" label="O modelo MA Growth">
      <div className="flex flex-col items-start gap-5">
        <Reveal>
          <Eyebrow>O modelo</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <Heading>Por que a abordagem pontual funciona?</Heading>
        </Reveal>
        <Reveal delay={0.12}>
          <Lead>
            Menos contrato, mais execução. Você investe no ponto exato onde o seu funil está
            travando.
          </Lead>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <Reveal variant="fade-up">
          <div className="h-full rounded-3xl border border-border bg-surface/50 p-7">
            <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
              Mercado tradicional
            </p>
            <ul className="mt-6 space-y-4">
              {traditional.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <X aria-hidden className="mt-0.5 size-4 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={0.1}>
          <div className="h-full rounded-3xl border border-brand/50 bg-accent/60 p-7 shadow-[var(--shadow-brand)]">
            <p className="text-xs tracking-[0.22em] text-brand uppercase">Modelo MA Growth</p>
            <ul className="mt-6 space-y-4">
              {maGrowth.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-foreground">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
