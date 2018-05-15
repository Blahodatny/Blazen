const express = new require("express");
const config = require('./process');
module.exports = (server) => {
    server
        .set('views', __dirname + '/../views')
        .set('view engine', 'ejs')
        .use(require('morgan')('dev'))
        .use(express.json())
        .use(express.urlencoded({extended: false}))
        .use(new require('cookie-parser')())
        .use('/public', express.static(__dirname + '/../public'))
        .use(express.static(__dirname + '/../.tmp'))
        .use(require('busboy-body-parser')({limit: '10mb'}));
    require('./bodyParser')(server);

    server
        .use(require('express-session')({
            secret: config.secret,
            resave: false,
            saveUninitialized: true,
            // cookie: { secure: true} // enable it before push on heroku cuz it is only for https
        }));
    require('./passportConfigs')(server);
};