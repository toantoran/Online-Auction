module.exports = {
     checkAuthenticated(req, res, next) {
        req.session.lastUrl = req.originalUrl;
        console.log(req.session.lastUrl);
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
     }
 }