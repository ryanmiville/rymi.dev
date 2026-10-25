import { useEffect, useState } from "react";
import type { Project } from "../content";
import { PenArrow, ProjectIcon } from "./sketches";

export default function ProjectArchive({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("Everything");
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const categories = [
    "Everything",
    ...new Set(projects.map((project) => project.category)),
  ];
  const visible = projects.filter(
    (project) =>
      (category === "Everything" || project.category === category) &&
      `${project.title} ${project.description} ${project.kind} ${project.category}`
        .toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()),
  );

  return (
    <section aria-label="Project collection">
      <div className="archive-controls" data-enhanced-controls>
        <div className="filters" role="group" aria-label="Filter projects">
          {categories.map((item) => (
            <button
              className="filter"
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              disabled={!ready}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="search-label">
          <svg
            viewBox="0 0 24 24"
            width="19"
            height="19"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M17 10a7 7 0 1 1-14 0a7 7 0 0 1 14 0Zm-2 5 6 6"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="search"
            placeholder="Find a project…"
            aria-label="Search projects"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            disabled={!ready}
            autoComplete="off"
            spellCheck={false}
          />
        </label>
      </div>
      <div className="archive-list">
        {visible.map((project) => (
          <a key={project.path} className="archive-row" href={project.path}>
            <ProjectIcon name={project.icon} />
            <div>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <span className="mobile-kind micro">{project.kind}</span>
            </div>
            <span className="micro">{project.kind}</span>
            <span className="sketch-arrow">
              <PenArrow />
            </span>
          </a>
        ))}
      </div>
      {!visible.length && (
        <div className="archive-empty">
          <h2>No projects found.</h2>
          <p>Try another search or explore the whole collection.</p>
          <button
            className="clear-filter"
            onClick={() => {
              setQuery("");
              setCategory("Everything");
            }}
          >
            Clear search & filters
          </button>
        </div>
      )}
      <p
        className="archive-status micro"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {visible.length === projects.length
          ? `${projects.length} projects in the collection`
          : `${visible.length} of ${projects.length} projects`}
      </p>
      <noscript>
        <style>{"[data-enhanced-controls]{display:none}"}</style>
        <p className="noscript-note">
          All projects are shown. Enable JavaScript to search and filter.
        </p>
      </noscript>
    </section>
  );
}
