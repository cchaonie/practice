import React, { useState } from 'react';
import styles from './index.css';

export default function App() {
  const [hidden, setHidden] = useState(false);
  const handleClick = () => setHidden(true);

  return (
    <div className={styles.main}>
      <h1>hello ssr and react</h1>
      <div>
        <button onClick={handleClick}>show hidden content</button>
        {hidden && <p>"I am hidden"</p>}
      </div>
    </div>
  );
}
