import { XMLDocument } from "./parser";
import { valid_simplified_invoice_xml_sample } from "./samples";



const xml = new XMLDocument(valid_simplified_invoice_xml_sample);


xml.delete("Invoice/cac:Delivery/cbc:ActualDeliveryDate", "2022-03-13");
console.log(xml.get("Invoice/cac:Delivery"));