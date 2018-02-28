import React, { Component } from 'react';

class Welcome extends Component {
  constructor(props){
    super(props);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.generateRandomString = this.generateRandomString.bind(this);
  }

  generateRandomString(length){
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      
      return text;
  }

  handleSignIn(e) {
    var client_id = '9aee9401ca4c44d3aa2144b87ac4cbd2';
    // var redirect_uri = 'http://localhost:3000/home';
    var redirect_uri = 'https://nikkidomingo.github.io/algorhythm-discover-weekly/home';
    var state = this.generateRandomString(16);
    var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + client_id;
    url += '&scope=' + scope;
    url += '&redirect_uri=' + redirect_uri;
    url += '&state' + state;
    window.location = url;
  }


  render() {
    return (
      <div className="welcome">
        <div className="container">
          <h1>AlgoRhythm <br/> Discover <br/> Weekly </h1>
          <div className="login-container">
            <button id="btn-login" onClick={this.handleSignIn} className="btn btn-pink">Sign in with Spotify</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
