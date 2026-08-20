import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Eyebrow, Heading, Section } from "@/components/ds/Section";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Preciso fechar um pacote mensal para começar?",
    a: "Não necessariamente. Trabalhamos tanto com serviços avulsos sob demanda quanto com o ecossistema completo. O primeiro passo é realizarmos uma análise estratégica para entender o que trará mais retorno imediato ao seu negócio.",
  },
  {
    q: "Quanto tempo leva para o serviço ficar pronto?",
    a: "O prazo varia conforme a demanda e o escopo do projeto. O cronograma é definido logo após o alinhamento inicial e confirmação de entrada, garantindo entregas ágeis, data marcada e sem atrasos.",
  },
  {
    q: "Como funciona o acompanhamento depois da entrega?",
    a: "Você entra em contato direto conosco para fazermos os alinhamentos e ajustes necessários, garantindo que a estrutura contratada realmente gere resultados de vendas para o seu negócio.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="duvidas" label="Perguntas frequentes">
      <div className="flex flex-col items-start gap-5">
        <Reveal>
          <Eyebrow>Dúvidas</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <Heading>Perguntas frequentes</Heading>
        </Reveal>
      </div>

      <ul className="mt-12 space-y-3">
        {faqs.map((f, i) => {
          const active = open === i;
          return (
            <Reveal as="li" key={f.q} delay={i * 0.06}>
              <div
                className={cn(
                  "rounded-3xl border transition-colors duration-300",
                  active ? "border-brand/50 bg-accent/50" : "border-border bg-surface/50",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(active ? null : i)}
                  aria-expanded={active}
                  className="flex min-h-14 w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-medium">{f.q}</span>
                  <Plus
                    aria-hidden
                    className={cn(
                      "size-5 shrink-0 text-brand transition-transform duration-300 ease-[var(--ease-lux)]",
                      active && "rotate-45",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
