import React, { Component, useState, useEffect } from 'react';
import Modal from './component/Modal.js';
import store from './models/store';
import Lazy from './Lazy';
import Card from './component/card';
import { Loading } from './component/loading';
import f from './utils/import-es6';

export default function App() {
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(false);
  console.log(f.children);
  useEffect(() => {
    console.log('parent did mount');
  }, [])

  useEffect(() => {
    console.log('parent did update');
  })
  
    return (
      <div >
        <h1>Portal</h1>
        <Modal></Modal>
        <button onClick={() => setVisible(!visible)}>toggle</button>
        <button onClick={() => setDisplay(!display)}>display toggle</button>
        {
          visible ? <Lazy></Lazy> : null
        }
        <Card/>
        <div style={{display: display ? "block" : "none"}}><Loading loading={'1'}/></div>
      </div>
    )
  
}

store.dispatch({
  type: 'A',
  payload: { count: 100 }
})