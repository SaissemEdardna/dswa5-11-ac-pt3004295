var express = require('express');
var bodyParser = require('body-parser');
var load = require('express-load');

// tirei o express de dentro do modue exports
var app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
//var GitHubStrategy = require('passport-github').Strategy;


module.exports = function() {


    app.set('port', process.env.PORT || 3000);

    //Middleware
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    //Definir Engine para a View
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(cookieParser());
    app.use(session(
        { secret: 'homem avestruz',
        resave: true,
        saveUninitialized: true
        }
    ));
    app.use(passport.initialize());
    app.use(passport.session());

    
    //Carregar pastas
    load('models', {cwd: 'app'})
    .then('controllers')
    .then('routes/auth.js')
    .then('routes')
    .into(app);

    return app;
};