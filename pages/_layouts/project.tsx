import Layout from "../layout";
import { useFrontmatter } from "@void/md";
import type { ReactNode } from "react";
import { dateLabel, projects } from "../../src/content";
import { PenArrow, ProjectIcon } from "../../src/components/sketches";

export default function ProjectLayout({ children }: { children: ReactNode }) {
  const fm = useFrontmatter();
  const index = projects.findIndex(
    (project) => project.path === `/projects/${String(fm.slug)}`,
  );
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return (
    <Layout>
      <article className="project-page">
        <a className="breadcrumb" href="/projects">
          <PenArrow back /> All projects <span>/</span>{" "}
          {String(fm.kind ?? "Project")}
        </a>
        <header className="project-heading">
          <div>
            <span className="eyebrow">
              {String(fm.category ?? "Side project")}
            </span>
            <h1 className="page-title">{String(fm.title)}</h1>
            <p className="dek">{String(fm.description)}</p>
          </div>
          <ProjectIcon name={String(fm.icon)} />
        </header>
        <div className="project-meta">
          <div>
            <span className="micro">Made</span>
            {dateLabel(String(fm.date))}
          </div>
          {Boolean(fm.status) && (
            <div>
              <span className="micro">Status</span>
              {String(fm.status)}
            </div>
          )}
          <div>
            <span className="micro">Explore</span>
            <a className="text-link" href={project.repoURL}>
              Source on GitHub <PenArrow />
            </a>
          </div>
          {project.demoURL && (
            <div>
              <span className="micro">Try it</span>
              <a className="text-link" href={project.demoURL}>
                Open the app <PenArrow />
              </a>
            </div>
          )}
        </div>
        <div className="prose void-md">{children}</div>
        {next && (
          <a className="next-project" href={next.path}>
            <div>
              <span className="micro">Next project</span>
              <h2>{next.title}</h2>
            </div>
            <span className="sketch-arrow">
              <PenArrow />
            </span>
          </a>
        )}
      </article>
    </Layout>
  );
}
