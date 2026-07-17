"use client";

import { motion } from "framer-motion";
import CinematicMedia from "./CinematicMedia";
import { finalSequence } from "@/lib/content";
import { DURATION, EASE_PREMIUM } from "@/lib/motion";

export default function FinalSequence() {
  return (
    <section aria-labelledby="final-heading" className="relative grid grid-cols-1 bg-void lg:grid-cols-2">
      <div className="relative h-[50vh] lg:h-auto lg:min-h-[560px]">
        <CinematicMedia
          webmSrc="/videos/closing.webm"
          mp4Src="/videos/closing.mp4"
          poster="/media/closing-poster.jpg"
          tone="slate"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent lg:bg-gradient-to-r" />
      </div>

      <div className="flex items-center px-6 py-20 lg:px-16 lg:py-0">
        <div className="max-w-lg">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: DURATION.base, ease: EASE_PREMIUM }}
            className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-accent"
          >
            {finalSequence.kicker}
          </motion.p>
          <motion.h2
            id="final-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: DURATION.slow, delay: 0.1, ease: EASE_PREMIUM }}
            className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight tracking-tight text-primary"
          >
            {finalSequence.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: DURATION.base, delay: 0.25, ease: EASE_PREMIUM }}
            className="mt-6 text-lg leading-relaxed text-secondary"
          >
            {finalSequence.body}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
