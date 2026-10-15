// Your case studies. Each one becomes a page at ioncazac.com/work/<slug>.
// The order here is the order on the homepage; the first two are shown large.
//
// Images go in the /public/work/<slug>/ folder and are referenced like
// "/work/digma/cover.jpg". Leave `src` out and a grey placeholder is shown.

export type CaseImage = {
  src?: string;
  alt: string;
  caption?: string;
};

export type CaseSection = {
  heading: string;
  body: string[];
  images?: CaseImage[];
  metrics?: { value: string; label: string }[];
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  role: string;
  timeline: string;
  team: string;
  platform: string;
  // Two colours used for the placeholder cover until a real `cover` image is added.
  accent: [string, string];
  cover?: string;
  sections: CaseSection[];
};

// Temporary text so the layout can be reviewed before real content arrives.
const draftSections: CaseSection[] = [
  {
    heading: "The challenge",
    body: [
      "Draft — what was broken, for whom, and why it mattered to the business. One or two short paragraphs is plenty.",
      "Add any constraints that shaped the work: deadlines, legacy systems, regulations or team size.",
    ],
  },
  {
    heading: "Research",
    body: [
      "Draft — how you learned about the problem: interviews, analytics, competitor reviews, support tickets. End with the one or two insights that changed the direction.",
    ],
    images: [{ alt: "Research artefact", caption: "Journey map, affinity board or key insight" }],
  },
  {
    heading: "Design process",
    body: [
      "Draft — the main options you explored and why you chose one. Show the messy middle: flows, wireframes, rejected ideas.",
    ],
    images: [
      { alt: "Early wireframes", caption: "Wireframes" },
      { alt: "User flow", caption: "User flow" },
    ],
  },
  {
    heading: "The solution",
    body: [
      "Draft — the final design and the details that make it work. Lead with the screens; keep the text short.",
    ],
    images: [{ alt: "Final design", caption: "Final screens" }],
  },
  {
    heading: "Results",
    body: ["Draft — what changed after launch, and what you learned."],
    metrics: [
      { value: "00%", label: "Metric one" },
      { value: "00%", label: "Metric two" },
      { value: "0×", label: "Metric three" },
    ],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "digma",
    client: "Digma",
    title: "Making code observability approachable for developers",
    category: "Developer tools · Design system",
    year: "2024",
    summary:
      "Draft summary — one or two sentences on the product, the problem and the outcome.",
    role: "Senior Product Designer",
    timeline: "Feb 2024 – Apr 2025",
    team: "PM, 6 engineers",
    platform: "IDE plugin, Web",
    accent: ["#1e1b4b", "#6366f1"],
    sections: draftSections,
  },
  {
    slug: "profit",
    client: "Profit.com",
    title: "Redesigning a financial markets platform",
    category: "Fintech · Web & mobile",
    year: "2022",
    summary:
      "Draft summary — one or two sentences on the product, the problem and the outcome.",
    role: "Senior Product Designer",
    timeline: "Mar 2022 – Feb 2024",
    team: "Product, engineering",
    platform: "Web, iOS, Android",
    accent: ["#052e16", "#16a34a"],
    sections: draftSections,
  },
  {
    slug: "orb",
    client: "ORB Innovations",
    title: "Turning complex sports data into a simple app",
    category: "Sports tech · Mobile",
    year: "2023",
    summary:
      "Draft summary — one or two sentences on the product, the problem and the outcome.",
    role: "Senior Product Designer",
    timeline: "Jun – Dec 2023",
    team: "Founders, engineering",
    platform: "iOS, Android",
    accent: ["#431407", "#f97316"],
    sections: draftSections,
  },
  {
    slug: "sharevision",
    client: "ShareVision",
    title: "Designing a design system from the ground up",
    category: "SaaS · Design system",
    year: "2021",
    summary:
      "Draft summary — one or two sentences on the product, the problem and the outcome.",
    role: "Product Designer",
    timeline: "Apr 2021 – Mar 2022",
    team: "Product, engineering",
    platform: "Web",
    accent: ["#082f49", "#0ea5e9"],
    sections: draftSections,
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
