import './Hero.css';

function Hero() {


    return (
        <section className="hero is-dark">
            <div className="hero-body">
                <h1>BHV goed geregeld voor jou bedrijf</h1>
                <p>Download de gratis gids + ontvang vrijblijvend een BHV-check voor jou organisatie in omgeving Voorne aan Zee</p>
                <a href="../../../assets/downloads/bhv-gids.pdf" className='cta' download>
                    Download gratis gids
                </a>
            </div>
        </section>
    );
}

export default Hero;