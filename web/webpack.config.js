const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;
const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins');

const BUILD_DIR = path.resolve(__dirname, './build');
const HASH = Math.round(Date.now() / 1000).toString();

const extractSemver = (text) => {
  const version = [
    text.match(/:major:\s*(\d+)/)[1],
    text.match(/:minor:\s*(\d+)/)[1],
    text.match(/:patch:\s*(\d+)/)[1],
  ].join('.');

  return `v${version}`;
};

const isDevelopment = process.env.NODE_ENV === 'development';
const appVersion = extractSemver(fs.readFileSync('../.semver').toString());

module.exports = {
  mode: isDevelopment ? 'development' : 'production',

  bail: !isDevelopment,

  devtool: isDevelopment ? 'eval-cheap-module-source-map' : 'source-map',

  entry: {
    bundle: './src/index.tsx',
  },

  output: {
    path: BUILD_DIR,
    filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: '[id].[contenthash].js',
    globalObject: 'this',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: ['node_modules', __dirname],
  },

  module: {
    rules: [
      {
        test: /\.postcss$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
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
                localIdentName: isDevelopment
                  ? '[name]__[local]--[hash:base64:5]'
                  : '[hash:base64]',
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
        test: /swagger-ui\.css$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
        ],
      },

      {
        test: /\.(css|sass|scss|pcss)$/,
        exclude: /swagger-ui\.css$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },

      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },

      {
        test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
      },
    ],
  },

  optimization: {
    moduleIds: isDevelopment ? 'named' : 'deterministic',
    chunkIds: isDevelopment ? 'named' : 'deterministic',
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'style',
          test: /\.(css|sass|scss|pcss)$/,
          chunks: 'all',
          enforce: true,
        },
        common: {
          name: 'common',
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
        },
      },
    },
    minimize: !isDevelopment,
    minimizer: !isDevelopment ? [`...`, new CssMinimizerPlugin()] : undefined,
  },

  plugins: [
    process.env.ANALYZE && new StatoscopeWebpackPlugin(),

    !isDevelopment &&
      new CopyWebpackPlugin({
        patterns: [{ from: 'public' }],
      }),

    !isDevelopment &&
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
        ignoreOrder: true,
      }),

    process.env.REACT_APP_BUGSNAG_KEY &&
      new BugsnagSourceMapUploaderPlugin({
        apiKey: process.env.REACT_APP_BUGSNAG_KEY,
        appVersion,
        overwrite: true,
      }),

    new webpack.EnvironmentPlugin({
      MOCK: false,
      BUILD_EXPIRE: null,
      HASH,
      REACT_APP_BUGSNAG_KEY: null,
      REACT_APP_BUGSNAG_VERSION: appVersion,
      REACT_APP_RELEASE_STAGE: 'development',
    }),

    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),

    new LodashWebpackPlugin({ shorthands: true, flattening: true }),

    new HtmlWebpackPlugin({
      template: './src/app/template.html',
      hash: true,
      chunks: ['common', 'bundle', 'styles'],
    }),

    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ].filter(Boolean),

  devServer: isDevelopment
    ? {
        compress: false,
        host: 'localhost',
        port: process.env.PORT ?? 3000,
        historyApiFallback: true,
        hot: true,
        proxy: process.env.PROXY_HOST
          ? {
              '/api/v2/ranger': {
                target: `wss://${process.env.PROXY_HOST}`,
                changeOrigin: true,
                ws: true,
                onProxyReqWs: (proxyReq, _, socket) => {
                  proxyReq.removeHeader('origin');
                  proxyReq.setHeader('origin', `https://${process.env.PROXY_HOST}`);
                  socket.on('error', (error) => {
                    console.error(error);
                  });
                },
              },
              '/api': {
                target: `https://${process.env.PROXY_HOST}`,
                changeOrigin: true,
              },
            }
          : undefined,
      }
    : undefined,

  stats: {
    children: !isDevelopment,
  },
};
