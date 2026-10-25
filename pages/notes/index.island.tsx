import { notes } from "../../src/content";
import NotesArchive from "../../src/components/notes-archive" with {
  island: "load",
};

export const frontmatter = { section: "notes" };

export default function Notes() {
  return (
    <>
      <header className="archive-head">
        <div>
          <h1 className="page-title">
            <em>Notes</em>
          </h1>
        </div>
        <p>Project write-ups, notes, and things I’m figuring out.</p>
      </header>
      <NotesArchive notes={notes} />
    </>
  );
}
