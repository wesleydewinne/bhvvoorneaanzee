import { useEffect, useState } from "react";
import invoiceService from "../service/invoiceService.js";

export function useFetchInvoices(invoiceId) {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        let mounted = true;

        async function loadInvoice() {
            if (!invoiceId) {
                setInvoices([]);
                return;
            }

            const invoice = await invoiceService.getById(invoiceId);

            if (mounted) {
                setInvoices(invoice ? [invoice] : []);
            }
        }

        loadInvoice().catch(() => {
            if (mounted) {
                setInvoices([]);
            }
        });

        return () => {
            mounted = false;
        };
    }, [invoiceId]);

    return invoices;
}
