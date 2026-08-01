import { BarChart3, Bot, Compass, Gauge, LineChart, Rocket } from "lucide-react";

import { TiltCard } from "@/components/ds/TiltCard";
import { Eyebrow, Heading, Lead, Section } from "@/components/ds/Section";
import { Reveal } from "@/components/motion/Reveal";

const items = [
  {
    icon: Compass,
    title: "Diagnóstico de receita",
    text: "Mapeamos funil, oferta, CAC e gargalos antes de gastar o primeiro real em mídia.",
    span: "md:col-span-3",
  },
  {
    icon: Rocket,
    title: "Aquisição paga",
    text: "Meta, Google e criativos testados em ciclos semanais com leitura de margem, não de curtida.",
    span: "md:col-span-3",
  },
  {
    icon: Bot,
    title: "Automação & IA",
    text: "Atendimento, follow-up e qualificação rodando 24h no WhatsApp da sua operação.",
    span: "md:col-span-2",
  },
  {
    icon: BarChart3,
    title: "Dados em tempo real",
    text: "Dashboard próprio conectando anúncio, lead, venda e caixa em uma única fonte de verdade.",
    span: "md:col-span-2",
  },
  {
    icon: Gauge,
    title: "CRO & performance",
    text: "Páginas rápidas, LCP abaixo de 2s e testes contínuos de conversão.",
    span: "md:col-span-2",
  },
];

export function Solutions() {
  return (
    <Section id="solucoes">
      <Reveal variant="blur">
        <Eyebrow>Soluções</Eyebrow>
        <Heading className="mt-6">
          Um ecossistema, <span className="text-gold-gradient">não uma lista de serviços</span>
        </Heading>
        <Lead className="mt-5">
          Cada peça conversa com a próxima. É assim que o crescimento deixa de ser sorte e vira
          engenharia repetível.
        </Lead>
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-6">
        {items.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 0.07}
            variant="scale"
            className={`${item.span} h-full`}
          >
            <TiltCard className="h-full">
              <item.icon
                aria-hidden
                className="size-6 text-gold transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
              />
              <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </TiltCard>
          </Reveal>
        ))}
        <Reveal delay={0.35} variant="scale" className="md:col-span-4 h-full">
          <TiltCard className="flex h-full flex-col justify-between">
            <LineChart aria-hidden className="size-6 text-gold" />
            <div>
              <h3 className="mt-6 text-xl font-semibold">Growth contínuo</h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Rituais semanais de leitura, hipótese e execução. Você acompanha cada decisão pelo
                painel e pelo WhatsApp — sem relatório de 40 páginas que ninguém lê.
              </p>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </Section>
  );
}
