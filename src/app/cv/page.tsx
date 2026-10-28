import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { cv } from "@/content/cv";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "CV",
  description: `${cv.name}, ${cv.headline}. ${cv.summary}`,
  alternates: { canonical: "/cv" },
};

// The CV as plain, readable text: the same content as the PDF download.
export default function CvPage() {
  return (
    <main className="site-container">
      <nav className="flex items-center justify-between py-6 text-[14px]">
        <Link href="/" className="link-button">
          ← {profile.name}
        </Link>
        <a href={profile.cv} download className="link-button">
          Download PDF
        </a>
      </nav>

      <article className="mx-auto max-w-3xl pt-10 pb-24 sm:pt-16">
        <header>
          <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">{cv.name}</h1>
          <p className="mt-3 text-xl font-medium tracking-tight">{cv.headline}</p>
          <p className="mt-6 text-[17px] leading-relaxed text-neutral-600">{cv.summary}</p>
          <p className="mt-4 text-[15px] leading-relaxed">{cv.status}</p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[15px] text-muted">
            <a href={`mailto:${profile.email}`} className="link-line text-foreground">
              {profile.email}
            </a>
            <span>{cv.phone}</span>
            <span>{cv.location}</span>
          </p>
          <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
            <Link href="/" className="link-button">
              ioncazac.com
            </Link>
            {profile.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="link-button">
                {link.label} ↗
              </a>
            ))}
          </p>
        </header>

        <CvSection title="Skills">
          <dl className="divide-y divide-line border-y border-line">
            {cv.skills.map((skill) => (
              <div key={skill.area} className="grid gap-1 py-3 sm:grid-cols-[160px_1fr] sm:gap-6">
                <dt className="text-[15px] font-medium">{skill.area}</dt>
                <dd className="text-[15px] text-neutral-600">{skill.items}</dd>
              </div>
            ))}
          </dl>
        </CvSection>

        <CvSection title="Experience">
          <div className="space-y-8">
            {cv.experience.map((job) => (
              <section key={`${job.company}-${job.dates}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-[17px] font-medium">
                    {job.company}, {job.role}
                  </h3>
                  <p className="text-[14px] text-muted tabular-nums">{job.dates}</p>
                </div>
                <p className="mt-1 text-[14px] text-muted">{job.details}</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-neutral-600 marker:text-neutral-300">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </CvSection>

        <CvSection title="Earlier experience">
          <ul className="space-y-1.5 text-[15px] text-neutral-600">
            {cv.earlierExperience.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </CvSection>

        <CvSection title="Awards">
          <ul className="space-y-1.5 text-[15px] text-neutral-600">
            {cv.awards.map((award) => (
              <li key={award}>{award}</li>
            ))}
          </ul>
        </CvSection>

        <CvSection title="Education and languages">
          <ul className="space-y-1.5 text-[15px] text-neutral-600">
            {cv.education.map((line) => (
              <li key={line}>{line}</li>
            ))}
            <li>{cv.languages}</li>
          </ul>
        </CvSection>

        <CvSection title="Recommendations">
          <div className="space-y-6">
            {cv.recommendations.map((rec) => (
              <figure key={rec.by}>
                <blockquote className="text-[17px] leading-snug">“{rec.quote}”</blockquote>
                <figcaption className="mt-1.5 text-[14px] text-muted">{rec.by}</figcaption>
              </figure>
            ))}
          </div>
          <a href={profile.recommendationsUrl} target="_blank" rel="noreferrer" className="link-button mt-6 inline-block">
            Read more on LinkedIn ↗
          </a>
        </CvSection>
      </article>

      <SiteFooter />
    </main>
  );
}

function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="mb-5 text-[13px] text-muted">{title}</h2>
      {children}
    </section>
  );
}
