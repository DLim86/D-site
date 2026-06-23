# AI Handoff — D-site

> This document is the single source of truth for any Claude session picking up this project fresh. Read it before touching any code.

## Project purpose

Personal portfolio website for **David Lim**, a Singapore-based Finance & AI professional. Audience: recruiters and hiring managers for roles in AI engineering, data engineering, and intelligent automation.

**MVP scope (completed):**
- Hero section with name, tagline, availability badge, and CTA links.
- About section (career narrative in four paragraphs).
- Skills section (four groups: Automation & RPA, Data & Analytics, AI & ML, Finance & Governance).
- Projects section (three real work projects: SIT/NVIDIA programme, Singtel RPA, DFS governance).
- Live GitHub repos section (fetched dynamically via the public GitHub API, no auth).
- Contact section (email, GitHub, LinkedIn).
- Responsive layout from 375 px to 1440 px.
- Dark theme with purple accent (uimagic.co-inspired).
- GitHub Pages auto-deploy on push to `main`.

## Stack

| Concern | Choice |
|---|---|
| Markup | Plain HTML5, semantic elements |
| Styling | Vanilla CSS with custom properties |
| Interactivity | Vanilla JavaScript (ES2020+), no libraries |
| Fonts | Google Fonts: Outfit, Inter, JetBrains Mono |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions (`deploy.yml`) |
| Build step | None |

## Commands

```
# Local development — no install step
open public/index.html            # macOS
start public/index.html           # Windows
xdg-open public/index.html        # Linux

# Deploy
git push origin main              # triggers GitHub Actions automatically
```

There is no lint, test, or build command. The project is deliberately zero-toolchain.

## Environment variables

None. The GitHub repos section calls the unauthenticated GitHub public API (`https://api.github.com/users/DLim86/repos?sort=updated&per_page=12`). Unauthenticated requests have a 60 req/hr rate limit per IP, which is fine for a portfolio. If rate limiting ever becomes a problem, add a `?token=` param with a read-only PAT (no scopes needed) — but do not commit the token.

## APIs used

| API | Endpoint | Purpose |
|---|---|---|
| GitHub REST API v3 | `GET /users/DLim86/repos` | Fetch public repos for the Open Source section |

No API key required. Response is public. Graceful fallback message if the call fails.

## Database / data storage

None. All content is hardcoded in `index.html`.

## Current progress

All MVP sections are built and live on GitHub Pages. The last major change (commit `c778e63`, 2026-06-19) was a full redesign from a sidebar layout to a centered full-width layout inspired by uimagic.co.

**Sections status:**
- [x] Top navigation (fixed, glassmorphic, mobile hamburger)
- [x] Hero
- [x] About
- [x] Skills
- [x] Projects
- [x] GitHub Repos (dynamic)
- [x] Contact
- [x] Footer
- [x] Responsive layout (375 px tested)
- [x] Accessibility (aria labels, focus-visible, prefers-reduced-motion)
- [x] GitHub Pages deploy workflow

## Known bugs / issues

1. **Project card links point to the GitHub profile root**, not to specific repos (because the projects are professional work, not personal open-source repos). The arrows are decorative. If the user wants to add a real repo link, update the `href` on each `<h3><a>` in the Projects section.
2. **GitHub API rate limit**: unauthenticated limit is 60 req/hr per IP. For a personal site this is fine, but if the site gets traffic spikes the repos section will show a fallback message. No fix needed unless this becomes a real problem.
3. **No favicon**: there is no `<link rel="icon">` and no favicon file. Add one if desired.
4. **No OG/Twitter meta tags**: social sharing will use the `<meta name="description">` text but no preview image. Low priority for a portfolio.
5. **Google Fonts CDN dependency**: fonts load from `fonts.googleapis.com`. If that CDN is slow or blocked, fallback is system sans-serif. Self-hosting fonts would fix this but adds complexity.

## Next recommended tasks (in priority order)

1. **Add a favicon** — create a simple `DL` lettermark as a 32×32 SVG or ICO and add `<link rel="icon">` to `<head>`. Simplest option: SVG data URI inline.
2. **Add OG meta tags** — add `og:title`, `og:description`, `og:image`, `og:url` to `<head>` for better LinkedIn/Twitter sharing previews.
3. **Add a résumé download button** — place a PDF at `public/david-lim-resume.pdf` and add a `<a href="david-lim-resume.pdf" download>` button in the Hero or Contact section.
4. **Wire project cards to real GitHub repos** — once David publishes the SIT AI project code, update the `href` attributes on the three project card headings.
5. **Self-host fonts** — download Outfit, Inter, and JetBrains Mono WOFF2 subsets and serve from `public/fonts/` to eliminate the Google Fonts CDN dependency.
6. **Add a blog/writing section** — if David wants to publish technical writing, add a `#writing` section and section ID following the same card pattern as Projects.
7. **Testimonials / recommendations** — pull LinkedIn recommendations and add a testimonials section between Projects and Repos.

## Coding conventions in use

- **No frameworks, no build step** — all changes must be pure HTML/CSS/JS.
- **CSS custom properties** for every colour, spacing, and type token — never hardcode values.
- **No inline styles** — all styles go in `style.css`.
- **Semantic HTML** — `<section>`, `<article>`, `<header>`, `<nav>`, `<footer>`, `<main>`.
- **Accessibility first** — every interactive element needs an `aria-label` or visible text label; decorative elements get `aria-hidden="true"`.
- **Mobile-first responsive** — CSS is written for mobile and adjusted upward at 900 px and 600 px.
- **No comments** unless the why is non-obvious.
- **IntersectionObserver** for active nav tracking (no scroll event listeners).
- **HTML-escape user-sourced content** — the `main.js` repo fetcher sanitises API output before injecting into innerHTML.
- **External links** always have `target="_blank" rel="noopener noreferrer"`.

## Claude-specific instructions

- Do not install any packages or introduce a build step under any circumstances.
- Read `CLAUDE.md` and `docs/ARCHITECTURE.md` before making structural changes.
- When the user asks to update personal info (bio, skills, projects, contact), edit `public/index.html` only.
- When the user asks to change the visual design, edit `public/style.css` only; use and extend existing CSS variables.
- When the user asks to add interactivity, edit `public/main.js` only; keep it under ~200 lines and avoid external dependencies.
- After any change, verify the 375 px breakpoint is unbroken.
- Commit messages: imperative, ≤72 chars (`Add favicon`, `Fix mobile nav z-index`, etc.).
