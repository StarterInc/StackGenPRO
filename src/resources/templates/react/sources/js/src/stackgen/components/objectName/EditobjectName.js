/*
 * Edit Form wrapper
 * 
 * GENERATED FILE: DO NOT EDIT!
 *
 */
import React from 'react';
import {{objectname}}Form from './{{objectname}}Form';
import { connect } from 'react-redux';
import { Col, Row, Card } from 'react-bootstrap';
import { edit{{objectname}} } from '../../actions/{{objectname}}s';

/**
 * Data object edit form
 */
const Edit{{objectname}} = (props) => (
    <Card>
        <{{objectname}}Form
            {{objectnamevarname}}={props.{{objectnamevarname}}}
            onSubmit{{objectname}}={({{objectnamevarname}}) => {
                props.dispatch(edit{{objectname}}(props.{{objectnamevarname}}.id,
                		{{objectnamevarname}}));
                props.history.push('/');
            }}
        />
    </Card>
);

const mapStateToProps = (state, props) => {
    return {
        {{objectnamevarname}}: 
        	state.find(({{objectnamevarname}}) =>
            {{objectnamevarname}}.id === props.match.params.id)
    };
};

export default connect(mapStateToProps)(Edit{{objectname}});