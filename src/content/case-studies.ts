// Your case studies. Each one becomes a page at ioncazac.com/work/<slug>.
// The order here is the order on the homepage; the first two are shown large.
//
// Images go in the /public/work/<slug>/ folder and are referenced like
// "/work/digma/cover.jpg". Leave `src` out and a grey placeholder is shown.

export type CaseImage = {
  src?: string;
  alt: string;
  caption?: string;
  // Pixel size of the image file, needed for framed images.
  width?: number;
  height?: number;
  // "browser" shows a full screen in a browser window,
  // "card" shows a cropped detail floating on a tinted panel.
  frame?: "browser" | "card";
  // Card only: values above 1 enlarge the detail and let it run off the right edge.
  zoom?: number;
  // Take the full width instead of half when a section has several images.
  wide?: boolean;
};

export type Screen = {
  src: string;
  alt: string;
  width: number;
  height: number;
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
  // Two colours for the cover background and the tinted image panels.
  accent: [string, string];
  // Either a single cover image, or up to three screens arranged as a mockup.
  cover?: string;
  mockup?: { main: Screen; left?: Screen; right?: Screen };
  sections: CaseSection[];
};

const flovi = {
  dashboard: { src: "/work/flovi/dashboard.webp", alt: "Flovi customer portal home with live map and reservations", width: 2000, height: 1858 },
  offices: { src: "/work/flovi/offices.webp", alt: "Flovi offices page with map and office list", width: 2000, height: 1796 },
  team: { src: "/work/flovi/team.webp", alt: "Flovi team members page with roles and status", width: 2000, height: 1230 },
  invoices: { src: "/work/flovi/invoices.webp", alt: "Flovi invoices page with current billing cycle", width: 2000, height: 1758 },
} satisfies Record<string, Screen>;

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
    title: "Unifying Flovi’s customer portal across four markets",
    category: "Mobility · B2B SaaS · Design system",
    year: "2025",
    summary:
      "I redesigned Flovi’s customer portal and unified it across four markets. The result: 30% more customers, and reservations that take about 20 seconds to book — 20% faster than before.",
    role: "Senior Product Designer",
    timeline: "Apr 2025 – Oct 2026",
    team: "Product, engineering, 4 markets",
    platform: "Web app",
    accent: ["#1b1a4b", "#5153c0"],
    mockup: { main: flovi.dashboard, left: flovi.offices, right: flovi.invoices },
    sections: [
      {
        heading: "The challenge",
        body: [
          "Flovi moves cars for rental and fleet companies: a professional driver picks a car up in one place and delivers it to another. Customers book and follow those transfers in the Flovi customer portal.",
          "As Flovi grew market by market, the portal grew with it. Each market ended up with its own version — different layouts, different words for the same things, and features that existed in one country but not in the next. Booking a transfer, the task customers do most, took longer than it should. And every new feature had to be designed and built more than once.",
        ],
      },
      {
        heading: "My role",
        body: [
          "I led design for the customer portal end to end: auditing the existing portals, defining one structure for every market, building a shadcn-based design system together with engineering, and designing the core flows. I also brought AI tools into our workflow so we could explore and prototype ideas much faster.",
        ],
      },
      {
        heading: "One portal, one system",
        body: [
          "Instead of patching each market, we rebuilt the portal on one foundation. The design system gives every market the same tokens, components and patterns, so local differences — currency, VAT, office rules — live in the content, not in custom screens.",
          "The navigation became five clear areas: Home, Offices, Team members, Invoices and Settings, with “New reservation” always one click away.",
        ],
        images: [
          { ...flovi.offices, frame: "browser", caption: "Offices — every location on one map, with opening hours, managers and live status." },
          { ...flovi.team, frame: "browser", caption: "Team members — roles and office access managed in one place." },
        ],
      },
      {
        heading: "Everything on the move, at a glance",
        body: [
          "Home answers the question customers ask most: where is my car right now? A live map shows every active transfer. Status filters show how many cars are requested, assigned, on the road or delivered, and each reservation shows its route, timing and price in a single row.",
          "Selecting a car opens the driver, the vehicle, the route and a live ETA — so customers can follow a transfer without calling anyone for an update.",
        ],
        images: [
          { ...flovi.dashboard, frame: "browser", wide: true, caption: "Home — live map, status filters and the latest reservations." },
          { src: "/work/flovi/tracking.webp", alt: "Live driver card with route progress and ETA", width: 468, height: 476, frame: "card", caption: "Live driver card with route progress and ETA." },
          { src: "/work/flovi/office-card.webp", alt: "Office card on the map with today’s hours and manager", width: 540, height: 350, frame: "card", caption: "Office cards show today’s hours and who’s in charge." },
        ],
      },
      {
        heading: "Booking in about 20 seconds",
        body: [
          "Booking a transfer is the task customers repeat most, so every second counts. The new reservation form asks one thing at a time, fills in what it can on its own — like pickup and drop-off windows based on office hours — and keeps a live summary of the booking next to the form.",
          "The average time to complete a reservation dropped by 20%, to about 20 seconds.",
        ],
      },
      {
        heading: "Billing without surprises",
        body: [
          "Finance teams can see the current billing cycle at any time: trips so far, the amount accrued and an estimated total. Every trip in the cycle is listed, and earlier invoices are one click away.",
        ],
        images: [
          { src: "/work/flovi/billing-cycle.webp", alt: "Current billing cycle summary", width: 1585, height: 284, frame: "card", wide: true, caption: "The current cycle, always visible." },
          { ...flovi.invoices, frame: "browser", wide: true, caption: "Invoices — trips in this cycle and previous invoices." },
        ],
      },
      {
        heading: "Results",
        body: [
          "One portal gave every market the same, faster experience — and gave the team one product to improve instead of four.",
        ],
        metrics: [
          { value: "+30%", label: "More customers" },
          { value: "~20 s", label: "To book a reservation — 20% faster" },
          { value: "4", label: "Markets on one portal" },
        ],
      },
      {
        heading: "What I learned",
        body: [
          "Most of the work wasn’t in the screens. It was getting four markets to agree on one way of doing things — the same words, the same steps, and a clear line between the local differences that matter and the ones that don’t.",
        ],
      },
    ],
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
    accent: ["#0b1a33", "#3b82f6"],
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
