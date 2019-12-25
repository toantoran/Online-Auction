const db = require('../utils/db');

module.exports = {
    getAllDesc: (productID) => db.load(`select * from product_description where productID = '${productID}'`),
    addDesc: (entity) => db.add('product_description', entity)
};