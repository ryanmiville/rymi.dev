import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { voidPlugin } from "void";
import { voidReact } from "@void/react/plugin";
import { voidMarkdown } from "@void/md/plugin";
import { validateContent } from "./scripts/content";

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  plugins: [
    {
      name: "rymi-content",
      buildStart() {
        validateContent();
      },
    },
    voidPlugin(),
    voidReact(),
    voidMarkdown(),
  ],
});
