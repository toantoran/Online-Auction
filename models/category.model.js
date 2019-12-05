const db = require('../utils/db');

module.exports = {
    getCate: () => db.load('select * from category order by cateID'),
    getSubCate: () => db.load('select * from category_sub order by cateID')
};