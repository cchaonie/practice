"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
function controller(req, res) {
    try {
        console.log(req.headers);
        // const url = new URL(req.url);
        var url = url_1.parse(req.url, true);
        var data = null;
        if (url) {
            console.log(url);
            console.log("url.pathname: " + url.pathname);
            console.log("url.search: " + url.search);
            // console.log(url.searchParams);
            console.log("url.hash: " + url.hash);
            // console.log(url.username);
            // console.log(url.password);
            data = url.query;
        }
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ data: data }));
    }
    catch (error) {
        console.log(error);
        res.writeHead(404, { 'content-type': 'text/html' });
        res.end('<h1>404 Not FOUND</h1>');
    }
}
exports.controller = controller;
