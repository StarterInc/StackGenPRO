import React from "react"
import { Row, Col } from "react-bootstrap"
// import "./editorCard.css"

export default function EditorCard(props){
  
    return (
      <>
        <Row>
          <Col sm={3} xs={2}></Col>
          <Col sm={6} xs={8}>
            {props.children}
          </Col>
          <Col sm={3} xs={2}></Col>
        </Row>

      </>
    )
}