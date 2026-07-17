/**
 * Central motion configuration. All components pull timing/easing from here
 * so the site's pacing can be tuned in one place.
 */

export const EASE_PREMIUM = [0.16, 1, 0.3, 1] as const;
export const EASE_PREMIUM_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

export const DURATION = {
  fast: 0.5,
  base: 0.8,
  slow: 1.2,
} as const;

export const STAGGER = {
  tight: 0.06,
  base: 0.1,
  loose: 0.16,
} as const;

export const fadeUp = (delay = 0, distance = 24) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION.base, delay, ease: EASE_PREMIUM },
});

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: DURATION.slow, delay, ease: EASE_PREMIUM },
});

export const staggerContainer = (stagger = STAGGER.base, delayChildren = 0) => ({
  animate: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});
