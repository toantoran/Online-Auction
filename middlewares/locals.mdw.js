const categoryModel = require('../models/category.model');

module.exports = function (app) {
    app.use(async (req, res, next) => {
        const cateList = await categoryModel.getCate();
        for (cate of cateList) {
            cate.subCate = await categoryModel.getSubCate(cate.cateID);
        }
        res.locals.lcCateList = cateList;
        next();
    })
};