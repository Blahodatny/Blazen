const User = require('../configs/db/db').User;
const checkSigned = require('../helpers/middlewares').checkSigned;

module.exports = require('express').Router().all('*', checkSigned)
    .get('/', async (req, res) => {
        res.render('logIn');
    })

    .get('/info', async (req, res) => {
        console.log('Ajax request on /login/info: ' + req.query.value);
        if (await User.findOne({$or: [{username: req.query.value}, {mail: req.query.value}]}))
            res.send('');
        else
            res.send('There are no user with such username or mail!!!')
    })

    .get('/password', async (req, res) => {
        console.log('Ajax request on /login/password: ' + req.query.value);
        if (await User.findOne({password: await require('../helpers/sha512')(req.query.value, require('../configs/process').serverSalt).passwordHash}))
            res.send('');
        else
            res.send('Password is wrong!!!')
    })

    .post('/', async (req, res, next) => {
        new require('passport').authenticate('local', (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                console.log('Error while log in: ' + info.message);
                return res.render('logIn');
            }
            req.login(user, () => {
                if (err) return next(err);
                console.log("Signed in successfully!!");
                res.redirect('/drive');
            });
        })(req, res, next);
    });