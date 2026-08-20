import { Check, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ds/Button";
import { Eyebrow, Heading, Lead, Section } from "@/components/ds/Section";
import { Reveal } from "@/components/motion/Reveal";
import { whatsappWith } from "@/lib/site";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "social",
    title: "Social Media Pontual",
    desc: "Criação de posts, Reels e conteúdo estratégico.",
  },
  {
    id: "identidade",
    title: "Logo & Identidade Visual",
    desc: "Marca profissional que posiciona seu negócio.",
  },
  {
    id: "site",
    title: "Website / Landing Page de Alta Conversão",
    desc: "Código sob medida, rápido e focado em venda.",
  },
  {
    id: "automacao",
    title: "Automação de WhatsApp & CRM",
    desc: "Atendimento automático 24/7 sem perder lead.",
  },
  {
    id: "trafego",
    title: "Tráfego Pago",
    desc: "Google Ads & Meta Ads focados em vendas.",
  },
  {
    id: "consultoria",
    title: "Consultoria Estratégica & Diagnóstico Digital",
    desc: "Plano claro do que fazer primeiro.",
  },
  {
    id: "clone-ia",
    title: "Clone de IA para Atendimento",
    desc: "Avatar com sua voz respondendo clientes 24h, no automático.",
  },
] as const;

export function ServiceSelector() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((i) => i !== id) : [...s, id]));

  const href = useMemo(() => {
    const chosen = services.filter((s) => selected.includes(s.id)).map((s) => `• ${s.title}`);
    const message = chosen.length
      ? `Oi Matheus! Quero um diagnóstico para estes serviços:\n${chosen.join(
          "\n",
        )}\n\nPode me passar os próximos passos?`
      : "Oi Matheus! Quero montar um projeto pontual para minha empresa.";
    return whatsappWith(message);
  }, [selected]);

  return (
    <Section id="servicos" label="Seletor de serviços">
      <div className="flex flex-col items-start gap-5">
        <Reveal>
          <Eyebrow>Monte sob medida</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <Heading>Monte a sua estratégia sob medida</Heading>
        </Reveal>
        <Reveal delay={0.12}>
          <Lead>
            Selecione abaixo os serviços que seu negócio precisa agora e receba um diagnóstico
            imediato no WhatsApp:
          </Lead>
        </Reveal>
      </div>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {services.map((s, i) => {
          const active = selected.includes(s.id);
          return (
            <Reveal as="li" key={s.id} delay={i * 0.05}>
              <button
                type="button"
                onClick={() => toggle(s.id)}
                aria-pressed={active}
                className={cn(
                  "group flex min-h-[88px] w-full items-start gap-4 rounded-3xl border p-5 text-left transition-all duration-300 ease-[var(--ease-lux)] active:scale-[0.99]",
                  active
                    ? "border-brand bg-accent shadow-[var(--shadow-brand)]"
                    : "border-border bg-surface/60 hover:border-brand/50 hover:bg-accent/60",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg border transition-colors duration-300",
                    active
                      ? "border-brand bg-[image:var(--gradient-brand)] text-primary-foreground"
                      : "border-border text-transparent",
                  )}
                >
                  <Check className="size-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{s.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{s.desc}</span>
                </span>
              </button>
            </Reveal>
          );
        })}
      </ul>

      <div className="surface-panel mt-8 flex flex-col items-center gap-4 rounded-3xl p-6 sm:flex-row sm:justify-between">
        <motion.p
          key={selected.length}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-muted-foreground"
          aria-live="polite"
        >
          <span className="font-semibold text-brand">{selected.length}</span>{" "}
          {selected.length === 1 ? "serviço selecionado" : "serviços selecionados"}
        </motion.p>

        <Button asChild size="lg" className="w-full min-h-12 sm:w-auto">
          <a href={href} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden />
            Enviar Escolha para o WhatsApp de Matheus
          </a>
        </Button>
      </div>
    </Section>
  );
}
