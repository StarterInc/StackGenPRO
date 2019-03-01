import React from 'react';
import {{objectname}}Form from './{{objectname}}Form';
import { connect } from 'react-redux';
import { edit{{objectname}} } from '../../actions/{{objectname}}s';

const Edit{{objectname}} = (props) => (
    <div className='container__box'>
        <{{objectname}}Form
            {{objectnamevarname}}={props.{{objectnamevarname}}}
            onSubmit{{objectname}}={({{objectnamevarname}}) => {
                props.dispatch(edit{{objectname}}(props.{{objectnamevarname}}.id, {{objectnamevarname}}));
                props.history.push('/');
            }}
        />
    </div>
);

const mapStateToProps = (state, props) => {
    return {
        {{objectnamevarname}}: state.find(({{objectnamevarname}}) =>
            {{objectnamevarname}}.id === props.match.params.id)
    };
};

export default connect(mapStateToProps)(Edit{{objectname}});
