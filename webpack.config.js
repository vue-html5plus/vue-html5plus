const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue|js$/,
                enforce: 'pre',
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        formatter: require('eslint-friendly-formatter')
                    }
                }]
            },
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, 'src')
        },
        extensions: ['.js', '.json', '.vue', '.css']
    },
    performance: {
        hints: false
    }
};

if (process.env.NODE_ENV === 'development') {
    module.exports = Object.assign(module.exports, {
        entry: {
            'app': './example/main.js',
            'vue-html5plus': './src/index.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name].js',
            publicPath: '/'
        },
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'index.html',
                inject: true
            }),
            new webpack.HotModuleReplacementPlugin()
        ]
    })
}

if (process.env.NODE_ENV === 'production') {
    module.exports = Object.assign(module.exports, {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'lib'),
            filename: 'vue-html5plus.js'
        },
        plugins: [
            new webpack.BannerPlugin("vue-html5plus v1.0.0 (https://github.com/zhaomenghuan/vue-html5plus)"),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
                compress: {
                    warnings: false
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
        ]
    })
}