"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Tiles marked `data-reveal` fade in as they scroll into view, like the work grid
// on inakisoria.com: each one waits until its image has loaded, and tiles that
// arrive together are staggered 40ms apart. The fade itself is in globals.css.
// Rendered on every page that has tiles; it re-checks on each page change.
export function RevealOnScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const tiles = [...document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")];
    tiles.forEach((tile) => {
      const position = [...(tile.parentElement?.children ?? [])].indexOf(tile);
      tile.style.setProperty("--d", String(position % 12));
    });

    const reveal = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        const show = () => target.classList.add("is-in");
        const image = target.querySelector("img");
        if (!image || image.complete) show();
        else {
          image.addEventListener("load", show, { once: true });
          image.addEventListener("error", show, { once: true });
        }
      });
    };
    // Tiles start fading in just before they reach the screen; blocks that
    // slide up (`.rise`) and stickers that pop in (`.pop`) wait until they are
    // well inside it, so the movement is seen.
    const observer = new IntersectionObserver(reveal, { threshold: 0.2, rootMargin: "150px 0px" });
    const riseObserver = new IntersectionObserver(reveal, { threshold: 0.15, rootMargin: "0px 0px -12% 0px" });
    const late = (tile: HTMLElement) => tile.classList.contains("rise") || tile.classList.contains("pop");
    tiles.forEach((tile) => (late(tile) ? riseObserver : observer).observe(tile));
    return () => {
      observer.disconnect();
      riseObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
