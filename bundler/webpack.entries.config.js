const path = require('path');

const webpack = require('webpack');
const WildcardsEntryWebpackPlugin = require('./lib/entrypointsPlugin');
// const WildcardsEntryWebpackPlugin = require('wildcards-entry-webpack-plugin');
const GeneratePagePlugin = require('./lib/generatePageplugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: WildcardsEntryWebpackPlugin.entry('./in/**/*.example.js'),
  output: {
    path: resolve('./out'),
    filename: '[name].js',
    library: 'example_[hash]',
    publicPath: '/',
  },

  mode: 'development',
  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.example.jsx?$/,
        exclude: /node_modules/,
        use: ['@sb/core/loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
      },
    ],
  },
  plugins: [
    // new DashboardPlugin(),
    new WildcardsEntryWebpackPlugin(),
    new webpack.DllReferencePlugin({
      context: resolve('.'),
      manifest: require('./out/dll/sb-manifest.json'),
    }),
    new webpack.DllReferencePlugin({
      context: resolve('.'),
      manifest: require('./out/dll/react-manifest.json'),
    }),
    new GeneratePagePlugin({
      template: resolve('./templates/iframe.ejs'),
      parser: 'ejs',
    }),
  ],
};
