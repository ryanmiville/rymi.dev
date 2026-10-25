const steps = [
  {
    title: "Start where you are",
    copy: "The useful context is already in front of you. Begin with the current tab you want to open in another profile.",
  },
  {
    title: "Make one clear choice",
    copy: "Choose the browser and profile for this task. Favorites keep regular destinations close.",
  },
  {
    title: "Carry on",
    copy: "The same URL opens in the chosen profile, using its login and session. Your original tab stays open.",
  },
];

export function initSwitchboardDiagram() {
  for (const figure of document.querySelectorAll<HTMLElement>(
    "[data-switchboard]",
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
