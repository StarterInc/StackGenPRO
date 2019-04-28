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
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

const {{objectname}} = ({ {{#variables}}
  {{variablename}},
  {{/variables}} }) => (
    <>
	      <Link to={`/{{objectname}}/edit/${id}`}><b>edit</b></Link>
	    	details
    	{{#variables}}
    		{{variablename}}
    		{ {{variablename}} }
    	{{/variables}}
    </>
);

/** TODO: PropTypes!
{{objectname}}.propTypes = {
		
	{{#variables}}
		{{variablename}} : PropTypes.string,
	{{/variables}}
		
};
*/
export default connect()({{objectname}});
