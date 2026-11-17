# David Lim | Cinematic Portfolio

A cinematic single-page portfolio for David Lim. It includes a browser-based finance workflow with sample data and an article on AI deployment with a model-memory estimator. The zero-dependency site in the root `public/` folder is a separate project.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (CSS-based `@theme`, no `tailwind.config.js`)
- React state and CSS transitions for the finance demo and estimator
- Framer Motion — entrance/whileInView transitions, mobile nav
- No component library, no CMS, no backend

## Setup & run

```bash
cd cinematic-portfolio
npm install
npm run dev       # http://localhost:3000
npm run build     # static export to out/ (see Deployment below)
npm run lint
```

`npm run build` produces a static export (`output: "export"` in `next.config.ts`) — there's no `npm start`/Node server in production; `out/` is plain HTML/CSS/JS.

## Deployment

Live at **[dlim86.github.io/D-site/cinematic/](https://dlim86.github.io/D-site/cinematic/)**, served from a subpath alongside the plain-HTML site at the repo root. `.github/workflows/deploy.yml` (repo root) builds both on every push to `main`:

1. `cinematic-portfolio`: `npm ci && npm run build` with `NEXT_PUBLIC_BASE_PATH=/D-site/cinematic`, producing `out/`.
2. Combines `public/` (root) and `cinematic-portfolio/out/` (→ `/cinematic/`) into one `dist/` and uploads it as the Pages artifact.

`NEXT_PUBLIC_BASE_PATH` drives both Next's `basePath`/`assetPrefix` (in `next.config.ts`) and `withBasePath()` (`src/lib/basePath.ts`), which manually prefixes the hardcoded `public/` asset paths (video `src`, poster) that Next's basePath doesn't auto-rewrite. Locally (`npm run dev`/plain `npm run build`), the env var is unset, so the app runs unprefixed at `/`.

To reproduce the CI build locally:

```bash
cd cinematic-portfolio
NEXT_PUBLIC_BASE_PATH=/D-site/cinematic npm run build
# out/ now contains the exact static site GitHub Pages will serve at /D-site/cinematic/
```

## Project structure

```
src/
  app/
    layout.tsx       fonts (Fraunces/Inter/JetBrains Mono), metadata, <Nav>
    page.tsx          assembles all sections in order
    globals.css       design tokens, controls and transitions
  components/          one file per section, each self-contained
  lib/
    content.ts         all page copy — edit this to change text, no JSX hunting
    motion.ts           shared easing/duration/stagger constants
    useReducedMotion.ts  prefers-reduced-motion hook (useSyncExternalStore)
public/
  videos/               hero.mp4/webm, closing.mp4/webm — see docs/video-assets.md
  media/                poster images for the <video> elements
docs/
  video-assets.md        ffmpeg recipe for swapping in real footage
assets-source/          uncompressed original footage, gitignored, not served
```

## Content

Portfolio copy uses `src/lib/content.ts`. The workflow examples are in `src/components/InterfaceCard.tsx`, and the article is in `src/components/FieldNotes.tsx`. Section anchors are `#hero #about #expertise #approach #results #field-notes #contact`.

## Video assets

`public/videos/hero.mp4|webm` and `closing.mp4|webm` are a **stand-in cinematic loop** (compressed from a sample source clip), used to demonstrate the hero/pinned-media motion end to end — not final brand content. See `docs/video-assets.md` for the ffmpeg recipe to swap in real footage, and `.gitignore` excludes the 51MB uncompressed original in `assets-source/`.

Background videos pause outside the viewport and when the browser tab is hidden. Reduced-motion visitors start with the poster and can play the video manually. A media error shows a static gradient.

## Animation map

| Trigger | Element | Animation | Duration / range |
|---|---|---|---|
| Mount, staggered | Hero eyebrow / headline lines / body / CTAs | Fade + rise, headline lines mask-reveal from `y:110%` | 0.5–1.2s, delays 0.15–1.4s |
| Scroll (own section, 0→100% of hero height) | Hero content | Opacity 1→0, y 0→-60 | Framer `useScroll`, scrubbed |
| Scroll (same range) | Hero overlay gradient | Opacity 0.55→0.92 (darkens) | Framer `useScroll`, scrubbed |
| `whileInView`, once | Brand Statement lines | Blur(6px)→0, opacity 0.15→1, staggered | 1.2s/line, 0.16s stagger |
| Click or arrow key | Finance workflow | The active tab indicator slides and the selected panel enters inside the same frame | 380ms CSS transition |
| `whileInView`, once | Approach grid cards | Fade + rise, staggered 0.1s | 0.8s |
| `whileInView`, once | Results metrics | Fade + rise, staggered 0.1s | 0.8s |
| `whileInView`, once | Final split-screen heading/body | Fade + rise | 0.8–1.2s |
| `whileInView`, once | CTA heading/body/buttons | Fade + rise, staggered delays | 0.8–1.2s |
| Click | Mobile nav toggle | Full-screen overlay fade in/out, links stagger in | 0.4s + 0.05s/item |

React entrance motion uses `src/lib/motion.ts` and respects the reduced-motion preference. The workflow controls and estimator remain usable with CSS transitions disabled.

## Known gaps / next steps

- Swap `public/videos/*` for real footage (see `docs/video-assets.md`).
- No résumé PDF is wired up yet — add one at `public/resume.pdf` and link it from the CTA if wanted.
- No OG/social preview image.
- The original visual reference (a screen recording) was never provided — this motion system was built from the written brief alone. If you get the recording later, timing/easing may need a pass to match it more closely.
