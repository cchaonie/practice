import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ManifestPlugin from "webpack-manifest-plugin";
import LoadablePlugin from "@loadable/webpack-plugin";

const isProd = process.env.NODE_ENV == "prod";
const ROOT_DIR = process.cwd();

export default {
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
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new LoadablePlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new ManifestPlugin(),
    ],
};
