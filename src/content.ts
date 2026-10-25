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
  repoURL?: string;
  demoURL?: string;
};

export type Project = Note & { repoURL: string };

const published = pages.filter((page) => page.frontmatter.draft !== true);
const text = (value: unknown) => (typeof value === "string" ? value : "");

export const notes: Note[] = published
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
    repoURL: text(page.frontmatter.repoURL) || undefined,
    demoURL: text(page.frontmatter.demoURL) || undefined,
  }))
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

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
