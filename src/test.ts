import { XMLDocument } from "./parser";
import { valid_simplified_invoice_xml_sample } from "./samples";



const xml = new XMLDocument(valid_simplified_invoice_xml_sample);


xml.delete("Invoice/cac:Delivery/cbc:ActualDeliveryDate", "2022-03-13");
xml.add("cbc:ActualDeliveryDateTest", {"TagExample": "OK"});
xml.add("Invoice/cbc:ActualDeliveryDateTest", {"TagExample2": "OK"});
xml.add("Invoice/cbc:ActualDeliveryDateTest", {"TagExample3": "OK"});

console.log(xml.get());
console.log(xml.toString({no_header: true}));