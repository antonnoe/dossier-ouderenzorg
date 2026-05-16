export function PremiumGate({
  title = "Alleen voor abonnees",
  sub = "Deze functie is onderdeel van het IF-abonnement.",
  cta = "Word abonnee",
  href = "https://infofrankrijk.com/abonnement/",
  loginHref = "https://infofrankrijk.com/inloggen/",
  children,
}: {
  title?: string;
  sub?: string;
  cta?: string;
  href?: string;
  loginHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="gate-wrap">
      <div className="gate-content" aria-hidden="true">
        {children}
      </div>
      <div className="gate-overlay" role="region" aria-label="Premium-functie">
        <div className="gate-lock" aria-hidden="true">✦</div>
        <div className="gate-title">{title}</div>
        <p className="gate-sub">{sub}</p>
        <div className="gate-actions">
          <a className="gate-cta" href={href}>{cta}</a>
          <a className="gate-login" href={loginHref}>Log in</a>
        </div>
      </div>
    </div>
  );
}
