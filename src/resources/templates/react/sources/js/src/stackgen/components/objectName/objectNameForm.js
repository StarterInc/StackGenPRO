import React from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';

/**
 * GENERATED FILE: DO NOT EDIT!
 * 
 * Auto-Generated {{objectname}} Data Entry FORM
 * 
 * 
 * var {{objectname}}:{ {{#variables}} {{variablename}}: '{{variableval}}',
 * {{/variables}} }
 */
export default class {{objectname}}Form extends React.Component {

	constructor(props) {
        super(props);

        {{#variables}}
        this.on{{variablename}}Change = this.on{{variablename}}Change.bind(this);
        {{/variables}}
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
          {{#variables}}
            {{variablename}}: props.{{objectname}} 
            	? props.{{objectname}}.{{variablename}} : '{{variableval}}',
          {{/variables}}
            error: '',
            validated: false
        };
    }
            
    {{#variables}}
    
    /**
	 * Auto-Generated {{objectname}} 
	 * Data Action Event Listener
	 * 
	 */
    on{{variablename}}Change(e) {
        const {{variablename}}val = e.target.value;
        this.setState(() => ({ {{variablename}}: {{variablename}}val }));
    }
    {{/variables}}
    
    onSubmit(e) {
        e.preventDefault();
        this.setState(() => ({ error: '' }));
        this.props.onSubmit{{objectname}}(
            {
              {{#variables}}
                {{variablename}}: this.state.{{variablename}},
              {{/variables}}
            }
        );
    }

    render() {
        const { validated } = this.state
        return (
          <>
    		<Card style={({ backgroundColor: "black" }, { width: "100%" })}>
            <Card.Body>
              <Card.Title>Create New Instance</Card.Title>
              <Card.Text>
                Configure the Code Generation for your API Build
              </Card.Text>
            {this.state.error && <p className='error'>{this.state.error}</p>}            
                <Form
	                noValidate
	                validated={validated}
	                form onSubmit={this.onSubmit}
                >
                {{#variables}}
                
                 <Form.Group
		            as={Col}
		            md="4"
		            controlId="validationCustom02"
	             >
			        <Form.Label>{{variablename}}</Form.Label>
			        <Form.Control
			          required
			          type="text"
			          placeholder="{{variablename}}"
			          defaultvalue="Starter Inc."
			          value={this.state.{{variablename}}}
	                  onChange={this.on{{variablename}}Change}
			        />
			        <Form.Control.Feedback>
			          Nice Work!
			        </Form.Control.Feedback>
			     </Form.Group>
			     
              	{{/variables}}
                <Button>Add {{objectname}}</Button>
              </Form>
            </Card.Body>
            </Card>
            </>
          
        );
    }
              	
}
