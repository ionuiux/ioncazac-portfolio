"use client";

import { useSyncExternalStore } from "react";

// Whether the visitor asked their device for less motion. Scroll animations
// check this and show their finished state instead.
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion() {
  return window.matchMedia(MOTION_QUERY).matches;
}

export function subscribeToMotionSetting(onChange: () => void) {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// `serverValue` is what the page assumes before it reaches the browser.
export function useReducedMotion(serverValue = false) {
  return useSyncExternalStore(subscribeToMotionSetting, prefersReducedMotion, () => serverValue);
}
