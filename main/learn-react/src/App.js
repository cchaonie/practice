import React, { Component } from 'react';
import Modal from './Modal.js';
import store from './store';
import Lazy from './Lazy'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }
 
  render() {
    return (
      <div onClick={() => console.log('my descent is clicked')}>
        <h1>Portal</h1>
        <Modal></Modal>
        <button onClick={() => this.setState({ visible: !this.state.visible })}>toggle</button>
        {
          this.state.visible ? <Lazy></Lazy> : null
        }
      </div>
    )
  }
}

store.dispatch({
  type: 'A',
  payload: { count: 100 }
})