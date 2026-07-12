import { MessageCircle } from "lucide-react";
import { useState } from "react";

function ChatLauncher({
    onOpen,
    open = false,
    stacked = true,
}) {
    const [mobileExpanded, setMobileExpanded] = useState(false);

    function handleClick() {
        const isMobile = window.matchMedia("(max-width: 640px)").matches;

        if (isMobile && !mobileExpanded) {
            setMobileExpanded(true);
            return;
        }

        setMobileExpanded(false);
        onOpen();
    }

    return (
        <button
            type="button"
            className={[
                "chat-launcher",
                stacked ? "chat-launcher--stacked" : "",
                mobileExpanded ? "chat-launcher--expanded" : "",
            ]
                .filter(Boolean)
                .join(" ")}
            onClick={handleClick}
            onBlur={() => setMobileExpanded(false)}
            aria-label="Chat openen"
            aria-expanded={open}
            aria-controls="chat-widget"
        >
            <MessageCircle aria-hidden="true" />

            <span>
                <small>Hulp nodig?</small>
                Start een chat
            </span>
        </button>
    );
}

export default ChatLauncher;
