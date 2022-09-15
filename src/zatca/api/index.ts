import axios from "axios";


const settings = {
    API_VERSION: "V2",
    SANDBOX_BASEURL: "https://gw-apic-gov.gazt.gov.sa/e-invoicing/developer-portal",
    PRODUCTION_BASEURL: "TODO"
}

interface APIInterface {
    issueCertificate: (csr: string, otp: string) => Promise<any>
}

class API {

    constructor () {
    }


    private getAuthHeaders = (certificate?: string, secret?: string): any => {
        if (certificate && secret) {
            const basic = Buffer.from(`${certificate}:${secret}`).toString("base64");
            return {
                "Authorization": `Basic ${basic}`   
            };
        }
        return {};
    }

    compliance(certificate?: string, secret?: string): APIInterface {
        const auth_headers = this.getAuthHeaders(certificate, secret);

        const issueCertificate = async (csr: string, otp: string) => {
            const headers = {
                "Accept-Version": settings.API_VERSION,
                OTP: otp
            };

            const response = await axios.post(`${settings.SANDBOX_BASEURL}/compliance`,
                {csr: csr},
                {headers: {...auth_headers, ...headers}}
            );
            
            console.log(response);
        }
        
        return {
            issueCertificate
        }
    }


    production(certificate?: string, secret?: string): APIInterface {
        throw ("Not Implemented");

        const issueCertificate = async (csr: string) => {
        }
        
        return {
            issueCertificate
        }
    }
  

}

export default API;