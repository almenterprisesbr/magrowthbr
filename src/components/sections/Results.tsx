import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { TiltCard } from "@/components/ds/TiltCard";
import { Eyebrow, Heading, Lead, Section } from "@/components/ds/Section";
import { Reveal } from "@/components/motion/Reveal";

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {prefix}
      {to % 1 === 0 ? Math.round(value) : value.toFixed(1)}
      {suffix}
    </span>
  );
}

const stats = [
  { to: 4.3, suffix: "x", label: "ROAS médio nos primeiros 90 dias" },
  { to: 61, suffix: "%", label: "redução média de custo por lead qualificado" },
  { to: 21, suffix: " dias", label: "do contrato à primeira campanha no ar" },
  { to: 92, suffix: "%", label: "de retenção de clientes após 12 meses" },
];

const cases = [
  {
    tag: "E-commerce · Moda",
    title: "De R$ 180k para R$ 1,2M/mês",
    text: "Reestruturação de funil, criativos em ciclo semanal e automação de recompra no WhatsApp.",
  },
  {
    tag: "SaaS B2B",
    title: "CAC 47% menor em 4 meses",
    text: "Tracking server-side, qualificação por IA e realocação de verba por margem real.",
  },
  {
    tag: "Serviços · Saúde",
    title: "3.400 agendamentos em 6 meses",
    text: "Landing de alta conversão, follow-up automático e leitura diária de pipeline.",
  },
];

export function Results() {
  return (
    <Section id="resultados">
      <Reveal variant="blur">
        <Eyebrow>Resultados</Eyebrow>
        <Heading className="mt-6">
          Números que sustentam <span className="text-gold-gradient">a conversa</span>
        </Heading>
        <Lead className="mt-5">
          Dados consolidados das operações ativas da MA Growth nos últimos 24 meses.
        </Lead>
      </Reveal>

      <dl className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} variant="scale" className="h-full">
            <TiltCard className="h-full" tilt={5}>
              <dt className="text-4xl font-semibold text-gold-gradient md:text-5xl">
                <Counter to={s.to} suffix={s.suffix} />
              </dt>
              <dd className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.label}</dd>
            </TiltCard>
          </Reveal>
        ))}
      </dl>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cases.map((c, i) => (
          <Reveal key={c.title} delay={0.1 + i * 0.08} className="h-full">
            <TiltCard className="h-full">
              <span className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                {c.tag}
              </span>
              <h3 className="mt-4 text-xl leading-tight font-semibold">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
