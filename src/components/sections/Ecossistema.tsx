import { useRef, useState, useEffect, useId } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "motion/react";
import {
  Search,
  Megaphone,
  Monitor,
  Phone,
  Star,
  ArrowRight,
} from "lucide-react";

import { Section, Eyebrow, Heading, Lead } from "@/components/ds/Section";
import { Reveal } from "@/components/motion/Reveal";

/* ─── Types ───────────────────────────────────────────────────────────────── */

type CardId = "diagnostico" | "atracao" | "conversao" | "leads";
type PillId = "social" | "sites" | "identidade" | "consultoria";

interface StepCard {
  id: CardId;
  step: string;
  title: string;
  content: string;
  Icon: React.ElementType;
  highlight: boolean;
}

interface ServicePill {
  id: PillId;
  label: string;
  linkedCard?: CardId;
}

/* ─── Data ────────────────────────────────────────────────────────────────── */

const STEPS: StepCard[] = [
  {
    id: "diagnostico",
    step: "01.",
    title: "Diagnóstico & Estratégia",
    content: "Análise e estudo estratégico do mercado e público do seu nicho.",
    Icon: Search,
    highlight: true,
  },
  {
    id: "atracao",
    step: "02.",
    title: "Atração Estratégica",
    content: "Criação de Conteúdos e mídias ideais para despertar interesse digital.",
    Icon: Megaphone,
    highlight: false,
  },
  {
    id: "conversao",
    step: "03.",
    title: "Estrutura de Conversão",
    content: "Páginas de alta conversão para autoridade e leads qualificados.",
    Icon: Monitor,
    highlight: true,
  },
  {
    id: "leads",
    step: "04.",
    title: "Geração de Leads",
    content:
      "Sua equipe recebe contatos de clientes (ICP) com alto potencial de compra, os clientes ideais.",
    Icon: Phone,
    highlight: false,
  },
];

const PILLS: ServicePill[] = [
  { id: "social", label: "Social Media Pontual" },
  { id: "sites", label: "Sites & Landing Pages", linkedCard: "conversao" },
  { id: "identidade", label: "Identidade Visual" },
  { id: "consultoria", label: "Consultoria Estratégica", linkedCard: "diagnostico" },
];

const WHATSAPP_URL =
  "https://wa.me/5513988631429?text=Ol%C3%A1%2C%20quero%20agendar%20meu%20diagn%C3%B3stico%20estrat%C3%A9gico";

/* ─── Flow Beam SVG ───────────────────────────────────────────────────────── */

function FlowBeam({
  cardRefs,
  hoveredCard,
  pillTarget,
  pillRef,
}: {
  cardRefs: React.RefObject<(HTMLDivElement | null)[]>;
  hoveredCard: CardId | null;
  pillTarget: CardId | null;
  pillRef: React.RefObject<HTMLDivElement | null>;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [paths, setPaths] = useState<string[]>([]);
  const [laserPath, setLaserPath] = useState<string | null>(null);
  const gradId = useId();
  const glowId = useId();

  useEffect(() => {
    function compute() {
      const svg = svgRef.current;
      if (!svg) return;
      const svgRect = svg.getBoundingClientRect();

      const centers = cardRefs.current!
        .map((el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {
            x: r.left + r.width / 2 - svgRect.left,
            y: r.top + r.height / 2 - svgRect.top,
          };
        })
        .filter(Boolean) as { x: number; y: number }[];

      if (centers.length < 2) return;

      const newPaths: string[] = [];
      for (let i = 0; i < centers.length - 1; i++) {
        const a = centers[i];
        const b = centers[i + 1];
        const mx = (a.x + b.x) / 2;
        newPaths.push(`M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`);
      }
      setPaths(newPaths);

      // Laser beam from pill to card
      if (pillTarget && pillRef.current) {
        const pillRect = pillRef.current.getBoundingClientRect();
        const pillX = pillRect.left + pillRect.width / 2 - svgRect.left;
        const pillY = pillRect.top + pillRect.height / 2 - svgRect.top;

        const targetIdx = STEPS.findIndex((s) => s.id === pillTarget);
        const targetEl = cardRefs.current![targetIdx];
        if (targetEl) {
          const targetRect = targetEl.getBoundingClientRect();
          const tx = targetRect.left + targetRect.width / 2 - svgRect.left;
          const ty = targetRect.top + targetRect.height - svgRect.top;
          const midy = (pillY + ty) / 2;
          setLaserPath(
            `M ${pillX} ${pillY} C ${pillX} ${midy}, ${tx} ${midy}, ${tx} ${ty}`
          );
        }
      } else {
        setLaserPath(null);
      }
    }

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [cardRefs, pillTarget, pillRef]);

  const isActive = hoveredCard !== null || pillTarget !== null;

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible md:block"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="40%" stopColor="#e30713" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#ff4550" stopOpacity="0.9" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base connector lines */}
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="#232323"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      ))}

      {/* Animated energy wave */}
      {paths.map((d, i) => (
        <motion.path
          key={`beam-${i}`}
          d={d}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={isActive ? 2.5 : 1.5}
          strokeLinecap="round"
          filter={`url(#${glowId})`}
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: isActive ? 1 : 0.5 }}
          transition={{
            pathLength: {
              duration: 2.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              delay: i * 0.4,
            },
            opacity: { duration: 0.3 },
          }}
        />
      ))}

      {/* Laser beam from pill */}
      <AnimatePresence>
        {laserPath && (
          <motion.path
            key="laser"
            d={laserPath}
            fill="none"
            stroke="#ff4550"
            strokeWidth="2"
            strokeDasharray="6 4"
            strokeLinecap="round"
            filter={`url(#${glowId})`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ opacity: 0, pathLength: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
    </svg>
  );
}

/* ─── Step Card ───────────────────────────────────────────────────────────── */

function StepCard({
  card,
  isActive,
  onHover,
  cardRef,
  index,
}: {
  card: StepCard;
  isActive: boolean;
  onHover: (id: CardId | null) => void;
  cardRef: (el: HTMLDivElement | null) => void;
  index: number;
}) {
  const { Icon, step, title, content, highlight } = card;

  return (
    <Reveal delay={index * 0.09} variant="fade-up">
      <motion.div
        ref={cardRef}
        className="relative flex h-full cursor-default flex-col gap-5 rounded-2xl border p-6 transition-colors duration-300"
        style={{
          borderColor: isActive
            ? "rgba(239,68,68,0.7)"
            : highlight
            ? "rgba(227,7,19,0.35)"
            : "rgba(35,35,35,1)",
          background: isActive
            ? "rgba(26,3,4,0.95)"
            : highlight
            ? "rgba(20,2,3,0.85)"
            : "rgba(18,18,27,0.85)",
          boxShadow: isActive
            ? "0 0 32px rgba(239,68,68,0.35), 0 0 64px rgba(239,68,68,0.12)"
            : highlight
            ? "0 0 20px rgba(227,7,19,0.15)"
            : "none",
        }}
        animate={{ scale: isActive ? 1.04 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        onHoverStart={() => onHover(card.id)}
        onHoverEnd={() => onHover(null)}
        onFocus={() => onHover(card.id)}
        onBlur={() => onHover(null)}
        tabIndex={0}
        role="article"
        aria-label={`${step} ${title}`}
      >
        {/* Step number + icon */}
        <div className="flex items-center justify-between">
          <span
            className="font-display text-xs font-semibold tracking-[0.2em]"
            style={{ color: isActive || highlight ? "#e30713" : "#9a9a9a" }}
          >
            {step}
          </span>
          <motion.div
            className="grid size-9 place-items-center rounded-xl"
            animate={{
              backgroundColor: isActive
                ? "rgba(227,7,19,0.18)"
                : highlight
                ? "rgba(227,7,19,0.1)"
                : "rgba(255,255,255,0.04)",
            }}
            transition={{ duration: 0.25 }}
          >
            <Icon
              size={18}
              style={{ color: isActive || highlight ? "#e30713" : "#9a9a9a" }}
            />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="font-display text-sm font-semibold leading-snug text-white">
          {title}
          {card.id === "diagnostico" && (
            <span className="mt-1 block text-[10px] font-normal tracking-wide text-zinc-500">
              (1 a 2 Semanas)
            </span>
          )}
          {card.id === "conversao" && (
            <span className="mt-1 block text-[10px] font-normal tracking-wide text-zinc-500">
              (Site/Landing Page)
            </span>
          )}
          {card.id === "leads" && (
            <span className="mt-1 block text-[10px] font-normal tracking-wide text-zinc-500">
              (WhatsApp Comercial)
            </span>
          )}
        </h3>

        {/* Content */}
        <p className="text-[13px] leading-relaxed text-zinc-400">{content}</p>

        {/* Active indicator */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #e30713, transparent)" }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </Reveal>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────────── */

export function Ecossistema() {
  const [hoveredCard, setHoveredCard] = useState<CardId | null>(null);
  const [hoveredPill, setHoveredPill] = useState<PillId | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const ctaControls = useAnimation();

  useEffect(() => {
    if (inView) ctaControls.start({ opacity: 1, y: 0 });
  }, [inView, ctaControls]);

  const activePill = PILLS.find((p) => p.id === hoveredPill);
  const pillTargetCard = activePill?.linkedCard ?? null;

  // Which pill DOM element is being hovered (for laser)
  const [activePillEl, setActivePillEl] = useState<HTMLDivElement | null>(null);
  const localPillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    pillRef.current = activePillEl;
  }, [activePillEl]);

  const effectiveHover = hoveredCard ?? (pillTargetCard ? pillTargetCard : null);

  return (
    <Section id="ecossistema" label="Ecossistema MA Growth">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <Reveal>
          <Eyebrow>Ecossistema MA Growth</Eyebrow>
        </Reveal>
        <Reveal delay={0.07}>
          <Heading className="max-w-3xl">Estratégia que traz resultados.</Heading>
        </Reveal>
        <Reveal delay={0.13}>
          <Lead className="mx-auto text-center">
            Diagnóstico estratégico profundo para um ecossistema funcional de geração de leads de venda.
          </Lead>
        </Reveal>
      </div>

      {/* Cards grid + SVG overlay */}
      <div ref={containerRef} className="relative mt-16">
        <div className="grid gap-4 md:grid-cols-4">
          {STEPS.map((card, i) => (
            <StepCard
              key={card.id}
              card={card}
              isActive={effectiveHover === card.id}
              onHover={setHoveredCard}
              cardRef={(el) => {
                cardRefs.current[i] = el;
              }}
              index={i}
            />
          ))}
        </div>

        <FlowBeam
          cardRefs={cardRefs as React.RefObject<(HTMLDivElement | null)[]>}
          hoveredCard={hoveredCard}
          pillTarget={pillTargetCard}
          pillRef={pillRef as React.RefObject<HTMLDivElement | null>}
        />
      </div>

      {/* Flexible hiring block */}
      <Reveal delay={0.1} variant="fade-up">
        <div
          className="mt-6 rounded-2xl border border-zinc-800 p-6 md:p-8"
          style={{ background: "rgba(13,13,13,0.9)" }}
        >
          {/* Header */}
          <div className="flex items-center gap-2">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="font-display text-xs font-semibold tracking-[0.22em] text-white uppercase">
              Modelo de Contratação Flexível
            </span>
          </div>

          {/* Ecosystem banner */}
          <motion.div
            className="mt-4 rounded-xl border border-red-900/40 px-4 py-3"
            style={{
              background: "linear-gradient(120deg, rgba(26,3,4,0.9), rgba(18,2,3,0.9))",
              boxShadow: "0 0 20px rgba(227,7,19,0.1)",
            }}
            whileHover={{ boxShadow: "0 0 30px rgba(227,7,19,0.2)" }}
          >
            <p className="text-[13px] text-zinc-300">
              <span className="font-semibold text-white">
                ECOSSISTEMA MA GROWTH (Solução Completa):
              </span>{" "}
              Planejamento e escala ponta a ponta.
            </p>
          </motion.div>

          {/* Pills */}
          <div className="mt-5 flex flex-wrap gap-3">
            {PILLS.map((pill) => {
              const isHovered = hoveredPill === pill.id;
              const hasLink = !!pill.linkedCard;
              return (
                <motion.div
                  key={pill.id}
                  ref={isHovered ? (el) => setActivePillEl(el) : undefined}
                  className="cursor-default rounded-full border px-4 py-2 text-xs font-medium transition-colors duration-200"
                  style={{
                    borderColor: isHovered
                      ? "rgba(239,68,68,0.8)"
                      : "rgba(35,35,35,1)",
                    background: isHovered
                      ? "rgba(26,3,4,0.95)"
                      : "rgba(18,18,27,0.6)",
                    color: isHovered ? "#ffffff" : "#9a9a9a",
                    boxShadow: isHovered
                      ? "0 0 18px rgba(239,68,68,0.3)"
                      : "none",
                  }}
                  animate={{ scale: isHovered ? 1.06 : 1 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  onHoverStart={() => setHoveredPill(pill.id)}
                  onHoverEnd={() => {
                    setHoveredPill(null);
                    setActivePillEl(null);
                  }}
                >
                  <span className="flex items-center gap-1.5">
                    {hasLink && isHovered && (
                      <motion.span
                        className="size-1.5 rounded-full bg-red-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{ boxShadow: "0 0 6px #e30713" }}
                      />
                    )}
                    {pill.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Tooltip hint */}
          <AnimatePresence>
            {hoveredPill && activePill?.linkedCard && (
              <motion.p
                className="mt-3 text-[11px] text-zinc-600"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
              >
                ↑ Conectado ao passo{" "}
                {STEPS.find((s) => s.id === activePill.linkedCard)?.step}{" "}
                {STEPS.find((s) => s.id === activePill.linkedCard)?.title}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </Reveal>

      {/* CTA */}
      <motion.div
        className="mt-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={ctaControls}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl px-8 py-4 text-sm font-bold text-white uppercase tracking-wider"
          style={{
            background: "linear-gradient(120deg, #8f0009, #e30713 55%, #ff4550)",
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Pulse ring */}
          <span
            className="animate-pulse-ring absolute inset-0 rounded-xl"
            style={{
              boxShadow: "0 0 0 0 rgba(227,7,19,0.5)",
              border: "1px solid rgba(227,7,19,0.4)",
            }}
          />
          Agendar Diagnóstico Estratégico
          <ArrowRight size={16} />
        </motion.a>
        <p className="text-xs text-zinc-500">Conversa objetiva para alinhar seu ecossistema.</p>
      </motion.div>
    </Section>
  );
}
