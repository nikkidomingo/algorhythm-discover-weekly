import React, { Component } from 'react';

class ErrorMessage extends Component {
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
