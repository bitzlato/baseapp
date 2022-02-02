const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const deps = require('./package.json').dependencies;

const BUILD_DIR = path.resolve(__dirname, './build');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',

  bail: !isDevelopment,

  devtool: isDevelopment ? 'eval-cheap-module-source-map' : 'hidden-source-map',

  entry: './src/index.ts',

  output: {
    path: BUILD_DIR,
    publicPath: 'auto',
    filename: !isDevelopment ? '[name].[contenthash].js' : undefined,
    chunkFilename: !isDevelopment ? '[id].[contenthash].js' : undefined,
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

      {
        test: /\.vanilla\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
        ],
      },

      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
    ],
  },

  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },

  plugins: [
    new VanillaExtractPlugin(),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
    }),
    new ModuleFederationPlugin({
      name: 'shared',
      filename: 'shared.js',
      exposes: {
        './Header': './src/Header',
        './Footer': './src/Footer',
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
    isDevelopment &&
      new HtmlWebpackPlugin({
        template: './public/index.html',
        chunks: ['main'],
      }),
    isDevelopment &&
      new ReactRefreshWebpackPlugin({
        exclude: [/node_modules/, /bootstrap\.js$/],
      }),
  ].filter(Boolean),

  devServer: {
    port: 3001,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
};
