module.exports = require('express').Router().get('/', async (req, res) => {
    res.render('index');
});