import Experience from "../src/components/experience";
import { PenArrow } from "../src/components/sketches";

export const frontmatter = { section: "about" };
export default function Work() {
  return (
    <div className="about-page">
      <span className="eyebrow">Software & data engineering</span>
      <h1 className="page-title">
        Along
        <br />
        <em>the way.</em>
      </h1>
      <Experience />
      <div className="work-end">
        <a className="text-link" href="/about">
          More about me <PenArrow />
        </a>
      </div>
    </div>
  );
}
