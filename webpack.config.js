const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, '/src')
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.(png|jpe?g)$/,
                use: [
                    'url-loader',
                ]
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '/dist'),
        hot: true,
        historyApiFallback: true
    },
    mode: 'development',
    devtool: 'cheap-module-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}