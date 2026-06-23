# D-site: Personal Portfolio — David Lim

Plain HTML/CSS plus a little vanilla JS. No frameworks, no build step.
Deploy: push to `main`, GitHub Actions publishes to GitHub Pages automatically.

## Quick orientation

- All site files live in `public/` — that is the only folder deployed.
- Three files total: `index.html`, `style.css`, `main.js`.
- No npm, no bundler, no dependencies to install. Open `public/index.html` in a browser to develop locally.

## Conventions

- Section IDs (used by nav anchors and IntersectionObserver): `#hero #about #skills #projects #repos #contact`
- Responsive: no horizontal scroll at 375 px. Test at 375 px, 768 px, and 1280 px before shipping.
- CSS variables live at the top of `style.css` under `:root`. Always use them — never hardcode colours or type sizes.
- Colour palette prefix: `--bg-*` for backgrounds, `--text-*` for text, `--accent` / `--accent-2` for purple brand, `--border-*` for borders.
- All external links must have `target="_blank" rel="noopener noreferrer"`.
- Semantic HTML: sections use `<section>`, cards use `<article>`, navigation uses `<nav>`.
- No comments in HTML/CSS/JS unless the *why* is non-obvious.

## Coding instructions for Claude

- Do not install packages, add a build step, or introduce a framework. Keep the stack at zero dependencies.
- Edit the three files in `public/` only (plus docs/). Do not create new files inside `public/`.
- When adding a new skill tag, project card, or contact link, follow the exact HTML pattern already used in `index.html` — no structural changes.
- When touching CSS, use existing variables; introduce new ones only if no existing token is close.
- After any CSS change that affects layout, mentally verify the 375 px breakpoint.
- The GitHub repos section is dynamic (fetched from the GitHub API in `main.js`). Do not add a static fallback list.
- Commit messages: imperative sentence, ≤72 chars, no ticket references.
- See `docs/AI_HANDOFF.md` for current progress and next tasks.
- See `docs/DECISIONS.md` for the reasoning behind key design choices.
- See `docs/ARCHITECTURE.md` for file-by-file technical reference.
