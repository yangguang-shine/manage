const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CommonConfig = require('./webpack.common.js')
const path = require('path')
const PurifyCssWebpack = require('purifycss-webpack') // 引入PurifyCssWebpack插件
const glob = require('glob') // 引入glob模块,用于扫描全部html文件中所引用的css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin") // 压缩css代码
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const TerserPlugin = require('terser-webpack-plugin') // 压缩js代码
const webpack = require('webpack')
const BundleAnalyzerPlugin   = require('webpack-bundle-analyzer').BundleAnalyzerPlugin 

// const CompressionPlugin = require('compression-webpack-plugin') // gzip压缩

const productionConfig = merge(CommonConfig, {
    // webpack 生产模式
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // options: {
                        //   publicPath: '../',
                        // },
                    },
                    'css-loader',
                    // 'postcss-loader',
                    // 'less-loader',
                ],
            },
        ]
    },

    optimization: {
        splitChunks: {
            chunks: "all", // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
            minSize: 30000, // 模块超过30k自动被抽离成公共模块
            minChunks: 1, // 模块被引用>=1次，便分割
            maxAsyncRequests: 5,  // 异步加载chunk的并发请求数量<=5
            maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
            name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
        },
        minimizer: [
            // 压缩css
            new OptimizeCSSAssetsPlugin({}),
            new TerserPlugin({
                parallel: 4, // 开启几个进程来处理压缩，默认是 os.cpus().length - 1
                cache: true, // 是否缓存
                sourceMap: false,
            }),
        ],

    },
    // webpack 生产模式插件
    plugins: [
        // new CleanWebpackPlugin({
        //     cleanOnceBeforeBuildPatterns: [`${path.join(__dirname, '../dist')}`]
        // })
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[id].[contenthash:8].css',
        }),
        new ParallelUglifyPlugin({
            //cacheDir 用于配置缓存存放的目录路径。
            cacheDir: '.cache/',
            sourceMap: true,
            uglifyJS: {
                output: {
                    comments: false,
                },
                // compress: {
                //     warnings: false,
                // },
            },
        }),
        new PurifyCssWebpack({
            paths: glob.sync(path.join(__dirname, '../public/*.html')),
        }),
        // new CompressionPlugin({
        //     // gzip压缩配置
        //     test: /\.js$|\.html$|\.css/, // 匹配文件名
        //     threshold: 10240, // 对超过10kb的数据进行压缩
        //     deleteOriginalAssets: false, // 是否删除原文件
        // }),
        new BundleAnalyzerPlugin()
    ]
})
console.log('production config')
console.log(productionConfig)
module.exports = productionConfig