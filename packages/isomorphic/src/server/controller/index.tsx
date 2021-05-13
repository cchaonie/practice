import { Request, Response } from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../../components/App";

export default function (req: Request, res: Response) {
    try {
        const html = ReactDOMServer.renderToString(<App />);
        res.status(200);
        res.type("html");
        res.send(html);
        res.end();
    } catch (error) {
        console.log(error);
        res.writeHead(404, { "content-type": "text/html" });
        res.end("<h1>404 Not FOUND</h1>");
    }
}
