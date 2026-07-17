"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { withBasePath } from "@/lib/basePath";

type CinematicMediaProps = {
  webmSrc: string;
  mp4Src: string;
  poster: string;
  className?: string;
  /** Visual tone for the CSS fallback rendered when no video file is present. */
  tone?: "amber" | "slate";
};

/**
 * Full-bleed background media with a graceful fallback. If the file is
 * missing, fails to load, or autoplay is blocked, `onError`/the play()
 * rejection fires and the generated gradient below stands in instead —
 * no broken video icon, no blank panel. See public/videos/README.md.
 */
export default function CinematicMedia({ webmSrc, mp4Src, poster, className = "", tone = "amber" }: CinematicMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;
    video.play().catch(() => setFailed(true));
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !wrapRef.current) return;
    gsap.fromTo(
      wrapRef.current,
      { scale: 1.05 },
      { scale: 1, duration: 1.6, ease: "power2.out" }
    );
  }, [reducedMotion]);

  return (
    <div ref={wrapRef} className={`relative h-full w-full overflow-hidden ${className}`}>
      {!failed && (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={withBasePath(poster)}
          aria-hidden="true"
          tabIndex={-1}
          onError={() => setFailed(true)}
        >
          <source src={withBasePath(webmSrc)} type="video/webm" />
          <source src={withBasePath(mp4Src)} type="video/mp4" />
        </video>
      )}
      {failed && (
        <div
          className={`h-full w-full ${tone === "amber" ? "gradient-fallback-amber" : "gradient-fallback-slate"}`}
          role="img"
          aria-label=""
          aria-hidden="true"
        />
      )}
    </div>
  );
}
