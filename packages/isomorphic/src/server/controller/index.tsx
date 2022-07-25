import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Request, Response } from 'express';

import App from '../../components/App';
import { ServerHTML } from './serverHTML';

export default function (req: Request, res: Response) {
  try {
    const html = ReactDOMServer.renderToStaticNodeStream(
      <ServerHTML
        title='This is a isomorphic javascript application'
        content={<App />}
      />
    );

    res.status(200);
    res.type('html');
    html.pipe(res);
  } catch (error) {
    console.error(error);

    res.type('html');
    res.end(`<div>
            <h1>500 Server Internal Error</h1>
            <p>${JSON.stringify(error)}</p>
        </div>`);
  }
}
