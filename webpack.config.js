const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pages = [
  'index',
  'about-me',
  'about-site',
  'contact-me',
];

module.exports = {
  entry: './src/',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ].concat(pages.map(
    page => new HtmlWebpackPlugin({
      template: `src/${page}.html`,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
      filename: `${page}.html`,
    })
  ))
};