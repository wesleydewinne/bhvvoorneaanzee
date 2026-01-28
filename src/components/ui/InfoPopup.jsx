import { createPortal } from "react-dom";
import { useEffect } from "react";
import "./InfoPopup.css";

export default function InfoPopup({ title, message, onClose }) {

    const mailtoLink =
        "mailto:klantenservice@bhvvoorneaanzee.nl" +
        "?subject=" + encodeURIComponent("Offerteaanvraag BHV-training") +
        "&body=" + encodeURIComponent(
            "Geachte heer/mevrouw,\n\n" +
            "Graag ontvang ik een offerte voor een training.\n\n" +
            "Gewenste training:\n" +
            "Datum:\n" +
            "Aantal deelnemers:\n" +
            "Locatie:\n\n" +
            "Met vriendelijke groet,\n" +
            "[Naam]\n" +
            "[Bedrijf]\n" +
            "[Telefoonnummer]"
        );


    useEffect(() => {
        document.body.classList.add("modal-open");
        return () => document.body.classList.remove("modal-open");
    }, []);

    return createPortal(
        <div className="info-popup-fixed" role="dialog" aria-modal="true">
            <h2 className="info-popup-title">
                {title}
            </h2>

            <p className="info-popup-message">
                {message}
            </p>

            <p className="info-popup-contact">
                Wilt u een offerte aanvragen?<br />
                Stuur dan een e-mail naar{" "}
                <a
                    href={mailtoLink}
                    className="info-popup-email"
                    title="Offerte aanvragen via e-mail"
                >
                    klantenservice@bhvvoorneaanzee.nl
                </a>

            </p>

            <button
                className="btn-primary info-popup-button"
                onClick={onClose}
            >
                Ik begrijp het
            </button>
        </div>,
        document.body
    );
}
