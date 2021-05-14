import { Request, Response } from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../../components/App";
import { ServerHTML } from "./serverHTML";
import { getManifest } from "../utils";

export default function (req: Request, res: Response) {
    try {
        const clientManifest = getManifest("client");
        const html = ReactDOMServer.renderToString(
            <ServerHTML
                title="This is a isomorphic javascript application"
                srcs={[`http://localhost:9000/${clientManifest["main.js"]}`]}
            >
                <App />
            </ServerHTML>
        );
        res.status(200);
        res.type("html");
        res.end(html);
    } catch (error) {
        console.log(error);
        res.type("html");
        res.end("<h1>404 Not FOUND</h1>");
    }
}
