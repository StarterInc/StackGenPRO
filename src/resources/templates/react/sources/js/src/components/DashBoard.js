import React from 'react';

{{#dataobjects}}
import {{objname}}List from './{{objname}}List';
{{/dataobjects}}
const DashBoard = () => (
    <div className='container__list'>
    {{#dataobjects}}
    <{{objname}}List />
    {{/dataobjects}}
    </div>
);

export default DashBoard;
