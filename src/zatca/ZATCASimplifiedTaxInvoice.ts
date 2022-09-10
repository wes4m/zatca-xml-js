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

        // TODO: Validate Invoice

    }


    /**
     * Removes (UBLExtensions (Signing), Signature Envelope, and QR data) Elements. Then canonicalizes the XML to c14n.
     * In Order to prep for hashing.
     */
    private getPureInvoice() {
        const invoice_copy = new XMLDocument(this.invoice_xml.toString({no_header: false}));
        invoice_copy.delete("Invoice/ext:UBLExtensions");
        invoice_copy.delete("Invoice/cac:Signature");
        invoice_copy.delete("Invoice/cac:AdditionalDocumentReference", {"cbc:ID": "QR"});

        return invoice_copy;
    }

    getInvoiceHash(): string {
        const pure_invoice: XMLDocument = this.getPureInvoice();
        console.log(pure_invoice.toString({no_header: false}));
        
        return "";
    }



}

