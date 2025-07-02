import './Testimonial.css';

function Testimonial() {
    return (
        <>
            <section>
                <h2>Wat andere bedrijven zeggen over BHV Voorne aan zee</h2>
                <div className='testimonial-cards'>
                    <div className='testimonial-card'>
                        <p>
                            "Dankzij"
                        </p>
                        <h4>
                            naam
                        </h4>
                        <span className='company'>
                            Bedrijfsnaam
                        </span>
                    </div>

                    <div className='testimonial-card'>
                        <p>
                            "Dankzij"
                        </p>
                        <h4>
                            naam
                        </h4>
                        <span className='company'>
                            Bedrijfsnaam
                        </span>
                    </div>

                    <div className='testimonial-card'>
                        <p>
                            "Dankzij"
                        </p>
                        <h4>
                            naam
                        </h4>
                        <span className='company'>
                            Bedrijfsnaam
                        </span>
                    </div>


                </div>
            </section>
        </>
    );
}

export default Testimonial;