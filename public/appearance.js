// Runs before first paint; the native control is wired after the document loads.
(function () {
  var query = window.matchMedia("(prefers-color-scheme: dark)");
  var preference = "system";
  try {
    var saved = localStorage.getItem("rymi-appearance");
    if (saved === "light" || saved === "dark") preference = saved;
  } catch (_) { /* Storage can be unavailable in private or restricted contexts. */ }

  function apply() {
    var theme = preference === "system" ? (query.matches ? "dark" : "light") : preference;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    var color = document.querySelector('meta[name="theme-color"]');
    if (color) color.setAttribute("content", theme === "dark" ? "#171d2b" : "#fffdf8");
  }
  apply();
  query.addEventListener("change", function () { if (preference === "system") apply(); });
  window.addEventListener("storage", function (event) {
    if (event.key !== "rymi-appearance") return;
    preference = event.newValue === "light" || event.newValue === "dark" ? event.newValue : "system";
    apply();
    var control = document.getElementById("appearance");
    if (control) control.value = preference;
  });
  document.addEventListener("DOMContentLoaded", function () {
    var control = document.getElementById("appearance");
    if (!control) return;
    control.value = preference;
    control.addEventListener("change", function () {
      preference = control.value;
      try {
        if (preference === "system") localStorage.removeItem("rymi-appearance");
        else localStorage.setItem("rymi-appearance", preference);
      } catch (_) {}
      apply();
    });
  });
})();
