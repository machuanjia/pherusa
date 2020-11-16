/** @format */

const webpack = require('webpack')
const CracoLessPlugin = require('craco-less')
const path = require('path')
const pathResolve = pathUrl => path.join(__dirname, pathUrl)
const config = require('./server/config')

module.exports = {
    webpack: {
        plugins: [
            new webpack.DefinePlugin({
                APP_CONFIGRATION: JSON.stringify(config),
            }),
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
    },
    babel: {
        plugins: [
            ['import', { libraryName: 'antd', style: true }],
            ['@babel/plugin-proposal-decorators', { legacy: true }],
        ],
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                },
                cssLoaderOptions: {
                    modules: { localIdentName: '[local]_[hash:base64:5]' },
                },
            },
        },
    ],
    devServer: {
        port: config.env.port,
        proxy: {
            '/api': {
                target: 'http://localhost:' + config.env.port,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
}
