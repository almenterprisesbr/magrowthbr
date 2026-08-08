import { Eyebrow, Heading, Section } from "@/components/ds/Section";
import { Reveal } from "@/components/motion/Reveal";

const VIDEO_SRC = "/portfolio/landing-pages-showcase.mp4";
const VIDEO_POSTER = "/portfolio/landing-pages-showcase-poster.jpg";

export function LaptopShowcase() {
  return (
    <Section id="landing-pages" label="Landing pages em ação">
      <div className="flex flex-col items-center gap-5 text-center">
        <Reveal>
          <Eyebrow>Landing pages</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <Heading className="text-center">Sites que vendem enquanto você dorme</Heading>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            Um passeio rápido por landing pages que já construímos, direto na tela.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.18}>
        <div className="relative mx-auto mt-14 w-full max-w-4xl">
          {/* Corpo do laptop */}
          <div className="relative rounded-t-2xl border border-border/70 bg-gradient-to-b from-surface to-background p-3 shadow-2xl shadow-black/20 sm:p-4">
            {/* Barra de título estilo navegador */}
            <div className="mb-3 flex items-center gap-2 px-1">
              <span className="size-2.5 rounded-full bg-red-400/80" />
              <span className="size-2.5 rounded-full bg-amber-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
              <div className="ml-3 flex-1 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-center text-[10px] text-muted-foreground/70 sm:text-xs">
                magrowthbr.com
              </div>
            </div>

            {/* Tela / vídeo */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black ring-1 ring-black/20">
              <video
                src={VIDEO_SRC}
                poster={VIDEO_POSTER}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="size-full object-cover"
              />
            </div>
          </div>

          {/* "Base" do notebook, dá a profundidade de perspectiva */}
          <div className="relative mx-auto h-3 w-[104%] max-w-none -translate-x-1/2 rounded-b-xl bg-gradient-to-b from-surface to-border/40 shadow-lg shadow-black/25 sm:h-4"
            style={{ left: "50%" }}
          />
          <div className="mx-auto h-1.5 w-1/4 rounded-b-md bg-border/60" />
        </div>
      </Reveal>
    </Section>
  );
}
