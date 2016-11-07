import React, { Component } from 'react';
import Firebase from 'firebase';
import ReactPlayer from 'react-player';

class Player extends Component {

  state = {
    url: null,
    playing: true,
    volume: 0.8,
    played: 0,
    loaded: 0,
    duration: 0,
    start: 0
  }

  constructor() {
    super();

    this.firebaseRef = Firebase.database().ref('playlist/');
  }

  updateDatabase = state => {
    this.firebaseRef.update(state);
  }

  setToSeconds = state => {
    return Math.floor(this.state.duration * state.played);
  }

  componentWillMount() {
    this.firebaseRef.once('value')
      .then((snapshot) => {
        this.state.start = snapshot.val().played;
      })
  }

  onProgress = state => {
    state.played = this.setToSeconds(state);
    this.setState(Object.assign(this.state, state));
    console.log(this.state)
    this.updateDatabase(state);
  }

  render() {
    return (
      <div>
        <div id="player">
          <ReactPlayer
           url={`http://www.youtube.com/watch?v=TTAU7lLDZYU?start=${this.state.start}`}
           playing
           progressFrequency={1}
           onProgress={this.onProgress}
           onDuration={duration => this.setState({ duration })}
           ref={player => { this.player = player }}
           youtubeConfig={{
             playerVars: {
               start: this.state.played,
               allowFullscreen: 1,
               frameBorder: 0,
               controls: 0,
              //  events: {
              //    onStateChange: this.onStateChange(this.event)
              //  }
             }
           }}/>
        </div>
        <div id="current-song">
          <p>Jamming right now:</p>
          <h4> dasSDwqe - PLoeqwlm</h4>
        </div>
      </div>
    );
  }
}

export default Player;
