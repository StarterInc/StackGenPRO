import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

{{#dataobjects}}
import {{objname}}List from './{{objname}}/{{objname}}List';
{{/dataobjects}}

/**
 * 
 */
const ObjectMenu = () => (
    <Row>
    {{#dataobjects}}
      <{{objname}}List />
    {{/dataobjects}}
    </Row>
);

export default ObjectMenu;
