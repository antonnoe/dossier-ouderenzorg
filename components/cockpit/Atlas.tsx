import type { Theme } from "@/lib/schema";

interface Props {
  themes: Theme[];
  recommendedIds: Set<string>;
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function Atlas({ themes, recommendedIds }: Props) {
  const countLabel = `Thema-atlas · ${themes.length} ${themes.length === 1 ? "node" : "nodes"}`;

  return (
    <section className="canvas-section" id="atlas-section">
      <div className="atlas-head">
        <div>
          <div className="num">{countLabel}</div>
          <h2>Het hele domein, in één overzicht</h2>
          <p className="lede">De Wegwijzer markeert thema&apos;s die bij uw situatie passen.</p>
        </div>
        <div className="legend">
          <span className="sw" style={{ background: "#800000" }} /> aanbevolen voor u &nbsp;&nbsp;
          <span className="sw" style={{ background: "#fff", border: "1.5px solid #d8cfc4" }} /> overige
        </div>
      </div>
      <div className="atlas">
        {themes.map((t, i) => {
          const isRec = recommendedIds.has(t.id);
          return (
            <a
              key={t.id}
              href={t.href || "#"}
              className="node"
              data-rec={isRec ? "true" : "false"}
              data-theme-id={t.id}
            >
              <div className="ring">{isRec ? "★" : pad2(i + 1)}</div>
              <h3>{t.title}</h3>
              <p>{t.summary}</p>
              <div className="meta">
                <span>{t.readingTime}</span>
                <span className="tag">{isRec ? "Aanbevolen" : pad2(i + 1)}</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
