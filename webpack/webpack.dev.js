const Path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CommonConfig = require('./webpack.common.js')
const { merge } = require('webpack-merge')
const webpack = require('webpack')

const developmentConfig = merge(CommonConfig, {
    // 启用 webpack 本地服务
    devServer: {
        contentBase: Path.join(__dirname, '/dist'),
        hot: true,
        historyApiFallback: true
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
        ]
    },
    // 使用 source-map
    devtool: 'cheap-module-source-map',

    // webpack 开发模式插件
    plugins: [
        // 热模块替换
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': 'This Is The Test Text.',
        // }),

    ]
})
console.log('development config')
console.log(developmentConfig)
module.exports = developmentConfig