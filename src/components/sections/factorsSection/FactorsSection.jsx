import React from 'react';
import CheckFat from "../../../assets/icons/check-fat.svg";


const FactorsSection = ({
                            title,
                            description,
                            factors = [],
                            className = '',
                            classNameLeft = '',
                            classNameRight = '',
                            imageSrc = null,
                            imageAlt = '',
                            imagePosition = 'right', // 'left' of 'right'
                        }) => {
    // flexDirection bepalen
    const flexDirection = imagePosition === 'left' ? 'row-reverse' : 'row';

    return (
        <section
            className={`containerFactor ${className}`}
            style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                flexDirection: flexDirection,
            }}
        >
            <div className={`container-left ${classNameLeft}`}>
                <h3>{title}</h3>
                <p>{description}</p>
                <ol className="factor-list">
                    {factors.map((factor, index) => (
                        <li key={index}>
                            <CheckFat size={20} color="#008000" weight="fill" />
                            <i>{factor}</i>
                        </li>
                    ))}
                </ol>
            </div>

            {imageSrc && (
                <div className={`container-right ${classNameRight}`}>
                    <img src={imageSrc} alt={imageAlt} style={{ maxWidth: '100%' }} />
                </div>
            )}
        </section>
    );
};

export default FactorsSection;
