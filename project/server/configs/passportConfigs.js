const passport = new require('passport');

module.exports = (server) => {
    server
        .use(passport.initialize())
        .use(passport.session());
    // to bundle our user up ("упаковувати" користувача) into the session to store for later
    passport.serializeUser((user, done) => done(null, user._id));
    // pull user back out of the session
    passport.deserializeUser((id, done) =>
        require('../configs/db/db').User.findById(id, (error, user) => done(error, user)));
    require('./strategies/local.strategy')();
};

// В типичном веб-приложении, учетные данные, используемые для аутентификации пользователя будет передаваться только во время авторизации. Если все в порядке, и пользователь существует, то информация о нем сохраняется в сессию, а идентификатор сессии, в свою очередь, сохраняется в cookies браузера.

// Каждый последующий запрос будет содержать cookies, с помощью которого passport сможет опознать пользователя, и достать его данные из сессии. Для того, чтобы сохранять или доставать пользовательские данные из сессии, паспорт использует функции `passport.serializeUser()` и `passport.deserializeUser()`.