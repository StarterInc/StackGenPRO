/*
 * Add Form wrapper
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
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';

import {{objectname}}Form from './{{objectname}}Form';
import { add{{objectname}} , {{objectnamevarname}}Data } from '../../actions/{{objectname}}s';
import EditorCardLayout from "../EditorCardLayout";
const Add{{objectname}} = (props) => (
    <EditorCardLayout>
        <h3>Create New {{objectname}}</h3>
        <{{objectname}}Form
            {{objectnamevarname}}={ {{objectnamevarname}}Data }
            onHide={props.onHide}
        	history={props.history}
            onSubmit{{objectname}}={({{objectnamevarname}}) => {
                props.dispatch(add{{objectname}}({{objectnamevarname}}));
            }}
        />
    </EditorCardLayout>
);

function mapStateToProps(state) {
    return { {{objectname}}: state.{{objectname}} }
}
export default connect(mapStateToProps)(Add{{objectname}});
