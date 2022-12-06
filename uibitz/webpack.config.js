const path = require('path');
const { DefinePlugin } = require('webpack');
const { ModuleFederationPlugin } = require('webpack').container;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');

const { version } = require('../package.json');
const { dependencies: deps } = require('./package.json');

const BUILD_DIR = path.resolve(__dirname, './build');

const isDevelopment = process.env.NODE_ENV !== 'production';

const DEV_MAIN_URL = 'http://localhost:8080/';

class AddConfigParamsPlugin {
  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    compiler.hooks.compilation.tap('AddConfigParamsPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        'AddConfigParamsPlugin',
        (data, cb) => {
          // eslint-disable-next-line no-param-reassign
          data.assets.js[0] = `${data.assets.js[0]}?mainUrl=${DEV_MAIN_URL}`;

          cb(null, data);
        },
      );
    });
  }
}

module.exports = {
  mode: isDevelopment ? 'development' : 'production',

  bail: !isDevelopment,

  devtool: isDevelopment ? 'eval-cheap-module-source-map' : 'hidden-source-map',

  entry: './src/index.ts',

  output: {
    path: BUILD_DIR,
    publicPath: 'auto',
    filename: !isDevelopment ? 'uibitz.js' : undefined,
    chunkFilename: !isDevelopment ? '[id].[contenthash:8].js' : undefined,
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            env: {
              mode: 'usage',
              coreJs: 3,
            },
            jsc: {
              target: 'es2015',
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                  development: isDevelopment,
                  refresh: isDevelopment,
                },
              },
            },
          },
        },
      },
    ],
  },

  plugins: [
    new DefinePlugin({
      VERSION: JSON.stringify(version),
    }),
    new ModuleFederationPlugin({
      name: 'uibitz',
      remotes: {
        shared: 'shared@[window.UIBITZ_MAIN_URL]/basestatic/shared.js?[Date.now()]',
      },
      shared: {
        react: {
          requiredVersion: deps.react,
          singleton: true,
        },
        'react-dom': {
          requiredVersion: deps['react-dom'],
          singleton: true,
        },
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    isDevelopment &&
      new HtmlWebpackPlugin({
        template: './src/template.html',
      }),
    isDevelopment && new AddConfigParamsPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),

  devServer: {
    port: 3005,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
};
