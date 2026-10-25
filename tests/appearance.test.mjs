import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const script = readFileSync(
  new URL("../public/appearance.js", import.meta.url),
  "utf8",
);

function browser({ dark = false, saved, unavailable = false } = {}) {
  const element = (extra = {}) => ({
    ...extra,
    attributes: {},
    events: {},
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
    addEventListener(type, handler) {
      this.events[type] = handler;
    },
  });
  const control = element();
  const media = element({ matches: dark });
  const color = element();
  let ready = false;
  const document = element({
    documentElement: { dataset: {}, style: {} },
    querySelector: () => color,
    getElementById: () => (ready ? control : null),
  });
  const window = element({ matchMedia: () => media });
  const storage = new Map(
    saved === undefined ? [] : [["rymi-appearance", saved]],
  );
  const localStorage = {
    getItem(key) {
      if (unavailable) throw new Error("Storage blocked");
      return storage.get(key) ?? null;
    },
    setItem(key, value) {
      if (unavailable) throw new Error("Storage blocked");
      storage.set(key, value);
    },
  };
  runInNewContext(script, { window, document, localStorage });
  return {
    document,
    window,
    media,
    color,
    control,
    storage,
    theme: () => document.documentElement.dataset.theme,
    boot() {
      ready = true;
      document.events.DOMContentLoaded();
    },
    toggle() {
      control.events.click();
    },
    systemDark(value) {
      media.matches = value;
      media.events.change();
    },
  };
}

test("new visitors follow the system before first paint and when the OS changes", () => {
  for (const dark of [false, true]) {
    const page = browser({ dark });
    assert.equal(page.theme(), dark ? "dark" : "light");
    assert.equal(page.document.documentElement.style.colorScheme, page.theme());
    page.boot();
    assert.equal(
      page.control.attributes["aria-label"],
      dark ? "Switch to light mode" : "Switch to dark mode",
    );
    page.systemDark(!dark);
    assert.equal(page.theme(), dark ? "light" : "dark");
    assert.equal(page.color.attributes.content, dark ? "#fffdf8" : "#171d2b");
    assert.equal(
      page.storage.size,
      0,
      "Following the system stores no override",
    );
  }
});

test("each click flips the resolved theme and becomes an explicit preference", () => {
  for (const dark of [false, true]) {
    const page = browser({ dark });
    page.boot();
    page.toggle();
    assert.equal(page.theme(), dark ? "light" : "dark");
    assert.equal(page.storage.get("rymi-appearance"), page.theme());
    page.systemDark(!dark);
    page.systemDark(dark);
    assert.equal(
      page.theme(),
      dark ? "light" : "dark",
      "OS changes do not override a manual choice",
    );
    page.toggle();
    assert.equal(page.theme(), dark ? "dark" : "light");
    assert.equal(page.storage.get("rymi-appearance"), page.theme());
  }
});

test("saved choices persist and clicking reverses the saved theme rather than the OS theme", () => {
  const page = browser({ dark: true, saved: "light" });
  assert.equal(page.theme(), "light");
  page.boot();
  page.toggle();
  assert.equal(page.theme(), "dark");
  assert.equal(page.control.attributes["aria-label"], "Switch to light mode");
  const reloaded = browser({
    dark: false,
    saved: page.storage.get("rymi-appearance"),
  });
  reloaded.boot();
  assert.equal(reloaded.theme(), "dark");
  reloaded.toggle();
  assert.equal(reloaded.theme(), "light");
  assert.equal(
    reloaded.control.attributes["aria-label"],
    "Switch to dark mode",
  );
});

test("other tabs can change or clear the saved appearance", () => {
  const page = browser({ dark: true });
  page.boot();
  page.window.events.storage({ key: "rymi-appearance", newValue: "light" });
  assert.equal(page.theme(), "light");
  assert.equal(page.control.attributes["aria-label"], "Switch to dark mode");
  page.window.events.storage({ key: "unrelated", newValue: "dark" });
  assert.equal(page.theme(), "light");
  page.window.events.storage({ key: null, newValue: null });
  assert.equal(page.theme(), "dark");
  page.systemDark(false);
  assert.equal(page.theme(), "light");
});

test("blocked storage and invalid saved values still allow repeated toggles", () => {
  for (const options of [{ saved: "unexpected" }, { unavailable: true }]) {
    const page = browser({ ...options, dark: true });
    page.boot();
    assert.equal(page.theme(), "dark");
    page.toggle();
    assert.equal(page.theme(), "light");
    page.toggle();
    assert.equal(page.theme(), "dark");
  }
});
