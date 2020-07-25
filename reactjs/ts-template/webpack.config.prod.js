require('dotenv').config();
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.config.common.js');

const ASSET_PATH = process.env.CDN_BASE_URL || '/';

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    filename: '[chunkhash].js',
    publicPath: ASSET_PATH,
    sourceMapFilename: '[file].map',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({ sourceMap: true }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          },
        },
      }),
    ],
  },
  plugins: [
    // Extract css from the bundle into a separate file.
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
});
