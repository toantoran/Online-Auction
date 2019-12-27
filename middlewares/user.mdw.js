module.exports = {
    checkAuthenticated(req, res, next) {
        req.session.lastUrl = req.originalUrl
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
        req.session.lastUrl = req.originalUrl;
        if (req.isAuthenticated() && req.user.isSeller) {
            return next();
        }

        res.redirect("/login");
    },

    checkAdmin(req, res, next) {
        req.session.lastUrl = req.originalUrl;
        if (req.isAuthenticated()) {
            if (req.user.isAdmin) {
                return next();
            } else {
                res.redirect("/non-permission")
            }
        } else {
            res.redirect("/login");
        }
    }
}