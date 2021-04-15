const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DemoPlugin = require("../plugins/demoPlugin");

const ROOT_DIR = process.cwd();
console.log(path.resolve(ROOT_DIR, "dist"))
module.exports = {
    entry: "./src/index",
    context: ROOT_DIR,
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(ROOT_DIR, "dist"),
        crossOriginLoading: "anonymous",
    },
    target: "web",
    mode: "development",
    devtool: "inline-source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                include: path.resolve(ROOT_DIR, "src"),
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(t|j)sx?$/,
                exclude: path.resolve(ROOT_DIR, "node_modules"),
                use: ["babel-loader"],
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: [
        new DemoPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/public/index.html",
        }),
    ],
    devServer: {
        contentBase: path.resolve(ROOT_DIR, "dist"),
        port: 9000,
        hot: true,
        liveReload: false,
    },
};
