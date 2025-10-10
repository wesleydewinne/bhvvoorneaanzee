import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import MultiSelectQuestion from "./MultiSelectQuestion";
import OrderQuestion from "./OrderQuestion";
import DragDropQuestion from "./DragDropQuestion";
import OpenQuestion from "./OpenQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import FillBlankQuestion from "./FillBlankQuestion";
import ImageQuestion from "./ImageQuestion";
import ScenarioQuestion from "./ScenarioQuestion";
import TimedQuestion from "./TimedQuestion";
import MatchingQuestion from "./MatchingQuestion";
import MatrixQuestion from "./MatrixQuestion";
import AudioQuestion from "./AudioQuestion";
import VideoQuestion from "./VideoQuestion";
import RankingQuestion from "./RankingQuestion";
import SimulationQuestion from "./SimulationQuestion";
import PollQuestion from "./PollQuestion";
import ChecklistQuestion from "./ChecklistQuestion";
import MemoryQuestion from "./MemoryQuestion";
import SliderQuestion from "./SliderQuestion";
import DragToRankQuestion from "./DragToRankQuestion";

function QuestionRenderer({ question, onAnswer }) {
    switch (question.type) {
        case "multiple":
            return <MultipleChoiceQuestion question={question} onAnswer={onAnswer} />;
        case "multi-select":
            return <MultiSelectQuestion question={question} onAnswer={onAnswer} />;
        case "order":
            return <OrderQuestion question={question} onAnswer={onAnswer} />;
        case "dragdrop":
            return <DragDropQuestion question={question} onAnswer={onAnswer} />;
        case "open":
            return <OpenQuestion question={question} onAnswer={onAnswer} />;
        case "truefalse":
            return <TrueFalseQuestion question={question} onAnswer={onAnswer} />;
        case "fillblank":
            return <FillBlankQuestion question={question} onAnswer={onAnswer} />;
        case "image":
            return <ImageQuestion question={question} onAnswer={onAnswer} />;
        case "scenario":
            return <ScenarioQuestion question={question} onAnswer={onAnswer} />;
        case "timed":
            return <TimedQuestion question={question} onAnswer={onAnswer} />;
        case "matching":
            return <MatchingQuestion question={question} onAnswer={onAnswer} />;
        case "matrix":
            return <MatrixQuestion question={question} onAnswer={onAnswer} />;
        case "audio":
            return <AudioQuestion question={question} onAnswer={onAnswer} />;
        case "video":
            return <VideoQuestion question={question} onAnswer={onAnswer} />;
        case "ranking":
            return <RankingQuestion question={question} onAnswer={onAnswer} />;
        case "simulation":
            return <SimulationQuestion question={question} onAnswer={onAnswer} />;
        case "poll":
            return <PollQuestion question={question} onAnswer={onAnswer} />;
        case "checklist":
            return <ChecklistQuestion question={question} onAnswer={onAnswer} />;
        case "memory":
            return <MemoryQuestion question={question} onAnswer={onAnswer} />;
        case "slider":
            return <SliderQuestion question={question} onAnswer={onAnswer} />;
        case "drag-to-rank":
            return <DragToRankQuestion question={question} onAnswer={onAnswer} />;
        default:
            return <p>Onbekend vraagtype: {question.type}</p>;
    }
}

export default QuestionRenderer;
