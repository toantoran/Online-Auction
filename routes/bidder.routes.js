//Định nghĩa tất cả đường dẫn liên quan tới user ẩn danh (chưa đăng nhập) hoặc user bình thường (bidder)
//Đường dẫn sẽ có dạng /user/...
//Ví dụ: /user/index => Trang chủ
//       /user/productList/:cateID/:subcateID => Danh sách các sản phẩm thuộc category có id là cateID và subcateID

const express = require("express");

//Cái chỗ này t chưa biết làm sao
//Tại vì cái category này nó nằm trong navbar, mà navbar trang nào cũng có
//Nếu mở trang nào lên cũng phải đọc db để render lại category thì không hay
//Tức là nếu vậy thì tất cả cái router.get dưới kia phải thêm lại cái {category: cateList} như trong cái router.get đầu tiên
//Thường thì truyền object trong res.render để nó render trong mấy file view (như index, account, products này kia)
//Còn cái category này nó render trong layout, chạy được nhưng nó có vẻ không đúng
const categoryModel = require("../models/category.model");
const productModel = require("../models/product.model");

const router = express.Router();


//Link: /user/

//Lý do router.get('/') chỉ có / thôi mà không có user đằng trước, xem file routes.mdw 
//vì mình đã định nghĩa là chỉ khi nào link có /user thì mới dùng tới file này, nên ở file này không cần ghi /user đằng trước

router.get("/", async (req, res) => {
  res.render("vwUser/index", {
    layout: "home-layout.hbs",
    title: "Trang chủ"
  });
});



//Chỉ có trang chủ dùng layout khác biệt (home-layout), từ đây xuống, layout mặc định (main-layout) không cần khai báo

//Link: /user/productList/cateID/subcateID
router.get("/productList/:cateID/:subcateID", async (req, res) => {
  //Xem danh sách các sản phẩm thuộc danh mục con
  const rows = await productModel.allBySubCate(req.params.cateID, req.params.subcateID);

  res.render("vwUser/product-list", {
    productList: rows,
    empty: rows.length === 0
  });

});


//Link: /user/product/:productID
router.get("/product/:productID", async (req, res) => {
  //Xem chi tiết sản phẩm
  //render product-page.hbs
  const rows = await productModel.single(req.params.productID);
  res.render("vwUser/product-details", {
    product: rows[0]
  });
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