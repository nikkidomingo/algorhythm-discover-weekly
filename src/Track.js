import React, { Component } from 'react';

class Track extends Component {
	constructor(props){
		super(props);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClose() {
		var index = (this.props.index);
    	this.props.removeTrack(index);
	}

	render() {
		return(
			<div className="track-container">
				<div className="track">
					<h2> {this.props.name} </h2>
					<h3> {this.props.artist} <b>&middot;</b> {this.props.album} </h3>
					<h4 onClick={this.handleClose}> &#215; </h4>
				</div>
			</div>
		);
	}
}

export default Track;

