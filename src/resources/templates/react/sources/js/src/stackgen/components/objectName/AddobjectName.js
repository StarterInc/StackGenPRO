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

const Add{{objectname}} = (props) => (
    <>
        <h3>Enter New {{objectname}}</h3>
        <{{objectname}}Form
            {{objectnamevarname}}={ {{objectnamevarname}}Data }
        	history={props.history}
            onSubmit{{objectname}}={({{objectnamevarname}}) => {
                props.dispatch(add{{objectname}}({{objectnamevarname}}));
            }}
        />
    </>    
);

function mapStateToProps(state) {
    return { {{objectname}}: state.{{objectname}} }
}
export default connect(mapStateToProps)(Add{{objectname}});
