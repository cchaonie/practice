"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var utils_1 = require("../utils");
function controller(req, res) {
    try {
        var url = url_1.parse(req.url, true);
        if (url.path === "/upload") {
            handleUpload(req, res);
        }
        else {
            throw new Error("Page Not Found");
        }
    }
    catch (error) {
        res.writeHead(404, { "content-type": "text/html" });
        res.end("<h1>404 Not FOUND</h1>");
    }
}
exports.controller = controller;
function handleUpload(req, res) {
    var chunk = [];
    req.on("data", function (data) {
        // console.log(`Received ${chunk.length} bytes of data.`);
        chunk.push(data);
    });
    req.on("end", function () {
        var chunkBufs = chunkSlice(Buffer.concat(chunk), 0.5 * 1024 * 1024);
        utils_1.createRecTask(chunkBufs[0].toString("base64"))
            .then(function (res) {
            console.log(res);
            utils_1.describeTaskStatus(res.Data.TaskId).then(function (res) { return console.log(res); });
        })
            .catch(function (e) { return console.log(e); });
        // Promise.all(chunkBufs.map(buf => createRecTask(buf.toString("base64"))))
        // .then(responses => {
        //     console.log("**********get remote response************");
        //     console.log(responses[0])
        //     Promise.all(
        //       responses.map(res => describeTaskStatus(res.Data.TaskId))
        //     ).then(result => {
        //         res.writeHead(200, { 'content-type': 'application/json' });
        //         res.end(JSON.stringify(result));
        //     });
        //   })
        //   .catch(e => console.log(e));
    });
}
function chunkSlice(buf, size) {
    var chunks = [];
    var chunkNumber = Math.ceil(buf.length / size) + 1;
    var chunkLength = Math.ceil(buf.length / chunkNumber);
    var start = 0;
    var end = chunkLength;
    while (end <= buf.length) {
        chunks.push(buf.slice(start, end));
        start = end;
        end += chunkLength;
    }
    return chunks;
}
