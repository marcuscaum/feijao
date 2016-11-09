import Firebase from 'firebase';
import React, { Component } from 'react';
import Alert from 'react-s-alert';
import Modal from 'boron/WaveModal';

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

    try {
      if (!this.state.url.length && !this.refs.url.value.length) throw new Error();

      const songsRef = this.firebaseRef.child('songs');
      const newSongRef = songsRef.push();
      this.state.id = Math.random();

      newSongRef.set(this.state, () => {
        this.setState({url: ""});
        this.setState({title: ""});
        this.addedNewSongFeedback();
      });
    } catch (e) {
      this.emptyFieldFeedback()
    }
  }

  showModal = () => {
    this.refs.modal.show();
  }

  hideModal = () => {
      this.refs.modal.hide();
  }

  callback = (e) => {
      console.log(event);
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
          <span className="glyphicon glyphicon-plus" onClick={this.showModal}></span>
          <Modal ref="modal" keyboard={this.callback} className="song-request--modal">
            <span className="glyphicon glyphicon-remove" onClick={this.hideModal}></span>
            <form onSubmit={ this.handleSubmit }>
              <input type="text" name="title" placeholder="Título do som" ref="title"  onChange={ this.onChange } value={ this.state.title } />
              <input type="text" name="url" placeholder="URL do vídeo" ref="url" onChange={ this.onChange } value={ this.state.url } />
              <input type="submit" value="Manda o sampley " />
            </form>
          </Modal>
        </div>
        <Alert stack={{limit: 3}} />
      </div>
    );
  }
}


export default SongRequest;
