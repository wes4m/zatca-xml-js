import { XMLParser } from "fast-xml-parser";
import { XMLObject, XMLQueryResult } from "./types";
import _ from "lodash";

export class XMLDocument {
    
    private xml_object: XMLObject;
    private parser_options = {
        ignoreAttributes: false,
        ignoreDeclaration: false,
        ignorePiTags: false
    };


    constructor(xml_str?: string) {
        const parser = new XMLParser(this.parser_options);

        if (xml_str) {
            this.xml_object = parser.parse(xml_str) ?? {};
        } else {
            this.xml_object = {'?xml': { '@_version': '1.0', '@_encoding': 'UTF-8' }};
        }
    }


    private getElement(xml_object: any, path_query: string, parent_xml_object?: any, last_tag?: string): any {
        if (path_query == "" || !xml_object) return {xml_object, parent_xml_object, last_tag};
    
        const current_path: string[] = path_query.split("/");
        const current_tag: string = current_path.splice(0, 1)[0];
        const new_query_path: string = current_path.join("/");
    
        return this.getElement(xml_object[current_tag], new_query_path, xml_object, current_tag);
    }
    

    private filterByCondition(result: XMLQueryResult, condition: any): XMLQueryResult {
        return _.filter(result, _.matches(condition));
    }

    /**
     * Queries the XML for a specific element given its path in tags. 
     * Accepts condition for filtering.
     * @param path_query String path of element tags. e.g: "Invoice/cac:Delivery/cbc:ActualDeliveryDate"
     * @param condition Any condition. e.g: {"name": "example"}, "2022-03-13"
     * @returns Array of elements/element if found. undefined if no match found.
     */
    get(path_query?: string, condition?: any): XMLQueryResult {        
        if (!this.xml_object) return;

        const {xml_object} = this.getElement(this.xml_object, path_query ?? "");
        let query_result: XMLQueryResult = xml_object;
        
        if (query_result && !(query_result instanceof Array)) {
            query_result = [query_result];
        }
        if (condition) {
            query_result = this.filterByCondition(query_result, condition);
        }

        return _.isEmpty(query_result) ? undefined : query_result;
    }


    /**
     * Queries and deletes the XML for a specific element given its path in tags. 
     * Accepts condition for filtering.
     * @param path_query String path of element tags. e.g: "Invoice/cac:Delivery/cbc:ActualDeliveryDate"
     * @param condition Any condition. e.g: {"name": "example"}, "2022-03-13"
     * @returns Boolean true if deleted, false if no match.
     */
     delete(path_query?: string, condition?: any): boolean {        
        if (!this.xml_object) return false;

        const {xml_object, parent_xml_object, last_tag} = this.getElement(this.xml_object, path_query ?? "");
        let query_result: XMLQueryResult = xml_object;

        if (query_result && !(query_result instanceof Array)) {
            query_result = [query_result];
        }
        if (condition) {
            query_result = this.filterByCondition(query_result, condition);
        }

        if (_.isEmpty(query_result)) return false;

        if (parent_xml_object[last_tag] instanceof Array) {
            parent_xml_object[last_tag] = _.filter(parent_xml_object[last_tag], () => !_.matches(condition));
        } else {
            delete parent_xml_object[last_tag];
        }

        return true;
    }


    /**
     * Adds an XMLObject to a specific element given its path in tags. 
     * Requires the query path to be already in the XML. It does not create the path for you.
     * Accepts condition for filtering.
     * @param add_xml XMLObject or String for other values to be added.
     * @param path_query String path of element tags. e.g: "Invoice/cac:Delivery/cbc:ActualDeliveryDate"
     * @param condition Any condition. e.g: {"name": "example"}, "2022-03-13"
     * @returns Boolean true if added, false if unable to add.
     */
    add(path_query: string, add_xml: XMLObject | string, condition?: any): boolean {        
        if (!this.xml_object) return false;

        const path_tags = path_query.split("/");
        const tag = path_tags.splice(path_tags.length-1, 1)[0];
        path_query = path_tags.join("/");

        let {xml_object, parent_xml_object, last_tag} = this.getElement(this.xml_object, path_query ?? "");
        let query_result: XMLQueryResult = xml_object;
        

        if (query_result && !(query_result instanceof Array)) {
            query_result = [query_result];
        }
        if (condition) {
            query_result = this.filterByCondition(query_result, condition);
        }

        if (_.isEmpty(query_result)) return false;

        // Workaround for adding to root (since it has no key)
        if(!path_query) {
            parent_xml_object = {"root": this.xml_object};
            last_tag = "root";
        }
        
        try {
            if (parent_xml_object[last_tag][tag] instanceof Array) {
                parent_xml_object[last_tag][tag] = [...parent_xml_object[last_tag][tag], add_xml];
            } else {
                if (parent_xml_object[last_tag][tag]) {
                    // Tag already exists but is not an Array. (Adding to it should turn it into an array)
                    parent_xml_object[last_tag][tag] = [parent_xml_object[last_tag][tag], add_xml];
                } else {
                    // New tag
                    parent_xml_object[last_tag][tag] = add_xml;
                }
            }

            return true;
        } catch(error: any) {
            console.log(error.message);
        }
        
        return false;
    }

   
}