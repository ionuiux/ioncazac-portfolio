import type { Metadata } from "next";
import Link from "next/link";
import { ArtworkGallery } from "@/components/artwork-gallery";
import { CaseStudyCard } from "@/components/case-study-card";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SiteFooter } from "@/components/site-footer";
import { artworks, dribbbleUrl } from "@/content/artworks";
import { caseStudies } from "@/content/case-studies";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Portfolio",
  description: `Every case study and design shot by ${profile.name}, ${profile.title}: B2B SaaS, mobility, fintech, developer tools and mobile apps.`,
  alternates: { canonical: "/portfolio" },
};

// All the work in one place: every case study, then the design shots, which
// open large on this page (the same viewer as on the homepage).
export default function PortfolioPage() {
  return (
    <main className="site-container">
      <RevealOnScroll />
      <nav className="flex items-center justify-between py-6 text-[14px]">
        <Link href="/" className="link-button">
          ← {profile.name}
        </Link>
        <a href="#contact" className="link-button">
          Get in touch
        </a>
      </nav>

      <header className="mx-auto max-w-3xl pt-12 pb-16 text-center sm:pt-20 sm:pb-20">
        <h1 className="text-5xl font-medium tracking-tight sm:text-7xl">Portfolio</h1>
        <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-muted text-balance">
          Case studies and design shots: B2B SaaS, mobility, fintech, developer tools, websites and mobile apps.
        </p>
      </header>

      <section id="case-studies" className="pb-24">
        <SectionHeading title="Case studies" count={caseStudies.length} />
        <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} size="large" />
          ))}
        </div>
      </section>

      <section id="shots" className="pb-24">
        <SectionHeading title="Design shots" count={artworks.length} />
        <div className="mt-10">
          <ArtworkGallery />
        </div>
        <p className="mt-12 text-center">
          <a href={dribbbleUrl} target="_blank" rel="noreferrer" className="link-button">
            See all on Dribbble ↗
          </a>
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}

function SectionHeading({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-baseline justify-between border-b border-line pb-4">
      <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">{title}</h2>
      <p className="text-[14px] text-muted tabular-nums">{count}</p>
    </div>
  );
}
