function DragDropQuestion({ question, onAnswer }) {
    // Simpel placeholder — echte drag&drop later
    const handleDrop = () => onAnswer(true);

    return (
        <div>
            <h2>{question.question}</h2>
            <img src={question.image} alt="Doel" style={{ maxWidth: "300px" }} />
            <div
                style={{
                    marginTop: "1rem",
                    padding: "2rem",
                    border: "2px dashed gray",
                    width: "200px",
                }}
                onClick={handleDrop}
            >
                Sleep hier: <img src={question.draggable} alt="Item" width="50" />
            </div>
        </div>
    );
}
export default DragDropQuestion;
