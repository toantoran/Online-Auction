const express = require("express");

const categoryModel = require("../models/category.model");
const productModel = require("../models/product.model");
const config = require('../config/default.json');

const router = express.Router();

router.get("/", async (req, res) => {
  res.render("vwUser/index", {
    layout: "home-layout.hbs",
    title: "Trang chủ"
  });
});

router.get("/productList/:cateID/:subcateID", async (req, res) => {
  const {cateID, subcateID} = req.params;
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
    ])
  }

  let nPages = Math.floor(total / limit);
  if (total % limit > 0) nPages++;
  const page_numbers = [];
  for (i = 1; i <= nPages; i++) {
    page_numbers.push({
      value: i,
      isCurrentPage: i === +page
    })
  }

  res.render("vwUser/product-list", {
    productList,
    empty: productList.length === 0,
    title: "Danh sách",
    page_numbers,
    prev_value: +page - 1,
    next_value: +page + 1,
    isNotFirst: +page !== 1,
    isNotLast: +page !== nPages,
  });
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
    if (p.isHolder===1) maxPrice = p.price > maxPrice ? p.price : maxPrice;
  }

  product.currentPrice = maxPrice;

  res.render("vwUser/product-details", {
    product,
    bidPrice: product.stepPrice + product.currentPrice,
    listImgSrc,
    note,
    emptyImg: listImgSrc.length === 0,
    title: "Chi tiết sản phẩm",
  });
});

router.post("/product/:productID/bid", async (req, res) => {
  const entity = {
    productID: req.params.productID,
    bidderID: 12,
    price: req.body.bidPrice,
    isHolder: false,
    bidTime: new Date(),
  }
  await productModel.addProductBid(entity);
  res.redirect("/product/" + req.params.productID);
});


//Từ đây phải kiểm tra đăng nhập (đăng nhập dùng passport.js)
//Link: /user/account
router.get("/account", async (req, res) => {
  //Quản lý tài khoản
  //render account.hbs
});

//Link: /user/checkout/:productID
router.get("/checkout/:productID", async (req, res) => {
  //Thanh toán
  //render checkout.hbs
});

//Cứ tạm thời như thế này đã, chứ đúng ra thì có cái folder controller kia
//Cũng có tương tự các file admin, bidder, seller để tập hợp các hàm xử lý cho từng cái routes này
//Ví dụ cái router.get('/') trên cùng thì copy hết cái hàm xử lý vào trong bidder.controller, export ra
//Rồi cái file này chỉ cần require rồi gọi lại nó là được
//Link: https://www.youtube.com/watch?v=XsyJzULs8z0&t=445s

module.exports = router;