import { XmlCanonicalizer } from "xmldsigjs";
import xmldom from "xmldom";
import { createHash } from "crypto";

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
    private getPureInvoiceString(): string {
        const invoice_copy = new XMLDocument(this.invoice_xml.toString({no_header: false}));
        invoice_copy.delete("Invoice/ext:UBLExtensions");
        invoice_copy.delete("Invoice/cac:Signature");
        invoice_copy.delete("Invoice/cac:AdditionalDocumentReference", {"cbc:ID": "QR"});

        const invoice_xml_dom = (new xmldom.DOMParser()).parseFromString(
            invoice_copy.toString({no_header: false})
        );
        
        var canonicalizer = new XmlCanonicalizer(false, false);
        const canonicalized_xml_str: string = canonicalizer.Canonicalize(invoice_xml_dom);        

        return canonicalized_xml_str;
    }

    getInvoiceHash(): string {
        const pure_invoice_string: string = this.getPureInvoiceString();
        return createHash("sha256").update(pure_invoice_string).digest('base64');
    }



}

