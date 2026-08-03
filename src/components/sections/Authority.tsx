import { Bot, LayoutGrid, LineChart, PenTool, Scissors, Target } from "lucide-react";

import { Eyebrow, Heading, Section } from "@/components/ds/Section";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

const stack = [
  { label: "Adobe Suite", icon: PenTool },
  { label: "Canva", icon: LayoutGrid },
  { label: "CapCut", icon: Scissors },
  { label: "Meta Business", icon: Target },
  { label: "Google Ads", icon: LineChart },
  { label: "Automações WhatsApp", icon: Bot },
];

export function Authority() {
  return (
    <Section id="quem-executa" label="Quem executa">
      <div className="grid items-center gap-12 md:grid-cols-[auto_1fr]">
        <Reveal variant="scale">
          <div className="relative mx-auto size-48 overflow-hidden rounded-2xl md:size-56">
            <img
              src="/matheus-almeida.jpg"
              alt="Matheus Almeida Vieira"
              className="size-full rounded-2xl object-cover"
            />
          </div>
        </Reveal>

        <div className="flex flex-col items-start gap-5">
          <Reveal>
            <Eyebrow>Autoridade</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <Heading>{site.founder}</Heading>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Por trás da MA Growth está Matheus Almeida, estudante de Publicidade e Propaganda na
              UNISANTA. Especialista na integração entre Inteligência Artificial, Design e Gestão
              de Tráfego. O objetivo é simples: entregar agilidade corporativa com atenção
              personalizada.
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
