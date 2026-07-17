"use client";

import { motion } from "framer-motion";
import { results } from "@/lib/content";
import { DURATION, EASE_PREMIUM, STAGGER } from "@/lib/motion";

export default function Results() {
  return (
    <section id="results" aria-labelledby="results-heading" className="bg-elevated px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: DURATION.base, ease: EASE_PREMIUM }}
            className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-accent"
          >
            {results.kicker}
          </motion.p>
          <motion.h2
            id="results-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: DURATION.base, delay: 0.1, ease: EASE_PREMIUM }}
            className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight tracking-tight text-primary"
          >
            {results.heading}
          </motion.h2>
        </div>

        <motion.dl
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-10% 0px" }}
          variants={{ animate: { transition: { staggerChildren: STAGGER.base } } }}
          className="grid grid-cols-2 gap-8 border-y border-hairline py-12 sm:grid-cols-4"
        >
          {results.metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_PREMIUM } },
              }}
            >
              <dt className="sr-only">{metric.label}</dt>
              <dd className="font-display text-4xl text-accent lg:text-5xl">{metric.value}</dd>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-primary">{metric.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-secondary">{metric.context}</p>
            </motion.div>
          ))}
        </motion.dl>

        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: DURATION.base, delay: 0.15, ease: EASE_PREMIUM }}
          className="mt-14 max-w-2xl font-display text-xl italic leading-relaxed text-secondary lg:text-2xl"
        >
          {results.statement}
        </motion.blockquote>
      </div>
    </section>
  );
}
