import { XMLDocument } from "../parser";
import defaultSimplifiedTaxInvoice, { ZATCASimplifiedInvoiceProps } from "./templates/simplified_tax_invoice_template";

export class ZATCASimplifiedTaxInvoice {

    private invoice_xml: XMLDocument;

    /**
     * Parses a ZATCA Simplified Tax Invoice XML string. Or creates a new one based on given props.
     * @param invoice_xml_str Invoice XML string to parse.
     * @param props ZATCASimplifiedInvoiceProps props to create a new unsigned invoice.
     */
    constructor({invoice_xml_str, props}: {invoice_xml_str?: string, props?: ZATCASimplifiedInvoiceProps}) {

        if (invoice_xml_str) {
            this.invoice_xml = new XMLDocument(invoice_xml_str);
            if (!this.invoice_xml) throw ("Error parsing invoice XML string.");
        } else {
            if (!props) throw ("Unable to create new XML invoice.");
            this.invoice_xml = new XMLDocument(defaultSimplifiedTaxInvoice(props));
        }

        // TODO: Validate Invoice
        // ..
    }

    getXML(): XMLDocument {
        return this.invoice_xml;
    }

}

