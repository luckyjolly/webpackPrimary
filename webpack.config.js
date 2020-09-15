const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const config = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
      {
        // sass-loader node-sass两个依赖都需要安装
        test: /\.(scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5120
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  devServer: {
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),//访问的index.html可能是HtmlWebpackPlugin插件产生的index.html
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '/assets'),
          to: 'assets'
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
      chunkFilename: '[id].css'
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin(), new OptimizeCssAssetsWebpackPlugin()]
  }
}

module.exports = config