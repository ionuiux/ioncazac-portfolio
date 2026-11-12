"use client";

import { useEffect, useRef, useState } from "react";
import type { StoryImage } from "@/content/case-studies";
import { Accent, Fill } from "./story-image";

type Item = { label: string; title: string; text: string; image?: StoryImage };

// Cards in a row that scrolls sideways: arrows on laptops, a swipe on phones.
// A card without an image gets a panel in the brand's dark and main colours, in
// turn, with its number and label set big.
export function Carousel({ label, heading, text, items }: { label: string; heading: string; text: string; items: Item[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const list = track.current;
    if (!list) return;
    const update = () =>
      setEdges({
        start: list.scrollLeft < 8,
        end: list.scrollLeft + list.clientWidth > list.scrollWidth - 8,
      });
    list.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      list.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (direction: number) => {
    const list = track.current;
    const card = list?.firstElementChild as HTMLElement | null;
    if (list && card) list.scrollBy({ left: direction * (card.offsetWidth + 16), behavior: "smooth" });
  };

  return (
    <section className="py-24 sm:py-32">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-end lg:gap-16">
        <div>
          <p className="text-[13px] font-medium text-[var(--accent)]">{label}</p>
          <h2 className="mt-3 text-5xl leading-[0.98] font-bold tracking-[-0.045em] text-balance sm:text-7xl">
            <Accent text={heading} />
          </h2>
        </div>
        <p className="text-[17px] leading-relaxed text-neutral-600">{text}</p>
      </div>

      <div className="mt-10 flex justify-end gap-2">
        {[
          { direction: -1, label: "Previous", arrow: "←", disabled: edges.start },
          { direction: 1, label: "Next", arrow: "→", disabled: edges.end },
        ].map((button) => (
          <button
            key={button.label}
            type="button"
            onClick={() => go(button.direction)}
            disabled={button.disabled}
            aria-label={button.label}
            className="flex size-11 items-center justify-center rounded-full border border-line text-[18px] transition-colors hover:bg-subtle disabled:opacity-30 disabled:hover:bg-transparent"
          >
            {button.arrow}
          </button>
        ))}
      </div>

      <ul
        ref={track}
        className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <li key={item.title} className="w-[84%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-2rem)/3)]">
            {item.image ? (
              <>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Fill image={item.image} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 46vw, 84vw" />
                </div>
                <p className="mt-5 text-[13px] font-medium text-[var(--accent)]">
                  <span className="text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span> · {item.label}
                </p>
              </>
            ) : (
              <div
                className={`flex aspect-[4/3] flex-col justify-between p-6 text-white sm:p-8 ${i % 2 ? "bg-[var(--accent)]" : "bg-[var(--accent-dark)]"}`}
              >
                <span className="text-5xl font-bold tracking-[-0.05em] text-[var(--highlight)] tabular-nums sm:text-6xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-4xl font-bold tracking-[-0.045em] sm:text-5xl">{item.label}</span>
              </div>
            )}
            <h3 className={`text-2xl font-bold tracking-[-0.02em] ${item.image ? "mt-2" : "mt-5"}`}>{item.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
