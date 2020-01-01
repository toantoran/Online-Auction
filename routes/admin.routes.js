const express = require("express");
const productModel = require("../models/product.model");
const userModel = require("../models/user.model");
const cateModel = require("../models/category.model");
const checkUser = require("../middlewares/user.mdw");
const moment = require("moment");
const config = require("../config/default.json");
const querystring = require("querystring");
const upload = require("../middlewares/uploadSubCateImg.mdw");
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
        formaction='/admin/category/sub/detele/${sub.cateID}/${sub.subcateID}' class='main-btn delete-subcate-btn'></button><button class='primary-btn' type='button' onclick='confirmDelete(${sub.cateID},${sub.subcateID})'><i class='fas fa-trash-alt'></i></button>`;
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
        formaction='/admin/category/detele/${sub.cateID}' class='main-btn delete-cate-btn'></button><button type='button' class='primary-btn' onclick='confirmDelete(${sub.cateID})'><i class='fas fa-trash-alt'></i></button>`;
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
        await cateModel.deleteCateByID(cateID);
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
        await cateModel.deleteSubCateByID(cateID, subcateID);
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
        user.point = await userModel.getPointEvaluation(user.userID) + "%";
        user.birthDay = moment(user.birthDay).format("MM/DD/YYYY");
        user.button = `<a href='/admin/user-detail/${user.userID}' class='main-btn edit-btn'><i class='fas fa-info-circle'></i></a><button type='submit' formmethod='post' style='display: none' formaction='/admin/users/detele/${user.userID}' class='main-btn delete-user-btn'></button><button type='button' class='main-btn' onclick='confirmDelete(${user.userID})'><i class='fas fa-trash-alt'></i></button>`;
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
        user.point = await userModel.getPointEvaluation(user.userID) + "%";
        user.birthDay = moment(user.birthDay).format("MM/DD/YYYY");
        user.button =
            `<a href='/admin/user-detail/${user.userID}' class='main-btn edit-btn'><i class='fas fa-info-circle'></i></a>
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
        user.point = await userModel.getPointEvaluation(user.userID) + "%";
        user.birthDay = user.birthDay ? moment(user.birthDay).format("MM/DD/YYYY") : '';
        user.button = `<a href='/admin/user-detail/${user.userID}' class='main-btn edit-btn'><i class='fas fa-info-circle'></i></a>`;
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

router.get("/add-category", async (req, res, next) => {
    res.render("vwAdmin/add-category", {
        title: "Thêm danh mục",
        user: req.user,
        notShowBreadcumb: true
    });

    req.session.lastUrl = req.originalUrl;
});

router.post("/add-category", async (req, res, next) => {
    await cateModel.addCate(req.body);
    res.redirect('/admin/category');
});

router.post("/add-category-sub/:cateID", upload.single('subcate-img'), async (req, res, next) => {
    const rs = await cateModel.getSubCate(req.params.cateID);
    const entity = {
        cateID: req.params.cateID,
        subcateName: req.body.subcateName,
        subcateID: rs.length + 1
    }
    await cateModel.addSubcate(entity);
    res.redirect(`/admin/category#sub-${entity.cateID}`)
});

router.get("/add-category-sub/:cateID", async (req, res, next) => {
    const rs = await cateModel.getCateFromId(req.params.cateID);
    if (rs.length === 0) {
        res.render('vwUser/not-found', {
            user: req.user,
            title: 'Không tìm thấy trang',
            notShowBreadcumb: true
        })
    } else {
        const parent = rs[0];
        parent.subCate = await cateModel.getSubCate(parent.cateID);
        res.render("vwAdmin/add-category-sub", {
            title: "Thêm danh mục con",
            user: req.user,
            notShowBreadcumb: true,
            subCateIDAdd: parent.subCate.length +1,
            parent
        });
    }

    req.session.lastUrl = req.originalUrl;
});

router.get("/category-sub-detail/:cateID/:subcateID", async (req, res, next) => {
    const subcate = res.locals.lcCateList[req.params.cateID - 1].subCate[req.params.subcateID - 1];
    subcate.productsCount = await productModel.countBySubCat(subcate.cateID, subcate.subcateID)
    const parent = res.locals.lcCateList[req.params.cateID - 1]
    res.render("vwAdmin/category-sub-detail", {
        title: "Chi tiết danh mục con",
        user: req.user,
        notShowBreadcumb: true,
        message: req.query.message,
        status: req.query.status,
        subcate,
        parent
    });

    req.session.lastUrl = req.originalUrl;
});

router.get("/user-detail/:userID", async (req, res, next) => {
    const userID = req.params.userID
    const rs = await userModel.getUserById(userID);
    let target = rs[0];

    [target.point, target.evaluation, target.history, target.productSell] = await Promise.all([
        userModel.getPointEvaluation(target.userID),
        userModel.getEvaluationById(target.userID),
        productModel.productsHistoryBid(target.userID),
        productModel.productsSell(target.userID)
    ]);

    for (const product of target.history) {
        [
            product.mainImgSrc,
            product.countBid,
            product.isEndBid,
            product.isWinner
        ] = await Promise.all([
            productModel.singleMainImgSrcByProduct(product.productID),
            productModel.countBidProduct(product.productID),
            (product.isEndBid = moment(product.endDate).valueOf() < Date.now()),
            (await productModel.getWinnerOfBidByProduct(product.productID)).userID === target.userID
        ]);
    }

    for (const product of target.history) {
        product.isHot = product.countBid >= config.product.countBidIsHot;
        const temp = moment(product.beginDate, "YYYY-MM-DD HH:mm:ss");
        const minutes = moment().diff(temp, "minutes");
        product.isNew = minutes <= config.product.minutesIsNew;
        product.resultBid = product.isEndBid && product.isWinner;
    }

    for (const product of target.productSell) {
        [
            product.mainImgSrc,
            product.countBid,
        ] = await Promise.all([
            productModel.singleMainImgSrcByProduct(product.productID),
            productModel.countBidProduct(product.productID),
        ]);
    }

    for (const product of target.productSell) {
        product.isHot = product.countBid >= config.product.countBidIsHot;
        const temp = moment(product.beginDate, "YYYY-MM-DD HH:mm:ss");
        const minutes = moment().diff(temp, "minutes");
        product.isNew = minutes <= config.product.minutesIsNew;
        if (product.countBid > 0) {
            product.isBided = true;
            product.winner = await productModel.getWinnerOfBidByProduct(
                product.productID
            );
        } else {
            product.isBided = false;
        }
        product.isEndBid = moment(product.endDate).valueOf() < Date.now();
    }

    for (const e of target.evaluation) {
        e.senderName = await userModel.getNameById(e.sender);
    }


    res.render("vwAdmin/user-detail", {
        title: "Chi tiết User",
        user: req.user,
        notShowBreadcumb: true,
        message: req.query.message,
        status: req.query.status,
        target
    });

    req.session.lastUrl = req.originalUrl;
});

module.exports = router;