import Image from "next/image";

// A screenshot inside a minimal browser window.
export function BrowserFrame({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden bg-white shadow-[0_30px_60px_-24px_rgba(17,17,50,0.45)] ring-1 ring-black/5 ${className}`}
    >
      <div className="flex items-center gap-1 border-b border-black/5 px-2.5 py-1.5 sm:gap-1.5 sm:px-4 sm:py-2.5">
        <span className="size-1.5 rounded-full bg-black/10 sm:size-2.5" />
        <span className="size-1.5 rounded-full bg-black/10 sm:size-2.5" />
        <span className="size-1.5 rounded-full bg-black/10 sm:size-2.5" />
        <span className="mx-auto h-2.5 w-1/3 bg-black/[0.05] sm:h-5" />
      </div>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className="block h-auto w-full" />
    </div>
  );
}
