"use client";

import { motion } from "framer-motion";
import { approach } from "@/lib/content";
import { DURATION, EASE_PREMIUM, STAGGER } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function Approach() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="approach" aria-labelledby="approach-heading" className="bg-void px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <motion.p
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: DURATION.base, ease: EASE_PREMIUM }}
            className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-accent"
          >
            {approach.kicker}
          </motion.p>
          <motion.h2
            id="approach-heading"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: DURATION.base, delay: 0.1, ease: EASE_PREMIUM }}
            className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight tracking-tight text-primary"
          >
            {approach.heading}
          </motion.h2>
        </div>

        <motion.div
          initial={reducedMotion ? false : "initial"}
          whileInView="animate"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={{ animate: { transition: { staggerChildren: STAGGER.base } } }}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2"
        >
          {approach.cards.map((card) => (
            <motion.div
              key={card.title}
              variants={{
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_PREMIUM } },
              }}
              className="bg-void p-8 transition-colors duration-300 hover:bg-elevated lg:p-10"
            >
              <h3 className="mb-3 font-display text-xl text-primary">{card.title}</h3>
              <p className="text-sm leading-relaxed text-secondary">{card.description}</p>
              <details className="mt-5 border-t border-hairline pt-3">
                <summary className="min-h-8 cursor-pointer text-sm font-medium text-accent">How I applied it</summary>
                <p className="pt-2 text-sm leading-relaxed text-secondary">{card.example}</p>
              </details>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
