import type { ExtraSection } from "@/lib/schema";

function renderBody(sec: ExtraSection): React.ReactNode {
  switch (sec.type) {
    case "timeline":
      return (
        <ol>
          {(sec.items ?? []).map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      );
    case "list":
      return (
        <ul>
          {(sec.items ?? []).map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "html":
      return <div dangerouslySetInnerHTML={{ __html: sec.body ?? "" }} />;
    case "info":
    case "callout":
    default:
      return <div dangerouslySetInnerHTML={{ __html: sec.body ?? "" }} />;
  }
}

export function ExtraSections({ sections }: { sections: ExtraSection[] }) {
  if (sections.length === 0) return null;
  return (
    <>
      {sections.map((sec, i) => (
        <section key={i} className={`extra-card ${sec.type}`}>
          {sec.eyebrow && <div className="num">{sec.eyebrow}</div>}
          {sec.title && <h2>{sec.title}</h2>}
          {sec.lede && <div className="lede">{sec.lede}</div>}
          <div className="body">{renderBody(sec)}</div>
        </section>
      ))}
    </>
  );
}
