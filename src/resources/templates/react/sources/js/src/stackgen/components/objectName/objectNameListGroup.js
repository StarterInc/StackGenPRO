/**
 * {{objectname}} Data Lookup / ListGroup
 * 
 * {{GENERATED_MESSAGE}}
 * {{LICENSE}}
 * {{COMPANY_INFO}}
 * {{CONTACT_INFO}}
 *
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ListGroup, Nav } from 'react-bootstrap';
import { list{{objectname}}, remove{{objectname}} } from '../../actions/{{objectname}}s'

import {{objectname}} from './{{objectname}}';
import {{objectname}}Header from './{{objectname}}Header';

const {{objectname}}ListGroup = (props) => (
{{=<% %>=}}
    <ListGroup>
        <tbody>
        {typeof(props.<%objectname%>s.map) !== 'undefined' ? props.<%objectname%>s.map(<%objectnamevarname%> => {
        	const {id} = <%objectnamevarname%>;
            return (
                <ListGroup.Item key={<%objectnamevarname%>.id} id={<%objectnamevarname%>.id}>
                    <<%objectname%> {...<%objectnamevarname%>} />
                    &nbsp;:&nbsp;
                    <Link to={`/<%objectname%>/edit/${id}`}>edit</Link>
                </ListGroup.Item>
            );
        }): <tr><td>no results</td></tr> }
    </ListGroup>
<%={{  }}=%>    
);

const mapStateToProps = (state) => {
    return {
        {{objectname}}s: state.{{objectname}}s
    };
}

export default connect(mapStateToProps)({{objectname}}ListGroup);
