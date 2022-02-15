const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');

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
    filename: !isDevelopment ? '[name].[contenthash:8].js' : undefined,
    chunkFilename: !isDevelopment ? 'docs.[id].[contenthash:8].js' : undefined,
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    fallback: {
      buffer: require.resolve('buffer/'),
      events: require.resolve('events/'),
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url/'),
    },
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
    ],
  },

  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },

  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),

    new MiniCssExtractPlugin({
      ignoreOrder: true,
    }),

    new ModuleFederationPlugin({
      name: 'marketDocs',
      filename: 'marketDocs.js',
      exposes: {
        './Swagger': './src/Swagger',
        './WebSocketApi': './src/WebSocketApi',
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
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),

  devServer: {
    port: 3004,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
};
