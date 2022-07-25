import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ManifestPlugin from "webpack-manifest-plugin";

const isProd = process.env.NODE_ENV == "prod";
const ROOT_DIR = process.cwd();

export default {
    entry: path.join(ROOT_DIR, "./src/client/index.tsx"),
    output: {
        filename: "[name].js",
        path: path.resolve(ROOT_DIR, "dist/client"),
        publicPath: "http://localhost:9000/"
    },
    mode: isProd ? "production" : "development",
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    devtool: isProd ? false : "inline-source-map",
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
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
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
        // new HtmlWebpackPlugin({
        //   template: path.join(__dirname, "./src/views/template/index.html")
        //   // filename: "./index.html"
        // }),
        // new CopyWebpackPlugin([
        //     {
        //         from: path.join(ROOT_DIR, "./src/assets"),
        //         to: path.join(ROOT_DIR, "./dist/public"),
        //     },
        // ]),
        new ManifestPlugin(),
    ],
};
