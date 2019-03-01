import React from 'react';
import {{objectname}}Form from './{{objectname}}Form';
import { connect } from 'react-redux';
import { add{{objectname}} } from '../../../actions/{{objectname}}s';

const Add{{objectname}} = (props) => (
    <div>
        <h3>Enter New {{objectname}}</h3>
        <{{objectname}}Form
            onSubmit{{objectname}}={({{objectname}}) => {
                props.dispatch(add{{objectname}}({{objectname}}));
                props.history.push('/');
            }}
        />
    </div>
);

export default connect()(Add{{objectname}});
