module.exports = {
    checkAuthenticated(req, res, next) {
        req.session.lastUrl = req.originalUrl || '/'
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect("/login");
    },

    checkAuthenticatedPost(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect("/login");
    },

    checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect(req.session.lastUrl);
        }
        next();
    },

    checkSeller(req, res, next) {
        if (req.user && req.user.isSeller == 1) {
            return next();
        }
        return res.redirect(req.session.lastUrl)
    }
}