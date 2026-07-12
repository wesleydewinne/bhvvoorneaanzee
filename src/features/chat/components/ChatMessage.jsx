function ChatMessage({ message }) {
    return (
        <div
            className={`message message--${message.sender}`}
        >
            <div className="message__bubble">
                {message.text}
            </div>
        </div>
    );
}

export default ChatMessage;