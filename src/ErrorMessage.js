import React, { Component } from 'react';

class ErrorMessage extends Component {
	constructor(props){
		super(props);
	}

	render() {
		if (this.props.hasError) {
			return (
				<div className="error-message">
					{this.props.errorMessage}
				</div>
			)
		} else {
			return this.props.hasError;
		}
	}
}
export default ErrorMessage;
