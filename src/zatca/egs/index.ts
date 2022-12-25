import rs from 'jsrsasign';
import API from "../api";
import { ZATCASimplifiedTaxInvoice } from "../ZATCASimplifiedTaxInvoice";

export interface EGSUnitLocation {
    city: string,
    city_subdivision: string,
    street: string,
    plot_identification: string,
    building: string,
    postal_zone: string
}

export interface EGSUnitInfo {
    uuid: string,
    custom_id: string,
    model: string,
    CRN_number: string,
    VAT_name: string,
    VAT_number: string,
    branch_name: string,
    branch_industry: string,
    location: EGSUnitLocation,

    private_key?: string,
    csr?: string,
    compliance_certificate?: string,
    compliance_api_secret?: string,
    production_certificate?: string,
    production_api_secret?: string,
}

export class EGS {

    private egs_info: EGSUnitInfo;
    private api: API;

    constructor(egs_info: EGSUnitInfo) {
        this.egs_info = egs_info;
        this.api = new API();
    }


    /**
     * @returns EGSUnitInfo
     */
    get() {
        return this.egs_info;
    }

    /**
     * Sets/Updates an EGS info field.
     * @param egs_info Partial<EGSUnitInfo>
     */
    set(egs_info: Partial<EGSUnitInfo>) {
        this.egs_info = {...this.egs_info, ...egs_info};
    }

    /**
     * Generates a new secp256k1 Public/Private key pair for the EGS.
     * Also generates and signs a new CSR.
     * `Note`: This functions uses OpenSSL thus requires it to be installed on whatever system the package is running in.
     * @param production Boolean CSR or Compliance CSR
     * @param solution_name String name of solution generating certs.
     * @returns Promise void on success, throws error on fail.
     */
    async generateNewKeysAndCSR(production: boolean, solution_name: string): Promise<any> {
        const { egs_info } = this;

        try {
            const kp = rs.KEYUTIL.generateKeypair("EC", "secp256k1");
            const privateKey = rs.KEYUTIL.getPEM(kp.prvKeyObj, "PKCS8PRV");
            const publicKey = rs.KEYUTIL.getPEM(kp.pubKeyObj);

            const csr = new rs.KJUR.asn1.csr.CertificationRequest({
                sbjpubkey: publicKey,
                sbjprvkey: privateKey,
                sigalg: "SHA256withECDSA",
                subject: {str: `/commonName=${egs_info.custom_id}/organizationalUnitName=${egs_info.branch_name}/organizationName=${egs_info.VAT_name}/countryName=SA`},
                "extreq": [
                    {
                        "extname": "1.3.6.1.4.1.311.20.2",
                        // extn produce a type error but it's required for custom extenstions
                        // @ts-expect-error
                        extn: {seq: [{utf8str: production ? "ZATCA-Code-Signing" : "TSTZATCA-Code-Signing" }]}
                    },
                    {
                        "extname": "subjectAltName",
                        "array": [
                            {
                                "dn": {
                                    "array": [
                                        [
                                            {
                                                "type": "SN",
                                                "value": `1-${solution_name}|2-${egs_info.model}|3-${egs_info.uuid}`
                                            }
                                        ],
                                        [
                                            {
                                                "type": "UID",
                                                "value": egs_info.VAT_number
                                            }
                                        ],
                                        [
                                            {
                                                "type": "title",
                                                "value": "0100"
                                            }
                                        ],
                                        [
                                            {
                                                // registeredAddress (oid)
                                                "type": "2.5.4.26",
                                                "value": `${egs_info.location.building} ${egs_info.location.street}, ${egs_info.location.city}`
                                            }
                                        ],
                                        [
                                            {
                                                "type": "businessCategory",
                                                "value": egs_info.branch_industry
                                            }
                                        ]
                                    ]
                                }
                            }
                        ]
                    }
                ]
            });

            this.egs_info.private_key = privateKey;
            this.egs_info.csr = csr.getPEM();

            // uncomment to debug csr values!
            // var json = rs.KJUR.asn1.csr.CSRUtil.getParam(csr.getPEM());
            // console.log(JSON.stringify(json, null, 4));
        } catch (error) {
            throw error;
        }
    }

    /**
     * Generates a new compliance certificate through ZATCA API.
     * @param OTP String Tax payer provided from Fatoora portal to link to this EGS.
     * @returns Promise String compliance request id on success to be used in production CSID request, throws error on fail.
     */
    async issueComplianceCertificate(OTP: string): Promise<string> {
        if (!this.egs_info.csr) throw new Error("EGS needs to generate a CSR first.");

        const issued_data = await this.api.compliance().issueCertificate(this.egs_info.csr, OTP);
        this.egs_info.compliance_certificate = issued_data.issued_certificate;
        this.egs_info.compliance_api_secret = issued_data.api_secret;

        return issued_data.request_id;
    }

    /**
     * Generates a new production certificate through ZATCA API.
     * @param compliance_request_id String compliance request ID generated from compliance CSID request.
     * @returns Promise String request id on success, throws error on fail.
     */
     async issueProductionCertificate(compliance_request_id: string): Promise<string> {
        if(!this.egs_info.compliance_certificate || !this.egs_info.compliance_api_secret) throw new Error("EGS is missing a certificate/private key/api secret to request a production certificate.")

        const issued_data = await this.api.production(this.egs_info.compliance_certificate, this.egs_info.compliance_api_secret).issueCertificate(compliance_request_id);
        this.egs_info.production_certificate = issued_data.issued_certificate;
        this.egs_info.production_api_secret = issued_data.api_secret;

        return issued_data.request_id;
    }

    /**
     * Checks Invoice compliance with ZATCA API.
     * @param signed_invoice_string String.
     * @param invoice_hash String.
     * @returns Promise compliance data on success, throws error on fail.
     */
     async checkInvoiceCompliance(signed_invoice_string: string, invoice_hash: string): Promise<any> {
        if(!this.egs_info.compliance_certificate || !this.egs_info.compliance_api_secret) throw new Error("EGS is missing a certificate/private key/api secret to check the invoice compliance.")

        return await this.api.compliance(this.egs_info.compliance_certificate, this.egs_info.compliance_api_secret).checkInvoiceCompliance(
            signed_invoice_string,
            invoice_hash,
            this.egs_info.uuid
        );
    }


    /**
     * Reports invoice with ZATCA API.
     * @param signed_invoice_string String.
     * @param invoice_hash String.
     * @returns Promise reporting data on success, throws error on fail.
     */
    async reportInvoice(signed_invoice_string: string, invoice_hash: string): Promise<any> {
        if(!this.egs_info.production_certificate || !this.egs_info.production_api_secret) throw new Error("EGS is missing a certificate/private key/api secret to report the invoice.")

        return await this.api.production(this.egs_info.production_certificate, this.egs_info.production_api_secret).reportInvoice(
            signed_invoice_string,
            invoice_hash,
            this.egs_info.uuid
        );
    }

    /**
     * Signs a given invoice using the EGS certificate and keypairs.
     * @param invoice Invoice to sign
     * @param production Boolean production or compliance certificate.
     * @returns Promise void on success (signed_invoice_string: string, invoice_hash: string, qr: string), throws error on fail.
     */
    signInvoice(invoice: ZATCASimplifiedTaxInvoice, production?: boolean): {signed_invoice_string: string, invoice_hash: string, qr: string} {
        const certificate = production ? this.egs_info.production_certificate : this.egs_info.compliance_certificate;
        if (!certificate || !this.egs_info.private_key) throw new Error("EGS is missing a certificate/private key to sign the invoice.");

        return invoice.sign(certificate, this.egs_info.private_key);
    }





}