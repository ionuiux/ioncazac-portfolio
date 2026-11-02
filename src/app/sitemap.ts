import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { profile } from "@/content/profile";

const SITE = "https://ioncazac.com";

// Every page of the site, served at ioncazac.com/sitemap.xml so search engines
// and AI tools can find them all. Case studies are added automatically.
// (No last-modified dates: a date here would be the time of each visit, not of
// the last real change, and crawlers learn to ignore dates that are always new.)
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((study) => ({
      url: `${SITE}/work/${study.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE}/cv`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}${profile.cv}`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
