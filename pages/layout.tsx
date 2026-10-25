import type { ReactNode } from "react";
import { useFrontmatter } from "@void/md";
import { Star } from "../src/components/drawings";
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
        <nav className="site-nav" aria-label="Main navigation">
          <a href="/" aria-current={fm.section === "home" ? "page" : undefined}>
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
      </header>
      <main className="shell" id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer shell">
        <div className="footer-signature">
          <p>Software, music & art.</p>
          <span className="micro">Ryan Miville</span>
        </div>
        <div className="footer-right">
          <label className="appearance-control">
            <span className="visually-hidden">Appearance</span>
            <select
              id="appearance"
              defaultValue="system"
              aria-label="Appearance"
            >
              <option value="system">System theme</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>
      </footer>
    </div>
  );
}
