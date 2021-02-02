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
        <h3>Edit the {{objectname}}</h3>
        <{{objectname}}Form
            history={props.history}
            {{objectnamevarname}}={props.{{objectnamevarname}}}
            onSubmit{{objectname}}={({{objectnamevarname}}) => {
                props.dispatch(edit{{objectname}}(props.{{objectnamevarname}}.id,
            		{{objectnamevarname}}));
        }}
    />
    
    </EditorCardLayout>
    
);

/*
* locate this {{objectname}} instance in the state array of {{objectname}}s,
* then return the form props with the data from the {{objectname}} instance.
*/
const mapStateToProps = (state, props) => {

    // in case the {{objectnamevarname}} is passed in as a prop
    if(props.{{objectnamevarname}}){
        return{
        {{objectnamevarname}}:props.{{objectnamevarname}}
        }
    }

	const { {{objectname}}s } = props;    
	const { {{objectname}} } = {{objectname}}s;    

	if({{objectname}}){
        return{
            {{objectnamevarname}}:{{objectname}}
        }
    }

    // else find it in the list
    var _id = parseInt(props.match.params.id);

	if(_id != null){
        var ret = {{objectname}}s.find(
            {{objectname}} => {{objectname}}.id === _id);
        
        return { 
            {{objectnamevarname}}:ret
        };
    }
	return props;
}; 



export default connect(mapStateToProps)(Edit{{objectname}});
