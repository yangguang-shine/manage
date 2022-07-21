const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 构造出共享进程池，在进程池中包含5个子进程

module.exports = {

    // webpack 编译入口
    entry: {
        index: path.join(__dirname, '../src/main.js'),
        // vendor: ['react']
    },
    // webpack 编译出口
    output: {
        path: path.join(__dirname, '../dist/manage',),
        filename: '[name][id].js',
        publicPath: '/manage'
    },
    // webpack 模块处理
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, '../src')
                ],
                exclude: ['/node_modeles/'],
                use: [
                    'babel-loader'
                ],
            },
            {
                test: /\.(png|jpe?g)$/,
                use: [
                    'url-loader',
                ]
            },
        ]
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, '../src')
        }
    },
    // resolve: {
    //     alias: {
    //         jquery: './lib/jquery',
    //     },
    // },
    // webpack 公共插件
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', //打包后的文件名
            template: './public/index.html',
            chunks: ['index']
            // minify: {
            //     // 压缩HTML文件
            //     removeComments: true, // 移除HTML中的注释
            //     collapseWhitespace: true, // 删除空白符与换行符
            //     minifyCSS: true, // 压缩内联css
            // },
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common' // 指定公共 bundle 的名称。
        // })
    ]
}