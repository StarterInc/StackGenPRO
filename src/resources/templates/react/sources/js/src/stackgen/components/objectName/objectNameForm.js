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
 * var {{objectname}}:{{#variables}}
 *  {{variablename}}: '{{variableval}}',
 * {{/variables}} 
 * 
 * }
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Card, Col, Form, Button, ButtonGroup } from "react-bootstrap";

import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import {{objectname}} from './{{objectname}}';

import AlertDismissable from '../AlertDismissable';

import { reset{{objectname}}, {{objectnamevarname}}Data } from "../../actions/{{objectname}}s";

/**
 *  this form is shared between ADD and EDIT views
 */
class {{objectname}}Form extends React.Component {

	constructor(props) {
        super(props);


        // we call the props onSubmit later
        this.onSubmit = this.onSubmit.bind(this);
      
     
        var {{objectnamevarname}} = { ...props.{{objectnamevarname}} };
        if(!{{objectnamevarname}}){
           let {{objectnamevarname}} = { ...{{objectnamevarname}}Data };
        }
        // configure list of 'advanced' fields:
        let advancedList = [
          {{#variables}}
          "{{variablename}}",
          {{/variables}}
        ];
    
        // configure list of skipped fields:
        let skipList = [
          "id",
          "createdDate",
          "modifiedDate"
        ];

        
        this.state = {
        	  {{objectname}}:{{objectnamevarname}},
            message: "",
            errorMessage:"",
            validated: false,
            advancedList: advancedList
        };
        
    }
  
  componentDidUpdate(previousProps, previousState){
    if(previousProps.submitting 
      && !this.props.errorMessage){
        this.props.dispatch(reset{{objectname}}())
    }
  }


  toggleAdvanced() {
    if (this.state.advancedList.length > 0) {
      this.hiddenFieldList = this.state.advancedList;
      this.setState({
        advancedList: [],
      });
    } else {
      this.setState({
        advancedList: this.hiddenFieldList,
      });
    }
  }

  onSubmit(values, actions){
    // actions.preventDefault();
    actions.setSubmitting(true);
    console.log('Submitting values: ' + JSON.stringify(values, null, 2));
    this.props.onSubmit{{objectname}}({
      ...values
	  });
	
    actions.setSubmitting(false);
    this.props.history.goBack();
    this.setState(() => ({ errorMessage: '' }));
  
//	  this.props.history.push('/Datamanagement');
  }

    render() {
      const { dispatch, message, errorMessage, {{objectnamevarname}} } = this.props;
      const { advancedList } = this.state;
  
      return (
        <>
          <Card>
            <Card.Body>
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
                    onClick={() => dispatch(resetStack())}
                  >
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
                          onClick={() => dispatch(resetStack())}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                        {errorMessage}
                      </AlertDismissable>
                    )}
  
                    <span aria-hidden="true">&times;</span>
                  </button>
                  {errorMessage}
                </AlertDismissable>
              )}
        {{=<% %>=}}
        <Formik
              validationSchema={schema}
              onSubmit={this.onSubmit}
              initialValues={<%objectnamevarname%> }
            >
              {({
                handleSubmit,
                isSubmitting,
                // handleChange,
                // handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <ButtonGroup>
                    <Button
                      size="sm"
                      onClick={() => {
                        this.props.history.goBack();
                      } }
                      // style={ {position:'fixed', marginTop:-50, left:20} }
                    >
                      <span>Done</span>
                    </Button>

                    <Button
                      size="sm"
                      // style={ {position:'fixed', left:20} }
                      type="submit"
                      disabled={isSubmitting || !isValid}
                    >
                      <span>
                        {typeof stack !== "undefined"
                          ? "Save Changes to <%objectname%>"
                          : "Add New <%objectname%>"}
                        <%objectname%>
                      </span>
                    </Button>

                    <Button
                      size="sm"
                      // style={ {position:'fixed', marginBottom:50, left:20} }
                      onClick={() => this.toggleAdvanced()}
                    >
                      <span>
                        {advancedList.length > 0
                          ? "Show Advanced"
                          : "Hide Advanced "}
                        Options
                      </span>
                    </Button>
                  </ButtonGroup>

                <%#variables%>

                <Form.Row>
                    {advancedList.indexOf("<%variablename%>") === -1 && (
                      <Form.Group controlId="<%variablename%>" md="6" as={Col}>
                        <Form.Label><%displayName%></Form.Label>
                        <Field
                          id="<%variablename%>"
                          name="<%variablename%>"
                          <%required%>
                          <%&variableFieldType%>
                          
                          placeholder="<%defaultValue%>"
                          
                          className={`form-control ${
                            touched.<%variablename%> && errors.<%variablename%> ? "is-invalid" : ""
                          }`}
                      
                          <%&fieldEndTag%>
                    	 
                          <%&enumOptions%>
                          
                        <Form.Control.Feedback type="valid">
                          That <%variablename%> entry looks good!
                        </Form.Control.Feedback>

                        <Form.Control.Feedback className="invalidEntry" type="invalid">
                          {errors.<%variablename%>}
                        </Form.Control.Feedback>

                        <Form.Control.Feedback className="invalidEntry" type="invalid">
                          Please enter a valid <%objectnamevarname%> <%variablename%> i.e.: <%defaultValue%>
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                  </Form.Row>
              	<%/variables%>
               </Form>
              )}
              </Formik>
              <%={{  }}=%>                  
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