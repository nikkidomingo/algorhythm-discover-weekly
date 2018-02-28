import React, { Component } from 'react';
import Track from './Track';

class TrackList extends Component {
	render() {
		return(
			<div>
			{this.props.tracks.map((track, index) => (
				<Track 
					key={index}
					index={index}
					name={track.name} 
					artist={track.artist} 
					album={track.album} 
					removeTrack={this.props.removeTrack}/>
			))}
			</div>
		);
	}
}

export default TrackList;

