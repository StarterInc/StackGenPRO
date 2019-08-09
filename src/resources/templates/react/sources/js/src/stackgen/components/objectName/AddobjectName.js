/*
 * Add Form wrapper
 *
 * {{GENERATED_MESSAGE}}
 * {{LICENSE}}
 * {{COMPANY_INFO}}
 * {{CONTACT_INFO}}
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';

import {{objectname}}Form from './{{objectname}}Form';
import { add{{objectname}} } from '../../actions/{{objectname}}s';

const Add{{objectname}} = (props) => (
    <Card>
        <h3>Enter New {{objectname}}</h3>
        <{{objectname}}Form
            onSubmit{{objectname}}={({{objectnamevarname}}) => {
                props.dispatch(add{{objectname}}({{objectnamevarname}}));
                props.history.push('/');
            }}
        />
    </Card>
);

function mapStateToProps(state) {
    return { {{objectname}}: state.{{objectname}} }
}
export default connect(mapStateToProps)(Add{{objectname}});
