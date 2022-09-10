import { XMLDocument } from "../parser";
import DEFAULT_INVOICE from "./templates/simplified_tax_invoice_template";

export class ZATCASimplifiedTaxInvoice {

    private invoice_xml: XMLDocument;

    /**
     * Parses a ZATCA Simplified Tax Invoice XML string. Or creates a new empty one.
     * @param invoice_xml_str Invoice XML string.
     */
    constructor(invoice_xml_str?: string) {

        if (invoice_xml_str) {
            this.invoice_xml = new XMLDocument(invoice_xml_str);
            if (!this.invoice_xml) throw ("Error parsing invoice XML string.")
        } else {
            this.invoice_xml = new XMLDocument(DEFAULT_INVOICE);
        }

    }



}
