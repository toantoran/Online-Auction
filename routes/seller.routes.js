const express = require("express");

const productModel = require("../models/product.model");
const upload = require("../middlewares/upload.mdw");
const router = express.Router();
const uuid = require('uuid/v1');

router.get("/new-product", async (req, res) => {
    res.render("vwSeller/new-product", {
        title: "Mở phiên đấu giá",
        id: uuid()
    });
});

router.post("/new-product/",upload.array('files[]'), async (req, res) => {
    const entityProductSingle = {
        productID: req.body.id,
        productName : req.body.productName,
        brand : req.body.brand,
        pFrom : req.body.pFrom,
        beginPrice : req.body.beginPrice,
        currentPrice: req.body.beginPrice,
        stepPrice : req.body.stepPrice,
        immePrice : req.body.immePrice,
        description : req.body.description,
        beginDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    }
    let row = await productModel.addProductSingle(entityProductSingle);

    for (const file of req.files) {
        const entityProductImg = {
            productID: req.body.id,
            imgSrc: file.filename,
        }
        await productModel.addProductImg(entityProductImg);
    }

    res.redirect(`/product/${row.insertId}`);
});

module.exports = router;