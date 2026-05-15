import type { DomainData } from "@/lib/schema";

export function Vraagbaak({ data }: { data: DomainData["vraagbaak"] }) {
  return (
    <section className="canvas-section">
      <div style={{ marginBottom: 12 }}>
        <div className="section-eyebrow" style={{ color: "var(--if-ink)" }}>
          AI-Vraagbaak · corpus-synthese
        </div>
        <h2>Of: stel één vraag, krijg één samenhangend antwoord</h2>
        <p className="lede">
          De Vraagbaak is anders dan de Wegwijzer. Hier krijgt u geen route door het domein, maar één
          samengesteld antwoord op basis van meerdere IF-artikelen, met bronvermelding.
        </p>
      </div>
      <div className="vraagbaak">
        <span className="badge">
          <span className="square" />
          <span>{data.badge}</span>
        </span>
        <h3>{data.title}</h3>
        <p dangerouslySetInnerHTML={{ __html: data.intro }} />
        <div className="input-row">
          <input type="text" value={data.exampleQuestion} readOnly />
          <button type="button" className="submit">Antwoord</button>
        </div>
        <div className="synth-out">
          <div className="q">{data.exampleQuestion}</div>
          <div dangerouslySetInnerHTML={{ __html: data.answer }} />
          <div className="sources">
            {data.sources.map((s) => (
              <div key={s.n} className="src">
                <sup>{s.n}</sup>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
