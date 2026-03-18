export default function QuoteAddressBlock({ street, houseNumber, postalCode, city }) {
    return (
        <div className="quote-address-block">
            <div>{[street, houseNumber].filter(Boolean).join(" ") || "-"}</div>
            <div>{[postalCode, city].filter(Boolean).join(" ") || "-"}</div>
        </div>
    );
}