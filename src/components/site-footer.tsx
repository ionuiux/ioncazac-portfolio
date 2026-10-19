import { profile } from "@/content/profile";

// Cached at build time, so the year updates whenever the site is redeployed.
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer id="contact" className="border-t border-line pt-24 pb-10 text-center">
      <h2 className="text-4xl font-medium tracking-tight sm:text-6xl">Get in touch</h2>
      <p className="mt-4 text-[17px] text-muted text-balance sm:whitespace-nowrap">
        {profile.availability}
      </p>
      <a
        href={`mailto:${profile.email}`}
        className="link-line mt-8 inline-block text-2xl font-medium tracking-tight [--line:2px] sm:text-4xl"
      >
        {profile.email}
      </a>
      <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
        {profile.links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="link-button"
            >
              {link.label} ↗
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-24 flex items-center justify-between text-[12px] text-muted">
        <p>© {year} {profile.name}. All rights reserved.</p>
        <a href="#top" className="link-button">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
