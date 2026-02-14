// src/components/Checklist/ChecklistSection.jsx
import React from "react";
import Checklist from "@/features/quiz/components/checklist/Checklist.jsx";
import './ChecklistSection.css';


function ChecklistSection({ title = "Checklist", items }) {
    return (
        <section className="checklist-section">
            <h2>{title}</h2>
            <Checklist items={items} />
        </section>
    );
}

export default ChecklistSection;
