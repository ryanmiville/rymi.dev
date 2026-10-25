import type { Note } from "../content";
import { PenArrow, ProjectIcon } from "./sketches";

export default function NotePreview({
  note,
  index,
}: {
  note: Note;
  index: number;
}) {
  return (
    <a className="note-preview" href={note.path}>
      <div className="preview-top">
        <ProjectIcon name={note.icon} />
        {note.draft && <span className="preview-draft micro">Draft</span>}
        <span className="micro">
          {note.draft && "Draft · "}
          {String(index + 1).padStart(2, "0")} /{" "}
          {note.topic === "Projects" ? note.kind : note.topic}
        </span>
      </div>
      <h3>
        {note.title}
        <span className="sketch-arrow">
          <PenArrow />
        </span>
      </h3>
      <p>{note.description}</p>
    </a>
  );
}
