const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const ROOT_DIR = process.cwd();

const isProd = process.env.NODE_ENV === "production";

module.exports = {
    entry: path.resolve(ROOT_DIR, "./src/client/index"),
    output: {
        filename: "[name].[contentHash].js",
        path: path.resolve(ROOT_DIR, "build/client"),
        crossOriginLoading: "anonymous",
    },
    mode: isProd ? "production" : "development",
    resolve: {
        extensions: ["ts", "tsx", "json"],
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: path.resolve(ROOT_DIR, "node_modules"),
                use: ["babel-loader"],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(ROOT_DIR, "./src/public/index.html"),
        }),
    ],
    devServer: {
        contentBase: path.resolve(ROOT_DIR, "dist"),
        port: 9000,
        historyApiFallback: true,
    },
};
