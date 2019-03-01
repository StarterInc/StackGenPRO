import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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
    <div className="container__box">
        <table>
        <tbody>
        <tr>
          <td>
            <Link to={`/{{objectname}}/edit/${id}`}>
                <b>edit</b>
            </Link>
          </td>
          <td>
            details
          </td>
        </tr>
        {{#variables}}
        <tr><td>
          {{variablename}}
          </td><td>
          { {{variablename}} }
          </td>
          </tr>
        {{/variables}}
        </tbody>
        </table>

    </div>
);

export default connect()({{objectname}});
