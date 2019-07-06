/*
 * Add Form wrapper
 * 
 * GENERATED FILE: DO NOT EDIT!
 *
 */
import React from 'react';

import {{objectname}}Form from './{{objectname}}Form';
import { connect } from 'react-redux';
import { add{{objectname}} } from '../../actions/{{objectname}}s';
import { Card } from 'react-bootstrap';

const Add{{objectname}} = (props) => (
    <Card>
        <h3>Enter New {{objectname}}</h3>
        <{{objectname}}Form
            onSubmit{{objectname}}={({{objectname}}) => {
                props.dispatch(add{{objectname}}({{objectname}}));
                props.history.push('/');
            }}
        />
    </Card>
);

function mapStateToProps(state) {
    return { {{objectname}}: state.{{objectname}} }
}
export default connect(mapStateToProps)(Add{{objectname}});
