/*
 * Edit Form Wrapper
 *
 * {{GENERATED_MESSAGE}} 
 * 
 * {{LICENSE}} 
 * 
 * {{COMPANY_INFO}} 
 * 
 * {{CONTACT_INFO}}
 *
 */
import React from 'react';
import {{objectname}}Form from './{{objectname}}Form';
import { connect } from 'react-redux';
import EditorCardLayout from "../EditorCardLayout"
import { Card } from 'react-bootstrap';
import { edit{{objectname}} } from '../../actions/{{objectname}}s';

const Edit{{objectname}} = (props) => (
		
	<EditorCardLayout>	
    <Card>
        <Card.Header>Edit the {{objectname}}</Card.Header>
        <Card.Body>
        <{{objectname}}Form
        {{objectnamevarname}}={props.{{objectnamevarname}}}
        onSubmit{{objectname}}={({{objectnamevarname}}) => {
            props.dispatch(edit{{objectname}}(props.{{objectnamevarname}}.id,
            		{{objectnamevarname}}));
            props.history.push('/');
        }}
        />
        </Card.Body>
    </Card>
    </EditorCardLayout>
    
);

/*
* locate this {{objectname}} instance in the state array of {{objectname}}s,
* then return the form props with the data from the {{objectname}} instance.
*/
const mapStateToProps = (state, props) => {
    const { {{objectname}}s } = state;
    const _id = parseInt(props.match.params.id);
    
    const { {{objectname}} } = {{objectname}}s ;
    if({{objectname}} != undefined && {{objectname}}.id == _id){
        return {
        	{{objectnamevarname}}:{{objectname}}
        }
    }
    
    return { 
        {{objectnamevarname}}:{{objectname}}s.find( {{objectnamevarname}} => {{objectnamevarname}}.id === _id)
    };
}; 

export default connect(mapStateToProps)(Edit{{objectname}});
