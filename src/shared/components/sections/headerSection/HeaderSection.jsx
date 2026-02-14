import "./HeaderSection.css";

function HeaderSection({ mainTitle, subTitle, image }) {
    return (
        <section className="site-hero">
            <img src={image} alt="" className="site-hero-image" loading="eager" fetchpriority="high" />

            <div className="site-hero-overlay">
                <div className="site-hero-text">
                    {mainTitle && <h1 className="site-hero-title">{mainTitle}</h1>}
                    {subTitle && <p className="site-hero-subtitle">{subTitle}</p>}
                </div>
            </div>
        </section>
    );
}

export default HeaderSection;
