import type { DomainData } from "@/lib/schema";

interface Props {
  tools: DomainData["tools"];
  peildatum: string;
}

export function Tools({ tools, peildatum }: Props) {
  if (tools.length === 0) return null;
  return (
    <section className="tools-rail" id="tools-section">
      <div className="tools-rail-head">
        <div>
          <span className="num">Tools · {tools.length}</span>
          <h2 style={{ marginTop: 2 }}>Reken zelf, beslis zelf</h2>
        </div>
        <span style={{ fontSize: 12.5, color: "var(--if-ink-3)" }}>
          Onderhouden door redactie · peildatum {peildatum}
        </span>
      </div>
      <div className="grid">
        {tools.map((t, i) => (
          <a key={i} className="tool" href={t.href || "#"}>
            <h4>{t.title}</h4>
            <p>{t.summary}</p>
            <span className="open">{t.cta || "Open"}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
