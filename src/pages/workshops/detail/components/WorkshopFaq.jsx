import {
    useId,
    useState,
} from "react";

export default function WorkshopFaq({
    faqs = [],
    eyebrow = "Veelgestelde vragen",
    title = "Nog iets weten over deze workshop?",
    introduction = "Hieronder beantwoorden we een aantal praktische vragen. Staat jouw situatie er niet tussen? Neem dan gerust contact met ons op.",
    defaultOpen = null,
}) {
    const [openFaq, setOpenFaq] =
        useState(defaultOpen);

    const generatedId = useId()
        .replaceAll(":", "");

    if (!faqs.length) {
        return null;
    }

    return (
        <section
            className="wd-faq"
            aria-labelledby={`${generatedId}-title`}
        >
            <div className="wd-shell wd-faq__layout">
                <div className="wd-faq__intro">
                    {eyebrow && (
                        <p className="wd-kicker">
                            {eyebrow}
                        </p>
                    )}

                    <h2 id={`${generatedId}-title`}>
                        {title}
                    </h2>

                    {introduction && (
                        <p>{introduction}</p>
                    )}
                </div>

                <div className="wd-faq__items">
                    {faqs.map((faq, index) => {
                        const isOpen =
                            openFaq === index;

                        const buttonId =
                            `${generatedId}-button-${index}`;

                        const answerId =
                            `${generatedId}-answer-${index}`;

                        return (
                            <article
                                className={
                                    `wd-faq__item${
                                        isOpen
                                            ? " is-open"
                                            : ""
                                    }`
                                }
                                key={faq.question}
                            >
                                <h3 className="wd-faq__heading">
                                    <button
                                        id={buttonId}
                                        className="wd-faq__question"
                                        type="button"
                                        aria-expanded={
                                            isOpen
                                        }
                                        aria-controls={
                                            answerId
                                        }
                                        onClick={() =>
                                            setOpenFaq(
                                                isOpen
                                                    ? null
                                                    : index
                                            )
                                        }
                                    >
                                        <span>
                                            {faq.question}
                                        </span>

                                        <span
                                            className="wd-faq__plus"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </h3>

                                <div
                                    id={answerId}
                                    className="wd-faq__answer"
                                    role="region"
                                    aria-labelledby={
                                        buttonId
                                    }
                                    aria-hidden={!isOpen}
                                >
                                    <div>
                                        <p>
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}