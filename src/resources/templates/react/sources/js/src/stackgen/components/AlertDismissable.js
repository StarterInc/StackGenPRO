import React from 'react';

export default class AlertDismissible extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const {title, children, show } = this.props
        return (
            <div>
                {show &&
                    <div className="alert alert-dismissible" >
                    <h3>{title}</h3>
                    <br/>
                        {children}
                    </div>
                }
            </div>
        );
    }
}