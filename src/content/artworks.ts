// The strongest Dribbble shots, newest first, laid out three to a row (two on
// phones) so websites and mobile apps take turns. Keep the count a multiple
// of 6 so the last row is full in both layouts. Clicking one opens it large
// on this site (src/components/artwork-gallery.tsx); only "See all on Dribbble"
// links away. Images live in /public/artworks/: `src` is the 1200×900 grid
// crop, `full` the whole shot (up to 2000px wide) for the enlarged view.

export const dribbbleUrl = "https://dribbble.com/yvancross";

export type Artwork = {
  title: string;
  src: string;
  full: { src: string; width: number; height: number };
};

export const artworks: Artwork[] = [
  { title: "Red Bull - Homepage Redesign", src: "/artworks/red-bull-redesign.webp", full: { src: "/artworks/full/red-bull-redesign.webp", width: 2000, height: 1500 } },
  { title: "Flovi - Driver App", src: "/artworks/flovi-driver-app.webp", full: { src: "/artworks/full/flovi-driver-app.webp", width: 1600, height: 1200 } },
  { title: "pyck - Website", src: "/artworks/pyck-website.webp", full: { src: "/artworks/full/pyck-website.webp", width: 2000, height: 1500 } },
  { title: "Ourra EV - Mobile App", src: "/artworks/ourra-ev.webp", full: { src: "/artworks/full/ourra-ev.webp", width: 1600, height: 1000 } },
  { title: "Skyline Estates - Dubai Real Estate Website", src: "/artworks/skyline-estates.webp", full: { src: "/artworks/full/skyline-estates.webp", width: 2000, height: 1278 } },
  { title: "Northvale - Mobile App", src: "/artworks/northvale-mobile.webp", full: { src: "/artworks/full/northvale-mobile.webp", width: 1600, height: 1000 } },
  { title: "Northvale - Website", src: "/artworks/northvale-website.webp", full: { src: "/artworks/full/northvale-website.webp", width: 1600, height: 1000 } },
  { title: "Play Trade & Win - Mobile App", src: "/artworks/play-trade-win.webp", full: { src: "/artworks/full/play-trade-win.webp", width: 2000, height: 1500 } },
  { title: "Flovi - Live Fleet Dashboard for 4 Markets", src: "/artworks/flovi-dashboard.webp", full: { src: "/artworks/full/flovi-dashboard.webp", width: 1600, height: 1200 } },
  { title: "Omikami - Mobile App", src: "/artworks/omikami.webp", full: { src: "/artworks/full/omikami.webp", width: 2000, height: 1185 } },
  { title: "armo - Website", src: "/artworks/armo.webp", full: { src: "/artworks/full/armo.webp", width: 2000, height: 1500 } },
  { title: "Darqube - Mobile App", src: "/artworks/darqube-mobile.webp", full: { src: "/artworks/full/darqube-mobile.webp", width: 2000, height: 1500 } },
];
