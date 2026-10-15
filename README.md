# ioncazac.com

Ion Cazac's portfolio, built with Next.js and Tailwind CSS. It is hosted on Vercel.

## Where to edit things

| What | File |
| --- | --- |
| Intro, email, links, clients, testimonials, experience | `src/content/profile.ts` |
| Case studies (text, metadata, images) | `src/content/case-studies.ts` |
| Your photo | `public/ion.jpg` |
| Case study images | `public/work/<slug>/…` |

### Adding a case study

1. Copy one of the entries in `src/content/case-studies.ts` and give it a new `slug` (this becomes the URL: `/work/<slug>`).
2. Put its images in `public/work/<slug>/` and reference them as `/work/<slug>/image.jpg`.
3. Set `cover` to the main image. Until you do, a coloured placeholder is shown.

## Running it on your Mac

```bash
nvm use 22
npm install
npm run dev
```

Then open http://localhost:3000.
