const express = new require("express");
module.exports = (server) => {
    server
        .set('views', __dirname + '/../../views')
        .set('view engine', 'ejs')
        .use(require('morgan')('dev'))
        .use(express.json())
        .use(express.urlencoded({extended: false}))
        .use(new require('cookie-parser')())
        .use('/public', express.static(__dirname + '/../../public'))
        .use(express.static(__dirname + '/../../.tmp'))
        .use(require('busboy-body-parser')({limit: '10mb'}));
    require('./bodyParser')(server);
    require('./session')(server);
};