const path = require('path')

module.exports = {
  entry: {
    simple_state: './simple-state/main.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
}
