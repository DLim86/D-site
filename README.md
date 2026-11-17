# D-site

Personal portfolio — plain HTML/CSS with a touch of vanilla JS. No build step required.

## Structure

```
public/   ← all site files (HTML, CSS, JS, assets)
```

## Live site

[https://dlim86.github.io/D-site/](https://dlim86.github.io/D-site/)

A second, cinematic version of the portfolio (Next.js/GSAP, see [cinematic-portfolio/](cinematic-portfolio/)) is deployed alongside it at [https://dlim86.github.io/D-site/cinematic/](https://dlim86.github.io/D-site/cinematic/).

## Deploy

Push to `main`. GitHub Actions (`.github/workflows/deploy.yml`) builds `cinematic-portfolio/` as a static export and publishes it together with `public/` to GitHub Pages: `public/` serves the root, the cinematic build serves `/cinematic/`.

## Contributors

- [David Lim](https://github.com/DLim86) created and maintains the portfolio.
- [Claude](https://github.com/claude) contributed the original cinematic portfolio and its media workflow.
- [Codex](https://github.com/codex) contributed the interactive finance demo, AI notes and accessibility improvements.
