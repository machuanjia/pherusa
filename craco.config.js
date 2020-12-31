/** @format */

const webpack = require('webpack')
const CracoLessPlugin = require('craco-less')
const path = require('path')
const pathResolve = pathUrl => path.join(__dirname, pathUrl)
const config = require('./server/config')
const modifiedTheme = {
  '@laiye-primary-color': '#2249c0',
  '@laiye-link-color': '#2249c0',
}

process.env.NODE_ENV === 'development' && (process.env.REACT_APP_CONFIGRATION = JSON.stringify(config))

module.exports = {
  webpack: {
    plugins: [
      // new webpack.DefinePlugin({
      //     APP_CONFIGRATION: JSON.stringify(config),
      // }),
    ],
    alias: {
      '@': pathResolve('src'),
      '@assets': pathResolve('src/assets'),
      '@apis': pathResolve('src/apis'),
      '@components': pathResolve('src/components'),
      '@constants': pathResolve('src/constants'),
      '@i18n': pathResolve('src/i18n'),
      '@layouts': pathResolve('src/layouts'),
      '@stores': pathResolve('src/stores'),
      '@styles': pathResolve('src/styles'),
      '@utils': pathResolve('src/utils'),
      '@views': pathResolve('src/views'),
      '@routes': pathResolve('src/routes'),
      '@entities': pathResolve('src/entities'),
    },
    configure: (webpackConfig, { env, paths }) => {
      paths.appBuild = 'dist'
      webpackConfig.output = {
        ...webpackConfig.output,
        path: path.resolve(__dirname, 'dist'),
      }
      return webpackConfig
    },
  },
  babel: {
    plugins: [
      ['import', { libraryName: 'laiye-antd', style: true }],
      [
        'import',
        {
          libraryName: '@antv/x6-react-components',
          libraryDirectory: 'es', // es or lib
          style: true,
          transformToDefaultImport: true,
        },
        'antv',
      ],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
    ],
  },
  plugins: [
    // This plugin takes care of the .less files
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: modifiedTheme,
          },
        },
      },
    },
    // This plugin take scare of the .less.module files
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule: function (lessRule, _context) {
          lessRule.test = /\.(less)$/
          lessRule.use = [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  modifyVars: modifiedTheme,
                  javascriptEnabled: true,
                },
              },
            },
          ]
          lessRule.exclude = /node_modules/
          return lessRule
        },
      },
    },
  ],
  devServer: {
    port: config.env.port,
    proxy: {
      '/api': {
        target: 'http://localhost:' + 3000,
        changeOrigin: true,
      },
    },
  },
}
