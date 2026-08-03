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
          <div className="group relative mx-auto w-56 rounded-3xl border border-brand/60 p-2 shadow-[var(--shadow-brand)] md:w-72">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={matheusPhoto.url}
                alt="Matheus Almeida Vieira, fundador da MA Growth"
                loading="lazy"
                className="aspect-square w-full scale-105 object-cover grayscale transition-all duration-700 ease-[var(--ease-lux)] group-hover:scale-100 group-hover:grayscale-0"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--background)_75%,transparent),transparent_55%)]"
              />
            </div>
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
