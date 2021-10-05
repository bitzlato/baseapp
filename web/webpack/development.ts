import { HotModuleReplacementPlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import merge from 'webpack-merge';
import 'webpack-dev-server';
import commonConfig from './common';

const host = process.env.PROXY_HOST;

const config = merge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  plugins: [new HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.postcss$/,
        use: [
          'style-loader',
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
                localIdentName: '[name]__[local]--[hash:base64:5]',
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
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
  devServer: {
    contentBase: path.join(__dirname, '../public'),
    compress: false,
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
    historyApiFallback: true,
    stats: {
      children: false,
    },
    hot: true,
    proxy: host
      ? {
          '/api/v2/ranger': {
            target: `wss://${host}`,
            changeOrigin: true,
            ws: true,
            onProxyReqWs: (proxyReq, _, socket) => {
              proxyReq.removeHeader('origin');
              proxyReq.setHeader('origin', `https://${host}`);
              socket.on('error', (error) => {});
            },
          },
          '/api': {
            target: `https://${host}`,
            changeOrigin: true,
          },
        }
      : undefined,
  },
});

// eslint-disable-next-line import/no-default-export
export default config;
