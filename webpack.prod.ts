import type { Configuration } from "webpack";
import { merge } from "webpack-merge";
import { commonWebpackConfiguration } from './webpack.common';

const devWebpackConfiguration: Configuration = merge(commonWebpackConfiguration, {
  mode: 'production',
});

export default devWebpackConfiguration