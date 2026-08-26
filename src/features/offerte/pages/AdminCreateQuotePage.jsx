import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuotePdfForm from "../components/QuotePdfForm.jsx";
import { createInitialQuote } from "../helpers/quoteHelpers.js";
import quoteService from "../services/quoteService.js";
import "../styles/Offerte.css";

export default function AdminCreateQuotePage() {
  const navigate = useNavigate();
  const [initial] = useState(createInitialQuote);
  const save = async (payload) => {
    const created = await quoteService.create(payload);
    navigate(`/admin/offertes/${created.id}`);
  };
  return (
    <main className="quote-admin-page">
      <header className="quote-page-header">
        <div>
          <p className="quote-eyebrow">Offertebeheer</p>
          <h1>Nieuwe offerte</h1>
          <p>De backend bepaalt groepen, prijzen, btw en totalen.</p>
        </div>
        <Link to="/admin/offertes" className="quote-secondary-button">
          Terug
        </Link>
      </header>
      <QuotePdfForm
        initialValue={initial}
        onSave={save}
        disableCustomerAutofill
      />
    </main>
  );
}
