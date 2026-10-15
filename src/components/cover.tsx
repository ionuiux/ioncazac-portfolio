import Image from "next/image";
import { BrowserFrame } from "@/components/browser-frame";
import { PhoneFrame } from "@/components/phone-frame";
import type { CaseStudy } from "@/content/case-studies";

// The case study's cover: a screen mockup, a single image,
// or a generated stand-in until one of those is added.
export function Cover({
  study,
  sizes,
  priority = false,
}: {
  study: CaseStudy;
  sizes: string;
  priority?: boolean;
}) {
  const [from, to] = study.accent;
  const background = `radial-gradient(120% 120% at 100% 0%, ${to} 0%, ${from} 70%)`;

  if (study.mockup?.device === "phone") {
    const { main, left, right } = study.mockup;
    return (
      <div className="absolute inset-0 overflow-hidden" style={{ background }}>
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "linear-gradient(to bottom, black, transparent 70%)",
          }}
        />
        {/* Phones are sized by the cover's height (cqh) so they stay vertically
            centred and fill the space whether the cover is 4:3 or 16:9. */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ containerType: "size" }}>
          {left && (
            <div className="relative -mr-[2cqw] w-[min(26cqw,31cqh)] shrink-0 translate-y-[6%] -rotate-[8deg] transition-transform duration-700 ease-out group-hover:-translate-x-2">
              <PhoneFrame screen={left} sizes="(min-width: 640px) 20vw, 26vw" />
            </div>
          )}
          <div className="relative z-10 w-[min(34cqw,39cqh)] shrink-0 transition-transform duration-700 ease-out group-hover:-translate-y-2">
            <PhoneFrame screen={main} sizes="(min-width: 640px) 24vw, 32vw" priority={priority} />
          </div>
          {right && (
            <div className="relative -ml-[2cqw] w-[min(26cqw,31cqh)] shrink-0 translate-y-[6%] rotate-[8deg] transition-transform duration-700 ease-out group-hover:translate-x-2">
              <PhoneFrame screen={right} sizes="(min-width: 640px) 20vw, 26vw" />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (study.mockup) {
    const { main, left, right } = study.mockup;
    return (
      <div className="absolute inset-0 overflow-hidden" style={{ background }}>
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage: "linear-gradient(to bottom, black, transparent 70%)",
          }}
        />
        {left && (
          <div className="absolute top-[24%] left-[2%] hidden w-[40%] -rotate-[7deg] opacity-80 transition-transform duration-700 ease-out group-hover:-translate-x-2 sm:block">
            <BrowserFrame {...left} sizes="(min-width: 640px) 40vw, 1px" />
          </div>
        )}
        {right && (
          <div className="absolute top-[20%] right-[2%] hidden w-[40%] rotate-[7deg] opacity-80 transition-transform duration-700 ease-out group-hover:translate-x-2 sm:block">
            <BrowserFrame {...right} sizes="(min-width: 640px) 40vw, 1px" />
          </div>
        )}
        <div className="absolute top-[10%] left-1/2 w-[90%] -translate-x-1/2 transition-transform duration-700 ease-out group-hover:-translate-y-2 sm:top-[12%] sm:w-[58%]">
          <BrowserFrame {...main} sizes="(min-width: 640px) 60vw, 90vw" priority={priority} />
        </div>
      </div>
    );
  }

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

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden" style={{ background }}>
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
