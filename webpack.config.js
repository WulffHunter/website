const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pages = [
  'index',
  'about-me',
  'about-site',
  'contact-me',
  'programming',
];

module.exports = {
  entry: './src/',
  output: {
    filename: 'main.[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif|bmp)$/,
        use: [
          'file-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader,
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: true,
            },
          },
          
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [
              // All default supported tags and attributes
              '...',
              {
                // Tag name
                tag: 'a',
                // Attribute name
                attribute: 'href',
                // Type of processing, can be `src` or `scrset`
                type: 'src',
                filter: (_tag, attribute, attributes, _resourcePath) => {
                  // The `tag` argument contains a name of the HTML tag.
                  // The `attribute` argument contains a name of the HTML attribute.
                  // The `attributes` argument contains all attributes of the tag.
                  // The `resourcePath` argument contains a path to the loaded HTML file.

                  if (/\.html$/.test(attributes.href)) {
                    return false;
                  }

                  return true;
                },
              },
            ]
          },
        }
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css"
    })
  ].concat(pages.map(
    page => new HtmlWebpackPlugin({
      template: `src/${page}.html`,
      // minify: {
      //   collapseWhitespace: true,
      //   removeComments: true,
      // },
      filename: `${page}.html`,
    })
  ))
};