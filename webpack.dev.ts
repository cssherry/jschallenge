import type { Configuration } from "webpack";
import { merge } from "webpack-merge";
import { commonWebpackConfiguration } from './webpack.common';

const devWebpackConfiguration: Configuration = merge(commonWebpackConfiguration, {
  mode: 'development',
  devtool: 'source-map',
});

export default devWebpackConfiguration