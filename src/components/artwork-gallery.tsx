"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { artworks } from "@/content/artworks";

// The Dribbble shots grid. Clicking a shot opens it large in a viewer on this
// page instead of going to Dribbble, so visitors stay on the site. In the
// viewer: arrows (or ← → keys, or a swipe on phones) step through the shots;
// Esc, Close or a click outside the image closes it.
export function ArtworkGallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const lenis = useLenis();

  const open = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
    lenis?.stop(); // keep the page behind from scrolling
  };
  const close = () => dialog.current?.close();
  const step = (by: number) => setIndex((i) => (i === null ? i : (i + by + artworks.length) % artworks.length));

  const isOpen = index !== null;
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      const by = event.key === "ArrowLeft" ? -1 : event.key === "ArrowRight" ? 1 : 0;
      if (by) setIndex((i) => (i === null ? i : (i + by + artworks.length) % artworks.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const shot = index === null ? null : artworks[index];

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6">
        {artworks.map((art, i) => (
          <li key={art.src} data-reveal>
            <button
              type="button"
              onClick={() => open(i)}
              aria-haspopup="dialog"
              className="group block w-full cursor-zoom-in text-left"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-subtle">
                <Image
                  src={art.src}
                  alt={art.title}
                  fill
                  sizes="50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <p className="mt-2.5 truncate text-[13px] text-muted transition-colors group-hover:text-foreground">
                {art.title}
              </p>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label="Dribbble shots"
        onClose={() => {
          setIndex(null);
          lenis?.start();
        }}
        // A click on the empty space around the shot closes the viewer.
        onClick={(event) => event.target === event.currentTarget && close()}
        onTouchStart={(event) => (swipeStart.current = event.touches[0].clientX)}
        onTouchEnd={(event) => {
          if (swipeStart.current === null) return;
          const moved = event.changedTouches[0].clientX - swipeStart.current;
          swipeStart.current = null;
          if (Math.abs(moved) > 50) step(moved < 0 ? 1 : -1);
        }}
        className="shot-viewer fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none flex-col bg-background p-4 text-foreground open:flex backdrop:bg-background sm:p-6"
      >
        {shot && index !== null && (
          <>
            <div className="flex items-center justify-between text-[14px]">
              <p className="text-muted tabular-nums">
                {index + 1} / {artworks.length}
              </p>
              <button type="button" onClick={close} className="link-button">
                Close ✕
              </button>
            </div>

            <div className="relative my-4 min-h-0 flex-1">
              <Image
                key={shot.full.src}
                src={shot.full.src}
                alt={shot.title}
                fill
                sizes="100vw"
                className="object-contain"
                // The image box fills the space; clicks on its empty sides close the viewer too.
                onClick={(event) => {
                  const box = event.currentTarget.getBoundingClientRect();
                  const scale = Math.min(box.width / shot.full.width, box.height / shot.full.height);
                  const outsideX = Math.abs(event.clientX - (box.left + box.width / 2)) > (shot.full.width * scale) / 2;
                  const outsideY = Math.abs(event.clientY - (box.top + box.height / 2)) > (shot.full.height * scale) / 2;
                  if (outsideX || outsideY) close();
                }}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous shot"
                className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-[18px] transition-colors hover:bg-subtle"
              >
                ←
              </button>
              <p className="min-w-0 truncate text-center text-[14px]">{shot.title}</p>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next shot"
                className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-[18px] transition-colors hover:bg-subtle"
              >
                →
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
