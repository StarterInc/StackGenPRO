import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

{{#dataobjects}}
import {{objname}}Table from './{{objname}}/{{objname}}Table';
{{/dataobjects}}

/**
 * menu for the app
 */
const ObjectMenu = () => (
    <Row>
    {{#dataobjects}}
      <{{objname}}Table />
    {{/dataobjects}}
    </Row>
);

export default ObjectMenu;
