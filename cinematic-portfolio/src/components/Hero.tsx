"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CinematicMedia from "./CinematicMedia";
import { hero } from "@/lib/content";
import { DURATION, EASE_PREMIUM, STAGGER } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);
  const darken = useTransform(scrollYProgress, [0, 1], [0.55, 0.92]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-void"
    >
      <div className="absolute inset-0">
        <CinematicMedia
          webmSrc="/videos/hero.webm"
          mp4Src="/videos/hero.mp4"
          poster="/media/hero-poster.webp"
          tone="amber"
        />
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-void/10"
        style={reducedMotion ? undefined : { opacity: darken }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-void/70 via-transparent to-transparent" />

      <motion.div
        style={reducedMotion ? undefined : { opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 lg:px-10 lg:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, delay: 0.15, ease: EASE_PREMIUM }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-accent"
        >
          {hero.eyebrow}
        </motion.p>

        <motion.h1
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: STAGGER.base, delayChildren: 0.3 } } }}
          className="max-w-4xl font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.05] tracking-tight text-primary"
        >
          {hero.headline.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                variants={{
                  initial: { y: "110%" },
                  animate: { y: "0%", transition: { duration: DURATION.slow, ease: EASE_PREMIUM } },
                }}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, delay: 0.9, ease: EASE_PREMIUM }}
          className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-secondary"
        >
          {hero.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, delay: 1.05, ease: EASE_PREMIUM }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <a
            href={hero.ctaPrimary.href}
            className="rounded-full bg-accent px-7 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-void transition-transform duration-300 hover:-translate-y-0.5"
          >
            {hero.ctaPrimary.label}
          </a>
          <a
            href={hero.ctaSecondary.href}
            className="font-mono text-xs uppercase tracking-[0.14em] text-secondary underline decoration-border-strong underline-offset-8 transition-colors hover:text-primary hover:decoration-accent"
          >
            {hero.ctaSecondary.label}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.base, delay: 1.4, ease: EASE_PREMIUM }}
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center"
        aria-hidden="true"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-border-strong p-1.5">
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-accent"
            animate={reducedMotion ? undefined : { y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: EASE_PREMIUM }}
          />
        </div>
      </motion.div>
    </section>
  );
}
