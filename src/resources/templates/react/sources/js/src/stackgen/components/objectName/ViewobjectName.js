/*
 * View Form Wrapper
 *
 * {{GENERATED_MESSAGE}}
 * {{LICENSE}}
 * {{COMPANY_INFO}}
 * {{CONTACT_INFO}}
 *
 */
import React from 'react';
import {{objectname}}Form from './{{objectname}}Form';
import { connect } from 'react-redux';
import { Col, Row, Card } from 'react-bootstrap';

import {{objectname}} from './{{objectname}}';
import { get{{objectname}} } from '../../actions/{{objectname}}s';

const View{{objectname}} = (props) => (
    <Card>
        <Card.Header>View the {{objectname}}</Card.Header>
        <Card.Body>
        <{{objectname}}Form
            {{objectnamevarname}}={props.{{objectnamevarname}}}
            onSubmit{{objectname}}={({{objectnamevarname}}) => {
                props.dispatch(get{{objectname}}(props.{{objectnamevarname}}.id,
                		{{objectnamevarname}}));
                props.history.push('/');
            }}
        />
        </Card.Body>
    </Card>
);

/*
* locate this {{objectname}} instance in the state array of {{objectname}}s,
* then return the form props with the data from the {{objectname}} instance.
*/
const mapStateToProps = (state, props) => {
    const { {{objectname}}s } = state;
    const _id = parseInt(props.match.params.id);
    return { 
        {{objectnamevarname}}:{{objectname}}s.find( {{objectnamevarname}} => {{objectnamevarname}}.id === _id)
    };
}; 

export default connect(mapStateToProps)(View{{objectname}});
