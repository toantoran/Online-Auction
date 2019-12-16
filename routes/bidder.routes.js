const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const productModel = require("../models/product.model");
const config = require("../config/default.json");
const querystring = require('querystring');
const checkUser = require("../middlewares/user.mdw");
const moment = require('moment');

const router = express.Router();

router.get("/", async (req, res) => {
  const [productsToEnd, productsMostBid, productsHighestPrice, productsNew] = await Promise.all([
    productModel.productsToEnd(),
    productModel.productsMostBid(),
    productModel.productsHighestPrice(),
    productModel.productsNew()
  ]);

  for (const product of productsToEnd) {
    [product.mainImgSrc, product.countBid, product.isExistWishItem] = await Promise.all([
      productModel.singleMainImgSrcByProduct(product.productID),
      productModel.countBidProduct(product.productID),
      req.user ? await productModel.isExistWishItem(product.productID, req.user.userID) : false,
    ]);
  }

  for (const product of productsToEnd) {
    product.isHot = product.countBid >= config.product.countBidIsHot;
    const temp = moment(product.beginDate, 'YYYY-MM-DD HH:mm:ss');
    const minutes =  moment().diff(temp, 'minutes');
    product.isNew =  minutes <= config.product.minutesIsNew;
  }

  for (const product of productsMostBid) {
    product.mainImgSrc = await productModel.singleMainImgSrcByProduct(
      product.productID
    );
    product.isExistWishItem = req.user ? await productModel.isExistWishItem(product.productID, req.user.userID) : false;
  }

  for (const product of productsMostBid) {
    product.isHot = product.countBid >= config.product.countBidIsHot;
    const temp = moment(product.beginDate, 'YYYY-MM-DD HH:mm:ss');
    const minutes =  moment().diff(temp, 'minutes');
    product.isNew =  minutes <= config.product.minutesIsNew;
  }


  for (const product of productsHighestPrice) {
    [product.mainImgSrc, product.countBid, product.isExistWishItem] = await Promise.all([
      productModel.singleMainImgSrcByProduct(product.productID),
      productModel.countBidProduct(product.productID),
      req.user ? await productModel.isExistWishItem(product.productID, req.user.userID) : false,
    ]);
  }

  for (const product of productsHighestPrice) {
    product.isHot = product.countBid >= config.product.countBidIsHot;
    const temp = moment(product.beginDate, 'YYYY-MM-DD HH:mm:ss');
    const minutes =  moment().diff(temp, 'minutes');
    product.isNew =  minutes <= config.product.minutesIsNew;
  }

  for (const product of productsNew) {
    [product.mainImgSrc, product.countBid, product.isExistWishItem] = await Promise.all([
      productModel.singleMainImgSrcByProduct(product.productID),
      productModel.countBidProduct(product.productID),
      req.user ? await productModel.isExistWishItem(product.productID, req.user.userID) : false,
    ]);
  }

  for (const product of productsNew) {
    product.isHot = product.countBid >= config.product.countBidIsHot;
    const temp = moment(product.beginDate, 'YYYY-MM-DD HH:mm:ss');
    const minutes =  moment().diff(temp, 'minutes');
    product.isNew =  minutes <= config.product.minutesIsNew;
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
    [product.mainImgSrc, product.countBid, product.isExistWishItem] = await Promise.all([
      productModel.singleMainImgSrcByProduct(product.productID),
      productModel.countBidProduct(product.productID),
      req.user ? await productModel.isExistWishItem(product.productID, req.user.userID) : false,
    ]);
  }

  for (const product of productList) {
    product.isHot = product.countBid >= config.product.countBidIsHot;
    const temp = moment(product.beginDate, 'YYYY-MM-DD HH:mm:ss');
    const minutes =  moment().diff(temp, 'minutes');
    product.isNew =  minutes <= config.product.minutesIsNew;
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
  const [productSingle, listImgSrc, note, productBid, countBid] = await Promise.all([
    productModel.single(req.params.productID),
    productModel.singleImgSrcByProduct(req.params.productID),
    productModel.singleNoteByProduct(req.params.productID),
    productModel.singleBidByProduct(req.params.productID),
    productModel.countBidProduct(req.params.productID),
  ]);

  const product = productSingle[0];
  product.isEndBid = moment(product.endDate).valueOf() < Date.now();
  const temp = moment(product.beginDate, 'YYYY-MM-DD HH:mm:ss');
  const minutes =  moment().diff(temp, 'minutes');
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
    isSeller: req.user ? product.seller === req.user.userID : false,
    isExistWishItem: req.user ? await productModel.isExistWishItem(product.productID, req.user.userID) : false,
    isHot: countBid >= config.product.countBidIsHot,
    isNew: minutes <= config.product.minutesIsNew,
  });
  req.session.lastUrl = req.originalUrl;
});

router.post("/product/:productID/bid", checkUser.checkAuthenticatedPost, async (req, res) => {
  const productSingle = await productModel.single(req.params.productID);
  const product = productSingle[0];

  let query;
  if (req.body.isEndBid === "true") {
    query = querystring.stringify({
      status: false,
      message: "Phiên đấu giá đã kết thúc!"
    });
  } else {
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
      const currentPrice = await productModel.getProductCurrentPrice(product.productID);
      await productModel.updateProductCurrentPrice({
        productID: product.productID,
        currentPrice
      })
    }
  }

  res.redirect(`/product/${req.params.productID}/?${query}`);
});

router.post("/product/:productID/addToWishList", checkUser.checkAuthenticatedPost, async (req, res) => {
  const productID = req.params.productID;
  const userID = req.user.userID;

  const check = await productModel.isExistWishItem(productID, userID);
  if (check) {
    res.json("0");
  } else {
    const entity = {
      productID,
      userID
    }
    await productModel.addWishItem(entity);
    res.json("1");
  }
});

router.post("/product/:productID/deleteToWishList", checkUser.checkAuthenticatedPost, async (req, res) => {
  const productID = req.params.productID;
  const userID = req.user.userID;

  await productModel.deleteWishItem(productID, userID);
  res.json("1");
});

router.post("/productList/search/", async (req, res) => {
  const category = req.body.category;
  const textSearch = req.body.textSearch;
  res.redirect(`/productList/search/${category}/${textSearch}`);
});

router.get("/productList/search/:category/:textSearch", async (req, res) => {
  const category = req.params.category;
  const textSearch = req.params.textSearch;
  let productList;
  let total;
  const limit = config.paginate.limit;
  let page = req.query.page || 1;
  if (page < 1) page = 1;
  const offset = (page - 1) * limit;

  if (category == 0) {
    [total, productList] = await Promise.all([
      productModel.countByText(textSearch),
      productModel.pageByText(textSearch, offset)
    ]);
  } else {
    [total, productList] = await Promise.all([
      productModel.countByCateAndText(textSearch, category),
      productModel.pageByCateAndText(textSearch, category, offset)
    ]);
  }

  for (const product of productList) {
    [product.mainImgSrc, product.countBid, product.isExistWishItem] = await Promise.all([
      productModel.singleMainImgSrcByProduct(product.productID),
      productModel.countBidProduct(product.productID),
      req.user ? await productModel.isExistWishItem(product.productID, req.user.userID) : false,
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
    title: "Tìm kiếm sản phẩm",
    textSearch,
    category,
    page_numbers,
    prev_value: +page - 1,
    next_value: +page + 1,
    isNotFirst: +page !== 1,
    isNotLast: +page !== nPages
  });
});

router.get("/account", checkUser.checkAuthenticated, async (req, res) => {
  const user = req.user;
  const [productsHistoryBid, productsWishList, productsSelling] = await Promise.all([
    productModel.productsHistoryBid(user.userID),
    productModel.productsWishList(user.userID),
    productModel.productsSelling(user.userID),
  ]);

  for (const product of productsHistoryBid) {
    [product.mainImgSrc, product.countBid, product.isExistWishItem, product.isEndBid, product.resultBid] = await Promise.all([
      productModel.singleMainImgSrcByProduct(product.productID),
      productModel.countBidProduct(product.productID),
      req.user ? await productModel.isExistWishItem(product.productID, req.user.userID) : false,
      product.isEndBid = moment(product.endDate).valueOf() < Date.now(),
      product.resultBid = 0,
      //product.resultBid = productModel.singleResultBid(product.productID, userID),
    ]);
  }

  for (const product of productsHistoryBid) {
    product.isHot = product.countBid >= config.product.countBidIsHot;
    const temp = moment(product.beginDate, 'YYYY-MM-DD HH:mm:ss');
    const minutes =  moment().diff(temp, 'minutes');
    product.isNew =  minutes <= config.product.minutesIsNew;
  }

  for (const product of productsWishList) {
    [product.mainImgSrc, product.countBid, product.isExistWishItem] = await Promise.all([
      productModel.singleMainImgSrcByProduct(product.productID),
      productModel.countBidProduct(product.productID),
      req.user ? await productModel.isExistWishItem(product.productID, req.user.userID) : false,
    ]);
  }

  for (const product of productsWishList) {
    product.isHot = product.countBid >= config.product.countBidIsHot;
    const temp = moment(product.beginDate, 'YYYY-MM-DD HH:mm:ss');
    const minutes =  moment().diff(temp, 'minutes');
    product.isNew =  minutes <= config.product.minutesIsNew;
  }

  for (const product of productsSelling) {
    [product.mainImgSrc, product.countBid, product.isExistWishItem] = await Promise.all([
      productModel.singleMainImgSrcByProduct(product.productID),
      productModel.countBidProduct(product.productID),
      req.user ? await productModel.isExistWishItem(product.productID, req.user.userID) : false,
    ]);
  }

  for (const product of productsSelling) {
    product.isHot = product.countBid >= config.product.countBidIsHot;
    const temp = moment(product.beginDate, 'YYYY-MM-DD HH:mm:ss');
    const minutes =  moment().diff(temp, 'minutes');
    product.isNew =  minutes <= config.product.minutesIsNew;
  }

  res.render("vwUser/account", {
    user,
    title: "Quản lí tài khoản",
    productsHistoryBid,
    productsWishList,
    productsSelling,
    emptyProductsHistoryBid: productsHistoryBid.length === 0,
    emptyProductsWishList: productsWishList.length === 0,
    emptyProductsSelling: productsSelling.length === 0,
  });

  req.session.lastUrl = req.originalUrl;
});

router.post("/account/:userID/updateInfor", checkUser.checkAuthenticatedPost, async (req, res) => {
  req.body.birthDay = moment(req.body.birthDay, "MM-DD-YYYY").format("YYYY-MM-DD");
  await userModel.editUser(req.body);
  res.json("1");
});

//Link: /user/checkout/:productID
router.get("/checkout/:productID", checkUser.checkAuthenticated, async (req, res) => {
  //Thanh toán
  //render checkout.hbs
  res.send("312312");
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

router.post('/login',
  passport.authenticate('local', {
    // successRedirect: req.session.lastUrl,
    failureRedirect: "/login",
    failureFlash: "Email hoặc mật khẩu không đúng",
    successFlash: "Welcome!"
  }), (req, res) => {
    // console.log(req.user);
    res.locals.lcUser = req.user;
    res.redirect(req.session.lastUrl)
  })

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
  res.locals.lcUser = {};
  req.session.destroy();
  // res.redirect(req.headers.referer);
  res.redirect("/");
});


module.exports = router;