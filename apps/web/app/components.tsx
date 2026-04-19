import Link from "next/link";
import type { Route } from "next";
import type { ReactNode } from "react";

export function AppHeader() {
  const links: Array<{ href: Route; label: string }> = [
    { href: "/", label: "Home" },
    { href: "/onboarding", label: "Onboarding" },
    { href: "/recommendations", label: "Recommendations" },
    { href: "/watchboard", label: "Watchboard" },
    { href: "/digest", label: "Digest" }
  ];

  return (
    <header className="site-header">
      <Link href="/" className="brand-mark">
        Ani Manager
      </Link>
      <nav className="site-nav" aria-label="Primary">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function PageIntro(props: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  align?: "default" | "compact";
}) {
  return (
    <section className={`page-intro${props.align === "compact" ? " page-intro-compact" : ""}`}>
      <div className="eyebrow">{props.eyebrow}</div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      {props.actions ? <div className="hero-actions">{props.actions}</div> : null}
    </section>
  );
}

export function Panel(props: {
  title: string;
  kicker?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={`panel${props.className ? ` ${props.className}` : ""}`}>
      {props.kicker ? <div className="panel-kicker">{props.kicker}</div> : null}
      <div className="panel-title">{props.title}</div>
      {props.children}
    </article>
  );
}

export function StatusBadge(props: { status: string }) {
  return <span className={`status-badge status-${props.status}`}>{props.status}</span>;
}
