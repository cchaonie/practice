import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isProd = process.env.NODE_ENV == 'production';
const ROOT_DIR = process.cwd();

export default {
  entry: path.join(ROOT_DIR, './src/client/index.tsx'),
  output: {
    filename: '[name].js',
    path: path.resolve(ROOT_DIR, 'dist/client'),
    publicPath: 'http://localhost:9000/',
  },
  mode: isProd ? 'production' : 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'css'],
  },
  devtool: isProd ? false : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css?$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin({ writeToFileEmit: true }),
    new MiniCssExtractPlugin(),
  ],
};
