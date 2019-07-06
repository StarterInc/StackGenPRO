/**
 * Auto-Generated {{objectname}} Data Object
 * 
 * GENERATED FILE: DO NOT EDIT!
 * 
 * var {{objectname}}:{ {{#variables}} {{variablename}}: '{{variableval}}',
 * {{/variables}} }
 * 
 * or {{#variables}}{{variablename}}: '{{variableval}}',{{/variables}}
 * 
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const {{objectname}} = ({ {{#variables}}
  {{variablename}},
  {{/variables}} }) => (
    <>	
	{{#variables}}
		<td>
			{ {{variablename}} }
		</td>
	{{/variables}}
    </>
);

{{objectname}}.propTypes = {
	{{#variables}}
		{{variablename}} : PropTypes.{{variableType}},
	{{/variables}}		
};

export default connect()({{objectname}});
