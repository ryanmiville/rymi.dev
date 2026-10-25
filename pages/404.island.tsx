import { RoughLink } from "../src/components/sketches";

export default function NotFound() {
  return (
    <section className="not-found">
      <span className="eyebrow">A small detour</span>
      <h1 className="page-title">
        Nothing
        <br />
        <em>on this page.</em>
      </h1>
      <p>
        This address doesn’t lead to a page. You can start again from home or
        browse my projects.
      </p>
      <RoughLink href="/">Back home</RoughLink>
    </section>
  );
}
