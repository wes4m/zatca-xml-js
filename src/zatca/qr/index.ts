import moment from "moment";


import { XMLDocument } from "../../parser";
import { getInvoiceHash } from "../signing";


interface QRParams {
    invoice_xml: XMLDocument,
    digital_signature: string,
    public_key: Buffer,
    certificate_signature: Buffer
}

/**
 * Generates QR for a given invoice. According to ZATCA (TODO: BUSSINESS TERM RULE)
 * @param invoice_xml XMLDocument.
 * @param digital_signature String base64 encoded digital signature.
 * @param public_key Buffer certificate public key.
 * @param certificate_signature Buffer certificate signature. 
 * @returns String base64 encoded QR data.
 */
export const generateQR = ({invoice_xml, digital_signature, public_key, certificate_signature}: QRParams): string => {

    // Hash 
    const invoice_hash: string = getInvoiceHash(invoice_xml);

    // Extract required tags
    const seller_name = invoice_xml.get("Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyLegalEntity/cbc:RegistrationName")?.[0];
    const VAT_number = invoice_xml.get("Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyTaxScheme/cbc:CompanyID")?.[0];
    const invoice_total = invoice_xml.get("Invoice/cac:LegalMonetaryTotal/cbc:TaxInclusiveAmount")?.[0]["#text"];
    const VAT_total = invoice_xml.get("Invoice/cac:TaxTotal")?.[0]["cbc:TaxAmount"]["#text"];
    const issue_date = invoice_xml.get("Invoice/cbc:IssueDate")?.[0];
    const issue_time = invoice_xml.get("Invoice/cbc:IssueTime")?.[0];
    const invoice_type = invoice_xml.get("Invoice/cbc:InvoiceTypeCode")?.[0]["@_name"];

    const datetime = `${issue_date} ${issue_time}`;
    const formatted_datetime = moment(datetime).format("yyyy-mm-DDTHH:mm:ss")+"Z";
    
    // TODO TLV tags
    const qr = "TODO_FROM_TLV";

    return Buffer.from(qr).toString("base64");
}