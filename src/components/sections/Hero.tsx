import { ArrowUpRight, MessageCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Button } from "@/components/ds/Button";
import { Eyebrow } from "@/components/ds/Section";
import { Magnetic } from "@/components/motion/MagneticButton";
import heroBg from "@/assets/hero-bg.jpg";
import { whatsappUrl } from "@/lib/site";

const words = ["Crescimento", "previsível", "para", "quem", "vende", "todos", "os", "dias."];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      id="topo"
      ref={ref}
      className="relative flex min-h-dvh items-center overflow-hidden px-5 pt-32 pb-20 sm:px-8"
    >
      <motion.img
        src={heroBg}
        alt=""
        aria-hidden
        width={1920}
        height={1080}
        style={{ y: glowY }}
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-40 mix-blend-screen"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--background))]"
      />

      <motion.div style={{ y, opacity }} className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Eyebrow>MA Growth · Engenharia de crescimento</Eyebrow>
        </motion.div>

        <h1 className="mt-8 max-w-4xl text-[clamp(2.8rem,9vw,6.5rem)] leading-[0.92] font-semibold tracking-[-0.04em]">
          {words.map((w, i) => (
            <motion.span
              key={w + i}
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.35 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="mr-[0.25em] inline-block"
            >
              {i >= 5 ? <span className="text-gold-gradient">{w}</span> : w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Unimos tecnologia, dados e aquisição para transformar sua operação em uma máquina de
          receita. Sem achismo, sem contrato eterno — só sistema, número e resultado.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <Button asChild size="lg">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden />
                Falar no WhatsApp
              </a>
            </Button>
          </Magnetic>
          <Button asChild variant="outline" size="lg">
            <a href="#metodo">
              Ver o método
              <ArrowUpRight aria-hidden />
            </a>
          </Button>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-3"
        >
          {[
            { k: "+R$ 84M", v: "em receita rastreada" },
            { k: "127", v: "operações escaladas" },
            { k: "4,3x", v: "ROAS médio em 90 dias" },
          ].map((s) => (
            <div key={s.k} className="border-l border-border pl-4">
              <dt className="text-2xl font-semibold text-foreground md:text-3xl">{s.k}</dt>
              <dd className="mt-1 text-xs text-muted-foreground">{s.v}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
