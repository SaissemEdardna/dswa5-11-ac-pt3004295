var http = require('http');
var express = require('./config/express');
//var app = express();
var app = require('./config/express')();
require('./config/passport')();

const url = 'mongodb+srv://dswa5:N2XaoyQ16MnCEeEL@cluster0.ircvu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
require('./config/database.js')(url);
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express Server escutando na porta ' + app.get('port'));
});

