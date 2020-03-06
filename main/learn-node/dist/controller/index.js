"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var utils_1 = require("../utils");
var isRealResult = function (res) { return res.Data.Status === 2; };
var retryDescribeTaskStatus = utils_1.retry(utils_1.describeTaskStatus, isRealResult, 30000);
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
        Promise.all(chunkBufs
            .filter(function (c, i) { return i < 1; })
            .map(function (buf) { return utils_1.createRecTask(buf.toString("base64")); }))
            .then(function (responses) {
            console.log("**********get remote response************");
            Promise.all(responses.map(function (res) { return retryDescribeTaskStatus(res.Data.TaskId); })).then(function (result) {
                console.log("----------get translate result: " + result.toString() + "-----------");
                res.writeHead(200, {
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                });
                res.end(JSON.stringify(result));
            });
        })
            .catch(function (e) {
            console.log(e);
            res.writeHead(404, {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            });
            res.end("<h1>404 Not FOUND</h1>");
        });
    });
}
function chunkSlice(buf, size) {
    console.log(buf.length);
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
