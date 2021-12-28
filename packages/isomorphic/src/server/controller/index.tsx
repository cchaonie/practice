import { HelmetProvider, FilledContext } from "react-helmet-async";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Request, Response } from "express";
import { ChunkExtractor } from "@loadable/server";
import { ServerStyleSheet } from "styled-components";

import App from "../../components/App";
import { ServerHTML } from "./serverHTML";
import { getManifest } from "../utils";

export default function (req: Request, res: Response) {
    try {
        const extractor = new ChunkExtractor({
            stats: getManifest("client", "loadable-stats"),
            publicPath: "http://localhost:9000",
        });
        const sheet = new ServerStyleSheet();
        const helmetContext = {};
        const jsx = sheet.collectStyles(
            extractor.collectChunks(
                <HelmetProvider context={helmetContext}>
                    <App />
                </HelmetProvider>
            )
        );

        const html = ReactDOMServer.renderToStaticNodeStream(
            <ServerHTML
                helmet={(helmetContext as FilledContext).helmet}
                title="This is a isomorphic javascript application"
                content={jsx}
                scripts={extractor.getScriptElements()}
                styles={sheet.getStyleElement()}
            />
        );

        res.status(200);
        res.type("html");
        html.pipe(res);
    } catch (error) {
        console.error(error);

        res.type("html");
        res.end(`<div>
            <h1>500 Server Internal Error</h1>
            <p>${JSON.stringify(error)}</p>
        </div>`);
    }
}
