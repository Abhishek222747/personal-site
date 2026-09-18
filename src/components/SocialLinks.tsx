import Link from "next/link";
import { publicLinks } from "@/lib/site";

export function SocialLinks({ className }: { className?: string }) {
  const links = publicLinks();
  if (links.length === 0) return null;

  return (
    <nav className={className} aria-label="Profiles and resume">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("/") ? undefined : "_blank"}
          rel={link.href.startsWith("/") ? undefined : "noreferrer"}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
