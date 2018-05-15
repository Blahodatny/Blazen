module.exports = (new require('express')).Router()
    .use('/', require('./main'))
    .use('/signup', require('./signUp'))
    .use('/login', require('./login'))
    .use('/drive', require('./drive'));