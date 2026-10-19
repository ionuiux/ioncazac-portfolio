import Image from "next/image";
import { CaseStudyCard } from "@/components/case-study-card";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { SiteFooter } from "@/components/site-footer";
import { artworks, dribbbleUrl } from "@/content/artworks";
import { caseStudies } from "@/content/case-studies";
import { clients, experience, profile, testimonials } from "@/content/profile";

export default function Home() {
  const featured = caseStudies.slice(0, 2);
  const more = caseStudies.slice(2);

  return (
    <main className="site-container">
      <RevealOnScroll />
      {/* Top bar */}
      <header className="flex items-center justify-between gap-4 py-6 text-[14px]">
        <p className="text-muted">{profile.tagline}</p>
        <nav className="flex shrink-0 items-center gap-5">
          <a href={profile.cv} download className="link-button">
            CV ↗
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
        <div className="mt-12 space-y-10 sm:mt-16 sm:space-y-14">
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

      {/* Artworks */}
      <section id="artworks" className="border-t border-line pt-20 pb-24 sm:pt-24">
        <h2 className="sr-only">Artworks</h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
          {artworks.map((art, i) => (
            <li key={art.href} className={i < 2 ? "lg:col-span-2" : ""} data-reveal>
              <a href={art.href} target="_blank" rel="noreferrer" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-subtle">
                  <Image
                    src={art.src}
                    alt={art.title}
                    fill
                    sizes={i < 2 ? "(min-width: 1024px) 50vw, 50vw" : "(min-width: 1024px) 25vw, 50vw"}
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
        <ul className="mt-12 divide-y divide-line border-y border-line sm:mt-16">
          {experience.map((job) => (
            <li
              key={`${job.company}-${job.dates}`}
              className="grid grid-cols-[minmax(0,1fr)_7rem] gap-x-4 py-4 text-[15px] sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,1fr)_7rem] lg:grid-cols-4"
            >
              <span className="font-medium">{job.company}</span>
              <span className="order-3 col-span-2 text-muted sm:order-none sm:col-span-1">{job.role}</span>
              <span className="hidden text-muted sm:block">{job.location}</span>
              <span className="text-right text-muted tabular-nums">{job.dates}</span>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </main>
  );
}
