const path = require("path");
const webpack = require("webpack");

module.exports = {
    devtool: false,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'vue-html5plus.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: "babel-loader"}
        ]
    },
    plugins: [
        new webpack.BannerPlugin("vue-html5plus v0.0.5 (https://github.com/zhaomenghuan/vue-html5plus)"),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    devServer: {
        inline: true,
        hot: true
    }
};
