import React, { Component } from 'react';
import Modal from './Modal.js';
import Store from './store';

export default class App extends Component {
  render() {
    return (
      <div onClick={() => console.log('my descent is clicked')}>
        <h1>Portal</h1>
        <Modal></Modal>
      </div>
    )
  }
}

Store.dispatch({
  type: 'A',
  payload: { count: 100 }
})