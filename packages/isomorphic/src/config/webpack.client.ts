import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

const isProd = process.env.NODE_ENV == 'prod';
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
    extensions: ['.ts', '.tsx', '.js'],
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
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin({ writeToFileEmit: true }),
  ],
};
