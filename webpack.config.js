var path = require("path");
var webpack = require("webpack");

module.exports = {
	devtool: false,
	entry: {
		'vhp': ['./src/vhp/index.js'],
		'vue-html5plus': ['./src/index.js']
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{test: /\.js$/, loader: "babel"}
  	]
	},
	plugins: [
		new webpack.BannerPlugin("vhp v0.0.5 (https://github.com/zhaomenghuan/vue-html5plus)"),
    // new webpack.HotModuleReplacementPlugin()
		new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
