import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';

export default class {{objectname}}Form extends React.Component {
    constructor(props) {
        super(props);

/**
 * GENERATED FILE: DO NOT EDIT!
 *
 * Auto-Generated {{objectname}} Data Entry FORM
 *

var {{objectname}}:{
	{{#variables}}
		{{variablename}}: '{{variableval}}',
	{{/variables}}
}*/

{{#variables}}
        this.on{{variablename}}Change = this.on{{variablename}}Change.bind(this);
{{/variables}}
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
          {{#variables}}
            {{variablename}}: props.{{objectname}} ? props.{{objectname}}.{{variablename}} : '{{variableval}}',
          {{/variables}}
            error: ''
        };
    }
    {{#variables}}
    /**
     * Auto-Generated {{objectname}} Data Action Event Listener
     *
     */
    on{{variablename}}Change(e) {
        const {{variablename}}val = e.target.value;
        this.setState(() => ({ {{variablename}}: {{variablename}}val }));
    }
    {{/variables}}
    onSubmit(e) {
        e.preventDefault();

      //  if (!this.state.title || !this.state.author || !this.state.published) {
      //      this.setState(() => ({ error: 'Please set title & author & published!' }));
      //  } else {
            this.setState(() => ({ error: '' }));
            this.props.onSubmit{{objectname}}(
                {
                  {{#variables}}
                    {{variablename}}: this.state.{{variablename}},
                  {{/variables}}
                }
            );
        //}
    }

    render() {
        return (
            <div className="add-object-div">
                {this.state.error && <p className='error'>{this.state.error}</p>}
                <form onSubmit={this.onSubmit} className='add-object-form'>
                {{#variables}}
                  <input type="text" placeholder="{{variablename}}" autoFocus
                		value={this.state.{{variablename}}}
                    onChange={this.on{{variablename}}Change} />
                  <br />
              	{{/variables}}
                    <button>Add {{objectname}}</button>
                </form>
            </div>
        );
    }
}
