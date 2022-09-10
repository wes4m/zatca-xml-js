
export const valid_simplified_invoice_xml_sample = /* XML */`
<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2"><ext:UBLExtensions>
    <ext:UBLExtension>
        <ext:ExtensionURI>urn:oasis:names:specification:ubl:dsig:enveloped:xades</ext:ExtensionURI>
        <ext:ExtensionContent>
            <!-- Please note that the signature values are sample values only -->
            <sig:UBLDocumentSignatures xmlns:sig="urn:oasis:names:specification:ubl:schema:xsd:CommonSignatureComponents-2" xmlns:sac="urn:oasis:names:specification:ubl:schema:xsd:SignatureAggregateComponents-2" xmlns:sbc="urn:oasis:names:specification:ubl:schema:xsd:SignatureBasicComponents-2">
                <sac:SignatureInformation>
                    <cbc:ID>urn:oasis:names:specification:ubl:signature:1</cbc:ID>
                    <sbc:ReferencedSignatureID>urn:oasis:names:specification:ubl:signature:Invoice</sbc:ReferencedSignatureID>
                    <ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#" Id="signature">
                        <ds:SignedInfo>
                            <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2006/12/xml-c14n11"/>
                            <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha256"/>
                            <ds:Reference Id="invoiceSignedData" URI="">
                                <ds:Transforms>
                                    <ds:Transform Algorithm="http://www.w3.org/TR/1999/REC-xpath-19991116">
                                        <ds:XPath>not(//ancestor-or-self::ext:UBLExtensions)</ds:XPath>
                                    </ds:Transform>
                                    <ds:Transform Algorithm="http://www.w3.org/TR/1999/REC-xpath-19991116">
                                        <ds:XPath>not(//ancestor-or-self::cac:Signature)</ds:XPath>
                                    </ds:Transform>
                                    <ds:Transform Algorithm="http://www.w3.org/TR/1999/REC-xpath-19991116">
                                        <ds:XPath>not(//ancestor-or-self::cac:AdditionalDocumentReference[cbc:ID='QR'])</ds:XPath>
                                    </ds:Transform>
                                    <ds:Transform Algorithm="http://www.w3.org/2006/12/xml-c14n11"/>
                                </ds:Transforms>
                                <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
                                <ds:DigestValue>QnVEexW4nWv4CaE39a/66Jp/OXO/evHQ8pDlG7weq/4=</ds:DigestValue>
                            </ds:Reference>
                            <ds:Reference Type="http://www.w3.org/2000/09/xmldsig#SignatureProperties" URI="#xadesSignedProperties">
                                <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
                                <ds:DigestValue>YzBjNDk5M2I1MDQyM2NkZjBhYjZiZDIzOGE1ZWU4NTFmODY4Nzk2NzA3NjJkM2ZlNDFmNDMyZjMyMzkyNzQxMA==</ds:DigestValue>
                            </ds:Reference>
                        </ds:SignedInfo>
                        <ds:SignatureValue>MEQCIE5GlxaM9ojm6qgxLGPZbfEwCWZz+THeR46GwWp3b4pCAiBzzNMxZu4ijqJHFrfouiyjikFxMWNGfi6bznevNUwQLA==</ds:SignatureValue>
                        <ds:KeyInfo>
                            <ds:X509Data>
                                <ds:X509Certificate>MIID9jCCA5ugAwIBAgITbwAAeCy9aKcLA99HrAABAAB4LDAKBggqhkjOPQQDAjBjMRUwEwYKCZImiZPyLGQBGRYFbG9jYWwxEzARBgoJkiaJk/IsZAEZFgNnb3YxFzAVBgoJkiaJk/IsZAEZFgdleHRnYXp0MRwwGgYDVQQDExNUU1pFSU5WT0lDRS1TdWJDQS0xMB4XDTIyMDQxOTIwNDkwOVoXDTI0MDQxODIwNDkwOVowWTELMAkGA1UEBhMCU0ExEzARBgNVBAoTCjMxMjM0NTY3ODkxDDAKBgNVBAsTA1RTVDEnMCUGA1UEAxMeVFNULS05NzA1NjAwNDAtMzEyMzQ1Njc4OTAwMDAzMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEYYMMoOaFYAhMO/steotfZyavr6p11SSlwsK9azmsLY7b1b+FLhqMArhB2dqHKboxqKNfvkKDePhpqjui5hcn0aOCAjkwggI1MIGaBgNVHREEgZIwgY+kgYwwgYkxOzA5BgNVBAQMMjEtVFNUfDItVFNUfDMtNDdmMTZjMjYtODA2Yi00ZTE1LWIyNjktN2E4MDM4ODRiZTljMR8wHQYKCZImiZPyLGQBAQwPMzEyMzQ1Njc4OTAwMDAzMQ0wCwYDVQQMDAQxMTAwMQwwCgYDVQQaDANUU1QxDDAKBgNVBA8MA1RTVDAdBgNVHQ4EFgQUO5ZiU7NakU3eejVa3I2S1B2sDwkwHwYDVR0jBBgwFoAUdmCM+wagrGdXNZ3PmqynK5k1tS8wTgYDVR0fBEcwRTBDoEGgP4Y9aHR0cDovL3RzdGNybC56YXRjYS5nb3Yuc2EvQ2VydEVucm9sbC9UU1pFSU5WT0lDRS1TdWJDQS0xLmNybDCBrQYIKwYBBQUHAQEEgaAwgZ0wbgYIKwYBBQUHMAGGYmh0dHA6Ly90c3RjcmwuemF0Y2EuZ292LnNhL0NlcnRFbnJvbGwvVFNaRWludm9pY2VTQ0ExLmV4dGdhenQuZ292LmxvY2FsX1RTWkVJTlZPSUNFLVN1YkNBLTEoMSkuY3J0MCsGCCsGAQUFBzABhh9odHRwOi8vdHN0Y3JsLnphdGNhLmdvdi5zYS9vY3NwMA4GA1UdDwEB/wQEAwIHgDAdBgNVHSUEFjAUBggrBgEFBQcDAgYIKwYBBQUHAwMwJwYJKwYBBAGCNxUKBBowGDAKBggrBgEFBQcDAjAKBggrBgEFBQcDAzAKBggqhkjOPQQDAgNJADBGAiEA7mHT6yg85jtQGWp3M7tPT7Jk2+zsvVHGs3bU5Z7YE68CIQD60ebQamYjYvdebnFjNfx4X4dop7LsEBFCNSsLY0IFaQ==</ds:X509Certificate>
                            </ds:X509Data>
                        </ds:KeyInfo>
                        <ds:Object>
                            <xades:QualifyingProperties xmlns:xades="http://uri.etsi.org/01903/v1.3.2#" Target="signature">
                                <xades:SignedProperties Id="xadesSignedProperties">
                                    <xades:SignedSignatureProperties>
                                        <xades:SigningTime>2022-08-10T17:44:09Z</xades:SigningTime>
                                        <xades:SigningCertificate>
                                            <xades:Cert>
                                                <xades:CertDigest>
                                                    <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
                                                    <ds:DigestValue>NjlhOTVmYzIzN2I0MjcxNGRjNDQ1N2EzM2I5NGNjNDUyZmQ5ZjExMDUwNGM2ODNjNDAxMTQ0ZDk1NDQ4OTRmYg==</ds:DigestValue>
                                                </xades:CertDigest>
                                                <xades:IssuerSerial>
                                                    <ds:X509IssuerName>CN=TSZEINVOICE-SubCA-1, DC=extgazt, DC=gov, DC=local</ds:X509IssuerName>
                                                    <ds:X509SerialNumber>2475382876776561391517206651645660279462721580</ds:X509SerialNumber>
                                                </xades:IssuerSerial>
                                            </xades:Cert>
                                        </xades:SigningCertificate>
                                    </xades:SignedSignatureProperties>
                                </xades:SignedProperties>
                            </xades:QualifyingProperties>
                        </ds:Object>
                    </ds:Signature>
                </sac:SignatureInformation>
            </sig:UBLDocumentSignatures>
        </ext:ExtensionContent>
    </ext:UBLExtension>
</ext:UBLExtensions>
    
    <cbc:ProfileID>reporting:1.0</cbc:ProfileID>
    <cbc:ID>SME00062</cbc:ID>
    <cbc:UUID>6f4d20e0-6bfe-4a80-9389-7dabe6620f12</cbc:UUID>
    <cbc:IssueDate>2022-03-13</cbc:IssueDate>
    <cbc:IssueTime>14:40:40</cbc:IssueTime>
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
            <cbc:EmbeddedDocumentBinaryObject mimeCode="text/plain">NWZlY2ViNjZmZmM4NmYzOGQ5NTI3ODZjNmQ2OTZjNzljMmRiYzIzOWRkNGU5MWI0NjcyOWQ3M2EyN2ZiNTdlOQ==</cbc:EmbeddedDocumentBinaryObject>
        </cac:Attachment>
    </cac:AdditionalDocumentReference>
    
    
    <cac:AdditionalDocumentReference>
        <cbc:ID>QR</cbc:ID>
        <cac:Attachment>
            <cbc:EmbeddedDocumentBinaryObject mimeCode="text/plain">ARdBaG1lZCBNb2hhbWVkIEFMIEFobWFkeQIPMzAxMTIxOTcxNTAwMDAzAxQyMDIyLTAzLTEzVDE0OjQwOjQwWgQHMTEwOC45MAUFMTQ0LjkGLFFuVkVleFc0bld2NENhRTM5YS82NkpwL09YTy9ldkhROHBEbEc3d2VxLzQ9B2BNRVFDSUU1R2x4YU05b2ptNnFneExHUFpiZkV3Q1daeitUSGVSNDZHd1dwM2I0cENBaUJ6ek5NeFp1NGlqcUpIRnJmb3VpeWppa0Z4TVdOR2ZpNmJ6bmV2TlV3UUxBPT0IWDBWMBAGByqGSM49AgEGBSuBBAAKA0IABGGDDKDmhWAITDv7LXqLX2cmr6+qddUkpcLCvWs5rC2O29W/hS4ajAK4Qdnahym6MaijX75Cg3j4aao7ouYXJ9EJSDBGAiEA7mHT6yg85jtQGWp3M7tPT7Jk2+zsvVHGs3bU5Z7YE68CIQD60ebQamYjYvdebnFjNfx4X4dop7LsEBFCNSsLY0IFaQ==</cbc:EmbeddedDocumentBinaryObject>
        </cac:Attachment>
</cac:AdditionalDocumentReference><cac:Signature>
      <cbc:ID>urn:oasis:names:specification:ubl:signature:Invoice</cbc:ID>
      <cbc:SignatureMethod>urn:oasis:names:specification:ubl:dsig:enveloped:xades</cbc:SignatureMethod>
</cac:Signature><cac:AccountingSupplierParty>
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
            <cbc:TaxableAmount currencyID="SAR">966.00</cbc:TaxableAmount>
            <cbc:TaxAmount currencyID="SAR">144.90</cbc:TaxAmount>
            <cac:TaxCategory>
                <cbc:ID schemeAgencyID="6" schemeID="UN/ECE 5305">S</cbc:ID>
                <cbc:Percent>15.00</cbc:Percent>
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
        <cbc:LineExtensionAmount currencyID="SAR">966.00</cbc:LineExtensionAmount>
        <cbc:TaxExclusiveAmount currencyID="SAR">964.00</cbc:TaxExclusiveAmount>
        <cbc:TaxInclusiveAmount currencyID="SAR">1108.90</cbc:TaxInclusiveAmount>
        <cbc:AllowanceTotalAmount currencyID="SAR">2.00</cbc:AllowanceTotalAmount>
        <cbc:PrepaidAmount currencyID="SAR">0.00</cbc:PrepaidAmount>
        <cbc:PayableAmount currencyID="SAR">1108.90</cbc:PayableAmount>
    </cac:LegalMonetaryTotal>
    <cac:InvoiceLine>
        <cbc:ID>1</cbc:ID>
        <cbc:InvoicedQuantity unitCode="PCE">44.000000</cbc:InvoicedQuantity>
        <cbc:LineExtensionAmount currencyID="SAR">966.00</cbc:LineExtensionAmount>
        <cac:TaxTotal>
            <cbc:TaxAmount currencyID="SAR">144.90</cbc:TaxAmount>
            <cbc:RoundingAmount currencyID="SAR">1110.90</cbc:RoundingAmount>

        </cac:TaxTotal>
        <cac:Item>
            <cbc:Name>dsd</cbc:Name>
            <cac:ClassifiedTaxCategory>
                <cbc:ID>S</cbc:ID>
                <cbc:Percent>15.00</cbc:Percent>
                <cac:TaxScheme>
                    <cbc:ID>VAT</cbc:ID>
                </cac:TaxScheme>
            </cac:ClassifiedTaxCategory>
        </cac:Item>
        <cac:Price>
            <cbc:PriceAmount currencyID="SAR">22.00</cbc:PriceAmount>
            <cac:AllowanceCharge>
                <cbc:ChargeIndicator>false</cbc:ChargeIndicator>
                <cbc:AllowanceChargeReason>discount</cbc:AllowanceChargeReason>
                <cbc:Amount currencyID="SAR">2.00</cbc:Amount>
            </cac:AllowanceCharge>
        </cac:Price>
    </cac:InvoiceLine>
</Invoice>`;