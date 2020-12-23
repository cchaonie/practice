const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MyPlugin = require("../plugins/myPlugin");

const ROOT_DIR = process.cwd();

module.exports = {
    entry: path.resolve(ROOT_DIR, "./src/index.js"),
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(ROOT_DIR, "dist"),
        crossOriginLoading: "anonymous",
    },
    target: "web",
    mode: "development",
    // resolve: {
    //     extensions: ["js", "jsx", "ts", "tsx", "json"],
    // },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                include: path.resolve(ROOT_DIR, "src"),
                use: ["style-loader", "css-loader", "sass-loader"],
            },
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
        // new CopyWebpackPlugin([
        //   { from: path.resolve(ROOT_DIR, './src/assets'), to: path.resolve(ROOT_DIR, 'dist') }
        // ])
        // new MyPlugin()
    ],
    devServer: {
        contentBase: path.resolve(ROOT_DIR, "dist"),
        port: 9000,
        historyApiFallback: true
    },
};
