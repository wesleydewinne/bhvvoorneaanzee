export default function QuoteSection({ title, description, children, className = "" }) {
    return (
        <section className={`quote-section ${className}`.trim()}>
            <header className="quote-section__header">
                <h2>{title}</h2>
                {description && <p>{description}</p>}
            </header>
            <div className="quote-section__body">{children}</div>
        </section>
    );
}
