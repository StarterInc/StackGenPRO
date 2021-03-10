import React from "react"
import { Row, Col } from "react-bootstrap"
import "./editorCard.css"

export default function EditorCard(props){
  return (
      <div
          className={'editorCard'}
      >
        {props.children}
      </div>
  )
}