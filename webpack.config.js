var webpack = require('webpack');

module.exports = {
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      './js/index.js'
    ],
    output: {
      path: __dirname,
      filename: "bundle.js"
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
    devServer: {
      hot: true
    }
};
