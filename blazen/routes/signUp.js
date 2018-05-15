const User = require('../configs/db/db').User;
const checkSigned = require('../helpers/middlewares').checkSigned;

module.exports = require('express').Router().all('*', checkSigned)
    .get('/', async (req, res) => {
        res.render('signUp');
    })

    .get('/users', async (req, res) => {
        console.log('Ajax request on /signup/users: ' + req.query.type + " " + req.query.value);
        if (req.query.type === 'username') {
            if (await User.findOne({username: req.query.value}))
                res.send("That username already exists!!!");
            else
                res.send('');
        }

        else if (req.query.type === 'mail') {
            if (await User.findOne({mail: req.query.value}))
                res.send("That mail has been taken!!!");
            else
                res.send('');
        }
    })

    .post('/', async (req, res) => {
        try {
            let user = await new User({
                name: req.body.givenName,
                familyName: req.body.familyName,
                username: req.body.username,
                mail: req.body.mail,
                password: require('../helpers/sha512')(req.body.password, require('../configs/process').serverSalt).passwordHash,
                role: 'user'
            }).save();
            console.log(`User created: ${user}`);
            req.login(user, () => {
                console.log("Logged in successfully!!");
                res.redirect('/drive');
            })
        }

        catch (error) {
            console.error(error);
        }
    });