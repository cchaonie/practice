import { IncomingMessage, ServerResponse, STATUS_CODES } from "http";
import { parse } from "url";

export function controller(req: IncomingMessage, res: ServerResponse) {
    try {
        console.log(req.headers);
        // const url = new URL(req.url);
        const url = parse(req.url, true);
        let data = null;
        if (url) {
            console.log(url);
            console.log(`url.pathname: ${url.pathname}`);
            console.log(`url.search: ${url.search}`);
            // console.log(url.searchParams);
            console.log(`url.hash: ${url.hash}`);
            // console.log(url.username);
            // console.log(url.password);
            data = url.query;
        }
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ data }));
    } catch (error) {
        console.log(error);
        res.writeHead(404, { 'content-type': 'text/html' });
        res.end('<h1>404 Not FOUND</h1>');
    }

}