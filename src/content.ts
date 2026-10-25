import pages from "@void/md/pages";

export type Note = {
  path: string;
  title: string;
  description: string;
  date: string;
  topic: string;
  tags: string[];
  kind: string;
  icon: string;
  draft: boolean;
  repoURL?: string;
  demoURL?: string;
};

export type Project = Note & { repoURL: string };

const text = (value: unknown) => (typeof value === "string" ? value : "");

const allNotes: Note[] = pages
  .filter((page) => page.path.startsWith("/notes/"))
  .map((page) => ({
    path: page.path,
    title: page.title,
    description: text(page.frontmatter.description),
    date: text(page.frontmatter.date),
    topic: text(page.frontmatter.topic) || "Notes",
    tags: Array.isArray(page.frontmatter.tags)
      ? page.frontmatter.tags.map(String)
      : [],
    kind: text(page.frontmatter.kind) || "Note",
    icon: text(page.frontmatter.icon) || "note",
    draft: page.frontmatter.draft === true,
    repoURL: text(page.frontmatter.repoURL) || undefined,
    demoURL: text(page.frontmatter.demoURL) || undefined,
  }))
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

export const publishedNotes = allNotes.filter((note) => !note.draft);
export const notes = import.meta.env.DEV ? allNotes : publishedNotes;

export const projects = notes.filter(
  (note): note is Project => note.topic === "Projects" && Boolean(note.repoURL),
);

export function dateLabel(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? ""
    : new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        timeZone: "UTC",
      }).format(date);
}
