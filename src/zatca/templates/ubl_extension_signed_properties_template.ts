const template = /* XML */`
<xades:SignedProperties Id="xadesSignedProperties">
    <xades:SignedSignatureProperties>
        <xades:SigningTime>SET_SIGN_TIMESTAMP</xades:SigningTime>
        <xades:SigningCertificate>
            <xades:Cert>
                <xades:CertDigest>
                    <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
                    <ds:DigestValue>SET_CERTIFICATE_HASH</ds:DigestValue>
                </xades:CertDigest>
                <xades:IssuerSerial>
                    <ds:X509IssuerName>SET_CERTIFICATE_ISSUER</ds:X509IssuerName>
                    <ds:X509SerialNumber>SET_CERTIFICATE_SERIAL_NUMBER</ds:X509SerialNumber>
                </xades:IssuerSerial>
            </xades:Cert>
        </xades:SigningCertificate>
    </xades:SignedSignatureProperties>
</xades:SignedProperties>
`;


export default function populate(
    sign_timestamp: string,
    certificate_hash: string,
    certificate_issuer: string,
    certificate_serial_number: string
): string {
    let populated_template = template;
    populated_template = populated_template.replace("SET_SIGN_TIMESTAMP", sign_timestamp);
    populated_template = populated_template.replace("SET_CERTIFICATE_HASH", certificate_hash);
    populated_template = populated_template.replace("SET_CERTIFICATE_ISSUER", certificate_issuer);
    populated_template = populated_template.replace("SET_CERTIFICATE_SERIAL_NUMBER", certificate_serial_number);
    return populated_template;
};