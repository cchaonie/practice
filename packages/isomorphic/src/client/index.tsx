import React from 'react';
import { hydrateRoot } from 'react-dom/client';

import App from '..';

const root = document.getElementById('root');

hydrateRoot(root, <App />);
