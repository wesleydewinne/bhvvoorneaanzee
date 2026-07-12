import { useEffect, useState } from "react";

import useChatFlow from "../hooks/useChatFlow.js";

import ChatHeader from "./ChatHeader.jsx";
import ChatComplete from "./ChatComplete.jsx";
import ChatInput from "./ChatInput.jsx";
import ChatLauncher from "./ChatLauncher.jsx";
import ChatMessages from "./ChatMessages.jsx";
import ChatOptions from "./ChatOptions.jsx";

import "../styles/ChatWidget.css";

function ChatWidget({ stacked = true }) {
    const [open, setOpen] = useState(false);

    const {
        messages,
        currentQuestion,
        routeOptions,
        error,
        isTyping,
        isStarted,
        isChoosingRoute,
        isAnsweringQuestion,
        isComplete,
        isSubmitting,
        isSubmitted,
        interactionDisabled,
        startConversation,
        selectRoute,
        submitAnswer,
        submitConversation,
        resetConversation,
    } = useChatFlow();

    useEffect(() => {
        if (open && !isStarted) {
            startConversation();
        }
    }, [open, isStarted, startConversation]);

    function closeChat() {
        setOpen(false);
    }

    return (
        <>
            <ChatLauncher
                open={open}
                stacked={stacked}
                onOpen={() => setOpen(true)}
            />

            {open ? (
                <section
                    id="chat-widget"
                    className={[
                        "chat-widget",
                        stacked ? "chat-widget--stacked" : "",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby="chat-title"
                >
                    <ChatHeader onClose={closeChat} />

                    <div className="chat-widget__development-notice" role="status">
                        <strong>Chat binnenkort beschikbaar</strong>
                        <span>
                            Deze chat werkt nog niet volledig. Invullen en versturen heeft daarom op dit moment nog geen zin.
                        </span>
                    </div>

                    <ChatMessages
                        messages={messages}
                        isTyping={isTyping}
                    />

                    {isChoosingRoute ? (
                        <ChatOptions
                            options={routeOptions}
                            disabled={interactionDisabled}
                            onSelect={selectRoute}
                        />
                    ) : null}

                    {isAnsweringQuestion &&
                    currentQuestion?.type === "choice" ? (
                        <ChatOptions
                            options={currentQuestion.options}
                            disabled={interactionDisabled}
                            onSelect={submitAnswer}
                        />
                    ) : null}

                    {isComplete ? (
                        <ChatComplete
                            error={error}
                            submitting={isSubmitting}
                            submitted={isSubmitted}
                            onSubmit={submitConversation}
                            onRestart={resetConversation}
                        />
                    ) : null}

                    {isAnsweringQuestion &&
                    currentQuestion &&
                    currentQuestion.type !== "choice" ? (
                        <ChatInput
                            key={currentQuestion.id}
                            question={currentQuestion}
                            error={error}
                            disabled={interactionDisabled}
                            onSubmit={submitAnswer}
                        />
                    ) : null}
                </section>
            ) : null}
        </>
    );
}

export default ChatWidget;
