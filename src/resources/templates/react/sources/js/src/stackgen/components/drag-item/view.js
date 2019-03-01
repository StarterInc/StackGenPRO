import React, { forwardRef } from "react"
import "./styles.css"
import Button from "react-bootstrap/Button"
import ButtonToolbar from "react-bootstrap/ButtonToolbar"

export default forwardRef(({ data, classValue }, ref) => {
  return (
    <div className={`item ${classValue}`} ref={ref}>
      <div>{data.text}</div>
      <ButtonToolbar>
        <Button variant="primary" size="sm">
          Primary
        </Button>
        <Button variant="success" size="sm">
          Success
        </Button>
        <Button variant="warning" size="sm">
          Warning
        </Button>
        <Button variant="danger" size="sm">
          Danger
        </Button>
      </ButtonToolbar>
    </div>
  )
})
