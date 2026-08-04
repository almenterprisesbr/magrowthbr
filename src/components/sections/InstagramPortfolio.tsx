import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/* ─── DADOS DOS PERFIS ─────────────────────────────────────────────────────
   Quando você tiver as imagens reais, substitua os objetos `slides` de cada
   perfil — troque `placeholder` pela URL da imagem (pode ser importada ou
   um link externo).
   ───────────────────────────────────────────────────────────────────────── */

interface Slide {
  placeholder: string; // emoji/cor enquanto não tem imagem
  color: string;
  // image?: string;  ← descomente e use quando tiver as imagens reais
}

interface Profile {
  username: string;
  name: string;
  bio: string;
  posts: string;
  followers: string;
  following: string;
  accentColor: string;
  bgColor: string;
  slides: Slide[];
}

const profiles: Profile[] = [
  {
    username: "@acai.freshbr",
    name: "Açaí Fresh",
    bio: "🍇 Açaí premium gelado • Sabor que vicia",
    posts: "284",
    followers: "12,4k",
    following: "320",
    accentColor: "#9b59b6",
    bgColor: "#2d1b4e",
    slides: [
      { placeholder: "🍇", color: "#3d1f6e" },
      { placeholder: "🫐", color: "#2d1b4e" },
      { placeholder: "🍨", color: "#4a2080" },
      { placeholder: "🌿", color: "#1e3a2f" },
      { placeholder: "✨", color: "#3d1f6e" },
      { placeholder: "🎯", color: "#2d1b4e" },
    ],
  },
  {
    username: "@barbearia.elite",
    name: "Barbearia Elite",
    bio: "✂️ Cortes que definem • Estilo é atitude",
    posts: "512",
    followers: "8,9k",
    following: "215",
    accentColor: "#c9a84c",
    bgColor: "#1a1509",
    slides: [
      { placeholder: "✂️", color: "#1a1509" },
      { placeholder: "💈", color: "#1f1a0a" },
      { placeholder: "🪒", color: "#141003" },
      { placeholder: "🧔", color: "#1a1509" },
      { placeholder: "💎", color: "#1f1a0a" },
      { placeholder: "🔥", color: "#141003" },
    ],
  },
  {
    username: "@clinica.glow",
    name: "Clínica Glow",
    bio: "🌸 Beleza & bem-estar • Agende já",
    posts: "341",
    followers: "15,2k",
    following: "408",
    accentColor: "#e91e8c",
    bgColor: "#3a0a22",
    slides: [
      { placeholder: "🌸", color: "#3a0a22" },
      { placeholder: "✨", color: "#2d0a1a" },
      { placeholder: "💆", color: "#3a0a22" },
      { placeholder: "🧴", color: "#2d0a1a" },
      { placeholder: "💅", color: "#3a0a22" },
      { placeholder: "🌺", color: "#2d0a1a" },
    ],
  },
];

/* ─── COMPONENTE PRINCIPAL ───────────────────────────────────────────────── */

export function InstagramPortfolio() {
  const [overlay, setOverlay] = useState<{
    profileIndex: number;
    slideIndex: number;
  } | null>(null);

  function openCarousel(profileIndex: number, slideIndex: number) {
    setOverlay({ profileIndex, slideIndex });
  }

  function closeCarousel() {
    setOverlay(null);
  }

  function prevSlide() {
    if (!overlay) return;
    const total = profiles[overlay.profileIndex].slides.length;
    setOverlay({
      ...overlay,
      slideIndex: (overlay.slideIndex - 1 + total) % total,
    });
  }

  function nextSlide() {
    if (!overlay) return;
    const total = profiles[overlay.profileIndex].slides.length;
    setOverlay({
      ...overlay,
      slideIndex: (overlay.slideIndex + 1) % total,
    });
  }

  const activeProfile = overlay ? profiles[overlay.profileIndex] : null;
  const activeSlide =
    overlay && activeProfile
      ? activeProfile.slides[overlay.slideIndex]
      : null;

  return (
    <section className="py-24 px-4">
      {/* Cabeçalho */}
      <Reveal>
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--brand)] mb-4 block">
            Portfólio
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Nossos trabalhos
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Exemplos de gestão de redes sociais para diferentes nichos
          </p>
        </div>
      </Reveal>

      {/* Grade de perfis */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-8 max-w-5xl mx-auto">
        {profiles.map((profile, pi) => (
          <Reveal key={profile.username} delay={pi * 0.1}>
            <PhoneFrame
              profile={profile}
              onThumbClick={(si) => openCarousel(pi, si)}
            />
          </Reveal>
        ))}
      </div>

      {/* Overlay do carrossel */}
      <AnimatePresence>
        {overlay && activeProfile && activeSlide && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4"
            style={{ background: "rgba(0,0,0,0.85)" }}
            onClick={closeCarousel}
          >
            {/* Caixa do carrossel */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-72 rounded-2xl overflow-hidden"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header do post */}
              <div
                className="flex items-center gap-2 px-3 py-2.5"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                  style={{ background: activeProfile.bgColor }}
                >
                  {activeProfile.slides[0].placeholder}
                </div>
                <span className="text-sm font-medium text-foreground">
                  {activeProfile.username}
                </span>
              </div>

              {/* Slide atual */}
              <div
                className="aspect-square w-full flex items-center justify-center text-7xl transition-colors duration-300"
                style={{ background: activeSlide.color }}
              >
                {activeSlide.placeholder}
              </div>

              {/* Navegação */}
              <div
                className="flex items-center justify-between px-3 py-2"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Dots */}
                <div className="flex gap-1.5">
                  {activeProfile.slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        setOverlay({ ...overlay, slideIndex: i })
                      }
                      className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                      style={{
                        background:
                          i === overlay.slideIndex
                            ? activeProfile.accentColor
                            : "var(--border)",
                        transform:
                          i === overlay.slideIndex ? "scale(1.3)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>

            {/* Botão fechar */}
            <button
              onClick={closeCarousel}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
              style={{
                border: "1.5px solid rgba(255,255,255,0.3)",
                color: "white",
              }}
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── PHONE FRAME ────────────────────────────────────────────────────────── */

function PhoneFrame({
  profile,
  onThumbClick,
}: {
  profile: Profile;
  onThumbClick: (slideIndex: number) => void;
}) {
  return (
    <div
      className="rounded-[28px] overflow-hidden flex-shrink-0"
      style={{
        width: 220,
        background: "var(--card)",
        border: "2px solid var(--border)",
        boxShadow: `0 0 0 6px var(--surface), 0 0 0 8px var(--border)`,
      }}
    >
      {/* Header do perfil */}
      <div
        className="px-3 pt-3 pb-2"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {/* Avatar + nome */}
        <div className="flex items-center gap-2.5 mb-2.5">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
            style={{
              background: profile.bgColor,
              border: `2px solid ${profile.accentColor}`,
            }}
          >
            {profile.slides[0].placeholder}
          </div>
          <div>
            <p
              className="text-xs font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              {profile.username}
            </p>
            <p
              className="text-[10px] mt-0.5"
              style={{ color: "var(--muted-foreground)" }}
            >
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around py-1.5">
          {[
            { label: "posts", value: profile.posts },
            { label: "seguidores", value: profile.followers },
            { label: "seguindo", value: profile.following },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="text-xs font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                {s.value}
              </p>
              <p
                className="text-[9px]"
                style={{ color: "var(--muted-foreground)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid de posts */}
      <div
        className="grid grid-cols-3"
        style={{ gap: 1, background: "var(--border)" }}
      >
        {profile.slides.map((slide, si) => (
          <button
            key={si}
            onClick={() => onThumbClick(si)}
            className="aspect-square flex items-center justify-center text-2xl transition-opacity hover:opacity-75 active:opacity-60"
            style={{ background: slide.color }}
          >
            {slide.placeholder}
          </button>
        ))}
      </div>
    </div>
  );
}
