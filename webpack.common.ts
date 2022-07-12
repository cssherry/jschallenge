import * as path from 'path';
import type { Configuration } from 'webpack';
import { CleanWebpackPlugin } from "clean-webpack-plugin";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

export const commonWebpackConfiguration: Configuration = {
    entry: {
      '15_todo': './src/15_todo/index.ts'
    },
    optimization: {
      usedExports: true
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'ts-loader',
              options: {
                // disable type checker - we will use it in fork plugin
                transpileOnly: true
              }
            }
        },
        {
            test: /\.(scss|css)$/,
            use: [
              process.env.NODE_ENV !== 'production'
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: process.env.NODE_ENV === 'production' ? false : true,
                }
              }
            ]
          },
      ]
    },
    resolve: {
      extensions: ['.ts']
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: '[name].html',
        template: 'src/[name]/index.html',
      }),
      new ForkTsCheckerWebpackPlugin(),
      new ESLintPlugin({
          extensions: ['.tsx', '.ts', '.js'],
          exclude: 'node_modules'
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].css',
      }),
  ],
}