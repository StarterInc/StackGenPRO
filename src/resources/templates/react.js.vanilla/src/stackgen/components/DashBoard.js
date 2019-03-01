import React from 'react';
import { Link } from 'react-router-dom';

{{#dataobjects}}
import {{objname}}List from './{{objname}}/{{objname}}List';
{{/dataobjects}}
const DashBoard = () => (
    <div className='container__list'>
    <Link to={`/fieldmapper`}>
        <b>FIELD MAPPER</b>
    </Link>
    {{#dataobjects}}
      <{{objname}}List />
    {{/dataobjects}}
    </div>
);

export default DashBoard;
