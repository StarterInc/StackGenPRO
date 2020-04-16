/**
 * 
 * {{objectname}} Data Entry FORM
 *  
 * {{GENERATED_MESSAGE}} 
 * 
 * {{LICENSE}} 
 * 
 * {{COMPANY_INFO}} 
 * 
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
		 
        let  {{objectnamevarname}}  = { ...props.{{objectnamevarname}}} ;

        this.state = {
        	{{objectname}}:{{objectnamevarname}},
            message: '',
            errorMessage:'',
            validated: false
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
	console.log('Submitting values: ' + JSON.stringify(values, null, 2));
	this.setState(() => ({ errorMessage: '' }));
	this.props.onSubmit{{objectname}}({
		...values
	});
	
	actions.setSubmitting(false);
	this.props.history.push('/Datamanagement');
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
                
                <Button 
				 onClick={() => {this.props.history.goBack()}}
				 style={ {position:'fixed', marginTop:-50, left:20} }
				>
                   <span>Done</span>
               </Button>
               
               <Button 
				 style={ {position:'fixed', left:20} }
				 type="submit" disabled={isSubmitting || !isValid} >
				 	<span>{( typeof({{objectnamevarname}}) !== 'undefined' ? 'Save Changes to' : 'Add New ' )} {{objectname}}</span>
               </Button>
                
                {{#variables}}
                
                 <Form.Group controlId="{{variablename}}">
	                  <Form.Label>{{displayName}}</Form.Label>
	                  <Field
	                  	id="{{variablename}}"
	                  	name="{{variablename}}"
	                    {{{required}}}
	                  	{{{variableFieldType}}}
	                   // placeholder="{{defaultValue}}"
                    	 className={`form-control ${
                    			touched.{{variablename}} && errors.{{variablename}} ? "is-invalid" : ""
                         	}`}
	                    
                    	 {{{fieldEndTag}}}
                    	 
                    	 {{{enumOptions}}}
                    	 
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
