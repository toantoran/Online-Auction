const passportfb = require("passport-facebook").Strategy;
const userModel = require('../models/user.model')


module.exports = (passport) => {
  passport.use(new passportfb(
    {
      clientID:"838230863301938",
      clientSecret:"9bb2a14b9a4a858bccbd25db2cd37e4d",
      callbackURL:"http://localhost:3000/login/fb/cb",
      profileFields: ['email','gender','displayName', 'locale']
    },
     async function(accessToken, refreshToken, profile, done) {
        const email = profile.emails[0].value;
        const name  = profile.displayName;
        let matchUser = await userModel.getUserByEmail(email);
        if (matchUser.length === 0) {
          const password = Date.now();
          userModel.newUser({
            email,
            name,
            password
          })
        }
        matchUser = await userModel.getUserByEmail(email);
        const user = matchUser[0];
        return done(null, user);
    }
  ))

  passport.serializeUser(function (user, done) {
    done(null, user.userID);
  });

  passport.deserializeUser(async function (id, done) {
    let matchUser = await userModel.getUserById(id);
    let user = {}
    if (matchUser.length != 0)
      user = matchUser[0];
    done(null, user);
  });
}