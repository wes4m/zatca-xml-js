const template = /* XML */`
<cac:BillingReference>
<cac:InvoiceDocumentReference>
   <cbc:ID>Invoice Number: SET_INVOICE_NUMBER</cbc:ID>
</cac:InvoiceDocumentReference>
</cac:BillingReference>`;


export default function populate(
    invoice_number: number
): string {
    let populated_template = template;
    populated_template = populated_template.replace("SET_INVOICE_NUMBER", `${invoice_number}`);
    return populated_template;
};