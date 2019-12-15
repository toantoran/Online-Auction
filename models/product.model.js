const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
    all: () => db.load('select * from product_single order by cateID'),
    allByCate: (cateID) => db.load(`select * from product_single where cateID = ${cateID} order by subcateID`),
    allBySubCate: (cateID, subcateID) => db.load(`select * from product_single where cateID = ${cateID} and subcateID = ${subcateID} order by subcateID`),

    countByText: async (textSearch) => {
        const rows = await db.load(`select count(*) as total from product_single`)
        return rows[0].total;
    },
    pageByText: (textSearch, offset) => db.load(`select * from product_single limit ${config.paginate.limit} offset ${offset}`),

    countByCateAndText: async (textSearch, cateID) => {
        const rows = await db.load(`select count(*) as total from product_single where cateID = ${cateID}`)
        return rows[0].total;
    },
    pageByCateAndText: (textSearch, cateID, offset) => db.load(`select * from product_single where cateID = ${cateID} limit ${config.paginate.limit} offset ${offset}`),

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
    productsMostBid: () => db.load(`select * from product_single order by (endDate - beginDate) limit ${config.indexPage.limitProductsToEnd}`),
    productsMostBid: () => db.load(`
        select *, count(ps.productID) as countBid
        from product_single ps join product_bid pb
        on ps.productID = pb.productID
        group by ps.productID
        order by countBid desc
        limit ${config.indexPage.limitProductsMostBid}`),
    productsHighestPrice: () => db.load(`select * from product_single order by currentPrice desc limit ${config.indexPage.limitProductsHighestPrice}`),
    productsNew: () => db.load(`select * from product_single order by beginDate desc limit ${config.indexPage.limitProductsNew}`),

    addWishItem: entity => db.add('wish_list', entity),
    deleteWishItem: (productID, userID) => db.load(`delete from wish_list where userID = ${userID} and productID = "${productID}"`),

    isExistWishItem: async (productID, userID) => {
        const rows = await db.load(`select * from wish_list where productID = "${productID}"`);
        for (const p of rows) {
            if (p.userID === userID)
                return true;
        }
        return false;
    }
};