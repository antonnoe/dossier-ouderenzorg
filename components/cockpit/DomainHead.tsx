import type { DomainData } from "@/lib/schema";

export function DomainHead({ domain }: { domain: DomainData["domain"] }) {
  return (
    <section className="domain-head">
      <div className="eyebrow">{domain.eyebrow}</div>
      <h1>{domain.title}</h1>
      <p>{domain.intro}</p>
      <div className="status-strip" aria-label="Onderhoudsstatus">
        <div className="cell">
          <div className="lbl">Peildatum</div>
          <strong>{domain.peildatum}</strong>
        </div>
        <div className="cell">
          <div className="lbl">Status</div>
          <span className="ok">● {domain.status}</span>
        </div>
        <div className="cell">
          <div className="lbl">Versie</div>
          <strong>{domain.versie}</strong>
        </div>
      </div>
    </section>
  );
}
