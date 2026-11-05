// Eight of the strongest Dribbble shots, laid out so each row pairs a website
// (left) with a mobile app (right). Clicking one opens it large on this site
// (src/components/artwork-gallery.tsx); only "See all on Dribbble" links away.
// Images live in /public/artworks/: `src` is the 1200×900 grid crop, `full`
// the whole shot as uploaded (up to 2000px wide) for the enlarged view.

export const dribbbleUrl = "https://dribbble.com/yvancross";

export type Artwork = {
  title: string;
  src: string;
  full: { src: string; width: number; height: number };
};

export const artworks: Artwork[] = [
  { title: "Skyline Estates - Dubai Real Estate Website", src: "/artworks/skyline-estates.webp", full: { src: "/artworks/full/skyline-estates.webp", width: 2000, height: 1278 } },
  { title: "Ourra EV - Mobile App", src: "/artworks/ourra-ev.webp", full: { src: "/artworks/full/ourra-ev.webp", width: 1600, height: 1000 } },
  { title: "Northvale - Website", src: "/artworks/northvale-website.webp", full: { src: "/artworks/full/northvale-website.webp", width: 1600, height: 1000 } },
  { title: "Northvale - Mobile App", src: "/artworks/northvale-mobile.webp", full: { src: "/artworks/full/northvale-mobile.webp", width: 1600, height: 1000 } },
  { title: "Flovi - Live Fleet Dashboard for 4 Markets", src: "/artworks/flovi-dashboard.webp", full: { src: "/artworks/full/flovi-dashboard.webp", width: 1600, height: 1200 } },
  { title: "Play Trade & Win - Mobile App", src: "/artworks/play-trade-win.webp", full: { src: "/artworks/full/play-trade-win.webp", width: 2000, height: 1500 } },
  { title: "armo - Website", src: "/artworks/armo.webp", full: { src: "/artworks/full/armo.webp", width: 2000, height: 1500 } },
  { title: "Omikami - Mobile App", src: "/artworks/omikami.webp", full: { src: "/artworks/full/omikami.webp", width: 2000, height: 1185 } },
];
