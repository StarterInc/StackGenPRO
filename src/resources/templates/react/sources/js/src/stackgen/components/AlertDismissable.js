import React from 'react';
import {Alert, Button} from 'react-bootstrap'

export default class AlertDismissible extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { show: true };
    }

    render() {
        const {title, children } = this.props
        const { show } = this.state
        const hide = () => this.setState({ show: false });
        return (
            <>
                {show &&    <div className="alert alert-dismissible" >
                    {show && <button type="button" 
                    className="close" 
                    data-dismiss="alert" 
                    aria-label="Close" 
                    onClick={hide}>
                    <span aria-hidden="true">&times;</span></button>}
                    <b>{title}</b>
                    <br/>
                    {children}
                </div>}
            </>
        );
    }
}