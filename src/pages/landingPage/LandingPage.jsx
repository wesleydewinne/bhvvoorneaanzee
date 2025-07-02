import './LandingPage.css';
import Testimonial from "../../components/landingForm/testimonial/Testimonial.jsx";
import Hero from "../../components/landingForm/hero/Hero.jsx";
import Leadform from "../../components/landingForm/leadFrom/LeadForm.jsx";
import React from "react";



function LandingPage() {
    return (
        <>
          <Hero />
          <Leadform />
          <Testimonial />
        </>
    );
}

export default LandingPage;