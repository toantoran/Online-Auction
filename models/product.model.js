const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
    all: () => db.load('select * from product_single order by cateID'),
    allByCate: (cateID) => db.load(`select * from product_single where cateID = ${cateID} order by subcateID`),
    allBySubCate: (cateID, subcateID) => db.load(`select * from product_single where cateID = ${cateID} and subcateID = ${subcateID} order by subcateID`),

    countBySubCat: async (cateID, subcateID) => {
        const rows = await db.load(`select count(*) as total from product_single where cateID = ${cateID} and subcateID = ${subcateID}`)
        return rows[0].total;
    },
    pageBySubCat: (cateID, subcateID, offset) => db.load(`select * from product_single where cateID = ${cateID} and subcateID = ${subcateID} limit ${config.paginate.limit} offset ${offset}`),

    countBidProduct: async (productID) => {
        const rows = await db.load(`select count(*) as total from product_bid where productID = "${productID}"`)
        return rows[0].total;
    },

    single: (productID) => db.load(`select * from product_single where productID = "${productID}" order by subcateID`),
    singleImgSrcByProduct: (productID) => db.load(`select * from product_img where productID = "${productID}"`),
    singleMainImgSrcByProduct: async (productID) => {
        const rows = await db.load(`select * from product_img where productID = "${productID}"`);
        return rows[0].imgSrc;
    },
    singleBidByProduct: (productID) => db.load(`select * from product_bid where productID = "${productID}"`),
    singleNoteByProduct: (productID) => db.load(`select * from product_note where productID = "${productID}"`),

    addProductSingle: entity => db.add('product_single', entity),
    addProductImg: entity => db.add('product_img', entity),
    addProductBid: entity => db.add('product_bid', entity),

    deleteProduct: id => {
        db.del('product_img', {
            productID: id
        });
        db.del('product_bid', {
            productID: id
        });
        db.del('product_note', {
            productID: id
        });
        db.del('product_single', {
            productID: id
        });
    },

    productsToEnd: () => db.load(`select * from product_single order by (endDate - beginDate) limit ${config.indexPage.limitProductsToEnd}`),
    productsMostBid: () => db.load(`
        select *, count(ps.productID) as countBid
        from product_single ps join product_bid pb
        on ps.productID = pb.productID
        group by ps.productID
        order by countBid desc
        limit ${config.indexPage.limitProductsMostBid}`),
    productsHighestPrice: () => db.load(`select * from product_single order by currentPrice desc limit ${config.indexPage.limitProductsHighestPrice}`),
    productsNew: () => db.load(`select * from product_single order by beginDate limit ${config.indexPage.limitProductsNew}`),
};