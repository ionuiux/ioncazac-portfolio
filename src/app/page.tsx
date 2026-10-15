import Image from "next/image";
import { CaseStudyCard } from "@/components/case-study-card";
import { SiteFooter } from "@/components/site-footer";
import { caseStudies } from "@/content/case-studies";
import { clients, experience, profile, testimonials } from "@/content/profile";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export default function Home() {
  const featured = caseStudies.slice(0, 2);
  const more = caseStudies.slice(2);

  return (
    <main>
      {/* Intro */}
      <section className="mx-auto flex max-w-xl flex-col items-center px-4 pt-20 pb-20 text-center sm:pt-28 sm:pb-24">
        <Image
          src="/ion.jpg"
          alt={`Portrait of ${profile.name}`}
          width={192}
          height={192}
          priority
          className="size-24 rounded-2xl object-cover"
        />
        <h1 className="sr-only">
          {profile.name} — {profile.title}
        </h1>
        <p className="mt-10 text-[17px] leading-relaxed text-muted text-balance">
          <span className="font-medium text-foreground">{profile.title}</span> — {profile.intro}
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-6 text-[15px] font-medium underline decoration-1 underline-offset-4 hover:decoration-2"
        >
          {profile.email}
        </a>

        <ul className="mt-16 grid w-full grid-cols-3 gap-y-10 text-[17px] font-semibold tracking-tight text-neutral-800 sm:text-xl">
          {clients.map((client) => (
            <li key={client}>{client}</li>
          ))}
          <li className="self-center text-[13px] font-normal tracking-normal text-muted">and more</li>
        </ul>
      </section>

      {/* Case studies */}
      <section id="work" className="border-t border-line px-4 pt-20 pb-24 sm:px-6 sm:pt-24">
        <h2 className="text-center text-4xl font-medium tracking-tight sm:text-6xl">Case Studies</h2>
        <div className="mx-auto mt-12 max-w-6xl space-y-4 sm:mt-16 sm:space-y-6">
          {featured.map((study) => (
            <CaseStudyCard key={study.slug} study={study} size="large" />
          ))}
        </div>
        {more.length > 0 && (
          <div className="mx-auto mt-10 grid max-w-6xl gap-x-6 gap-y-10 sm:mt-12 sm:grid-cols-2">
            {more.map((study) => (
              <CaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="border-t border-line px-4 py-20 sm:px-6 sm:py-28">
        <h2 className="sr-only">Recommendations</h2>
        <ul className="mx-auto grid max-w-6xl gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name} className="flex flex-col items-center text-center">
              <span className="flex size-10 items-center justify-center rounded-full bg-subtle text-[13px] font-medium text-neutral-600">
                {initials(t.name)}
              </span>
              <blockquote className="mt-5 max-w-sm text-xl leading-snug tracking-tight text-balance">
                “{t.quote}”
              </blockquote>
              <p className="mt-4 text-[13px] text-muted">
                {"href" in t ? (
                  <a href={t.href} target="_blank" rel="noreferrer" className="hover:text-foreground">
                    {t.name}
                  </a>
                ) : (
                  t.name
                )}{" "}
                · {t.role}{" "}
                <span className="font-medium text-foreground">{t.company}</span>
              </p>
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
