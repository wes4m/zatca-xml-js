import { EGSUnitInfo } from "../egs";

/**
 * Maybe use a templating engine instead of str replace.
 * This works for now though 
 * 
 * cbc:InvoiceTypeCode: 388: BR-KSA-05 Tax Invoice according to UN/CEFACT codelist 1001, D.16B for KSA.
 *  name="0211010": BR-KSA-06 starts with "02" Simplified Tax Invoice. Also explains other positions.
 * cac:AdditionalDocumentReference: ICV: KSA-16, BR-KSA-33 (Invoice Counter number)
 */
const template = /* XML */`
<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2"><ext:UBLExtensions>SET_UBL_EXTENSIONS_STRING</ext:UBLExtensions>
    
    <cbc:ProfileID>reporting:1.0</cbc:ProfileID>
    <cbc:ID>SET_INVOICE_SERIAL_NUMBER</cbc:ID>
    <cbc:UUID>SET_TERMINAL_UUID</cbc:UUID>
    <cbc:IssueDate>SET_ISSUE_DATE</cbc:IssueDate>
    <cbc:IssueTime>SET_ISSUE_TIME</cbc:IssueTime>
    <cbc:InvoiceTypeCode name="0211010">388</cbc:InvoiceTypeCode>
    <cbc:DocumentCurrencyCode>SAR</cbc:DocumentCurrencyCode>
    <cbc:TaxCurrencyCode>SAR</cbc:TaxCurrencyCode>
    <cac:AdditionalDocumentReference>
        <cbc:ID>ICV</cbc:ID>
        <cbc:UUID>SET_INVOICE_COUNTER_NUMBER</cbc:UUID>
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
        <cbc:ID schemeID="CRN">SET_COMMERCIAL_REGISTRATION_NUMBER</cbc:ID>
      </cac:PartyIdentification>
      <cac:PostalAddress>
        <cbc:StreetName>SET_STREET_NAME</cbc:StreetName>
        <cbc:BuildingNumber>SET_BUILDING_NUMBER</cbc:BuildingNumber>
        <cbc:PlotIdentification>SET_PLOT_IDENTIFICATION</cbc:PlotIdentification>
        <cbc:CitySubdivisionName>SET_CITY_SUBDIVISION</cbc:CitySubdivisionName>
        <cbc:CityName>SET_CITY</cbc:CityName>
        <cbc:PostalZone>SET_POSTAL_NUMBER</cbc:PostalZone>
        <cac:Country>
          <cbc:IdentificationCode>SA</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>SET_VAT_NUMBER</cbc:CompanyID>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>SET_VAT_NAME</cbc:RegistrationName>
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
    egs_info: EGSUnitInfo,
    invoice_counter_number: number,
    invoice_serial_number: string,
    issue_date: string,
    issue_time: string,
    previous_invoice_hash: string,
    line_items?: ZATCASimplifiedInvoiceLineItem[],
}

export default function populate(props: ZATCASimplifiedInvoiceProps): string {
    let populated_template = template;
    populated_template = populated_template.replace("SET_INVOICE_SERIAL_NUMBER", props.invoice_serial_number);
    populated_template = populated_template.replace("SET_TERMINAL_UUID", props.egs_info.uuid);
    populated_template = populated_template.replace("SET_ISSUE_DATE", props.issue_date);
    populated_template = populated_template.replace("SET_ISSUE_TIME", props.issue_time);
    populated_template = populated_template.replace("SET_PREVIOUS_INVOICE_HASH", props.previous_invoice_hash);
    populated_template = populated_template.replace("SET_INVOICE_COUNTER_NUMBER", props.invoice_counter_number.toString());
    populated_template = populated_template.replace("SET_COMMERCIAL_REGISTRATION_NUMBER", props.egs_info.CRN_number);

    populated_template = populated_template.replace("SET_STREET_NAME", props.egs_info.location.street);
    populated_template = populated_template.replace("SET_BUILDING_NUMBER", props.egs_info.location.building);
    populated_template = populated_template.replace("SET_PLOT_IDENTIFICATION", props.egs_info.location.plot_identification);
    populated_template = populated_template.replace("SET_CITY_SUBDIVISION", props.egs_info.location.city_subdivision);
    populated_template = populated_template.replace("SET_CITY", props.egs_info.location.city);
    populated_template = populated_template.replace("SET_POSTAL_NUMBER", props.egs_info.location.postal_zone);

    populated_template = populated_template.replace("SET_VAT_NUMBER", props.egs_info.VAT_number);
    populated_template = populated_template.replace("SET_VAT_NAME", props.egs_info.VAT_name);
    return populated_template;
};
