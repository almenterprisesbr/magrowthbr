import { Bot, Instagram, LayoutGrid, MessageCircle, PenTool, Scissors } from "lucide-react";

import { Eyebrow, Heading, Section } from "@/components/ds/Section";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

const stack = [
  { label: "Adobe Suite", icon: PenTool },
  { label: "Canva", icon: LayoutGrid },
  { label: "CapCut", icon: Scissors },
  { label: "Instagram", icon: Instagram },
  { label: "WhatsApp", icon: MessageCircle },
  { label: "Automações com IA", icon: Bot },
];

export function Authority() {
  return (
    <Section id="quem-executa" label="Quem está por trás">
      <div className="grid items-center gap-12 md:grid-cols-[auto_1fr]">
        <Reveal variant="scale">
          <div className="relative mx-auto size-48 overflow-hidden rounded-2xl md:size-56">
            <img
              src="/matheus-almeida.webp"
              alt="Matheus Almeida Vieira"
              className="size-full rounded-2xl object-cover"
            />
          </div>
        </Reveal>

        <div className="flex flex-col items-start gap-5">
          <Reveal>
            <Eyebrow>Fundador</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <Heading>{site.founder}</Heading>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Sou Matheus Almeida, estudante de Publicidade e Propaganda na UNISANTA. Trabalho com
              social media, criação de conteúdo estratégico e identidade visual — com o apoio de
              inteligência artificial para otimizar processos e automações. O objetivo é simples:
              entregar agilidade com atenção personalizada.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <ul className="flex flex-wrap gap-3">
              {stack.map((s) => (
                <li
                  key={s.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-xs text-muted-foreground transition-colors duration-300 hover:border-brand/50 hover:text-foreground"
                >
                  <s.icon aria-hidden className="size-4 text-brand" />
                  {s.label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
