module.exports = {
    checkAuth: (req, res, next) => {
        if (!req.user) return res.redirect('/login');
        next();
    },

    checkSigned: (req, res, next) => {
        if (req.user) return res.redirect('/drive');
        next();
    }
};