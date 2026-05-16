import type { DomainData } from "@/lib/schema";

export function DomainFoot({ domain }: { domain: DomainData["domain"] }) {
  return (
    <footer className="domain-foot">
      <div>
        <div className="lbl">Peildatum</div>
        <strong>{domain.peildatum}</strong>
        <p>Bedragen, drempels en regelingen op deze datum geverifieerd door de IF-redactie.</p>
      </div>
      <div>
        <div className="lbl">Wijzigingen</div>
        <strong>{domain.versie}</strong>
        <p>{domain.wijzigingen}</p>
      </div>
      <div>
        <div className="lbl">Disclaimer</div>
        <p dangerouslySetInnerHTML={{ __html: domain.disclaimer }} />
      </div>
    </footer>
  );
}
