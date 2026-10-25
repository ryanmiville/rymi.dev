import { dateLabel, notes } from "../../src/content";
import { MarginLoop, Outline, PenArrow } from "../../src/components/sketches";

export const frontmatter = { section: "notes" };

export default function Notes() {
  return (
    <>
      <header className="archive-head">
        <div>
          <span className="eyebrow">Software, music & art</span>
          <h1 className="page-title">
            In the
            <br />
            <em>margins.</em>
          </h1>
        </div>
        <p>A place for notes, ideas, and things I’m figuring out.</p>
      </header>
      {notes.length ? (
        <div className="notes-list">
          {notes.map((note) => (
            <a className="note-row" key={note.path} href={note.path}>
              <div>
                <span className="micro">{dateLabel(note.date)}</span>
                <h2>{note.title}</h2>
                <p>{note.description}</p>
              </div>
              <span className="sketch-arrow">
                <PenArrow />
              </span>
            </a>
          ))}
        </div>
      ) : (
        <section
          className="notebook-empty drawn-surface"
          aria-labelledby="notebook-empty-title"
        >
          <Outline />
          <span className="micro">A fresh page</span>
          <h2 id="notebook-empty-title">Nothing written here yet.</h2>
          <p>
            No notes published yet. In the meantime, there are a few projects to
            explore.
          </p>
          <a className="text-link" href="/projects">
            Browse my projects <PenArrow />
          </a>
          <MarginLoop />
        </section>
      )}
    </>
  );
}
