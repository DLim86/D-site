"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { withBasePath } from "@/lib/basePath";

type CinematicMediaProps = {
  webmSrc: string;
  mp4Src: string;
  poster: string;
  tone?: "amber" | "slate";
};

export default function CinematicMedia({ webmSrc, mp4Src, poster, tone = "amber" }: CinematicMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [playback, setPlayback] = useState<boolean | null>(null);
  const [failed, setFailed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let onScreen = false;
    const syncVisibility = () => setVisible(onScreen && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      syncVisibility();
    }, { threshold: 0.15 });

    observer.observe(video);
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, [failed]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (visible && (playback ?? !reducedMotion)) {
      void video.play().catch(() => {
        // Autoplay may be refused until the visitor uses the play control.
      });
    } else {
      video.pause();
    }
  }, [playback, reducedMotion, visible]);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      setPlayback(true);
      void video.play().catch(() => setPlayback(false));
    } else {
      setPlayback(false);
      video.pause();
    }
  }

  return (
    <div className="relative h-full w-full">
      {failed ? (
        <div className={"h-full w-full gradient-fallback-" + tone} aria-hidden="true" />
      ) : (
        <>
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="none"
            poster={withBasePath(poster)}
            aria-hidden="true"
            tabIndex={-1}
            onError={() => setFailed(true)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source src={withBasePath(webmSrc)} type="video/webm" />
            <source src={withBasePath(mp4Src)} type="video/mp4" />
          </video>
          <button type="button" onClick={togglePlayback} className="media-toggle">
            {playing ? "Pause background" : "Play background"}
          </button>
        </>
      )}
    </div>
  );
}
