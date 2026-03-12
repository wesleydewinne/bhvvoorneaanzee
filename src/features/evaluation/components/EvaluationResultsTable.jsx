import { formatDate } from "../helpers/evaluationHelpers";

export default function EvaluationResultsTable({ responses = [] }) {
    return (
        <section
            className="evaluation-results-table-section"
            aria-labelledby="evaluation-results-table-title"
        >
            <h2 id="evaluation-results-table-title">Individuele resultaten</h2>

            {responses.length === 0 ? (
                <p>Er zijn nog geen resultaten beschikbaar.</p>
            ) : (
                <div className="evaluation-results-table-wrapper">
                    <table className="evaluation-results-table">
                        <thead>
                        <tr>
                            <th>Deelnemer</th>
                            <th>Datum</th>
                            <th>Aanbevelen</th>
                            <th>Sterk</th>
                            <th>Verbeterpunt</th>
                            <th>Overig</th>
                        </tr>
                        </thead>
                        <tbody>
                        {responses.map((response, index) => (
                            <tr key={response.id ?? index}>
                                <td>{response.participantName ?? "Anoniem"}</td>
                                <td>{formatDate(response.submittedAt)}</td>
                                <td>{response.recommend ?? "-"}</td>
                                <td>{response.commentStrong ?? "-"}</td>
                                <td>{response.commentImprove ?? "-"}</td>
                                <td>{response.commentOther ?? "-"}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}