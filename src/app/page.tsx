import Image from "next/image";
import { CaseStudyCard } from "@/components/case-study-card";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SiteFooter } from "@/components/site-footer";
import { artworks, dribbbleUrl } from "@/content/artworks";
import { caseStudies } from "@/content/case-studies";
import { awards, clients, earlierExperience, experience, profile, testimonials } from "@/content/profile";

const SITE = "https://ioncazac.com";

// Structured data so search engines and AI recruiting tools can read who Ion is.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description: profile.intro,
  url: SITE,
  image: `${SITE}/ion.jpg`,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Chișinău", addressCountry: "MD" },
  sameAs: profile.links.map((link) => link.href),
  knowsAbout: [
    "Product design",
    "UX/UI design",
    "AI product design",
    "AI agents UX",
    "Design systems",
    "Prototyping in code",
    "React",
    "shadcn/ui",
    "User research",
    "Usability testing",
    "B2B SaaS",
    "Dashboards",
    "Figma",
    "Mentoring",
  ],
  award: awards.map((award) => `${award.name}, ${award.detail}`),
  subjectOf: {
    "@type": "DigitalDocument",
    name: `${profile.name} - CV`,
    url: `${SITE}${profile.cv}`,
    encodingFormat: "application/pdf",
  },
};

// Rows in the Experience section share one grid so the columns line up:
// company | description | role | location | dates (from 1024px up).
const ROW =
  "grid grid-cols-[minmax(0,1fr)_7rem] gap-x-4 gap-y-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2.2fr)_minmax(0,1.1fr)_minmax(0,1.2fr)_7rem] lg:gap-x-6";

export default function Home() {
  const featured = caseStudies.slice(0, 2);
  const more = caseStudies.slice(2);

  return (
    <main className="site-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <RevealOnScroll />
      {/* Top bar */}
      <header className="flex items-center justify-between gap-4 py-6 text-[14px]">
        <p className="text-muted">{profile.tagline}</p>
        <nav className="flex shrink-0 items-center gap-5">
          <a href={profile.cv} download className="link-button">
            Download CV
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="link-button"
          >
            LinkedIn ↗
          </a>
        </nav>
      </header>

      {/* Intro */}
      <section className="pt-8 pb-20 sm:pt-14 sm:pb-24">
        {/* Photo on the left, name and introduction on the right (stacked on phones). */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12 lg:gap-16">
          <Image
            src="/ion.jpg"
            alt={`Portrait of ${profile.name}`}
            width={512}
            height={512}
            priority
            className="size-28 shrink-0 rounded-full object-cover sm:size-40 lg:size-64"
          />
          <div className="min-w-0 md:pt-2">
            <h1 className="text-5xl font-bold tracking-[-0.035em] sm:text-7xl lg:text-8xl">
              {profile.greeting} <span aria-hidden>👋</span>
            </h1>
            <p className="mt-6 text-[17px] leading-relaxed text-muted sm:mt-8 lg:text-xl lg:leading-relaxed">
              <span className="text-foreground">
                {profile.name}, {profile.title}.
              </span>{" "}
              {profile.intro}
            </p>
            <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[14px] text-muted">
              {profile.status.map((item, i) => (
                <li key={item} className="flex items-center gap-x-3">
                  {i === 0 ? (
                    <span className="flex items-center gap-2 font-medium text-foreground">
                      <span aria-hidden className="size-2 rounded-full bg-emerald-500" />
                      {item}
                    </span>
                  ) : (
                    <>
                      <span aria-hidden>·</span>
                      {item}
                    </>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-[14px] text-muted">Send me a message ↓</p>
            <a
              href={`mailto:${profile.email}`}
              className="link-line mt-2 inline-block text-3xl font-medium tracking-tight [--line:2px] sm:text-5xl"
            >
              {profile.email}
            </a>
          </div>
        </div>

        {/* Logo strip: three identical copies slide right in a seamless loop (see .logo-marquee in globals.css). */}
        <div className="logo-marquee mt-16 sm:mt-20">
          <div className="logo-track">
            {[0, 1, 2].map((copy) => (
              <ul key={copy} aria-hidden={copy > 0 || undefined} className="logo-set">
                {clients.map((client) => (
                  <li key={client.name} className="flex shrink-0 items-center">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={client.width}
                      height={client.height}
                      loading="eager"
                      style={{ "--logo-h": `${client.display}px` } as React.CSSProperties}
                      className="h-[calc(var(--logo-h)*0.8)] w-auto object-contain opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-[var(--logo-h)]"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section id="work" className="border-t border-line pt-20 pb-24 sm:pt-24">
        <h2 className="text-center text-4xl font-medium tracking-tight sm:text-6xl">Case Studies</h2>
        <div className="mt-12 grid gap-x-6 gap-y-10 sm:mt-16 sm:grid-cols-2">
          {featured.map((study) => (
            <CaseStudyCard key={study.slug} study={study} size="large" />
          ))}
        </div>
        {more.length > 0 && (
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:mt-14 sm:grid-cols-2">
            {more.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        )}
      </section>

      {/* Recommendations */}
      <section id="recommendations" className="border-t border-line pt-20 pb-24 sm:pt-24">
        <h2 className="sr-only">Recommendations</h2>
        {/* Laid out like inakisoria.com: photo + company logo, quote, then "Name · Role Company". */}
        <ul className="flex flex-wrap justify-center gap-y-16 sm:gap-y-20">
          {testimonials.map((t) => (
            <li key={t.name} className="w-full px-4 text-center sm:w-1/2 lg:w-1/3">
              <figure className="mx-auto max-w-[320px]">
                <div className="flex items-center justify-center">
                  <Image src={t.photo} alt="" width={100} height={100} className="size-[50px] rounded-full object-cover" />
                  {/* The white padding cuts a thin gap where the logo overlaps the photo. */}
                  <span className="relative -my-[3px] -ml-2.5 rounded-full bg-white p-[3px]">
                    <Image
                      src={t.logo}
                      alt=""
                      width={100}
                      height={100}
                      className="size-[50px] rounded-full object-cover ring-1 ring-black/5"
                    />
                  </span>
                </div>
                <blockquote className="mt-10 text-base leading-[1.3] tracking-[-0.3px] sm:text-lg md:text-[19px]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-[13px] leading-[1.5] text-muted">
                  <a
                    href={profile.recommendationsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link-line font-medium text-foreground"
                  >
                    {t.name}
                  </a>{" "}
                  · {t.role} {t.company}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section id="experience" className="border-t border-line pt-20 pb-24 sm:pt-24">
        <h2 className="text-center text-4xl font-medium tracking-tight sm:text-6xl">Experience</h2>
        {/* Desktop: company, description, role, location and dates each in their own column.
            Phones and tablets: company and dates, then role and location, then the description. */}
        <ul className="mt-12 divide-y divide-line border-y border-line sm:mt-16">
          {experience.map((job) => (
            <li key={`${job.company}-${job.dates}`} className={`${ROW} py-5 text-[15px]`}>
              <span className="font-medium">{job.company}</span>
              <p className="order-4 col-span-2 mt-1 text-[14px] leading-relaxed text-neutral-600 lg:order-none lg:col-span-1 lg:mt-0 lg:text-[15px]">
                {job.outcome}
              </p>
              <span className="order-3 col-span-2 text-muted lg:order-none lg:col-span-1">
                {job.role}
                <span className="lg:hidden"> · {job.location}</span>
              </span>
              <span className="hidden text-muted lg:block">{job.location}</span>
              <span className="order-2 text-right text-muted tabular-nums lg:order-none">{job.dates}</span>
            </li>
          ))}
        </ul>

        {/* Older roles stay folded away; a click opens them (no JavaScript needed). */}
        <details className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[15px] font-medium [&::-webkit-details-marker]:hidden">
            Earlier experience
            <span className="flex items-center gap-2 text-muted tabular-nums">
              2014 – 2020
              <span aria-hidden className="transition-transform group-open:rotate-180">↓</span>
            </span>
          </summary>
          <ul className="divide-y divide-line border-t border-line">
            {earlierExperience.map((job) => (
              <li key={`${job.company}-${job.dates}`} className={`${ROW} py-3 text-[14px]`}>
                <span>{job.company}</span>
                <span className="order-3 col-span-2 text-muted lg:order-none lg:col-span-1 lg:col-start-3">{job.role}</span>
                <span className="order-2 text-right text-muted tabular-nums lg:order-none lg:col-start-5">{job.dates}</span>
              </li>
            ))}
          </ul>
        </details>

        <h3 className="mt-16 text-[15px] font-medium">Awards</h3>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {awards.map((award) => (
            <li key={award.name} className={`${ROW} py-4 text-[15px]`}>
              <span className="font-medium">{award.name}</span>
              <span className="order-2 text-right text-muted lg:order-none lg:col-span-4 lg:text-left">{award.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Artworks */}
      <section id="artworks" className="border-t border-line pt-20 pb-24 sm:pt-24">
        <h2 className="sr-only">Artworks</h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6">
          {artworks.map((art) => (
            <li key={art.href} data-reveal>
              <a href={art.href} target="_blank" rel="noreferrer" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-subtle">
                  <Image
                    src={art.src}
                    alt={art.title}
                    fill
                    sizes="50vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-2.5 truncate text-[13px] text-muted transition-colors group-hover:text-foreground">
                  {art.title}
                </p>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-center">
          <a
            href={dribbbleUrl}
            target="_blank"
            rel="noreferrer"
            className="link-button"
          >
            See all on Dribbble ↗
          </a>
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
