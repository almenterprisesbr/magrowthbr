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
    bio: "Acai premium — Sabor que vicia",
    posts: "284",
    followers: "12,4k",
    following: "320",
    avatarEmoji: "A",
    accent: "oklch(0.62 0.19 320)",
    grid: [
      { emoji: "1", src: "/portfolio/acai/1.webp" },
      { emoji: "2", src: "/portfolio/acai/2.webp" },
      { emoji: "3", src: "/portfolio/acai/3.webp" },
      { emoji: "4", src: "/portfolio/acai/4.webp" },
      { emoji: "5", src: "/portfolio/acai/5.webp" },
      { emoji: "6", src: "/portfolio/acai/6.webp" },
    ],
  },
  {
    handle: "barbearia.elite",
    bio: "Cortes que definem — Estilo e atitude",
    posts: "512",
    followers: "8,9k",
    following: "320",
    avatarEmoji: "B",
    accent: "oklch(0.75 0.14 85)",
    grid: [
      { emoji: "1", src: "/portfolio/barbearia/1.webp" },
      { emoji: "2", src: "/portfolio/barbearia/2.webp" },
      { emoji: "3", src: "/portfolio/barbearia/3.webp" },
      { emoji: "4", src: "/portfolio/barbearia/4.webp" },
      { emoji: "5", src: "/portfolio/barbearia/5.webp" },
      { emoji: "6", src: "/portfolio/barbearia/6.webp" },
    ],
  },
  {
    handle: "clinica.glow",
    bio: "Beleza & bem-estar — Cuidado com resultado",
    posts: "389",
    followers: "5,2k",
    following: "180",
    avatarEmoji: "C",
    accent: "oklch(0.75 0.12 350)",
    grid: [
      { emoji: "1", src: "/portfolio/clinica/1.webp" },
      { emoji: "2", src: "/portfolio/clinica/2.webp" },
      { emoji: "3", src: "/portfolio/clinica/3.webp" },
      { emoji: "4", src: "/portfolio/clinica/4.webp" },
      { emoji: "5", src: "/portfolio/clinica/5.webp" },
      { emoji: "6", src: "/portfolio/clinica/6.webp" },
    ],
  },
];

function PostThumb({
  post,
  onClick,
  accent,
}: {
  post: Post;
  onClick: () => void;
  accent: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative aspect-square w-full overflow-hidden rounded-sm bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      {post.src ? (
        <img
          src={post.src}
          alt=""
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      ) : (
        <span
          className="grid size-full place-items-center text-2xl"
          style={{ background: `color-mix(in oklab, ${accent} 20%, #111)` }}
        >
          {post.emoji}
        </span>
      )}
      <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
    </button>
  );
}

function ProfileCard({ profile }: { profile: Profile }) {
  const [lightbox, setLightbox] = useState<Post | null>(null);

  return (
    <>
      <TiltCard className="overflow-hidden rounded-3xl border border-border bg-surface/60">
        {/* Profile header */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <span
            className="grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
            style={{ background: profile.accent }}
          >
            {profile.avatarEmoji}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold">@{profile.handle}</p>
            <p className="truncate text-[10px] text-muted-foreground">{profile.bio}</p>
          </div>
          <Grid3x3 size={14} className="shrink-0 text-muted-foreground" />
        </div>

        {/* Stats */}
        <div className="flex divide-x divide-border border-b border-border">
          {[
            { label: "posts", val: profile.posts },
            { label: "seguidores", val: profile.followers },
            { label: "seguindo", val: profile.following },
          ].map((s) => (
            <div key={s.label} className="flex flex-1 flex-col items-center py-2">
              <span className="text-sm font-bold">{s.val}</span>
              <span className="text-[10px] text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-px bg-border p-px">
          {profile.grid.map((post, i) => (
            <PostThumb
              key={i}
              post={post}
              accent={profile.accent}
              onClick={() => setLightbox(post)}
            />
          ))}
        </div>
      </TiltCard>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <span className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              className="relative max-h-[90vw] max-w-lg overflow-hidden rounded-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.src ? (
                <img src={lightbox.src} alt="" className="w-full object-contain" />
              ) : (
                <div
                  className="grid aspect-square w-full max-w-xs place-items-center text-6xl"
                  style={{ background: `color-mix(in oklab, ${profile.accent} 20%, #111)` }}
                >
                  {lightbox.emoji}
                </div>
              )}
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute right-3 top-3 rounded-full bg-black/60 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                aria-label="Fechar"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function InstagramPortfolio() {
  return (
    <Section id="portfolio" label="Portfolio de trabalhos">
      <div className="flex flex-col items-center gap-5 text-center">
        <Reveal>
          <Eyebrow>Portfolio</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <Heading className="text-center">Conheça um pouco do nosso trabalho</Heading>
        </Reveal>
        <Reveal delay={0.12}>
          <Lead className="mx-auto text-center">
            Exemplos de padrões visuais que sua marca pode ter. Clique em qualquer post para
            ver de perto.
          </Lead>
        </Reveal>
      </div>

      <Reveal delay={0.16}>
        <Carousel
          className="mt-12 w-full"
          opts={{ align: "center", loop: true }}
        >
          <CarouselContent className="-ml-4">
            {profiles.map((p) => (
              <CarouselItem key={p.handle} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                <ProfileCard profile={p} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </Reveal>
    </Section>
  );
}
