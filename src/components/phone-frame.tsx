import Image from "next/image";
import type { Screen } from "@/content/case-studies";

// A phone screenshot inside a minimal iPhone frame. The parent sets the width.
// The frame's proportions leave a screen area matching iPhone screenshots (~0.462);
// the screen is inset by position, not padding, so the bezel scales with the phone.
export function PhoneFrame({
  screen,
  sizes,
  priority = false,
  className = "",
}: {
  screen: Screen;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/18.8] bg-[#0b0b0d] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/10 ${className}`}
      style={{ borderRadius: "16% / 7.66%" }}
    >
      <div className="absolute inset-x-[3.2%] inset-y-[1.53%] overflow-hidden bg-black" style={{ borderRadius: "13.5% / 6.24%" }}>
        <Image src={screen.src} alt={screen.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        <span aria-hidden className="absolute top-[1.4%] left-1/2 h-[3.6%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
