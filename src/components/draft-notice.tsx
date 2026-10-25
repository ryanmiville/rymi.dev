export default function DraftNotice({ draft }: { draft: unknown }) {
  return import.meta.env.DEV && draft === true ? (
    <p className="draft-notice micro">Draft · Local preview only</p>
  ) : null;
}
