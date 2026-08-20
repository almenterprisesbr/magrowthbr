import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ds/Button";
import { Heading } from "@/components/ds/Section";
import { Magnetic } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { whatsappUrl } from "@/lib/site";

export function FinalCta() {
  return (
    <section id="contato" className="relative w-full px-5 py-16 sm:px-8 md:py-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-brand/40 px-6 py-16 text-center sm:px-12">
        <span
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,color-mix(in_oklab,var(--brand)_35%,transparent),transparent_65%)]"
        />
        <span aria-hidden className="noise-layer absolute inset-0" />

        <div className="relative flex flex-col items-center gap-5">
          <Reveal variant="blur">
            <Heading className="mx-auto max-w-3xl">
              Pronto para acelerar as vendas do seu negócio?
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-base text-muted-foreground">
              Sem compromisso. Clique abaixo e fale diretamente com o Matheus.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <Magnetic>
              <Button asChild size="lg" className="min-h-14 text-base">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle aria-hidden />
                  Falar com Matheus no WhatsApp
                </a>
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
