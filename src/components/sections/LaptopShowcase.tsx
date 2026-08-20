import { Eyebrow, Heading, Section } from "@/components/ds/Section";
import { Reveal } from "@/components/motion/Reveal";

const VIDEO_SRC = "/portfolio/landing-pages-showcase.mp4";
const VIDEO_POSTER = "/portfolio/landing-pages-showcase-poster.jpg";

export function LaptopShowcase() {
  return (
    <Section id="landing-pages" label="Landing pages em acao">
      <div className="flex flex-col items-center gap-5 text-center">
        <Reveal>
          <Eyebrow>Sites que geram leads</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <Heading className="text-center">Sites que geram leads</Heading>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
            Um passeio rápido por exemplos de Landing Pages e Sites que podem ser
            implementados no seu negócio.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.18}>
        <div className="relative mx-auto mt-14 w-full max-w-4xl">
          {/* Laptop body */}
          <div className="relative rounded-t-2xl border border-border/70 bg-gradient-to-b from-surface to-background p-3 shadow-2xl shadow-black/20 sm:p-4">
            {/* Browser bar */}
            <div className="mb-3 flex items-center gap-2 px-1">
              <span className="size-2.5 rounded-full bg-red-400/80" />
              <span className="size-2.5 rounded-full bg-amber-400/80" />
              <span className="size-2.5 rounded-full bg-emerald-400/80" />
              <div className="ml-3 flex-1 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-center text-[10px] text-muted-foreground/70 sm:text-xs">
                magrowthbr.com
              </div>
            </div>

            {/* Screen / video */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black ring-1 ring-black/20">
              <video
                src={VIDEO_SRC}
                poster={VIDEO_POSTER}
                autoPlay
                muted
                loop
                playsInline
                className="size-full object-cover"
              />
            </div>
          </div>

          {/* Laptop base */}
          <div className="h-3 rounded-b-lg bg-gradient-to-b from-zinc-800 to-zinc-900 sm:h-4" />
          <div className="mx-auto h-1 w-2/3 rounded-b-xl bg-zinc-900 sm:h-1.5" />

          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-8 left-1/2 -z-10 h-24 w-3/4 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(ellipse, var(--brand) 0%, transparent 70%)" }}
          />
        </div>
      </Reveal>
    </Section>
  );
}
