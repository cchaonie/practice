import React, { Component } from 'react';
import Modal from './Modal';

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