const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "./src/index.tsx"),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    crossOriginLoading: "anonymous",
  },
  target: "web",
  mode: "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
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
        test: /\.(t|j)sx?$/,
        exclude: path.join(__dirname, "node_modules"),
        use: ["ts-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html"),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
  },
};
