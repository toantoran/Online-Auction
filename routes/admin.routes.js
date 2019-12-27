const express = require("express");
const router = express.Router();

//Require



router.get("/category", async (req, res, next) => {
    res.render("vwAdmin/category", {
        title: "Quản lý danh mục",
        user: req.user,
        notShowBreadcumb: true
    });

    req.session.lastUrl = req.originalUrl;
});

router.get("/getSubcateTable/:cateID", (req, res, next) => {
    const data = res.locals.lcCateList[req.params.cateID - 1].subCate;
    for (let sub of data) {
        sub.button = `<a href='/admin/category/sub/detail/${sub.cateID}/${sub.subcateID}' class='main-btn edit-btn'><i class='fas fa-edit'></i></a>&nbsp;<a href='/admin/category/sub/detele/${sub.cateID}/${sub.subcateID}' class='main-btn delete-btn'><i class='fas fa-trash-alt'></i></a>`;
    }
    res.send({
        "draw": 1,
        "recordsTotal": data.length,
        "recordsFiltered": data.length,
        data: data
    })
});

router.get("/getCateTable", (req, res, next) => {
    const data = res.locals.lcCateList;
    for (let sub of data) {
        sub.button = `<a href='/admin/category/detail/${sub.cateID}' class='main-btn edit-btn'><i class='fas fa-edit'></i></a>&nbsp;<a href='/admin/category/detele/${sub.cateID}' class='main-btn delete-btn'><i class='fas fa-trash-alt'></i></a>`;
    }
    res.send({
        "draw": 1,
        "recordsTotal": data.length,
        "recordsFiltered": data.length,
        data: data
    })
});

module.exports = router;