import { projects } from "../../src/content";
import ProjectArchive from "../../src/components/project-archive" with {
  island: "load",
};

export const frontmatter = { section: "projects" };

export default function Projects() {
  return (
    <>
      <header className="archive-head">
        <div>
          <span className="eyebrow">Side projects & open source</span>
          <h1 className="page-title">
            Things
            <br />
            <em>I’ve made.</em>
          </h1>
        </div>
        <p>
          Command-line tools, libraries, and a little music. A collection of my
          side projects.
        </p>
      </header>
      <ProjectArchive projects={projects} />
    </>
  );
}
