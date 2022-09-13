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
    CRN_number: string,
    VAT_name: string,
    VAT_number: string,
    location: EGSUnitLocation
}