// Apply the saved choice before first paint; wire the header after it exists.
(function () {
  var query = window.matchMedia("(prefers-color-scheme: dark)");
  var preference = "system";
  var labels = { system: "System theme", light: "Light", dark: "Dark" };
  function normalize(value) {
    return value === "light" || value === "dark" ? value : "system";
  }
  try {
    preference = normalize(localStorage.getItem("rymi-appearance"));
  } catch (_) {
    /* Storage can be unavailable in private or restricted contexts. */
  }

  function apply() {
    var theme =
      preference === "system" ? (query.matches ? "dark" : "light") : preference;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    var color = document.querySelector('meta[name="theme-color"]');
    if (color)
      color.setAttribute("content", theme === "dark" ? "#171d2b" : "#fffdf8");
    var control = document.getElementById("appearance");
    if (!control) return;
    var trigger = control.querySelector("summary");
    trigger.setAttribute("aria-label", "Appearance: " + labels[preference]);
    trigger.title = "Appearance: " + labels[preference];
    control
      .querySelectorAll("button[data-appearance]")
      .forEach(function (button) {
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.appearance === preference),
        );
      });
  }
  apply();
  query.addEventListener("change", function () {
    if (preference === "system") apply();
  });
  window.addEventListener("storage", function (event) {
    if (event.key !== "rymi-appearance" && event.key !== null) return;
    preference = normalize(event.newValue);
    apply();
  });
  document.addEventListener("DOMContentLoaded", function () {
    var control = document.getElementById("appearance");
    if (!control) return;
    var trigger = control.querySelector("summary");
    apply();
    control
      .querySelectorAll("button[data-appearance]")
      .forEach(function (button) {
        button.addEventListener("click", function () {
          preference = normalize(button.dataset.appearance);
          try {
            if (preference === "system")
              localStorage.removeItem("rymi-appearance");
            else localStorage.setItem("rymi-appearance", preference);
          } catch (_) {}
          apply();
          control.open = false;
          trigger.focus({ preventScroll: true });
        });
      });
    document.addEventListener("click", function (event) {
      if (!control.contains(event.target)) control.open = false;
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && control.open) {
        control.open = false;
        trigger.focus({ preventScroll: true });
      }
    });
  });
})();
