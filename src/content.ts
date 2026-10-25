import pages from "@void/md/pages";

export type Project = {
  path: string;
  title: string;
  description: string;
  date: string;
  category: string;
  kind: string;
  icon: string;
  repoURL: string;
  demoURL?: string;
};

export type Note = {
  path: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

const published = pages.filter((page) => page.frontmatter.draft !== true);
const text = (value: unknown) => (typeof value === "string" ? value : "");

export const projects: Project[] = published
  .filter((page) => page.path.startsWith("/projects/"))
  .map((page) => ({
    path: page.path,
    title: page.title,
    description: text(page.frontmatter.description),
    date: text(page.frontmatter.date),
    category: text(page.frontmatter.category),
    kind: text(page.frontmatter.kind),
    icon: text(page.frontmatter.icon),
    repoURL: text(page.frontmatter.repoURL),
    demoURL: text(page.frontmatter.demoURL) || undefined,
  }))
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

export const notes: Note[] = published
  .filter((page) => page.path.startsWith("/notes/"))
  .map((page) => ({
    path: page.path,
    title: page.title,
    description: text(page.frontmatter.description),
    date: text(page.frontmatter.date),
    tags: Array.isArray(page.frontmatter.tags)
      ? page.frontmatter.tags.map(String)
      : [],
  }))
  .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

// Keep the home curated independently of archive growth.
export const selectedProjects = ["dq", "fantano-fetcher", "aws-glue"]
  .map((slug) =>
    projects.find((project) => project.path === `/projects/${slug}`),
  )
  .filter((project): project is Project => Boolean(project));

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
