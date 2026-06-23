# Design Decisions — D-site

Decisions are listed in reverse chronological order. Each entry explains what was decided, why, and what alternatives were considered.

---

## 2026-06-19 — Full-width centered layout (no sidebar)

**Decision:** Replace the original 220 px left sidebar layout with a fixed top nav and centered single-column sections at 860 px max-width.

**Why:** The sidebar felt dated and wasted space at common desktop widths. The uimagic.co reference was provided as the target aesthetic: full-width hero, sections that breathe, minimal chrome. A top nav also solves mobile layout more cleanly than a collapsible sidebar.

**Trade-offs accepted:** The top nav takes 60 px of vertical space at all times. A sidebar nav gave constant access to all links without scroll, but the trade-off is worth it for the cleaner visual hierarchy.

**Alternatives considered:** Sticky sidebar (rejected — complex at mobile widths); no nav at all (rejected — bad UX on long scroll); bottom nav (rejected — unusual for desktop portfolios).

---

## 2026-06-19 — uimagic.co-inspired dark theme with purple accent

**Decision:** Use `#18171c` (near-black with warm undertone) as the base background, `#5a41bf` / `#795fde` as the purple accent pair, and white text.

**Why:** The brief was explicitly "inspired by uimagic.co." That site uses deep dark surfaces with a single vivid accent. Purple reads as technical / creative without being clichéd blue. The warm undertone in the background prevents the harshness of pure black.

**Trade-offs accepted:** Dark-only theme — no light mode. A light-mode variant would require significant CSS duplication or a CSS-variable swap strategy. David's target audience (tech-adjacent recruiters) is comfortable with dark interfaces.

---

## 2026-06-19 — Google Fonts (Outfit + Inter + JetBrains Mono) via CDN

**Decision:** Load three typefaces from Google Fonts CDN using `<link rel="preconnect">` and a single stylesheet request.

**Why:** Zero setup, instant iteration, no font files to manage in the repo. The three fonts cover three distinct roles cleanly: Outfit for display/brand (geometric, slightly playful), Inter for body (legible, neutral), JetBrains Mono for skill tags (signals technical identity).

**Trade-offs accepted:** External CDN dependency — if Google Fonts is slow or blocked, fallback is system sans-serif. Self-hosting would eliminate this but adds 6+ font files and complicates future font changes. Worth revisiting if performance becomes a concern.

---

## 2026-06-19 — Zero build toolchain (plain HTML/CSS/JS)

**Decision:** No npm, no bundler, no CSS preprocessor, no TypeScript, no framework.

**Why:** A personal portfolio is a three-file static site. The added complexity of a build step (installation, config, upgrade maintenance) is a drag on future editing sessions, including AI-assisted ones. A Claude session can open a file and ship a change in one step.

**Trade-offs accepted:** No tree-shaking, no CSS scoping, no type safety, no hot reload. For three files totalling ~1000 lines, none of these are real problems.

**Boundary:** If the site ever grows beyond ~5 files or requires a CMS, revisit. Until then, keep it zero-toolchain.

---

## 2026-06-19 — Dynamic GitHub repos via public API (no auth)

**Decision:** Fetch repos at runtime from the unauthenticated GitHub REST API. No server, no token, no caching.

**Why:** The repos section exists to show live, current work. A static list would drift. The public API returns the data needed (name, description, language, stars) without authentication for public repos.

**Trade-offs accepted:** Unauthenticated rate limit is 60 req/hr per IP. Fine for a personal portfolio with low traffic. If rate-limited, the section shows a graceful fallback message — nothing breaks.

---

## 2026-06-19 — Projects section hardcoded (not linked to real repos)

**Decision:** The three project cards (SIT/NVIDIA, Singtel RPA, DFS Governance) link to the GitHub profile root, not specific repos.

**Why:** The work described in those cards is professional employment — code is proprietary and not on GitHub. The cards describe outcomes and context, not open-source contributions.

**What to do when this changes:** Once David publishes code related to his AI programme projects, update the `href` on each `<h3><a>` tag in the Projects section of `index.html`.

---

## 2026-06-19 — IntersectionObserver for active nav (not scroll events)

**Decision:** Use `IntersectionObserver` with a root margin of `−10% 0px −60% 0px` to track which section is in view and highlight the corresponding nav link.

**Why:** Scroll event listeners fire very frequently and require debouncing + `getBoundingClientRect()` calls on every tick, which can cause layout thrashing. IntersectionObserver is browser-native, performant, and fires only when threshold is crossed.

**Trade-offs accepted:** The root margin is a heuristic — at very short viewports or with sections of very different heights, the "active" detection can feel slightly off. This is acceptable for a portfolio site.

---

## 2026-06-19 — Accessibility: aria labels, focus-visible, prefers-reduced-motion

**Decision:** Every interactive element has an accessible name (via `aria-label` or visible text). Decorative elements have `aria-hidden="true"`. Focus ring uses `--accent-2` outline. All animations are disabled under `prefers-reduced-motion: reduce`.

**Why:** These are the minimum viable accessibility requirements for any public-facing site. They cost almost nothing to implement when building from scratch and ensure the site is usable by keyboard-only and screen-reader users.

**Scope:** WCAG 2.1 AA is the target. No formal audit has been done — these are good-faith implementations.
