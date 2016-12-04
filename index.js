var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require("./webpack.config.js");

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
	hot: true,
	proxy: {
	 	"*": "http://localhost:3000"
 	},
	watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
	stats: {
		colors: true
	}
});

server.listen(3000);
