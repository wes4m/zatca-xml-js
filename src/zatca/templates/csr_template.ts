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
1.3.6.1.4.1.311.20.2 = ASN1:UTF8String:TSTZATCA-Code-Signing
subjectAltName=dirName:dir_sect

[ dir_sect ]
# EGS Serial number (1-SolutionName|2-ModelOrVersion|3-serialNumber)
SN = 1-TST|2-TST|3-ed22f1d8-e6a2-1118-9b58-d9a8f11e445f
# VAT Registration number of TaxPayer (Organization identifier [15 digits begins with 3 and ends with 3])
UID = 312345678900003
# Invoice type (TSCZ)(1 = supported, 0 not supported) (Tax, Simplified, future use, future use)
title = 0100
# Location (branch address or website)
registeredAddress = TST
# Industry (industry sector name)
businessCategory = TST

# ------------------------------------------------------------------
# Section for prompting DN field values to create "subject"
# ------------------------------------------------------------------
[my_req_dn_prompt]
# Common name (EGS TaxPayer PROVIDED ID [FREE TEXT])
commonName = TST-886431145-312345678900003

# Organization Unit (Branch name)
organizationalUnitName = TST TAXPAYER BRANCH NAME

# Organization name (Tax payer name)
organizationName = TST TAXPAYER NAME

# ISO2 country code is required with US as default
countryName = SA



`;




// csr.common.name=TST-886431145-312345678900003
// csr.serial.number=1-TST|2-TST|3-ed22f1d8-e6a2-1118-9b58-d9a8f11e445f
// csr.organization.identifier=312345678900003
// csr.organization.unit.name=3123456789
// csr.organization.name=3123456789
// csr.country.name=SA
// csr.invoice.type=1111
// csr.location.address=TST
// csr.industry.business.category=TST


export default function populate(): string {
    let populated_template = template;
    // populated_template = populated_template.replace("SET_SIGN_TIMESTAMP", sign_timestamp);
    // TODO ..
    return populated_template;
};