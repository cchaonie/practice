const path = require("path");

const ROOT_DIR = process.cwd();
const isProd = process.env.NODE_ENV === "production";

module.exports = {
    entry: path.resolve(ROOT_DIR, "./src/server/index.ts"),
    output: {
        filename: "index.js",
        path: path.resolve(ROOT_DIR, "build/server"),
        crossOriginLoading: "anonymous",
    },
    mode: isProd ? "production" : "development",
    resolve: {
        extensions: ["ts", "tsx", "json"],
    },
    target: "node",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: path.resolve(ROOT_DIR, "node_modules"),
                use: ["ts-loader"],
            },
        ],
    },
};
