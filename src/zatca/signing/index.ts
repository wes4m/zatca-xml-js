import { XmlCanonicalizer } from "xmldsigjs";
import xmldom from "xmldom";
import { createHash } from "crypto";

import { XMLDocument } from "../../parser";

/**
 * Removes (UBLExtensions (Signing), Signature Envelope, and QR data) Elements. Then canonicalizes the XML to c14n.
 * In Order to prep for hashing.
 * @param invoice_xml XMLDocument
 * @returns purified Invoice XML string
 */
export const getPureInvoiceString = (invoice_xml: XMLDocument): string => {
    const invoice_copy = new XMLDocument(invoice_xml.toString({no_header: false}));
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

/**
 * Hashes Invoice
 * @param invoice_xml XMLDocument
 * @returns String Invoice hash encoded in base64
 */
export const getInvoiceHash = (invoice_xml: XMLDocument): string => {
    const pure_invoice_string: string = getPureInvoiceString(invoice_xml);
    return createHash("sha256").update(pure_invoice_string).digest('base64');
}
