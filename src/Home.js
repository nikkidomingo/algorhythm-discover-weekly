import React, { Component } from 'react';
// import Track from './Track'
import TrackList from './TrackList'
import ErrorMessage from './ErrorMessage'

class Home extends Component {
	constructor(props){
		super(props);
		this.getHashParams = this.getHashParams.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleAddTrack = this.handleAddTrack.bind(this);
		this.handleAddToPlaylist = this.handleAddToPlaylist.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.state = {
			input_value: '',
			user: '',
			tracks: [],
			track_uris: [],
			hasError: false,
			errorMessage: '',
		}
	}

	getHashParams() {
		var hashParams = {};
		var e, r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
			while ( e = r.exec(q)) {
				hashParams[e[1]] = decodeURIComponent(e[2]);
			}
		return hashParams;
	}

	componentWillMount(){
		// Load data on page load
		var params = this.getHashParams();

		var access_token = params.access_token;

		if (!access_token) {
			alert('There was an error during the authentication');
			 window.location = 'https://nikkidomingo.github.io/algorhythm-discover-weekly/';
		}
	}

	handleChange(e){
		var input = e.target.value;
		this.setState({input_value: input});
	}

	removeTrack (trackIndex) {
	    this.state.tracks.splice(trackIndex, 1);
	    this.state.track_uris.splice(trackIndex, 1);

	    this.setState({
	    	tracks: this.state.tracks,
	    	track_uris: this.state.track_uris
	    });
	    console.log(this.state.tracks);
	    console.log(this.state.track_uris)
	  }

	handleAddTrack(e){
		e.preventDefault();

		var params = this.getHashParams();

		var access_token = params.access_token;

		let input = this.state.input_value;
		let get_track_url = 'https://api.spotify.com/v1/search?q='+ input +'&type=track';

		fetch(get_track_url, {
			headers: {
				'Authorization': 'Bearer ' + access_token
			}
		})
		.then(res => res.json())
		.then(
			(result) => {
				if(result.tracks.items.length === 0){
					this.setState({
						hasError: true,
						errorMessage: "Oh no! There are no results from the song you entered."
					})
				} else {
					var track_uri = result.tracks.items[0].uri;
					var track_name = result.tracks.items[0].name;
					var track_album = result.tracks.items[0].album.name;
					var track_artist = result.tracks.items[0].artists[0].name;

					this.setState({
						tracks: [...this.state.tracks, {
							name: track_name,
							artist: track_artist,
							album: track_album,
						}],
						track_uris: [...this.state.track_uris, track_uri],
						input_value: '',
						hasError: false,
						errorMessage: '',
					});

					console.log(this.state);
				}
			},
			(error) => {
				console.log('error adding track');
			}
		)
	}

	handleAddToPlaylist(e){
		let track_uris = this.state.track_uris;
		let playlist_url = 'https://api.spotify.com/v1/users/nikkiii.domingo/playlists/2q3pa3tz0Mz7XcjyYReOqx/tracks'
		var params = this.getHashParams();
		var access_token = params.access_token;

		fetch(playlist_url, {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + access_token
			},
			body: JSON.stringify({
				uris: track_uris
			})
		})
		.then(res => res.json())
		.then(
			(result) => {
				console.log('yay success');
				window.location = 'https://nikkidomingo.github.io/algorhythm-discover-weekly/success#access_token=' + access_token;
			},
			(error) => {
				console.log('error adding track');
			}
		)
	}

	render() {
		return(
			<div className="home">
				<div className="container">
					<h1>AlgoRhythm <br/> Discover <br/> Weekly </h1>
					<div className="input">
						<ErrorMessage hasError={this.state.hasError} errorMessage={this.state.errorMessage}/>
						<p>Enter the name and artist of the song you want to add to the playlist. </p>
						<center>
							<form onSubmit={this.handleAddTrack}>
								<input id="field-input" 		
										className="input-field"
										onChange = {this.handleChange}
										value = {this.state.input_value}
										ref="input_value" 
										type="text" 
										required 
										autoComplete="off" 
										placeholder="E.g. Happier Ed Sheeran" />
								<input id="btn-add"
										className="btn-add" 
										type="submit" 
										value="&#10010;" />
							</form>
						</center>
					</div>
					<div className="tracklist">
						<TrackList tracks={this.state.tracks}
							removeTrack={this.removeTrack} />
					</div>
					<div className="btn-playlist-add">
						<button className="btn" 
							disabled={this.state.tracks.length < 1} 
							onClick={this.handleAddToPlaylist}> 
								Add to Playlist
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;

