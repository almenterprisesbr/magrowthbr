import { MessageCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Button } from "@/components/ds/Button";
import { Magnetic } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import ctaImage from "@/assets/cta-bw.jpg";
import { whatsappUrl } from "@/lib/site";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section
      ref={ref}
      id="contato"
      className="relative flex min-h-[92vh] items-center overflow-hidden"
    >
      <motion.img
        src={ctaImage}
        alt="Empresário observando a cidade a partir de um escritório, em fotografia preto e branco"
        width={1280}
        height={1600}
        loading="lazy"
        style={{ y, scale }}
        className="absolute inset-0 size-full object-cover object-[65%_center] opacity-45 grayscale"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(100deg,var(--background)_18%,color-mix(in_oklab,var(--background)_70%,transparent)_55%,transparent)]"
      />
      <div aria-hidden className="noise-layer absolute inset-0" />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-28 sm:px-8">
        <Reveal variant="blur">
          <h2 className="max-w-4xl text-[clamp(2.6rem,8vw,6rem)] leading-[0.93] font-semibold tracking-[-0.04em] text-balance">
            Seu próximo cliente já está procurando por alguém como você.{" "}
            <span className="text-gold-gradient">Vamos construir essa conexão.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <Magnetic strength={0.4}>
            <Button asChild size="lg">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden />
                Falar no WhatsApp
              </a>
            </Button>
          </Magnetic>
          <p className="mt-5 text-xs tracking-wide text-muted-foreground">
            Resposta em até 2 horas úteis · Diagnóstico inicial sem custo
          </p>
        </Reveal>
      </div>
    </section>
  );
}
