const express = require("express");
const categoryModel = require("../../models/category.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const cateList = await categoryModel.getCate();
  for (cate of cateList) {
    cate.subCate = await categoryModel.getSubCate(cate.cateID);
  }

  res.render("index", {
    layout: "home-layout.hbs",
    title: "Trang chủ",
    category: cateList
  });
});

module.exports = router;