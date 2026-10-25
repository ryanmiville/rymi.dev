import type { ReactNode } from "react";
import { useFrontmatter } from "@void/md";
import { Star } from "../src/components/drawings";
import Appearance from "../src/components/appearance";
import "../src/styles/site.css";

export default function Layout({ children }: { children: ReactNode }) {
  const fm = useFrontmatter();
  return (
    <div className="site-frame">
      <a className="skip" href="#main-content">
        Skip to content
      </a>
      <header className="site-header shell">
        <a className="wordmark" href="/" aria-label="Ryan Miville, home">
          <Star />
          <span>Ryan Miville</span>
        </a>
        <div className="header-actions">
          <nav className="site-nav" aria-label="Main navigation">
            <a
              href="/"
              aria-current={fm.section === "home" ? "page" : undefined}
            >
              Home
            </a>
            <a
              href="/notes"
              aria-current={fm.section === "notes" ? "page" : undefined}
            >
              Notes
            </a>
            <a
              href="/about"
              aria-current={fm.section === "about" ? "page" : undefined}
            >
              About
            </a>
          </nav>
          <Appearance />
        </div>
      </header>
      <main className="shell" id="main-content" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
