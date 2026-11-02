// Everything about you that appears on the homepage lives here.
// Edit the text between the quotes and save - the site updates automatically.

export const profile = {
  name: "Ion Cazac",
  // Same title as the CV, used in the intro, browser tabs, link previews and
  // structured data. Keep it in step with the CV.
  title: "Senior Product Designer · AI-Native Product Builder",
  greeting: "Hi, I’m Ion",
  tagline: "design → code → deliver",
  intro:
    "I turn messy B2B products into simple, AI-native ones, and ship them in code. 12+ years across mobility, fintech and developer tools, most recently as an AI-native product builder at Flovi. Product designer, owner, mentor and early AI adopter. Red Dot Award 2024.",
  // The line under the intro; the first item gets a green "available" dot.
  status: ["Available now", "B2B contract or full-time", "EU citizen", "Remote EU / US or relocation in the EU"],
  email: "hi@ioncazac.com",
  availability: "Available now for B2B contracts or full-time roles. Remote EU / US, or relocation in the EU.",
  recommendationsUrl: "https://www.linkedin.com/in/ion-cazac/details/recommendations/",
  linkedin: "https://www.linkedin.com/in/ion-cazac/",
  // Your CV lives in /public. Replace that file to update the Download CV button.
  cv: "/Ion-Cazac-CV.pdf",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ion-cazac/" },
    { label: "Dribbble", href: "https://dribbble.com/yvancross" },
    { label: "GitHub", href: "https://github.com/ionuiux" },
  ],
};

export const awards = [
  { name: "Red Dot Award", detail: "2024" },
  { name: "MUSE Design Awards", detail: "Best Fintech Product" },
  { name: "Awwwards", detail: "Nominee" },
];

// Logos in the slowly scrolling strip under the intro. Files live in /public/logos/.
// `width` and `height` are the SVG's own size; `display` is how tall it
// appears on desktop (in px), tuned so every logo looks about the same size.
// The share image (opengraph-image.tsx) shows only the first six.
export const clients = [
  { name: "Flovi", logo: "/logos/flovi.svg", width: 63, height: 22, display: 28 },
  { name: "Profit.com", logo: "/logos/profit.svg", width: 113, height: 26, display: 26 },
  { name: "Envato", logo: "/logos/envato.svg", width: 112, height: 25, display: 24 },
  { name: "Digital Silk", logo: "/logos/digital-silk.svg", width: 124, height: 24, display: 22 },
  { name: "Michelin", logo: "/logos/michelin.svg", width: 126, height: 13, display: 15 },
  { name: "Red Bull", logo: "/logos/redbull.svg", width: 83, height: 19, display: 24 },
  { name: "Digma", logo: "/logos/digma.svg", width: 127, height: 33, display: 28 },
  { name: "ORB Innovations", logo: "/logos/orb.svg", width: 305, height: 101, display: 34 },
  { name: "pyck", logo: "/logos/pyck.svg", width: 82, height: 32, display: 28 },
  { name: "UNDP", logo: "/logos/undp.svg", width: 479, height: 237, display: 36 },
  { name: "ShareVision", logo: "/logos/sharevision.svg", width: 189, height: 40, display: 28 },
];

// Recommendations from LinkedIn. Photos live in /public/people/, company
// logos in /public/companies/. Each name links to profile.recommendationsUrl.
export const testimonials: {
  quote: string;
  name: string;
  role: string;
  company: string;
  photo: string;
  logo: string;
}[] = [
  {
    quote:
      "He’s not just a designer - you get a strategic partner, a systems thinker, and someone who deeply cares about delivering meaningful experiences.",
    name: "Roni Dover",
    role: "CTO & Co-Founder at",
    company: "Digma",
    photo: "/people/roni-dover.jpg",
    logo: "/companies/digma.jpg",
  },
  {
    quote:
      "Ion joined ORB as our first UX Designer. He’s got a real talent for making complex stuff simple and user-friendly.",
    name: "Thomas Quinn",
    role: "CTO & Co-Founder",
    company: "ORB Innovations",
    photo: "/people/thomas-quinn.jpg",
    logo: "/companies/orb.jpg",
  },
  {
    quote: "Ion not only grasped my concept but also took it to the next level.",
    name: "Daniel Björk",
    role: "CEO & Founder",
    company: "Reviall",
    photo: "/people/daniel-bjork.jpg",
    logo: "/companies/reviall.jpg",
  },
  {
    quote: "I wish there were more designers like Ion in this industry. Positive, loyal, innovative, the list goes on.",
    name: "Dan Taub",
    role: "Lead Designer",
    company: "Gala Games",
    photo: "/people/dan-taub.jpg",
    logo: "/companies/gala.jpg",
  },
  {
    quote: "I found him to be both professional and reliable, which made him a pleasure to work with.",
    name: "Gabriel Shaoolian",
    role: "CEO & Founder",
    company: "Digital Silk",
    photo: "/people/gabriel-shaoolian.jpg",
    logo: "/companies/digital-silk.jpg",
  },
];

// Recent roles, each with a one-line result. Keep these in step with the CV.
export const experience = [
  {
    company: "Flovi",
    role: "AI-Native Product Designer",
    location: "Helsinki · Hybrid · Full-time",
    dates: "2025 – 2026",
    outcome: "Unified the customer portal across 4 markets: +30% customers and 20% faster booking. Designed an AI-native driver app and led launches in 2 new countries.",
  },
  {
    company: "pyck",
    role: "Senior Product Designer",
    location: "EMEA · Remote · Contract, part-time",
    dates: "2024 – 2026",
    outcome: "End-to-end product design and design leadership.",
  },
  {
    company: "Digma",
    role: "Senior Product Designer",
    location: "San Francisco · Remote · Full-time",
    dates: "2024 – 2025",
    outcome: "Built the design system used across all IDE plugins and the web app, and designed the AI agents experience. Acquired by JetBrains.",
  },
  {
    company: "Profit.com",
    role: "Senior Product Designer",
    location: "Chișinău · Hybrid · Full-time",
    dates: "2022 – 2024",
    outcome: "Designed the iOS and web trading app and Arena, a trading game with prizes of up to $30,000 a month.",
  },
  {
    company: "ORB Innovations",
    role: "Senior Product Designer",
    location: "London · Remote · Contract",
    dates: "2023",
    outcome: "First UX designer: designed the app for a smart mouthguard that tracks 20+ metrics.",
  },
  {
    company: "Reviall",
    role: "Senior Product Designer",
    location: "Sweden · Remote · Contract",
    dates: "2023",
    outcome: "Designed real-time reporting dashboards for the drilling industry.",
  },
  {
    company: "ShareVision",
    role: "Product Designer",
    location: "London · Remote · Full-time",
    dates: "2021 – 2022",
    outcome: "Designed case-management workflows and dashboards for social services.",
  },
  {
    company: "Digital Silk",
    role: "UX Designer",
    location: "Miami · Remote · Full-time",
    dates: "2020 – 2021",
    outcome: "Redesigned the G Pen e-commerce site: sales and retention up almost 40%.",
  },
];

// Older roles, shown folded away under "Earlier experience".
export const earlierExperience = [
  { company: "Utilities One", role: "Lead Designer", dates: "2019 – 2020" },
  { company: "US Energy Solutions", role: "Product Designer", dates: "2019 – 2020" },
  { company: "UNDP", role: "Creative Designer", dates: "2018" },
  { company: "Envato", role: "UX Designer", dates: "2015 – 2017" },
  { company: "Overdrive", role: "Product Designer", dates: "2015 – 2017" },
  { company: "RTDS", role: "Creative Product Designer", dates: "2014 – 2019" },
];
