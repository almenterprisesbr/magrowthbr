import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Eyebrow, Heading, Lead, Section } from "@/components/ds/Section";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    n: "01",
    title: "Imersão",
    text: "Sete dias dentro do seu negócio: números, oferta, concorrência e time comercial.",
  },
  {
    n: "02",
    title: "Arquitetura",
    text: "Desenhamos funil, mensagem e stack de tecnologia com metas de CAC e LTV declaradas.",
  },
  {
    n: "03",
    title: "Lançamento",
    text: "Landing, tracking, automações e campanhas no ar em até 21 dias.",
  },
  {
    n: "04",
    title: "Escala",
    text: "Otimização semanal, novos canais e previsibilidade de pipeline mês após mês.",
  },
];

export function Method() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Section id="metodo">
      <Reveal variant="blur">
        <Eyebrow>Método MA</Eyebrow>
        <Heading className="mt-6">
          Quatro etapas até a <span className="text-gold-gradient">previsibilidade</span>
        </Heading>
        <Lead className="mt-5">
          O mesmo processo que aplicamos em operações de R$ 50 mil e de R$ 5 milhões por mês.
        </Lead>
      </Reveal>

      <div ref={ref} className="relative mt-16 pl-10 md:pl-16">
        <div aria-hidden className="absolute top-0 left-3 h-full w-px bg-border md:left-5" />
        <motion.div
          aria-hidden
          style={{ height }}
          className="absolute top-0 left-3 w-px bg-[image:var(--gradient-gold)] shadow-[0_0_18px_var(--gold)] md:left-5"
        />

        <ol className="space-y-12">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.05} className="group relative">
              <span
                aria-hidden
                className="absolute top-2 -left-10 grid size-6 place-items-center rounded-full border border-border bg-surface text-[10px] font-semibold text-gold transition-all duration-500 group-hover:scale-125 group-hover:border-gold group-hover:shadow-[0_0_18px_var(--gold)] md:-left-[3.4rem]"
              >
                {s.n}
              </span>
              <h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-gold md:text-3xl">
                {s.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {s.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
