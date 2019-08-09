/**
 * the Action types
 * 
 * {{GENERATED_MESSAGE}}
 * {{LICENSE}}
 * {{COMPANY_INFO}}
 * {{CONTACT_INFO}}
 *
 */
export const actionTypes = {

{{#dataobjects}}

	// StackGen generated {{objectname}} actions
    ADD_{{objnameupper}}		: 'ADD_{{objnameupper}}',
    EDIT_{{objnameupper}} 		: 'EDIT_{{objnameupper}}',
    RESET_{{objnameupper}} 		: 'RESET_{{objnameupper}}',
    REMOVE_{{objnameupper}} 	: 'REMOVE_{{objnameupper}}',
    GET_{{objnameupper}} 		: 'GET_{{objnameupper}}',
    LIST_{{objnameupper}}S 		: 'LIST_{{objnameupper}}S',
    
    // TODO: implement
    // FETCH_{{objnameupper}}		: 'FETCH_{{objnameupper}}',
    // DUPLICATE_{{objnameupper}}	: 'DUPLICATE_{{objnameupper}}',
    
    {{objnameupper}}_MESSAGE	: '{{objnameupper}}_MESSAGE',
    {{objnameupper}}_ERROR 		: '{{objnameupper}}_ERROR'
{{/dataobjects}}
}
