import Image from "next/image";
import { CaseStudyCard } from "@/components/case-study-card";
import { SiteFooter } from "@/components/site-footer";
import { artworks, dribbbleUrl } from "@/content/artworks";
import { caseStudies } from "@/content/case-studies";
import { clients, experience, profile, testimonials } from "@/content/profile";

export default function Home() {
  const featured = caseStudies.slice(0, 2);
  const more = caseStudies.slice(2);

  return (
    <main>
      {/* Top bar */}
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-6 text-[14px] sm:px-6">
        <p className="text-muted">{profile.tagline}</p>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="font-medium underline decoration-1 underline-offset-4 transition-colors hover:text-muted"
        >
          LinkedIn ↗
        </a>
      </header>

      {/* Intro */}
      <section className="mx-auto flex max-w-xl flex-col items-center px-4 pt-10 pb-20 text-center sm:pt-16 sm:pb-24">
        <Image
          src="/ion.jpg"
          alt={`Portrait of ${profile.name}`}
          width={192}
          height={192}
          priority
          className="size-24 rounded-full object-cover"
        />
        <h1 className="mt-8 text-5xl font-medium tracking-tight sm:text-6xl">
          {profile.greeting} <span aria-hidden>👋</span>
        </h1>
        <p className="mt-3 text-[17px] font-medium">
          {profile.name} — {profile.title}
        </p>
        <p className="mt-6 text-[17px] leading-relaxed text-muted text-balance">{profile.intro}</p>
        <p className="mt-10 text-[14px] text-muted">Send me a message</p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-2 text-3xl font-medium tracking-tight underline decoration-2 underline-offset-[6px] transition-colors hover:text-muted sm:text-5xl sm:underline-offset-8"
        >
          {profile.email}
        </a>

        <ul className="mt-16 grid w-full grid-cols-3 items-center gap-x-6 gap-y-12 lg:flex lg:w-[58rem] lg:max-w-[calc(100vw-4rem)] lg:justify-between lg:gap-x-10">
          {clients.map((client) => (
            <li key={client.name} className="flex justify-center">
              <Image
                src={client.logo}
                alt={client.name}
                width={client.width}
                height={client.height}
                style={{ "--logo-h": `${client.display}px` } as React.CSSProperties}
                className="h-[calc(var(--logo-h)*0.8)] w-auto max-w-full object-contain opacity-50 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-[var(--logo-h)]"
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Case studies */}
      <section id="work" className="border-t border-line px-4 pt-20 pb-24 sm:px-6 sm:pt-24">
        <h2 className="text-center text-4xl font-medium tracking-tight sm:text-6xl">Case Studies</h2>
        <div className="mx-auto mt-12 max-w-6xl space-y-10 sm:mt-16 sm:space-y-14">
          {featured.map((study) => (
            <CaseStudyCard key={study.slug} study={study} size="large" />
          ))}
        </div>
        {more.length > 0 && (
          <div className="mx-auto mt-10 grid max-w-6xl gap-x-6 gap-y-10 sm:mt-14 sm:grid-cols-2">
            {more.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        )}
      </section>

      {/* Artworks */}
      <section id="artworks" className="border-t border-line px-4 pt-20 pb-24 sm:px-6 sm:pt-24">
        <h2 className="text-center text-4xl font-medium tracking-tight sm:text-6xl">Artworks</h2>
        <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-x-4 gap-y-8 sm:mt-16 sm:gap-x-6 lg:grid-cols-4">
          {artworks.map((art, i) => (
            <li key={art.href} className={i < 2 ? "lg:col-span-2" : ""}>
              <a href={art.href} target="_blank" rel="noreferrer" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-subtle">
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
            className="text-[15px] font-medium underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            See all on Dribbble ↗
          </a>
        </p>
      </section>

      {/* Recommendations */}
      <section id="recommendations" className="border-t border-line px-4 pt-20 pb-24 sm:px-6 sm:pt-24">
        <h2 className="text-center text-4xl font-medium tracking-tight sm:text-6xl">Recommendations</h2>
        <ul className="mx-auto mt-14 grid max-w-6xl gap-x-10 gap-y-16 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <li key={t.name} className="flex flex-col items-center text-center">
              <Image
                src={t.photo}
                alt={t.name}
                width={96}
                height={96}
                className="size-12 rounded-full object-cover ring-1 ring-black/5"
              />
              <blockquote className="mt-5 max-w-sm text-lg leading-snug tracking-tight text-balance">
                “{t.quote}”
              </blockquote>
              <p className="mt-4 text-[13px] text-muted">
                <a href={t.href} target="_blank" rel="noreferrer" className="font-medium text-foreground hover:underline">
                  {t.name}
                </a>
                <br />
                {t.role}
                {t.company && <> {t.company}</>}
              </p>
              <a
                href={profile.recommendationsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 text-[13px] text-muted underline decoration-1 underline-offset-4 transition-colors hover:text-foreground"
              >
                Read full on LinkedIn ↗
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section id="experience" className="border-t border-line px-4 pt-20 pb-24 sm:px-6 sm:pt-24">
        <h2 className="text-center text-4xl font-medium tracking-tight sm:text-6xl">Experience</h2>
        <ul className="mx-auto mt-12 max-w-3xl divide-y divide-line border-y border-line sm:mt-16">
          {experience.map((job) => (
            <li
              key={`${job.company}-${job.dates}`}
              className="grid grid-cols-[minmax(0,1fr)_7rem] gap-x-4 py-4 text-[15px] sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,1fr)_7rem]"
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
