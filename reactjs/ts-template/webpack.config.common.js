const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const nodeEnv = process.env.NODE_ENV;

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    // Remove your build folder(s) before building
    new CleanWebpackPlugin(),

    // Automatically generate an HTML5 file for you that includes all your webpack bundles
    new HtmlWebpackPlugin({
      title: 'Weather Forecast',
      favicon: './src/favicon.ico',
      template: './src/index.html',
    }),

    // Create global constants which can be configured at compile time
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
      'process.env.SENTRY_DSN': JSON.stringify(process.env.SENTRY_DSN),
      'process.env.VERSION': JSON.stringify(process.env.npm_package_version),
      'process.env.ENVIRONMENT': JSON.stringify(process.env.ENVIRONMENT),
      'process.env.LOG_LEVEL': JSON.stringify(process.env.LOG_LEVEL),
    }),
  ],
  module: {
    rules: [
      // load typescript file
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
      },
      // load css file
      {
        // test: /\.(sa|sc|c)ss$/,
        test: /\.css$/,
        use: [
          // extract CSS into separate files
          nodeEnv === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
