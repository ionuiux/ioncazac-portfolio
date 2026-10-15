// Everything about you that appears on the homepage lives here.
// Edit the text between the quotes and save — the site updates automatically.

export const profile = {
  name: "Ion Cazac",
  title: "Senior Product Designer",
  greeting: "Hi, I’m Ion",
  tagline: "design → code → deliver",
  intro:
    "I design, code and deliver digital products, owning them from first idea to launch. 10+ years across mobility, logistics, fintech and developer tools — most recently leading an AI-native driver app and a company-wide design system at Flovi across four markets. I mentor designers and I’m an early AI adopter, bringing AI into how teams design and build. EU based, working with teams across Europe and the US.",
  email: "hi@ioncazac.com",
  availability: "Open to senior product design roles — remote, hybrid or on-site.",
  recommendationsUrl: "https://www.linkedin.com/in/ion-cazac/details/recommendations/",
  linkedin: "https://www.linkedin.com/in/ion-cazac/",
  // Your CV lives in /public. Replace that file to update it.
  cv: "/Ion-Cazac-CV.pdf",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ion-cazac/" },
    { label: "Dribbble", href: "https://dribbble.com/yvancross" },
    {
      label: "Figma demos",
      href: "https://www.figma.com/design/OYIERKnZrp3LLdesaW68BV/Demo?node-id=46-46922",
    },
  ],
};

// Logos shown under the intro. Files live in /public/logos/.
// `width` and `height` are the SVG's own size; `display` is how tall it
// appears on desktop (in px), tuned so every logo looks about the same size.
export const clients = [
  { name: "Flovi", logo: "/logos/flovi.svg", width: 63, height: 22, display: 28 },
  { name: "Profit.com", logo: "/logos/profit.svg", width: 113, height: 26, display: 26 },
  { name: "Envato", logo: "/logos/envato.svg", width: 112, height: 25, display: 24 },
  { name: "Digital Silk", logo: "/logos/digital-silk.svg", width: 124, height: 24, display: 22 },
  { name: "Michelin", logo: "/logos/michelin.svg", width: 126, height: 13, display: 15 },
  { name: "Red Bull", logo: "/logos/redbull.svg", width: 83, height: 19, display: 24 },
];

// Recommendations from LinkedIn. Photos live in /public/people/.
// `href` is the person's own LinkedIn profile.
export const testimonials: {
  quote: string;
  name: string;
  role: string;
  company?: string;
  photo: string;
  href: string;
}[] = [
  {
    quote:
      "He’s not just a designer — you get a strategic partner, a systems thinker, and someone who deeply cares about delivering meaningful experiences.",
    name: "Roni Dover",
    role: "Managed Ion at",
    company: "Digma",
    photo: "/people/roni-dover.jpg",
    href: "https://www.linkedin.com/in/ronidover/",
  },
  {
    quote:
      "Ion joined ORB as our first UX Designer. He’s got a real talent for making complex stuff simple and user-friendly.",
    name: "Thomas Quinn",
    role: "CTO & Co-Founder",
    company: "ORB Innovations",
    photo: "/people/thomas-quinn.jpg",
    href: "https://www.linkedin.com/in/thomasquinn93/",
  },
  {
    quote: "Ion not only grasped my concept but also took it to the next level.",
    name: "Daniel Björk",
    role: "CEO & Founder",
    company: "Reviall",
    photo: "/people/daniel-bjork.jpg",
    href: "https://www.linkedin.com/in/daniel-bj%C3%B6rk-2a4295149/",
  },
  {
    quote: "Any web, including responsive version, and mobile, specifically iOS apps are treated like a piece of art by Ion.",
    name: "Vadim Armăsaru",
    role: "Project Coordination & Operations",
    photo: "/people/vadim-armasaru.jpg",
    href: "https://www.linkedin.com/in/vadimarmasaru/",
  },
  {
    quote: "I wish there were more designers like Ion in this industry. Positive, loyal, innovative, the list goes on.",
    name: "Dan Taub",
    role: "Lead Designer",
    company: "Gala Games",
    photo: "/people/dan-taub.jpg",
    href: "https://www.linkedin.com/in/dantaub/",
  },
  {
    quote: "Each time the client was extremely happy and impressed with Ion’s work.",
    name: "Jamie Maloney",
    role: "VP, Client Partner",
    company: "Digital Silk",
    photo: "/people/jamie-maloney.jpg",
    href: "https://www.linkedin.com/in/jamiemaloneymba/",
  },
  {
    quote: "I found him to be both professional and reliable, which made him a pleasure to work with.",
    name: "Gabriel Shaoolian",
    role: "CEO & Founder",
    company: "Digital Silk",
    photo: "/people/gabriel-shaoolian.jpg",
    href: "https://www.linkedin.com/in/gabrielshaoolian/",
  },
  {
    quote: "More than just a UX graphics designer. Product oriented, always learning and polishing his skills.",
    name: "Terentie Carp",
    role: "IT Delivery Manager",
    photo: "/people/terentie-carp.jpg",
    href: "https://www.linkedin.com/in/terrencecarp/",
  },
];

export const experience = [
  { company: "Flovi", role: "Senior Product Designer", location: "Helsinki, Hybrid", dates: "2025 – 2026" },
  { company: "pyck", role: "Senior Product Designer", location: "EMEA, Contract", dates: "2024 – 2026" },
  { company: "Digma", role: "Senior Product Designer", location: "San Francisco, Remote", dates: "2024 – 2025" },
  { company: "ORB Innovations", role: "Senior Product Designer", location: "London, Contract", dates: "2023" },
  { company: "Reviall", role: "Senior Product Designer", location: "Sweden, Contract", dates: "2023" },
  { company: "Profit.com", role: "Senior Product Designer", location: "Chișinău, Hybrid", dates: "2022 – 2024" },
  { company: "ShareVision", role: "Product Designer", location: "London, Remote", dates: "2021 – 2022" },
  { company: "Digital Silk", role: "User Experience Designer", location: "Miami, Remote", dates: "2020 – 2021" },
  { company: "Utilities One", role: "Lead Designer", location: "New Jersey, Remote", dates: "2019 – 2020" },
  { company: "US Energy Solutions", role: "Product Designer", location: "Philadelphia, Remote", dates: "2019 – 2020" },
  { company: "UNDP", role: "Creative Designer", location: "Remote", dates: "2018" },
  { company: "Envato", role: "User Experience Designer", location: "Remote", dates: "2015 – 2017" },
  { company: "Overdrive", role: "Product Designer", location: "Full time", dates: "2015 – 2017" },
  { company: "RTDS", role: "Creative Product Designer", location: "Hybrid", dates: "2014 – 2019" },
];
