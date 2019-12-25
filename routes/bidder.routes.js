const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const productModel = require("../models/product.model");
const config = require("../config/default.json");
const querystring = require('querystring');
const checkUser = require("../middlewares/user.mdw");
const moment = require('moment');
const mailer = require("../middlewares/mail.mdw");
const numeral = require("numeral")

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
    const minutes = moment().diff(temp, 'minutes');
    product.isNew = minutes <= config.product.minutesIsNew;

    if (product.countBid > 0) {
      product.isBided = true;
      product.winner = await productModel.getNameWinnerOfBidByProduct(product.productID);
    } else {
      product.isBided = false;
    }
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
    const minutes = moment().diff(temp, 'minutes');
    product.isNew = minutes <= config.product.minutesIsNew;


    if (product.countBid > 0) {
      product.isBided = true;
      product.winner = await productModel.getNameWinnerOfBidByProduct(product.productID);
    } else {
      product.isBided = false;
    }
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
    const minutes = moment().diff(temp, 'minutes');
    product.isNew = minutes <= config.product.minutesIsNew;

    if (product.countBid > 0) {
      product.isBided = true;
      product.winner = await productModel.getNameWinnerOfBidByProduct(product.productID);
    } else {
      product.isBided = false;
    }
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
    const minutes = moment().diff(temp, 'minutes');
    product.isNew = minutes <= config.product.minutesIsNew;

    if (product.countBid > 0) {
      product.isBided = true;
      product.winner = await productModel.getNameWinnerOfBidByProduct(product.productID);
    } else {
      product.isBided = false;
    }
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

  const option = req.query.option || 0;
  const order = req.query.order || 0;

  const total = await productModel.countBySubCat(cateID, subcateID);
  let productList;

  if (option == 0) {
    if (order == 0) {
      productList = await productModel.pageBySubCatDefault(cateID, subcateID, offset);
    } else {
      productList = await productModel.pageBySubCat(cateID, subcateID, offset, "(endDate - NOW())", "desc");
    }
  } else {
    if (order == 0) {
      productList = await productModel.pageBySubCat(cateID, subcateID, offset, "currentPrice", "asc");
    } else {
      productList = await productModel.pageBySubCat(cateID, subcateID, offset, "currentPrice", "desc");
    }
  }



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
    const minutes = moment().diff(temp, 'minutes');
    product.isNew = minutes <= config.product.minutesIsNew;

    if (product.countBid > 0) {
      product.isBided = true;
      product.winner = await productModel.getNameWinnerOfBidByProduct(product.productID);
    } else {
      product.isBided = false;
    }
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
    isNotLast: +page !== nPages,
    option,
    order
  });

  req.session.lastUrl = req.originalUrl;
});

router.post("/productList/:cateID/:subcateID", async (req, res) => {
  const query = querystring.stringify({
    option: req.body.option,
    order: req.body.order
  });

  res.redirect(`/productList/${req.params.cateID}/${req.params.subcateID}/?${query}`);
});

router.get("/product/:productID", async (req, res) => {
  const [productSingle, listImgSrc, desc, productBid, countBid, seller] = await Promise.all([
    productModel.single(req.params.productID),
    productModel.singleImgSrcByProduct(req.params.productID),
    productModel.allDescByProduct(req.params.productID),
    productModel.singleBidByProduct(req.params.productID),
    productModel.countBidProduct(req.params.productID),
    productModel.getSellerByProduct(req.params.productID),
  ]);

  const product = productSingle[0];
  product.isEndBid = moment(product.endDate).valueOf() < Date.now();
  const temp = moment(product.beginDate, 'YYYY-MM-DD HH:mm:ss');
  const minutes = moment().diff(temp, 'minutes');
  for (const pb of productBid) {
    pb.bidderName = await userModel.getNameById(pb.bidderID);
  }

  let winner;
  if (productBid.length > 0) {
    winner = await productModel.getWinnerOfBidByProduct(product.productID);
  }

  const productListSame = await productModel.sameBySubCate(req.params.productID, product.cateID, product.subcateID);
  for (const product of productListSame) {
    [product.mainImgSrc, product.countBid, product.isExistWishItem] = await Promise.all([
      productModel.singleMainImgSrcByProduct(product.productID),
      productModel.countBidProduct(product.productID),
      req.user ? await productModel.isExistWishItem(product.productID, req.user.userID) : false,
    ]);
  }

  for (const product of productListSame) {
    product.isHot = product.countBid >= config.product.countBidIsHot;
    const temp = moment(product.beginDate, 'YYYY-MM-DD HH:mm:ss');
    const minutes = moment().diff(temp, 'minutes');
    product.isNew = minutes <= config.product.minutesIsNew;

    if (product.countBid > 0) {
      product.isBided = true;
      product.winner = await productModel.getNameWinnerOfBidByProduct(product.productID);
    } else {
      product.isBided = false;
    }
  }

  res.render("vwUser/product-details", {
    user: req.user,
    seller,
    winner,
    isBided: productBid.length > 0,
    product,
    productBid,
    bidPrice: product.stepPrice + product.currentPrice,
    listImgSrc,
    desc,
    emptyImg: listImgSrc.length === 0,
    title: "Chi tiết sản phẩm",
    message: req.query.message,
    status: req.query.status,
    isSeller: req.user ? product.seller === req.user.userID : false,
    isExistWishItem: req.user ? await productModel.isExistWishItem(product.productID, req.user.userID) : false,
    isHot: countBid >= config.product.countBidIsHot,
    isNew: minutes <= config.product.minutesIsNew,
    productListSame,
  });
  req.session.lastUrl = req.originalUrl;
});

router.post("/product/:productID/bid", checkUser.checkAuthenticatedPost, async (req, res) => {
  const productSingle = await productModel.single(req.params.productID);
  const product = productSingle[0];
  const checkBan = await productModel.checkBanBid(req.params.productID, req.user.userID);
  let query;
  if (checkBan) {
    query = querystring.stringify({
      status: false,
      message: "Bạn đã bị cấm đấu giá sản phẩm này!!!"
    });
  } else {
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

        const oldHolder = await productModel.getWinnerOfBidByProduct(product.productID);
        const price = numeral(req.body.bidPrice).value();
        const immePrice = product.immePrice || 0;
        let currentPrice = product.currentPrice;
        const priceHold = await productModel.getPriceOfHolderByProduct(product.productID);
        let isHolder;
        if (+price === immePrice) {
          currentPrice = immePrice;
          isHolder = 1;
          product.endDate = new Date();
        } else {
          if (price <= priceHold) {
            currentPrice = price;
            isHolder = 0;
          } else {
            if (priceHold !== 0) {
              currentPrice = priceHold + product.stepPrice;
            }
            isHolder = 1;
          }
          if (product.autoExtend) {
            const temp = moment(product.endDate, 'YYYY-MM-DD HH:mm:ss');
            let minutes = moment().diff(temp, 'minutes');
            if (minutes >= -5) {
              product.endDate = moment(product.endDate).add(10, 'minutes');
              product.endDate = moment(product.endDate).format('YYYY-MM-DD HH:mm:ss');
            }
          }
        }

        const entity = {
          productID: req.params.productID,
          bidderID: req.user.userID,
          price,
          priceHold: currentPrice,
          bidTime: new Date(),
          isHolder
        }
        if (isHolder === 1) {
          await productModel.setFalseIsHolderProductBid(product.productID);
        }
        await productModel.addProductBid(entity);
        await productModel.updateProductCurrentPrice({
          productID: product.productID,
          currentPrice,
          endDate: product.endDate,
        })

        //Gui mail
        const seller = await userModel.getUserById(product.seller);
        const sellerEMail = seller[0].email;

        const bidderEmail = req.user.email;

        const oldHolderEmail = (oldHolder == false) ? false : oldHolder.email;

        await mailer.sendMailConfirmBid(sellerEMail, bidderEmail, oldHolderEmail, product);
      }
    }
  }

  res.redirect(`/product/${req.params.productID}/?${query}`);
});

router.post("/product/:productID/refuseBid", async (req, res) => {
  const rows = await productModel.single(req.body.productID);
  const product = rows[0];
  const isSeller = req.user ? product.seller === req.user.userID : false;
  product.isEndBid = moment(product.endDate).valueOf() < Date.now();
  if (isSeller && (!product.isEndBid)) {
    await productModel.cancelProductBid(req.body.productID, req.body.bidderID);
    await productModel.addBanBid({
      productID: req.body.productID,
      bidderID: req.body.bidderID,
    });

    let currentPrice = await productModel.getProductCurrentPrice(product.productID);
    if (currentPrice === 0) {
      currentPrice = product.beginPrice;
    }
    await productModel.updateProductCurrentPrice({
      productID: product.productID,
      currentPrice
    })

    await productModel.updateProductBidIsHolder(product.productID);


    //Gui mail cho nguoi dau gia
    const bidder = await userModel.getUserById(req.body.bidderID);
    const bidderEmail = bidder[0].email;
    await mailer.sendMailRefuseBidToSBidder(bidderEmail, product);

    res.json("1");
  } else {
    res.json("0");
  }
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

  const option = req.query.option || 0;
  const order = req.query.order || 0;

  if (category == 0) {
    total = await productModel.countByText(textSearch);
    if (option == 0) {
      if (order == 0) {
        productList = await productModel.pageByTextDefault(textSearch, offset);
      } else {
        productList = await productModel.pageByText(textSearch, offset, "(endDate - NOW())", "desc");
      }
    } else {
      if (order == 0) {
        productList = await productModel.pageByText(textSearch, offset, "currentPrice", "asc");
      } else {
        productList = await productModel.pageByText(textSearch, offset, "currentPrice", "desc");
      }
    }
  } else {
    total = await productModel.countByCateAndText(textSearch, category);
    if (option == 0) {
      if (order == 0) {
        productList = await productModel.pageByCateAndTextDefault(textSearch, category, offset);
      } else {
        productList = await productModel.pageByCateAndText(textSearch, category, offset, "(endDate - NOW())", "desc");
      }
    } else {
      if (order == 0) {
        productList = await productModel.pageByCateAndText(textSearch, category, offset, "currentPrice", "asc");
      } else {
        productList = await productModel.pageByCateAndText(textSearch, category, offset, "currentPrice", "desc");
      }
    }
  }

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
    const minutes = moment().diff(temp, 'minutes');
    product.isNew = minutes <= config.product.minutesIsNew;

    if (product.countBid > 0) {
      product.isBided = true;
      product.winner = await productModel.getNameWinnerOfBidByProduct(product.productID);
    } else {
      product.isBided = false;
    }
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
    isNotLast: +page !== nPages,
    option,
    order
  });
});

router.post("/productList/search/:category/:textSearch", async (req, res) => {
  const query = querystring.stringify({
    option: req.body.option,
    order: req.body.order
  });

  res.redirect(`/productList/search/${req.params.category}/${req.textSearch}/?${query}`);
});

router.get("/account", checkUser.checkAuthenticated, async (req, res) => {
  const user = req.user;
  const [productsHistoryBid, productsWishList, productsSelling, productsWinList] = await Promise.all([
    productModel.productsHistoryBid(user.userID),
    productModel.productsWishList(user.userID),
    productModel.productsSelling(user.userID),
    productModel.productsWinList(user.userID),
  ]);

  for (const product of productsHistoryBid) {
    [product.mainImgSrc, product.countBid, product.isExistWishItem, product.isEndBid, product.isWinner] = await Promise.all([
      productModel.singleMainImgSrcByProduct(product.productID),
      productModel.countBidProduct(product.productID),
      req.user ? await productModel.isExistWishItem(product.productID, req.user.userID) : false,
      product.isEndBid = moment(product.endDate).valueOf() < Date.now(),
      req.user ? ((await productModel.getWinnerOfBidByProduct(product.productID)).userID === req.user.userID) : false,
    ]);
  }

  for (const product of productsHistoryBid) {
    product.isHot = product.countBid >= config.product.countBidIsHot;
    const temp = moment(product.beginDate, 'YYYY-MM-DD HH:mm:ss');
    const minutes = moment().diff(temp, 'minutes');
    product.isNew = minutes <= config.product.minutesIsNew;
    product.resultBid = (product.isEndBid && product.isWinner);
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
    const minutes = moment().diff(temp, 'minutes');
    product.isNew = minutes <= config.product.minutesIsNew;


    if (product.countBid > 0) {
      product.isBided = true;
      product.winner = await productModel.getNameWinnerOfBidByProduct(product.productID);
    } else {
      product.isBided = false;
    }
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
    const minutes = moment().diff(temp, 'minutes');
    product.isNew = minutes <= config.product.minutesIsNew;


    if (product.countBid > 0) {
      product.isBided = true;
      product.winner = await productModel.getNameWinnerOfBidByProduct(product.productID);
    } else {
      product.isBided = false;
    }
  }

  for (const product of productsWinList) {
    [product.mainImgSrc, product.countBid, product.isExistWishItem] = await Promise.all([
      productModel.singleMainImgSrcByProduct(product.productID),
      productModel.countBidProduct(product.productID),
      req.user ? await productModel.isExistWishItem(product.productID, req.user.userID) : false,
    ]);
  }

  res.render("vwUser/account", {
    user,
    title: "Quản lí tài khoản",
    productsHistoryBid,
    productsWishList,
    productsSelling,
    productsWinList,
    emptyProductsHistoryBid: productsHistoryBid.length === 0,
    emptyProductsWishList: productsWishList.length === 0,
    emptyProductsSelling: productsSelling.length === 0,
    emptyProductsWinList: productsWinList.length === 0,
  });

  req.session.lastUrl = req.originalUrl
});

router.post("/account/:userID/updateInfor", checkUser.checkAuthenticatedPost, async (req, res) => {
  req.body.birthDay = moment(req.body.birthDay, "MM-DD-YYYY").format("YYYY-MM-DD");
  await userModel.editUser(req.body);
  res.json("1");
});

router.get("/checkout/:productID", checkUser.checkAuthenticated, async (req, res) => {
  const rows = await productModel.single(req.params.productID);
  const product = rows[0];

  [product.mainImgSrc, product.sellerName] = await Promise.all([
    productModel.singleMainImgSrcByProduct(product.productID),
    productModel.getSellerNameByProduct(product.productID)
  ]);

  const transportPrice = config.checkout.transportPrice;

  res.render("vwUser/checkout", {
    user: req.user,
    product,
    transportPrice,
    totalPrice: +product.currentPrice + +transportPrice,
    title: "Thanh toán",
  });
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
  req.session.lastUrl = req.session.lastUrl;
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