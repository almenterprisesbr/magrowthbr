import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Eyebrow, Heading, Section } from "@/components/ds/Section";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Preciso fechar um pacote mensal para começar?",
    a: "Não necessariamente. Você contrata só o que precisa, no formato pontual: criação e integração de landing page ou site, criação de posts, campanhas de tráfego, criação de reels, logo e identidade visual. Se depois fizer sentido evoluir para algo contínuo, a decisão é sua — nunca uma exigência.",
  },
  {
    q: "Quanto tempo leva para o serviço ficar pronto?",
    a: "O prazo varia conforme a demanda e o tamanho do escopo. Ele é definido e confirmado após o envio de uma porcentagem do valor como entrada — a partir daí o cronograma fica fechado, com entregas ágeis, data marcada e sem atraso.",
  },
  {
    q: "Como funciona o acompanhamento depois da entrega?",
    a: "Você fala direto comigo, sem intermediários. Faço o alinhamento e os ajustes necessários para que o serviço contratado realmente gere retorno.",
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
                  {active ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
