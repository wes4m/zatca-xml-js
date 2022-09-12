// TODO: Clean up and fill setters for required values
const template = /* XML */`
<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2"><ext:UBLExtensions>SET_UBL_EXTENSIONS_STRING</ext:UBLExtensions>
    
    <cbc:ProfileID>reporting:1.0</cbc:ProfileID>
    <cbc:ID>NOT_SET</cbc:ID>
    <cbc:UUID>NOT_SET</cbc:UUID>
    <cbc:IssueDate>SET_ISSUE_DATE</cbc:IssueDate>
    <cbc:IssueTime>SET_ISSUE_TIME</cbc:IssueTime>
    <cbc:InvoiceTypeCode name="0211010">388</cbc:InvoiceTypeCode>
    <cbc:DocumentCurrencyCode>SAR</cbc:DocumentCurrencyCode>
    <cbc:TaxCurrencyCode>SAR</cbc:TaxCurrencyCode>
    <cac:AdditionalDocumentReference>
        <cbc:ID>ICV</cbc:ID>
        <cbc:UUID>62</cbc:UUID>
    </cac:AdditionalDocumentReference>
    <cac:AdditionalDocumentReference>
        <cbc:ID>PIH</cbc:ID>
        <cac:Attachment>
            <cbc:EmbeddedDocumentBinaryObject mimeCode="text/plain">SET_PREVIOUS_INVOICE_HASH</cbc:EmbeddedDocumentBinaryObject>
        </cac:Attachment>
    </cac:AdditionalDocumentReference>
    <cac:AdditionalDocumentReference>
        <cbc:ID>QR</cbc:ID>
        <cac:Attachment>
            <cbc:EmbeddedDocumentBinaryObject mimeCode="text/plain">SET_QR_CODE_DATA</cbc:EmbeddedDocumentBinaryObject>
        </cac:Attachment>
    </cac:AdditionalDocumentReference>
    <cac:Signature>
        <cbc:ID>urn:oasis:names:specification:ubl:signature:Invoice</cbc:ID>
        <cbc:SignatureMethod>urn:oasis:names:specification:ubl:dsig:enveloped:xades</cbc:SignatureMethod>
    </cac:Signature>
    <cac:AccountingSupplierParty>
    <cac:Party>
      <cac:PartyIdentification>
        <cbc:ID schemeID="CRN">454634645645654</cbc:ID>
      </cac:PartyIdentification>
      <cac:PostalAddress>
        <cbc:StreetName>test</cbc:StreetName>
        <cbc:BuildingNumber>3454</cbc:BuildingNumber>
        <cbc:PlotIdentification>1234</cbc:PlotIdentification>
        <cbc:CitySubdivisionName>fgff</cbc:CitySubdivisionName>
        <cbc:CityName>Riyadh</cbc:CityName>
        <cbc:PostalZone>12345</cbc:PostalZone>
        <cbc:CountrySubentity>test</cbc:CountrySubentity>
        <cac:Country>
          <cbc:IdentificationCode>SA</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>301121971500003</cbc:CompanyID>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>Ahmed Mohamed AL Ahmady</cbc:RegistrationName>
      </cac:PartyLegalEntity>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty></cac:AccountingCustomerParty>
</Invoice>
`;


export interface ZATCASimplifiedInvoiceLineItemDiscount {
    amount: number,
    reason: string
}

export interface ZATCASimplifiedInvoiceLineItemTax {
    percent_amount: number
}

export interface ZATCASimplifiedInvoiceLineItem {
    id: string,
    name: string,
    quantity: number,
    tax_exclusive_price: number,
    other_taxes?: ZATCASimplifiedInvoiceLineItemTax[],
    discounts?: ZATCASimplifiedInvoiceLineItemDiscount[]
    VAT_percent: number,
}


export interface ZATCASimplifiedInvoiceProps {
    issue_date: string,
    issue_time: string,
    previous_invoice_hash: string,
    line_items?: ZATCASimplifiedInvoiceLineItem[]
}

export default function populate(props: ZATCASimplifiedInvoiceProps): string {
    let populated_template = template;
    populated_template = populated_template.replace("SET_ISSUE_DATE", props.issue_date);
    populated_template = populated_template.replace("SET_ISSUE_TIME", props.issue_time);
    populated_template = populated_template.replace("SET_PREVIOUS_INVOICE_HASH", props.previous_invoice_hash);
    // TODO: Other populateable values ..

    return populated_template;
};
