import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyCard } from "@/components/case-study-card";
import { Cover } from "@/components/cover";
import { SiteFooter } from "@/components/site-footer";
import { caseStudies, getCaseStudy, type CaseImage } from "@/content/case-studies";
import { profile } from "@/content/profile";

// Every case study is prerendered at build time, so a short blocking load is fine.
export const instant = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.client} case study`,
    description: study.summary,
    openGraph: study.cover ? { images: [study.cover] } : undefined,
  };
}

function CaseFigure({ image }: { image: CaseImage }) {
  return (
    <figure>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-subtle">
        {image.src ? (
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[13px] text-muted">
            Image placeholder — {image.alt}
          </div>
        )}
      </div>
      {image.caption && <figcaption className="mt-3 text-[13px] text-muted">{image.caption}</figcaption>}
    </figure>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.indexOf(study);
  const next = caseStudies[(index + 1) % caseStudies.length];

  const meta = [
    { label: "Role", value: study.role },
    { label: "Timeline", value: study.timeline },
    { label: "Team", value: study.team },
    { label: "Platform", value: study.platform },
  ];

  return (
    <main>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-[14px] sm:px-6">
        <Link href="/" className="font-medium hover:text-muted">
          ← {profile.name}
        </Link>
        <a href="#contact" className="text-muted hover:text-foreground">
          Get in touch
        </a>
      </nav>

      <header className="mx-auto max-w-3xl px-4 pt-12 text-center sm:pt-20">
        <p className="text-[13px] text-muted">
          <span className="font-medium text-foreground">{study.client}</span> · {study.category} · {study.year}
        </p>
        <h1 className="mt-5 text-4xl font-medium tracking-tight text-balance sm:text-6xl">{study.title}</h1>
        <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-muted text-balance">{study.summary}</p>
      </header>

      <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-y-6 border-y border-line px-4 py-6 sm:grid-cols-4 sm:px-6">
        {meta.map((item) => (
          <div key={item.label}>
            <dt className="text-[12px] text-muted">{item.label}</dt>
            <dd className="mt-1 text-[14px] font-medium">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mx-auto mt-14 max-w-6xl px-4 sm:px-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-subtle sm:aspect-[16/9]">
          <Cover study={study} sizes="(min-width: 1152px) 1152px, 100vw" priority />
        </div>
      </div>

      <article className="pt-8 pb-16">
        {study.sections.map((section) => (
          <section key={section.heading} className="mx-auto mt-16 max-w-6xl px-4 sm:mt-24 sm:px-6">
            <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-[200px_1fr] md:gap-12">
              <h2 className="text-[15px] font-medium">{section.heading}</h2>
              <div className="space-y-4 text-[17px] leading-relaxed text-neutral-600">
                {section.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {section.metrics && (
              <dl className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
                {section.metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col-reverse rounded-2xl bg-subtle p-6">
                    <dt className="mt-2 text-[13px] text-muted">{metric.label}</dt>
                    <dd className="text-4xl font-medium tracking-tight">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {section.images && (
              <div className={`mt-10 grid gap-4 sm:gap-6 ${section.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {section.images.map((image, i) => (
                  <CaseFigure key={i} image={image} />
                ))}
              </div>
            )}
          </section>
        ))}
      </article>

      {next.slug !== study.slug && (
        <section className="border-t border-line px-4 pt-16 pb-24 sm:px-6">
          <p className="text-center text-[13px] text-muted">Next case study</p>
          <div className="mx-auto mt-6 max-w-6xl">
            <CaseStudyCard study={next} size="large" />
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}
