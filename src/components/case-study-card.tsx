import Link from "next/link";
import type { CaseStudy } from "@/content/case-studies";
import { Cover } from "@/components/cover";

export function CaseStudyCard({
  study,
  size = "small",
}: {
  study: CaseStudy;
  size?: "large" | "small";
}) {
  if (size === "large") {
    return (
      <Link
        href={`/work/${study.slug}`}
        className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-subtle sm:aspect-[16/9]"
      >
        <Cover study={study} sizes="(min-width: 1152px) 1152px, 100vw" priority />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 pt-32 sm:from-black/70 sm:via-black/30 sm:pt-24 text-white sm:p-8">
          <p className="text-[15px] font-medium">{study.client}</p>
          <p className="mt-1 max-w-sm text-[15px] leading-snug text-white/80">{study.title}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/90">
            View case study
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/work/${study.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-subtle">
        <Cover study={study} sizes="(min-width: 640px) 50vw, 100vw" />
      </div>
      <p className="mt-3 text-[14px]">
        <span className="font-medium">{study.client}</span>
        <span className="text-muted"> · {study.title}</span>
      </p>
    </Link>
  );
}
