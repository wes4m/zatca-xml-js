import axios from "axios";
import { cleanUpCertificateString } from "../signing";
import { ZATCASimplifiedTaxInvoice } from "../ZATCASimplifiedTaxInvoice";


const settings = {
    API_VERSION: "V2",
    SANDBOX_BASEURL: "https://gw-apic-gov.gazt.gov.sa/e-invoicing/developer-portal",
    PRODUCTION_BASEURL: "TODO"
}

interface APIInterface {
    /**
     * Requests a new compliance certificate and secret.
     * @param csr String CSR
     * @param otp String Tax payer provided OTP from Fatoora portal
     * @returns issued_certificate: string, api_secret: string, or throws on error.
     */
    issueCertificate: (csr: string, otp: string) => Promise<{issued_certificate: string, api_secret: string}>

     /**
     * Checks compliance of a signed ZATCA XML.
     * @param signed_xml_string String.
     * @param invoice_hash String.
     * @param egs_uuid String.
     * @returns Any status.
     */
    checkInvoiceCompliance: (signed_xml_string: string, invoice_hash: string, egs_uuid: string) => Promise<any>
}

class API {

    constructor () {
    }


    private getAuthHeaders = (certificate?: string, secret?: string): any => {
        if (certificate && secret) {

            const certificate_stripped = cleanUpCertificateString(certificate);
            const basic = Buffer.from(`${Buffer.from(certificate_stripped).toString("base64")}:${secret}`).toString("base64");
            return {
                "Authorization": `Basic ${basic}`   
            };
        }
        return {};
    }

    compliance(certificate?: string, secret?: string): APIInterface {
        const auth_headers = this.getAuthHeaders(certificate, secret);

        const issueCertificate = async (csr: string, otp: string): Promise<{issued_certificate: string, api_secret: string}> => {
            const headers = {
                "Accept-Version": settings.API_VERSION,
                OTP: otp
            };

            const response = await axios.post(`${settings.SANDBOX_BASEURL}/compliance`,
                {csr: Buffer.from(csr).toString("base64")},
                {headers: {...auth_headers, ...headers}}
            );
                        
            if (response.status != 200) throw new Error("Error issuing a compliance certificate.");

            let issued_certificate = new Buffer(response.data.binarySecurityToken, "base64").toString();
            issued_certificate = `-----BEGIN CERTIFICATE-----\n${issued_certificate}\n-----END CERTIFICATE-----`;
            const api_secret = response.data.secret;

            return {issued_certificate, api_secret};
        }

        const checkInvoiceCompliance = async (signed_xml_string: string, invoice_hash: string, egs_uuid: string): Promise<any> => {
            const headers = {
                "Accept-Version": settings.API_VERSION,
                "Accept-Language": "en",
            };

            const response = await axios.post(`${settings.SANDBOX_BASEURL}/compliance/invoices`,
                {
                    invoiceHash: invoice_hash,
                    uuid: egs_uuid,
                    invoice: Buffer.from(signed_xml_string).toString("base64")
                },
                {headers: {...auth_headers, ...headers}}
            );
                        
            if (response.status != 200) throw new Error("Error in compliance check.");
            return response.data;
        }
        
        return {
            issueCertificate,
            checkInvoiceCompliance
        }
    }


    production(certificate?: string, secret?: string): APIInterface {
        throw new Error("Not Implemented");

        const issueCertificate = async (csr: string, otp: string): Promise<{issued_certificate: string, api_secret: string}> => {
            throw new Error("Not Implemented");
        }

        const checkInvoiceCompliance = async (signed_xml_string: string, invoice_hash: string, egs_uuid: string): Promise<any> => {
            throw new Error("Not Implemented");
        }

        return {
            issueCertificate,
            checkInvoiceCompliance
        }
    }
  

}

export default API;