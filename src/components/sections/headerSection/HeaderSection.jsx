import React from "react";
import "./HeaderSection.css";

function HeaderSection({ mainTitle, subTitle, backgroundImage }) {
    return (
        <section
            className="header-section"
            style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none" }}
        >
            {mainTitle && <h1 className="title-main">{mainTitle}</h1>}
            {subTitle && <p className="title-sub">{subTitle}</p>}
        </section>
    );
}

export default HeaderSection;