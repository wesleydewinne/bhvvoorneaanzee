import { Link } from "react-router-dom";
import "./QuizIntroPage.css";

function QuizIntroPage() {
    return (
        <div className="quiz-intro">
            <h1>Welkom bij de BHV Quiz</h1>
            <p>
                In deze quiz test je je kennis over BHV. Hieronder de uitleg:
            </p>

            <ul>
                <li><span className="dot gray"></span> Grijs: vraag nog niet geopend</li>
                <li><span className="dot purple"></span> Paars: huidige vraag</li>
                <li><span className="dot orange"></span> Oranje: geopend maar nog niet beantwoord</li>
                <li><span className="dot green"></span> Groen: beantwoord</li>
            </ul>

            <p>
                Je kunt vragen overslaan, maar die blijven oranje totdat je ze beantwoordt.
                De quiz kan pas afgesloten worden als alle vragen groen zijn.
            </p>

            <Link to="/quiz">
                <button className="start-btn">Start de quiz</button>
            </Link>
        </div>
    );
}

export default QuizIntroPage;
