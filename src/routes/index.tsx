import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { LivingBackground } from "@/components/ds/LivingBackground";
import { FloatingWhatsApp } from "@/components/ds/FloatingWhatsApp";
import { CursorGlow } from "@/components/motion/CursorGlow";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ServiceSelector } from "@/components/sections/ServiceSelector";
import { Model } from "@/components/sections/Model";
import { Authority } from "@/components/sections/Authority";
import { InstagramPortfolio } from "@/components/sections/InstagramPortfolio";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

const title = "MA Growth — Marketing digital pontual, sem contrato engessado";
const description =
  "Contrate só o que sua empresa precisa: landing pages de alta conversão, automação de WhatsApp, tráfego pago e social media. Fale direto com o Matheus.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Loader() {
  return (
    <motion.div
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[80] grid place-items-center bg-background"
    >
      <div className="flex flex-col items-center gap-5">
        <span className="shimmer-text text-sm tracking-[0.4em] uppercase">MA Growth</span>
        <span className="h-px w-40 overflow-hidden bg-border">
          <motion.span
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="block h-full w-full bg-[image:var(--gradient-brand)]"
          />
        </span>
      </div>
    </motion.div>
  );
}

function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <SmoothScroll />
      <LivingBackground />
      <CursorGlow />
      <ScrollProgress />
      <AnimatePresence>{loading ? <Loader key="loader" /> : null}</AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: loading ? 0 : 1, y: loading ? 12 : 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Navbar />
        <main>
          <Hero />
          <ServiceSelector />
          <InstagramPortfolio />
          <Model />
          <Authority />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </motion.div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "MA Growth",
            description,
            areaServed: "BR",
            founder: { "@type": "Person", name: "Matheus Almeida Vieira" },
            email: "almenterprisesbr@gmail.com",
            telephone: "+5513988631429",
            sameAs: ["https://instagram.com/ma.growthbr"],
          }),
        }}
      />
    </>
  );
}
