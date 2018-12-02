
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
module.exports = merge(common,{
    devServer: {
        contentBase: './dist',
        compress: false,
        port: 3001,
        hot:true
    },
    output:{
        publicPath: ''
    },
    mode: 'development',
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/,
        poll: 1000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});