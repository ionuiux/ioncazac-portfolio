"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import eyes from "@/content/portrait-eyes.json";
import { profile } from "@/content/profile";

// Ion's photo on the homepage. With a mouse over it, the eyes blink once and
// then follow the cursor; when it leaves, they drift back.
//   - Blink: two extra frames (half-closed, closed) flick in, see .portrait in globals.css.
//   - Tracking: each iris is its own small image, slid around inside the eye
//     opening (clipped to the eye's outline) over the white of the eye. Looking
//     down, the upper lids come down with the eyes, in small steps. At rest the
//     layers line up exactly with the photo, so nothing looks different.
// Everything comes from scripts/portrait-frames.py; touch screens and visitors
// who prefer less motion see the plain photo.
export function Portrait() {
  const box = useRef<HTMLSpanElement>(null);
  const irises = useRef<(SVGImageElement | null)[]>([]);
  const lids = useRef<(SVGImageElement | null)[][]>([]);
  const id = useId();

  useEffect(() => {
    const el = box.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Gaze offset in photo pixels, eased towards where the cursor is.
    const target = { x: 0, y: 0 };
    const gaze = { x: 0, y: 0 };
    let frame = 0;
    let lidStep = 0;

    const step = () => {
      gaze.x += (target.x - gaze.x) * 0.3;
      gaze.y += (target.y - gaze.y) * 0.3;
      const settled = Math.abs(target.x - gaze.x) < 0.02 && Math.abs(target.y - gaze.y) < 0.02;
      if (settled) Object.assign(gaze, target);
      for (const iris of irises.current) {
        iris?.setAttribute("transform", `translate(${gaze.x.toFixed(2)} ${gaze.y.toFixed(2)})`);
      }
      // The upper lid follows the eye down, a little less than the iris moves.
      const drop = Math.max(0, gaze.y) * 0.9;
      const nextStep = Math.round(Math.min(drop, eyes.lidStep * 4) / eyes.lidStep);
      if (nextStep !== lidStep) {
        lidStep = nextStep;
        for (const eyeLids of lids.current) {
          eyeLids.forEach((lid, i) => lid?.setAttribute("visibility", i + 1 === lidStep ? "visible" : "hidden"));
        }
      }
      frame = settled ? 0 : requestAnimationFrame(step);
    };
    const run = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    const follow = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      const scale = rect.width / eyes.size;
      // Measured from the point between the two eyes: sideways and up/down
      // each follow the cursor on their own, easing out towards the photo's
      // edges, so the eyes look all the way left, right, up and down.
      const midX = (eyes.eyes[0].center.x + eyes.eyes[1].center.x) / 2;
      const midY = (eyes.eyes[0].center.y + eyes.eyes[1].center.y) / 2;
      const x = Math.tanh((event.clientX - (rect.left + midX * scale)) / (rect.width * 0.22));
      const y = Math.tanh((event.clientY - (rect.top + midY * scale)) / (rect.width * 0.2));
      target.x = x * eyes.range.x;
      target.y = y * (y > 0 ? eyes.range.down : eyes.range.up);
      run();
    };
    const rest = () => {
      target.x = 0;
      target.y = 0;
      run();
    };

    el.addEventListener("pointermove", follow);
    el.addEventListener("pointerleave", rest);
    return () => {
      el.removeEventListener("pointermove", follow);
      el.removeEventListener("pointerleave", rest);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span ref={box} className="portrait relative block size-28 shrink-0 sm:size-40 lg:size-64">
      <Image
        src="/ion.jpg"
        alt={`Portrait of ${profile.name}`}
        width={512}
        height={512}
        priority
        className="size-full rounded-full object-cover"
      />
      <svg
        viewBox={`0 0 ${eyes.size} ${eyes.size}`}
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full"
      >
        <defs>
          {eyes.eyes.map((eye, i) => (
            <clipPath key={i} id={`${id}-eye-${i}`}>
              <path d={eye.outline} />
            </clipPath>
          ))}
        </defs>
        {eyes.eyes.map((eye, i) => (
          <g key={i} clipPath={`url(#${id}-eye-${i})`}>
            <image href={eye.white.src} x={eye.white.x} y={eye.white.y} width={eye.white.width} height={eye.white.height} />
            <image
              ref={(node) => {
                irises.current[i] = node;
              }}
              href={eye.iris.src}
              x={eye.iris.x}
              y={eye.iris.y}
              width={eye.iris.width}
              height={eye.iris.height}
            />
          </g>
        ))}
        {eyes.eyes.map((eye, i) =>
          eye.lids.srcs.map((src, step) => (
            <image
              key={src}
              ref={(node) => {
                (lids.current[i] ??= [])[step] = node;
              }}
              href={src}
              x={eye.lids.x}
              y={eye.lids.y}
              width={eye.lids.width}
              height={eye.lids.height}
              visibility="hidden"
            />
          )),
        )}
      </svg>
      {["half", "closed"].map((frame) => (
        <Image
          key={frame}
          src={`/portrait/blink-${frame}.jpg`}
          alt=""
          aria-hidden
          width={512}
          height={512}
          loading="eager"
          className={`portrait-frame portrait-${frame} absolute inset-0 size-full rounded-full object-cover`}
        />
      ))}
    </span>
  );
}
