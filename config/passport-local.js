const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const userModel = require('../models/user.model')


module.exports = (passport) => {
  passport.use(new LocalStrategy({
      usernameField: 'email'
    },
    async function (email, password, done) {
      const matchUser = await userModel.getUserByEmail(email);
      if (matchUser.length === 0) {
        return done(null, false, {
          message: 'Email chưa được đăng ký'
        })
      }
      const user = matchUser[0];
      try {
        if (await bcrypt.compareSync(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, {
            message: 'Mật khẩu không chính xác'
          })
        }
      } catch (e) {
        return done(e)
      }
    }
  ));

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
    // console.log(user);
    done(null, user);
  });


}