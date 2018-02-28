import React, { Component } from 'react';

class Success extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getHashParams = this.getHashParams.bind(this);
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

  handleClick(e){
    var params = this.getHashParams();
    var access_token = params.access_token;

    window.location = "https://nikkidomingo.github.io/algorhythm-discover-weekly/home#access_token="+ access_token;
  }


  render() {
    return (
      <div className="success">
        <div className="container">
          <h1> Your songs have been added! </h1>
          <p>Thanks for sharing your songs with the Algo family!</p>
          <iframe src="https://open.spotify.com/embed?uri=spotify:user:nikkiii.domingo:playlist:2q3pa3tz0Mz7XcjyYReOqx&view=coverart" 
            title="AlgoRhythm Discover Weekly"
            width="300" 
            height="380" 
            frameborder="0" 
            allowtransparency="true" 
            allow="encrypted-media">
          </iframe>
          <button className="btn" onClick={this.handleClick}>Add more songs</button>
        </div>
      </div>
    );
  }
}

export default Success;
