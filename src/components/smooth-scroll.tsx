"use client";

import { useEffect, useSyncExternalStore } from "react";
import { ReactLenis, useLenis } from "lenis/react";

// Smooth scrolling set up exactly like inakisoria.com: Lenis 1.3.4 with lerp 0.1,
// so each frame the page covers 10% of the distance left to where the wheel or
// trackpad sent it, and eases to a stop. In-page links (Back to top, Get in touch)
// glide the same way. Touch scrolling on phones stays native, as on that site.
// Visitors who ask for less motion keep the browser's normal scrolling.
export function SmoothScroll() {
  const reducedMotion = useSyncExternalStore(subscribeToMotionSetting, prefersReducedMotion, () => true);
  if (reducedMotion) return null;
  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: true }}>
      <StopGlideOnNavigation />
    </ReactLenis>
  );
}

// Opening another page mid-glide would otherwise carry the glide onto it, pulling
// the new page away from the top. So clicking a link, or Back/Forward, first
// stops the glide where it is (stop + start resets Lenis to the current position).
function StopGlideOnNavigation() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    const stopGlide = () => {
      lenis.stop();
      lenis.start();
    };
    const onClick = (event: MouseEvent) => {
      if (event.target instanceof Element && event.target.closest("a[href]")) stopGlide();
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", stopGlide);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", stopGlide);
    };
  }, [lenis]);
  return null;
}

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function prefersReducedMotion() {
  return window.matchMedia(MOTION_QUERY).matches;
}

function subscribeToMotionSetting(onChange: () => void) {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
