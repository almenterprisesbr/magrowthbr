import { Reveal } from "@/components/motion/Reveal";

// Imagens do nicho Açaí
import acai1 from "@/assets/portfolio/acai/1.png";
import acai2 from "@/assets/portfolio/acai/2.png";
import acai3 from "@/assets/portfolio/acai/3.png";
import acai4 from "@/assets/portfolio/acai/4.png";
import acai5 from "@/assets/portfolio/acai/5.png";
import acai6 from "@/assets/portfolio/acai/6.webp";

// Imagens do nicho Barbearia
import barbearia1 from "@/assets/portfolio/barbearia/1.png";
import barbearia2 from "@/assets/portfolio/barbearia/2.webp";
import barbearia3 from "@/assets/portfolio/barbearia/3.png";
import barbearia4 from "@/assets/portfolio/barbearia/4.webp";
import barbearia5 from "@/assets/portfolio/barbearia/5.webp";
import barbearia6 from "@/assets/portfolio/barbearia/6.webp";

// Imagens do nicho Clínica Estética
import clinica1 from "@/assets/portfolio/clinica/1.png";
import clinica2 from "@/assets/portfolio/clinica/2.png";
import clinica3 from "@/assets/portfolio/clinica/3.png";
import clinica4 from "@/assets/portfolio/clinica/4.png";
import clinica5 from "@/assets/portfolio/clinica/5.png";
import clinica6 from "@/assets/portfolio/clinica/6.png";

interface Profile {
  username: string;
  bio: string;
  posts: string;
  followers: string;
  following: string;
  accentColor: string;
  avatar: string;
  slides: string[];
}

const profiles: Profile[] = [
  {
    username: "@acai.freshbr",
    bio: "🍇 Açaí premium gelado • Sabor que vicia",
    posts: "284",
    followers: "12,4k",
    following: "320",
    accentColor: "#9b59b6",
    avatar: acai1,
    slides: [acai1, acai2, acai3, acai4, acai5, acai6],
  },
  {
    username: "@barbearia.elite",
    bio: "✂️ Cortes que definem • Estilo é atitude",
    posts: "512",
    followers: "8,9k",
    following: "215",
    accentColor: "#c9a84c",
    avatar: barbearia1,
    slides: [barbearia1, barbearia2, barbearia3, barbearia4, barbearia5, barbearia6],
  },
  {
    username: "@clinica.glow",
    bio: "🌸 Beleza & bem-estar • Agende já",
    posts: "341",
    followers: "15,2k",
    following: "408",
    accentColor: "#e91e8c",
    avatar: clinica1,
    slides: [clinica1, clinica2, clinica3, clinica4, clinica5, clinica6],
  },
];

/* ─── COMPONENTE PRINCIPAL ───────────────────────────────────────────────── */

export function InstagramPortfolio() {
  return (
    <section className="py-24 px-4">
      {/* Cabeçalho */}
      <Reveal>
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--brand)] mb-4 block">
            Exemplos de trabalho
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Conheça um pouco do nosso trabalho
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
            <PhoneFrame profile={profile} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── PHONE FRAME ────────────────────────────────────────────────────────── */

function PhoneFrame({ profile }: { profile: Profile }) {
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
      <div className="px-3 pt-3 pb-2" style={{ borderBottom: "1px solid var(--border)" }}>
        {/* Avatar + nome */}
        <div className="flex items-center gap-2.5 mb-2.5">
          <div
            className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"
            style={{ border: `2px solid ${profile.accentColor}` }}
          >
            <img
              src={profile.avatar}
              alt={profile.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
              {profile.username}
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: "var(--muted-foreground)" }}>
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
              <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
                {s.value}
              </p>
              <p className="text-[9px]" style={{ color: "var(--muted-foreground)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid de posts */}
      <div className="grid grid-cols-3" style={{ gap: 1, background: "var(--border)" }}>
        {profile.slides.map((src, si) => (
          <div key={si} className="aspect-square overflow-hidden">
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
