import { Grid3x3, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Eyebrow, Heading, Lead, Section } from "@/components/ds/Section";
import { TiltCard } from "@/components/ds/TiltCard";
import { Reveal } from "@/components/motion/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type Post = {
  /** Caminho da imagem em /public, ex: "/portfolio/acai/1.webp". Vazio = placeholder. */
  src?: string;
  emoji: string;
};

type Profile = {
  handle: string;
  bio: string;
  posts: string;
  followers: string;
  following: string;
  avatarEmoji: string;
  accent: string;
  grid: Post[];
};

const profiles: Profile[] = [
  {
    handle: "acai.freshbr",
    bio: "Açaí premium 🍇 Sabor que vicia",
    posts: "284",
    followers: "12,4k",
    following: "320",
    avatarEmoji: "🍇",
    accent: "oklch(0.62 0.19 320)",
    grid: [
      { emoji: "🍇", src: "/portfolio/acai/1.webp" },
      { emoji: "🥣", src: "/portfolio/acai/2.webp" },
      { emoji: "🍨", src: "/portfolio/acai/3.webp" },
      { emoji: "🌿", src: "/portfolio/acai/4.webp" },
      { emoji: "✨", src: "/portfolio/acai/5.webp" },
      { emoji: "🎯", src: "/portfolio/acai/6.webp" },
    ],
  },
  {
    handle: "barbearia.elite",
    bio: "Cortes que definem ✂️ Estilo é atitude",
    posts: "512",
    followers: "8,9k",
    following: "320",
    avatarEmoji: "✂️",
    accent: "oklch(0.75 0.14 85)",
    grid: [
      { emoji: "✂️", src: "/portfolio/barbearia/1.webp" },
      { emoji: "💈", src: "/portfolio/barbearia/2.webp" },
      { emoji: "🪒", src: "/portfolio/barbearia/3.webp" },
      { emoji: "🧔", src: "/portfolio/barbearia/4.webp" },
      { emoji: "💎", src: "/portfolio/barbearia/5.webp" },
      { emoji: "🔥", src: "/portfolio/barbearia/6.webp" },
    ],
  },
  {
    handle: "clinica.glow",
    bio: "Beleza & bem-estar 🌸 Agende já",
    posts: "341",
    followers: "15,2k",
    following: "320",
    avatarEmoji: "🌸",
    accent: "oklch(0.72 0.12 15)",
    grid: [
      { emoji: "🌸", src: "/portfolio/clinica/1.webp" },
      { emoji: "✨", src: "/portfolio/clinica/2.webp" },
      { emoji: "💆‍♀️", src: "/portfolio/clinica/3.webp" },
      { emoji: "🧴", src: "/portfolio/clinica/4.webp" },
      { emoji: "💅", src: "/portfolio/clinica/5.webp" },
      { emoji: "🌷", src: "/portfolio/clinica/6.webp" },
    ],
  },
];

function InstagramCard({
  profile,
  onOpenPost,
}: {
  profile: Profile;
  onOpenPost: (postIndex: number) => void;
}) {
  return (
    <TiltCard className="!p-0 overflow-hidden">
      <div className="flex items-center gap-3 border-b border-border/60 p-4">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full text-xl"
          style={{ background: `color-mix(in oklab, ${profile.accent} 22%, transparent)` }}
        >
          {profile.avatarEmoji}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">@{profile.handle}</p>
          <p className="truncate text-xs text-muted-foreground">{profile.bio}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-border/60 border-b border-border/60 text-center">
        {[
          { label: "posts", value: profile.posts },
          { label: "seguidores", value: profile.followers },
          { label: "seguindo", value: profile.following },
        ].map((s) => (
          <div key={s.label} className="px-2 py-3">
            <p className="text-sm font-semibold text-foreground">{s.value}</p>
            <p className="text-[10px] tracking-wide text-muted-foreground uppercase">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-px bg-border/60">
        {profile.grid.map((post, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onOpenPost(i)}
            className="group/post relative aspect-square overflow-hidden bg-surface transition-transform duration-300 hover:z-10 hover:scale-[1.03]"
          >
            {post.src ? (
              <img
                src={post.src}
                alt={`Post ${i + 1} de @${profile.handle}`}
                loading="lazy"
                className="size-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.style.display = "none";
                  const fallback = img.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="flex size-full items-center justify-center text-2xl"
              style={{
                background: `color-mix(in oklab, ${profile.accent} 14%, transparent)`,
                display: post.src ? "none" : "flex",
              }}
            >
              {post.emoji}
            </div>
            <span
              aria-hidden
              className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/post:bg-black/10"
            />
          </button>
        ))}
      </div>
    </TiltCard>
  );
}

function PostViewerModal({
  profile,
  startIndex,
  onClose,
}: {
  profile: Profile;
  startIndex: number;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Posts de @${profile.handle}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="surface-panel relative w-full max-w-sm overflow-hidden rounded-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-center gap-3 border-b border-border/60 p-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-lg"
            style={{ background: `color-mix(in oklab, ${profile.accent} 22%, transparent)` }}
          >
            {profile.avatarEmoji}
          </div>
          <p className="text-sm font-semibold text-foreground">@{profile.handle}</p>
        </div>

        <Carousel opts={{ startIndex, loop: true }} className="w-full">
          <CarouselContent>
            {profile.grid.map((post, i) => (
              <CarouselItem key={i}>
                <div className="relative aspect-square w-full">
                  {post.src ? (
                    <img
                      src={post.src}
                      alt={`Post ${i + 1} de @${profile.handle}`}
                      className="size-full object-cover"
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.style.display = "none";
                        const fallback = img.nextElementSibling as HTMLElement | null;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="flex size-full items-center justify-center text-7xl"
                    style={{
                      background: `color-mix(in oklab, ${profile.accent} 16%, transparent)`,
                      display: post.src ? "none" : "flex",
                    }}
                  >
                    {post.emoji}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-3" />
          <CarouselNext className="right-3" />
        </Carousel>
      </motion.div>
    </motion.div>
  );
}

export function InstagramPortfolio() {
  const [active, setActive] = useState<{ profile: Profile; index: number } | null>(null);

  return (
    <Section id="portfolio" label="Portfólio">
      <div className="flex flex-col items-center gap-4 text-center">
        <Reveal>
          <Eyebrow>
            <Grid3x3 aria-hidden className="size-3.5" />
            Portfólio
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <Heading className="text-center">Trabalhos que já entregamos</Heading>
        </Reveal>
        <Reveal delay={0.12}>
          <Lead className="mx-auto text-center">
            Um exemplo do padrão visual que sua marca pode ter. Clique em qualquer post para ver
            de perto.
          </Lead>
        </Reveal>
      </div>

      <div
        className={cn(
          "mt-14 grid grid-cols-1 gap-6",
          "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {profiles.map((profile, i) => (
          <Reveal key={profile.handle} delay={0.06 * i}>
            <InstagramCard
              profile={profile}
              onOpenPost={(index) => setActive({ profile, index })}
            />
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active ? (
          <PostViewerModal
            profile={active.profile}
            startIndex={active.index}
            onClose={() => setActive(null)}
          />
        ) : null}
      </AnimatePresence>
    </Section>
  );
}
