import { XmlCanonicalizer } from "xmldsigjs";
import xmldom from "xmldom";
import { createHash, createSign } from "crypto";

import { XMLDocument } from "../../parser";

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
 * Hashes Invoice according to ZATCA (TODO RULE NUMBER BUSSINESS TERM)
 * @param invoice_xml XMLDocument.
 * @returns String invoice hash encoded in base64.
 */
export const getInvoiceHash = (invoice_xml: XMLDocument): string => {
    const pure_invoice_string: string = getPureInvoiceString(invoice_xml);
    return createHash("sha256").update(pure_invoice_string).digest('base64');
}

/**
 * Hashes Certificate according to ZATCA (TODO RULE NUMBER BUSSINESS TERM)
 * @param certificate_string String base64 encoded certificate body.
 * @returns String certificate hash encoded in base64.
 */
export const getCertificateHash = (certificate_string: string): string => {
    const certificate_hash = Buffer.from(createHash("sha256").update(certificate_string).digest('hex')).toString("base64");
    return certificate_hash;
}


/**
 * Creates invoice digital signature according to ZATCA (TODO RULE NUMBER BUSSINESS TERM)
 * @param invoice_hash String base64 encoded invoice hash.
 * @param private_key_string String base64 encoded ec-secp256k1 private key body.
 * @returns String base64 encoded digital signature.
 */
export const createInvoiceDigitalSignature = (invoice_hash: string, private_key_string: string): string => {
    const invoice_hash_bytes = new Buffer(invoice_hash, "base64");
    var sign = createSign('sha256');
    sign.update(invoice_hash_bytes);
    var signature = Buffer.from(sign.sign(private_key_string)).toString("base64");
    return signature;
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