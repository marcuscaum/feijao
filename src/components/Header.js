import React, { Component } from 'react';
import Firebase from 'firebase';
import _ from 'lodash';

class Header extends Component {

  state = {
    quotes: [],
    header_title: null,
  }

  constructor() {
    super();

    this.firebaseRef = Firebase.database().ref('quotes/');
    this.setRandomTitle();
  }

  componentWillMount() {
    this.firebaseRef.on('value', (snapshot) => {
      this.setState({quotes: _.compact(snapshot.val())})
      this.setState({header_title: _.sample(this.state.quotes)})
      this.setRandomTitle();
    })
  }

  setRandomTitle() {
    setInterval(() => {
      this.setState({header_title: _.sample(this.state.quotes)})
    }, 5000);
  }

  render() {
    return (
      <header>
        <h1>{this.state.header_title}</h1>
      </header>
    );
  }
}

export default Header;
