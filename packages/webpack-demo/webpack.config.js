const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "./src/index"),
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
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
                include: path.join(__dirname, "src"),
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(t|j)sx?$/,
                exclude: path.join(__dirname, "node_modules"),
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
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./src/public/index.html"),
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000,
        hot: true,
        liveReload: false,
    },
};
