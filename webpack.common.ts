import * as path from 'path';
import type { Configuration } from 'webpack';
// import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

// ES6 imports do not work without esModuleInterop=true
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// const ESLintPlugin = require("eslint-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = process.env.NODE_ENV === 'production';
export const commonWebpackConfiguration: Configuration = {
    entry: {
      '15_todo': './src/15_todo/index.ts',
      '01_drum_kit': './src/01_drum_kit/index.ts',
      '16_mouse_move': './src/16_mouse_move/index.ts',
    },
    optimization: {
      usedExports: true
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'demo'),
      clean: true,
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
              isProduction
                ? MiniCssExtractPlugin.loader
                : 'style-loader',
              'css-loader',
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: isProduction ? false : true,
                }
              }
            ]
          },
          {
            test: /\.(png|mp3)$/,
            type: 'asset/resource',
          },
          {
            test: /\.html/,
            use: ['html-loader'],
          },
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    plugins: [
      // new CleanWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new ESLintPlugin({
          extensions: ['.ts', '.js'],
          exclude: 'node_modules'
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].css',
      }),
      new HtmlWebpackPlugin({
        filename: 'todo.html',
        template: 'src/15_todo/index.html',
        chunks: ['15_todo'],
      }),
      new HtmlWebpackPlugin({
        filename: 'drum-kit.html',
        template: 'src/01_drum_kit/index.html',
        chunks: ['01_drum_kit'],
      }),
      new HtmlWebpackPlugin({
        filename: 'mouse-move.html',
        template: 'src/16_mouse_move/index.html',
        chunks: ['16_mouse_move'],
      }),
  ],
}