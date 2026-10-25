import { useEffect, useMemo, useState } from "react";
import type { Note } from "../content";
import { noteTopics, filterNotes } from "../notebook";
import { PenArrow, ProjectIcon } from "./sketches";

export default function NotesArchive({ notes }: { notes: Note[] }) {
  const [topic, setTopic] = useState("Everything");
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);
  const topics = useMemo(() => noteTopics(notes), [notes]);
  useEffect(() => {
    const readLocation = () => {
      const params = new URLSearchParams(window.location.search);
      const selected = params.get("topic") || "Everything";
      setTopic(topics.includes(selected) ? selected : "Everything");
      setQuery(params.get("q") || "");
      setReady(true);
    };
    readLocation();
    window.addEventListener("popstate", readLocation);
    return () => window.removeEventListener("popstate", readLocation);
  }, [topics]);
  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    if (topic === "Everything") url.searchParams.delete("topic");
    else url.searchParams.set("topic", topic);
    if (query.trim()) url.searchParams.set("q", query);
    else url.searchParams.delete("q");
    window.history.replaceState(window.history.state, "", url);
  }, [topic, query, ready]);
  const visible = filterNotes(notes, topic, query);

  return (
    <section aria-label="Notebook">
      {notes.length > 0 && (
        <div className="archive-controls" data-enhanced-controls>
          <div
            className="filters"
            role="group"
            aria-label="Filter notes by subject"
          >
            {topics.map((item) => (
              <button
                className="filter"
                key={item}
                aria-pressed={topic === item}
                onClick={() => setTopic(item)}
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
              placeholder="Find a note…"
              aria-label="Search notes"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              disabled={!ready}
              autoComplete="off"
              spellCheck={false}
            />
          </label>
        </div>
      )}
      <div className="archive-list">
        {visible.map((note) => (
          <a key={note.path} className="archive-row" href={note.path}>
            <ProjectIcon name={note.icon} />
            <div>
              <h2>{note.title}</h2>
              <p>{note.description}</p>
              <span className="mobile-kind micro">
                {note.draft && "Draft · "}
                {note.topic === "Projects" ? note.kind : note.topic}
              </span>
            </div>
            <span className="micro">
              {note.draft && "Draft · "}
              {note.topic === "Projects" ? note.kind : note.topic}
            </span>
            <span className="sketch-arrow">
              <PenArrow />
            </span>
          </a>
        ))}
      </div>
      {!visible.length && (
        <div className="archive-empty">
          <h2>
            {notes.length ? "No notes found." : "No notes published yet."}
          </h2>
          <p>
            {notes.length
              ? "Try another search or explore the whole notebook."
              : "A fresh page, ready for the first note."}
          </p>
          {notes.length > 0 && (
            <button
              className="clear-filter"
              onClick={() => {
                setQuery("");
                setTopic("Everything");
              }}
            >
              Clear search & filters
            </button>
          )}
        </div>
      )}
      {notes.length > 0 && (
        <p
          className="archive-status micro"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {visible.length === notes.length
            ? `${notes.length} ${notes.length === 1 ? "note" : "notes"} in the notebook`
            : `${visible.length} of ${notes.length} notes`}
        </p>
      )}
      {notes.length > 0 && (
        <noscript>
          <style>{"[data-enhanced-controls]{display:none}"}</style>
          <p className="noscript-note">
            All notes are shown. Enable JavaScript to search and filter.
          </p>
        </noscript>
      )}
    </section>
  );
}
