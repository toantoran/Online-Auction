const express = require('express');
const categoryModel = require('../../models/category.model');

const router = express.Router();



router.get('/', async (req, res) => {
    const category = await categoryModel.getCate();
    const subCategory = await categoryModel.getSubCate();
    res.render('index', {
        layout: 'home-layout.hbs',
        category: category,
        subCategory: subCategory,
        title: 'Trang chủ'
    });
    console.log(category);
})


module.exports = router;