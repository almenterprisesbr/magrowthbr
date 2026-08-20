import {
  Bot,
  Instagram,
  LayoutGrid,
  MessageCircle,
  PenTool,
  Scissors,
  Facebook,
  Youtube,
  Music,
  Zap,
} from "lucide-react";

import { Eyebrow, Heading, Section } from "@/components/ds/Section";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

const stackGroups = [
  {
    label: "Apps de edição",
    tools: [
      { label: "Adobe Illustrator", icon: PenTool },
      { label: "Photoshop", icon: PenTool },
      { label: "Canva", icon: LayoutGrid },
      { label: "CapCut", icon: Scissors },
    ],
  },
  {
    label: "Redes",
    tools: [
      { label: "Instagram", icon: Instagram },
      { label: "TikTok", icon: Music },
      { label: "Facebook", icon: Facebook },
      { label: "WhatsApp", icon: MessageCircle },
      { label: "YouTube", icon: Youtube },
    ],
  },
  {
    label: "Automações com IA",
    tools: [
      { label: "Adobe Firefly", icon: Zap },
      { label: "Claude", icon: Bot },
      { label: "Claude Code", icon: Bot },
      { label: "Antigravity", icon: Zap },
      { label: "ChatGPT", icon: Bot },
      { label: "Gemini", icon: Bot },
      { label: "Lovable", icon: Zap },
    ],
  },
];

export function Authority() {
  return (
    <Section id="quem-executa" label="Quem está por trás">
      <div className="grid items-start gap-12 md:grid-cols-[auto_1fr]">
        <Reveal variant="scale">
          <div className="relative mx-auto size-48 overflow-hidden rounded-2xl md:size-56">
            <img
              src="/matheus-almeida.webp"
              alt="Matheus Almeida Vieira"
              className="size-full rounded-2xl object-cover"
            />
          </div>
        </Reveal>

        <div className="flex flex-col items-start gap-6">
          <Reveal>
            <Eyebrow>Fundador</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <Heading>{site.founder}</Heading>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Sou Matheus Almeida, estudante de Publicidade e Propaganda na UNISANTA. Faço
              serviços de social media, criação de conteúdo estratégico e identidade visual,
              com o apoio de inteligência artificial para otimizar processos e automações. O
              objetivo é simples: entregar agilidade e resultado.
            </p>
          </Reveal>

          <div className="flex flex-col gap-5 w-full">
            {stackGroups.map((group, gi) => (
              <Reveal key={group.label} delay={0.18 + gi * 0.07}>
                <div className="flex flex-col gap-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">
                    {group.label}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {group.tools.map((t) => (
                      <li
                        key={t.label}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs text-muted-foreground transition-colors duration-300 hover:border-brand/50 hover:text-foreground"
                      >
                        <t.icon aria-hidden className="size-3.5 text-brand" />
                        {t.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
