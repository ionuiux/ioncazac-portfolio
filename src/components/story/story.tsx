import Image from "next/image";
import type { CSSProperties } from "react";
import type { CaseStudy, StoryBlock, StoryImage } from "@/content/case-studies";
import { Carousel } from "./carousel";
import { CountUp } from "./count-up";
import { Flow } from "./flow";
import { Merge } from "./merge";
import { Parallax } from "./parallax";
import { Accent, BrowserWindow, Fill } from "./story-image";
import { Tabs } from "./tabs";
import { WordReveal } from "./word-reveal";
import { ZoomHero } from "./zoom-hero";

// The bold case study layout: big titles, scroll animations and lots of
// pictures, built from the case study's `story` blocks in order. The case
// study's two accent colours tint the panels and highlights (--accent, --tint).
export function Story({ study }: { study: CaseStudy }) {
  const [dark, accent] = study.accent;
  const colours = {
    "--accent": accent,
    "--accent-dark": dark,
    "--tint": `color-mix(in srgb, ${accent} 9%, white)`,
    "--highlight": study.highlight ?? `color-mix(in srgb, ${accent} 40%, white)`,
  } as CSSProperties;

  return (
    <div style={colours}>
      {study.story?.map((block, i) => (
        <Block key={i} block={block} study={study} />
      ))}
      {study.disclaimer && (
        <p className="mx-auto max-w-2xl pb-12 text-center text-[10px] leading-relaxed text-black/30">{study.disclaimer}</p>
      )}
    </div>
  );
}

function Block({ block, study }: { block: StoryBlock; study: CaseStudy }) {
  switch (block.type) {
    case "hero":
      return <ZoomHero line={block.line} logo={block.logo} word={block.word} through={block.through} />;
    case "intro":
      return <Intro study={study} role={block.role} />;
    case "flow":
      return (
        <Flow
          label={block.label}
          heading={block.heading}
          seconds={block.seconds}
          steps={block.steps}
          sticker={block.sticker}
          done={block.done}
          device={block.device}
        />
      );
    case "photos": {
      // One photo: full width, 2:1 (4:3 on phones, unless it's a picture shown
      // whole). Two: side by side. Three: one big on the left, two stacked on
      // the right; the 9:4 grid keeps each close to 3:2.
      const count = block.images.length;
      const three = count === 3;
      return (
        <section className="py-24 sm:py-32">
          <h2 className="mx-auto max-w-5xl text-center text-4xl leading-[1.02] font-bold tracking-[-0.045em] text-balance sm:text-6xl">
            {block.heading} <span className="text-[var(--accent)]">{block.accent}</span>
          </h2>
          <div
            className={`relative mt-14 grid gap-3 sm:mt-20 sm:gap-4 ${three ? "sm:aspect-[9/4] sm:grid-cols-3 sm:grid-rows-2" : count === 2 ? "sm:grid-cols-2" : ""}`}
          >
            {block.sticker && <Sticker src={block.sticker} tilt={-12} className="-top-9 left-4 w-20 sm:-top-14 sm:left-8 sm:w-28" />}
            {block.images.map((image, i) => (
              <Parallax
                key={image.alt}
                className={`relative overflow-hidden ${count === 1 ? (image.kind === "photo" ? "aspect-[4/3] sm:aspect-[2/1]" : "aspect-[2/1]") : "aspect-[3/2]"} ${three ? `sm:aspect-auto ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}` : ""}`}
              >
                <Fill
                  image={image}
                  sizes={count === 1 ? "100vw" : three && i > 0 ? "(min-width: 640px) 33vw, 100vw" : "(min-width: 640px) 66vw, 100vw"}
                />
              </Parallax>
            ))}
          </div>
        </section>
      );
    }
    case "statement":
      return (
        <section className="grid gap-6 py-24 sm:py-40 md:grid-cols-[minmax(0,1fr)_minmax(0,5fr)]">
          <p className="text-[13px] font-medium text-[var(--accent)] md:pt-4">{block.label}</p>
          <WordReveal
            text={block.text}
            className="text-4xl leading-[1.04] font-bold tracking-[-0.045em] sm:text-6xl xl:text-[5.5rem]"
          />
        </section>
      );
    case "merge":
      return <Merge label={block.label} heading={block.heading} text={block.text} before={block.before} after={block.after} />;
    case "findings":
      return (
        <section className="py-24 sm:py-32">
          <Heading label={block.label} heading={block.heading} text={block.text} />
          <ol className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
            {block.items.map((item, i) => (
              <li key={item.title} data-reveal className="rise bg-background p-7 sm:p-10">
                <p className="text-5xl font-bold tracking-[-0.05em] text-[var(--accent)] tabular-nums sm:text-6xl">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-8 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{item.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-neutral-600">{item.text}</p>
              </li>
            ))}
          </ol>
        </section>
      );
    case "carousel":
      return <Carousel label={block.label} heading={block.heading} text={block.text} items={block.items} />;
    case "fixes":
      return (
        <section className="py-24 sm:py-32">
          <Heading label={block.label} heading={block.heading} />
          <ol className="mt-14 border-b border-line">
            {block.items.map((item, i) => (
              <li key={item.problem} className="grid gap-8 border-t border-line py-12 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div data-reveal className="rise">
                  <p className="text-6xl font-bold tracking-[-0.05em] text-[var(--accent)] tabular-nums sm:text-7xl">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-8 text-[13px] font-medium text-muted">Problem</p>
                  <p className="mt-2 text-2xl leading-tight font-bold tracking-[-0.025em] text-balance sm:text-4xl">{item.problem}</p>
                  <p className="mt-8 text-[13px] font-medium text-[var(--accent)]">What I did</p>
                  <p className="mt-2 text-[17px] leading-relaxed text-neutral-600">{item.solution}</p>
                </div>
                <Panel image={item.image} className={i % 2 ? "lg:order-first" : ""} />
              </li>
            ))}
          </ol>
        </section>
      );
    case "tabs":
      return <Tabs label={block.label} heading={block.heading} items={block.items} />;
    case "results":
      return (
        <section className="relative my-12 bg-[var(--accent-dark)] px-6 py-20 text-white sm:my-20 sm:px-12 sm:py-28 lg:px-16">
          {block.sticker && <Sticker src={block.sticker} tilt={12} className="top-8 right-6 w-20 sm:top-12 sm:right-12 sm:w-32" />}
          <p className="text-[13px] font-medium text-white/60">{block.label}</p>
          <div className={`mt-10 grid gap-x-10 gap-y-12 ${block.numbers.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            {block.numbers.map((number) => (
              <div key={number.label} className="flex flex-col-reverse justify-end border-t border-white/15 pt-6">
                <p className="mt-3 text-[15px] text-white/70">{number.label}</p>
                <p className="text-7xl font-bold tracking-[-0.05em] text-[var(--highlight)] sm:text-8xl xl:text-9xl">
                  <CountUp value={number.value} />
                </p>
              </div>
            ))}
          </div>
          <p className="mt-16 max-w-4xl text-2xl leading-snug font-semibold tracking-[-0.02em] sm:mt-24 sm:text-4xl">{block.text}</p>
          {block.images && (
            <div className="mt-14 grid gap-3 sm:grid-cols-2 sm:gap-4">
              {block.images.map((image) => (
                <Parallax key={image.alt} className="relative aspect-[4/3] overflow-hidden">
                  <Fill image={image} sizes="(min-width: 640px) 45vw, 100vw" />
                </Parallax>
              ))}
            </div>
          )}
        </section>
      );
    case "quote": {
      const words = (
        <>
          {block.placeholder && (
            <p className="mb-6 inline-block px-2 py-1 text-[11px] font-semibold tracking-[0.12em] text-[var(--accent)] uppercase outline-1 outline-[var(--accent)]/40 outline-dashed">
              Quote needed
            </p>
          )}
          <blockquote
            className={`text-[1.75rem] leading-[1.15] font-bold tracking-[-0.035em] sm:text-4xl ${block.image ? "xl:text-[2.6rem]" : "lg:text-[2.75rem]"}`}
          >
            “<Accent text={block.quote} />”
          </blockquote>
          <figcaption className="mt-10 flex items-center gap-4 text-[15px]">
            {block.photo && !block.image && (
              <Image src={block.photo} alt="" width={92} height={92} className="size-12 shrink-0 rounded-full object-cover" />
            )}
            <span>
              {block.link ? (
                <a href={block.link} target="_blank" rel="noreferrer" className="link-line font-medium">
                  {block.name}
                </a>
              ) : (
                <span className="font-medium">{block.name}</span>
              )}
              <span className="block text-muted">{block.role}</span>
            </span>
          </figcaption>
        </>
      );
      // With a big photo: the photo on the left, the quote on the right.
      return block.image ? (
        <figure className="grid gap-10 py-24 sm:py-32 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
          <Parallax className="relative aspect-[4/3] overflow-hidden lg:aspect-[4/5]">
            <Fill image={block.image} sizes="(min-width: 1024px) 40vw, 100vw" />
          </Parallax>
          <div>{words}</div>
        </figure>
      ) : (
        <figure className="mx-auto max-w-5xl py-24 sm:py-32">{words}</figure>
      );
    }
    case "gallery": {
      const two = block.columns === 2;
      return (
        <section className="py-24 sm:py-32">
          <Heading label={block.label} heading={block.heading} />
          <div className={`mt-12 grid gap-3 sm:gap-4 ${two ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
            {block.images.map((image) => (
              <div
                key={image.alt}
                data-reveal
                className={`rise relative overflow-hidden bg-[var(--tint)] ${two ? "aspect-[16/10]" : "aspect-[4/5]"}`}
              >
                <Fill image={image} sizes={two ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 33vw, 100vw"} />
              </div>
            ))}
          </div>
        </section>
      );
    }
    case "text":
      return (
        <section className="grid gap-10 border-t border-line py-24 sm:py-32 lg:grid-cols-2 lg:gap-16">
          <Heading label={block.label} heading={block.heading} />
          <div className="space-y-5 text-[18px] leading-relaxed text-neutral-600 lg:pt-10">
            {block.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>
      );
  }
}

// A road-sign sticker that pops in, tilted (the movement is in globals.css, under .pop).
function Sticker({ src, tilt, className }: { src: string; tilt: number; className: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- a small decorative SVG
    <img
      src={src}
      alt=""
      aria-hidden
      data-reveal
      className={`pop absolute z-10 ${className}`}
      style={{ "--tilt": `${tilt}deg` } as CSSProperties}
    />
  );
}

function Intro({ study, role }: { study: CaseStudy; role: string[] }) {
  const facts = [
    { label: "Role", value: study.role },
    { label: "Timeline", value: study.timeline },
    { label: "Team", value: study.team },
    { label: "Platform", value: study.platform },
  ];
  return (
    <section className="pt-16 pb-24 sm:pt-24 sm:pb-32">
      <p className="text-[13px] text-muted">
        <span className="font-medium text-foreground">{study.client}</span> · {study.category} · {study.year}
      </p>
      <h1 className="mt-6 max-w-6xl text-5xl leading-[0.98] font-bold tracking-[-0.045em] text-balance sm:text-7xl xl:text-8xl">
        {study.title}
      </h1>
      <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
        <p className="text-xl leading-relaxed sm:text-2xl sm:leading-relaxed">{study.summary}</p>
        <div>
          <p className="text-[13px] font-medium text-[var(--accent)]">My role</p>
          <div className="mt-3 space-y-4 text-[16px] leading-relaxed text-neutral-600">
            {role.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
      <dl className="mt-14 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-line pt-6 sm:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-[12px] text-muted">{fact.label}</dt>
            <dd className="mt-1 text-[14px] font-medium">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Heading({ label, heading, text }: { label: string; heading: string; text?: string }) {
  return (
    <div className={text ? "grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-end lg:gap-16" : ""}>
      <div>
        <p className="text-[13px] font-medium text-[var(--accent)]">{label}</p>
        <h2 className="mt-3 text-5xl leading-[0.98] font-bold tracking-[-0.045em] text-balance sm:text-7xl">
          <Accent text={heading} />
        </h2>
      </div>
      {text && <p className="text-[17px] leading-relaxed text-neutral-600">{text}</p>}
    </div>
  );
}

// A tinted 4:3 panel. Screens sit in a browser window that runs off the
// bottom-right edge; cards and placeholders fill it.
function Panel({ image, className = "" }: { image: StoryImage; className?: string }) {
  return (
    <div data-reveal className={`rise relative aspect-[4/3] overflow-hidden bg-[var(--tint)] ${className}`}>
      {image.src && image.kind === "screen" ? (
        <div className="absolute top-[10%] left-[8%] w-[115%]">
          <BrowserWindow>
            <Fill image={image} sizes="(min-width: 1024px) 55vw, 100vw" />
          </BrowserWindow>
        </div>
      ) : (
        <Fill image={image} sizes="(min-width: 1024px) 50vw, 100vw" />
      )}
    </div>
  );
}
