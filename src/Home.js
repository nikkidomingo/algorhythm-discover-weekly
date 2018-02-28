import React, { Component } from 'react';
import Track from './Track'
import TrackList from './TrackList'

class Home extends Component {
	constructor(props){
		super(props);
		this.getHashParams = this.getHashParams.bind(this);

		this.state = {
			user: null,
			tracks:[]
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

		var access_token = params.access_token,
			state = params.state;

		if (!access_token) {
			alert('There was an error during the authentication');
			// window.location = "localhost:3000";
			// window.location = "https://nikkidomingo.github.io/algorhythm-discover-weekly/";
		} else {
			fetch("https://api.spotify.com/v1/me")
				.then(res => res.json())
				.then(
					(result) => {
						this.setState = {user: result.user};
					},
					(error) => {
						console.log(error);
        	}
        )
		}
	}

	render() {
		return(
			<div className="home">
				<div className="container">
					<h1>AlgoRhythm <br/> Discover <br/> Weekly </h1>
					<div className="input">
						<div className="error-message hidden">
						</div>
						<p>Enter the name and artist of the song you want to add to the playlist. </p>
						<form>
							<center>
								<input id="field-input" className="input-field" type="text" required autocomplete="off" placeholder="E.g. Happier Ed Sheeran" />
								<input type="submit" value="&#10010;" id="btn-add" className="btn-add" />
							</center>
						</form>
					</div>
					<div className="tracklist">
						<TrackList tracks={this.state.tracks} />
					</div>
					<div className="btn-playlist-add">
						<button className="btn">Add to Playlist</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;

