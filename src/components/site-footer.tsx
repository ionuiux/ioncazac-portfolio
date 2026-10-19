import { profile } from "@/content/profile";

// Cached at build time, so the year updates whenever the site is redeployed.
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer id="contact" className="border-t border-line px-4 pt-24 pb-10 text-center sm:px-6">
      <h2 className="text-4xl font-medium tracking-tight sm:text-6xl">Get in touch</h2>
      <p className="mx-auto mt-4 max-w-md text-[17px] text-muted text-balance">
        {profile.availability}
      </p>
      <a
        href={`mailto:${profile.email}`}
        className="mt-8 inline-block text-2xl font-medium tracking-tight underline decoration-2 underline-offset-[6px] transition-colors hover:text-muted sm:text-4xl"
      >
        {profile.email}
      </a>
      <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px]">
        {profile.links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-foreground"
            >
              {link.label} ↗
            </a>
          </li>
        ))}
      </ul>
      <div className="mx-auto mt-24 flex max-w-7xl items-center justify-between text-[12px] text-muted">
        <p>© {year} {profile.name}. All rights reserved.</p>
        <a href="#top" className="hover:text-foreground">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
