var express = require('express');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 3000;

if(process.env.NODE_ENV !== 'production') {
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpack = require('webpack');
    var config = require('./webpack.config');
    var compiler = webpack(config);
  
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(request, response){
	response.sendFile(__dirname + '/build/index.html');
});

app.listen(PORT, function(error){
	if(error){
		console.log(error);
	}else{
		console.log("==> Listening on port %s. Visit http://localhost:%s in your browser.", PORT, PORT);
	}	
});