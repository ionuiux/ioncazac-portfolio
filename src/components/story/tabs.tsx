"use client";

import { useState } from "react";
import { PhoneShell } from "@/components/phone-frame";
import type { StoryImage } from "@/content/case-studies";
import { Accent, BrowserWindow, Fill } from "./story-image";

type Item = { label: string; text: string; image: StoryImage };

// Screens of the product behind tabs. Laptops: the tabs are a list beside the
// screen, the open one with its description. Phones: a row of tabs above it.
// Screens sit in a browser window (or a phone, with `device: "phone"`);
// finished mockups and photos fill a 5:4 box.
export function Tabs({
  label,
  heading,
  items,
  device = "browser",
}: {
  label: string;
  heading: string;
  items: Item[];
  device?: "browser" | "phone";
}) {
  const [active, setActive] = useState(0);
  const framed = items[0]?.image.kind === "screen";
  const layers = (sizes: string) =>
    items.map((item, i) => (
      <div
        key={item.label}
        aria-hidden={i !== active}
        className={`absolute inset-0 transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
      >
        <Fill image={item.image} sizes={sizes} />
      </div>
    ));

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

        {framed && device === "phone" ? (
          // Taller on phones, so the phone isn't tiny; on laptops as wide as its
          // column and most of the screen's height.
          <div className="flex aspect-[4/5] items-center justify-center bg-[var(--tint)] sm:aspect-[5/4] lg:aspect-auto lg:h-[74svh]">
            <PhoneShell className="h-[88%]">{layers("(min-width: 1024px) 320px, 200px")}</PhoneShell>
          </div>
        ) : framed ? (
          <div className="bg-[var(--tint)] px-[5%] pt-[5%]">
            <BrowserWindow className="shadow-none">{layers("(min-width: 1024px) 66vw, 100vw")}</BrowserWindow>
          </div>
        ) : (
          // On laptops no taller than most of the screen, so it's seen whole.
          <div className="relative aspect-[5/4] overflow-hidden bg-[var(--tint)] lg:max-h-[74svh]">
            {layers("(min-width: 1024px) 66vw, 100vw")}
          </div>
        )}
      </div>
      <p role="tabpanel" className="mt-6 max-w-2xl text-[16px] leading-relaxed text-neutral-600 lg:hidden">
        {items[active].text}
      </p>
    </section>
  );
}
