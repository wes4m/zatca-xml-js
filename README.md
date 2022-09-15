<div align="center">
  <br/>
  <b style="font-size: 28px; color: #489bc8">ZATCA-XML-JS</b>
  <p>v0.1 (experimental)</p>
  <br/>
  <br/>
  <p>
    An implementation of Saudi Arabia ZATCA's E-Invocing requirements, processes, and standards in TypeScript. <br/>
  </p>
  Read the <a href="/docs">documentation PDFs</a> or <a href="https://zatca.gov.sa/en/E-Invoicing/SystemsDevelopers/Pages/TechnicalRequirementsSpec.aspx">Systems Developers</a> for more details.
  <br/>
  <br/>
  <p>
    <a href="https://openbase.com/js/bullmq?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge">
      <img src="https://badges.openbase.com/js/rating/bullmq.svg"/>
    </a>
    <a href="https://badge.fury.io/js/bullmq">
      <img src="https://badge.fury.io/js/bullmq.svg"/>
    </a>
  </p>
</div>

# Dependencies
If you plan on using the built in `EGS` module to generate keys, and CSR. The `EGS` module in the package is dependent on <a href="https://www.openssl.org">OpenSSL</a> being installed in the system it's running on. It's being used to generate an `ECDSA` key pair using the `secp256k1` curve. also to generate and sign a CSR.

All other parts of the package will work fine without `OpenSSL`. (meaning it supports react-native and other frameworks)

# Supports
All tha main futures required to on-board a new EGS. Create, sign, and report a simplified tax invoice are currently supported.
- EGS (E-Invoice Generation System).
    - Creation/on-boarding (Compliance and Production x.509 CSIDs).
    - Cryptographic stamps generation.
- Simplified Tax Invoice.
    - Creation.
    - Signing.
    - Compliance checking.
    - Reporting.

# Installation
```
npm install zatca-xml-js
```

# Usage
View <a href="/examples">examples</a>
```typescript
import {
    EGS,
    EGSUnitInfo,
    ZATCASimplifiedTaxInvoice
} from "zatca-xml-js";


// Sample Invoice
const invoice = new ZATCASimplifiedTaxInvoice({
    props: {
        egs_info: egsunit,
        invoice_counter_number: 1,
        invoice_serial_number: "EGS1-123456789-1",
        issue_date: "2022-09-01",
        issue_time: "13:30:30",
        previous_invoice_hash: "Previous invoice hash",
        line_items: [
            line_item,
            line_item,
            line_item
        ]
    }
});


const main = async () => {
    try {
        // Init a new EGS
        const egs = new EGS(egsunit);
        // New Keys & CSR for the EGS
        await egs.generateNewKeysAndCSR(false);
        // Issue a new compliance cert for the EGS
        const compliance_request_id = await egs.issueComplianceCertificate("123345");
        // Sign invoice
        const {signed_invoice_string, invoice_hash} = egs.signInvoice(invoice);
        // Check invoice compliance
        await egs.checkInvoiceCompliance(signed_invoice_string, invoice_hash);
        // Issue production certificate
        await egs.issueProductionCertificate(compliance_request_id);
         // Report invoice production
        await egs.reportInvoice(signed_invoice_string, invoice_hash);

    } catch (error: any) {
        console.log(error.message ?? error);
    }
}
```

# Implementation
- General implementation (<a href="/docs/20220624_ZATCA_Electronic_Invoice_XML_Implementation_Standard_vF.pdf">More details</a>)
    - KSA Rules & Business
    - UBL 2.1 Spec
    - ISO EN16931
    - UN/CEFACT Code List 1001
    - ISO 3166
    - ISO 4217:2015
    - UN/CEFACT Code List 5305, D.16B
- Security standards (<a href="/docs/20220624_ZATCA_Electronic_Invoice_Security_Features_Implementation_Standards.pdf">More details</a>)
    - NCA National Cryptographic Standards (NCS - 1 : 2020)
    - NCDC Digital Signing Policy (Version 1.1: 2020)
    - ETSI EN 319 102-1
    - ETSI EN 319 132-1
    - ETSI EN 319 142-1
    - W3C XML-Signature Syntax and Processing
    - ETSI EN 319 122-1
    - IETF RFC 5035 (2007)
    - RFC 5280
    - ISO 32000-1
    - IETF RFC 5652 (2009)
    - RFP6749
    - NIST SP 56A

# Notice of Non-Affiliation and Disclaimer
`zatca-xml-js` is not affiliated, associated, authorized, endorsed by, or in any way officially connected with ZATCA (Zakat, Tax and Customs Authority), or any of its subsidiaries or its affiliates. The official ZATCA website can be found at https://zatca.gov.sa.

# Contribution
All contributions are appreciated.

## Roadmap
- CSIDs renewal, revoking.
- Populating templates using a template engine instead of `replace`
- Getting ZATCA to hopefully minify the XMLs before hashing ?


I'm not planning on supporting `Tax Invoices` (Not simplified ones). If any one wants to tackle that part.