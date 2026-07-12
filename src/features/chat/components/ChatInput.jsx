import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

function ChatInput({
    question,
    onSubmit,
    disabled = false,
    error = "",
}) {
    const [value, setValue] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            inputRef.current?.focus();
        }, 50);

        return () => window.clearTimeout(timeoutId);
    }, [question?.id]);

    function handleSubmit(event) {
        event.preventDefault();

        if (disabled || !question) {
            return;
        }

        const accepted = onSubmit(value);

        if (accepted) {
            setValue("");
        }
    }

    if (!question || question.type === "choice") {
        return null;
    }

    const commonProps = {
        ref: inputRef,
        value,
        disabled,
        placeholder: question.placeholder ?? "",
        maxLength: question.maxLength,
        onChange: (event) => setValue(event.target.value),
        "aria-label": question.question,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? "chat-input-error" : undefined,
    };

    return (
        <form
            className="chat-input"
            onSubmit={handleSubmit}
        >
            <div className="chat-input__field">
                {question.type === "textarea" ? (
                    <textarea
                        {...commonProps}
                        rows={4}
                    />
                ) : (
                    <input
                        {...commonProps}
                        type={question.type ?? "text"}
                        min={question.type === "number" ? 1 : undefined}
                        inputMode={
                            question.type === "number"
                                ? "numeric"
                                : question.type === "email"
                                  ? "email"
                                  : question.type === "tel"
                                    ? "tel"
                                    : "text"
                        }
                    />
                )}

                {error ? (
                    <p
                        id="chat-input-error"
                        className="chat-input__error"
                        role="alert"
                    >
                        {error}
                    </p>
                ) : null}
            </div>

            <button
                type="submit"
                className="chat-input__send"
                disabled={disabled}
                aria-label="Antwoord versturen"
            >
                <Send aria-hidden="true" />
            </button>
        </form>
    );
}

export default ChatInput;
