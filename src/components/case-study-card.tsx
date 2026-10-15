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
      <Link href={`/work/${study.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-subtle sm:aspect-[16/9]">
          <Cover study={study} sizes="(min-width: 1152px) 1152px, 100vw" priority />
        </div>
        <div className="mt-4 flex items-start justify-between gap-6">
          <p className="text-[15px] leading-snug">
            <span className="font-medium">{study.client}</span>
            <span className="text-muted"> · {study.title}</span>
          </p>
          <span className="hidden shrink-0 items-center gap-1.5 text-[14px] font-medium sm:inline-flex">
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
