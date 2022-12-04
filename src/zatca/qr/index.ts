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
 * Generates QR for a given invoice. According to ZATCA BR-KSA-27
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
    const VAT_number = invoice_xml.get("Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyTaxScheme/cbc:CompanyID")?.[0].toString();
    const invoice_total = invoice_xml.get("Invoice/cac:LegalMonetaryTotal/cbc:TaxInclusiveAmount")?.[0]["#text"].toString();
    const VAT_total = invoice_xml.get("Invoice/cac:TaxTotal")?.[0]["cbc:TaxAmount"]["#text"].toString();
    
    const issue_date = invoice_xml.get("Invoice/cbc:IssueDate")?.[0];
    const issue_time = invoice_xml.get("Invoice/cbc:IssueTime")?.[0];

    // Detect if simplified invoice or not (not used currently assuming all simplified tax invoice)
    const invoice_type = invoice_xml.get("Invoice/cbc:InvoiceTypeCode")?.[0]["@_name"].toString();

    const datetime = `${issue_date} ${issue_time}`;
    const formatted_datetime = moment(datetime).format("YYYY-MM-DDTHH:mm:ss")+"Z";
    
    const qr_tlv = TLV([
        Buffer.from(seller_name as String),
        VAT_number,
        formatted_datetime,
        invoice_total,
        VAT_total,
        invoice_hash,
        Buffer.from(digital_signature),
        public_key,
        certificate_signature
    ]);

    return qr_tlv.toString("base64");
}


/**
 * Generates a QR for phase one given an invoice.
 * This is a temporary function for backwards compatibility while phase two is not fully deployed.
 * @param invoice_xml XMLDocument.
 * @returns String base64 encoded QR data.
 */
 export const generatePhaseOneQR = ({invoice_xml}: {invoice_xml: XMLDocument}): string => {
    
    // Extract required tags
    const seller_name = invoice_xml.get("Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyLegalEntity/cbc:RegistrationName")?.[0];
    const VAT_number = invoice_xml.get("Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyTaxScheme/cbc:CompanyID")?.[0].toString();
    const invoice_total = invoice_xml.get("Invoice/cac:LegalMonetaryTotal/cbc:TaxInclusiveAmount")?.[0]["#text"].toString();
    const VAT_total = invoice_xml.get("Invoice/cac:TaxTotal")?.[0]["cbc:TaxAmount"]["#text"].toString();
    
    const issue_date = invoice_xml.get("Invoice/cbc:IssueDate")?.[0];
    const issue_time = invoice_xml.get("Invoice/cbc:IssueTime")?.[0];

    const datetime = `${issue_date} ${issue_time}`;
    const formatted_datetime = moment(datetime).format("YYYY-MM-DDTHH:mm:ss")+"Z";
    
    const qr_tlv = TLV([
        Buffer.from(seller_name as String),
        VAT_number,
        formatted_datetime,
        invoice_total,
        VAT_total
    ]);

    return qr_tlv.toString("base64");
}


const TLV = (tags: any[]): Buffer => {
    const tlv_tags: Buffer[] = []
    tags.forEach((tag, i) => {
        const current_tlv_value: Buffer = Buffer.from([i+1, tag.length, ...Buffer.from(tag)]);
        tlv_tags.push(current_tlv_value)
    });
    return Buffer.concat(tlv_tags);
}