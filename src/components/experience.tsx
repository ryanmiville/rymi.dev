import experience from "../../content/experience.json";

const date = (value: string) => {
  if (value === "current") return "Present";
  const [month, day, year] = value.split("/").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
};

export default function Experience() {
  const entries = [...experience].sort(
    (a, b) => Date.parse(b.dateStart) - Date.parse(a.dateStart),
  );
  return (
    <ol className="experience-list">
      {entries.map((entry) => (
        <li key={entry.company} className="experience-row">
          <div>
            <h3>{entry.company}</h3>
            <p>{entry.role}</p>
          </div>
          <span className="micro">
            {date(entry.dateStart)}
            <span aria-hidden="true"> — </span>
            <span className="visually-hidden"> to </span>
            {date(entry.dateEnd)}
          </span>
        </li>
      ))}
    </ol>
  );
}
