import Firebase from 'firebase';
import React, { Component } from 'react';

class SongRequest extends Component {

  state = {
    title: '',
    url: ''
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

    newSongRef.set(this.state, console.log('done!'));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.saveRequest();
  }

  render() {
    return (
      <div>
        <div id="song-request">
          <form onSubmit={ this.handleSubmit }>
            <input type="text" name="title" placeholder="Título do som" onChange={ this.onChange } value={ this.state.title } />
            <br></br>
            <input type="text" name="url" placeholder="URL do vídeo" onChange={ this.onChange } value={ this.state.url } />
            <input type="submit" value="Add song" />
          </form>
        </div>
      </div>
    );
  }
}


export default SongRequest;