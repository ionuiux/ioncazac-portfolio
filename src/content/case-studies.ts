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
function draftSections(
  metrics: CaseSection["metrics"] = [
    { value: "00%", label: "Metric one" },
    { value: "00%", label: "Metric two" },
    { value: "0×", label: "Metric three" },
  ],
): CaseSection[] {
  return [
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
      metrics,
    },
  ];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "flovi",
    client: "Flovi",
    title: "Designing an AI-native driver app for four markets",
    category: "Mobility · AI · Design system",
    year: "2025",
    summary:
      "Leading end-to-end design of Flovi’s AI-native driver app and a shadcn-based design system, and unifying customer portals across four markets.",
    role: "Senior Product Designer",
    timeline: "Apr 2025 – Oct 2026",
    team: "Product, engineering, 4 markets",
    platform: "iOS, Android, Web",
    accent: ["#042f2e", "#14b8a6"],
    sections: draftSections([
      { value: "30%", label: "Better UI and UX experience" },
      { value: "+20%", label: "Increase in sales" },
      { value: "4", label: "Markets on one design system" },
    ]),
  },
  {
    slug: "digma",
    client: "Digma",
    title: "Making code observability approachable for developers",
    category: "Developer tools · Data visualisation",
    year: "2024",
    summary:
      "Digma finds performance issues at the code level before they reach production. I designed the dashboards, flows and design system that make those insights clear to developers and managers.",
    role: "Senior Product Designer",
    timeline: "Feb 2024 – Apr 2025",
    team: "Product, engineering",
    platform: "IDE plugin, Web",
    accent: ["#1e1b4b", "#6366f1"],
    sections: draftSections(),
  },
  {
    slug: "orb",
    client: "ORB Innovations",
    title: "Turning smart mouthguard data into insights athletes can use",
    category: "Wearables · IoT · Mobile",
    year: "2023",
    summary:
      "ORB’s smart mouthguard tracks 20+ performance metrics. As ORB’s first UX designer, I shaped the app that turns that data into something athletes can act on.",
    role: "Senior Product Designer",
    timeline: "Jun – Dec 2023",
    team: "Founders, engineering, data science",
    platform: "Mobile app",
    accent: ["#431407", "#f97316"],
    sections: draftSections(),
  },
  {
    slug: "profit",
    client: "Profit.com",
    title: "Redesigning an all-in-one platform for the financial markets",
    category: "Fintech · Web & mobile",
    year: "2022",
    summary:
      "Profit.com helps people analyse the markets, automate trading strategies and talk with other investors. I designed its flows, prototypes and design system across web and mobile.",
    role: "Senior Product Designer",
    timeline: "Mar 2022 – Feb 2024",
    team: "Product, engineering, marketing",
    platform: "Web, mobile",
    accent: ["#052e16", "#16a34a"],
    sections: draftSections(),
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
