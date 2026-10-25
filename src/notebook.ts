import type { Note } from "./content";

export function noteTopics(notes: Note[]) {
  return [
    "Everything",
    ...[...new Set(notes.map((note) => note.topic))].sort((a, b) =>
      a === "Projects" ? -1 : b === "Projects" ? 1 : a.localeCompare(b),
    ),
  ];
}

const searchable = (value: string) =>
  value.normalize("NFKD").replace(/\p{M}/gu, "").toLocaleLowerCase();

export function filterNotes(notes: Note[], topic: string, query: string) {
  const search = searchable(query.trim());
  return notes.filter(
    (note) =>
      (topic === "Everything" || note.topic === topic) &&
      searchable(
        [
          note.title,
          note.description,
          note.kind,
          note.topic,
          ...note.tags,
        ].join(" "),
      ).includes(search),
  );
}
