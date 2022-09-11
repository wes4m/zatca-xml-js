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
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cac:PartyIdentification>
        <cbc:ID schemeID="NAT">2345</cbc:ID>
      </cac:PartyIdentification>
      <cac:PostalAddress>
        <cbc:StreetName>baaoun</cbc:StreetName>
        <cbc:AdditionalStreetName>sdsd</cbc:AdditionalStreetName>
        <cbc:BuildingNumber>3353</cbc:BuildingNumber>
        <cbc:PlotIdentification>3434</cbc:PlotIdentification>
        <cbc:CitySubdivisionName>fgff</cbc:CitySubdivisionName>
        <cbc:CityName>Dhurma</cbc:CityName>
        <cbc:PostalZone>34534</cbc:PostalZone>
        <cbc:CountrySubentity>ulhk</cbc:CountrySubentity>
        <cac:Country>
          <cbc:IdentificationCode>SA</cbc:IdentificationCode>
        </cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:PartyTaxScheme>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>sdsa</cbc:RegistrationName>
      </cac:PartyLegalEntity>
    </cac:Party>
  </cac:AccountingCustomerParty>
  <cac:Delivery>
    <cbc:ActualDeliveryDate>2022-03-13</cbc:ActualDeliveryDate>
    <cbc:LatestDeliveryDate>2022-03-15</cbc:LatestDeliveryDate>
  </cac:Delivery>
  <cac:PaymentMeans>
    <cbc:PaymentMeansCode>10</cbc:PaymentMeansCode>
  </cac:PaymentMeans>
  <cac:AllowanceCharge>
    <cbc:ID>1</cbc:ID>
    <cbc:ChargeIndicator>false</cbc:ChargeIndicator>
    <cbc:AllowanceChargeReason>discount</cbc:AllowanceChargeReason>
    <cbc:Amount currencyID="SAR">2</cbc:Amount>
    <cac:TaxCategory>
      <cbc:ID schemeAgencyID="6" schemeID="UN/ECE 5305">S</cbc:ID>
      <cbc:Percent>15</cbc:Percent>
      <cac:TaxScheme>
        <cbc:ID schemeAgencyID="6" schemeID="UN/ECE 5153">VAT</cbc:ID>
      </cac:TaxScheme>
    </cac:TaxCategory>
  </cac:AllowanceCharge>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="SAR">144.9</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="SAR">966</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="SAR">144.9</cbc:TaxAmount>
      <cac:TaxCategory>
        <cbc:ID schemeAgencyID="6" schemeID="UN/ECE 5305">S</cbc:ID>
        <cbc:Percent>15</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID schemeAgencyID="6" schemeID="UN/ECE 5153">VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>
  </cac:TaxTotal>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="SAR">144.9</cbc:TaxAmount>
  </cac:TaxTotal>
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="SAR">966</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="SAR">964</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="SAR">1108.9</cbc:TaxInclusiveAmount>
    <cbc:AllowanceTotalAmount currencyID="SAR">2</cbc:AllowanceTotalAmount>
    <cbc:PrepaidAmount currencyID="SAR">0</cbc:PrepaidAmount>
    <cbc:PayableAmount currencyID="SAR">1108.9</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
  <cac:InvoiceLine>
    <cbc:ID>1</cbc:ID>
    <cbc:InvoicedQuantity unitCode="PCE">44</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="SAR">966</cbc:LineExtensionAmount>
    <cac:TaxTotal>
      <cbc:TaxAmount currencyID="SAR">144.9</cbc:TaxAmount>
      <cbc:RoundingAmount currencyID="SAR">1110.9</cbc:RoundingAmount>
    </cac:TaxTotal>
    <cac:Item>
      <cbc:Name>dsd</cbc:Name>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>15</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>VAT</cbc:ID>
        </cac:TaxScheme>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="SAR">22</cbc:PriceAmount>
      <cac:AllowanceCharge>
        <cbc:ChargeIndicator>false</cbc:ChargeIndicator>
        <cbc:AllowanceChargeReason>discount</cbc:AllowanceChargeReason>
        <cbc:Amount currencyID="SAR">2</cbc:Amount>
      </cac:AllowanceCharge>
    </cac:Price>
  </cac:InvoiceLine>
</Invoice>
`;

export interface ZATCASimplifiedInvoiceProps {
    issue_date: string,
    issue_time: string,
    previous_invoice_hash: string,
    ubl_extensions_xml_string?: string,
    qr_data?: string
}

export default function populate(props: ZATCASimplifiedInvoiceProps): string {
    let populated_template = template;
    populated_template = populated_template.replace("SET_UBL_EXTENSIONS_STRING", props.ubl_extensions_xml_string ?? "SET_UBL_EXTENSIONS_STRING");
    populated_template = populated_template.replace("SET_ISSUE_DATE", props.issue_date);
    populated_template = populated_template.replace("SET_ISSUE_TIME", props.issue_time);
    populated_template = populated_template.replace("SET_PREVIOUS_INVOICE_HASH", props.previous_invoice_hash);
    populated_template = populated_template.replace("SET_QR_CODE_DATA", props.qr_data ?? "SET_QR_CODE_DATA");
    // TODO: Other populateable values ..

    return populated_template;
};