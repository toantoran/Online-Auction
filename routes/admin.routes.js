const express = require("express");
const productModel = require("../models/product.model");
const userModel = require("../models/user.model");
const cateModel = require("../models/category.model");
const querystring = require("querystring");
const router = express.Router();

//Require



router.get("/category", async (req, res, next) => {
    res.render("vwAdmin/category", {
        title: "Quản lý danh mục",
        user: req.user,
        notShowBreadcumb: true,
        message: req.query.message,
        status: req.query.status,
    });

    req.session.lastUrl = req.originalUrl;
});

router.get("/getSubcateTable/:cateID", async (req, res, next) => {
    const data = res.locals.lcCateList[req.params.cateID - 1].subCate;
    for (let sub of data) {
        sub.productsCount = await productModel.countBySubCat(sub.cateID, sub.subcateID)
        sub.button = `<a href='/admin/category-sub-detail/${sub.cateID}/${sub.subcateID}' class='main-btn edit-btn'><i class='fas fa-edit'></i></a><button type='submit' formmethod='post' style='display: none' 
        formaction='/admin/category/sub/detele/${sub.cateID}/${sub.subcateID}' class='main-btn delete-subcate-btn'></button><button class='main-btn' type='button' onclick='confirmDelete(${sub.cateID},${sub.subcateID})'><i class='fas fa-trash-alt'></i></button>`;
    }
    res.send({
        "draw": 1,
        "recordsTotal": data.length,
        "recordsFiltered": data.length,
        data: data,
    })
});

router.get("/getCateTable", (req, res, next) => {
    const data = res.locals.lcCateList;
    for (let sub of data) {
        sub.cateIcon = `<i class='fas fa-${sub.cateIcon}'></i> : ${sub.cateIcon}`
        sub.button = `<a href='/admin/category-detail/${sub.cateID}' class='main-btn edit-btn'><i class='fas fa-edit'></i></a><button type='submit' formmethod='post' style='display: none'
        formaction='/admin/category/detele/${sub.cateID}' class='main-btn delete-cate-btn'></button><button type='button' class='main-btn' onclick='confirmDelete(${sub.cateID})'><i class='fas fa-trash-alt'></i></button>`;
    }
    res.send({
        "draw": 1,
        "recordsTotal": data.length,
        "recordsFiltered": data.length,
        data: data
    })
});

router.post("/category/detele/:cateID", async (req, res) => {
    const cateID = req.params.cateID;
    const rows = await productModel.allByCate(cateID);
    const check = rows.length > 0;
    let query;
    if (check) {
        query = querystring.stringify({
            status: false,
            message: "Không thể xoá, danh mục này đang chứa sản phẩm!!!"
        });
    } else {
        query = querystring.stringify({
            status: true,
            message: "Xoá danh mục thành công!!!"
        });
        //await productModel.deleteByCate(cateID);
    }
    res.redirect(`/admin/category/?${query}`);
})

router.post("/category/sub/detele/:cateID/:subcateID", async (req, res) => {
    const cateID = req.params.cateID;
    const subcateID = req.params.subcateID;
    const rows = await productModel.allBySubCate(cateID, subcateID);
    const check = rows.length > 0;
    let query;
    if (check) {
        query = querystring.stringify({
            status: false,
            message: "Không thể xoá, danh mục này đang chứa sản phẩm!!!"
        });
    } else {
        query = querystring.stringify({
            status: true,
            message: "Xoá danh mục thành công!!!"
        });
        //await productModel.deleteBySubCate(cateID, subcateID);
    }
    res.redirect(`/admin/category/?${query}`);
});


router.get("/users", (req, res, next) => {
    res.render("vwAdmin/users", {
        title: "Quản lý người dùng",
        user: req.user,
        notShowBreadcumb: true,
        message: req.query.message,
        status: req.query.status
    });

    req.session.lastUrl = req.originalUrl;
});

router.get("/users/getAllBidder", async (req, res) => {
    const data = await userModel.getAllBidder();
    for (let user of data) {
        user.button = `<a href='/admin/user/detail/${user.userID}' class='main-btn edit-btn'><i class='fas fa-info-circle'></i></a><button type='submit' formmethod='post' style='display: none' formaction='/admin/users/detele/${user.userID}' class='main-btn delete-user-btn'></button><button type='button' class='main-btn' onclick='confirmDelete(${user.userID})'><i class='fas fa-trash-alt'></i></button>`;
    }
    res.send({
        "draw": 1,
        "recordsTotal": data.length,
        "recordsFiltered": data.length,
        data: data
    })
});

router.get("/users/getAllSeller", async (req, res) => {
    const data = await userModel.getAllSeller();
    for (let user of data) {
        user.button =
            `<a href='/admin/user/detail/${user.userID}' class='main-btn edit-btn'><i class='fas fa-info-circle'></i></a>
        <button type='submit' formmethod='post' style='display: none' formaction='/admin/users/downgrade/${user.userID}' class='main-btn downgrade-user-btn'></button>
        <button type='button' class='main-btn' onclick='confirmDowngrade(${user.userID})'><i class="fas fa-angle-double-down"></i></button>
        <button type='submit' formmethod='post' style='display: none' formaction='/admin/users/detele/${user.userID}' class='main-btn delete-user-btn'></button>
        <button type='button' class='main-btn' onclick='confirmDelete(${user.userID})'><i class='fas fa-trash-alt'></i></button>`;
    }
    res.send({
        "draw": 1,
        "recordsTotal": data.length,
        "recordsFiltered": data.length,
        data: data
    })
});

router.get("/users/getAllAdmin", async (req, res) => {
    const data = await userModel.getAllAdmin();
    for (let user of data) {
        user.button = `<a href='/admin/user/detail/${user.userID}' class='main-btn edit-btn'><i class='fas fa-info-circle'></i></a>`;
    }
    res.send({
        "draw": 1,
        "recordsTotal": data.length,
        "recordsFiltered": data.length,
        data: data
    })
})


router.get("/category-detail/:cateID", async (req, res, next) => {
    const cate = res.locals.lcCateList[req.params.cateID - 1];
    let count = 0;
    for (let sub of cate.subCate) {
        // console.log(sub);
        count += await productModel.countBySubCat(sub.cateID, sub.subcateID)
    }
    cate.productsCount = count
    res.render("vwAdmin/category-detail", {
        title: "Chi tiết danh mục",
        user: req.user,
        notShowBreadcumb: true,
        message: req.query.message,
        status: req.query.status,
        cate
    });

    req.session.lastUrl = req.originalUrl;
});

module.exports = router;