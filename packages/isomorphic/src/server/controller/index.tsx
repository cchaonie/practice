import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Request, Response } from 'express';

import App from '../../index';
import { ServerHTML } from './serverHTML';
import path from 'path';
import fs from 'fs/promises';

export default async function (req: Request, res: Response) {
  try {
    const manifestFilePath = path.resolve(
      process.cwd(),
      'dist/client/manifest.json'
    );

    const chunkMap = await fs.readFile(manifestFilePath, { encoding: 'utf-8' });
    const scripts = Object.values(JSON.parse(chunkMap)).map((src: string, i) => {
      if (src.endsWith('js')) {
        return <script key={`${i + 1}`} defer src={src} />;
      }
      if (src.endsWith('css')) {
        return <link key={`${i + 1}`} href={src} />;
      }
    });

    const html = ReactDOMServer.renderToPipeableStream(
      <ServerHTML
        title='This is a isomorphic javascript application'
        scripts={scripts}
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
