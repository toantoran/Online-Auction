const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const productModel = require("../models/product.model");
const config = require("../config/default.json");
const querystring = require('querystring');
const checkUser = require("../middlewares/user.mdw");

const router = express.Router();

router.get("/", async (req, res) => {
  const [productsToEnd, productsMostBid, productsHighestPrice, productsNew] = await Promise.all([
    productModel.productsToEnd(),
    productModel.productsMostBid(),
    productModel.productsHighestPrice(),
    productModel.productsNew()
  ]);

  for (const product of productsToEnd) {
    [product.mainImgSrc, product.countBid] = await Promise.all([
      productModel.singleMainImgSrcByProduct(product.productID),
      productModel.countBidProduct(product.productID)
    ]);
  }

  for (const product of productsMostBid) {
    product.mainImgSrc = await productModel.singleMainImgSrcByProduct(
      product.productID
    );
  }

  for (const product of productsHighestPrice) {
    [product.mainImgSrc, product.countBid] = await Promise.all([
      productModel.singleMainImgSrcByProduct(product.productID),
      productModel.countBidProduct(product.productID)
    ]);
  }

  for (const product of productsNew) {
    [product.mainImgSrc, product.countBid] = await Promise.all([
      productModel.singleMainImgSrcByProduct(product.productID),
      productModel.countBidProduct(product.productID)
    ]);
  }

  res.render("vwUser/index", {
    title: "Trang chủ",
    user: req.user,
    showNavbar: true,
    notShowBreadcumb: true,
    productsToEnd,
    productsMostBid,
    productsHighestPrice,
    productsNew
  });

  req.session.lastUrl = req.originalUrl;
});

//Link: /user/productList/cateID/subcateID
router.get("/productList/:cateID/:subcateID", async (req, res) => {
  const {
    cateID,
    subcateID
  } = req.params;
  const limit = config.paginate.limit;
  let page = req.query.page || 1;
  if (page < 1) page = 1;
  const offset = (page - 1) * limit;

  const [total, productList] = await Promise.all([
    productModel.countBySubCat(cateID, subcateID),
    productModel.pageBySubCat(cateID, subcateID, offset)
  ]);

  for (const product of productList) {
    [product.mainImgSrc, product.countBid] = await Promise.all([
      productModel.singleMainImgSrcByProduct(product.productID),
      productModel.countBidProduct(product.productID)
    ]);
  }

  let nPages = Math.floor(total / limit);
  if (total % limit > 0) nPages++;
  const page_numbers = [];
  for (i = 1; i <= nPages; i++) {
    page_numbers.push({
      value: i,
      isCurrentPage: i === +page
    });
  }

  res.render("vwUser/product-list", {
    user: req.user,
    productList,
    empty: productList.length === 0,
    title: "Danh sách sản phẩm",
    page_numbers,
    prev_value: +page - 1,
    next_value: +page + 1,
    isNotFirst: +page !== 1,
    isNotLast: +page !== nPages
  });

  req.session.lastUrl = req.originalUrl;
});

router.get("/product/:productID", async (req, res) => {
  const [productSingle, listImgSrc, note, productBid] = await Promise.all([
    productModel.single(req.params.productID),
    productModel.singleImgSrcByProduct(req.params.productID),
    productModel.singleNoteByProduct(req.params.productID),
    productModel.singleBidByProduct(req.params.productID)
  ]);

  const product = productSingle[0];

  let maxPrice = product.currentPrice;
  for (const p of productBid) {
    if (p.isHolder === 1) maxPrice = p.price > maxPrice ? p.price : maxPrice;
  }

  product.currentPrice = maxPrice;

  res.render("vwUser/product-details", {
    user: req.user,
    product,
    bidPrice: product.stepPrice + product.currentPrice,
    listImgSrc,
    note,
    emptyImg: listImgSrc.length === 0,
    title: "Chi tiết sản phẩm",
    message: req.query.message,
    status: req.query.status,
    isSeller: req.user? product.seller === req.user.userID : false,
  });

  req.session.lastUrl = req.originalUrl;
});

router.post("/product/:productID/bid", checkUser.checkAuthenticatedPost, async (req, res) => {
  const productSingle = await productModel.single(req.params.productID);
  const product = productSingle[0];

  let query;

  if (product.seller === req.user.userID) {
    query = querystring.stringify({
      status: false,
      message: "Bạn là người bán sản phẩm này, không thể ra giá!"
    });
  } else {
    query = querystring.stringify({
      status: true,
      message: "Ra giá thành công!"
    });

    const entity = {
      productID: req.params.productID,
      bidderID: req.user.userID,
      price: req.body.bidPrice,
      bidTime: new Date(),
    }
    await productModel.addProductBid(entity);
  }

  res.redirect(`/product/${req.params.productID}/?${query}`);
});

router.get("/account", checkUser.checkAuthenticated, async (req, res) => {
  //Quản lý tài khoản
  //render account.hbs
  req.session.lastUrl = req.originalUrl;
});

//Link: /user/checkout/:productID
router.get("/checkout/:productID", checkUser.checkAuthenticated, async (req, res) => {
  //Thanh toán
  //render checkout.hbs
  req.session.lastUrl = req.originalUrl;
});

router.get("/login", checkUser.checkNotAuthenticated, (req, res) => {
  let errMsg = null;
  console.log(req.session.flash);
  if (req.session.flash != null)
    if (req.session.flash.error != null)
      if (req.session.flash.error.length) errMsg = req.session.flash.error[0];
  res.render("vwUser/login", {
    layout: false,
    email: req.session.email,
    message: errMsg
  });
  req.session.lastUrl = req.session.lastUrl || "/";
  //  req.session.destroy();
});

router.get("/signup", checkUser.checkNotAuthenticated, (req, res) => {
  res.render("vwUser/signup", {
    layout: false,
    message: req.session.message
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local',  {
      successRedirect: req.session.lastUrl,
      failureRedirect: "/login",
      failureFlash: "Email hoặc mật khẩu không đúng",
      successFlash: "Welcome!"
  })(req, res, next)
});

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
  //res.redirect(req.headers.referer);
  res.redirect("/");
});

module.exports = router;