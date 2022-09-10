import { XMLDocument } from "./parser";
import { valid_simplified_invoice_xml_sample } from "./samples";



const xml = new XMLDocument(valid_simplified_invoice_xml_sample);


xml.delete("Invoice/cac:Delivery/cbc:ActualDeliveryDate", "2022-03-13");
xml.set("cbc:ActualDeliveryDateTest", false, {"TagExample": "OK"});
xml.set("cbc:ActualDeliveryDateTest", true, {"TagExample": "OK2"});
xml.set("Invoice/cbc:ActualDeliveryDateTest", false, {"TagExample2": "OK"});
xml.set("Invoice/cbc:ActualDeliveryDateTest", false, {"TagExample3": "OK"});

console.log(xml.get());
// console.log(xml.toString({no_header: true}));