import React from 'react';
import { connect } from 'react-redux';
import { Button, Card } from 'react-bootstrap';

export default class Form extends React.Component {

	constructor(props) {
			super(props);
	}

	render() {
		const { validated } = this.props
		return (
			<form name="f" action="perform_login" method="POST">
			<table>
				<tr>
					<td>User:</td>
					<td>
						<input type="text" name="username" value="" required/>
					</td>
				</tr>
				<tr>
					<td>Password:</td>
					<td>
						<input type="password" name="password" value="" required/>
					</td>
				</tr>
				<tr>
					<td><input name="submit" type="submit" value="submit" /></td>
				</tr>
			</table>
		</form>)
		}
};