"use client";

import { Fragment, type CSSProperties } from "react";
import { useScrollProgress } from "./use-scroll-progress";

// A big statement whose words light up one after another as it scrolls up the
// screen (the fading is in globals.css, under .word-reveal). Words wrapped in
// *stars* light up in the accent colour.
export function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useScrollProgress<HTMLParagraphElement>(undefined, 0.85, 0.55);
  const words = text
    .split(/\*([^*]+)\*/)
    .flatMap((part, i) => part.split(/\s+/).filter(Boolean).map((word) => ({ word, accent: i % 2 === 1 })));

  return (
    <p ref={ref} className={`word-reveal ${className}`} style={{ "--n": words.length } as CSSProperties}>
      {words.map(({ word, accent }, i) => (
        <Fragment key={i}>
          <span style={{ "--i": i } as CSSProperties} className={accent ? "text-[var(--accent)]" : undefined}>
            {word}
          </span>{" "}
        </Fragment>
      ))}
    </p>
  );
}
