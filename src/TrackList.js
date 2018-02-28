import React, { Component } from 'react';
import Track from './Track';

class TrackList extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return(
			<div>
			{this.props.tracks.map(track => (
				<Track name={track.name} artist={track.artist} album={track.album} />
			))}
			</div>
		);
	}
}

export default TrackList;

