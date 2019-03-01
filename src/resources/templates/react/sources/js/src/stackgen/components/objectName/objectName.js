import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

/**
 * GENERATED FILE: DO NOT EDIT!
 *
 * Auto-Generated {{objectname}} Data Object
 *
var {{objectname}}:{
	{{#variables}}
		{{variablename}}: '{{variableval}}',
	{{/variables}}
}

or
{{#variables}}{{variablename}}: '{{variableval}}',{{/variables}}

*/
const {{objectname}} = ({ {{#variables}}
  {{variablename}},
  {{/variables}} }) => (
    <>
	<Row>
	    <Col>
	      <Link to={`/{{objectname}}/edit/${id}`}><b>edit</b></Link>
	    </Col>
	    <Col>
	    	details
	    </Col>
    </Row>
    	{{#variables}}
    <Row>
    	<Col>
    		{{variablename}}
    	</Col>
    	<Col>
    		{ {{variablename}} }
        </Col>
    </Row>
    {{/variables}}
    </>
);

export default connect()({{objectname}});
