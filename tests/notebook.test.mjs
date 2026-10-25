import { test } from "node:test";
import assert from "node:assert/strict";
import { noteTopics, filterNotes } from "../src/notebook.ts";

const notes = [
  {
    path: "/notes/dq",
    title: "dq",
    description: "DuckDB powered pipeline CLI",
    topic: "Projects",
    kind: "Command line",
    tags: ["data"],
  },
  {
    path: "/notes/music",
    title: "A composition by Grażyna Bacewicz",
    description: "Listening notes",
    topic: "Music",
    kind: "Note",
    tags: ["strings"],
  },
  {
    path: "/notes/scala",
    title: "Tracing through asynchronous Scala applications",
    description: "A working note",
    topic: "Software",
    kind: "Note",
    tags: ["tracing"],
  },
  {
    path: "/notes/aws",
    title: "AWS Glue Raycast Extension",
    description: "Run and open AWS Glue jobs",
    topic: "Projects",
    kind: "Raycast extension",
    tags: [],
  },
];

test("notebook subjects come from published content without duplicate or speculative tabs", () => {
  assert.deepEqual(noteTopics(notes), [
    "Everything",
    "Projects",
    "Music",
    "Software",
  ]);
  assert.deepEqual(
    noteTopics(notes.filter((note) => note.topic === "Projects")),
    ["Everything", "Projects"],
  );
  assert.deepEqual(noteTopics([]), ["Everything"]);
});

test("subject and search combine across projects and articles without changing their destinations", () => {
  assert.deepEqual(
    filterNotes(notes, "Everything", "").map((note) => note.path),
    notes.map((note) => note.path),
  );
  assert.deepEqual(
    filterNotes(notes, "Projects", "  RAYCAST  ").map((note) => note.path),
    ["/notes/aws"],
  );
  assert.equal(filterNotes(notes, "Music", "DuckDB").length, 0);
  assert.equal(
    filterNotes(notes, "Everything", "grazyna")[0].path,
    "/notes/music",
  );
  assert.equal(
    filterNotes(notes, "Everything", "strings")[0].path,
    "/notes/music",
  );
  assert.equal(
    filterNotes(notes, "Everything", "tracing")[0].path,
    "/notes/scala",
  );
  assert.equal(filterNotes(notes, "Everything", "no matching note").length, 0);
  assert.deepEqual(filterNotes([], "Everything", ""), []);
});
