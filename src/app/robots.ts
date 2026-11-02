import type { MetadataRoute } from "next";

// Served at ioncazac.com/robots.txt: every crawler, AI tools included, may read
// the whole site, and this is where they find the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://ioncazac.com/sitemap.xml",
  };
}
