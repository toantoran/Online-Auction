const db = require('../utils/db');

module.exports = {
    getCate: () => db.load('select * from category order by cateID'),
    getSubCate: (cateID) => db.load(`select * from category_sub where cateID = ${cateID} order by subcateID`),
    getFromName: (subcateName) => db.load(`select * from category_sub where subcateName = "${subcateName}"`)
};