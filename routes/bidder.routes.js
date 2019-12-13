//Định nghĩa tất cả đường dẫn liên quan tới user ẩn danh (chưa đăng nhập) hoặc user bình thường (bidder)
//Đường dẫn sẽ có dạng /user/...
//Ví dụ: /user/index => Trang chủ
//       /user/productList/:cateID/:subcateID => Danh sách các sản phẩm thuộc category có id là cateID và subcateID

const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const productModel = require("../models/product.model");
let lastUrl = null;

const router = express.Router();

router.get("/", async (req, res) => {
  res.render("vwUser/index", {
    title: "Trang chủ",
    user: req.user,
    showNavbar: true,
    notShowBreadcumb: true
  });

  lastUrl = req.originalUrl;
});

//Link: /user/productList/cateID/subcateID
router.get("/productList/:cateID/:subcateID", async (req, res) => {
  const productList = await productModel.allBySubCate(
    req.params.cateID,
    req.params.subcateID
  );

  for (const product of productList) {
    const rows = await productModel.singleImgSrcByProduct(product.productID);
    if (rows.length >= 1) {
      product.mainImgSrc = rows[0].imgSrc;
    }
  }

  res.render("vwUser/product-list", {
    user: req.user,
    productList,
    empty: productList.length === 0,
    title: "Danh sách sản phẩm"
  });

  lastUrl = req.originalUrl;
});

//Link: /user/product/:productID
router.get("/product/:productID", async (req, res) => {
  const rows = await productModel.single(req.params.productID);
  const listImgSrc = await productModel.singleImgSrcByProduct(
    req.params.productID
  );
  const note = await productModel.singleNoteByProduct(req.params.productID);
  res.render("vwUser/product-details", {
    user: req.user,
    product: rows[0],
    listImgSrc,
    note,
    emptyImg: listImgSrc.length === 0,
    title: "Chi tiết sản phẩm"
  });

  lastUrl = req.originalUrl;
});

//Từ đây phải kiểm tra đăng nhập (đăng nhập dùng passport.js)
//Link: /user/account
router.get("/account", checkAuthenticated, async (req, res) => {
  //Quản lý tài khoản
  //render account.hbs
  lastUrl = req.originalUrl;
});

//Link: /user/checkout/:productID
router.get("/checkout/:productID", checkAuthenticated, async (req, res) => {
  //Thanh toán
  //render checkout.hbs
  lastUrl = req.originalUrl;
});



router.get("/login", checkNotAuthenticated, (req, res) => {
  let errMsg = null;
  console.log(req.session.flash);
  if (req.session.flash != null)
    if (req.session.flash.error != null)
      if (req.session.flash.error.length)
        errMsg = req.session.flash.error[0];
  res.render("vwUser/login", {
    layout: false,
    email: req.session.email,
    message: errMsg
  });
  req.session.destroy();
});

router.get("/signup", checkNotAuthenticated, (req, res) => {
  res.render("vwUser/signup", {
    layout: false,
    message: req.session.message
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: lastUrl,
    failureRedirect: "/login",
    failureFlash: "Email hoặc mật khẩu không đúng",
    successFlash: "Welcome!"
  }),
  (req, res) => {
    res.redirect("/login");
  }
);

router.post("/signup", async (req, res) => {
  console.log(req.body.email);
  const existedUser = await userModel.getUserByEmail(req.body.email);
  if (existedUser.length) {
    console.log(existedUser);
    req.session.message = "Email đã được sử dụng";
    res.redirect("/signup");
  } else {
    try {
      const hashedPass = bcrypt.hashSync(req.body.password, 10);
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
        address: req.body.address
      };
      userModel.newUser(newUser);
      req.session.email = newUser.email;
      res.redirect("/login");
    } catch (e) {
      console.log(e);
    }
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect(req.headers.referer);
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect(lastUrl);
  }
  next();
}

module.exports = router;