/*
 * Logout Form
 *
 * {{GENERATED_MESSAGE}}
 * {{LICENSE}}
 * {{COMPANY_INFO}}
 * {{CONTACT_INFO}}
 *
 *
 */
import React, { useState } from "react"
import { Card, Row, Col } from "react-bootstrap"

import "./Logout.css"

const mappings = {
  {{#dataobjects}}
   {{index}}: {
    text: "{{objname}}",
    state: "mapping"
  },
  {{/dataobjects}}
}

function Logout() {
  const [mappingValues, setValue] = useState(mappings)

  return (
    <div>
      <Card>
      <Row>
      <Col>
      <h1>Logout HERE</h1>
      </Col>
      </Row>
      </Card>
    </div>
  )
}

export default Logout
