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
 * var {{objectname}}:
 * {{#variables}}
 *  {{variablename}}: '{{variableval}}',
 * {{/variables}}
 *
 * }
 */
import React from 'react';
import PropTypes from 'prop-types';

import { Card, Accordion, Navbar, Row, Col, Form, Button, ButtonGroup } from "react-bootstrap";

import ErrorModal from '../ErrorModal'

import { Formik, Field } from 'formik';
import * as yup from 'yup';
import { FiPlusCircle, FiChevronLeft, FiSave, FiDelete, FiCode, FiCalendar, FiChevronsLeft, FiNavigation , FiEdit, FiTrash , FiPlus} from 'react-icons/fi'

import {{objectname}} from './{{objectname}}';

import AlertDismissable from '../AlertDismissable';

import { reset{{objectname}}, {{objectnamevarname}}Data } from "../../actions/{{objectname}}s";

/**
 *  this StackGen-generated form is
 *  shared between ADD and EDIT views
 *
 */
class {{objectname}}Form extends React.Component {

	constructor(props) {
        super(props);

        // we call the props onSubmit later
        this.onSubmit = this.onSubmit.bind(this);

        var {{objectnamevarname}} = { ...props.{{objectnamevarname}} };
        if(!{{objectnamevarname}}.id){
           {{objectnamevarname}} = { ...{{objectnamevarname}}Data };
        }
        // configure list of 'advanced' fields:
        let advancedList = [
          {{#advanced}}
          "{{variablename}}",
          {{/advanced}}
        ];

        if(advancedList.length > 0){
            this.hasAdvancedList = true;
        }
        // configure list of skipped fields:
        let readOnlyList = [
          "id",
          "createdDate",
          "modifiedDate"
        ];

        this.state = {
          {{objectnamevarname}}:{{objectnamevarname}},
            message: "",
            errorMessage:"",
            validated: false,
            readOnlyList: readOnlyList,
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
    actions.setSubmitting(true);
    console.log('Submitting values: ' + JSON.stringify(values, null, 2));
    this.props.onSubmit{{objectname}}({
      ...values
	  });

    actions.setSubmitting(false);
    if(this.props.history){
      this.props.history.goBack();
    }
    this.setState(() => ({ errorMessage: '' }));

  }

    render() {
      const { dispatch, message, serverErrorMessage, errorMessage, {{objectnamevarname}} } = this.props;
      const { advancedList, readOnlyList } = this.state;

      return (
        <>
          <Card style={ { paddingBottom: '150px' } }>
            <Card.Body>
              {message && (
                <AlertDismissable className="alert-success" title="Success">
                  {message}
                </AlertDismissable>
              )}

                {serverErrorMessage && (
                    <ErrorModal
                        show={true}
                        errorMessage={serverErrorMessage}
                        callback={() => this.hideErrorModal()}
                    />
                )}

                {errorMessage && (
                    <ErrorModal
                        show={true}
                        errorMessage={errorMessage}
                        callback={() => this.hideErrorModal()}
                    />
                )}

                {this.hasAdvancedList && (
                    <Button
                        variant="info"
                        size="lg"
                        className="form-control"
                        // style={ {position:'fixed', marginBottom:50, left:20} }
                        onClick={() => this.toggleAdvanced()}
                    >
                <span>
                  <FiNavigation />
                    {advancedList.length > 0 ? ' Show Advanced ' : ' Hide Advanced '}
                    Options
                </span>
                    </Button>
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

                    <span aria-hidden="true">&times;</span>
                  </button>
                  {errorMessage}
                </AlertDismissable>
              )}

        <Formik
              validationSchema={schema}
              onSubmit={this.onSubmit}
              initialValues={ {{objectnamevarname}} }
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

                {{#variables}}
                            {{{formRowStart}}}
                            {{=<% %>=}}
                    {readOnlyList.indexOf("<%variablename%>") < 0 && advancedList.indexOf("<%variablename%>") === -1 && (
                      <Form.Group controlId="<%variablename%>" as={Col}  xs="auto" >
                        <Form.Label><%displayName%></Form.Label>
                        <Field
                          id="<%variablename%>"
                          name="<%variablename%>"
                          <%required%>
                          <%&variableFieldType%>

                          placeholder="<%defaultValue%>"

                          className={`form-control <%extraClassName%> ${
                            touched.<%variablename%> && errors.<%variablename%> ? "is-invalid" : ""
                          }`}

                          <%&fieldEndTag%>

                          <%&enumOptions%>

                        <Form.Control.Feedback type="valid">
                          That <%variablename%> looks good!
                        </Form.Control.Feedback>

                        <Form.Control.Feedback className="invalidEntry" type="invalid">
                          {errors.<%variablename%>}
                        </Form.Control.Feedback>

                        <Form.Control.Feedback className="invalidEntry" type="invalid">
                          Please enter a valid <%objectnamevarname%> <%displayName%> i.e.: "<%defaultValue%>"
                          <%validationFailedMessage%>
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}
                            <%={{  }}=%>
                   {{{formRowEnd}}}
              	{{/variables}}

                  <Navbar
                    fixed="bottom"
                    variant="dark"
                    bg="dark"
                    style={ { padding:'30px' } }
                  >

              	    <Navbar.Collapse  className="justify-content-end">
                      {this.props.history && (

                        <Button
                          size="lg"
                          onClick={() => {
                            this.props.history.goBack()
                          }}
                          className="form-control"
                        >
                          <span><FiChevronLeft size={30}/> Done</span>
                        </Button>

                      )}

                       {this.props.onHide && (

                        <Button
                          size="lg"
                          onClick={this.props.onHide}
                          className="form-control"
                        >
                          <span><FiChevronLeft size={30}/> Done</span>
                        </Button>

                      )}

                      <Button
                        size="lg"
                        type="submit"
                        variant="success"
                        className="form-control"
                        disabled={isSubmitting || !isValid}
                      >
                        <span>
                          { {{objectnamevarname}}.id !== '' && (
                            <><FiEdit size={30}/> Save </>)}
                          { {{objectnamevarname}}.id === '' && (
                            <><FiPlusCircle size={30}/> Add </>)}
                        </span>
                      </Button>


                      { {{objectnamevarname}}.id === '' && (
                      <Form.Group>
                      <Form.Label>Add Another</Form.Label>
                      <Field
                        type="checkbox"
                        className="form-control"
                      />
                      </Form.Group>
                      )}
                    </Navbar.Collapse>
                  </Navbar>
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