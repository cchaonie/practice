const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const rootDir = path.join(__dirname, "../");

module.exports = {
  entry: path.join(rootDir, "src/index.ts"),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(rootDir, "dist"),
    crossOriginLoading: "anonymous",
  },
  mode: "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        include: path.join(rootDir, "src"),
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(t|j)sx?$/,
        exclude: path.join(rootDir, "node_modules"),
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(rootDir, "src/public/index.html"),
    }),
  ],
};
