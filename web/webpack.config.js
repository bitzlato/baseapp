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
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');

const deps = require('./package.json').dependencies;

const BUILD_DIR = path.resolve(__dirname, './build');
const SVGR_DIR = path.resolve(__dirname, './src/assets/svg');
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
const releaseStage = process.env.REACT_APP_RELEASE_STAGE ?? 'development';

let marketDocsUrl = isDevelopment ? 'http://localhost:3004' : '/marketDocs'; // production or staging
if (process.env.MARKET_DOCS_URL) {
  marketDocsUrl = process.env.MARKET_DOCS_URL; // e.g. http://localhost:3004
} else if (process.env.PROXY_HOST) {
  marketDocsUrl = `https://${process.env.PROXY_HOST}/marketDocs`; // for proxing
}

/** @type {webpack.WebpackOptionsNormalized} */
module.exports = {
  mode: isDevelopment ? 'development' : 'production',

  bail: !isDevelopment,

  devtool: isDevelopment ? 'eval-cheap-module-source-map' : 'hidden-source-map',

  entry: {
    bundle: './src/index.ts',
  },

  output: {
    path: BUILD_DIR,
    filename: !isDevelopment ? '[name].[contenthash].js' : undefined,
    chunkFilename: '[id].[contenthash].js',
    globalObject: 'this',
    publicPath: 'auto',
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    fallback: {
      buffer: require.resolve('buffer/'),
      events: require.resolve('events/'),
    },
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
                exportGlobals: true,
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
                    require.resolve('postcss-preset-env'),
                    {
                      stage: 1,
                      features: {
                        'nesting-rules': false,
                      },
                      importFrom: ['src/styles/mediaQueries.css'],
                    },
                  ],
                  require.resolve('postcss-nested'),
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
          loader: 'swc-loader',
          options: {
            env: {
              mode: 'entry',
              coreJs: 3,
            },
            jsc: {
              target: 'es2015',
              parser: {
                syntax: 'typescript',
                tsx: true,
                decorators: false,
                dynamicImport: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      },

      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        include: [SVGR_DIR],
        use: ['@svgr/webpack'],
      },

      {
        test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
        exclude: [SVGR_DIR],
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
    minimize: !isDevelopment,
    minimizer: !isDevelopment ? [`...`, new CssMinimizerPlugin()] : undefined,
  },

  plugins: [
    process.env.ANALYZE &&
      new StatoscopeWebpackPlugin({
        name: 'baseapp',
        saveStatsTo: 'statoscope-reports/stats-[name]-[hash].json',
      }),

    !isDevelopment &&
      new CopyWebpackPlugin({
        patterns: [{ from: 'public' }],
      }),

    new VanillaExtractPlugin(),

    !isDevelopment &&
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
        ignoreOrder: true,
      }),

    process.env.REACT_APP_BUGSNAG_KEY &&
      releaseStage === 'production' &&
      new BugsnagSourceMapUploaderPlugin({
        apiKey: process.env.REACT_APP_BUGSNAG_KEY,
        appVersion,
        overwrite: true,
        publicPath: 'https://market.bitzlato.com/',
      }),

    new webpack.EnvironmentPlugin({
      MOCK: false,
      BUILD_EXPIRE: null,
      HASH,
      REACT_APP_BUGSNAG_KEY: null,
      REACT_APP_BUGSNAG_VERSION: appVersion,
      REACT_APP_RELEASE_STAGE: 'development',
      REACT_APP_GIT_SHA: null,
    }),

    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),

    new LodashWebpackPlugin({ shorthands: true, flattening: true }),

    new HtmlWebpackPlugin({
      template: './src/app/template.html',
      hash: true,
    }),

    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),

    new webpack.container.ModuleFederationPlugin({
      name: 'shared',
      filename: 'shared.js',
      remotes: {
        marketDocs: `marketDocs@${marketDocsUrl}/marketDocs.js`,
      },
      exposes: {
        './Header': './src/components/shared/Header/Header',
        './Footer': './src/components/shared/Footer/Footer',
        './Box': './src/components/ui/Box',
        './Heading': './src/components/ui/Heading',
        './Stack': './src/components/ui/Stack',
        './Text': './src/components/ui/Text',
        './getThemeClassName': './src/theme/getThemeClassName',
      },
      shared: {
        react: { requiredVersion: deps.react, singleton: true },
        'react-dom': { requiredVersion: deps['react-dom'], singleton: true },
      },
    }),
  ].filter(Boolean),

  devServer: isDevelopment
    ? {
        compress: false,
        host: process.env.HOST ?? 'localhost',
        port: process.env.PORT ?? 8080,
        historyApiFallback: true,
        hot: true,
        proxy: process.env.PROXY_HOST
          ? {
              '/api/v2/ranger': {
                target: `wss://${process.env.PROXY_HOST}`,
                changeOrigin: true,
                ws: true,
                headers: { Connection: 'keep-alive' },
                onProxyReqWs: (proxyReq, _, socket) => {
                  proxyReq.removeHeader('origin');
                  proxyReq.setHeader('origin', `https://${process.env.PROXY_HOST}`);
                  socket.on('error', (error) => {
                    console.error(error);
                  });
                },
              },
              '/api/private/v1/': {
                target: `https://${process.env.ACCOUNT_HOST}`,
                changeOrigin: true,
                cookieDomainRewrite: 'localhost',
              },
              '/api': {
                target: `https://${process.env.PROXY_HOST}`,
                changeOrigin: true,
                cookieDomainRewrite: 'localhost',
              },
            }
          : undefined,
      }
    : undefined,
};
