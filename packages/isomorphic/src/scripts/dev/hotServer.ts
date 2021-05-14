import { spawn } from "child_process";
import path from "path";

import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";

import clientConfig from "../../config/webpack.client";
import serverConfig from "../../config/webpack.server";

const clientCompiler = webpack(clientConfig as webpack.Configuration);
const serverCompiler = webpack(serverConfig as webpack.Configuration);

const ROOT_DIR = process.cwd();

let currentNodeServer = null;

serverCompiler.watch({}, (err, stats) => {
    // console.log(stats);
    console.log("[server] compiled");
});

serverCompiler.hooks.done.tap("server compiled finished", stats => {
    console.log("server compiled done, starting node server");
    if (!currentNodeServer) {
        const nodeServer = spawn("nodemon", [
            path.resolve(ROOT_DIR, "dist/server/index"),
        ]);
        console.log("node server started");
        nodeServer.stdout.on("data", data =>
            console.log(data.toString().trim())
        );
        nodeServer.stderr.on("data", data => {
            console.error(data.toString().trim());
        });
        currentNodeServer = nodeServer;
    }
});

const clientServer = express();
clientServer.use(
    webpackDevMiddleware(clientCompiler, {
        writeToDisk: true,
    })
);

clientCompiler.watch({}, (err, stats) => {
    // [Stats Object](#stats-object)
    // Print watch/build result here...
    // console.log(stats);
    console.log("[client] compiled again");
});

clientServer.listen(9000, () =>
    console.log("client server is listening at 9000")
);
