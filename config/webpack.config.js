'use strict';

var path    = require( 'path' );
var webpack = require( 'webpack' );

var ROOT_PATH = path.resolve( __dirname, '..' );

var config = {

  context: path.join( ROOT_PATH, 'app/assets/javascripts' ),

  entry: {
    network: './network/network_bundle.js',
  },

  output: {
    path:          path.join( ROOT_PATH, 'public/assets/webpack' ),
    publicPath:    '/assets/webpack/',
    filename:      '[name].bundle.js',
  },

  plugins: [

    // fix legacy jQuery plugins which depend on globals
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),

  ],

}

module.exports = config;
