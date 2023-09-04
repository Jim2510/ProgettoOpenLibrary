const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: './dist', // Specifica la directory in cui si trovano i file statici
    port: 8081,
  },
};
