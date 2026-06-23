# Architecture — D-site

## Folder structure

```
D-site/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deploy on push to main
├── docs/
│   ├── AI_HANDOFF.md           # onboarding for new Claude sessions
│   ├── ARCHITECTURE.md         # this file
│   └── DECISIONS.md            # design decision log
├── public/                     # the ONLY folder deployed to GitHub Pages
│   ├── index.html              # all markup (~237 lines)
│   ├── style.css               # all styles (~741 lines)
│   └── main.js                 # all JS (~148 lines)
├── .gitignore
├── CLAUDE.md                   # Claude coding instructions
└── README.md
```

No `node_modules`, `package.json`, `dist/`, or `src/`. The `public/` folder is served as-is.

## public/index.html

Single-page document. Structure top to bottom:

```
<head>
  meta (charset, viewport, description)
  <title>
  Google Fonts preconnect + stylesheet link
  <link> to style.css
</head>
<body>
  <header class="topnav">          ← fixed glassmorphic nav, desktop links + hamburger button
  <div class="mobile-nav">         ← full-panel mobile nav (hidden by default)
  <main>
    <section id="hero">            ← full-viewport, centered
    <section id="about">           ← prose paragraphs
    <section id="skills">          ← 2×2 grid of skill groups
    <section id="projects">        ← list of project cards
    <section id="repos">           ← dynamically populated by main.js
    <section id="contact">         ← email / GitHub / LinkedIn links
  </main>
  <footer class="site-footer">
  <script src="main.js">
</body>
```

### Section IDs

Must not be renamed — `main.js` and nav `href`s hard-reference them:
`#hero`, `#about`, `#skills`, `#projects`, `#repos`, `#contact`

## public/style.css

### CSS custom properties (`:root`)

All tokens are defined here. Never skip to hardcoded values.

| Token | Value | Purpose |
|---|---|---|
| `--bg` | `#18171c` | Page background |
| `--bg-raised` | `#222128` | Slightly raised surfaces |
| `--bg-card` | `#1e1d23` | Card backgrounds |
| `--text` | `#ffffff` | Primary text |
| `--text-muted` | `#b1b0b5` | Secondary text |
| `--text-dim` | `#6f6d75` | Tertiary / placeholder |
| `--accent` | `#5a41bf` | Primary purple |
| `--accent-2` | `#795fde` | Lighter purple (hover, focus ring) |
| `--green` | `#0acf83` | Availability badge dot |
| `--border` | `rgba(255,255,255,0.07)` | Subtle border |
| `--border-hi` | `rgba(255,255,255,0.11)` | Higher-contrast border |
| `--border-acc` | `rgba(121,95,222,0.45)` | Accent border (card hover) |
| `--font-display` | `Outfit` | Headings and logo |
| `--font-body` | `Inter` | Body prose |
| `--font-mono` | `JetBrains Mono` | Skill tags, code |
| `--nav-h` | `60px` | Top nav height (used for scroll-padding-top) |
| `--section-pad` | `9rem` | Vertical padding on all sections |
| `--content-w` | `860px` | Max-width for section content |
| `--ease-out` | `cubic-bezier(0.16,1,0.3,1)` | Primary easing |
| `--t-fast` | `180ms` | Fast transitions |
| `--t-med` | `280ms` | Medium transitions |

### Responsive breakpoints

| Breakpoint | What changes |
|---|---|
| `≤900px` | Hamburger nav replaces desktop nav links; skills grid goes 1-column |
| `≤600px` | Hero CTA buttons go full-width; `--section-pad` reduces to 5rem |

### Animation

Hero elements use staggered `fade-up` keyframe animation (200 ms – 540 ms delays). The `@media (prefers-reduced-motion: reduce)` block disables all transitions and animations site-wide.

## public/main.js

Three independent features, no shared state:

### 1. GitHub Repos (`fetchRepos`)

```
fetch(https://api.github.com/users/DLim86/repos?sort=updated&per_page=12)
  → build repo card HTML (name, description, language dot, star count)
  → inject into #repos-grid
  → on error: show fallback message
```

Language → colour dot map is hardcoded in the file. Add entries as needed.
`htmlEscape()` utility sanitises API-provided strings before innerHTML injection.

### 2. Active nav highlighting (`initNavHighlight`)

Uses `IntersectionObserver` on all `<section>` elements. Root margin `−10% 0px −60% 0px` means a section is considered "active" when roughly in the upper third of the viewport. Updates `.active` class on the matching `<a>` in `.topnav-nav`.

### 3. Mobile nav toggle (`initMobileNav`)

- Hamburger button toggles `hidden` attribute on `#mobile-nav` and `aria-expanded` on the button.
- `keydown` listener: Escape closes the menu and returns focus to the button.
- Each nav link inside `#mobile-nav` closes the menu on click.

## .github/workflows/deploy.yml

Trigger: push to `main` or manual `workflow_dispatch`.

Steps:
1. `actions/checkout@v4`
2. `actions/configure-pages@v5`
3. `actions/upload-pages-artifact@v3` — uploads `public/` directory
4. `actions/deploy-pages@v4`

Permissions: `contents: read`, `pages: write`, `id-token: write`.
Concurrency: one deploy at a time, cancel in-progress on new push.

Published URL: `https://dlim86.github.io/D-site/` (or root domain if custom domain is configured).
