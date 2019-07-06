/**
 * Auto-Generated {{objectname}} Data LIST
 * 
 * GENERATED FILE: DO NOT EDIT!
 *
 *
var {{objectname}}:{
	{{#variables}}
		{{variablename}}: '{{variableval}}',
	{{/variables}}
}
*/
import React from 'react';
import { connect } from 'react-redux';
import { Card, Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { remove{{objectname}} } from '../../actions/{{objectname}}s';

import {{objectname}} from './{{objectname}}';
import {{objectname}}Header from './{{objectname}}Header';

const {{objectname}}List = (props) => (
    {{=<% %>=}}
    <Card>
    <Card.Header><%objectname%> List:</Card.Header>
        <Card.Body>
        <Table striped hover responsive borderless size="lg">
            <<%objectname%>Header/>  
            {props.<%objectname%>s ? props.<%objectname%>s.map(<%objectnamevarname%> => {
            	const {id} = <%objectnamevarname%>;
                return (
                    <tr key={<%objectnamevarname%>.id} id={<%objectnamevarname%>.id}>
                        <<%objectname%> {...<%objectnamevarname%>} />
                        <td><Button onClick={ () => { props.dispatch(remove<%objectname%>( { id } )); }}>delete</Button></td>
                    	<td><Link to={`/<%objectname%>/edit/${id}`}><b>edit</b></Link></td>
                    </tr>
                );
            }): <tr><td>no results</td></tr> }
            </Table>
        </Card.Body>
    </Card>
    <%={{  }}=%>
);

const mapStateToProps = (state) => {
    return {
        {{objectname}}s: state.{{objectname}}s
    };
}

export default connect(mapStateToProps)({{objectname}}List);
