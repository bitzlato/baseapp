import { ExtendedAPIPlugin, EnvironmentPlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import merge from 'webpack-merge';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import path from 'path';
import { readFileSync } from 'fs';
import CopyWebpackPlugin from 'copy-webpack-plugin';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
import { BugsnagSourceMapUploaderPlugin } from 'webpack-bugsnag-plugins';

const rootDir = path.resolve(__dirname, '..');
const BUILD_DIR = path.resolve(rootDir, 'build');

import commonConfig from './common';
import { extractSemver } from './semver';

const HASH = Math.round(Date.now() / 1000).toString();
const domain = process.env.BUILD_DOMAIN ? process.env.BUILD_DOMAIN.split(',') : [];
const appVersion = extractSemver(readFileSync('../.semver').toString());

const plugins = [
  new ExtendedAPIPlugin(),
  new EnvironmentPlugin({
    BUILD_EXPIRE: null,
    REACT_APP_BUGSNAG_KEY: null,
    REACT_APP_BUGSNAG_VERSION: appVersion,
    REACT_APP_RELEASE_STAGE: 'development',
    HASH,
  }),
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: ['default', { discardComments: { removeAll: true } }],
    },
    canPrint: false,
  }),
  new CopyWebpackPlugin({
    patterns: [{ from: 'public' }],
  }),
];

if (process.env.ANALYZE === '1') {
  plugins.push(new BundleAnalyzerPlugin());
}

if (process.env.REACT_APP_BUGSNAG_KEY) {
  plugins.push(
    new BugsnagSourceMapUploaderPlugin({
      apiKey: process.env.REACT_APP_BUGSNAG_KEY,
      appVersion,
      overwrite: true,
    }),
  );
}

const config = merge(commonConfig, {
  devtool: 'source-map',
  mode: 'production',
  output: {
    path: BUILD_DIR,
    filename: '[name].[hash].js',
    globalObject: 'this',
    publicPath: '/',
  },
  optimization: {
    usedExports: false,
    minimize: true,
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.postcss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'dts-css-modules-loader',
            options: {
              namedExport: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[hash:base64]',
                exportLocalsConvention: 'camelCaseOnly',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      stage: 1,
                      features: {
                        'nesting-rules': false,
                      },
                      importFrom: ['src/styles/mediaQueries.css'],
                    },
                  ],
                  'postcss-nested',
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(css|sass|scss|pcss)$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },

      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  stats: {
    children: false,
  },
});

// eslint-disable-next-line import/no-default-export
export default config;
