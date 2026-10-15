import Image from "next/image";
import type { CaseStudy } from "@/content/case-studies";

// The case study's cover image, or a generated stand-in until one is added.
export function Cover({
  study,
  sizes,
  priority = false,
}: {
  study: CaseStudy;
  sizes: string;
  priority?: boolean;
}) {
  if (study.cover) {
    return (
      <Image
        src={study.cover}
        alt={`${study.client} — ${study.title}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    );
  }

  const [from, to] = study.accent;
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{ background: `radial-gradient(120% 120% at 100% 0%, ${to} 0%, ${from} 70%)` }}
    >
      <div className="absolute top-[16%] left-1/2 h-full w-[72%] -translate-x-1/2 rounded-t-xl bg-white/95 shadow-2xl shadow-black/30 transition-transform duration-700 ease-out group-hover:-translate-y-2">
        <div className="flex items-center gap-1.5 border-b border-black/5 px-4 py-3">
          <span className="size-2 rounded-full bg-black/10" />
          <span className="size-2 rounded-full bg-black/10" />
          <span className="size-2 rounded-full bg-black/10" />
        </div>
        <div className="flex gap-4 p-4">
          <div className="hidden w-1/5 space-y-2 sm:block">
            {[80, 60, 70, 50, 65].map((w, i) => (
              <div key={i} className="h-2 rounded-full bg-black/[0.07]" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="flex-1 space-y-3">
            <div className="h-3 w-2/5 rounded-full bg-black/10" />
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-12 rounded-lg bg-black/[0.04] sm:h-16" />
              ))}
            </div>
            <div className="h-24 rounded-lg sm:h-36" style={{ background: `${to}1f` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
