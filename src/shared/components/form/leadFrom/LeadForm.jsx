import './LeadForm.css';
import { useState } from "react";
import { generateBhvPdfWithLogo } from '@/shared/utils/generateBhvPdfWithLogo.js';

function LeadForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
    });

    const [showModal, setShowModal] = useState(false);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted!", formData);
        setShowModal(true); // show popup
    };

    const handleDownload = () => {
        // eventueel download opnieuw triggeren
        generateBhvPdfWithLogo(formData.name, formData.company, formData.email);
        setShowModal(false);
    };

    return (
        <section>
            <h2 style={{ textAlign: 'center' }}>Vraag hier gratis BHV-check aan</h2>

            <form onSubmit={handleSubmit} className="lead-form">
                <input type="text" name="name" placeholder="Naam" onChange={handleChange} required />
                <input type="email" name="email" placeholder="E-mailadres" onChange={handleChange} required />
                <input type="text" name="company" placeholder="Bedrijfsnaam" onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Telefoonnummer" onChange={handleChange} required />
                <button type="submit">Plan een gratis BHV-check</button>
            </form>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Welkom, {formData.name}!</h3>
                        <p>
                            We zijn blij dat je de tijd neemt om dit formulier te downloaden. <br />
                            Alles wat je nodig hebt om goed voorbereid te zijn, staat erin. <br /> <br />
                            Heb je vragen? <br /> <br />
                            We staan voor je klaar!
                        </p>
                        <button onClick={handleDownload}>Download het formulier</button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default LeadForm;
