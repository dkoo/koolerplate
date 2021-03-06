var path = require('path');
var webpack = require('webpack-stream');

module.exports = {
	entry: './app/js/main.js',
	output: {
		path: path.resolve(__dirname, 'compiled'),
		filename: 'main.bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	stats: {
		colors: true
	},
	devtool: 'source-map'
};