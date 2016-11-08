import React, { Component } from 'react';
import Firebase from 'firebase';
import _ from 'lodash';
import ReactPlayer from 'react-player';
import SongRequest from './SongRequest';

class Player extends Component {

  state = {
    current_song: null,
    title: null,
    playing: true,
    volume: 0.8,
    played: 0,
    loaded: 0,
    duration: 0,
    start: 0,
    songs_urls: [],
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

  defineSongsUrls() {
    let songs = [];
    for(let song in this.state.songs) {
      songs.push(this.state.songs[song].url);
    }

    return songs;
  }

  componentWillMount() {
    this.state.finished = false;

    this.firebaseRef.on('value', (snapshot) => {
      this.setState({songs: snapshot.val().songs });
      this.setState({current_song: snapshot.val().current_song});
      this.setState({songs_urls: this.defineSongsUrls()});
    })

    this.firebaseRef.once('value')
      .then((snapshot) => {
        this.setState({start: snapshot.val().played});
      })
  }

  onProgress = state => {
    state.played = this.setToSeconds(state);
    this.updateDatabase(state);
  }

  nextSong() {
    let currentItemIndex = _.findIndex(this.state.songs_urls, (item) => {
      return item === this.state.current_song
    })
    this.state.current_song = this.state.songs_urls[currentItemIndex+1];
    this.state.played = 0;
    this.state.start = 0;
    this.updateDatabase(this.state);
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <div id="player">
          <ReactPlayer
           url={`${this.state.current_song}?start=${this.state.start}`}
           playing
           progressFrequency={1}
           onProgress={this.onProgress}
           onDuration={duration => this.setState({ duration })}
           onEnded={this.nextSong.bind(this)}
           youtubeConfig={{
             playerVars: {
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
          <h4>{this.state.title}</h4>
        </div>
        <SongRequest />
        <button onClick={this.nextSong.bind(this)}> Next Song</button>
      </div>
    );
  }
}

export default Player;
