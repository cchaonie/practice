import React, { useState, useEffect } from 'react';
import Modal from './Modal.js';
import store from './store';
import Lazy from './Lazy';
import Card from './component/card';
import { Loading } from './component/loading';
import { useCount, countLogic } from './hooks'

export default function App() {
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    console.log('parent did mount');
  }, [])

  useEffect(() => {
    console.log('parent did update');
  })

  const [count, inc, desc] = useCount();
  const logic = countLogic();
  
    return (
      <div >
        <h1>Portal</h1>
        <Modal></Modal>
        <div>
          <p>useCount: {count} <button onClick={inc}>inc</button><button onClick={desc}>desc</button></p>
          <p>countLogic: {logic.count} <button onClick={() => logic.inc}>inc</button><button onClick={() => logic.desc}>desc</button></p>
        </div>
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