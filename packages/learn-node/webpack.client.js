const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

const isProd = process.env.NODE_ENV == "prod";

module.exports = {
  entry: path.join(__dirname, "./src/web/index.tsx"),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  mode: isProd ? "production" : "development",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
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
                  publicPath: path.resolve(__dirname, "dist")
                }
              }
            : "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(tsx|ts)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-react",
              "@babel/preset-typescript",
              "@babel/preset-env"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    // new HtmlWebpackPlugin({
    //   template: path.join(__dirname, "./src/views/template/index.html")
    //   // filename: "./index.html"
    // }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "./src/assets"),
        to: path.join(__dirname, "./dist/public")
      }
    ]),
    new ManifestPlugin()
  ]
};
