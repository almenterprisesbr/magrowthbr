import { useRef, useState, useEffect, useId, useCallback } from "react";
import { motion, AnimatePresence, useInView, useAnimation } from "motion/react";
import { Search, Megaphone, Monitor, Phone, Star, ArrowRight } from "lucide-react";

import { Section, Eyebrow, Heading, Lead } from "@/components/ds/Section";
import { Reveal } from "@/components/motion/Reveal";

/* ─── Types ─────────────────────────────────────────────────────────────── */

type CardId = "diagnostico" | "atracao" | "conversao" | "leads";
type PillId = "social" | "sites" | "identidade" | "consultoria";

interface StepCard {
  id: CardId;
  step: string;
  title: string;
  subtitle?: string;
  content: string;
  Icon: React.ElementType;
}

interface ServicePill {
  id: PillId;
  label: string;
  linkedCard?: CardId;
}

/* ─── Static Data ───────────────────────────────────────────────────────── */

const STEPS: StepCard[] = [
  {
    id: "diagnostico",
    step: "01.",
    title: "Diagnóstico & Estratégia",
    subtitle: "(1 a 2 Semanas)",
    content: "Análise e estudo estratégico do mercado e público do seu nicho.",
    Icon: Search,
  },
  {
    id: "atracao",
    step: "02.",
    title: "Atração Estratégica",
    content: "Criação de Conteúdos e mídias ideais para despertar interesse digital.",
    Icon: Megaphone,
  },
  {
    id: "conversao",
    step: "03.",
    title: "Estrutura de Conversão",
    subtitle: "(Site/Landing Page)",
    content: "Páginas de alta conversão para autoridade e leads qualificados.",
    Icon: Monitor,
  },
  {
    id: "leads",
    step: "04.",
    title: "Geração de Leads",
    subtitle: "(WhatsApp Comercial)",
    content:
      "Sua equipe recebe contatos de clientes (ICP) com alto potencial de compra, os clientes ideais.",
    Icon: Phone,
  },
];

const PILLS: ServicePill[] = [
  { id: "social",      label: "Social Media Pontual",    linkedCard: "atracao"    },
  { id: "sites",       label: "Sites & Landing Pages",   linkedCard: "conversao"  },
  { id: "identidade",  label: "Identidade Visual"                                 },
  { id: "consultoria", label: "Consultoria Estratégica", linkedCard: "diagnostico"},
];

const WHATSAPP_URL =
  "https://wa.me/5513988631429?text=Ol%C3%A1%2C%20quero%20agendar%20meu%20diagn%C3%B3stico%20estrat%C3%A9gico";

/* ─── Background Wave SVG ───────────────────────────────────────────────── */

function BackgroundWave() {
  const id = useId();
  const filterId = `wave-glow-${id}`;
  const gradId   = `wave-grad-${id}`;

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 w-full overflow-visible opacity-60"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      style={{ height: 120 }}
    >
      <defs>
        <filter id={filterId} x="-30%" y="-200%" width="160%" height="500%">
          <feGaussianBlur stdDeviation="6" result="blur1" />
          <feGaussianBlur stdDeviation="14" result="blur2" in="SourceGraphic" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#8f0009" stopOpacity="0" />
          <stop offset="20%"  stopColor="#e30713" stopOpacity="0.7" />
          <stop offset="50%"  stopColor="#ff4550" stopOpacity="1" />
          <stop offset="80%"  stopColor="#e30713" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#8f0009" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Outer soft glow path */}
      <motion.path
        d="M0,60 C150,20 300,100 450,60 C600,20 750,100 900,60 C1050,20 1150,80 1200,60"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="18"
        strokeLinecap="round"
        filter={`url(#${filterId})`}
        opacity={0.35}
        animate={{ d: [
          "M0,60 C150,20 300,100 450,60 C600,20 750,100 900,60 C1050,20 1150,80 1200,60",
          "M0,60 C150,95 300,25 450,60 C600,95 750,25 900,60 C1050,95 1150,40 1200,60",
          "M0,60 C150,20 300,100 450,60 C600,20 750,100 900,60 C1050,20 1150,80 1200,60",
        ]}}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Core bright wave */}
      <motion.path
        d="M0,60 C150,20 300,100 450,60 C600,20 750,100 900,60 C1050,20 1150,80 1200,60"
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        filter={`url(#${filterId})`}
        animate={{ d: [
          "M0,60 C150,20 300,100 450,60 C600,20 750,100 900,60 C1050,20 1150,80 1200,60",
          "M0,60 C150,95 300,25 450,60 C600,95 750,25 900,60 C1050,95 1150,40 1200,60",
          "M0,60 C150,20 300,100 450,60 C600,20 750,100 900,60 C1050,20 1150,80 1200,60",
        ]}}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
      />
    </svg>
  );
}

/* ─── Laser Beam (pill → card) ──────────────────────────────────────────── */

function LaserBeam({
  pillEl,
  cardEl,
  containerEl,
}: {
  pillEl: HTMLElement | null;
  cardEl: HTMLElement | null;
  containerEl: HTMLElement | null;
}) {
  const id = useId();
  const filterId = `laser-glow-${id}`;
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    if (!pillEl || !cardEl || !containerEl) { setPath(null); return; }

    function calc() {
      if (!pillEl || !cardEl || !containerEl) return;
      const cr = containerEl.getBoundingClientRect();
      const pr = pillEl.getBoundingClientRect();
      const tr = cardEl.getBoundingClientRect();

      const px = pr.left + pr.width  / 2 - cr.left;
      const py = pr.top  + pr.height / 2 - cr.top;
      const tx = tr.left + tr.width  / 2 - cr.left;
      const ty = tr.top  + tr.height     - cr.top;

      const midy = py + (ty - py) * 0.45;
      setPath(`M ${px} ${py} C ${px} ${midy}, ${tx} ${midy}, ${tx} ${ty}`);
    }

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [pillEl, cardEl, containerEl]);

  if (!path) return null;

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block"
      style={{ zIndex: 20 }}
    >
      <defs>
        <filter id={filterId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Glow halo */}
      <motion.path
        d={path}
        fill="none"
        stroke="#e30713"
        strokeWidth="8"
        strokeLinecap="round"
        opacity={0.18}
        filter={`url(#${filterId})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.18 }}
        exit={{ pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Core laser */}
      <motion.path
        d={path}
        fill="none"
        stroke="#ff4550"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="5 4"
        filter={`url(#${filterId})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        exit={{ pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/* ─── Step Card ─────────────────────────────────────────────────────────── */

const SPRING = { type: "spring" as const, stiffness: 280, damping: 22 };

function StepCard({
  card,
  isActive,
  onEnter,
  onLeave,
  cardRef,
  index,
}: {
  card: StepCard;
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
  index: number;
}) {
  const { Icon, step, title, subtitle, content } = card;

  return (
    <Reveal delay={index * 0.08} variant="fade-up">
      <motion.div
        ref={cardRef}
        className="relative flex h-full cursor-default flex-col gap-4 rounded-2xl border p-6"
        /* NEUTRAL start — NO static glow */
        initial={{
          borderColor: "rgba(35,35,35,1)",
          backgroundColor: "rgba(18,18,27,1)",
          boxShadow: "0 0 0px rgba(239,68,68,0)",
        }}
        animate={
          isActive
            ? {
                borderColor: "rgba(239,68,68,0.75)",
                backgroundColor: "rgba(22,3,4,1)",
                boxShadow:
                  "0 0 30px rgba(239,68,68,0.4), 0 0 60px rgba(239,68,68,0.12)",
                scale: 1.05,
              }
            : {
                borderColor: "rgba(35,35,35,1)",
                backgroundColor: "rgba(18,18,27,1)",
                boxShadow: "0 0 0px rgba(239,68,68,0)",
                scale: 1,
              }
        }
        transition={SPRING}
        onHoverStart={onEnter}
        onHoverEnd={onLeave}
        onFocus={onEnter}
        onBlur={onLeave}
        tabIndex={0}
        role="article"
        aria-label={`${step} ${title}`}
      >
        {/* Number + icon row */}
        <div className="flex items-center justify-between">
          <motion.span
            className="font-display text-[11px] font-semibold tracking-[0.22em]"
            animate={{ color: isActive ? "#e30713" : "#6b6b6b" }}
            transition={{ duration: 0.25 }}
          >
            {step}
          </motion.span>

          <motion.div
            className="grid size-9 place-items-center rounded-xl"
            animate={{
              backgroundColor: isActive
                ? "rgba(227,7,19,0.2)"
                : "rgba(255,255,255,0.04)",
            }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              animate={{ color: isActive ? "#e30713" : "#6b6b6b" }}
              transition={{ duration: 0.25 }}
            >
              <Icon size={17} />
            </motion.div>
          </motion.div>
        </div>

        {/* Title */}
        <div>
          <h3 className="font-display text-sm font-semibold leading-snug text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-[10px] tracking-wide text-zinc-600">{subtitle}</p>
          )}
        </div>

        {/* Body */}
        <p className="text-[13px] leading-relaxed text-zinc-500">{content}</p>

        {/* Bottom accent line — only on active */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              key="accent"
              className="absolute bottom-0 left-1/2 h-px w-3/5 -translate-x-1/2 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #e30713, transparent)",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </Reveal>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export function Ecossistema() {
  /* hover state: card hovered directly, or pill-driven */
  const [directHover,  setDirectHover]  = useState<CardId | null>(null);
  const [hoveredPill,  setHoveredPill]  = useState<PillId | null>(null);

  /* DOM refs */
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const pillElRef     = useRef<HTMLElement | null>(null);
  const containerRef  = useRef<HTMLDivElement>(null);

  /* CTA reveal */
  const inView      = useInView(containerRef, { once: true, margin: "-100px" });
  const ctaControls = useAnimation();
  useEffect(() => { if (inView) ctaControls.start({ opacity: 1, y: 0 }); }, [inView, ctaControls]);

  /* Derive active card (direct hover wins, then pill-linked) */
  const activePill = PILLS.find((p) => p.id === hoveredPill);
  const pillTarget = activePill?.linkedCard ?? null;
  const activeCard: CardId | null = directHover ?? pillTarget;

  /* Laser: which DOM elements */
  const targetCardEl = activeCard
    ? cardRefs.current[STEPS.findIndex((s) => s.id === activeCard)] ?? null
    : null;

  const handlePillEnter = useCallback(
    (pill: ServicePill, el: HTMLElement | null) => {
      setHoveredPill(pill.id);
      pillElRef.current = el;
    },
    []
  );
  const handlePillLeave = useCallback(() => {
    setHoveredPill(null);
    pillElRef.current = null;
  }, []);

  return (
    <Section id="ecossistema" label="Ecossistema MA Growth">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-4 text-center">
        <Reveal>
          <Eyebrow>Ecossistema MA Growth</Eyebrow>
        </Reveal>
        <Reveal delay={0.07}>
          <Heading className="max-w-3xl">Estratégia que traz resultados.</Heading>
        </Reveal>
        <Reveal delay={0.13}>
          <Lead className="mx-auto text-center">
            Diagnóstico estratégico profundo para um ecossistema funcional de
            geração de leads de venda.
          </Lead>
        </Reveal>
      </div>

      {/* ── Cards + wave + laser ─────────────────────────────────────────── */}
      <div ref={containerRef} className="relative mt-16">

        {/* Fluid neon background wave (always visible, behind cards) */}
        <BackgroundWave />

        {/* Cards grid */}
        <div className="relative z-10 grid gap-4 md:grid-cols-4">
          {STEPS.map((card, i) => (
            <StepCard
              key={card.id}
              card={card}
              isActive={activeCard === card.id}
              onEnter={() => setDirectHover(card.id)}
              onLeave={() => setDirectHover(null)}
              cardRef={(el) => { cardRefs.current[i] = el; }}
              index={i}
            />
          ))}
        </div>

        {/* Laser beam overlay — only when a linked pill is hovered */}
        <AnimatePresence>
          {pillTarget && pillElRef.current && targetCardEl && (
            <LaserBeam
              key={pillTarget}
              pillEl={pillElRef.current}
              cardEl={targetCardEl}
              containerEl={containerRef.current}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── Flexible hiring block ─────────────────────────────────────────── */}
      <Reveal delay={0.1} variant="fade-up">
        <div
          className="relative mt-6 overflow-hidden rounded-2xl border border-zinc-800 p-6 md:p-8"
          style={{ background: "rgba(13,13,13,0.95)" }}
        >
          {/* Title */}
          <div className="flex items-center gap-2">
            <Star size={13} className="fill-yellow-400 text-yellow-400" />
            <span className="font-display text-[11px] font-semibold tracking-[0.24em] text-white uppercase">
              Modelo de Contratação Flexível
            </span>
          </div>

          {/* Banner */}
          <div
            className="mt-4 rounded-xl border border-red-900/30 px-4 py-3"
            style={{
              background: "linear-gradient(120deg,rgba(22,3,4,0.9),rgba(14,2,3,0.9))",
              boxShadow: "inset 0 0 40px rgba(227,7,19,0.06)",
            }}
          >
            <p className="text-[13px] text-zinc-300">
              <span className="font-semibold text-white">
                ECOSSISTEMA MA GROWTH (Solução Completa):
              </span>{" "}
              Planejamento e escala ponta a ponta.
            </p>
          </div>

          {/* Service Pills */}
          <div className="mt-5 flex flex-wrap gap-3">
            {PILLS.map((pill) => {
              const isHovered = hoveredPill === pill.id;
              const hasLink   = !!pill.linkedCard;

              return (
                <motion.button
                  key={pill.id}
                  type="button"
                  className="rounded-full border px-4 py-2 text-xs font-medium"
                  initial={{
                    borderColor: "rgba(35,35,35,1)",
                    backgroundColor: "rgba(18,18,27,0.6)",
                    color: "#6b6b6b",
                    boxShadow: "0 0 0px rgba(239,68,68,0)",
                  }}
                  animate={
                    isHovered
                      ? {
                          borderColor: "rgba(239,68,68,0.75)",
                          backgroundColor: "rgba(22,3,4,1)",
                          color: "#ffffff",
                          boxShadow: "0 0 18px rgba(239,68,68,0.35)",
                          scale: 1.07,
                        }
                      : {
                          borderColor: "rgba(35,35,35,1)",
                          backgroundColor: "rgba(18,18,27,0.6)",
                          color: "#6b6b6b",
                          boxShadow: "0 0 0px rgba(239,68,68,0)",
                          scale: 1,
                        }
                  }
                  transition={SPRING}
                  onHoverStart={(_, info) => {
                    /* capture the DOM node via ref callback pattern */
                    handlePillEnter(pill, (info.target as HTMLElement) ?? null);
                  }}
                  onHoverEnd={() => handlePillLeave()}
                  ref={(el) => {
                    if (isHovered) pillElRef.current = el;
                  }}
                >
                  <span className="flex items-center gap-1.5">
                    <AnimatePresence>
                      {hasLink && isHovered && (
                        <motion.span
                          key="dot"
                          className="size-1.5 shrink-0 rounded-full bg-red-500"
                          style={{ boxShadow: "0 0 6px #e30713" }}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>
                    {pill.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Contextual hint */}
          <AnimatePresence>
            {hoveredPill && activePill?.linkedCard && (
              <motion.p
                key="hint"
                className="mt-3 text-[11px] text-zinc-600"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.22 }}
              >
                ↑ Conectado ao passo{" "}
                {STEPS.find((s) => s.id === activePill.linkedCard)?.step}{" "}
                {STEPS.find((s) => s.id === activePill.linkedCard)?.title}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </Reveal>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <motion.div
        className="mt-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={ctaControls}
        transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center gap-3 overflow-hidden rounded-xl px-8 py-4 text-sm font-bold tracking-widest text-white uppercase"
          style={{
            background: "linear-gradient(120deg,#8f0009,#e30713 55%,#ff4550)",
            boxShadow: "0 0 28px rgba(227,7,19,0.35)",
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 44px rgba(239,68,68,0.55)",
          }}
          whileTap={{ scale: 0.97 }}
          transition={SPRING}
        >
          {/* Animated border ring on hover */}
          <span className="absolute inset-0 rounded-xl ring-1 ring-red-500/30" />
          [ Agendar Diagnóstico Estratégico ]
          <ArrowRight size={15} />
        </motion.a>
        <p className="text-xs text-zinc-600">
          Conversa objetiva para alinhar seu ecossistema.
        </p>
      </motion.div>
    </Section>
  );
}
