import { Check, RotateCcw, Send } from "lucide-react";

function ChatComplete({
    onSubmit,
    onRestart,
    submitting = false,
    submitted = false,
    error = "",
}) {
    if (submitted) {
        return (
            <div className="chat-complete">
                <div className="chat-complete__status">
                    <span className="chat-complete__icon">
                        <Check aria-hidden="true" />
                    </span>

                    <div>
                        <strong>Bericht verstuurd</strong>
                        <p>
                            Een medewerker neemt contact met je op via de
                            opgegeven contactgegevens.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    className="chat-complete__restart"
                    onClick={onRestart}
                >
                    <RotateCcw aria-hidden="true" />
                    Nieuw gesprek
                </button>
            </div>
        );
    }

    return (
        <div className="chat-complete">
            <div className="chat-complete__status">
                <div>
                    <strong>Alles ingevuld</strong>
                    <p>
                        Controleer je antwoorden hierboven en verstuur daarna
                        het gesprek.
                    </p>
                </div>
            </div>

            {error ? (
                <p className="chat-input__error" role="alert">
                    {error}
                </p>
            ) : null}

            <div className="chat-complete__actions">
                <button
                    type="button"
                    className="chat-complete__secondary"
                    onClick={onRestart}
                    disabled={submitting}
                >
                    <RotateCcw aria-hidden="true" />
                    Opnieuw
                </button>

                <button
                    type="button"
                    className="chat-complete__submit"
                    onClick={onSubmit}
                    disabled={submitting}
                >
                    <Send aria-hidden="true" />
                    {submitting ? "Versturen..." : "Versturen"}
                </button>
            </div>
        </div>
    );
}

export default ChatComplete;