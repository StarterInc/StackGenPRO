/**
 * {{objectname}} Data Table
 * 
 * {{GENERATED_MESSAGE}}
 * {{LICENSE}}
 * {{COMPANY_INFO}}
 * {{CONTACT_INFO}}
 *
 *
var {{objectname}}:{
	{{#variables}}
		{{variablename}}: '{{variableval}}',
	{{/variables}}
}
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card, Table, Row, Col, Button } from 'react-bootstrap';
import { list{{objectname}}s, remove{{objectname}} } from '../../actions/{{objectname}}s'

import {{objectname}} from './{{objectname}}';
import {{objectname}}Header from './{{objectname}}Header';

const {{objectname}}Table = (props) => (
{{=<% %>=}}
    <Card style={{ width: '100%' }}>
    <Card.Header>
        <Row>
            <Col>
                <%objectname%> List
            </Col>
            <Col style={{float:"right"}}>
                <Link to={`/<%objectname%>/add/`}> <b>add</b></Link> | <Button onClick={ () => { props.dispatch(list<%objectname%>s()); }}>load</Button>
            </Col>    
        </Row>
    </Card.Header>
        <Card.Body>
        <Table striped hover responsive size="lg">
            <<%objectname%>Header/>
            <tbody>
            {typeof(props.<%objectname%>s.map) !== 'undefined' ? props.<%objectname%>s.map(<%objectnamevarname%> => {
            	const {id} = <%objectnamevarname%>;
                return (
                    <tr key={<%objectnamevarname%>.id} id={<%objectnamevarname%>.id}>
                        <<%objectname%> {...<%objectnamevarname%>} />
                        <td>
	                        <Button onClick={ () => { props.dispatch(remove<%objectname%>( { id } )); }}>
	                        delete
	                        </Button>
                        </td>
                    	<td>
	                    	<Button>
	                    	<Link to={`#/<%objectname%>/edit/${id}`}><b>edit</b></Link>
	                    	</Button>
                    	</td>
                    </tr>
                );
            }): <tr><td>no results</td></tr> }
            </tbody>
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

export default connect(mapStateToProps)({{objectname}}Table);
