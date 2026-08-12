export default function QuoteSection({
  title,
  description,
  icon,
  children,
  className = "",
}) {
  return (
    <section className={`quote-section ${className}`.trim()}>
      <header className="quote-section__header">
        {icon && <span className="quote-section__icon">{icon}</span>}
        <div>
          <h2>{title}</h2>
          {description && <p>{description}</p>}
        </div>
      </header>
      <div className="quote-section__body">{children}</div>
    </section>
  );
}
