const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: isProd ? "production" : "development",
  devtool: isProd ? false : "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        include: path.join(__dirname, "src"),
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        }),
      },
      {
        test: /\.js/,
        exclude: path.join(__dirname, "node_modules"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html"),
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "./src/assets"),
        to: path.join(__dirname, "dist"),
      },
    ]),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
  },
};
