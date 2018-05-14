module.exports = () => {
    // Стратегия авторизации
    // LocalStrategy принимает 2 параметра: объект с опциями и middleware для верификации пользователя.
    new require('passport')
        .use(new (require('passport-local').Strategy)({
                usernameField: 'username',
                passwordField: 'password'
            },
            (username, password, done) =>
                require('../../configs/db/db').User.findOne({$or: [{username: username}, {mail: username}]}, (error, user) =>
                    error ?
                        done(error) :
                        user ?
                            require('../../helpers/sha512')(password, require('../process').serverSalt).passwordHash === user.password ?
                                done(null, user) :
                                done(null, false, {message: 'Incorrect password!!!'}) :
                            done(null, false, {message: 'Incorrect username or mail!!!'}))));
};