var webpack = require('webpack');

module.exports = {
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      './js/index.js'
    ],
    output: {
      path: __dirname,
      filename: 'bundle.js',
      sourceMapFilename: '[file].map'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /(node_modules)/,
          loader: 'babel'
        }
      ]
    },
    devTool: 'source-map',
    devServer: {
      hot: true
    }
};
