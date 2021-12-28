import React, { useState } from 'react';

export default function() {
  const [name, setName] = useState("tom");
  import('./utils').then(({ default: say }) => setName(say('Jerry')));
  return (
    <div>
      {name}
    </div>
  );
}