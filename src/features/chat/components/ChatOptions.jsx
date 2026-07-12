function ChatOptions({
    options = [],
    onSelect,
    disabled = false,
}) {
    return (
        <div className="chat-options">

            {options.map((option) => (

                <button
                    key={option.value}
                    type="button"
                    className="chat-option"
                    disabled={disabled}
                    onClick={() => onSelect(option.value)}
                >

                    <span className="chat-option__content">

                        <strong>
                            {option.label}
                        </strong>

                        {option.description && (
                            <small>
                                {option.description}
                            </small>
                        )}

                    </span>

                </button>

            ))}

        </div>
    );
}

export default ChatOptions;