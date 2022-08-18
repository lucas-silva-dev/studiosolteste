const path = require('path');
const { merge } = require('webpack-merge');
const config = require('./webpack.config');
const copyWebpackPlugin = require('copy-webpack-plugin');
const terserPlugin = require('terser-webpack-plugin');

module.exports = merge(config, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new terserPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images/'),
          to: path.resolve(__dirname, 'dist/assets/images'),
        },
      ],
    }),
  ],
  output: {
    filename: `assets/javascript/pages/[name].min.js`,
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
});
