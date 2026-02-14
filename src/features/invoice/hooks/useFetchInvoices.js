import { useEffect, useState } from "react";
import { fetchInvoices } from "@/api/api.js";

export function useFetchInvoices(klantId) {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        if (klantId) {
            fetchInvoices(klantId).then(setInvoices);
        }
    }, [klantId]);

    return invoices;
}
