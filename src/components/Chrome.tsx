import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";
import { publicLinks, site } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-wrap header-inner">
        <Link href="/" className="home-link">
          Home
        </Link>
        <span className="mark">{site.name}</span>
        <nav aria-label="Primary">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  const links = publicLinks();

  return (
    <footer className="site-footer">
      <div className="site-wrap footer-inner">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="footer-links">
          {links.length > 0 ? <SocialLinks /> : null}
          <Link href="/about#message">Message</Link>
        </div>
      </div>
    </footer>
  );
}
