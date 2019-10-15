/**
 * 
 * {{objectname}} Data Entry FORM
 *  
 * {{GENERATED_MESSAGE}}
 * 
 * {{LICENSE}}
 * {{COMPANY_INFO}}
 * {{CONTACT_INFO}}
 * 
 * var {{objectname}}:{ {{#variables}} {{variablename}}: '{{variableval}}',
 * {{/variables}} }
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Button } from 'react-bootstrap';

import { reset{{objectname}} } from '../../actions/{{objectname}}s'
import {{objectname}} from './{{objectname}}';
import AlertDismissable from '../AlertDismissable';

class {{objectname}}Form extends React.Component {

	constructor(props) {
        super(props);

        {{#variables}}
        this.on{{variablename}}Change = this.on{{variablename}}Change.bind(this);
        {{/variables}}
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
        	props.{{objectnamevarname}},        
            error: '',
            validated: true
        };
    }
  
  {{#variables}}
  /**
	 * {{objectname}} 
	 * Data Action Event Listener
	 * 
	 */
    on{{variablename}}Change(e) {
        const {{variablename}}val = e.target.value;
        this.setState(() => ({ {{variablename}}: {{variablename}}val }));
    }
  {{/variables}}

  componentDidUpdate(previousProps, previousState){
    if(previousProps.submitting 
      && !this.props.errorMessage){
        this.props.dispatch(reset{{objectname}}())
    }
  }

    onSubmit(e) {
        e.preventDefault();
      if(this.state.validated) {

        this.setState(() => ({ error: '' }));
        this.props.onSubmit{{objectname}}({
              {{#variables}}
                {{variablename}}: this.state.{{variablename}},
              {{/variables}}
          });
      }else{
            this.setState(() => ({errorMessage: "Please fix Validation Errors" }))
        }
    }

    render() {
        const { validated, message, errorMessage }  = this.state;
        const { {{objectnamevarname}} } = this.props
        const { dispatch } = this.props;

        return (
          <>
          	<Card>
            <Card.Body>

              {message && <AlertDismissable className="alert-success" title="Success" >{message}</AlertDismissable>}
              {errorMessage && <AlertDismissable show={(errorMessage !== '')} className="alert-danger" title="Error"> <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => dispatch(reset{{objectname}}())}>
              
              {message && (
                      <AlertDismissable className="alert-success" title="Success">
                        {message}
                      </AlertDismissable>
                    )}
                    {errorMessage && (
                      <AlertDismissable
                        show={errorMessage !== ""}
                        className="alert-danger"
                        title="Error"
                      >
                        {" "}
                        <button
                          type="button"
                          className="close"
                          data-dismiss="alert"
                          aria-label="Close"
                          onClick={() => dispatch(reset{{objectname}}())}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                        {errorMessage}
                      </AlertDismissable>
                    )}
              
              <span aria-hidden="true">&times;</span></button>{errorMessage}</AlertDismissable>}

                <Form
	                validate
	                validated={validated}
	                form onSubmit={this.onSubmit}
                >
                {{#variables}}
                 <Form.Group
                  controlId="validationCustom02"
	              >
                  <Form.Label>{{variablename}}</Form.Label>
                  <Form.Control
                    { {required} && ''}
                    type="text"
                    placeholder="{{defaultValue}}"
                    defaultvalue="{{defaultValue}}"
                    value={( typeof({{objectnamevarname}}) !== 'undefined' ? {{objectnamevarname}}.{{variablename}} : null ) }
                    onChange={this.on{{variablename}}Change}
                  />
                  <Form.Control.Feedback>
                    NICE WORK!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid {{variablename}} i.e.: {{defaultValue}}
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="required">
                  	A valid {{variablename}} is required
                  </Form.Control.Feedback>
			          </Form.Group>
			     
              	{{/variables}}

                <Button type="submit"
                    disabled={(validated &&
                        errorMessage === '')
                            }>
                    <span>{( typeof({{objectnamevarname}}) !== 'undefined' ? 'Edit' : 'Add' )} {{objectname}}</span>
                </Button>

              </Form>
            </Card.Body>
            </Card>
            </>
          
        );
    }
}


{{objectname}}.propTypes = {
	{{#variables}}
		{{variablename}} : PropTypes.{{variableType}},
	{{/variables}}		
};

export default connect()({{objectname}}Form);
