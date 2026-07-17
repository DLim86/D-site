# Video assets

## Current files

| File | Used by | Source | Size |
|---|---|---|---|
| `hero.mp4` / `hero.webm` | Hero background | Compressed from `assets-source/espresso-brewing-original.mp4` (0:04–0:14) | ~610KB / ~300KB |
| `closing.mp4` / `closing.webm` | Final split-screen sequence | Same source, 0:26–0:34 | ~250KB / ~155KB |

These are a **stand-in cinematic loop**, not final content — an abstract dark pour/liquid clip chosen to demonstrate the hero motion, overlay, and pinned-media patterns end to end. Swap them for real footage (or keep this as a placeholder brand mood) before shipping.

The uncompressed original (2560×1440, 45s, 51MB, h264+aac) is kept at `../assets-source/espresso-brewing-original.mp4` — not served by the app, not deployed, and excluded from git via `.gitignore`. Re-cut clips from it with ffmpeg if you want different timestamps.

## Replacing with your own footage

1. Source a clip that's short (6–14s), loops cleanly, and has little/no fast motion at the cut point (avoids a visible jump).
2. Strip audio and compress with ffmpeg:

```bash
# MP4 (H.264) — required fallback for Safari/older browsers
ffmpeg -i source.mp4 -ss 0 -t 10 -vf "scale=1600:-2,fps=24" -an \
  -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart hero.mp4

# WebM (VP9) — smaller, served first via <source> priority
ffmpeg -i source.mp4 -ss 0 -t 10 -vf "scale=1600:-2,fps=24" -an \
  -c:v libvpx-vp9 -b:v 0 -crf 32 -row-mt 1 -deadline good -cpu-used 2 hero.webm
```

Target under ~2MB per clip. `CinematicMedia` (`src/components/CinematicMedia.tsx`) lists the WebM `<source>` first so capable browsers fetch the smaller file.

3. Generate a poster frame (shown before the video paints, and as the fallback frame if the file 404s or autoplay is blocked):

```bash
ffmpeg -i hero.mp4 -frames:v 1 -q:v 4 ../media/hero-poster.jpg
```

4. Keep filenames as `hero.mp4` / `hero.webm` / `closing.mp4` / `closing.webm`, or update the `webmSrc` / `mp4Src` props passed to `CinematicMedia` in `Hero.tsx` and `FinalSequence.tsx`.

## Fallback behavior

If a video file is missing, fails to load, or autoplay is blocked, `CinematicMedia` catches the error and renders an animated CSS gradient instead (`.gradient-fallback-amber` / `.gradient-fallback-slate` in `globals.css`) — the page never shows a broken video icon or blank panel.
