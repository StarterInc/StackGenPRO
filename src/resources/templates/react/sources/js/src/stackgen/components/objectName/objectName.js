/**
 * {{objectname}} Data Object
 *
 * {{GENERATED_MESSAGE}} 
 * 
 * {{LICENSE}} 
 * 
 * {{COMPANY_INFO}} 
 * 
 * {{CONTACT_INFO}}
 * 
 * var {{objectname}}:{ {{#variables}} {{variablename}}: '{{variableval}}',
 * {{/variables}} }
 * 
 * or {{#variables}}{{variablename}}: '{{variableval}}',{{/variables}}
 * 
 */
import React from 'react';
import { connect } from 'react-redux';

const {{objectname}} = ({ {{#variables}}
  {{variablename}},
  {{/variables}} }) => (
    <>	
	{{#variables}}
		<td style={ {margin:0, padding:0} }>
			{ {{variablename}} }
		</td>
	{{/variables}}
    </>
);

export default connect()({{objectname}});
