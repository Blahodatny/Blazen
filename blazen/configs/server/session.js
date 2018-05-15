module.exports = (server) => {
    server
        .use(require('express-session')({
            secret: require('../process').secret,
            resave: false,
            saveUninitialized: true,
            // cookie: { secure: true} // enable it before push on heroku cuz it is only for https
        }));
    require('./passportConfigs')(server);
};