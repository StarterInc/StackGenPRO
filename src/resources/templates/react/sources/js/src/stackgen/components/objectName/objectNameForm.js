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

import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import {{objectname}} from './{{objectname}}';

import { reset{{objectname}} } from '../../actions/{{objectname}}s'

import AlertDismissable from '../AlertDismissable';

/**
 *  this form is shared between ADD and EDIT views
 */
class {{objectname}}Form extends React.Component {

	constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
		 
        let  stack  = { ...props.stack} ;

        this.state = {
            stack:stack,
            error: '',
            validated: true
        };
        
    }
  
  componentDidUpdate(previousProps, previousState){
    if(previousProps.submitting 
      && !this.props.errorMessage){
        this.props.dispatch(reset{{objectname}}())
    }
  }

  
  onSubmit(values, actions){
	// actions.preventDefault();
	actions.setSubmitting(true);
	alert(JSON.stringify(values, null, 2));
	this.setState(() => ({ error: '' }));
	this.props.onSubmitStack({
		...values
	});
	actions.setSubmitting(false);
	alert('submitted')
	
  }
  
  /*
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
    }*/

    render() {
        
    	const { {{objectnamevarname}}, dispatch , message, errorMessage } = this.props;
        
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

              <Formik
              validationSchema={schema}
              onSubmit={this.onSubmit}              
              initialValues={ {{objectnamevarname}} }
              >
              {({
                handleSubmit,
                isSubmitting,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
              
                <Form
                	id='{{variablename}}-form'
	                form onSubmit={handleSubmit}
                >
                {{#variables}}
                 <Form.Group controlId="{{variablename}}">
	                  <Form.Label>{{variablename}}</Form.Label>
	                  <Field
	                  	id="{{variablename}}"
	                  	name="{{variablename}}"
	                    {{{required}}}
	                  	{{{variableFieldType}}}
	                    placeholder="{{defaultValue}}"
                    	 className={`form-control ${
                            touched.{{variablename}} && errors.{{variablename}} ? "is-invalid" : ""
                          }`}
	                    />
	                 
		                <ErrorMessage
	                      component="div"
	                      name="{{variablename}}"
	                      className="invalid-feedback"
	                    />
                    	<Form.Control.Feedback>
                    		That {{variablename}} entry looks good!
                    	</Form.Control.Feedback>
	                    
                    	<Form.Control.Feedback type="invalid">
	                    	{errors.{{variablename}}}
	                    </Form.Control.Feedback>
	                    
						<Form.Control.Feedback type="invalid">
							Please enter a valid {{objectnamevarname}} {{variablename}} i.e.: {{defaultValue}}
						</Form.Control.Feedback>
  
	              </Form.Group>
			     
              	{{/variables}}


                
                <Button type="submit" disabled={isSubmitting || !isValid} >
                    <span>{( typeof({{objectnamevarname}}) !== 'undefined' ? 'Edit' : 'Add' )} {{objectname}}</span>
                </Button>

               </Form>
              )}
              </Formik>
            </Card.Body>
            </Card>
            </>
        );
    }
}              

const schema = yup.object({
	{{#variables}}
		{{variableFieldYupSchemaType}}
	{{/variables}}
});


{{objectname}}.propTypes = {
	{{#variables}}
		{{variablename}} : PropTypes.{{variableType}},
	{{/variables}}		
};

export default ({{objectname}}Form);
