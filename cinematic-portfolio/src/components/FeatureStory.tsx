"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { pillars } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";
import InterfaceCard from "./InterfaceCard";

export default function FeatureStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      if (panels.length < 2 || cards.length < 2) return;

      gsap.set(panels, { filter: "blur(0px)" });
      gsap.set(panels.slice(1), { opacity: 0, y: 24 });
      gsap.set(cards.slice(1), { opacity: 0.25, scale: 0.92, filter: "blur(6px)" });
      gsap.set(cards[0], { opacity: 1, scale: 1, filter: "blur(0px)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${(pillars.length - 1) * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Each transition reserves a mid-scroll gap (0.4–0.6) where neither text
      // panel is legible, so the outgoing and incoming copy never overlap —
      // only the (opaque) interface cards behind them crossfade continuously.
      for (let i = 0; i < pillars.length - 1; i++) {
        tl.to(panels[i], { opacity: 0, y: -20, filter: "blur(4px)", duration: 0.4 }, i)
          .to(panels[i + 1], { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4 }, i + 0.6)
          .to(cards[i], { opacity: 0.25, scale: 0.92, filter: "blur(6px)", duration: 1 }, i)
          .to(cards[i + 1], { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 }, i);
      }
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section id="expertise" aria-labelledby="expertise-heading" className="bg-elevated px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 id="expertise-heading" className="mb-16 font-display text-3xl text-primary lg:text-4xl">
            Three disciplines, one throughline
          </h2>
          <div className="flex flex-col gap-16">
            {pillars.map((pillar) => (
              <div key={pillar.id} className="grid gap-8 border-t border-hairline pt-10 lg:grid-cols-2 lg:gap-16">
                <InterfaceCard pillarId={pillar.id} />
                <PillarText pillar={pillar} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="expertise" aria-labelledby="expertise-heading" className="relative bg-elevated">
      <h2 id="expertise-heading" className="sr-only">
        Three disciplines, one throughline
      </h2>
      <div className="grid h-screen w-full grid-cols-1 items-center gap-10 px-6 pt-24 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="relative order-2 h-[280px] lg:order-1 lg:h-[420px]">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <InterfaceCard pillarId={pillar.id} />
            </div>
          ))}
        </div>

        <div className="relative order-1 h-[320px] lg:order-2 lg:h-[380px]">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.id}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="absolute inset-0"
            >
              <PillarText pillar={pillar} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarText({ pillar }: { pillar: (typeof pillars)[number] }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">{pillar.tag}</p>
      <h3 className="mb-5 font-display text-2xl leading-tight text-primary lg:text-3xl">{pillar.title}</h3>
      <p className="max-w-md text-base leading-relaxed text-secondary">{pillar.description}</p>
      <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
        {pillar.metrics.map((metric) => (
          <div key={metric.label}>
            <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">{metric.label}</dt>
            <dd className="mt-1 text-sm text-primary">{metric.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
