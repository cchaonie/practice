"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var controller_1 = require("./controller");
var port = process.env.PORT || 8181;
var server = http_1.createServer();
server.on('request', controller_1.controller);
server.listen(port, function () { return console.log("listening port: " + port); });
