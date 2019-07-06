/*
 * Login Form
 *
 * GENERATED FILE: DO NOT EDIT!
 *
 */
import React, { useState } from "react"
import { Card, Row, Col } from "react-bootstrap"

import "./Login.css"

const inputs = [{
	name: "username",
	placeholder: "username",
	type: "text"
  },{
	name: "password",
	placeholder: "password",
	type: "password"
  },{
	type: "submit",
	value: "Submit",
	className: "btn"
  }]
   
  const props = {
	name: 'loginForm',
	method: 'POST',
	action: '/perform_login',
	inputs: inputs
  }
   
  const params = new URLSearchParams(window.location.search)
   
  export default class Login extends React.Component {

    constructor(props) {
          super(props);
    }
    render() {
        return (
        <div>
          <Card>
          <Row>
          <Col>
          <h1>Login</h1>
          <p>login with your {{appname}} username</p>   
          
        
   
          </Col>
          </Row>
          </Card>
        </div>
      )
    }
  };
