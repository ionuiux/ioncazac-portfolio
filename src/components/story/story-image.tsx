import Image from "next/image";
import type { ReactNode } from "react";
import type { StoryImage } from "@/content/case-studies";

// Fills its parent, which must be `relative` and have a size. Screens are
// cropped from the top, photos from the middle (or their `position`), and cards
// and illustrations are shown whole on the tinted panel. Without a file, it
// shows a placeholder instead.
export function Fill({
  image,
  sizes,
  priority = false,
  compact = false,
}: {
  image: StoryImage;
  sizes: string;
  priority?: boolean;
  compact?: boolean;
}) {
  if (!image.src) return <Placeholder image={image} compact={compact} />;
  if (image.kind === "card" || image.kind === "illustration") {
    return (
      <div className="absolute inset-0 bg-[var(--tint)] p-[9%]">
        <div className="relative size-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className={`object-contain ${image.kind === "card" ? "drop-shadow-[0_24px_32px_rgba(17,17,50,0.22)]" : ""}`}
          />
        </div>
      </div>
    );
  }
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${image.kind === "photo" ? "object-center" : "object-top"}`}
      style={image.position ? { objectPosition: image.position } : undefined}
    />
  );
}

// Stands in for a picture that hasn't been added yet, saying what goes there.
export function Placeholder({ image, compact = false }: { image: StoryImage; compact?: boolean }) {
  return (
    <div
      role="img"
      aria-label={`Image to add: ${image.alt}`}
      className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[var(--tint)] p-3 text-center outline-1 -outline-offset-[6px] outline-[var(--accent)]/35 outline-dashed sm:gap-2 sm:p-5"
    >
      <span className="text-[10px] font-semibold tracking-[0.12em] text-[var(--accent)] uppercase sm:text-[11px]">
        Image needed
      </span>
      <span className={`max-w-[30ch] leading-snug text-balance text-neutral-700 ${compact ? "text-[11px] sm:text-[13px]" : "text-[13px] sm:text-[14px]"}`}>
        {image.alt}
      </span>
      {image.ask && !compact && <span className="text-[11px] text-muted sm:text-[12px]">{image.ask}</span>}
    </div>
  );
}

// A minimal browser window around a 16:10 screen (children fill the screen).
export function BrowserWindow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden bg-white shadow-[0_30px_60px_-24px_rgba(17,17,50,0.45)] ring-1 ring-black/5 ${className}`}>
      <div className="flex items-center gap-1 border-b border-black/5 px-2.5 py-1.5 sm:gap-1.5 sm:px-4 sm:py-2.5">
        <span className="size-1.5 rounded-full bg-black/10 sm:size-2.5" />
        <span className="size-1.5 rounded-full bg-black/10 sm:size-2.5" />
        <span className="size-1.5 rounded-full bg-black/10 sm:size-2.5" />
        <span className="mx-auto h-2.5 w-1/3 bg-black/[0.05] sm:h-5" />
      </div>
      <div className="relative aspect-[16/10]">{children}</div>
    </div>
  );
}

// A section's name, set bold on a pill in the accent colour so each part of
// the story (the problem, my role, key decisions…) is easy to find and point at.
// On the dark results panel it uses the highlight colour instead.
export function Label({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`inline-flex items-center rounded-full px-4 py-2 text-[15px] leading-none font-bold tracking-[-0.01em] sm:text-[16px] ${
        dark ? "bg-[var(--highlight)] text-[var(--accent-dark)]" : "bg-[var(--accent)] text-white"
      }`}
    >
      {children}
    </p>
  );
}

// A small bold heading inside a section ("Why", "What it changed"…).
export function SubLabel({ children, muted = false, className = "" }: { children: ReactNode; muted?: boolean; className?: string }) {
  return <p className={`text-[13px] font-bold ${muted ? "text-muted" : "text-[var(--accent)]"} ${className}`}>{children}</p>;
}

// Text with parts wrapped in *stars* shown in the accent colour.
export function Accent({ text }: { text: string }) {
  return text.split(/\*([^*]+)\*/).map((part, i) =>
    i % 2 ? (
      <span key={i} className="text-[var(--accent)]">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
