import { UserRound, X } from "lucide-react";

function ChatHeader({
    title = "Waarmee kunnen we helpen?",
    subtitle = "We stellen je een paar korte vragen.",
    onClose,
}) {
    return (
        <header className="chat-header">
            <div className="chat-header__avatar">
                <UserRound aria-hidden="true" />
            </div>

            <div className="chat-header__content">
                <h2 id="chat-title">
                    {title}
                </h2>

                <p>
                    {subtitle}
                </p>
            </div>

            <button
                type="button"
                className="chat-header__close"
                onClick={onClose}
                aria-label="Chat sluiten"
            >
                <X aria-hidden="true" />
            </button>
        </header>
    );
}

export default ChatHeader;