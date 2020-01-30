/**
 * {{objectname}} Data Table
 * 
 * {{GENERATED_MESSAGE}} 
 * 
 * {{LICENSE}} 
 * 
 * {{COMPANY_INFO}} 
 * 
 * {{CONTACT_INFO}}
 * 
 * 
 * var {{objectname}}:{ {{#variables}} {{variablename}}: '{{variableval}}',
 * {{/variables}} }
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Accordion, Card, Table, Row, Col, Button } from 'react-bootstrap';
import { list{{objectname}}s, remove{{objectname}} } from '../../actions/{{objectname}}s'
import { FaTrash, FaEdit } from 'react-icons/fa';
import {{objectname}} from './{{objectname}}';
import {{objectname}}Header from './{{objectname}}Header';

const {{objectname}}Table = (props) => (
{{=<% %>=}}
    <Card style={{ width: '100%'}}>
    
    <Card.Header  style={{ width: '100%', paddingLeft:10 }}
    	onClick={ () => { props.dispatch(list<%objectname%>s()); }}>
    
    	<Accordion.Toggle as={Row} variant="link" eventKey="<%objectname%>" 
            style={{marginLeft:'30px'}}
        >
        	<b><%objectname%></b>
        </Accordion.Toggle>
        
    </Card.Header>
    
    <Accordion.Collapse eventKey="<%objectname%>">
        <Card.Body>
        <Table striped hover responsive size="lg">
            <<%objectname%>Header/>
            <tbody>
            {typeof(props.<%objectname%>s.map) !== 'undefined' ? props.<%objectname%>s.map(<%objectnamevarname%> => {
            	const {id} = <%objectnamevarname%>;
                return (
                    <tr key={<%objectnamevarname%>.id} id={<%objectnamevarname%>.id}>
                    <td>
	                    <Button size="sm" onClick={ () => { props.dispatch(remove<%objectname%>( { id } )); }}>
                        <FaTrash
                            size={15}
                        />
                        </Button>
	                    
	                </td>
	            	<td>
	            		<Link to={`/<%objectname%>/edit/${id}`}>
	            		<Button size="sm" >
                        <FaEdit
                            size={15}
                        />
                        </Button>
	                	</Link>
	            	</td>
                    <<%objectname%> {...<%objectnamevarname%>} />
                        
                    </tr>
                );
            }): <tr><td>no results</td></tr> }
            </tbody>
            </Table>
        </Card.Body>
        </Accordion.Collapse>
    </Card>
<%={{  }}=%>
);

const mapStateToProps = (state) => {
    return {
        {{objectname}}s: state.{{objectname}}s 
    };
}

export default connect(mapStateToProps)({{objectname}}Table);
