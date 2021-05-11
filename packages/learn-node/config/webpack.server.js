const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

const isProd = process.env.NODE_ENV == "prod";
const ROOT_DIR = process.cwd();

module.exports = {
    entry: path.join(ROOT_DIR, "./src/server/index.ts"),
    output: {
        filename: "index.js",
        path: path.resolve(ROOT_DIR, "dist/server"),
    },
    mode: isProd ? "production" : "development",
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    target: "node",
    devtool: isProd ? false : "inline-source-map",
    optimization: {
        splitChunks: {
            chunks: "async",
            minSize: 20000,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
        },
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    isProd
                        ? {
                              loader: MiniCssExtractPlugin.loader,
                              options: {
                                  publicPath: path.resolve(__dirname, "dist"),
                              },
                          }
                        : "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.tsx?$/,
                exclude: path.resolve(ROOT_DIR, "./node_modules"),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                            "@babel/preset-env",
                        ],
                    },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new ManifestPlugin(),
    ],
};
