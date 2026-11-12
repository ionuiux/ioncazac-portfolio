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
  // "card" shows a cropped detail floating on a tinted panel,
  // "plain" shows a finished mockup as it is, uncropped,
  // "float" shows a transparent mockup directly on a tinted panel,
  // "phones" shows the `screens` side by side in iPhone frames.
  frame?: "browser" | "card" | "plain" | "float" | "phones";
  screens?: Screen[];
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
  // Research findings, shown as numbered cards. A `label` replaces the number.
  insights?: { title: string; body: string; label?: string }[];
  // Problem-solving: each problem paired with what was done about it.
  decisions?: { problem: string; solution: string }[];
};

// A picture in a story block. Leave `src` out and the page shows a placeholder
// saying what should go there (`alt`) and the size it should be (`ask`).
export type StoryImage = {
  src?: string;
  alt: string;
  ask?: string;
  // "screen": a full screen (shown in a browser window where it fits);
  // "card": a cropped detail, shown whole on a tinted panel;
  // "photo": a photo that fills its box edge to edge;
  // "illustration": shown whole on the tinted panel, without a shadow.
  kind?: "screen" | "card" | "photo" | "illustration";
  // Photos only: which part stays visible when cropped, e.g. "52% 50%".
  position?: string;
};

// The bold, scroll-animated case study layout (src/components/story/). A case
// study with a `story` uses it instead of the `sections` layout. Text wrapped
// in *stars* is shown in the accent colour.
export type StoryBlock =
  // A giant logo (or word) that the page zooms into, through a hole in it:
  // `hole` is a point inside the hole, in the logo's own units (its viewBox), or
  // for a word, `through` is the place of the letter to fly through.
  | {
      type: "hero";
      line: string;
      logo?: {
        src: string;
        width: number;
        height: number;
        hole: [number, number];
        // An animation of the logo being drawn, played once before the zoom.
        // Its frame's place and size are in the logo's units; its last frame
        // must match the logo exactly, as the logo takes over when it ends.
        intro?: { src: string; x: number; y: number; width: number; height: number; duration: number };
      };
      word?: string;
      through?: number;
    }
  // The title, summary, role and project facts.
  | { type: "intro"; role: string[] }
  // A flow shown step by step in one pinned browser window (or phone), with a
  // timer counting to `seconds`; without it, a step count ("02 / 03").
  // `sticker` sits by the heading; `done` pops onto the window at the last step.
  | {
      type: "flow";
      label: string;
      heading: string;
      seconds?: number;
      steps: { title: string; text: string; image: StoryImage }[];
      sticker?: string;
      done?: string;
      device?: "browser" | "phone";
    }
  // A two-line headline over one wide photo, two photos, or three (one big, two small).
  | { type: "photos"; heading: string; accent: string; images: StoryImage[]; sticker?: string }
  // A big statement that lights up word by word as it scrolls past.
  | { type: "statement"; label: string; text: string }
  // Three or four "before" screens that slide together into one "after" screen.
  | { type: "merge"; label: string; heading: [string, string]; text: string; before: StoryImage[]; after: StoryImage }
  // Numbered findings in a grid.
  | { type: "findings"; label: string; heading: string; text: string; items: { title: string; text: string }[] }
  // Cards in a row that scrolls sideways. Cards without an image get a
  // brand-colour panel with their number and label instead.
  | { type: "carousel"; label: string; heading: string; text: string; items: { label: string; title: string; text: string; image?: StoryImage }[] }
  // Each problem, what was done about it and a picture of the result.
  | { type: "fixes"; label: string; heading: string; items: { problem: string; solution: string; image: StoryImage }[] }
  // Screens of the product behind tabs (in a browser window when they are
  // `screen`s, or in a phone with `device: "phone"`).
  | {
      type: "tabs";
      label: string;
      heading: string;
      items: { label: string; text: string; image: StoryImage }[];
      device?: "browser" | "phone";
    }
  // Big numbers that count up, on a dark panel.
  | { type: "results"; label: string; numbers: { value: string; label: string }[]; text: string; images?: StoryImage[]; sticker?: string }
  // `image` is a big photo beside the quote; `photo` a small round one by the name.
  | { type: "quote"; quote: string; name: string; role: string; photo?: string; image?: StoryImage; link?: string; placeholder?: boolean }
  | { type: "gallery"; label: string; heading: string; images: StoryImage[]; columns?: 2 | 3 }
  | { type: "text"; label: string; heading: string; body: string[] };

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  // The story in three lines, shown at the top of the case study.
  overview?: { problem: string; insight: string; impact: string };
  // Three headline numbers, shown as a strip right under the title.
  results?: { value: string; label: string }[];
  role: string;
  timeline: string;
  team: string;
  platform: string;
  // Two colours for the cover background and the tinted image panels.
  accent: [string, string];
  // Story layout only: a third brand colour for the big numbers on the dark panel.
  highlight?: string;
  // Either a single cover image, or up to three screens arranged as a mockup.
  cover?: string;
  // Which part of the cover image stays visible when it is cropped, e.g. "65% center".
  coverPosition?: string;
  // For a cover wider than its frame: show its full width, centred vertically,
  // and fade its bottom edge into `background` (the image's own background
  // colour) instead of cropping the sides. Needs the image's size.
  coverFullWidth?: { width: number; height: number; background: string };
  mockup?: { main: Screen; left?: Screen; right?: Screen; device?: "browser" | "phone" };
  sections?: CaseSection[];
  story?: StoryBlock[];
  // Story layout only: a small, faint note at the very end (ownership, use).
  disclaimer?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "flovi",
    client: "Flovi",
    title: "One customer portal for One Flovi company",
    category: "Mobility · B2B SaaS · AI-assisted design",
    year: "2025",
    summary:
      "I redesigned Flovi’s customer portal and brought four markets onto one version of it. AI was part of every step: reading usage data, running interviews, building prototypes and testing them. Flovi got 30% more customers, and booking a transfer now takes about 20 seconds, 20% faster than before.",
    role: "AI-Native Product Designer",
    timeline: "Apr 2025 – Oct 2026",
    team: "Product, engineering, 4 markets",
    platform: "Web app",
    // Flovi's brand colours: Midnight, Sky and Mint (brand guidelines v1.0).
    accent: ["#1d1a58", "#3f39b9"],
    highlight: "#37db88",
    cover: "/work/flovi/cover.jpg",
    coverPosition: "60% 0%",
    disclaimer:
      "All numbers, screenshots and brand materials in this case study are the property of Flovi (flovi.io). This case study is for demonstration only, and all trademarks used belong to Flovi.",
    // The bold scroll-animated layout. Every `src`-less image is a placeholder
    // that says what should go there.
    story: [
      {
        type: "hero",
        // The zoom flies through the middle of the "o" in the Flovi logo.
        logo: {
          src: "/work/flovi/logo.svg",
          width: 443.38,
          height: 156.66,
          // The middle of the "o"'s hole.
          hole: [216.02, 95.47],
          // Flovi's own logo animation, cropped from 1920×1080. Measured on its
          // last frame (the logo's straight edges, to a tenth of a pixel): 1.8818 px
          // per logo unit across and 1.8077 down, as the animation draws the logo
          // about 4% wider. Fitted this way (then nudged a quarter pixel after
          // comparing both in the browser), its last frame covers the logo exactly.
          intro: { src: "/work/flovi/logo-intro.gif", x: -12.0, y: -12.34, width: 463.38, height: 305.35, duration: 2280 },
        },
        line: "One customer portal for One Flovi company",
      },
      {
        type: "intro",
        role: [
          "I led the design of the customer portal and made AI part of how we worked, from research to release. I used it to analyse usage data and metrics, run and summarise customer interviews, build prototypes in code and test them.",
          "Besides designing the process itself, with user research, interviews, testing and design reviews, I audited the old portals, defined one structure for all markets and designed the main flows.",
          "I also delivered the design system as a code repository, built on shadcn, that the engineers build from, and merged design decisions into production myself.",
        ],
      },
      {
        type: "flow",
        label: "The outcome",
        heading: "Book a transfer in *20 seconds.*",
        seconds: 20,
        sticker: "/work/flovi/signs/lets-go.svg",
        done: "/work/flovi/signs/all-set.svg",
        steps: [
          {
            title: "Pick the route",
            text: "Choose where the car starts and where it goes. Offices, with their addresses and opening hours, are already in Flovi, so nobody types them.",
            image: { src: "/work/flovi/office-card.webp", alt: "Office card with today’s opening hours and the office manager", kind: "card" },
          },
          {
            title: "Set the time",
            text: "Pickup and drop-off times are filled in from office hours. Change them only when you need to.",
            image: { src: "/work/flovi/schedule.png", alt: "Schedule: delivery date and time slots, with when the car should depart", kind: "card" },
          },
          {
            title: "Add the details",
            text: "The car, the contact person and the cost center, one question at a time. Details that past bookings already tell us are filled in for you.",
            image: { src: "/work/flovi/reservation-details.png", alt: "Reservation details: who created it, when, the type, cost center and gig ID", kind: "card" },
          },
          {
            title: "Check and book",
            text: "A live summary next to the form shows the route, time and price before you book. One click, and it’s booked.",
            image: { src: "/work/flovi/booked.webp", alt: "Flovi illustration of a booking confirmed: “Kiitos, varaus onnistui” (Thanks, your booking is confirmed)", kind: "illustration" },
          },
          {
            title: "Follow it live",
            text: "The transfer shows up on the live map right away, with its status, route and price.",
            image: { src: "/work/flovi/dashboard.webp", alt: "Flovi home with the live map, status filters and latest reservations", kind: "screen" },
          },
        ],
      },
      {
        type: "photos",
        heading: "Flovi moves cars.",
        accent: "Customers book every move in one portal.",
        sticker: "/work/flovi/signs/ride-along.svg",
        images: [
          { src: "/work/flovi/driver.jpg", alt: "A Flovi driver in a Flovi jacket and hat at the open door of a car", kind: "photo" },
          { src: "/work/flovi/cover.jpg", alt: "A Flovi driver showing the app on his phone", kind: "photo" },
          { src: "/work/flovi/handover.jpg", alt: "A Flovi driver opening the door of a car at the airport", kind: "photo", position: "30% 50%" },
        ],
      },
      {
        type: "statement",
        label: "The problem",
        text: "Each of Flovi’s four markets had *its own portal.* Booking was *slow,* every feature was *built four times,* and nobody had a clear picture of how customers really used it.",
      },
      {
        type: "merge",
        label: "The fix",
        heading: ["Four portals.", "One product."],
        text: "Instead of fixing each market separately, we rebuilt the portal on one base. Every market uses the same components and patterns, and local details like currency, VAT and office rules come from the content, not from custom screens.",
        before: [
          { src: "/work/flovi/old-reservations.webp", alt: "Old portal: the reservations list, with status tabs and a paged table", kind: "screen" },
          { src: "/work/flovi/old-new-reservation.webp", alt: "Old portal: the New Reservation form, with location, schedule, contact and cost estimate", kind: "screen" },
          { src: "/work/flovi/old-pipeline.webp", alt: "Old portal: a reservation’s pipeline in a side panel", kind: "screen" },
        ],
        after: { src: "/work/flovi/dashboard.webp", alt: "The new Flovi portal home, the same in every market", kind: "screen" },
      },
      {
        type: "findings",
        label: "Research",
        heading: "What the data showed.",
        text: "Before designing anything, I put all four portals side by side and mapped every step of booking in each one. Then I used AI to go through everything else: the usage data, the questions customers asked support and operations, the interview notes, and how finance teams handled invoices at the end of each billing cycle. AI found the patterns, and I checked them with the teams on the ground.",
        items: [
          {
            title: "Four portals, one job",
            text: "AI compared usage in all four markets and found the same few tasks, in the same order, everywhere. Only a few differences really mattered: currency, VAT, office rules and opening hours.",
          },
          {
            title: "Customers typed what we already knew",
            text: "Analysing past bookings showed that most fields were filled in with the same details every time, like office addresses and opening hours. Flovi already had all of it.",
          },
          {
            title: "“Where is my car?”",
            text: "When AI grouped the support questions by topic, the biggest group was people asking where their transfer was. We had that information, the portal just didn’t show it.",
          },
          {
            title: "Finance didn’t like surprises",
            text: "Usage data and interviews showed that finance teams only looked at costs when the invoice arrived. They wanted to see the total grow during the cycle so they could plan for it.",
          },
        ],
      },
      {
        type: "carousel",
        label: "Process",
        heading: "AI at *every step.*",
        text: "I used AI as a research and prototyping partner at every stage. It did the heavy reading and building, so I could spend my time on the decisions. I checked everything it found against the raw data and with the people in each market before we acted on it.",
        items: [
          {
            label: "Analytics",
            title: "Finding usage patterns",
            text: "I gave Claude anonymised booking and usage data from all four markets and asked it to find patterns: when customers book, which routes repeat, which pages they open first and what they check before calling support.",
          },
          {
            label: "Metrics",
            title: "One set of numbers for every market",
            text: "AI helped me define and track the metrics that mattered: time to book, completed bookings, “where is my car?” questions and how often finance teams checked costs. All four markets were measured the same way.",
          },
          {
            label: "Interviews",
            title: "Interviews in every market",
            text: "I interviewed customers and operations teams in each market. AI transcribed the calls, translated the ones in local languages and pulled out the themes that came up across all of them.",
          },
          {
            label: "Testing",
            title: "Real prototypes, tested fast",
            text: "I built working prototypes in code with Codex, Claude Code and our shadcn components, so customers tested something that felt real. AI summarised every session and tagged each problem by flow and market.",
          },
          {
            label: "Delivery",
            title: "From design to production",
            text: "I delivered the design system as a code repository and merged design decisions into production myself, with the help of Codex and Claude Code. What customers tested is what they got.",
          },
        ],
      },
      {
        type: "fixes",
        label: "Problem solving",
        heading: "Five problems. *Five fixes.*",
        items: [
          {
            problem: "Four versions of the portal, and every feature built four times.",
            solution: "One portal on a shared design system, which I delivered as a code repository the engineers build from. Market differences live in content and settings, so we design and build things once.",
            image: { src: "/work/flovi/offices.webp", alt: "Offices: every location on one map, with its own opening hours, manager and status", kind: "screen" },
          },
          {
            problem: "Lots of usage data, but no clear way to show customers their own usage.",
            solution: "With the help of AI, I explored and tested many ways of showing usage, from charts to tables to maps. The clearest one became the home page: a live map with status counts and the latest reservations.",
            image: { src: "/work/flovi/reservations.png", alt: "Reservations with status counts: waiting for departure, on the move, completed", kind: "card" },
          },
          {
            problem: "Booking a transfer took too long.",
            solution: "A form that asks one thing at a time, fills in what past bookings already tell us, like pickup and drop-off times from office hours, and shows a live summary next to it.",
            image: { src: "/work/flovi/schedule.png", alt: "Pickup and delivery times filled in, with a summary of when the car departs and arrives", kind: "card" },
          },
          {
            problem: "Customers called to ask where their car was.",
            solution: "A live map on the home page with status filters, and a driver card that shows the route and when the car will arrive.",
            image: { src: "/work/flovi/tracking.webp", alt: "Live driver card with route progress and arrival time", kind: "card" },
          },
          {
            problem: "Costs were a surprise at the end of every cycle.",
            solution: "The current billing cycle, with trips so far and an estimated total, is always one click away.",
            image: { src: "/work/flovi/billing-cycle.webp", alt: "Current billing cycle summary with trips and estimated total", kind: "card" },
          },
        ],
      },
      {
        type: "tabs",
        label: "The product",
        heading: "Inside the portal.",
        items: [
          {
            label: "Home",
            text: "A live map shows every active transfer. Filters show how many cars are requested, assigned, on the road or delivered, and each reservation shows its route, time and price in one row.",
            image: { src: "/work/flovi/dashboard.webp", alt: "Home: live map, status filters and the latest reservations", kind: "screen" },
          },
          {
            label: "Team members",
            text: "Roles and office access for everyone on the customer’s team, in one place.",
            image: { src: "/work/flovi/team.webp", alt: "Team members page with roles and status", kind: "screen" },
          },
          {
            label: "Invoices",
            text: "Trips so far, the amount so far and an estimated total for the current cycle. Older invoices are one click away.",
            image: { src: "/work/flovi/invoices.webp", alt: "Invoices page with the current billing cycle", kind: "screen" },
          },
        ],
      },
      {
        type: "results",
        label: "Results",
        numbers: [
          { value: "+30%", label: "More customers" },
          { value: "~20 s", label: "To book a transfer" },
          { value: "20%", label: "Faster booking than before" },
          { value: "4 → 1", label: "Four markets, one portal" },
        ],
        text: "The portal works the same way in every market, and it’s faster. Customers follow every transfer live without picking up the phone, and a new feature is built once instead of four times.",
        sticker: "/work/flovi/signs/lets-roll.svg",
        images: [
          { src: "/artworks/full/flovi-dashboard.webp", alt: "The Flovi live fleet dashboard for four markets", kind: "photo" },
          { src: "/work/flovi/navigation.jpg", alt: "A Flovi driver following the route on his phone", kind: "photo" },
        ],
      },
      {
        // From Laura's LinkedIn recommendation (6 Nov 2026), word for word.
        type: "quote",
        quote:
          "The thing I enjoyed most was our sparring. We spent time figuring out what would actually work best in each situation, technically, design-wise and for the user, and Ion was always great to think things through with. … I’d happily recommend Ion to any team looking for a product designer who *thinks beyond the screen.*",
        name: "Laura Ruokolainen",
        role: "Key Account Manager, then Product Owner at Flovi",
        photo: "/people/laura-ruokolainen.jpg",
        image: { src: "/work/flovi/laura.jpg", alt: "Laura Ruokolainen in a Flovi coat and hat, by a car at Helsinki Airport", kind: "photo", position: "53% 50%" },
        link: "https://www.linkedin.com/in/ion-cazac/details/recommendations/",
      },
      {
        type: "text",
        label: "What I learned",
        heading: "AI reads the data. *People decide what matters.*",
        body: [
          "AI is great at reading a lot of data and building prototypes fast, but it doesn’t know which patterns matter. The value came from pairing it with real conversations with customers and the teams in each market, and checking every finding before we acted on it.",
          "The rest of the work wasn’t the screens. It was getting four markets to agree on one way of working: the same words, the same steps, and a clear idea of which local differences really matter.",
        ],
      },
    ],
  },
  {
    slug: "orb",
    client: "ORB Innovations",
    title: "Making smart mouthguard data useful for athletes",
    category: "Wearables · IoT · Mobile",
    year: "2023",
    summary:
      "ORB’s smart mouthguard records 20+ performance and wellness metrics in every session. As ORB’s first UX designer, I designed the app that turns them into three clear views, from pairing the mouthguard to live sessions, reports and history.",
    role: "Senior Product Designer",
    timeline: "Jun – Dec 2023",
    team: "Founders, engineering, data science",
    platform: "Mobile app",
    // ORB's app colours: its dark background and its aqua (too light for text on
    // white, so the accent is a deeper teal of the same hue, and the aqua is kept
    // for the big numbers on the dark panel).
    accent: ["#02202e", "#00818a"],
    highlight: "#00fcfb",
    cover: "/work/orb/hero.webp",
    coverPosition: "62% center",
    disclaimer:
      "All numbers, screenshots and brand materials in this case study are the property of ORB Innovations. This case study is for demonstration only, and all trademarks used belong to ORB Innovations.",
    story: [
      {
        type: "hero",
        // ORB's own logo (public/logos/orb.svg, recoloured to ORB's dark navy).
        // The zoom flies through the hole of the "O".
        logo: {
          src: "/work/orb/logo.svg",
          width: 304.442,
          height: 101,
          // The middle of the "O"'s hole (8.24 to 79.3 across, 8.39 to 52.55 down).
          hole: [43.77, 30.47],
        },
        line: "Making smart mouthguard data useful for athletes",
      },
      {
        type: "intro",
        role: [
          "I joined ORB as its first UX designer and designed the whole app: research and testing with athletes, flows and wireframes, prototypes, the visual design and the design system.",
          "I worked closely with the founders, developers and data scientists, so every screen matched what the hardware and algorithms could actually do. When they changed, I could adjust quickly.",
        ],
      },
      {
        type: "flow",
        label: "Getting started",
        heading: "From the box to *the first reading.*",
        device: "phone",
        steps: [
          {
            title: "Know what’s next",
            text: "Every mouthguard is made from an impression of the athlete’s teeth, so the app starts before it exists. Four cards explain what happens, from sending the impression to the first session.",
            image: { src: "/work/orb/next-steps-screen.webp", alt: "Next Steps: what happens after you send your impression, in four cards", kind: "screen" },
          },
          {
            title: "Pair the mouthguard",
            text: "When the mouthguard arrives, pairing happens on one simple screen that shows the progress.",
            image: { src: "/work/orb/connecting.webp", alt: "Connecting to the ORB mouthguard", kind: "screen" },
          },
          {
            title: "Take a reading",
            text: "Measurements come with short tips. For the best heart-rate reading, don’t talk, swallow or move your tongue.",
            image: { src: "/work/orb/measuring.webp", alt: "Measuring heart rate in beats per minute, with a tip for the best reading", kind: "screen" },
          },
        ],
      },
      {
        type: "photos",
        heading: "ORB makes a smart mouthguard.",
        accent: "The app turns what it records into answers.",
        images: [
          { src: "/work/orb/hero.webp", alt: "A boxer checks the ORB app, with the ORB mouthguard in the other hand", kind: "photo", position: "62% 50%" },
        ],
      },
      {
        type: "statement",
        label: "The problem",
        text: "The mouthguard records *20+ metrics* in every session. Athletes and coaches wanted *simple answers,* and the hardware was *still being built.*",
      },
      {
        type: "findings",
        label: "Research",
        heading: "What we learned.",
        text: "There was nothing quite like it to learn from, so I learned from people and from the device. I interviewed and tested with athletes, talked to coaches about how they review a session, and went through real session data and the device’s limits with the engineers and data scientists.",
        items: [
          {
            title: "Answers, not data",
            text: "Athletes didn’t want to read sensor charts. They wanted to know how hard they worked, how they moved and whether they took a hit.",
          },
          {
            title: "Context changes everything",
            text: "The same heart rate means something different in training, in a match, or with an injury that hasn’t healed. Numbers needed the story of the session around them.",
          },
          {
            title: "The connection will drop",
            text: "A mouthguard in a moving athlete’s mouth loses signal and battery. The app had to expect this, not treat it as an error.",
          },
          {
            title: "It starts before the first session",
            text: "Every mouthguard is made from an impression, so the first experience is waiting for it to arrive. People wanted to know what happens next.",
          },
        ],
      },
      {
        type: "carousel",
        label: "Process",
        heading: "Designing for hardware *still in the making.*",
        text: "The hardware and algorithms kept changing, so I worked closely with the founders, engineers and data scientists at every step, and tested the app with athletes along the way.",
        items: [
          {
            label: "Interviews",
            title: "Athletes and coaches",
            text: "I interviewed athletes and talked to coaches about how they review a session, to learn which answers they wanted from the data.",
          },
          {
            label: "Data",
            title: "Real sessions, real limits",
            text: "With the engineers and data scientists, I went through real session data and the device’s limits, so every screen matched what the mouthguard could really measure.",
          },
          {
            label: "Flows",
            title: "Failure first",
            text: "I mapped every flow, from impression kit to session report, and planned the reconnecting, low battery and no signal states early.",
          },
          {
            label: "Testing",
            title: "Prototypes with athletes",
            text: "I built prototypes of the main flows and tested them with athletes, then adjusted the screens whenever the hardware or algorithms changed.",
          },
          {
            label: "System",
            title: "A design system, early on",
            text: "Every component and state was documented, so the engineers could build quickly and the app stayed consistent while the product took shape.",
          },
        ],
      },
      {
        type: "fixes",
        label: "Problem solving",
        heading: "Five problems. *Five fixes.*",
        items: [
          {
            problem: "Thousands of data points in every session.",
            solution: "Three areas: heart rate, movement and impacts. Each one answers one question, and more detail is one tap away.",
            image: { src: "/work/orb/metrics-overview.webp", alt: "Heart rate, movement and impact screens on three phones", kind: "illustration" },
          },
          {
            problem: "Numbers without context meant nothing.",
            solution: "A short report after each session adds the sport, the session type, how hard it felt and notes. Every metric is shown next to the athlete’s history.",
            image: { src: "/work/orb/session-report.webp", alt: "Session report: name, time, sport, session type, how hard it felt and notes", kind: "card" },
          },
          {
            problem: "Signal and battery could drop mid-game.",
            solution: "Signal and battery are always on screen, and the app shows when it’s reconnecting instead of failing.",
            image: { src: "/work/orb/live-session.webp", alt: "A live session with signal and battery, and the same screen while it reconnects", kind: "card" },
          },
          {
            problem: "A session could be stopped by accident.",
            solution: "To end a session you press and hold, so one tap can’t stop it.",
            image: { src: "/work/orb/live-and-report.webp", alt: "A live session with the Hold to end session button, next to its session report", kind: "photo" },
          },
          {
            problem: "The hardware and algorithms kept changing.",
            solution: "A design system with every component and state documented, so screens could change fast and still stay consistent. Even toasts have their types, placement and motion specified.",
            image: { src: "/work/orb/toasts.webp", alt: "Toast specification: three types, placement and motion", kind: "card" },
          },
        ],
      },
      {
        type: "tabs",
        label: "The product",
        heading: "Three views of *every session.*",
        items: [
          {
            label: "Heart rate",
            text: "Your effort across the session, and how long you spent in each intensity zone. Each metric is shown with the session details and your history, never as a number on its own.",
            image: { src: "/work/orb/heart-rate.webp", alt: "Heart-rate overview with the session trace and time in each intensity zone", kind: "photo", position: "50% 30%" },
          },
          {
            label: "Movement",
            text: "Pace, motion, steps and distance, with a short explanation of what movement intensity means.",
            image: { src: "/work/orb/movement.webp", alt: "Movement overview with intensity and distance", kind: "photo", position: "50% 30%" },
          },
          {
            label: "Impacts",
            text: "Each hit, its g-force on each side and where it landed.",
            image: { src: "/work/orb/impacts.webp", alt: "Impacts with the average g-force per side and the impact region", kind: "photo", position: "50% 40%" },
          },
        ],
      },
      {
        type: "photos",
        heading: "Specified for every iPhone,",
        accent: "from SE to 15 Pro Max.",
        images: [
          { src: "/work/orb/responsive.webp", alt: "The Home screen laid out on iPhone SE, 8 Plus, X and 15 Pro Max, with margins from 12pt to 20pt", kind: "card" },
        ],
      },
      {
        type: "results",
        label: "Results",
        numbers: [
          { value: "20+", label: "Metrics recorded in every session" },
          { value: "3", label: "Clear views per session" },
          { value: "1st", label: "UX designer at ORB" },
        ],
        text: "Athletes go from impression kit to their first session, record reliably even in tough conditions, and review more than 20 metrics in three clear views. The app gave ORB a solid, consistent base to build on while the hardware was still changing.",
      },
      {
        type: "quote",
        quote:
          "Ion joined ORB as our first UX Designer and he knocked our design needs out of the park, even with the challenges of working with development IoT hardware. His work gave ORB *a great start and a strong direction.*",
        name: "Thomas Quinn",
        role: "CTO & Co-Founder, ORB Innovations",
        photo: "/people/thomas-quinn.jpg",
        link: "https://www.linkedin.com/in/ion-cazac/details/recommendations/",
      },
      {
        type: "text",
        label: "What I learned",
        heading: "Design for *failure first.*",
        body: [
          "When the hardware is still in development, design for failure first. Planning the reconnecting, low battery and no signal states early made the main flow simpler, and kept the app honest about what the device could really measure.",
          "And a number is only an answer with its context. The sport, the type of session, how hard it felt and the athlete’s history turned sensor data into something an athlete could act on.",
        ],
      },
    ],
  },
  {
    slug: "profit",
    client: "Profit.com",
    title: "Designing the first all-in-one trading simulation app",
    category: "Fintech · iOS · Design system",
    year: "2022",
    summary:
      "Profit.com puts global markets, news, community and trading games in one app. I led the design for two years, from market research to the native iOS app, one design system for iOS and web, and Arena, a trading game with prizes of up to $30,000 a month.",
    role: "Senior Product Designer",
    timeline: "Mar 2022 – Feb 2024",
    team: "Product, iOS & web engineering, marketing",
    platform: "iOS (native), Web",
    // Profit.com's dark green and its green. The green is too light for text on
    // white, so the accent is a deeper green of the same hue, and the brand green
    // is kept for the big numbers on the dark panel.
    accent: ["#05211b", "#1a8467"],
    highlight: "#25b48e",
    cover: "/work/profit/discover-analyze-profit.webp",
    disclaimer:
      "All numbers, screenshots and brand materials in this case study are the property of Profit.com. This case study is for demonstration only, and all trademarks used belong to Profit.com.",
    story: [
      {
        type: "hero",
        // Profit.com's own logo (public/logos/profit.svg, its black recoloured to
        // the brand's dark green). The zoom flies through the hole of the "o".
        logo: {
          src: "/work/profit/logo.svg",
          width: 113,
          height: 26,
          // The middle of the "o" (54.61 to 68.93 across, 6.57 to 20.47 down).
          hole: [61.77, 13.52],
        },
        line: "Designing the first all-in-one trading simulation app",
      },
      {
        type: "intro",
        role: [
          "I was the Senior Product Designer on Profit.com for two years and owned the whole experience: market research and positioning, information architecture, user flows and wireframes, UI and prototypes, usability testing, and the design system the engineers built from.",
          "I presented research and design direction to the leadership team and worked every day with product owners, iOS and web engineers, and marketing.",
        ],
      },
      {
        type: "flow",
        label: "The main flow",
        heading: "From the news *to the trade.*",
        device: "phone",
        steps: [
          {
            title: "Discover the markets",
            text: "Stocks, crypto, indices and forex in one view, with popular companies, a chart comparing markets, live index cards and the latest news.",
            image: { src: "/work/profit/discover.webp", alt: "Discover screen with global markets, a comparison chart and news", kind: "screen" },
          },
          {
            title: "Follow what matters",
            text: "The Watchlist shows every asset you follow, with the price and daily change. Swipe a ticker to share it in a chat.",
            image: { src: "/work/profit/watchlist.webp", alt: "My Watchlist with stocks and crypto", kind: "screen" },
          },
          {
            title: "Open a ticker",
            text: "The price chart, key stats and what analysts recommend, shown as one simple gauge. Advanced charts are one tap away.",
            image: { src: "/work/profit/ticker.webp", alt: "Tesla ticker with its chart and the analyst recommendation", kind: "screen" },
          },
          {
            title: "Trade it in Arena",
            text: "Trade shows the tournaments where you can trade the asset. Here, Cash Kings: real market prices, virtual money and real prizes.",
            image: { src: "/work/profit/arena.webp", alt: "Arena trading screen in the Cash Kings tournament", kind: "screen" },
          },
        ],
      },
      {
        type: "photos",
        heading: "Real markets, virtual money.",
        accent: "Real prizes.",
        images: [
          { src: "/work/profit/arena-phones.webp", alt: "Arena trading screen and the Watchlist on two phones", kind: "illustration" },
        ],
      },
      {
        type: "statement",
        label: "The problem",
        text: "Learning to trade meant *risking real money* or using *boring paper-trading apps.* And market data, news and discussion were *spread across different apps.*",
      },
      {
        type: "findings",
        label: "Research",
        heading: "What we learned.",
        text: "I started with market research: brokers, market data and news apps, trading communities and simulators. Surveys and card sorting gave us three personas, the curious beginner, the competitive player and the active trader. No app served all three.",
        items: [
          {
            title: "Fear of losing money",
            text: "Beginners wanted to learn on real markets without real risk. Virtual money took the fear away, and real prices kept it meaningful.",
          },
          {
            title: "A reason to come back",
            text: "Paper trading on its own got boring after a week. Rankings, prizes and short challenges gave people a reason to return every day.",
          },
          {
            title: "Depth when you want it",
            text: "Active traders wanted pro charts and data that confused beginners. The same screen had to work for both.",
          },
          {
            title: "Trading is social",
            text: "People talked about markets in other apps and shared screenshots of tickers. The conversation belonged next to the data.",
          },
        ],
      },
      {
        type: "carousel",
        label: "Process",
        heading: "From research *to a clear direction.*",
        text: "The gap between the three personas became our market fit, and the brief for everything that followed. Prototypes let us test it with users before development started.",
        items: [
          {
            label: "Research",
            title: "The market first",
            text: "I compared brokers, market data and news apps, trading communities and simulators: what each one did well, and where it let people down.",
          },
          {
            label: "Personas",
            title: "Three kinds of trader",
            text: "Surveys and card sorting shaped three personas, the curious beginner, the competitive player and the active trader, and the navigation.",
          },
          {
            label: "Structure",
            title: "Flows and wireframes",
            text: "I turned the research into the information architecture, user flows and wireframes for every part of the app.",
          },
          {
            label: "Testing",
            title: "Prototypes, early",
            text: "Clickable prototypes let us test the main flows with users early, before anything went into development.",
          },
          {
            label: "Leadership",
            title: "One direction",
            text: "I presented the research and design direction to the leadership team, so everyone was aligned before development started.",
          },
        ],
      },
      {
        type: "fixes",
        label: "Problem solving",
        heading: "Five problems. *Five fixes.*",
        items: [
          {
            problem: "Data, news, community and practice lived in different apps.",
            solution: "One app with five tabs: Discover, Watchlist, Arena, Chat and Wallet. Arena sits in the middle, because the trading games are what make Profit.com different.",
            image: { src: "/work/profit/discover-watchlist.webp", alt: "Discover and Watchlist screens on two phones", kind: "card" },
          },
          {
            problem: "Paper trading didn’t keep people coming back.",
            solution: "Arena turns practice into a game, free to play, with tournaments, 1-to-1 battles, leaderboards and real prizes of up to $30,000 a month, plus daily wins.",
            image: { src: "/work/profit/discover-analyze-profit.webp", alt: "Discover, Analyze & Profit: Playtrade with monthly prizes of up to $30,000", kind: "photo" },
          },
          {
            problem: "Beginners and pros needed different levels of detail.",
            solution: "Every ticker starts simple. Advanced charts, vertical or horizontal, with drawing tools and indicators, are one tap away.",
            image: { src: "/work/profit/ticker-flow.webp", alt: "A ticker leading to vertical and horizontal advanced charts and the Trade sheet", kind: "card" },
          },
          {
            problem: "People missed the events that move markets.",
            solution: "Economic releases, earnings and dividends got their own screens and charts, with live notifications for the companies people follow.",
            image: { src: "/work/profit/event-charts.webp", alt: "Charts for economic, earnings and dividend events", kind: "card" },
          },
          {
            problem: "A product this big could look different on iOS and web.",
            solution: "A custom design system built on native iOS components, with the same styles and patterns on the web. Arena got its own components, with every state and rule documented.",
            image: { src: "/work/profit/arena-states.webp", alt: "Every state of the 1-to-1 and tournament cards, with the rules behind them", kind: "card" },
          },
        ],
      },
      {
        type: "tabs",
        label: "Community",
        heading: "The conversation, *next to the data.*",
        device: "phone",
        items: [
          {
            label: "Group chat",
            text: "Group chats understand tickers. Type $BTC and a live price card shows up in the message.",
            image: { src: "/work/profit/chat-group.webp", alt: "Group chat with live ticker cards", kind: "screen" },
          },
          {
            label: "News",
            text: "News channels bring in sources like BBC News and Bloomberg, and people react to each story with a bull or a bear.",
            image: { src: "/work/profit/news-feed.webp", alt: "News feed channel with bull and bear reactions", kind: "screen" },
          },
          {
            label: "Events",
            text: "Each event shows the expected impact, the previous, forecast and actual values, and how results compared with expectations over time.",
            image: { src: "/work/profit/economic-event.webp", alt: "Economic event with impact, forecast and actual values", kind: "screen" },
          },
          {
            label: "Private rooms",
            text: "Anyone can start a trading community and invite people to a private room with a link.",
            image: { src: "/work/profit/invite-link.webp", alt: "Invite link for a private trading room", kind: "screen" },
          },
        ],
      },
      {
        type: "photos",
        heading: "The Weekly Brief, one tap from Discover,",
        accent: "with audio for on the go.",
        images: [
          { src: "/work/profit/weekly-brief-flow.webp", alt: "From Discover to the subscription plans and the Weekly Brief audio player", kind: "card" },
        ],
      },
      {
        type: "results",
        label: "Results",
        numbers: [
          { value: "$30k", label: "Top monthly prize in Arena, the trading game" },
          { value: "4", label: "Markets in one app: stocks, crypto, indices and forex" },
          { value: "2", label: "Platforms on one design system: iOS and web" },
        ],
        text: "Profit.com launched as a native iOS app that brings market data, news, community and trading games together. Beginners practise on real markets without risking money, and competitive players have a reason to come back every day.",
      },
      {
        type: "text",
        label: "What I learned",
        heading: "Simple first, *depth on demand.*",
        body: [
          "Designing for beginners and experienced traders at once is mostly about layers. Keep the first screen simple and friendly, and only show the depth, like advanced charts, indicators and event data, when someone asks for it.",
          "And a design system pays off early. It gave product and engineering a shared language, so new features like tournaments and the Weekly Brief were built on what already existed, not from scratch.",
        ],
      },
    ],
  },
  {
    slug: "digma",
    client: "Digma",
    title: "A design system that brought Digma into every IDE",
    category: "Developer tools · Design system · AI",
    year: "2024",
    summary:
      "Digma finds performance and scaling problems in code before they reach production. I built the design system used across all its IDE plugins and web app, and designed its AI agents experience. Digma was later acquired by JetBrains.",
    role: "Senior Product Designer",
    timeline: "Feb 2024 – Apr 2025",
    team: "Product, engineering",
    platform: "IDE plugins, Web",
    accent: ["#13132b", "#5b5ee6"],
    cover: "/work/digma/ide-plugin.webp",
    disclaimer:
      "All numbers, screenshots and brand materials in this case study are the property of Digma. This case study is for demonstration only, and all trademarks used belong to Digma.",
    story: [
      {
        type: "hero",
        // Digma's own logo (public/logos/digma.svg, recoloured to Digma's dark
        // navy). The zoom flies through the hole of the "D".
        logo: {
          src: "/work/digma/logo.svg",
          width: 127,
          height: 33,
          // The middle of the "D"'s hole (4.42 to 19.84 across, 4.04 to 22.69 down).
          hole: [12.13, 13.37],
        },
        line: "A design system that brought Digma into every IDE",
      },
      {
        type: "intro",
        role: [
          "As Senior Product Designer, I owned the design system: the audit, the structure, the foundations and components, the documentation, and rolling it out to the developers.",
          "I also designed product features on top of it, including the AI agents experience that investigates incidents.",
        ],
      },
      {
        type: "photos",
        heading: "Digma finds problems in code before release,",
        accent: "right where developers work.",
        images: [
          { src: "/work/digma/ide-plugin.webp", alt: "Digma panel inside the IDE, next to the code it analyses", kind: "photo", position: "80% 50%" },
        ],
      },
      {
        type: "statement",
        label: "The problem",
        text: "Digma’s UI lives *inside developers’ code editors.* It was built *screen by screen,* so the same things looked and worked differently, and every feature started *almost from zero.*",
      },
      {
        type: "findings",
        label: "Research",
        heading: "What the audit showed.",
        text: "I put every screen from the IDE plugins and the web app side by side and grouped them by pattern. I also talked to the engineers who built the UI, and looked at how developers used Digma inside their editors.",
        items: [
          {
            title: "One pattern, many versions",
            text: "The same elements, like buttons, issue cards, tooltips and empty states, were built again and again, each a bit different.",
          },
          {
            title: "It has to feel native",
            text: "Developers spend all day in their editor. Anything that looked out of place next to their code felt like noise, so the UI had to match the IDE.",
          },
          {
            title: "Space is tight",
            text: "Digma lives in narrow side panels and small hints. Every component had to stay readable when it’s small and full of information.",
          },
          {
            title: "Engineers build most of the UI",
            text: "Most screens were built directly by engineers. They needed clear components, with every variant and state, that they could use without a designer.",
          },
        ],
      },
      {
        type: "carousel",
        label: "Process",
        heading: "From an audit *to a shared library.*",
        text: "I built the system step by step, together with the engineers who would use it, in their tools and their language.",
        items: [
          {
            label: "Audit",
            title: "Every screen, side by side",
            text: "I grouped every screen from the IDE plugins and the web app by pattern, and found the same elements built again and again.",
          },
          {
            label: "Foundations",
            title: "Icons, type and states",
            text: "I designed the structure of the system from scratch, starting with the foundations: icons, typography and states.",
          },
          {
            label: "Components",
            title: "Every variant, documented",
            text: "Then core components like buttons, navigation, toasts and tooltips, each documented with its variants and states.",
          },
          {
            label: "Library",
            title: "Shared parts for every IDE",
            text: "I turned the system into a reusable component library, so developers could build full screens without waiting for a new design.",
          },
          {
            label: "Rollout",
            title: "For the whole team",
            text: "I introduced the library to the whole development team, and fixed the biggest consistency problems across the product.",
          },
        ],
      },
      {
        type: "fixes",
        label: "Problem solving",
        heading: "Three problems. *Three fixes.*",
        items: [
          {
            problem: "Inconsistent screens, built one at a time.",
            solution: "A design system built from the ground up: foundations first, then core components, each documented with its variants and states.",
            image: { src: "/work/digma/ds-foundations.webp", alt: "Design system foundations: icons, typography, buttons, toasters, navigation and tooltips", kind: "card" },
          },
          {
            problem: "Many issue types, each with its own layout.",
            solution: "One issue card that works for N+1 queries, bottlenecks, slow queries and errors. New issue types reuse it instead of starting over.",
            image: { src: "/work/digma/ds-insights.webp", alt: "Product components: issue cards for N+1 queries, bottlenecks, slow queries and errors", kind: "card" },
          },
          {
            problem: "The UI had to feel at home in every IDE.",
            solution: "Components that follow the look of the editor around them, so Digma feels like part of the IDE and not a web page inside it.",
            image: { src: "/work/digma/ide-panel.webp", alt: "The Digma panel in the IDE: a code nexus point and a bottleneck", kind: "card" },
          },
        ],
      },
      {
        type: "flow",
        label: "AI agents",
        heading: "From code issues *to AI agents.*",
        steps: [
          {
            title: "Follow the investigation",
            text: "A team of agents, from Watchman and Triage to Code Resolution and a Validator, works through an incident step by step. Developers follow along and chat with them.",
            image: { src: "/work/digma/agents-screen.webp", alt: "Incident view with AI agents working through an issue", kind: "screen" },
          },
          {
            title: "Set the flow",
            text: "Templates decide how the agents work: in which order, with which tools and with which prompts.",
            image: { src: "/work/digma/template-screen.webp", alt: "Template for the incident agent flow", kind: "screen" },
          },
          {
            title: "Add team rules",
            text: "Directives add the team’s own rules, like where the infrastructure files are, for the agents to follow.",
            image: { src: "/work/digma/directives-screen.webp", alt: "Directives table with conditions and rules", kind: "screen" },
          },
        ],
      },
      {
        type: "photos",
        heading: "Teams connect their own tools",
        accent: "through MCP servers and a setup wizard.",
        images: [
          { src: "/work/digma/mcp-server.webp", alt: "Dialog for adding an MCP server and choosing its tools", kind: "card" },
          { src: "/work/digma/wizard.webp", alt: "Setup wizard with a code snippet for an integration", kind: "card" },
        ],
      },
      {
        type: "results",
        label: "Results",
        numbers: [
          { value: "1", label: "Design system for all IDE plugins and the web app" },
          { value: "4", label: "Issue types in one shared issue card" },
          { value: "5", label: "AI agents in the incident experience" },
        ],
        text: "Design and engineering worked from the same source. New UI was consistent from the first build, and the system carried Digma from code issues to AI agents. Digma was later acquired by JetBrains.",
      },
      {
        type: "quote",
        quote:
          "He’s not just a designer - you get *a strategic partner, a systems thinker,* and someone who deeply cares about delivering meaningful experiences.",
        name: "Roni Dover",
        role: "CTO & Co-Founder, Digma",
        photo: "/people/roni-dover.jpg",
        link: "https://www.linkedin.com/in/ion-cazac/details/recommendations/",
      },
      {
        type: "text",
        label: "What I learned",
        heading: "Build it *with the engineers.*",
        body: [
          "A design system for developers only works if developers want to use it. Building it together with the engineers, in their tools and their language, mattered as much as the components.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
