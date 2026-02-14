export default function SessionWarningPopup({ onStayLoggedIn, onLogout, minutesRemaining = 15 }) {

    return (
        <div className="session-popup">
            <div className="popup-content">
                <h2>Sessie verloopt bijna</h2>
                <p>Je wordt over <strong>{minutesRemaining} minuten</strong> automatisch uitgelogd.</p>
                <p>Wil je ingelogd blijven?</p>

                <div className="buttons">
                    <button className="stay" onClick={onStayLoggedIn}>Ingelogd blijven</button>
                    <button className="logout" onClick={onLogout}>Uitloggen</button>
                </div>
            </div>
        </div>
    );
}
