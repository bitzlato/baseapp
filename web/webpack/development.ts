import { HotModuleReplacementPlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import merge from 'webpack-merge';
import 'webpack-dev-server';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import commonConfig from './common';
const rootDir = path.resolve(__dirname, '..');
const host = process.env.PROXY_HOST;

const config = merge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({}),
        new HtmlWebpackPlugin({
            template: path.resolve(rootDir, 'src/app/template.html'),
            hash: true,
            chunks: ['common', 'bundle', 'styles'],
            mock: process.env.MOCK,
        }),
    ],
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
                    'cache-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.(tsx|ts)?$/,
                use: [
                    'cache-loader',
                    {
                        loader: 'thread-loader',
                        options: {
                            poolTimeout: Infinity,
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            happyPackMode: true,
                        },
                    },
                ],
                exclude: /node_modules/,
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
                      onProxyReqWs: (proxyReq, req, socket) => {
                          socket.on('error', error => {});
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
