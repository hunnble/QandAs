var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.join(__dirname, 'node_modules');
var serverPath = path.join(__dirname, 'server');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  entry: {
    bundle: './client/index.js',
    vendor: [
      'react',
      'react-addons-css-transition-group',
      'react-dom',
      'react-motion',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-swipeable-views',
      'react-tap-event-plugin',
      'redux',
      'redux-form',
      'redux-thunk'
    ]
  },
  devtool: false,
  // devServer: {
  //   contentBase: '',
  //   devtool: 'eval',
  //   hot: true,
  //   inline: true,
  //   port: 3005
  // },
  output: {
    path: path.join(__dirname, 'server/public/'),
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    commonsPlugin,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$super','$','exports','require']
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
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
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
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
