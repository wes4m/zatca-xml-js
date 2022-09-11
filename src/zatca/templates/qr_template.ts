const template = /* XML */`
<cac:AdditionalDocumentReference>
        <cbc:ID>QR</cbc:ID>
        <cac:Attachment>
            <cbc:EmbeddedDocumentBinaryObject mimeCode="text/plain">QR_CODE_DATA</cbc:EmbeddedDocumentBinaryObject>
        </cac:Attachment>
</cac:AdditionalDocumentReference>`;

export default function populate(qr_code_data: string): string {
    let populated_template: string = template;
    populated_template = populated_template.replace("QR_CODE_DATA", qr_code_data);
    return populated_template;
};