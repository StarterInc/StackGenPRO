import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { remove{{objectname}} } from '../actions/{{objectname}}s';

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
    <div>
        <Link to={`/{{objectname}}/edit/${id}`}>
            <b>LINK TO THIS RECORD</b>
        </Link>

        <table>
        <tbody>
        {{#variables}}
        <tr><td>
          {{variablename}}
          </td><td>
          {{variableval}}
          </td>
          </tr>
        {{/variables}}
        </tbody>
        </table>


        <button onClick={() => {
            dispatch(remove{{objectname}}({ id }));
        }}>Remove</button>
    </div>
);

export default connect()({{objectname}});
