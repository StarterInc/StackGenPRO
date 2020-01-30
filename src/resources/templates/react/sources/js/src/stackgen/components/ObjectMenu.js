import React from 'react';

import { Row, Accordion } from 'react-bootstrap';

{{#dataobjects}}
import {{objname}}Table from './{{objname}}/{{objname}}Table';
{{/dataobjects}}

/**
 * menu for the app
 */
const ObjectMenu = () => (
    <Row>
    <Accordion style={ {margin:'10px', width:'100%'} }>
    {{#dataobjects}}
      <{{objname}}Table />
    {{/dataobjects}}
    </Accordion>
    </Row>
);

export default ObjectMenu;
