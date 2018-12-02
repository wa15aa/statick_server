const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        'index': './dev/modules/pages/index.js',
        'share': './dev/modules/pages/share.js',
        '$': 'zepto'
    },
    output: {
        filename: 'js/[hash:5]_[name]_bundle.js',
        path: path.resolve(__dirname, 'dist/'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            chunks: ['index'],
            template: './dev/pages/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'share.html',
            inject: 'body',
            chunks: ['share'],
            template: './dev/pages/share.html'
        })
    ],
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ]
    },
    module: {
        rules: [{
                test: require.resolve('zepto'),
                use: ['exports-loader?window.Zepto', 'script-loader']
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    "css-loader", "sass-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]'
                        }
                    }

                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader:'html-withimg-loader'
                    },
                    {
                        loader: 'html-loader',
                        options: {
                            interpolate: true
                        }
                    }
                ],
            },
        ]
    }
};