import Firebase from 'firebase';
import React, { Component } from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class SongRequest extends Component {

  state = {
    title: null,
    url: null,
    id: null,
  }

  constructor() {
    super();

    this.firebaseRef = Firebase.database().ref('playlist/');
  }

  onChange = (e) => {
    const name = e.target.name;

    if (name === 'title') {
      this.setState({title: e.target.value});
    } else {
      this.setState({url: e.target.value});
    }
  }

  saveRequest() {
    const songsRef = this.firebaseRef.child('songs');
    const newSongRef = songsRef.push();
    this.state.id = Math.random();

    if (this.state.url === (null || "")) return this.emptyFieldFeedback();

    newSongRef.set(this.state, () => {
      this.setState({url: ""});
      this.setState({title: ""});
      this.addedNewSongFeedback();
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.saveRequest();
  }

  emptyFieldFeedback() {
    Alert.error('Campo URL é necessário!', {
      position: 'top-right',
      effect: 'slide',
      beep: false,
    });
  }

  addedNewSongFeedback() {
    Alert.success('Música adicionada!', {
      position: 'top-right',
      effect: 'slide',
      beep: false,
    });
  }

  render() {
    return (
      <div>
        <div id="song-request">
          <form onSubmit={ this.handleSubmit }>
            <input type="text" name="title" placeholder="Título do som" onChange={ this.onChange } value={ this.state.title } />
            <input type="text" name="url" placeholder="URL do vídeo" onChange={ this.onChange } value={ this.state.url } />
            <input type="submit" value="Manda o sampley " />
          </form>
        </div>
        <Alert stack={{limit: 3}} />
      </div>
    );
  }
}


export default SongRequest;
