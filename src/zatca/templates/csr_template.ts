// 2.2.2 Profile specification of the Cryptographic Stamp identifiers. & CSR field contents / RDNs.
const template = `
# ------------------------------------------------------------------
# Default section for "req" command options
# ------------------------------------------------------------------
[req]

# Password for reading in existing private key file
# input_password = SET_PRIVATE_KEY_PASS

# Prompt for DN field values and CSR attributes in ASCII
prompt = no
utf8 = no

# Section pointer for DN field options
distinguished_name = my_req_dn_prompt

# Extensions
req_extensions = v3_req

[ v3_req ]
#basicConstraints=CA:FALSE
#keyUsage = digitalSignature, keyEncipherment
# Production or Testing Template (TSTZATCA-Code-Signing - ZATCA-Code-Signing)
1.3.6.1.4.1.311.20.2 = ASN1:UTF8String:SET_PRODUCTION_VALUE
subjectAltName=dirName:dir_sect

[ dir_sect ]
# EGS Serial number (1-SolutionName|2-ModelOrVersion|3-serialNumber)
SN = SET_EGS_SERIAL_NUMBER
# VAT Registration number of TaxPayer (Organization identifier [15 digits begins with 3 and ends with 3])
UID = SET_VAT_REGISTRATION_NUMBER
# Invoice type (TSCZ)(1 = supported, 0 not supported) (Tax, Simplified, future use, future use)
title = 0100
# Location (branch address or website)
registeredAddress = SET_BRANCH_LOCATION
# Industry (industry sector name)
businessCategory = SET_BRANCH_INDUSTRY

# ------------------------------------------------------------------
# Section for prompting DN field values to create "subject"
# ------------------------------------------------------------------
[my_req_dn_prompt]
# Common name (EGS TaxPayer PROVIDED ID [FREE TEXT])
commonName = SET_COMMON_NAME

# Organization Unit (Branch name)
organizationalUnitName = SET_BRANCH_NAME

# Organization name (Tax payer name)
organizationName = SET_TAXPAYER_NAME

# ISO2 country code is required with US as default
countryName = SA
`;


interface CSRConfigProps {
    private_key_pass?: string,
    production?: boolean,
    egs_model: string,
    egs_serial_number: string,
    solution_name: string,
    vat_number: string,
    branch_location: string,
    branch_industry: string,
    branch_name: string,
    taxpayer_name: string,
    taxpayer_provided_id: string

}
export default function populate(props: CSRConfigProps): string {
    let populated_template = template;
    populated_template = populated_template.replace("SET_PRIVATE_KEY_PASS", props.private_key_pass ?? "SET_PRIVATE_KEY_PASS");
    populated_template = populated_template.replace("SET_PRODUCTION_VALUE", props.production ? "ZATCA-Code-Signing" : "TSTZATCA-Code-Signing");
    populated_template = populated_template.replace("SET_EGS_SERIAL_NUMBER", `1-${props.solution_name}|2-${props.egs_model}|3-${props.egs_serial_number}`);
    populated_template = populated_template.replace("SET_VAT_REGISTRATION_NUMBER", props.vat_number);
    populated_template = populated_template.replace("SET_BRANCH_LOCATION", props.branch_location);
    populated_template = populated_template.replace("SET_BRANCH_INDUSTRY", props.branch_industry);
    populated_template = populated_template.replace("SET_COMMON_NAME", props.taxpayer_provided_id);
    populated_template = populated_template.replace("SET_BRANCH_NAME", props.branch_name);
    populated_template = populated_template.replace("SET_TAXPAYER_NAME", props.taxpayer_name);

    return populated_template;
};