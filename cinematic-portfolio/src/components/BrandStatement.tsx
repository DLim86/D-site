"use client";

import { motion } from "framer-motion";
import { brandStatement } from "@/lib/content";
import { DURATION, EASE_PREMIUM, STAGGER } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function BrandStatement() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="about" aria-labelledby="brand-statement-heading" className="relative bg-void px-6 py-32 lg:px-10 lg:py-44">
      <div className="mx-auto max-w-5xl">
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: DURATION.base, ease: EASE_PREMIUM }}
          className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-accent"
        >
          {brandStatement.kicker}
        </motion.p>

        <motion.h2
          id="brand-statement-heading"
          initial={reducedMotion ? false : "initial"}
          whileInView="animate"
          viewport={{ once: true, margin: "-15% 0px" }}
          variants={{ animate: { transition: { staggerChildren: STAGGER.loose } } }}
          className="font-display text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.2] tracking-tight text-secondary"
        >
          {brandStatement.lines.map((line, i) => (
            <motion.span
              key={i}
              variants={{
                initial: { opacity: 0.15, filter: "blur(6px)" },
                animate: { opacity: 1, filter: "blur(0px)", transition: { duration: DURATION.slow, ease: EASE_PREMIUM } },
              }}
              className={`block ${i >= brandStatement.lines.length - 2 ? "text-primary" : ""}`}
            >
              {line}
            </motion.span>
          ))}
        </motion.h2>
      </div>
    </section>
  );
}
