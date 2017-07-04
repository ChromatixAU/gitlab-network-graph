'use strict';

var fs      = require( 'fs' );
var path    = require( 'path' );
var webpack = require( 'webpack' );

var ROOT_PATH = path.resolve( __dirname, '..' );
var IS_PRODUCTION = process.env.NODE_ENV === 'production';
var NO_COMPRESSION = process.env.NO_COMPRESSION;

var config = {
  // because sqljs requires fs.
  node: {
    fs: "empty"
  },
  context: ROOT_PATH,
  entry: {
    network:              './network/network_bundle.js',
  },

  output: {
    path:          path.join( ROOT_PATH, 'dist' ),
    publicPath:    '/dist/',
    filename:      IS_PRODUCTION ? '[name].[chunkhash].bundle.js' : '[name].bundle.js',
    chunkFilename: IS_PRODUCTION ? '[name].[chunkhash].chunk.js' : '[name].chunk.js',
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(gif|png)$/,
        loader: 'url-loader',
        options: { limit: 2048 },
      },
      {
        test: /\.(worker\.js|pdf|bmpr)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
      {
        test: /locale\/\w+\/(.*)\.js$/,
        loader: 'exports-loader?locales',
      },
    ]
  },

  plugins: [

    // fix legacy jQuery plugins which depend on globals
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),

    // assign deterministic chunk ids
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name;
      }
      return chunk.modules.map((m) => {
        var chunkPath = m.request.split('!').pop();
        return path.relative(m.context, chunkPath);
      }).join('_');
    }),
  ],

  resolve: {
    extensions: ['.js'],
    alias: {
      '~':              path.join(ROOT_PATH, 'network'),
    }
  }
}

if (IS_PRODUCTION) {
  config.devtool = 'source-map';
  config.plugins.push(
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    })
  );

  // zopfli requires a lot of compute time and is disabled in CI
  if (!NO_COMPRESSION) {
    // gracefully fall back to gzip if `node-zopfli` is unavailable (e.g. in CentOS 6)
    try {
      config.plugins.push(new CompressionPlugin({ algorithm: 'zopfli' }));
    } catch(err) {
      config.plugins.push(new CompressionPlugin({ algorithm: 'gzip' }));
    }
  }
}

module.exports = config;
