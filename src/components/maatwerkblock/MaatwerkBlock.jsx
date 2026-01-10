import "./MaatwerkBlock.css";
import checkIcon from "@/assets/icons/check-fat.svg";

function MaatwerkBlock({ image, title, items, description }) {
    return (
        <article className="maatwerk-block">

            {/* Titel */}
            <h3 className="maatwerk-block-title">{title}</h3>

            {/* Afbeelding + lijst */}
            <div className="maatwerk-block-content">

                {/* Afbeelding */}
                <div className="maatwerk-block-image">
                    <img src={image} alt={title} loading="lazy" />
                </div>

                {/* Opsomming met icoon */}
                <ul className="maatwerk-block-list">
                    {items.map((item, index) => (
                        <li key={index} className="maatwerk-block-list-item">
                            <img
                                src={checkIcon}
                                alt=""
                                aria-hidden="true"
                                className="maatwerk-block-list-icon"
                            />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>

            </div>

            {/* Tekst onder */}
            <p className="maatwerk-block-description">
                {description}
            </p>

        </article>
    );
}

export default MaatwerkBlock;
