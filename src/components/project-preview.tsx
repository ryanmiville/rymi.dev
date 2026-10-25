import type { Project } from "../content";
import { PenArrow, ProjectIcon } from "./sketches";

export default function ProjectPreview({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <a className="project-preview" href={project.path}>
      <div className="preview-top">
        <ProjectIcon name={project.icon} />
        <span className="micro">
          {String(index + 1).padStart(2, "0")} / {project.kind}
        </span>
      </div>
      <h3>
        {project.title}
        <span className="sketch-arrow">
          <PenArrow />
        </span>
      </h3>
      <p>{project.description}</p>
    </a>
  );
}
