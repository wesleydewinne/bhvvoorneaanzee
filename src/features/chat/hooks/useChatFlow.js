import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    CHAT_ROUTES,
    getAnswerLabel,
    getQuestions,
    getRouteLabel,
} from "../config/chatFlow.js";
import chatService from "../services/chatService.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_TYPING_DELAY = 500;
const MAX_TYPING_DELAY = 2100;

function getTypingDelay(text, baseDelay) {
    const readingDelay = Math.min(String(text || "").length * 14, 900);
    const naturalVariation = Math.floor(Math.random() * 550);
    return Math.min(baseDelay + readingDelay + naturalVariation, MAX_TYPING_DELAY);
}

function createMessage(sender, text) {
    return {
        id: crypto.randomUUID(),
        sender,
        text,
    };
}

function validateAnswer(question, answer) {
    const value = String(answer ?? "").trim();

    if (question.required && !value) {
        return "Vul eerst een antwoord in.";
    }

    if (
        question.type === "email" &&
        value &&
        !EMAIL_PATTERN.test(value)
    ) {
        return "Vul een geldig e-mailadres in.";
    }

    if (
        question.type === "number" &&
        value &&
        Number(value) <= 0
    ) {
        return "Vul een getal groter dan nul in.";
    }

    return "";
}

function useChatFlow({ typingDelay = DEFAULT_TYPING_DELAY } = {}) {
    const [messages, setMessages] = useState([]);
    const [route, setRoute] = useState(null);
    const [answers, setAnswers] = useState({});
    const [questionIndex, setQuestionIndex] = useState(0);
    const [phase, setPhase] = useState("idle");
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const timeoutRef = useRef(null);
    const submittingRef = useRef(false);

    const questions = useMemo(() => {
        if (!route) {
            return [];
        }

        return getQuestions(route, answers);
    }, [route, answers]);

    const currentQuestion =
        phase === "questions"
            ? questions[questionIndex] ?? null
            : null;

    const routeOptions = useMemo(
        () =>
            CHAT_ROUTES.map((item) => ({
                value: item.value,
                label: item.label,
                description: item.description,
            })),
        []
    );

    const clearTypingTimeout = useCallback(() => {
        if (!timeoutRef.current) {
            return;
        }

        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
    }, []);

    const showAssistantMessage = useCallback(
        (text, callback) => {
            clearTypingTimeout();
            setIsTyping(true);
            setError("");

            timeoutRef.current = window.setTimeout(() => {
                setMessages((current) => [
                    ...current,
                    createMessage("assistant", text),
                ]);

                setIsTyping(false);
                timeoutRef.current = null;

                callback?.();
            }, getTypingDelay(text, typingDelay));
        },
        [clearTypingTimeout, typingDelay]
    );

    const startConversation = useCallback(() => {
        if (phase !== "idle") {
            return;
        }

        setPhase("starting");

        showAssistantMessage(
            "Welkom! Waar kunnen we je mee helpen?",
            () => {
                setPhase("route");
            }
        );
    }, [phase, showAssistantMessage]);

    const selectRoute = useCallback(
        (selectedRoute) => {
            if (isTyping || phase !== "route") {
                return;
            }

            const routeLabel = getRouteLabel(selectedRoute);
            const firstQuestion = getQuestions(selectedRoute, {})[0];

            if (!firstQuestion) {
                return;
            }

            setMessages((current) => [
                ...current,
                createMessage("user", routeLabel),
            ]);

            setRoute(selectedRoute);
            setAnswers({});
            setQuestionIndex(0);
            setPhase("transition");

            showAssistantMessage(firstQuestion.question, () => {
                setPhase("questions");
            });
        },
        [isTyping, phase, showAssistantMessage]
    );

    const submitAnswer = useCallback(
        (answer) => {
            if (
                isTyping ||
                phase !== "questions" ||
                !currentQuestion
            ) {
                return false;
            }

            const validationError = validateAnswer(
                currentQuestion,
                answer
            );

            if (validationError) {
                setError(validationError);
                return false;
            }

            const normalizedAnswer = String(answer ?? "").trim();

            const answerLabel = getAnswerLabel(
                currentQuestion,
                normalizedAnswer
            );

            const nextAnswers = {
                ...answers,
                [currentQuestion.id]: normalizedAnswer,
            };

            const nextQuestions = getQuestions(route, nextAnswers);
            const nextQuestionIndex = questionIndex + 1;
            const nextQuestion = nextQuestions[nextQuestionIndex];

            setMessages((current) => [
                ...current,
                createMessage("user", answerLabel || "Overgeslagen"),
            ]);

            setAnswers(nextAnswers);
            setError("");
            setPhase("transition");

            if (nextQuestion) {
                showAssistantMessage(nextQuestion.question, () => {
                    setQuestionIndex(nextQuestionIndex);
                    setPhase("questions");
                });

                return true;
            }

            showAssistantMessage(
                "Bedankt! Je antwoorden zijn compleet. Controleer ze voordat je het gesprek afrondt.",
                () => {
                    setQuestionIndex(nextQuestionIndex);
                    setPhase("complete");
                }
            );

            return true;
        },
        [
            answers,
            currentQuestion,
            isTyping,
            phase,
            questionIndex,
            route,
            showAssistantMessage,
        ]
    );

    const resetConversation = useCallback(() => {
        clearTypingTimeout();

        setMessages([]);
        setRoute(null);
        setAnswers({});
        setQuestionIndex(0);
        setPhase("idle");
        setIsTyping(false);
        setError("");
        setIsSubmitting(false);
        setIsSubmitted(false);
        submittingRef.current = false;
    }, [clearTypingTimeout]);

    const submitConversation = useCallback(async () => {
        if (!route || phase !== "complete" || submittingRef.current || isSubmitted) {
            return false;
        }

        submittingRef.current = true;
        setIsSubmitting(true);
        setError("");

        try {
            await chatService.createConversation({
                route,
                answers,
                visitor: {
                    name: answers.name || null,
                    company: answers.company || null,
                    email: answers.email || null,
                    phone: answers.phone || null,
                },
                source: "WEBSITE_CHAT",
                requestHumanAgent: true,
            });

            setIsSubmitted(true);
            setMessages((current) => [
                ...current,
                createMessage("assistant", "Je bericht is verstuurd. Een medewerker neemt contact met je op."),
            ]);
            return true;
        } catch (requestError) {
            setError(requestError?.message || "Het bericht kon niet worden verstuurd. Probeer het opnieuw.");
            return false;
        } finally {
            submittingRef.current = false;
            setIsSubmitting(false);
        }
    }, [answers, isSubmitted, phase, route]);

    useEffect(() => {
        return () => {
            clearTypingTimeout();
        };
    }, [clearTypingTimeout]);

    return {
        messages,
        route,
        answers,
        phase,
        error,
        isTyping,
        isSubmitting,
        isSubmitted,

        currentQuestion,
        routeOptions,

        isStarted: phase !== "idle",
        isChoosingRoute: phase === "route",
        isAnsweringQuestion: phase === "questions",
        isComplete: phase === "complete",
        interactionDisabled: isTyping || isSubmitting || phase === "transition",

        startConversation,
        selectRoute,
        submitAnswer,
        submitConversation,
        resetConversation,
    };
}

export default useChatFlow;
