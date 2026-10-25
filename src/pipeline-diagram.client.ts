const steps = [
  {
    title: "Start with a source",
    copy: "Read a file or standard input. The source data travels through the pipeline alongside the query plan.",
  },
  {
    title: "One command at a time",
    copy: "Select columns, filter rows, or sort results. Each command adds to the plan, rather than running a separate query.",
  },
  {
    title: "Let DuckDB do the work",
    copy: "The final output command executes the accumulated plan with DuckDB and writes results in your chosen format.",
  },
];

// Markdown's client script progressively enhances the server-rendered figure.
// The same buttons keep focus when the selected explanation changes.
export function initPipelineDiagram() {
  for (const figure of document.querySelectorAll<HTMLElement>(
    "[data-pipeline]",
  )) {
    const buttons = figure.querySelectorAll<HTMLButtonElement>("[data-step]");
    const title = figure.querySelector(".step-label");
    const copy = figure.querySelector(".diagram-caption p");
    if (!title || !copy) continue;
    for (const button of buttons) {
      button.disabled = false;
      button.addEventListener("click", () => {
        const step = steps[Number(button.dataset.step)];
        if (!step) return;
        for (const item of buttons)
          item.setAttribute("aria-pressed", String(item === button));
        title.textContent = step.title;
        copy.textContent = step.copy;
      });
    }
  }
}
