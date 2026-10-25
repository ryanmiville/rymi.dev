import { selectedProjects, notes } from "../src/content";
import { DeskArt, Orbit } from "../src/components/drawings";
import { MarginLoop, PenArrow, RoughLink } from "../src/components/sketches";
import ProjectPreview from "../src/components/project-preview";

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
            <RoughLink href="/projects">Explore my projects</RoughLink>
            <a className="text-link" href="/about">
              About me
            </a>
          </div>
        </div>
        <div className="desk-illustration" aria-hidden="true">
          <DeskArt />
          <Orbit />
        </div>
      </section>
      <section aria-labelledby="selected-work">
        <div className="section-top">
          <h2 id="selected-work">A few things I’ve made</h2>
          <a className="text-link" href="/projects">
            All projects <PenArrow />
          </a>
        </div>
        <div className="home-projects">
          {selectedProjects.map((project, index) => (
            <ProjectPreview
              key={project.path}
              project={project}
              index={index}
            />
          ))}
        </div>
      </section>
      <section className="home-notes" aria-labelledby="latest-notes">
        <div>
          <h2 id="latest-notes">
            In the margins
            <MarginLoop />
          </h2>
          <p className="serif-note">
            Notes on software,
            <br />
            music, and art.
          </p>
        </div>
        {notes.length ? (
          <div>
            {notes.slice(0, 2).map((note) => (
              <a className="note-row" key={note.path} href={note.path}>
                <div>
                  <h3>{note.title}</h3>
                  <p>{note.description}</p>
                </div>
                <PenArrow />
              </a>
            ))}
          </div>
        ) : (
          <div className="home-notes-empty">
            <p>No notes published yet.</p>
            <a className="text-link" href="/notes">
              Visit the notebook <PenArrow />
            </a>
          </div>
        )}
      </section>
    </>
  );
}
