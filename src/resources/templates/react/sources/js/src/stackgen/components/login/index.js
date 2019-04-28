/*
 * Login Form
 *
 * GENERATED FILE: DO NOT EDIT!
 *
 */
import React, { useState } from "react"
import { Card, Row, Col } from "react-bootstrap"

import "./Login.css"

function Login() {

  return (
    <div className="dialogBgBlur">
      <Card>
      <Row>
      <Col>
      <h1>LOGIN HERE</h1>
      <p>User login page</p>
		<form name="f" action="login" method="POST">
		    <table>
		        <tr>
		            <td>User:</td>
		            <td>
		            	<input type="text" name="username" value=""/>
		            </td>
		        </tr>
		        <tr>
		            <td>Password:</td>
		            <td>
		            	<input type="password" name="password" value=""/>
		            </td>
		        </tr>
		        <tr>
		            <td><input name="submit" type="submit" value="submit" /></td>
		        </tr>
		    </table>
		</form>
      </Col>
      </Row>
      </Card>
    </div>
  )
}

export default Login
