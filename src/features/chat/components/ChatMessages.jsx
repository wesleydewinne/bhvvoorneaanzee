import { useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage.jsx";
import TypingIndicator from "./TypingIndicator.jsx";

function ChatMessages({
    messages = [],
    isTyping = false,
}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
        });
    }, [messages, isTyping]);

    return (
        <div
            ref={containerRef}
            className="chat-messages"
            aria-live="polite"
            aria-relevant="additions"
        >
            {messages.map((message) => (
                <ChatMessage
                    key={message.id}
                    message={message}
                />
            ))}

            {isTyping ? (
                <TypingIndicator />
            ) : null}
        </div>
    );
}

export default ChatMessages;