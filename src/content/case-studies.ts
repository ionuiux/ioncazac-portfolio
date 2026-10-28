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
  // Three headline numbers, shown as a strip right under the title.
  results?: { value: string; label: string }[];
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
    title: "One customer portal for four markets",
    category: "Mobility · B2B SaaS · Design system",
    year: "2025",
    summary:
      "I redesigned Flovi’s customer portal and brought four markets onto one version of it. Flovi got 30% more customers, and booking a transfer now takes about 20 seconds, 20% faster than before.",
    overview: {
      problem:
        "Each of Flovi’s four markets had its own version of the portal. Booking was slow, and every new feature had to be built four times.",
      insight:
        "The markets didn’t need different products. The real differences, like currency, VAT and office rules, were just content.",
      impact:
        "30% more customers, bookings in about 20 seconds, and one product for the team to work on instead of four.",
    },
    results: [
      { value: "+30%", label: "More customers" },
      { value: "~20 s", label: "To book a transfer, 20% faster" },
      { value: "4", label: "Markets on one portal" },
    ],
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
          "Flovi moves cars for rental and fleet companies. A driver picks up a car in one place and delivers it to another, and customers book and track these transfers in the Flovi portal.",
          "The portal grew one market at a time, and each market ended up with its own version. The layouts were different, the same things had different names, and some features only existed in one country. Booking a transfer, the thing customers do most, took too long. And every new feature had to be designed and built more than once.",
        ],
      },
      {
        heading: "My role",
        body: [
          "I led the design of the customer portal. I audited the old portals, defined one structure for all markets, built a design system with the engineers based on shadcn, and designed the main flows. I also brought AI tools into our process, so we could test ideas and prototype much faster.",
        ],
      },
      {
        heading: "Research and insights",
        body: [
          "Before designing anything, I put all four portals side by side and mapped every step of booking in each one. I also went through the questions customers asked support and operations, and looked at how finance teams handled invoices at the end of each billing cycle.",
        ],
        insights: [
          {
            title: "Four portals, one job",
            body: "The portals used different names, layouts and steps for the same tasks. Only a few differences really mattered: currency, VAT, office rules and opening hours.",
          },
          {
            title: "Customers typed what we already knew",
            body: "Every booking asked for details Flovi already had, like office addresses and opening hours.",
          },
          {
            title: "“Where is my car?”",
            body: "A lot of calls were people asking where their transfer was. We had that information, the portal just didn’t show it.",
          },
          {
            title: "Finance didn’t like surprises",
            body: "Costs only became clear when the invoice arrived. Finance teams wanted to see the total grow during the cycle so they could plan for it.",
          },
        ],
      },
      {
        heading: "How I solved it",
        body: ["I turned each finding into a design decision, starting with the foundation."],
        decisions: [
          {
            problem: "Four versions of the portal, and every feature built four times.",
            solution: "One portal on a shared design system. Market differences live in content and settings, so we design and build things once.",
          },
          {
            problem: "Booking a transfer took too long.",
            solution: "A form that asks one thing at a time, fills in pickup and drop-off times from office hours, and shows a live summary next to it.",
          },
          {
            problem: "Customers called to ask where their car was.",
            solution: "A live map on the home page with status filters, and a driver card that shows the route and when the car will arrive.",
          },
          {
            problem: "Costs were a surprise at the end of every cycle.",
            solution: "The current billing cycle, with trips so far and an estimated total, is always one click away.",
          },
        ],
      },
      {
        heading: "One portal for every market",
        body: [
          "Instead of fixing each market separately, we rebuilt the portal on one base. Every market uses the same components and patterns, and local details like currency, VAT and office rules come from the content, not from custom screens.",
          "The navigation has five sections: Home, Offices, Team members, Invoices and Settings. “New reservation” is always one click away.",
        ],
        images: [
          { ...flovi.offices, frame: "browser", caption: "Offices: all locations on one map, with opening hours, managers and status." },
          { ...flovi.team, frame: "browser", caption: "Team members: roles and office access in one place." },
        ],
      },
      {
        heading: "See every car on the move",
        body: [
          "The home page answers the question customers ask most: where is my car? A live map shows every active transfer. Filters show how many cars are requested, assigned, on the road or delivered, and each reservation shows its route, time and price in one row.",
          "Click a car to see the driver, the vehicle, the route and when it will arrive. Customers can follow a transfer without calling anyone.",
        ],
        images: [
          { ...flovi.dashboard, frame: "browser", wide: true, caption: "Home: live map, status filters and the latest reservations." },
          { src: "/work/flovi/tracking.webp", alt: "Live driver card with route progress and arrival time", width: 468, height: 476, frame: "card", caption: "Driver card with route progress and arrival time." },
          { src: "/work/flovi/office-card.webp", alt: "Office card on the map with today’s hours and manager", width: 540, height: 350, frame: "card", caption: "Office cards show today’s hours and who’s in charge." },
        ],
      },
      {
        heading: "Booking in about 20 seconds",
        body: [
          "Customers book transfers all the time, so every second counts. The new form asks one thing at a time, fills in what it can by itself, like pickup and drop-off times based on office hours, and shows a live summary next to it.",
          "The average booking time dropped by 20%, to about 20 seconds.",
        ],
      },
      {
        heading: "Billing without surprises",
        body: [
          "Finance teams can check the current billing cycle at any time: trips so far, the amount so far and an estimated total. Every trip is listed, and older invoices are one click away.",
        ],
        images: [
          { src: "/work/flovi/billing-cycle.webp", alt: "Current billing cycle summary", width: 1585, height: 284, frame: "card", wide: true, caption: "The current cycle, always visible." },
          { ...flovi.invoices, frame: "browser", wide: true, caption: "Invoices: trips in this cycle and previous invoices." },
        ],
      },
      {
        heading: "Impact",
        body: [
          "For customers, the portal now works the same way in every market, and it’s faster. Booking takes about 20 seconds, and they can follow every transfer live without picking up the phone.",
          "For the business, the redesign and the move to one platform helped Flovi grow its customers by 30%. For the team, a new feature is now built once for all four markets instead of four times.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "Most of the work wasn’t the screens. It was getting four markets to agree on one way of working: the same words, the same steps, and a clear idea of which local differences really matter.",
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
    overview: {
      problem:
        "The mouthguard records 20+ metrics every session, but athletes and coaches wanted simple answers. And the hardware was still being built.",
      insight:
        "A number only makes sense with context: the sport, the type of session, how hard it felt and the athlete’s history.",
      impact:
        "An app that turns every session into three clear views, built on a design system that gave ORB “a great start and a strong direction”, as its CTO put it.",
    },
    results: [
      { value: "20+", label: "Metrics recorded in every session" },
      { value: "3", label: "Clear views per session: heart rate, movement, impacts" },
      { value: "1st", label: "UX designer at ORB" },
    ],
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
          "ORB Sport is a custom-fit smart mouthguard for athletes in contact sports. Besides protecting the teeth, it records heart rate, movement and impacts, more than 20 metrics in every session.",
          "The app brings all of this into one place. You start with your latest session, dig into each metric, and look back over time to see how your effort, movement and impacts change.",
        ],
      },
      {
        heading: "The problem",
        body: [
          "There was nothing quite like it to learn from. The hardware was still in development, the data came from a device inside an athlete’s mouth, and the people using it wanted answers, not raw sensor data.",
          "The app had to make a technical product feel simple. It had to get a custom mouthguard to the athlete, pair it reliably, record a session even with a weak signal or low battery, and turn thousands of data points into a few numbers that mean something.",
        ],
      },
      {
        heading: "My role",
        body: [
          "I joined ORB as its first UX designer and designed the whole app: research and testing with athletes, flows and wireframes, prototypes, the visual design and the design system.",
          "I worked closely with the founders, developers and data scientists, so every screen matched what the hardware and algorithms could actually do. When they changed, I could adjust quickly.",
        ],
      },
      {
        heading: "Research and insights",
        body: [
          "With no similar product to compare against, I learned from people and from the device. I interviewed and tested with athletes, talked to coaches about how they review a session, and went through real session data and the device’s limits with the engineers and data scientists.",
        ],
        insights: [
          {
            title: "Answers, not data",
            body: "Athletes didn’t want to read sensor charts. They wanted to know how hard they worked, how they moved and whether they took a hit.",
          },
          {
            title: "Context changes everything",
            body: "The same heart rate means something different in training, in a match, or with an injury that hasn’t healed. Numbers needed the story of the session around them.",
          },
          {
            title: "The connection will drop",
            body: "A mouthguard in a moving athlete’s mouth loses signal and battery. The app had to expect this, not treat it as an error.",
          },
          {
            title: "It starts before the first session",
            body: "Every mouthguard is made from an impression, so the first experience is waiting for it to arrive. People wanted to know what happens next.",
          },
        ],
      },
      {
        heading: "How I solved it",
        body: ["Each finding led to a design decision, from how the data is organised to what happens when the hardware fails."],
        decisions: [
          {
            problem: "Thousands of data points in every session.",
            solution: "Three areas: heart rate, movement and impacts. Each one answers one question, and more detail is one tap away.",
          },
          {
            problem: "Numbers without context meant nothing.",
            solution: "A short report after each session adds the sport, the session type, how hard it felt and notes. Every metric is shown next to the athlete’s history.",
          },
          {
            problem: "Signal and battery could drop mid-game.",
            solution: "Signal and battery are always on screen, and the app shows when it’s reconnecting instead of failing.",
          },
          {
            problem: "A session could be stopped by accident.",
            solution: "To end a session you press and hold, so one tap can’t stop it.",
          },
          {
            problem: "The hardware and algorithms kept changing.",
            solution: "A design system with every component and state documented, so screens could change fast and still stay consistent.",
          },
        ],
      },
      {
        heading: "From impression kit to first session",
        body: [
          "Each mouthguard is made for one athlete, so the experience starts long before the first session. The app explains it in four steps: send your impression, we 3D scan it for a perfect fit, we make it and ship it, and you start tracking.",
          "When the mouthguard arrives, pairing happens on one simple screen that shows the progress. Measurements come with short tips. For the best heart-rate reading, don’t talk, swallow or move your tongue.",
        ],
        images: [
          { src: "/work/orb/next-steps.webp", alt: "Next Steps screen and its four-step slider", width: 1898, height: 1045, frame: "plain", wide: true, caption: "Next Steps: from impression kit to tracking, in four cards." },
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
          "During a session, the screen shows only what you need: heart rate on a live gauge, calories, time, and the mouthguard’s signal and battery. If the connection drops, the app says so and keeps trying to reconnect. You end a session by pressing and holding, so it never stops by accident.",
          "After the session, a short report adds what the sensors can’t know: a name, the start and end time, the sport, training or competition, how hard it felt, and notes like an injury that hasn’t fully healed.",
        ],
        images: [
          { src: "/work/orb/session-flow.webp", alt: "Ongoing activity screens and the session report flow", width: 1950, height: 660, frame: "plain", wide: true, caption: "The live session, including the reconnecting state, and the session report." },
          { src: "/work/orb/live-and-report.webp", alt: "Live session and session report on two phones", width: 1800, height: 1800, frame: "plain", caption: "A live session and its report." },
          { src: "/work/orb/heart-rate.webp", alt: "Heart-rate overview with session trace and intensity zones", width: 1254, height: 1254, frame: "plain", caption: "Heart rate across the session, by intensity zone." },
        ],
      },
      {
        heading: "Three views of every session",
        body: [
          "Every session opens into three areas. Heart rate shows your effort and how long you spent in each intensity zone. Movement shows pace, motion, steps and distance. Impacts show each hit, its g-force on each side and where it landed.",
          "Each metric is shown together with the session details and the athlete’s history, never as a number on its own.",
        ],
        images: [
          { src: "/work/orb/metrics-overview.webp", alt: "Heart rate, movement and impact screens on three phones", width: 1800, height: 900, frame: "float", wide: true, caption: "Heart rate, movement and impacts." },
          { src: "/work/orb/movement.webp", alt: "Movement overview with intensity and distance", width: 1254, height: 1254, frame: "plain", caption: "Movement: intensity, steps and distance." },
          { src: "/work/orb/impacts.webp", alt: "Impact view with average impact per side and impact region", width: 1254, height: 1254, frame: "plain", caption: "Impacts: g-force per side and where they landed." },
        ],
      },
      {
        heading: "A system built to scale",
        body: [
          "The product was still taking shape, so I set up a design system early, with all the components, states and rules the engineers needed. Even small things were defined. Toasts, for example, come in three types (error, warning and info), sit 20pt above the main button, slide in from the right and out to the left in 300ms, and disappear after three seconds.",
          "Every layout was specified for all screen sizes, from iPhone SE to iPhone 15 Pro Max, with margins growing from 12pt to 20pt on bigger screens.",
        ],
        images: [
          { src: "/work/orb/toasts.webp", alt: "Toast specification with types, placement and animation", width: 1643, height: 1205, frame: "plain", wide: true, caption: "Toasts: types, placement and motion." },
          { src: "/work/orb/responsive.webp", alt: "Home screen layout across four iPhone sizes", width: 2000, height: 913, frame: "plain", wide: true, caption: "The Home screen from iPhone SE to iPhone 15 Pro Max." },
        ],
      },
      {
        heading: "Impact",
        body: [
          "Athletes can go from impression kit to their first session, record reliably even in tough conditions, and review more than 20 metrics in three clear views, with the context that makes them useful.",
          "The app gave ORB a solid, consistent base to build on while the hardware was still changing. Thomas Quinn, ORB’s CTO and co-founder, put it this way: “Ion joined ORB as our first UX Designer and he knocked our design needs out of the park, even with the challenges of working with development IoT hardware. His work gave ORB a great start and a strong direction.”",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "When the hardware is still in development, design for failure first. Planning the reconnecting, low battery and no signal states early made the main flow simpler, and kept the app honest about what the device could really measure.",
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
    overview: {
      problem:
        "Learning to trade meant risking real money or using boring paper-trading apps. And market data, news and discussion were spread across different apps.",
      insight:
        "No app worked for beginners, competitive players and active traders at the same time. The gap was learning, real data, community and a reason to come back every day.",
      impact:
        "A native iOS app that brings markets, news, community and trading games together, built on one design system for iOS and web.",
    },
    results: [
      { value: "$30k", label: "Top monthly prize in Arena, the trading game" },
      { value: "4", label: "Markets in one app: stocks, crypto, indices and forex" },
      { value: "2", label: "Platforms on one design system: iOS and web" },
    ],
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
          "Learning to trade usually means choosing between two bad options. A real brokerage account, where every beginner mistake costs money, or a paper-trading app so boring that nobody opens it after a week. Market data, news and the discussion around them live in other apps again.",
          "Profit.com wanted to bring it all together: real market data, news and a community of traders, plus trading games where people practise with virtual money, compete and can win real prizes. The goal was the first all-in-one trading simulation app for everyone, simple enough for a beginner and deep enough for someone who trades every day.",
        ],
      },
      {
        heading: "My role",
        body: [
          "I was the Senior Product Designer on Profit.com for two years and owned the whole experience: market research and positioning, information architecture, user flows and wireframes, UI and prototypes, usability testing, and the design system the engineers built from.",
          "I presented research and design direction to the leadership team and worked every day with product owners, iOS and web engineers, and marketing.",
        ],
      },
      {
        heading: "Research and insights",
        body: [
          "It all started with market research. I looked at the products people already use to trade, follow markets and talk about investing: brokers, market data and news apps, trading communities and existing simulators. I compared what each one did well and where it let people down.",
          "Surveys and card sorting helped me build personas and shape the navigation. There was the curious beginner who wants to learn without risking money, the competitive player who loves rankings and prizes, and the active trader who expects pro charts and fast data. No app served all three.",
          "That gap became our market fit, and the brief for everything that followed.",
        ],
        insights: [
          {
            title: "Fear of losing money",
            body: "Beginners wanted to learn on real markets without real risk. Virtual money took the fear away, and real prices kept it meaningful.",
          },
          {
            title: "A reason to come back",
            body: "Paper trading on its own got boring after a week. Rankings, prizes and short challenges gave people a reason to return every day.",
          },
          {
            title: "Depth when you want it",
            body: "Active traders wanted pro charts and data that confused beginners. The same screen had to work for both.",
          },
          {
            title: "Trading is social",
            body: "People talked about markets in other apps and shared screenshots of tickers. The conversation belonged next to the data.",
          },
        ],
      },
      {
        heading: "How I solved it",
        body: ["Each finding became a design decision, and together they shaped the product."],
        decisions: [
          {
            problem: "Data, news, community and practice lived in different apps.",
            solution: "One app with five tabs: Discover, Watchlist, Arena, Chat and Wallet. Arena sits in the middle.",
          },
          {
            problem: "Paper trading didn’t keep people coming back.",
            solution: "Arena turns practice into a game, with tournaments, 1-to-1 battles, leaderboards and real prizes of up to $30,000 a month, plus daily wins.",
          },
          {
            problem: "Beginners and pros needed different levels of detail.",
            solution: "Every ticker starts simple. Advanced charts, drawing tools and indicators are one tap away.",
          },
          {
            problem: "People missed the events that move markets.",
            solution: "Economic releases, earnings and dividends got their own screens, with live notifications for the companies people follow.",
          },
          {
            problem: "The conversation happened in other apps.",
            solution: "Chat inside the app. Type $BTC to get a live price card, share any ticker with a swipe, and react to news with a bull or a bear.",
          },
          {
            problem: "A product this big could look different on iOS and web.",
            solution: "A custom design system built on native iOS components, with the same styles and patterns used on the web.",
          },
        ],
      },
      {
        heading: "One app, five tabs",
        body: [
          "I turned the research into a simple structure with five tabs: Discover to follow markets, Watchlist for the assets you care about, Arena to compete, Chat to share ideas, and Wallet. Arena sits in the middle of the tab bar, because the trading games are what make Profit.com different.",
          "Wireframes and clickable prototypes let us test the main flows with users early, and get the leadership team aligned before anything went into development.",
        ],
        images: [
          { src: "/work/profit/discover-watchlist.webp", alt: "Discover and Watchlist screens on two phones", width: 973, height: 1211, frame: "card", caption: "Discover and Watchlist." },
          { alt: "Arena", frame: "phones", screens: [profit.arena], caption: "Arena: trading with virtual money." },
        ],
      },
      {
        heading: "Discover: all markets in one place",
        body: [
          "Discover is where people start their day. Stocks, crypto, indices and forex are in one view, with popular companies, a chart comparing how markets move, live index cards and the latest news below.",
          "It’s also where the premium content lives. The Weekly Brief, an in-depth look at the markets, opens right from Discover. Free users see what each plan includes (Rookie, Pro and Guru). After upgrading, they go straight to the brief, which has an audio player for listening on the go.",
        ],
        images: [
          { src: "/work/profit/weekly-brief-flow.webp", alt: "Flow from Discover to the subscription plans and the Weekly Brief player", width: 1828, height: 1070, frame: "plain", wide: true, caption: "From Discover to the Weekly Brief: the upgrade flow and the audio player." },
        ],
      },
      {
        heading: "Watchlist, tickers and advanced charts",
        body: [
          "The Watchlist shows every asset you follow in one list, with the price and daily change. Swipe a ticker to share it in a chat.",
          "Each ticker opens with the price chart, company profile, key stats, earnings, dividends and what analysts recommend, shown as one simple gauge. Price alerts let you know when an asset crosses a level you set.",
          "Experienced traders can open an advanced chart, vertical or horizontal, with candlesticks, drawing tools and indicators. From any ticker, Trade shows the tournaments where you can trade it.",
        ],
        images: [
          { alt: "Watchlist and ticker", frame: "phones", screens: [profit.watchlist, profit.ticker], wide: true, caption: "Watchlist and the ticker view with the analyst recommendation." },
          { src: "/work/profit/ticker-flow.webp", alt: "Ticker view leading to vertical and horizontal advanced charts and the Trade sheet", width: 2000, height: 910, frame: "plain", wide: true, caption: "From a ticker to advanced charts, and into a tournament with Trade." },
        ],
      },
      {
        heading: "Market events in real time",
        body: [
          "Markets move on events, so events got their own screens. Economic releases, earnings and dividends each show the expected impact, the previous, forecast and actual values, and a chart of how results compared with expectations over time.",
          "Notifications tell people about the important ones as they happen: economic events, earnings, and news and tweets about the companies they follow.",
        ],
        images: [
          { alt: "Economic event", frame: "phones", screens: [profit.economicEvent], caption: "An economic event: impact, forecast and actual." },
          { src: "/work/profit/event-charts.webp", alt: "Chart components for economic, earnings and dividend events", width: 2000, height: 1325, frame: "card", caption: "Charts for economic, earnings and dividend events." },
        ],
      },
      {
        heading: "Arena: trading games for everyone",
        body: [
          "Arena is where Profit.com becomes a game. It’s free to play, with real prizes. Players trade real market prices with virtual money in tournaments like Day Trading, Top Stocks, Crypto Gainz and Cash Kings, or challenge another player to a timed 1-to-1 battle for experience points. Leaderboards, prize pools, lives and a toolbox keep it competitive.",
          "Every card has a state for each moment: before a tournament opens, after you join but before your first trade (with a clear Open Trade button), during play with your live position, and in the last minute, when the timer turns red. A green dot on the Arena tab and a short highlight on the card show what changed while you were away.",
        ],
        images: [
          { src: "/work/profit/arena-phones.webp", alt: "Arena trading screen and Watchlist on two phones", width: 2000, height: 1088, frame: "float", wide: true, caption: "Trading in Arena, with the Watchlist one tap away." },
          { src: "/work/profit/arena-states.webp", alt: "All states of 1-to-1 battles and tournament cards", width: 2000, height: 1079, frame: "plain", wide: true, caption: "Every state of the 1-to-1 and tournament cards, with the rules behind them." },
        ],
      },
      {
        heading: "Communities and news",
        body: [
          "Trading is social, so chat is built in. Group chats understand tickers: type $BTC and a live price card shows up in the message. Anyone can start a trading community and invite people to a private room with a link.",
          "News channels bring in sources like BBC News and Bloomberg, and people react to each story with a bull or a bear. It’s a quick way to see how the community feels.",
        ],
        images: [
          { alt: "Chat", frame: "phones", screens: [profit.chatGroup, profit.newsFeed, profit.inviteLink], wide: true, caption: "Group chat with live tickers, a news channel and invite links." },
        ],
      },
      {
        heading: "A custom design system for iOS and web",
        body: [
          "With this much product, consistency had to be planned from day one. I built a custom design system for every platform: colours, type and spacing, components for lists, sheets, tabs and controls, and a set just for data, like charts, tooltips, price changes and market states.",
          "The iOS app was built with native iOS components, so I based the system on the native library. Our components build on what iOS already does well, which kept the app fast and familiar. The same styles and patterns carried over to the web.",
          "Bigger features like Arena got their own component sets, with every state and rule documented for the engineers.",
        ],
        images: [
          { src: "/work/profit/tournament-system.webp", alt: "Arena component set with leaderboard, rules, timers and image states", width: 2000, height: 360, frame: "plain", wide: true, caption: "Arena components: leaderboard, rules, timers, states and artwork, documented for engineering." },
        ],
      },
      {
        heading: "Impact",
        body: [
          "Profit.com launched as a native iOS app that brings market data, news, community and trading games together, the all-in-one app the research pointed to. Beginners can practise on real markets without risking money, and competitive players have a reason to come back every day.",
          "The research gave the leadership team a clear direction before development started. The design system gave product and engineering a shared language, so new features like tournaments and the Weekly Brief were built on what already existed, not from scratch.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "Designing for beginners and experienced traders at once is mostly about layers. Keep the first screen simple and friendly, and only show the depth, like advanced charts, indicators and event data, when someone asks for it.",
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
    overview: {
      problem:
        "Digma’s UI lives inside developers’ code editors, and it had been built screen by screen. The same things looked and worked differently, and every feature started almost from zero.",
      insight:
        "Developers trust tools that feel like part of their editor, and engineers were building most of the UI themselves. They needed a system they could use without waiting for a designer.",
      impact:
        "One design system and component library used by every developer, consistent UI from the first build, and a base that carried Digma into AI agents, before JetBrains acquired it.",
    },
    results: [
      { value: "1", label: "Design system for all IDE plugins and the web app" },
      { value: "5", label: "AI agents in the incident experience" },
      { value: "JetBrains", label: "Acquired Digma" },
    ],
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
          "Digma is a preemptive observability tool. It uses standard observability data to find performance and scaling problems in code before release, the kind tests miss, and shows them to developers where they work: in the IDE, while they code.",
          "So the UI lives in places designers rarely work with: narrow side panels, hints inside the code, and long lists of issues, inside editors that each have their own look.",
        ],
      },
      {
        heading: "The problem",
        body: [
          "Digma grew fast, and so did its interface. Screens were built one at a time, so the same pattern looked and worked differently from place to place, and every new feature started almost from zero.",
          "We needed one consistent system that engineers could use on their own, and that felt at home in every IDE Digma runs in.",
        ],
      },
      {
        heading: "My role",
        body: [
          "As Senior Product Designer, I owned the design system: the audit, the structure, the foundations and components, the documentation, and rolling it out to the developers. I also designed product features on top of it, including the AI agents experience.",
        ],
      },
      {
        heading: "Research and insights",
        body: [
          "I started with an audit. I put every screen from the IDE plugins and the web app side by side and grouped them by pattern. I also talked to the engineers who built the UI and looked at how developers used Digma inside their editors.",
        ],
        insights: [
          {
            title: "One pattern, many versions",
            body: "The audit found the same elements, like buttons, issue cards, tooltips and empty states, built again and again, each a bit different.",
          },
          {
            title: "It has to feel native",
            body: "Developers spend all day in their editor. Anything that looked out of place next to their code felt like noise, so the UI had to match the IDE.",
          },
          {
            title: "Space is tight",
            body: "Digma lives in narrow side panels and small hints. Every component had to stay readable when it’s small and full of information.",
          },
          {
            title: "Engineers build most of the UI",
            body: "Most screens were built directly by engineers. They needed clear components, with every variant and state, that they could use without a designer.",
          },
        ],
      },
      {
        heading: "How I solved it",
        body: ["Each finding from the audit became part of the system."],
        decisions: [
          {
            problem: "Inconsistent screens, built one at a time.",
            solution: "A design system built from the ground up. Foundations first, then core components, each documented with its variants and states.",
          },
          {
            problem: "Many issue types, each with its own layout.",
            solution: "One issue card that works for N+1 queries, bottlenecks, slow queries and errors. New issue types reuse it instead of starting over.",
          },
          {
            problem: "The UI had to feel at home in every IDE.",
            solution: "Components that follow the look of the editor around them, so Digma feels like part of the IDE and not a web page inside it.",
          },
          {
            problem: "Every new screen had to wait for design.",
            solution: "A reusable component library for the whole development team, so developers could build full screens from shared parts.",
          },
          {
            problem: "A new kind of product: AI agents.",
            solution: "The same system grew to cover agent timelines, chat, templates, directives and MCP connections, with no need for a new visual style.",
          },
        ],
      },
      {
        heading: "A custom design system",
        body: [
          "I designed the structure of the system from scratch: foundations like icons, typography and states, then core components like buttons, navigation, toasts and tooltips, each documented with its variants.",
          "With that in place, I fixed the biggest consistency problems across the product. The same thing now always looks and works the same way.",
        ],
        images: [
          { src: "/work/digma/ds-foundations.webp", alt: "Digma design system foundations: icons, typography, buttons, toasters, navigation and tooltips", width: 2000, height: 682, frame: "plain", wide: true, caption: "Foundations and core components, documented and versioned." },
          { src: "/work/digma/ds-insights.webp", alt: "Digma product components for insights, issues and errors", width: 1782, height: 1136, frame: "plain", wide: true, caption: "Product components: issue cards for N+1 queries, bottlenecks, slow queries and errors." },
        ],
      },
      {
        heading: "One library for every IDE",
        body: [
          "I turned the system into a reusable component library and introduced it to the whole development team. Developers could now build complete screens from shared parts that feel native in every IDE Digma supports, without waiting for a new design each time.",
        ],
        images: [
          { src: "/work/digma/ide-plugin.webp", alt: "Digma panel inside the IDE next to the code it analyses", width: 1920, height: 1080, frame: "plain", wide: true, caption: "Digma inside the IDE. Issues show up next to the code that causes them." },
        ],
      },
      {
        heading: "From issues to AI agents",
        body: [
          "The same system carried Digma into its next step: AI agents that investigate incidents. A team of agents (Watchman, Triage, Infra, Code Resolution and a Validator) works through an issue step by step, and developers can follow along, chat with them and see related issues.",
          "Teams decide how the agents work with templates, set rules with directives, and connect their own tools through MCP servers.",
        ],
        images: [
          { src: "/work/digma/incident-agents.webp", alt: "Incident view with AI agents working through an issue", width: 2000, height: 1311, frame: "plain", wide: true, caption: "An incident being investigated, passed from agent to agent." },
          { src: "/work/digma/incident-template.webp", alt: "Template for the incident agent flow", width: 2000, height: 1311, frame: "plain", caption: "Templates set the agent flow." },
          { src: "/work/digma/directives.webp", alt: "Directives table with conditions and rules", width: 2000, height: 1311, frame: "plain", caption: "Directives add team rules." },
          { src: "/work/digma/mcp-server.webp", alt: "Dialog for adding an MCP server and choosing its tools", width: 1270, height: 1288, frame: "card", caption: "Connecting tools through MCP servers." },
          { src: "/work/digma/wizard.webp", alt: "Setup wizard with a code snippet", width: 1270, height: 1230, frame: "card", caption: "A setup wizard for integrations." },
        ],
      },
      {
        heading: "Impact",
        body: [
          "Design and engineering worked from the same source. New UI was consistent from the first build, and developers stopped rebuilding the same patterns. New features were put together from shared parts instead of waiting for new designs.",
          "The system was flexible enough to take Digma from code issues to AI agents that investigate incidents. Digma was later acquired by JetBrains.",
        ],
      },
      {
        heading: "What I learned",
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
