import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Standalone concept pages, shared by direct link, are their own Vercel project.
  // This gives them an address under ioncazac.com/concepts without making them part
  // of the portfolio: no page, menu or sitemap entry here points to them.
  async rewrites() {
    return [
      {
        source: "/concepts/:path*",
        destination: "https://ioncazac-concepts.vercel.app/:path*",
      },
    ];
  },
};

export default nextConfig;
