"use client";

import { motion } from "framer-motion";
import { cta, site } from "@/lib/content";
import { DURATION, EASE_PREMIUM } from "@/lib/motion";

export default function CTAFooter() {
  return (
    <footer id="contact" className="relative bg-elevated px-6 pb-10 pt-28 lg:px-10 lg:pt-40">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: DURATION.slow, ease: EASE_PREMIUM }}
          className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-tight text-primary"
        >
          {cta.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: DURATION.base, delay: 0.15, ease: EASE_PREMIUM }}
          className="mx-auto mt-6 max-w-md text-lg text-secondary"
        >
          {cta.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: DURATION.base, delay: 0.3, ease: EASE_PREMIUM }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6"
        >
          <a
            href={cta.primary.href}
            className="rounded-full bg-accent px-8 py-4 font-mono text-xs uppercase tracking-[0.14em] text-void transition-transform duration-300 hover:-translate-y-0.5"
          >
            {cta.primary.label}
          </a>
          <div className="flex items-center gap-6">
            {cta.secondary.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-[0.14em] text-secondary underline decoration-border-strong underline-offset-8 transition-colors hover:text-primary hover:decoration-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mx-auto mt-28 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-hairline pt-8 text-sm text-muted sm:flex-row">
        <p>
          {site.name} · {site.location}
        </p>
        <p className="font-mono text-xs uppercase tracking-[0.12em]">{site.role}</p>
      </div>
    </footer>
  );
}
