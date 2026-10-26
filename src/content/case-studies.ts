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
  // Research findings, shown as numbered cards.
  insights?: { title: string; body: string }[];
  // Problem-solving: each problem paired with what was done about it.
  decisions?: { problem: string; solution: string }[];
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  // The story in three lines, shown at the top of the case study.
  overview?: { problem: string; insight: string; impact: string };
  role: string;
  timeline: string;
  team: string;
  platform: string;
  // Two colours for the cover background and the tinted image panels.
  accent: [string, string];
  // Either a single cover image, or up to three screens arranged as a mockup.
  cover?: string;
  // Which part of the cover image stays visible when it is cropped, e.g. "65% center".
  coverPosition?: string;
  // For a cover wider than its frame: show its full width, centred vertically,
  // and fade its bottom edge into `background` (the image's own background
  // colour) instead of cropping the sides. Needs the image's size.
  coverFullWidth?: { width: number; height: number; background: string };
  mockup?: { main: Screen; left?: Screen; right?: Screen; device?: "browser" | "phone" };
  sections: CaseSection[];
};

const flovi = {
  dashboard: { src: "/work/flovi/dashboard.webp", alt: "Flovi customer portal home with live map and reservations", width: 2000, height: 1858 },
  offices: { src: "/work/flovi/offices.webp", alt: "Flovi offices page with map and office list", width: 2000, height: 1796 },
  team: { src: "/work/flovi/team.webp", alt: "Flovi team members page with roles and status", width: 2000, height: 1230 },
  invoices: { src: "/work/flovi/invoices.webp", alt: "Flovi invoices page with current billing cycle", width: 2000, height: 1758 },
} satisfies Record<string, Screen>;

const profit = {
  discover: { src: "/work/profit/discover.webp", alt: "Discover screen with global markets, comparison chart and news", width: 750, height: 1624 },
  arena: { src: "/work/profit/arena.webp", alt: "Arena trading screen in the Cash Kings tournament", width: 750, height: 1624 },
  watchlist: { src: "/work/profit/watchlist.webp", alt: "My Watchlist with stocks and crypto", width: 925, height: 2000 },
  ticker: { src: "/work/profit/ticker.webp", alt: "Tesla ticker with chart and analyst recommendation", width: 921, height: 2000 },
  economicEvent: { src: "/work/profit/economic-event.webp", alt: "Economic event with impact, forecast and actual values", width: 741, height: 2000 },
  chatGroup: { src: "/work/profit/chat-group.webp", alt: "Group chat with live ticker cards", width: 924, height: 2000 },
  newsFeed: { src: "/work/profit/news-feed.webp", alt: "News feed channel with bull and bear reactions", width: 924, height: 2000 },
  inviteLink: { src: "/work/profit/invite-link.webp", alt: "Invite link for a private trading room", width: 750, height: 1624 },
} satisfies Record<string, Screen>;

export const caseStudies: CaseStudy[] = [
  {
    slug: "flovi",
    client: "Flovi",
    title: "Unifying Flovi’s customer portal across four markets",
    category: "Mobility · B2B SaaS · Design system",
    year: "2025",
    summary:
      "I redesigned Flovi’s customer portal and unified it across four markets. The result: 30% more customers, and reservations that take about 20 seconds to book — 20% faster than before.",
    overview: {
      problem:
        "Four markets, four versions of the same portal. Booking a transfer — the task customers repeat most — was slow, and every new feature had to be built four times.",
      insight:
        "The markets didn’t need different products. What really changed between them — currency, VAT, office rules — was content, not screens.",
      impact:
        "30% more customers, bookings in about 20 seconds — 20% faster — and one product for the team to improve instead of four.",
    },
    role: "Senior Product Designer",
    timeline: "Apr 2025 – Oct 2026",
    team: "Product, engineering, 4 markets",
    platform: "Web app",
    accent: ["#1b1a4b", "#5153c0"],
    cover: "/work/flovi/cover.jpg",
    coverPosition: "60% 0%",
    sections: [
      {
        heading: "The problem",
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
        heading: "Research and insights",
        body: [
          "Before designing anything, I audited all four portals side by side and mapped every step of the booking flow in each one. I went through the questions customers kept bringing to support and operations, and looked at how finance teams worked with invoices at the end of each billing cycle.",
        ],
        insights: [
          {
            title: "Four portals, one job",
            body: "The portals used different words, layouts and steps for the same tasks. Only a few differences were real business needs — currency, VAT, office rules and opening hours. The rest was history.",
          },
          {
            title: "Booking repeated what Flovi already knew",
            body: "Customers re-entered details the system already had, like office addresses and opening hours, on every single reservation.",
          },
          {
            title: "“Where is my car?”",
            body: "Many customer calls were simply to ask where a transfer was. The information existed — the portal just didn’t show it.",
          },
          {
            title: "Finance wanted no surprises",
            body: "Costs only became clear when the invoice arrived. Finance teams wanted to see the total building up during the cycle, so they could plan for it.",
          },
        ],
      },
      {
        heading: "How I solved it",
        body: [
          "Each insight turned into a design decision — starting with the foundation, then the tasks customers do most.",
        ],
        decisions: [
          {
            problem: "Four portals drifting apart, with every feature built four times.",
            solution: "One portal on a shared, shadcn-based design system. Market differences live in content and settings, so a change is designed and built once and ships everywhere.",
          },
          {
            problem: "Booking a transfer took too long.",
            solution: "A form that asks one thing at a time, fills in pickup and drop-off windows from office hours, and keeps a live summary next to it.",
          },
          {
            problem: "Customers had to call to find out where their car was.",
            solution: "A live map on Home with status filters, and a driver card with route progress and a live ETA.",
          },
          {
            problem: "Costs were a surprise at the end of every cycle.",
            solution: "The current billing cycle — trips so far, amount accrued and an estimated total — always one click away.",
          },
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
        heading: "Impact",
        body: [
          "For customers, one portal means the same, faster experience in every market: a reservation takes about 20 seconds, 20% faster than before, and every transfer can be followed live without picking up the phone.",
          "For the business, the redesign and the move to one platform helped Flovi grow its customer base by 30%. And for the team, a new feature is now designed and built once for all four markets, instead of four times.",
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
    slug: "orb",
    client: "ORB Innovations",
    title: "Turning smart mouthguard data into insights athletes can use",
    category: "Wearables · IoT · Mobile",
    year: "2023",
    summary:
      "ORB's custom-fit smart mouthguard records 20+ performance and wellness metrics. As ORB's first UX designer, I designed the companion app that turns that data into one connected view — from pairing the mouthguard to live sessions, session reports and history.",
    overview: {
      problem:
        "A smart mouthguard records 20+ metrics in every session, but athletes and coaches wanted answers, not sensor data — and the hardware was still in development.",
      insight:
        "A number only means something in context: the sport, the type of session, how hard it felt and the athlete’s own history.",
      impact:
        "A companion app that turns every session into three clear views, built on a design system that gave ORB “a great start and a strong direction”, in its CTO’s words.",
    },
    role: "Senior Product Designer",
    timeline: "Jun – Dec 2023",
    team: "Founders, engineering, data science",
    platform: "Mobile app",
    accent: ["#06161d", "#14b8c4"],
    cover: "/work/orb/hero.webp",
    coverPosition: "62% center",
    sections: [
      {
        heading: "The product",
        body: [
          "One session, more than one signal. ORB Sport is a custom-fit smart mouthguard for athletes in contact sports. While it protects, it records heart rate, movement and impacts — more than 20 performance and wellness metrics in every session.",
          "The companion app brings all of it into one connected view for review after activity: start with the latest session, explore individual metrics, then look back across the history to see how effort, movement and impacts change over time.",
        ],
      },
      {
        heading: "The problem",
        body: [
          "This was a product with no reference point. The hardware was still in development, the data came from a device inside an athlete's mouth, and the people using it — athletes and coaches — wanted answers, not raw sensor data.",
          "The app had to make a technical product feel simple: get a custom-made mouthguard to the athlete, pair it reliably, record a session with a weak signal or a low battery, and turn thousands of data points into a few numbers that actually mean something.",
        ],
      },
      {
        heading: "My role",
        body: [
          "I joined ORB as its first UX designer and designed the app end to end: user research and testing with athletes, flows and wireframes, interactive prototypes, the visual design and the design system.",
          "I worked closely with the founders, developers and data scientists, so every screen matched what the hardware and the algorithms could really deliver — and adjusted quickly when they changed.",
        ],
      },
      {
        heading: "Research and insights",
        body: [
          "With no similar product to learn from, the research came from the people and the hardware. I ran interviews and usability tests with athletes, talked to coaches about how they review a session, and worked through real session data and the device’s limits with the engineers and data scientists.",
        ],
        insights: [
          {
            title: "Answers, not data",
            body: "Athletes didn’t want to read sensor traces. They wanted to know how hard a session was, how they moved, and whether they took a hit.",
          },
          {
            title: "Context changes the meaning",
            body: "The same heart rate means something different in training and in a match, or when an injury hasn’t fully healed. Every number needed the story of the session around it.",
          },
          {
            title: "The device won’t always be reachable",
            body: "A mouthguard in a moving athlete’s mouth loses signal and battery. The app had to expect that, not treat it as an error.",
          },
          {
            title: "The journey starts before the first session",
            body: "Every mouthguard is custom-made from an impression, so the first experience is waiting for it. People needed to know what happens next, and when.",
          },
        ],
      },
      {
        heading: "How I solved it",
        body: [
          "Each insight shaped a design decision — from how the data is organised to how the app behaves when the hardware lets it down.",
        ],
        decisions: [
          {
            problem: "Thousands of data points in every session.",
            solution: "Three areas — heart rate, movement and impacts — each answering one question, with the detail one tap deeper.",
          },
          {
            problem: "Numbers without context meant nothing.",
            solution: "A short session report adds the sport, session type, perceived effort and notes, and every metric is shown next to the athlete’s history.",
          },
          {
            problem: "Signal and battery could drop in the middle of play.",
            solution: "Signal and battery are always visible, and a clear reconnecting state keeps the session going instead of failing.",
          },
          {
            problem: "A session could end by accident mid-game.",
            solution: "Ending a session is a deliberate hold, never a single tap.",
          },
          {
            problem: "The hardware and the algorithms kept changing.",
            solution: "A design system with every component and state documented, so screens could change quickly without losing consistency.",
          },
        ],
      },
      {
        heading: "From impression kit to first session",
        body: [
          "Each ORB mouthguard is made for one athlete, so the journey starts long before the first session. The app explains it in four steps: send us your impression, we 3D scan it to create the perfect fit, we manufacture it and send it to you, and you start tracking your sport.",
          "When the mouthguard arrives, pairing is a single, calm screen with a clear progress state. Measurements come with simple guidance — for the best heart-rate reading, don't talk, swallow or move your tongue.",
        ],
        images: [
          { src: "/work/orb/next-steps.webp", alt: "Next Steps screen and its four-step slider", width: 1898, height: 1045, frame: "plain", wide: true, caption: "Next Steps — from impression kit to tracking, in four cards." },
          {
            alt: "Connecting and measuring",
            frame: "phones",
            wide: true,
            screens: [
              { src: "/work/orb/connecting.webp", alt: "Connecting to the ORB mouthguard", width: 786, height: 1704 },
              { src: "/work/orb/measuring.webp", alt: "Measuring heart rate in beats per minute", width: 786, height: 1704 },
            ],
            caption: "Pairing the mouthguard and taking a heart-rate reading.",
          },
        ],
      },
      {
        heading: "Live sessions and session reports",
        body: [
          "During a session, the screen shows only what matters at a glance: heart rate on a live gauge, calories, elapsed time, and the signal and battery of the mouthguard. If the connection drops, the app says so and keeps trying to reconnect. Ending a session is a deliberate hold, so it never stops by accident.",
          "Afterwards, a short session report adds the context the sensors can't know: a name, start and end time, sport and session type — training or competition — how hard it felt on a scale, and notes such as an injury that hasn't fully recovered.",
        ],
        images: [
          { src: "/work/orb/session-flow.webp", alt: "Ongoing activity screens and the session report flow", width: 1950, height: 660, frame: "plain", wide: true, caption: "Ongoing activity — including the reconnecting state — and the session report." },
          { src: "/work/orb/live-and-report.webp", alt: "Live session and session report on two phones", width: 1800, height: 1800, frame: "plain", caption: "A live session and its report." },
          { src: "/work/orb/heart-rate.webp", alt: "Heart-rate overview with session trace and intensity zones", width: 1254, height: 1254, frame: "plain", caption: "Heart rate across the session, by intensity zone." },
        ],
      },
      {
        heading: "Three areas, more context",
        body: [
          "Every session opens into three areas, each adding a different perspective. Heart rate shows effort across the session, with time spent in each intensity zone. Movement brings pace, motion and changes in intensity together, with steps and estimated distance. Impacts show recorded impact events, the g-force on each side and where impacts landed.",
          "Metrics work best together, so each one is shown alongside the activity, the session conditions and the athlete's history — never as a number on its own.",
        ],
        images: [
          { src: "/work/orb/metrics-overview.webp", alt: "Heart rate, movement and impact screens on three phones", width: 1800, height: 900, frame: "float", wide: true, caption: "Heart rate, movement and impacts." },
          { src: "/work/orb/movement.webp", alt: "Movement overview with intensity and distance", width: 1254, height: 1254, frame: "plain", caption: "Movement — intensity, steps and distance." },
          { src: "/work/orb/impacts.webp", alt: "Impact view with average impact per side and impact region", width: 1254, height: 1254, frame: "plain", caption: "Impacts — g-force per side and impact region." },
        ],
      },
      {
        heading: "A system built to scale",
        body: [
          "To keep the app consistent while the product was still taking shape, I set up a design system with the components, states and rules engineers needed — down to the details. Toasts, for example, come in three types (errors, warnings and information), sit 20pt above the main action, slide in from the right and out to the left in 300ms, and disappear after three seconds.",
          "Every layout was specified across screen sizes, from iPhone SE to iPhone 15 Pro Max, with margins that grow from 12pt to 20pt as the screen gets larger.",
        ],
        images: [
          { src: "/work/orb/toasts.webp", alt: "Toast specification with types, placement and animation", width: 1643, height: 1205, frame: "plain", wide: true, caption: "Toasts — types, placement and motion." },
          { src: "/work/orb/responsive.webp", alt: "Home screen layout across four iPhone sizes", width: 2000, height: 913, frame: "plain", wide: true, caption: "The Home screen from iPhone SE to iPhone 15 Pro Max." },
        ],
      },
      {
        heading: "Impact",
        body: [
          "Athletes can go from impression kit to their first session, record reliably in tough conditions, and review more than 20 metrics in three clear views — with the context that makes them meaningful.",
          "The app gave ORB a clear, consistent foundation to build on while the hardware was still evolving. In the words of Thomas Quinn, ORB's CTO and co-founder: “Ion joined ORB as our first UX Designer and he knocked our design needs out of the park, even with the challenges of working with development IoT hardware. His work gave ORB a great start and a strong direction.”",
        ],
        metrics: [
          { value: "20+", label: "Performance and wellness metrics in one view" },
          { value: "3", label: "Areas per session: heart rate, movement, impacts" },
          { value: "1st", label: "UX designer at ORB" },
        ],
      },
      {
        heading: "What I learned",
        body: [
          "Designing for hardware in development means designing for failure first. Planning the reconnecting, low-battery and no-signal states early made the main flow simpler — and kept the app honest about what the device could really measure.",
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
      "Profit.com brings global markets, news, community and trading games into one app — practise with virtual money, compete with traders worldwide and win real prizes. I led the product design from market research to a native iOS app and the custom design system behind it.",
    overview: {
      problem:
        "Learning to trade meant risking real money or using dry paper-trading tools nobody came back to — with market data, news and conversation spread across different apps.",
      insight:
        "No product served the curious beginner, the competitive player and the active trader at once. The gap was learning, real data, community and a daily reason to return — in one place.",
      impact:
        "A native iOS app that brings markets, news, community and trading games together, built on one design system that carried every new feature across iOS and web.",
    },
    role: "Senior Product Designer",
    timeline: "Mar 2022 – Feb 2024",
    team: "Product, iOS & web engineering, marketing",
    platform: "iOS (native), Web",
    accent: ["#05211b", "#25b48e"],
    cover: "/work/profit/discover-analyze-profit.webp",
    sections: [
      {
        heading: "The problem",
        body: [
          "Learning to trade usually means picking between two bad options: a real brokerage account, where every beginner mistake costs money, or a paper-trading tool so dry that nobody comes back after a week. Market data, news and the conversation around them live in yet more apps.",
          "Profit.com set out to bring all of it together. Real market data, news and a community of traders — plus trading games where people practise with virtual money, compete with others and can win real prizes. The ambition was the first all-in-one trading simulation app built for everyone: simple enough for a complete beginner, deep enough for someone who trades every day.",
        ],
      },
      {
        heading: "My role",
        body: [
          "I was the Senior Product Designer on Profit.com for two years and owned the experience end to end: market research and positioning, information architecture, user flows and wireframes, high-fidelity UI and interactive prototypes, usability testing — and the design system the engineering teams built from.",
          "I presented research and design direction to the senior executive team and worked every day with product owners, iOS and web engineers, and marketing.",
        ],
      },
      {
        heading: "Research and insights",
        body: [
          "Everything started with market research. I mapped the products people already use to trade, follow markets and talk about investing — brokers, market-data and news apps, social trading communities and existing simulators — and compared what each did well and where it left people on their own.",
          "Surveys and card sorting helped me build personas and shape the navigation: the curious beginner who wants to learn without risking money, the competitive player motivated by rankings and prizes, and the active trader who expects professional charts and fast data. No single product served all three.",
          "That gap — learning, real data, community and a reason to come back every day, in one app — became our market fit and the brief for everything that followed.",
        ],
        insights: [
          {
            title: "The fear of losing money",
            body: "Beginners wanted to learn on real markets without real risk. Virtual money removed the fear; real prices kept it meaningful.",
          },
          {
            title: "Practice needs a reason to return",
            body: "Paper trading on its own felt pointless after a week. Rankings, prizes and short challenges gave people a reason to come back every day.",
          },
          {
            title: "Depth on demand",
            body: "Active traders expected professional charts and data that overwhelmed beginners. The same screen had to work for both.",
          },
          {
            title: "Trading is social",
            body: "People talked about markets in other apps and shared screenshots of tickers. The conversation belonged next to the data.",
          },
        ],
      },
      {
        heading: "How I solved it",
        body: [
          "Each insight became a design decision, and together they defined the product.",
        ],
        decisions: [
          {
            problem: "Data, news, community and practice lived in different apps.",
            solution: "One app with five spaces — Discover, Watchlist, Arena, Chat and Wallet — with Arena at the centre of the tab bar.",
          },
          {
            problem: "Paper trading didn’t keep people coming back.",
            solution: "Arena turns practice into a game: themed tournaments, 1-to-1 battles, leaderboards and real prizes — up to $30,000 a month, plus daily wins.",
          },
          {
            problem: "Beginners and professionals needed different depth.",
            solution: "Layering: a simple first view of every ticker, with advanced charts, drawing tools and indicators one tap deeper.",
          },
          {
            problem: "Markets move on events that people missed.",
            solution: "Economic releases, earnings and dividends became content of their own, with real-time notifications for the companies people follow.",
          },
          {
            problem: "The conversation happened somewhere else.",
            solution: "Chat built into the app: type $BTC for a live price card, share any ticker with a swipe, and react to news with a bull or a bear.",
          },
          {
            problem: "A product this big could drift apart across iOS and web.",
            solution: "A custom design system built on the native iOS library, with the same tokens and patterns carried over to the web.",
          },
        ],
      },
      {
        heading: "One app, five spaces",
        body: [
          "I turned the research into a simple structure with five tabs: Discover to follow global markets, Watchlist for the assets you care about, Arena to compete, Chat to trade ideas with others, and Wallet. Arena sits in the centre of the tab bar, because the simulation is what makes Profit.com different.",
          "Wireframes and clickable prototypes let us test the main flows with users early, and align the executive team on the direction before a single screen went into development.",
        ],
        images: [
          { src: "/work/profit/discover-watchlist.webp", alt: "Discover and Watchlist screens on two phones", width: 973, height: 1211, frame: "card", caption: "Discover and Watchlist." },
          { alt: "Arena", frame: "phones", screens: [profit.arena], caption: "Arena — trading with virtual money." },
        ],
      },
      {
        heading: "Discover: global markets in one place",
        body: [
          "Discover is the daily starting point. Stocks, crypto, indices and forex sit in one view: popular companies one tap away, a comparison chart that shows how markets move against each other, live index cards and the latest news right below.",
          "It is also the home of premium content. The Weekly Brief — an exclusive analysis of the markets — opens straight from Discover. Free users see what each plan includes (Rookie, Pro and Guru); after upgrading, they go straight into the brief, with a built-in audio player for listening on the go.",
        ],
        images: [
          { src: "/work/profit/weekly-brief-flow.webp", alt: "Flow from Discover to the subscription plans and the Weekly Brief player", width: 1828, height: 1070, frame: "plain", wide: true, caption: "From Discover to the Weekly Brief: the upgrade flow and the audio player." },
        ],
      },
      {
        heading: "Watchlist, tickers and advanced charts",
        body: [
          "The Watchlist keeps every asset a user follows in one list, with price and daily change at a glance. A swipe shares any ticker straight into a chat.",
          "Each ticker opens as a sheet with the price chart, company profile, key stats, earnings, dividends and the analyst consensus, summed up in a single gauge — so people never miss when to buy or sell. Price alerts notify them the moment an asset crosses a level they choose.",
          "Experienced traders can expand the chart into an advanced view, vertical or horizontal, with candlesticks, drawing tools and indicators. And from any ticker, Trade opens a sheet listing the tournaments where that asset can be traded.",
        ],
        images: [
          { alt: "Watchlist and ticker", frame: "phones", screens: [profit.watchlist, profit.ticker], wide: true, caption: "Watchlist and the ticker sheet with the analyst recommendation." },
          { src: "/work/profit/ticker-flow.webp", alt: "Ticker view leading to vertical and horizontal advanced charts and the Trade sheet", width: 2000, height: 910, frame: "plain", wide: true, caption: "From the ticker to advanced charts — and into a tournament with Trade." },
        ],
      },
      {
        heading: "Market events in real time",
        body: [
          "Markets move on events, so events became first-class content. Economic releases, earnings and dividends each have their own view: the expected impact, the previous, forecast and actual values, and a history chart that shows how results compared with expectations over time.",
          "Notifications bring the important ones to people in real time — economic events, earnings, and the news and tweets about the companies they follow — so market news never passes them by.",
        ],
        images: [
          { alt: "Economic event", frame: "phones", screens: [profit.economicEvent], caption: "An economic event: impact, forecast and actual." },
          { src: "/work/profit/event-charts.webp", alt: "Chart components for economic, earnings and dividend events", width: 2000, height: 1325, frame: "card", caption: "Charts for economic, earnings and dividend events." },
        ],
      },
      {
        heading: "Arena: trading games for everyone",
        body: [
          "Arena is where Profit.com becomes a game — free to play, with real prizes to win. Players trade real market prices with virtual money in themed tournaments such as Day Trading, Top Stocks, Crypto Gainz and Cash Kings, or challenge another player to a timed 1-to-1 battle for experience points. Leaderboards, prize pools, lives and a toolbox let them compete with top traders worldwide.",
          "Every card has a state for every moment: before a tournament opens, after joining but before the first trade (with a clear Open Trade call to action), during play with live position and performance, and in the last minute, when the timer turns red. A green dot on the Arena tab and a short highlight on the card show players what changed while they were away.",
        ],
        images: [
          { src: "/work/profit/arena-phones.webp", alt: "Arena trading screen and Watchlist on two phones", width: 2000, height: 1088, frame: "float", wide: true, caption: "Trading in Arena, with the Watchlist one tap away." },
          { src: "/work/profit/arena-states.webp", alt: "All states of 1-to-1 battles and tournament cards", width: 2000, height: 1079, frame: "plain", wide: true, caption: "Every state of the 1-to-1 and tournament cards, with the rules behind them." },
        ],
      },
      {
        heading: "Communities and news",
        body: [
          "Trading is social, so Chat is built in. Group chats understand tickers: type $BTC and a live price card appears right in the message. Anyone can create a trading community and share a private room with an invite link.",
          "News channels bring sources such as BBC News and Bloomberg into a feed where people react with a bull or a bear — a quick read of how the community feels about each story.",
        ],
        images: [
          { alt: "Chat", frame: "phones", screens: [profit.chatGroup, profit.newsFeed, profit.inviteLink], wide: true, caption: "Group chat with live tickers, a news channel and invite links." },
        ],
      },
      {
        heading: "A custom design system for every platform",
        body: [
          "With this much product, consistency had to be designed in from the start. I built a custom design system to fit every need across platforms: foundations for colour, type and spacing; components for lists, sheets, tabs and controls; and a dedicated set for data — charts, tooltips, price changes and market states.",
          "The iOS app was developed with native iOS components, so I built the system around the native library. Our components extend what iOS already does well instead of fighting it, which kept the app fast and familiar, while the same tokens and patterns carried over to the web.",
          "Larger features like Arena got their own component sets, with every state and rule documented for engineers.",
        ],
        images: [
          { src: "/work/profit/tournament-system.webp", alt: "Arena component set with leaderboard, rules, timers and image states", width: 2000, height: 360, frame: "plain", wide: true, caption: "Arena components — leaderboard, rules, timers, states and artwork — documented for engineering." },
        ],
      },
      {
        heading: "Impact",
        body: [
          "Profit.com launched as a native iOS app that brings market data, news, community and trading games together — the all-in-one experience the research pointed to. Beginners can practise on real markets without risking money, and competitive players have a reason to come back every day.",
          "For the business, the research gave the executive team a clear, shared direction before development started. And the design system gave product and engineering one language, so new features — tournaments, premium content like the Weekly Brief — were built on top of what already existed instead of from scratch.",
        ],
        metrics: [
          { value: "1st", label: "All-in-one trading simulation app for everyone" },
          { value: "4", label: "Markets in one app: stocks, crypto, indices and forex" },
          { value: "1", label: "Custom design system across iOS and web" },
        ],
      },
      {
        heading: "What I learned",
        body: [
          "Designing for beginners and experienced traders at the same time is mostly about layering. Keep the first screen simple and friendly, and let the depth — advanced charts, indicators, event data — appear only when someone asks for it.",
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
      "Digma finds performance and scaling issues in code before they reach production. I architected its custom design system and a reusable component library that let every developer build native-feeling UI inside the IDE. Digma was later acquired by JetBrains.",
    overview: {
      problem:
        "Digma’s UI lives inside developers’ IDEs, and it had been built screen by screen — the same pattern looked and behaved differently, and every feature started almost from scratch.",
      insight:
        "Developers trust tools that feel native to their editor, and engineers were building most of the UI themselves. They needed a system they could use without waiting for design.",
      impact:
        "One design system and component library used by every developer, consistent UI from the first build, and a foundation that carried Digma into AI agents — before JetBrains acquired it.",
    },
    role: "Senior Product Designer",
    timeline: "Feb 2024 – Apr 2025",
    team: "Product, engineering",
    platform: "IDE plugins, Web",
    accent: ["#13132b", "#5b5ee6"],
    cover: "/work/digma/ide-plugin.webp",
    sections: [
      {
        heading: "The product",
        body: [
          "Digma is a preemptive observability tool. It uses standard observability data to find performance and scaling issues at the code level during pre-production — the issues tests miss — and shows them to developers right where they work: in the IDE, as they code.",
          "That means the UI lives in places designers rarely design for: narrow side panels, inline code hints and dense lists of issues, inside editors that each have their own look and rules.",
        ],
      },
      {
        heading: "The problem",
        body: [
          "Digma grew fast, and its interface grew with it. Screens were built one by one, so the same pattern looked and behaved differently from place to place, and every new feature started almost from scratch.",
          "The goal was one consistent system that engineers could use on their own, and that felt at home in every IDE Digma runs in.",
        ],
      },
      {
        heading: "My role",
        body: [
          "As Senior Product Designer, I owned the design system end to end: the audit, its architecture, the foundations and components, the documentation, and rolling it out to the development team. I also designed product features on top of it, including the AI agents experience.",
        ],
      },
      {
        heading: "Research and insights",
        body: [
          "I started with an audit: every screen in the IDE plugins and the web app, side by side, grouped by pattern. Alongside it, I talked to the engineers who built the UI and looked at how developers actually used Digma inside their editors.",
        ],
        insights: [
          {
            title: "One pattern, many versions",
            body: "The audit found the same elements — buttons, issue cards, tooltips, empty states — built several times over, each slightly different.",
          },
          {
            title: "Native, or it’s noise",
            body: "Developers spend the whole day in their editor. Anything that looked foreign next to their code felt like noise, so the UI had to match the IDE around it.",
          },
          {
            title: "Space is the real constraint",
            body: "Digma lives in narrow side panels and inline hints. Every component had to stay readable when it’s small and dense.",
          },
          {
            title: "Engineers build most of the UI",
            body: "Most screens were built by engineers directly. They needed clear components, with every variant and state, that they could use without a designer in the loop.",
          },
        ],
      },
      {
        heading: "How I solved it",
        body: [
          "Each finding from the audit turned into a part of the system.",
        ],
        decisions: [
          {
            problem: "Inconsistent screens, built one by one.",
            solution: "A design system architecture from the ground up: foundations first, then core components, each documented with its variants and states.",
          },
          {
            problem: "Many issue types, each with its own layout.",
            solution: "One issue-card pattern that covers N+1 queries, bottlenecks, slow queries and errors, so new issue types reuse it instead of starting over.",
          },
          {
            problem: "UI that had to feel at home in every IDE.",
            solution: "Components designed to follow the look of the IDE around them, so Digma reads as part of the editor rather than a web page inside it.",
          },
          {
            problem: "Every new screen waited for design.",
            solution: "A scalable, reusable component library introduced to the whole development team, so developers could build complete UI from shared parts.",
          },
          {
            problem: "A new kind of product: AI agents.",
            solution: "The same system extended to agent timelines, chat, templates, directives and MCP connections — without starting a new visual language.",
          },
        ],
      },
      {
        heading: "A custom design system",
        body: [
          "I designed the architecture of a custom design system from the ground up: foundations such as icons, typography and states, then core components like buttons, navigation, toasters and tooltips, each documented with its variants.",
          "With that in place, I resolved the major consistency issues across the product, so the same thing now always looks and works the same way.",
        ],
        images: [
          { src: "/work/digma/ds-foundations.webp", alt: "Digma design system foundations: icons, typography, buttons, toasters, navigation and tooltips", width: 2000, height: 682, frame: "plain", wide: true, caption: "Foundations and core components, documented and versioned." },
          { src: "/work/digma/ds-insights.webp", alt: "Digma product components for insights, issues and errors", width: 1782, height: 1136, frame: "plain", wide: true, caption: "Product components — issue cards for N+1 queries, bottlenecks, slow queries and errors." },
        ],
      },
      {
        heading: "One library for every IDE",
        body: [
          "I turned the system into a fully scalable, reusable component library and introduced it to the whole development team. Developers could now build comprehensive UI from shared parts, natively integrated into the IDEs Digma supports, without waiting for a new design for every screen.",
        ],
        images: [
          { src: "/work/digma/ide-plugin.webp", alt: "Digma panel inside the IDE next to the code it analyses", width: 1920, height: 1080, frame: "plain", wide: true, caption: "Digma inside the IDE — issues appear next to the code that causes them." },
        ],
      },
      {
        heading: "From issues to AI agents",
        body: [
          "The same system carried Digma into its next step: AI agents that investigate incidents. A team of agents — Watchman, Triage, Infra and Code Resolution, and a Validator — works through an issue step by step, and developers can follow along, chat with them and see related issues.",
          "Teams shape how the agents work with templates, set rules with directives, and connect their own tools through MCP servers.",
        ],
        images: [
          { src: "/work/digma/incident-agents.webp", alt: "Incident view with AI agents working through an issue", width: 2000, height: 1311, frame: "plain", wide: true, caption: "An incident under investigation, handed from agent to agent." },
          { src: "/work/digma/incident-template.webp", alt: "Template for the incident agent flow", width: 2000, height: 1311, frame: "plain", caption: "Templates define the agent flow." },
          { src: "/work/digma/directives.webp", alt: "Directives table with conditions and rules", width: 2000, height: 1311, frame: "plain", caption: "Directives add team rules." },
          { src: "/work/digma/mcp-server.webp", alt: "Dialog for adding an MCP server and choosing its tools", width: 1270, height: 1288, frame: "card", caption: "Connecting tools through MCP servers." },
          { src: "/work/digma/wizard.webp", alt: "Setup wizard with a code snippet", width: 1270, height: 1230, frame: "card", caption: "A setup wizard for integrations." },
        ],
      },
      {
        heading: "Impact",
        body: [
          "Design and engineering now worked from the same source, so new UI stayed consistent from the first build and developers stopped rebuilding the same patterns. New features could be put together from shared parts instead of waiting for new designs.",
          "The system was flexible enough to carry Digma from code-level issues into AI agents that investigate incidents. Digma was later acquired by JetBrains.",
        ],
        metrics: [
          { value: "1", label: "Design system for the IDE plugins and the web app" },
          { value: "All", label: "Developers building UI from the shared library" },
          { value: "JetBrains", label: "Acquired Digma" },
        ],
      },
      {
        heading: "What I learned",
        body: [
          "A design system for developers only works if developers want to use it. Building it with the engineers — in their tools and their language — mattered as much as the components themselves.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
