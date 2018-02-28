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
				<Track 
					key={track.index}
					index={track.index}
					uri={track.uri}
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

