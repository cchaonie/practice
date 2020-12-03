const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    crossOriginLoading: "anonymous",
  },
  target: "web",
  mode: "development",
  resolve: {
    extensions: ['js', 'jsx']
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        include: path.join(__dirname, "src"),
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(js|jsx)/,
        exclude: path.join(__dirname, "node_modules"),
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/public/index.html"),
    }),
    // new CopyWebpackPlugin([
    //   { from: path.join(__dirname, './src/assets'), to: path.join(__dirname, 'dist') }
    // ])
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
  },
};
