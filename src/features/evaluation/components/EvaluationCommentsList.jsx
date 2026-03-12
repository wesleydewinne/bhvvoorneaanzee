export default function EvaluationCommentsList({ responses = [] }) {
    const commentResponses = responses.filter(
        (response) =>
            response?.commentStrong?.trim() ||
            response?.commentImprove?.trim() ||
            response?.commentOther?.trim()
    );

    return (
        <section
            className="evaluation-comments-list"
            aria-labelledby="evaluation-comments-title"
        >
            <h2 id="evaluation-comments-title">Opmerkingen van deelnemers</h2>

            {commentResponses.length === 0 ? (
                <p>Er zijn nog geen opmerkingen toegevoegd.</p>
            ) : (
                <ul className="evaluation-comments-list__items">
                    {commentResponses.map((response, index) => (
                        <li key={response.id ?? index}>
                            <article className="evaluation-comment-card">
                                <header className="evaluation-comment-card__header">
                                    <h3>Reactie {index + 1}</h3>
                                </header>

                                <div className="evaluation-comment-card__content">
                                    {response.commentStrong?.trim() && (
                                        <div className="evaluation-comment-card__block">
                                            <h4 className="evaluation-comment-card__block-title">
                                                Sterk
                                            </h4>
                                            <p className="evaluation-comment-card__block-text">
                                                {response.commentStrong}
                                            </p>
                                        </div>
                                    )}

                                    {response.commentImprove?.trim() && (
                                        <div className="evaluation-comment-card__block">
                                            <h4 className="evaluation-comment-card__block-title">
                                                Verbeterpunt
                                            </h4>
                                            <p className="evaluation-comment-card__block-text">
                                                {response.commentImprove}
                                            </p>
                                        </div>
                                    )}

                                    {response.commentOther?.trim() && (
                                        <div className="evaluation-comment-card__block">
                                            <h4 className="evaluation-comment-card__block-title">
                                                Overig
                                            </h4>
                                            <p className="evaluation-comment-card__block-text">
                                                {response.commentOther}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}