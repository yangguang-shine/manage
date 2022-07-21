const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CommonConfig = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const webpack = require('webpack')

const developmentConfig = merge(CommonConfig, {
    // 启用 webpack 本地服务
    devServer: {
        port: 7777, // 自定义修改8888端口,
        static: {
            directory: path.join(__dirname, '../dist/manage'),
            publicPath: '/manage/'
        },
        hot: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/manage/' },
                { from: /^\/manage/, to: '/manage/' },
              ]
        },
        open: true,
        host: "dev.jr.jd.com",
        // 代理跨域
        proxy: {
            "/api": {
                "target": "http://dev.jr.jd.com:9999",
                "changeOrigin": true
            }
        }
    },
    // 使用开发模式
    mode: 'development',
    // devtool: 'source-map',
    // 开发环境 loader 处理
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                "sideEffects": true
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
                "sideEffects": true

            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
                "sideEffects": true

            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({
            // Options...
          })
    ]
})
module.exports = developmentConfig