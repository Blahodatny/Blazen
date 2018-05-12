const bodyParser = require("body-parser");
module.exports = (server) =>
    server
        .use(bodyParser.json({limit: '50mb'}))
        .use(bodyParser.urlencoded({limit: '50mb', extended: true}));