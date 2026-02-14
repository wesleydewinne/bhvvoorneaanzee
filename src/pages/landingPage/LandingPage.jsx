import './LandingPage.css';
import Testimonial from "@/shared/components/sections/landing/testimonial/Testimonial.jsx";
import Hero from "@/shared/components/sections/landing/hero/Hero.jsx";
import Leadform from "@/shared/components/form/leadFrom/LeadForm.jsx";
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