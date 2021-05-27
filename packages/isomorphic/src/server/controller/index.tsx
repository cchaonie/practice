import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { Request, Response } from "express";
import { ChunkExtractor } from "@loadable/server";

import App from "../../components/App";
import { ServerHTML } from "./serverHTML";
import { getManifest } from "../utils";

export default function (req: Request, res: Response) {
    try {
        const extractor = new ChunkExtractor({
            stats: getManifest("client", "loadable-stats"),
            publicPath: "http://localhost:9000",
        });

        const jsx = extractor.collectChunks(<App />);

        const content = ReactDOMServer.renderToString(jsx);

        const html = ReactDOMServer.renderToString(
            <ServerHTML
                title="This is a isomorphic javascript application"
                content={content}
                scripts={extractor.getScriptElements()}
            />
        );

        res.status(200);
        res.type("html");
        res.end(html);
    } catch (error) {
        console.error(error);

        res.type("html");
        res.end(`<div>
            <h1>500 Server Internal Error</h1>
            <p>${JSON.stringify(error)}</p>
        </div>`);
    }
}
