var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.join(__dirname, 'node_modules');
var serverPath = path.join(__dirname, 'server');

module.exports = {
  entry: ['babel-polyfill', './client/index.js'],
  devServer: {
    contentBase: '',
    devtool: 'eval',
    hot: true,
    inline: true,
    port: 3005
  },
  output: {
    path: path.join(__dirname, 'server/public'),
    publicPath: path.join(__dirname, 'server/public'),
    // path: path.join(__dirname, 'client/dist'),
    // publicPath: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    // preLoaders: [
    //   {
    //     test: /\.(jsx|js)$/,
    //     loader: 'eslint-loader',
    //     exclude: [nodeModulesPath]
    //   }
    // ],
    loaders: [
      {
        test: /\.(jsx|js)$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        },
        exclude: [nodeModulesPath, serverPath]
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)$/,
        loader: 'url-loader',
        exclude: [nodeModulesPath, serverPath]
      },
      {
        test: /\.scss$/,
        loader: 'style!css!resolve-url!sass',
        exclude: [nodeModulesPath, serverPath]
      }
    ]
  },
  eslint: {
    configFile: './.eslintrc'
  }
};
