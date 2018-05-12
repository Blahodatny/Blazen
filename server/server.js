const config = require('./configs/process');
require('./configs/db/db').config(config.url, config.cloud_name, config.api_key, config.api_secret);
const express = new require("express");

const server = express();

server
    .set('views', __dirname + "/../app")
    .set('view engine', 'ejs')
    .use('/public', express.static(__dirname + '/../public'))
    .use(express.static(__dirname + '/../.tmp'))
    .use(require('busboy-body-parser')({limit: '10mb'}));
require('./configs/bodyParser')(server);

server
    .use(new require('cookie-parser')())
    .use(require('express-session')({
        secret: config.secret,
        resave: false,
        saveUninitialized: true,
        // cookie: { secure: true} // enable it before push on heroku cuz it is only for https
    }));
require('./configs/passportConfigs')(server);
server
    .use('/', require('./routes'))
    .listen(config.port, () => console.log(`Started on port ${config.port}!`));
// remarkable - чудовий
// versatile - різносторонній