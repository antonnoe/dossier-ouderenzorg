export function Topbar({ title }: { title: string }) {
  return (
    <header className="if-topbar">
      <div className="if-topbar-inner">
        <div className="if-logo">
          <span className="dot" />
          infofrankrijk.com
        </div>
        <div className="crumbs">
          Kennishub <span className="sep">›</span> <strong>{title}</strong>
        </div>
      </div>
    </header>
  );
}
