const path = require('path');
const webpack = require('webpack');
require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  target: 'web',
  mode: isDev ? 'development' : 'production',
  entry: {
    app: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    publicPath: isDev ? '/' : '/' + process.env.URL_PATH || '',
    path: isDev ? path.resolve(__dirname, 'dist') : path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name]-[id].js',
    clean: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/App/components'),
    },
  },
  devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|ttf|woff|woff2|eot)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist')],
    }),
    new webpack.DefinePlugin({
      REACT_APP_FIREBASE_API_KEY: JSON.stringify(process.env.REACT_APP_FIREBASE_API_KEY),
      REACT_APP_FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
      REACT_APP_FIREBASE_DATABASE_URL: JSON.stringify(process.env.REACT_APP_FIREBASE_DATABASE_URL),
      REACT_APP_FIREBASE_PROJECT_ID: JSON.stringify(process.env.REACT_APP_FIREBASE_PROJECT_ID),
      REACT_APP_FIREBASE_STORAGE_BUCKET: JSON.stringify(
        process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      ),
      REACT_APP_FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(
        process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      ),
      REACT_APP_FIREBASE_APP_ID: JSON.stringify(process.env.REACT_APP_FIREBASE_APP_ID),
      REACT_APP_FIREBASE_MEASUREMENT_ID: JSON.stringify(
        process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
      ),
      REACT_APP_BASIC_BEER_API_URL: JSON.stringify(process.env.REACT_APP_BASIC_BEER_API_URL),
      URL_PATH: JSON.stringify(process.env.URL_PATH || ''),
    }),
  ],

  devServer: {
    port: 3300,
    hot: true,
    compress: true,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
  },
};
