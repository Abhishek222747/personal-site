import Link from "next/link";
import { Logo } from "@/components/Logo";
import { SocialLinks } from "@/components/SocialLinks";
import { publicLinks, site } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-wrap header-inner">
        <Link href="/" className="brand" aria-label={`${site.name} home`}>
          <Logo />
        </Link>
        <nav aria-label="Primary">
          <Link href="/">Home</Link>
          <Link href="/#about">About</Link>
          <Link href="/writing">Writing</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/#contact">Contact</Link>
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
        <p>Designed and developed by {site.name}</p>
        <div className="footer-links">
          {links.length > 0 ? <SocialLinks /> : null}
          <Link href="/#contact">Message</Link>
        </div>
      </div>
    </footer>
  );
}
