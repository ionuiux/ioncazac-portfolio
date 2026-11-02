# ioncazac.com

The source of [ioncazac.com](https://ioncazac.com), the portfolio of Ion Cazac, Senior Product Designer · AI-Native Product Builder. I designed it and built it in code with AI (Claude Code).

- **Stack:** Next.js 16 (App Router), Tailwind CSS 4, TypeScript, hosted on Vercel.
- **Content as data:** every case study, role and recommendation lives in `src/content/`, and the pages are built from it.
- **Readable by AI tools:** schema.org Person data, a plain-text CV at `/cv`, `llms.txt`, a sitemap and `robots.txt`.
- **Details:** smooth scrolling with Lenis, tiles that fade in on scroll, a looping logo strip, and an Open Graph image generated in code. Motion is turned off for people who prefer reduced motion.

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
