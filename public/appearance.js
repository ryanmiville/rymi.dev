// Apply the saved choice before first paint; wire the header after it exists.
(function () {
  var query = window.matchMedia("(prefers-color-scheme: dark)");
  var preference = "system";
  function normalize(value) {
    return value === "light" || value === "dark" ? value : "system";
  }
  try {
    preference = normalize(localStorage.getItem("rymi-appearance"));
  } catch (_) {
    /* Storage can be unavailable in private or restricted contexts. */
  }

  function resolvedTheme() {
    return preference === "system"
      ? query.matches
        ? "dark"
        : "light"
      : preference;
  }
  function apply() {
    var theme = resolvedTheme();
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    var color = document.querySelector('meta[name="theme-color"]');
    if (color)
      color.setAttribute("content", theme === "dark" ? "#171d2b" : "#fffdf8");
    var control = document.getElementById("appearance");
    if (!control) return;
    var label =
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
    control.setAttribute("aria-label", label);
    control.title = label;
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
    apply();
    control.addEventListener("click", function () {
      preference = resolvedTheme() === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("rymi-appearance", preference);
      } catch (_) {}
      apply();
    });
  });
})();
