import { EGS, EGSUnitInfo } from "../zatca/egs";
import { ZATCASimplifiedInvoiceLineItem } from "../zatca/templates/simplified_tax_invoice_template";
import { ZATCASimplifiedTaxInvoice } from "../zatca/ZATCASimplifiedTaxInvoice";
import { generatePhaseOneQR } from "../zatca/qr";

// Sample line item
const line_item: ZATCASimplifiedInvoiceLineItem = {
    id: "1",
    name: "TEST NAME",
    quantity: 5,
    tax_exclusive_price: 10,
    VAT_percent: 0.15,
    other_taxes: [
        {percent_amount: 1}
    ],
    discounts: [
        {amount: 2, reason: "A discount"},
        {amount: 2, reason: "A second discount"}
    ]
};

// Sample EGSUnit
const egsunit: EGSUnitInfo = {
    uuid: "6f4d20e0-6bfe-4a80-9389-7dabe6620f12",
    custom_id: "EGS1-886431145",
    model: "IOS",
    CRN_number: "454634645645654",
    VAT_name: "Wesam Alzahir",
    VAT_number: "301121971500003",
    location: {
        city: "Khobar",
        city_subdivision: "West",
        street: "King Fahahd st",
        plot_identification: "0000",
        building: "0000",
        postal_zone: "31952"
    },
    branch_name: "My Branch Name",
    branch_industry: "Food"
};

// Sample Invoice
const invoice = new ZATCASimplifiedTaxInvoice({
    props: {
        egs_info: egsunit,
        invoice_counter_number: 1,
        invoice_serial_number: "EGS1-886431145-1",
        issue_date: "2022-03-13",
        issue_time: "14:40:40",
        previous_invoice_hash: "NWZlY2ViNjZmZmM4NmYzOGQ5NTI3ODZjNmQ2OTZjNzljMmRiYzIzOWRkNGU5MWI0NjcyOWQ3M2EyN2ZiNTdlOQ==",
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
        await egs.generateNewKeysAndCSR(false, "solution_name");

        // Issue a new compliance cert for the EGS
         const compliance_request_id = await egs.issueComplianceCertificate("123345");

        // Sign invoice
         const {signed_invoice_string, invoice_hash, qr} = egs.signInvoice(invoice);

        // Check invoice compliance
         console.log( await egs.checkInvoiceCompliance(signed_invoice_string, invoice_hash) );

        // Issue production certificate
         const production_request_id = await egs.issueProductionCertificate(compliance_request_id);
        
         // Report invoice production
         // Note: This request currently fails because ZATCA sandbox returns a constant fake production certificate
         //console.log( await egs.reportInvoice(signed_invoice_string, invoice_hash) );


    } catch (error: any) {
        console.log(error.message ?? error);
    }
}


main();