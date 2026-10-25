import Layout from "../layout";
import { useFrontmatter } from "@void/md";
import type { ReactNode } from "react";
import { dateLabel } from "../../src/content";
import { PenArrow } from "../../src/components/sketches";

export default function NoteLayout({ children }: { children: ReactNode }) {
  const fm = useFrontmatter();
  return (
    <Layout>
      <article className="article-page">
        <header className="article-head">
          <a className="breadcrumb" href="/notes">
            <PenArrow back /> All notes
          </a>
          <h1 className="page-title">{String(fm.title)}</h1>
          {Boolean(fm.description) && (
            <p className="dek">{String(fm.description)}</p>
          )}
          <div className="meta">
            <span className="micro">{dateLabel(String(fm.date))}</span>
            <span className="micro">Ryan Miville</span>
          </div>
        </header>
        <div className="article-divider" />
        <div className="prose void-md">{children}</div>
        <div className="article-end">
          <a className="text-link" href="/notes">
            <PenArrow back /> Back to the notebook
          </a>
          <a className="text-link" href="mailto:ryanmiville@gmail.com">
            Say hello <PenArrow />
          </a>
        </div>
      </article>
    </Layout>
  );
}
