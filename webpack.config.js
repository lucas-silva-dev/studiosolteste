const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const dirJs = path.join(__dirname, 'src/assets/javascript/pages');
const dirCss = path.join(__dirname, 'src/assets/stylesheet/pages');

module.exports = {
  entry: {
    home: [path.join(dirJs, 'home.js'), path.join(dirCss, 'home.scss')],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `assets/javascript/pages/[name].min.js`,
    publicPath: '/',
    assetModuleFilename: 'images/[name].[ext].[query]',
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/assets/view/pages/home.pug'),
      filename: 'index.html',
      title: 'Studio Sol',
      chunks: ['home'],
    }),

    new miniCssExtractPlugin({
      filename: 'assets/stylesheet/pages/[name].css',
    }),
  ],
  cache: false,
  module: {
    rules: [
      // BABEL
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-regenerator'],
          },
        },
      },
      // CSS / SASS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          miniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      // PUG
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
        },
      },
      // IMAGES
      {
        test: /\.(ico|jpg|jpeg|png|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
