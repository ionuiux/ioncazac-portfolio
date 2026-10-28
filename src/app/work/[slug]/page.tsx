import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyCard } from "@/components/case-study-card";
import { BrowserFrame } from "@/components/browser-frame";
import { Cover } from "@/components/cover";
import { PhoneFrame } from "@/components/phone-frame";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
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
    // Case studies share the site's image (a PNG every network can show),
    // with their own title and description.
    openGraph: {
      title: `${study.client} - ${study.title}`,
      description: study.summary,
      url: `/work/${study.slug}`,
      siteName: "Ion Cazac",
      type: "article",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Ion Cazac - Senior Product Designer · AI-Native Product Builder" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.client} - ${study.title}`,
      description: study.summary,
      images: ["/opengraph-image"],
    },
  };
}

function CaseFigure({ image, accent }: { image: CaseImage; accent: string }) {
  const panel = { background: `linear-gradient(160deg, ${accent}24, ${accent}0f)` };
  const half = !image.wide;
  const sizes = half ? "(min-width: 640px) 50vw, 100vw" : "100vw";

  let content;
  if (image.frame === "phones" && image.screens?.length) {
    // Phone width depends on how many sit side by side and how wide the panel is.
    const count = Math.min(image.screens.length, 3);
    const width = half
      ? ["w-[46%]", "w-[40%]", "w-[30%]"][count - 1]
      : ["w-[46%] sm:w-[26%]", "w-[40%] sm:w-[24%]", "w-[30%] sm:w-[22%]"][count - 1];
    content = (
      <div className="flex flex-1 items-start justify-center gap-[4%] overflow-hidden px-[4%] pt-[8%] pb-[6%]" style={panel}>
        {image.screens.slice(0, 3).map((screen, i) => (
          <PhoneFrame
            key={screen.src}
            screen={screen}
            sizes={half ? "(min-width: 640px) 20vw, 45vw" : "(min-width: 640px) 25vw, 45vw"}
            className={`${width} shrink-0 ${count === 3 && i !== 1 ? "mt-[5%]" : ""}`}
          />
        ))}
      </div>
    );
  } else if (!image.src) {
    content = (
      <div className="relative flex aspect-[16/10] items-center justify-center bg-subtle text-[13px] text-muted">
        Image placeholder - {image.alt}
      </div>
    );
  } else if (image.frame === "browser" && image.width && image.height) {
    content = (
      <div className="flex-1 p-[6%] sm:p-[5%]" style={panel}>
        <BrowserFrame src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} />
      </div>
    );
  } else if (image.frame === "card" && image.width && image.height) {
    // Half-width panels size the card to fit both their width and height;
    // a zoom above 1 enlarges it and lets it run off the right edge.
    const zoom = image.zoom ?? 1;
    const ratio = image.width / image.height;
    const cardWidth = !half ? "100%" : zoom > 1 ? `${84 * zoom}cqw` : `min(84cqw, ${80 * ratio}cqh)`;
    content = (
      <div
        className={`flex flex-1 items-center overflow-hidden ${half ? "aspect-[4/3] sm:aspect-auto sm:min-h-[22rem]" : "p-[6%] sm:p-[5%]"}`}
        style={half ? { ...panel, containerType: "size" } : panel}
      >
        <div
          className="shrink-0 overflow-hidden shadow-[0_24px_48px_-20px_rgba(17,17,50,0.4)] ring-1 ring-black/5"
          style={{ width: cardWidth, marginLeft: zoom > 1 ? "8%" : "auto", marginRight: zoom > 1 ? 0 : "auto" }}
        >
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} className="block h-auto w-full" />
        </div>
      </div>
    );
  } else if (image.frame === "float" && image.width && image.height) {
    content = (
      <div className="flex flex-1 items-center justify-center p-[5%]" style={panel}>
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} className="block h-auto w-full" />
      </div>
    );
  } else if (image.frame === "plain" && image.width && image.height) {
    content = (
      <div className="flex flex-1 items-start overflow-hidden ring-1 ring-black/5">
        <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} className="block h-auto w-full" />
      </div>
    );
  } else {
    content = (
      <div className="relative aspect-[16/10] overflow-hidden bg-subtle">
        <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  return (
    <figure className={`flex flex-col ${image.wide ? "sm:col-span-2" : ""}`}>
      {content}
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

      <header className="mx-auto max-w-3xl pt-12 text-center sm:pt-20">
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

      {study.results && (
        <dl className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-3">
          {study.results.map((result) => (
            <div key={result.label} className="flex flex-col-reverse justify-end bg-subtle p-6">
              <dt className="mt-2 text-[13px] text-muted">{result.label}</dt>
              <dd className="text-4xl font-medium tracking-tight">{result.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-14">
        <div className="relative aspect-[4/3] overflow-hidden bg-subtle sm:aspect-[16/9]">
          <Cover study={study} sizes="100vw" priority />
        </div>
      </div>

      <article className="pt-8 pb-16">
        {study.overview && (
          <dl className="mx-auto mt-16 grid max-w-4xl gap-6 bg-subtle p-6 sm:mt-24 sm:grid-cols-3 sm:gap-8 sm:p-8">
            {[
              { label: "The problem", text: study.overview.problem },
              { label: "Key insight", text: study.overview.insight },
              { label: "The impact", text: study.overview.impact },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-[13px] text-muted">{item.label}</dt>
                <dd className="mt-2 text-[16px] leading-relaxed">{item.text}</dd>
              </div>
            ))}
          </dl>
        )}

        {study.sections.map((section) => (
          <section key={section.heading} className="mt-16 sm:mt-24">
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
                  <div key={metric.label} className="flex flex-col-reverse justify-end bg-subtle p-6">
                    <dt className="mt-2 text-[13px] text-muted">{metric.label}</dt>
                    <dd className="text-4xl font-medium tracking-tight">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {section.insights && (
              <ol className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
                {section.insights.map((insight, i) => (
                  <li key={insight.title} className="bg-subtle p-6">
                    <p className="text-[13px] text-muted tabular-nums">Insight {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 text-[17px] font-medium">{insight.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{insight.body}</p>
                  </li>
                ))}
              </ol>
            )}

            {section.decisions && (
              <ol className="mx-auto mt-10 max-w-4xl divide-y divide-line border-y border-line">
                {section.decisions.map((decision, i) => (
                  <li key={decision.problem} className="grid gap-3 py-6 md:grid-cols-[200px_1fr_1fr] md:gap-12">
                    <p className="text-[13px] text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                    <div>
                      <p className="text-[13px] text-muted">Problem</p>
                      <p className="mt-1 text-[16px] leading-relaxed">{decision.problem}</p>
                    </div>
                    <div>
                      <p className="text-[13px] text-muted">What I did</p>
                      <p className="mt-1 text-[16px] leading-relaxed text-neutral-600">{decision.solution}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}

            {section.images && (
              <div className={`mt-10 grid gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 ${section.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {section.images.map((image, i) => (
                  <CaseFigure key={i} image={image} accent={study.accent[1]} />
                ))}
              </div>
            )}
          </section>
        ))}
      </article>

      {next.slug !== study.slug && (
        <section className="border-t border-line pt-16 pb-24">
          <p className="text-center text-[13px] text-muted">Next case study</p>
          <div className="mt-6">
            <CaseStudyCard study={next} size="large" />
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}
