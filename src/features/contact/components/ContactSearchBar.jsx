// src/features/contact/components/ContactSearchBar.jsx
function ContactSearchBar({ value, onChange, placeholder = "Zoek op naam, e-mail of bericht" }) {
    return (
        <div className="contact-search-bar">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}

export default ContactSearchBar;