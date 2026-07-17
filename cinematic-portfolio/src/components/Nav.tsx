"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/content";
import { EASE_PREMIUM } from "@/lib/motion";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: EASE_PREMIUM }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled || open ? "bg-void/90 backdrop-blur-md border-b border-hairline" : "bg-transparent"
        }`}
      >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a
          href="#hero"
          className="font-display text-lg tracking-tight text-primary"
          aria-label={`${site.name} — back to top`}
        >
          DL
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs uppercase tracking-[0.14em] text-secondary transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="rounded-full border border-border-strong px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-primary transition-colors hover:border-accent hover:text-accent"
          >
            Get in Touch
          </a>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-primary transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 bg-primary transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_PREMIUM }}
            className="fixed inset-0 z-40 flex flex-col bg-void pt-24 md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 pb-8">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i, ease: EASE_PREMIUM }}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-hairline py-4 font-display text-2xl text-primary"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * nav.length, ease: EASE_PREMIUM }}
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-6 rounded-full border border-border-strong px-5 py-3 text-center font-mono text-xs uppercase tracking-[0.14em] text-primary"
              >
                Get in Touch
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
