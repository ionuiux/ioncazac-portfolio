"use client";

import { useState } from "react";
import type { StoryImage } from "@/content/case-studies";
import { Accent, BrowserWindow, Fill } from "./story-image";

type Item = { label: string; text: string; image: StoryImage };

// Screens of the product behind tabs. Laptops: the tabs are a list beside the
// screen, the open one with its description. Phones: a row of tabs above it.
export function Tabs({ label, heading, items }: { label: string; heading: string; items: Item[] }) {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 sm:py-32">
      <p className="text-[13px] font-medium text-[var(--accent)]">{label}</p>
      <h2 className="mt-3 text-5xl leading-[0.98] font-bold tracking-[-0.045em] text-balance sm:text-7xl">
        <Accent text={heading} />
      </h2>

      <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)] lg:items-center lg:gap-12">
        <div role="tablist" aria-label={heading} className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-t lg:border-line">
          {items.map((item, i) => (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`rounded-full px-4 py-2 text-[14px] font-medium transition-colors lg:rounded-none lg:border-b lg:border-line lg:bg-transparent lg:px-0 lg:py-5 lg:text-left lg:text-[20px] lg:font-bold lg:tracking-[-0.02em] ${
                i === active
                  ? "bg-[var(--accent)] text-white lg:text-[var(--accent)]"
                  : "bg-subtle hover:bg-line lg:text-foreground/40 lg:hover:bg-transparent lg:hover:text-foreground"
              }`}
            >
              {item.label}
              <span
                className={`hidden text-[15px] leading-relaxed font-normal tracking-normal text-neutral-600 ${i === active ? "lg:mt-2 lg:block" : ""}`}
              >
                {item.text}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-[var(--tint)] px-[5%] pt-[5%]">
          <BrowserWindow className="shadow-none">
            {items.map((item, i) => (
              <div
                key={item.label}
                aria-hidden={i !== active}
                className={`absolute inset-0 transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
              >
                <Fill image={item.image} sizes="(min-width: 1024px) 66vw, 100vw" />
              </div>
            ))}
          </BrowserWindow>
        </div>
      </div>
      <p role="tabpanel" className="mt-6 max-w-2xl text-[16px] leading-relaxed text-neutral-600 lg:hidden">
        {items[active].text}
      </p>
    </section>
  );
}
