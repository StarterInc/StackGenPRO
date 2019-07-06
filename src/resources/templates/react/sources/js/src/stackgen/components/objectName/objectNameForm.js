import React from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import AlertDismissable from '../AlertDismissable';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { add{{objectname}}, edit{{objectname}} } from '../../actions/{{objectname}}s'

/**
 * GENERATED FILE: DO NOT EDIT!
 * 
 * Auto-Generated {{objectname}} Data Entry FORM
 * 
 * 
 * var {{objectname}}:{ {{#variables}} {{variablename}}: '{{variableval}}',
 * {{/variables}} }
 */
class {{objectname}}Form extends React.Component {

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
        const { validated, errorMessage } = this.state
        return (
          <>
          {errorMessage && <AlertDismissable  className="alert-danger" title="Error">{errorMessage}</AlertDismissable>}

    		<Card style={({ backgroundColor: "black" }, { width: "100%" })}>
          <Card.Body>
            {this.state.error && <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Error Message: </strong> {this.state.error}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>}            
                <Form
	                validate
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
                    {{required}}
                    type="text"
                    placeholder="{{defaultValue}}"
                    defaultvalue="{{defaultValue}}"
                    value={this.state.{{variablename}}}
                    onChange={this.on{{variablename}}Change}
                  />
                  <Form.Control.Feedback>
                    NICE WORK!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid {{variablename}} i.e.: {{defaultValue}}
                  </Form.Control.Feedback>
			          </Form.Group>
			     
              	{{/variables}}

                <Button type="submit"
                    disabled={(validated &&
                        errorMessage === '')
                            }>
                    <span>Add {{objectname}}</span>
                </Button>

              </Form>
            </Card.Body>
            </Card>
            </>
          
        );
    }
}

/* TODO
{{objectname}}Form.propTypes = {
  {{#variables}}
  {{variablename}}: {{variableproptype}},
  {{/variables}}
};*/
/*
function mapStateToProps(state) {
  return { {{objectname}}: state.{{objectname}} }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ add{{objectname}} }, dispatch)
}
*/
export default connect()({{objectname}}Form);
