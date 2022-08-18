const path = require('path');
const { merge } = require('webpack-merge');
const config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
      watch: true,
    },
    compress: true,
    https: false,
    port: 3008,
    host: 'hom.lp.com.br',
    open: true,
    watchFiles: ['src/**/*.js', 'src/**/*.scss'],
  },
});
