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
            directory: path.join(__dirname, '/dist'),
        },
        // hot: true,
        historyApiFallback: true,
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
    // 开发环境 loader 处理
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
        ]
    },
    // 使用 source-map
    devtool: 'cheap-module-source-map',

    // webpack 开发模式插件
    plugins: [
    ]
})
console.log('development config')
console.log(developmentConfig)
module.exports = developmentConfig