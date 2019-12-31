const db = require('../utils/db');

module.exports = {
    getCate: () => db.load('select * from category order by cateID'),
    getSubCate: (cateID) => db.load(`select * from category_sub where cateID = ${cateID} order by subcateID`),
    getFromName: (subcateName) => db.load(`select * from category_sub where subcateName = "${subcateName}"`),
    getCateFromId: (cateID) => db.load(`select * from category where cateID = "${cateID}"`),
    getSubCateFromId: (cateID, subcateID) => db.load(`select * from category where cateID = "${cateID}" and subcateID = "${subcateID}"`),
    deleteCateByID: async (cateID) => {

    },
    deleteSubCateByID: async (cateID, subcateID) => {

    },

    addCate: (entity) => db.add('category', entity),
    addSubcate: (entity) => db.add('category_sub', entity)
};