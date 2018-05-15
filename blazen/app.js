const config = require('./configs/process');
require('./configs/db/db').config(config.url, config.cloud_name, config.api_key, config.api_secret);
const listen = require('./configs/listen');

const server = new require("express")();
require('./configs/server/initial')(server);

const port = listen.normalizePort(config.port);

server
    .use('/', require('./routes'))
    .use((req, res, next) => {
        next(require('http-errors')(404)) // catch 404 and forward to error handler
    })
    .use((err, req, res) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    })
    .set('port', port);

const app = require('http').createServer(server)
    .listen(port, () => console.log(`Started on port ${port}!`))
    .on('error', listen.onError)
    .on('listening', () => listen.onListening(app.address()));

// remarkable - чудовий
// versatile - різносторонній