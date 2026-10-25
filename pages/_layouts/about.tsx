import Layout from "../layout";
import type { ReactNode } from "react";
import { PenArrow } from "../../src/components/sketches";
import Experience from "../../src/components/experience";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <article className="about-page">
        <h1 className="page-title">
          A bit
          <br />
          <em>about me.</em>
        </h1>
        <div className="prose void-md about-copy">{children}</div>
        <section className="about-experience" aria-labelledby="experience">
          <div className="section-top">
            <h2 id="experience">Along the way</h2>
            <a className="text-link" href="/work">
              Work history <PenArrow />
            </a>
          </div>
          <Experience />
        </section>
        <section className="about-contact" aria-labelledby="contact">
          <h2 id="contact">Find me elsewhere</h2>
          <div className="contact-links">
            <a className="text-link" href="https://github.com/ryanmiville">
              GitHub <PenArrow />
            </a>
            <a
              className="text-link"
              href="https://www.linkedin.com/in/ryan-miville-00160248"
            >
              LinkedIn <PenArrow />
            </a>
            <a className="text-link" href="mailto:ryanmiville@gmail.com">
              Email <PenArrow />
            </a>
          </div>
        </section>
      </article>
    </Layout>
  );
}
