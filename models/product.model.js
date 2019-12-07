const db = require('../utils/db');

module.exports = {
    all: () => db.load('select * from product_single order by cateID'),
    single: (productID) => db.load(`select * from product_single where productID = ${productID} order by subcateID`),
    singleImgSrc:(productID) => db.load(`select * from product_img where productID = ${productID}`),
    singleNote:(productID) => db.load(`select * from product_note where productID = ${productID}`),
    allByCate: (cateID) => db.load(`select * from product_single where cateID = ${cateID} order by subcateID`),
    allBySubCate: (cateID, subcateID) => db.load(`select * from product_single where cateID = ${cateID} and subcateID = ${subcateID} order by subcateID`),
};