export default function ElearningBlock({ elearnings = [] }) {
    return (
        <section className="profile-card">
            <div className="profile-card__header">
                <h2>E-learning</h2>
            </div>

            {elearnings.length === 0 ? (
                <p>Er is momenteel geen e-learning beschikbaar.</p>
            ) : (
                <div className="profile-list">
                    {elearnings.map((elearning, index) => (
                        <article
                            key={elearning.id ?? `${elearning.title}-${index}`}
                            className="profile-list-item"
                        >
                            <div>
                                <p className="profile-list-item__title">
                                    {elearning.title || "E-learning"}
                                </p>
                                <p>Status: {elearning.status || "-"}</p>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}