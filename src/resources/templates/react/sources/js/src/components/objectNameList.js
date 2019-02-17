import React from 'react';
import { connect } from 'react-redux';
import {{objectname}} from './{{objectname}}';

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
    <div>
        <%objectname%> List:
        <ul>
            {props.<%objectname%>s.map(<%objectnamevarname%> => {
                return (
                    <li key={<%objectnamevarname%>.id}>
                        <<%objectname%> {...<%objectnamevarname%>} />
                    </li>
                );
            })}
        </ul>

    </div>
    <%={{ }}=%>
);

const mapStateToProps = (state) => {
    return {
        {{objectname}}s: state.{{objectname}}s
    };
}

export default connect(mapStateToProps)({{objectname}}List);
