const path = require('path');

module.exports = {
  entry: './movement/movement.js',
  output: {
    path: path.resolve(__dirname, 'codes'),
    filename: 'PATH_FINDER.100.js',
  },
};