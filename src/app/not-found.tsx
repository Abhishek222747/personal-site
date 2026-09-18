import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-wrap page-head">
      <p className="kicker">404</p>
      <h1>That page is not here.</h1>
      <p>
        Try the <Link href="/">home page</Link>,{" "}
        <Link href="/writing">writing</Link>,{" "}
        <Link href="/projects">projects</Link>, or{" "}
        <Link href="/about">about</Link>.
      </p>
    </div>
  );
}
