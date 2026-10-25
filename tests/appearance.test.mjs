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
  const choices = ["system", "light", "dark"].map((value) =>
    element({ dataset: { appearance: value } }),
  );
  const trigger = element({
    focus() {
      this.focused = true;
    },
  });
  const control = element({
    open: false,
    querySelector: () => trigger,
    querySelectorAll: () => choices,
    contains: (target) => [trigger, ...choices].includes(target),
  });
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
    removeItem(key) {
      if (unavailable) throw new Error("Storage blocked");
      storage.delete(key);
    },
  };
  runInNewContext(script, { window, document, localStorage });
  return {
    document,
    window,
    media,
    color,
    control,
    trigger,
    storage,
    theme: () => document.documentElement.dataset.theme,
    boot() {
      ready = true;
      document.events.DOMContentLoaded();
    },
    choose(value) {
      choices
        .find((button) => button.dataset.appearance === value)
        .events.click();
    },
    selected: () =>
      choices
        .filter((button) => button.attributes["aria-pressed"] === "true")
        .map((button) => button.dataset.appearance),
    systemDark(value) {
      media.matches = value;
      media.events.change();
    },
  };
}

test("new visitors follow system appearance before first paint and when the OS changes", () => {
  for (const dark of [false, true]) {
    const page = browser({ dark });
    assert.equal(page.theme(), dark ? "dark" : "light");
    assert.equal(page.document.documentElement.style.colorScheme, page.theme());
    page.boot();
    assert.deepEqual(page.selected(), ["system"]);
    assert.equal(
      page.trigger.attributes["aria-label"],
      "Appearance: System theme",
    );
    page.systemDark(!dark);
    assert.equal(page.theme(), dark ? "light" : "dark");
    assert.equal(page.color.attributes.content, dark ? "#fffdf8" : "#171d2b");
    assert.equal(page.storage.size, 0, "Automatic mode stores no override");
  }
});

test("manual choices persist, override OS changes, and can return to automatic mode", () => {
  const page = browser({ dark: true, saved: "light" });
  assert.equal(page.theme(), "light");
  page.boot();
  assert.deepEqual(page.selected(), ["light"]);
  page.systemDark(false);
  page.systemDark(true);
  assert.equal(page.theme(), "light");
  page.control.open = true;
  page.choose("dark");
  assert.equal(page.theme(), "dark");
  assert.equal(page.storage.get("rymi-appearance"), "dark");
  assert.deepEqual(page.selected(), ["dark"]);
  assert.equal(page.control.open, false);
  assert.equal(page.trigger.focused, true);
  page.choose("system");
  assert.equal(page.storage.has("rymi-appearance"), false);
  assert.deepEqual(page.selected(), ["system"]);
  page.systemDark(false);
  assert.equal(page.theme(), "light");
});

test("other tabs can change or clear the saved appearance", () => {
  const page = browser({ dark: true });
  page.boot();
  page.window.events.storage({ key: "rymi-appearance", newValue: "light" });
  assert.equal(page.theme(), "light");
  assert.deepEqual(page.selected(), ["light"]);
  page.window.events.storage({ key: "unrelated", newValue: "dark" });
  assert.equal(page.theme(), "light");
  page.window.events.storage({ key: null, newValue: null });
  assert.equal(page.theme(), "dark");
  assert.deepEqual(page.selected(), ["system"]);
});

test("unavailable storage and invalid saved values still allow theme switching", () => {
  for (const options of [{ saved: "unexpected" }, { unavailable: true }]) {
    const page = browser({ ...options, dark: true });
    page.boot();
    assert.equal(page.theme(), "dark");
    assert.deepEqual(page.selected(), ["system"]);
    page.choose("light");
    assert.equal(page.theme(), "light");
    page.choose("system");
    assert.equal(page.theme(), "dark");
  }
});

test("Escape returns focus to the icon; clicking outside closes without stealing focus", () => {
  const page = browser();
  page.boot();
  page.control.open = true;
  page.document.events.keydown({ key: "Escape" });
  assert.equal(page.control.open, false);
  assert.equal(page.trigger.focused, true);
  page.trigger.focused = false;
  page.control.open = true;
  page.document.events.click({ target: {} });
  assert.equal(page.control.open, false);
  assert.equal(page.trigger.focused, false);
});
