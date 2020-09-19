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
import {{objectname}}Chart from './{{objectname}}Chart';


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
        <<%objectname%>Chart/>
        <Table striped hover responsive size="lg">
            <<%objectname%>Header/>
            <tbody>
            {props.<%objectname%>s && typeof(props.<%objectname%>s.map) !== 'undefined' ? props.<%objectname%>s.map(<%objectnamevarname%> => {
            	const {id} = <%objectnamevarname%>;
                return (
                    <tr style={{margin:0, padding:0}} key={<%objectnamevarname%>.id} id={<%objectnamevarname%>.id}>
                    <td style={{margin:0, padding:0}}>
	                    <Button size="sm" onClick={ () => { props.dispatch(remove<%objectname%>( { id } )); }}>
                        <FaTrash
                            size={10}
                        />
                        </Button>
	                    
	                </td>
	            	<td style={{margin:0, padding:0}}>
	            		<Link to={`/<%objectname%>/edit/${id}`}>
	            		<Button size="sm" >
                        <FaEdit
                            size={10}
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
