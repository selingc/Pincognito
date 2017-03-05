var path = require('path');

module.exports = {
	entry: __dirname + '/src/index.js',
	output: {
		path: path.join(__dirname, '/build'),
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react'],
					plugins: ['transform-class-properties']
				}
			},
			{
				test: /\.css$/,
				loaders: ['style', 'css']
			}
		]
	},
	resolve: {
		extensions: ['', '.js']
	}
}