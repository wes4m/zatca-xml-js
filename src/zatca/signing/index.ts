import { XmlCanonicalizer } from "xmldsigjs";
import xmldom from "xmldom";
import { createHash, createSign, X509Certificate } from "crypto";
import moment from "moment";
import {Certificate} from "@fidm/x509";


import { XMLDocument } from "../../parser";
import { generateQR } from "../qr";
import defaultUBLExtensions from "../templates/ubl_sign_extension_template";
import defaultUBLExtensionsSignedProperties, {defaultUBLExtensionsSignedPropertiesForSigning} from "../templates/ubl_extension_signed_properties_template";

/**
 * Removes (UBLExtensions (Signing), Signature Envelope, and QR data) Elements. Then canonicalizes the XML to c14n.
 * In Order to prep for hashing.
 * @param invoice_xml XMLDocument.
 * @returns purified Invoice XML string.
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
 * Hashes Invoice according to ZATCA.
 * https://zatca.gov.sa/ar/E-Invoicing/SystemsDevelopers/Documents/20220624_ZATCA_Electronic_Invoice_Security_Features_Implementation_Standards.pdf
 * 2.3.3: Follows same method as PIH (Previous invoice hash BS: KSA-13).
 * @param invoice_xml XMLDocument.
 * @returns String invoice hash encoded in base64.
 */
export const getInvoiceHash = (invoice_xml: XMLDocument): string => {
    let pure_invoice_string: string = getPureInvoiceString(invoice_xml);
    // A dumb workaround for whatever reason ZATCA XML devs decided to include those trailing spaces and a newlines. (without it the hash is incorrect)
    pure_invoice_string = pure_invoice_string.replace("<cbc:ProfileID>", "\n    <cbc:ProfileID>");
    pure_invoice_string = pure_invoice_string.replace("<cac:AccountingSupplierParty>", "\n    \n    <cac:AccountingSupplierParty>");
    
    return createHash("sha256").update(pure_invoice_string).digest('base64');
}

/**
 * Hashes Certificate according to ZATCA.
 * https://zatca.gov.sa/ar/E-Invoicing/SystemsDevelopers/Documents/20220624_ZATCA_Electronic_Invoice_Security_Features_Implementation_Standards.pdf
 * 1.6.2.1.1.2: used in reference to digital signing certificate.
 * @param certificate_string String base64 encoded certificate body.
 * @returns String certificate hash encoded in base64.
 */
export const getCertificateHash = (certificate_string: string): string => {
    const certificate_hash = Buffer.from(createHash("sha256").update(certificate_string).digest('hex')).toString("base64");
    return certificate_hash;
}


/**
 * Creates invoice digital signature according to ZATCA.
 * https://zatca.gov.sa/ar/E-Invoicing/SystemsDevelopers/Documents/20220624_ZATCA_Electronic_Invoice_Security_Features_Implementation_Standards.pdf
 * 1.4: Digital signature, part of the cryptographic stamp (invoice hash signed using private key) (BS: KSA-15).
 * @param invoice_hash String base64 encoded invoice hash.
 * @param private_key_string String base64 encoded ec-secp256k1 private key body.
 * @returns String base64 encoded digital signature.
 */
export const createInvoiceDigitalSignature = (invoice_hash: string, private_key_string: string): string => {
    const invoice_hash_bytes = Buffer.from(invoice_hash, "base64");
    const cleanedup_private_key_string: string = cleanUpPrivateKeyString(private_key_string);
    const wrapped_private_key_string: string = `-----BEGIN EC PRIVATE KEY-----\n${cleanedup_private_key_string}\n-----END EC PRIVATE KEY-----`;

    var sign = createSign('sha256');
    sign.update(invoice_hash_bytes);
    var signature = Buffer.from(sign.sign(wrapped_private_key_string)).toString("base64");
    return signature;
}

/**
 * Gets certificate hash, x509IssuerName, and X509SerialNumber and formats them according to ZATCA.
 * @param certificate_string String base64 encoded certificate body.
 * @returns {hash: string, issuer: string, serial_number: string, public_key: Buffer, signature: Buffer}.
 */
export const getCertificateInfo = (certificate_string: string): {hash: string, issuer: string, serial_number: string, public_key: Buffer, signature: Buffer} => {
    const cleanedup_certificate_string: string = cleanUpCertificateString(certificate_string);
    const wrapped_certificate_string: string = `-----BEGIN CERTIFICATE-----\n${cleanedup_certificate_string}\n-----END CERTIFICATE-----`;

    const hash = getCertificateHash(cleanedup_certificate_string);
    const x509 = new X509Certificate(wrapped_certificate_string);  

    // Signature, and public key extraction from x509 PEM certificate (asn1 rfc5280) 
    // Crypto module does not have those functionalities so i'm the crypto boy now :(
    // https://github.com/nodejs/node/blob/main/src/crypto/crypto_x509.cc
    // https://linuxctl.com/2017/02/x509-certificate-manual-signature-verification/
    // https://github.com/junkurihara/js-x509-utils/blob/develop/src/x509.js
    // decode binary x509-formatted object
    const cert = Certificate.fromPEM(Buffer.from(wrapped_certificate_string));
    

    return {
        hash: hash,
        issuer: x509.issuer.split("\n").reverse().join(", "),
        serial_number: BigInt(`0x${x509.serialNumber}`).toString(10),
        public_key: cert.publicKeyRaw,
        signature: cert.signature
    };
}

/**
 * Removes header and footer from certificate string.
 * @param certificate_string.
 * @returns String base64 encoded certificate body.
 */
export const cleanUpCertificateString = (certificate_string: string): string => {
    return certificate_string.replace("-----BEGIN CERTIFICATE-----\n", "").replace("-----END CERTIFICATE-----", "").trim()
}

/**
 * Removes header and footer from private key string.
 * @param privatek_key_string ec-secp256k1 private key string.
 * @returns String base64 encoded private key body.
 */
 export const cleanUpPrivateKeyString = (certificate_string: string): string => {
    return certificate_string.replace("-----BEGIN EC PRIVATE KEY-----\n", "").replace("-----END EC PRIVATE KEY-----", "").trim()
}


interface generateSignatureXMLParams {
    invoice_xml: XMLDocument,
    certificate_string: string,
    private_key_string: string
}
/**
 * Main signing function.
 * Signs the invoice according to the following steps:
 *  - Get the invoice hash
 *      - Invoice must be cleaned up first before hashing and indentations, trailing lines, spaces must match.
 *  - Get the certificate hash
 *      - 
 * @param invoice_xml XMLDocument of invoice to be signed.
 * @param certificate_string String signed EC certificate.
 * @param private_key_string String ec-secp256k1 private key;
 * @returns 
 */
export const generateSignedXMLString = ({invoice_xml, certificate_string, private_key_string}: generateSignatureXMLParams):
{signed_invoice_string: string, invoice_hash: string} => {

    const invoice_copy: XMLDocument = new XMLDocument(invoice_xml.toString({no_header: false}));
    
    // 1: Invoice Hash
    const invoice_hash = getInvoiceHash(invoice_xml);
    console.log("Invoice hash: ", invoice_hash);
    
    // 2: Certificate hash and certificate info
    const cert_info = getCertificateInfo(certificate_string);
    console.log("Certificate info: ", cert_info);

    // 3: Digital Certificate
    const digital_signature = createInvoiceDigitalSignature(invoice_hash, private_key_string);
    console.log("Digital signature: ", digital_signature);

    // 4: QR
    const qr = generateQR({
        invoice_xml: invoice_xml,
        digital_signature: digital_signature,
        public_key: cert_info.public_key,
        certificate_signature: cert_info.signature
    });
    console.log("QR: ", qr);


    // Set Signed properties
    const signed_properties_props = {
        sign_timestamp: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss")+"Z",
        certificate_hash: cert_info.hash,
        certificate_issuer: cert_info.issuer,
        certificate_serial_number: cert_info.serial_number
    };
    const ubl_signature_signed_properties_xml_string_for_signing = defaultUBLExtensionsSignedPropertiesForSigning(signed_properties_props);
    const ubl_signature_signed_properties_xml_string = defaultUBLExtensionsSignedProperties(signed_properties_props);

    // 5: Get SignedProperties hash
    const signed_properties_bytes = Buffer.from(ubl_signature_signed_properties_xml_string_for_signing);
    let signed_properties_hash = createHash("sha256").update(signed_properties_bytes).digest('hex');
    signed_properties_hash = Buffer.from(signed_properties_hash).toString("base64");
    console.log("Signed properites hash: ", signed_properties_hash);

    // UBL Extensions
    let ubl_signature_xml_string = defaultUBLExtensions(
        invoice_hash,
        signed_properties_hash,
        digital_signature,
        cleanUpCertificateString(certificate_string),
        ubl_signature_signed_properties_xml_string
    );

    // Set signing elements
    let unsigned_invoice_str: string = invoice_copy.toString({no_header: false});
    unsigned_invoice_str = unsigned_invoice_str.replace("SET_UBL_EXTENSIONS_STRING", ubl_signature_xml_string);
    unsigned_invoice_str = unsigned_invoice_str.replace("SET_QR_CODE_DATA", qr);
    const signed_invoice: XMLDocument = new XMLDocument(unsigned_invoice_str);
    
    // Workaround for fast-xml-parser parsing BigInt to int (scientific notation). And also again those dumb indentations affecting the hash
    signed_invoice.set("Invoice/ext:UBLExtensions/ext:UBLExtension/ext:ExtensionContent/sig:UBLDocumentSignatures/sac:SignatureInformation/ds:Signature/ds:Object/xades:QualifyingProperties/xades:SignedProperties/xades:SignedSignatureProperties/xades:SigningCertificate/xades:Cert/xades:IssuerSerial", true, {
        "ds:X509IssuerName": cert_info.issuer,
        "ds:X509SerialNumber": cert_info.serial_number
    });

    let signed_invoice_string: string = signed_invoice.toString({no_header: false});
    signed_invoice_string = signedPropertiesIndentationFix(signed_invoice_string);

    return {signed_invoice_string: signed_invoice_string, invoice_hash: invoice_hash };
}



/**
 * This hurts to do :'(. I hope that it's only temporary and ZATCA decides to just minify the XML before doing any hashing on it.
 * there is no logical reason why the validation expects an incorrectly indented XML.
 * Anyway, this is a function that fucks up the indentation in order to match validator hashing.
 */
const signedPropertiesIndentationFix = (signed_invoice_string: string): string => {
    let fixer = signed_invoice_string;
    let signed_props_lines: string[] = fixer.split("<ds:Object>")[1].split("</ds:Object>")[0].split("\n");
    let fixed_lines: string[] = [];
    // Stripping first 4 spaces 
    signed_props_lines.map((line) => fixed_lines.push(line.slice(4, line.length)));
    signed_props_lines = signed_props_lines.slice(0, signed_props_lines.length-1);
    fixed_lines = fixed_lines.slice(0, fixed_lines.length-1);

    fixer = fixer.replace(signed_props_lines.join("\n"), fixed_lines.join("\n"));
    return fixer;
}