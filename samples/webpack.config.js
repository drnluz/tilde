const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    simple_state: './simple-state/main.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000
  }
}
