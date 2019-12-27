const express = require("express");
const productModel = require("../models/product.model");
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

router.get("/getSubcateTable/:cateID", (req, res, next) => {
    const data = res.locals.lcCateList[req.params.cateID - 1].subCate;
    for (let sub of data) {
        sub.button = `<a href='/admin/category/sub/detail/${sub.cateID}/${sub.subcateID}' class='main-btn edit-btn'><i class='fas fa-edit'></i></a>&nbsp;<button type='submit' formmethod='post' 
        formaction='/admin/category/sub/detele/${sub.cateID}/${sub.subcateID}' class='main-btn delete-subcate-btn'><i class='fas fa-trash-alt'></i></button>`;
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
        sub.button = `<a href='/admin/category/detail/${sub.cateID}' class='main-btn edit-btn'><i class='fas fa-edit'></i></a>&nbsp;<button type='submit' formmethod='post' 
        formaction='/admin/category/detele/${sub.cateID}' class='main-btn delete-cate-btn'><i class='fas fa-trash-alt'></i></button>`;
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


module.exports = router;