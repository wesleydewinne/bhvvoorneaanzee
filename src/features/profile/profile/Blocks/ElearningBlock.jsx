export default function ElearningBlock({ elearnings }) {
    return (
        <div className="profile-card">
            <h3>E-learning</h3>

            {elearnings.length === 0 && (
                <p>Geen e-learning beschikbaar</p>
            )}

            {elearnings.map((el, index) => (
                <div key={index} className="elearning-item">
                    <p><strong>{el.title}</strong></p>
                    <p>Status: {el.status}</p>
                    <button>Start</button>
                </div>
            ))}
        </div>
    );
}
