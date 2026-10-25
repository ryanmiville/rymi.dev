import { notes } from "../src/content";
import { DeskArt, Orbit } from "../src/components/drawings";
import { PenArrow, RoughLink, SocialIcon } from "../src/components/sketches";
import NotePreview from "../src/components/note-preview";

export const frontmatter = { section: "home" };

export default function Home() {
  return (
    <>
      <section className="home-hero" aria-labelledby="intro-title">
        <div>
          <h1 className="page-title" id="intro-title">
            Hi, I’m
            <br />
            <em>Ryan Miville.</em>
          </h1>
          <p className="home-intro">
            A software engineer with a focus on data-heavy apps and developer
            experience. I’m also passionate about music and art, and
            occasionally try to merge these things into something interesting.
          </p>
          <div className="home-actions">
            <RoughLink href="/notes">Explore my notes</RoughLink>
            <a className="text-link" href="/about">
              About me
            </a>
          </div>
          <nav className="home-socials" aria-label="Social profiles">
            <a
              href="https://github.com/ryanmiville"
              aria-label="GitHub"
              title="GitHub"
              rel="me"
            >
              <SocialIcon name="github" />
            </a>
            <a
              href="https://x.com/ryanmiville"
              aria-label="X"
              title="X"
              rel="me"
            >
              <SocialIcon name="x" />
            </a>
            <a
              href="https://www.linkedin.com/in/ryan-miville-00160248"
              aria-label="LinkedIn"
              title="LinkedIn"
              rel="me"
            >
              <SocialIcon name="linkedin" />
            </a>
          </nav>
        </div>
        <div className="desk-illustration" aria-hidden="true">
          <DeskArt />
          <Orbit />
        </div>
      </section>
      <section aria-labelledby="home-notes-title">
        <div className="section-top">
          <h2 id="home-notes-title">Notes</h2>
          <a className="text-link" href="/notes">
            All notes <PenArrow />
          </a>
        </div>
        {notes.length ? (
          <div className="home-notes-grid">
            {notes.slice(0, 3).map((note, index) => (
              <NotePreview key={note.path} note={note} index={index} />
            ))}
          </div>
        ) : (
          <p className="home-notes-empty">No notes published yet.</p>
        )}
      </section>
    </>
  );
}
