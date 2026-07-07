import "./HeaderSection.css";

function HeaderSection({ mainTitle, subTitle, image, backgroundImage }) {
    const heroImage = image || backgroundImage;

    return (
        <section className="site-hero">
            {heroImage && (
                <img
                    src={heroImage}
                    alt=""
                    className="site-hero-image"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                />
            )}

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
