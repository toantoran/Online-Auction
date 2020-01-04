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
          userModel.newUser({
            email,
            name
          })
          return done(null, false, {
            message: 'Email chưa được đăng ký'
          })
        }
        matchUser = await userModel.getUserByEmail(email);
        const user = matchUser[0];
        return done(null, user);
    }
  ))

  //Chạy lúc login (1 lần)
  passport.serializeUser(function (user, done) {
    done(null, user.userID);
  });


  // Chạy lại mỗi lần gửi request
  passport.deserializeUser(async function (id, done) {
    //Thêm cái này, nó sẽ get lại user
    //thử này
    let matchUser = await userModel.getUserById(id);
    let user = {}
    if (matchUser.length != 0)
      user = matchUser[0];
    // // console.log(user);
    done(null, user);
  });
}