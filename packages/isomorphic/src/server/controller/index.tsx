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
        const disableSSR = process.env.DISABLE_SSR;

        const clientManifest = getManifest("client", "manifest");
        const extractor = new ChunkExtractor({
            statsFile: path.resolve(
                process.cwd(),
                "./dist/server/loadable-stats.json"
            ),
        });

        const jsx = extractor.collectChunks(
            <ServerHTML
                title="This is a isomorphic javascript application"
                srcs={[`${clientManifest["main.js"]}`]}
            >
                {disableSSR === "1" ? null : <App />}
            </ServerHTML>
        );

        const html = ReactDOMServer.renderToString(jsx);
        res.status(200);
        res.type("html");
        res.end(html);
    } catch (error) {
        console.log(error);
        res.type("html");
        res.end("<h1>500 Server Internal Error</h1>");
    }
}
