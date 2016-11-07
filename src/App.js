import React, { Component } from 'react';
import Firebase from 'firebase';
import Player from './components/Player';
import './Main.css';

const firebaseConfig = {
  apiKey: "AIzaSyCFA5yAF1Z7ucgYAz3bDc5Pu6UQWKbrjEA",
  authDomain: "feijao-36ce4.firebaseapp.com",
  databaseURL: "https://feijao-36ce4.firebaseio.com",
  storageBucket: "feijao-36ce4.appspot.com",
  messagingSenderId: "266228826736"
};

Firebase.initializeApp(firebaseConfig );

class App extends Component {

  render() {
    return (
      <div>
        <div className="container">
          <header>
            <h1> Hello, this is <span className="logo">myjam</span>!</h1>
          </header>
          <Player />
        </div>
      </div>
    );
  }
}

export default App;
