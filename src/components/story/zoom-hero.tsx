"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "@/lib/motion";
import { clamp01, useScrollProgress } from "./use-scroll-progress";

// How long the logo takes to fade in over the end of its animation.
const SETTLE_MS = 900;

type Logo = {
  src: string;
  width: number;
  height: number;
  hole: [number, number];
  intro?: { src: string; x: number; y: number; width: number; height: number; duration: number };
};

// A giant logo (or word) that fills the screen. A logo can first draw itself
// (its `intro` animation, played once); then scrolling zooms into it, through a
// hole (the "o" in Flovi), until that hole fills the whole screen. The next
// block is pulled up under it, so it scrolls in through the hole. Visitors who
// ask for less motion see the finished logo, still.
export function ZoomHero({ line, logo, word = "", through = 0 }: { line: string; logo?: Logo; word?: string; through?: number }) {
  const reduced = useReducedMotion();
  const mark = useRef<HTMLElement | null>(null);
  const letter = useRef<HTMLSpanElement>(null);
  const baseline = useRef<HTMLSpanElement>(null);
  const fade = useRef<HTMLDivElement>(null);
  const animation = useRef<HTMLImageElement>(null);
  // "playing": the logo animation runs, the logo itself is hidden. "settling":
  // the logo fades in on top of the animation's last frame (the same picture,
  // drawn sharper), so the handover can't be seen. "done": the animation is gone.
  const [phase, setPhase] = useState<"playing" | "settling" | "done">("playing");
  const intro = logo?.intro;
  const animated = Boolean(intro) && !reduced;
  const settle = () => setPhase((current) => (current === "playing" ? "settling" : current));

  // The handover starts once the animation has played (timed from when it loaded).
  useEffect(() => {
    const image = animation.current;
    if (!intro || !image) return;
    let timer = 0;
    const start = () => {
      timer = window.setTimeout(settle, intro.duration + 100);
    };
    if (image.complete) start();
    else image.addEventListener("load", start, { once: true });
    return () => {
      window.clearTimeout(timer);
      image.removeEventListener("load", start);
    };
  }, [intro]);

  // Once the logo has faded in, the animation underneath can go.
  useEffect(() => {
    if (phase !== "settling") return;
    const timer = window.setTimeout(() => setPhase("done"), SETTLE_MS + 100);
    return () => window.clearTimeout(timer);
  }, [phase]);

  // A word zooms from the middle of the letter's hole: its centre across, and
  // halfway up Inter's x-height (0.546 of the font size) above the baseline.
  useEffect(() => {
    if (logo) return;
    const measure = () => {
      const text = mark.current;
      const hole = letter.current;
      const line = baseline.current;
      if (!text || !hole || !line) return;
      const size = parseFloat(getComputedStyle(text).fontSize);
      text.style.transformOrigin = `${hole.offsetLeft + hole.offsetWidth / 2}px ${line.offsetTop - size * 0.273}px`;
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [logo]);

  const section = useScrollProgress<HTMLElement>((progress) => {
    if (!mark.current || !fade.current) return;
    if (reduced) {
      mark.current.style.transform = "";
      fade.current.style.opacity = "";
      return;
    }
    // Scrolling during the logo animation starts the handover to the logo.
    if (progress > 0.005) settle();
    // A steady-feeling zoom: the scale grows exponentially, up to 60×. The hole
    // covers the screen at about 20×, just before the next block arrives.
    const t = clamp01((progress - 0.04) / 0.56);
    mark.current.style.transform = `scale(${Math.pow(60, Math.pow(t, 1.3))})`;
    fade.current.style.opacity = String(clamp01(1 - progress / 0.1));
  });

  const percent = (value: number, of: number) => `${(value / of) * 100}%`;

  return (
    <section ref={section} className={reduced ? "" : "-mb-[60svh] h-[220svh]"}>
      <div className="pointer-events-none sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        {logo ? (
          <div
            ref={(node) => {
              mark.current = node;
            }}
            // On laptops as wide as fits, but no taller than 55% of the screen.
            className="relative mb-[6vh] w-[78vw] max-w-[1100px] sm:w-[min(62vw,calc(55svh*var(--ratio)))]"
            style={
              {
                "--ratio": logo.width / logo.height,
                transformOrigin: `${percent(logo.hole[0], logo.width)} ${percent(logo.hole[1], logo.height)}`,
              } as CSSProperties
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- an SVG drawn as vectors, so it stays sharp at 60× */}
            <img
              src={logo.src}
              alt=""
              width={logo.width}
              height={logo.height}
              fetchPriority="high"
              className={`relative z-10 block h-auto w-full transition-opacity ease-in-out ${
                animated && phase === "playing" ? "opacity-0" : "opacity-100"
              }`}
              style={{ transitionDuration: `${SETTLE_MS}ms` }}
            />
            {intro && animated && phase !== "done" && (
              // eslint-disable-next-line @next/next/no-img-element -- an animated GIF, played once as it is
              <img
                ref={animation}
                src={intro.src}
                alt=""
                fetchPriority="high"
                className="absolute max-w-none"
                style={{
                  left: percent(intro.x, logo.width),
                  top: percent(intro.y, logo.height),
                  width: percent(intro.width, logo.width),
                  height: percent(intro.height, logo.height),
                }}
              />
            )}
          </div>
        ) : (
          <p
            ref={(node) => {
              mark.current = node;
            }}
            aria-hidden
            className="relative pb-[4vh] text-center text-[38vw] leading-none font-bold tracking-[-0.06em] whitespace-nowrap text-[var(--accent)] sm:text-[min(30vw,34rem)]"
          >
            {word.slice(0, through)}
            <span ref={letter}>{word[through]}</span>
            {word.slice(through + 1)}
            <span ref={baseline} className="inline-block size-0" />
          </p>
        )}
        {/* Above the logo animation, and only shown once the logo has drawn itself. */}
        <div ref={fade} className="absolute inset-x-0 bottom-20 z-20 text-center sm:bottom-24">
          <div
            data-hero-line
            className={`transition-[opacity,translate] duration-700 ease-out ${
              animated && phase === "playing" ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            <p className="px-6 text-[15px] text-balance text-muted sm:text-[17px]">{line}</p>
            <p className="mt-4 text-[13px] text-muted">Scroll ↓</p>
          </div>
        </div>
      </div>
    </section>
  );
}
