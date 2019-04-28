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
import { Button, Card } from 'react-bootstrap';

import {{objectname}} from './{{objectname}}';
import { remove{{objectname}} } from '../../actions/{{objectname}}s';


const {{objectname}}List = (props) => (
    {{=<% %>=}}
    <Card className='cardio'>
        <%objectname%> List:
            {props.<%objectname%>s.map(<%objectnamevarname%> => {
            	const {id} = <%objectnamevarname%>;
                return (
                    <div key={<%objectnamevarname%>.id} id={<%objectnamevarname%>.id}>
                        <<%objectname%> {...<%objectnamevarname%>} />
                        <Button onClick={ () => {
                        	props.dispatch(remove<%objectname%>( { id } ));
                        }}>delete</Button>
                    </div>
                );
            })}
    </Card>
    <%={{  }}=%>
);

const mapStateToProps = (state) => {
    return {
        {{objectname}}s: state.{{objectname}}s
    };
}

export default connect(mapStateToProps)({{objectname}}List);
