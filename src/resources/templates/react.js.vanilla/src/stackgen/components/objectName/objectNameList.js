import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import {{objectname}} from './{{objectname}}';
import { remove{{objectname}} } from '../../actions/{{objectname}}s';
/**
 * GENERATED FILE: DO NOT EDIT!
 *
 * Auto-Generated {{objectname}} Data LIST
 *
var {{objectname}}:{
	{{#variables}}
		{{variablename}}: '{{variableval}}',
	{{/variables}}
}*/

const {{objectname}}List = (props) => (
    {{=<% %>=}}
    <div className="container__list">
        <%objectname%> List:
            {props.<%objectname%>s.map(<%objectnamevarname%> => {
                return (
                    <div key={<%objectnamevarname%>.id} id={<%objectnamevarname%>.id}>
                        <<%objectname%> {...<%objectnamevarname%>} />
                        <Button onClick={() => {
                        	props.dispatch(remove<%objectname%>( {<%objectnamevarname%>.id } ));
                        }}>delete</Button>
                    </div>
                );
            })}
    </div>
    <%={{  }}=%>
);

const mapStateToProps = (state) => {
    return {
        {{objectname}}s: state.{{objectname}}s
    };
}

export default connect(mapStateToProps)({{objectname}}List);
