import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eyebrow, Heading, Lead, Section } from "@/components/ds/Section";
import { Reveal } from "@/components/motion/Reveal";

const faqs = [
  {
    q: "Vocês são uma agência?",
    a: "Não. Somos uma empresa de tecnologia focada em crescimento. Entregamos sistema, dado e automação — mídia é só uma das alavancas dentro disso.",
  },
  {
    q: "Qual o investimento mínimo?",
    a: "Trabalhamos com operações que já faturam a partir de R$ 100 mil/mês ou que têm verba de mídia de no mínimo R$ 15 mil/mês. Assim conseguimos gerar leitura estatística real.",
  },
  {
    q: "Em quanto tempo vejo resultado?",
    a: "Primeiras campanhas no ar em até 21 dias. Leitura consistente de CAC e ROAS entre o 45º e o 90º dia.",
  },
  {
    q: "Existe fidelidade de contrato?",
    a: "O ciclo inicial é de 90 dias, tempo mínimo para validar hipóteses. Depois disso, a renovação é mensal — ficamos porque o número justifica.",
  },
  {
    q: "Como acompanho o trabalho?",
    a: "Dashboard em tempo real, ritual semanal de leitura e um canal direto no WhatsApp com o time responsável pela sua conta.",
  },
];

export function Faq() {
  return (
    <Section id="duvidas">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <Reveal variant="blur">
          <Eyebrow>Dúvidas</Eyebrow>
          <Heading className="mt-6">
            Antes de <span className="text-brand-gradient">conversar</span>
          </Heading>
          <Lead className="mt-5">
            Transparência total sobre como trabalhamos, quanto custa e o que esperar.
          </Lead>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f) => (
              <AccordionItem
                key={f.q}
                value={f.q}
                className="border-b border-border transition-colors duration-300 hover:border-brand/50"
              >
                <AccordionTrigger className="py-6 text-left text-base font-medium hover:text-brand hover:no-underline md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
