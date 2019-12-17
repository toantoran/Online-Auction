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
        const rows = await db.load(`select count(*) as total from product_bid where productID = "${productID}" and isCancel = "0"`)
        return rows[0].total;
    },

    single: (productID) => db.load(`select * from product_single where productID = "${productID}"`),
    singleImgSrcByProduct: (productID) => db.load(`select * from product_img where productID = "${productID}"`),
    singleMainImgSrcByProduct: async (productID) => {
        const rows = await db.load(`select * from product_img where productID = "${productID}"`);
        return rows[0].imgSrc;
    },
    singleBidByProduct: (productID) => db.load(`select * from product_bid where productID = "${productID}" and isCancel="0" order by bidTime desc`),
    singleNoteByProduct: (productID) => db.load(`select * from product_note where productID = "${productID}"`),

    addProductSingle: entity => db.add('product_single', entity),
    addProductImg: entity => db.add('product_img', entity),
    addProductBid: entity => db.add('product_bid', entity),
    addProductNote: entity => db.add('product_note', entity),

    addBanBid: entity => db.add('product_ban_bid', entity),
    cancelProductBid: (productID, bidderID) => db.load(`update product_bid set isCancel = 1 where productID = "${productID}" and bidderID = ${bidderID}`),
    checkBanBid: async (productID, bidderID) => {
        const rows = await db.load(`select * from product_ban_bid where productID = "${productID}" and bidderID = ${bidderID}`)
        return (rows.length > 0);
    },

    getProductCurrentPrice: async (productID) => {
        const rows = await db.load(`select * from product_bid where productID = "${productID}" and isCancel = 0`);
        let currentPrice = rows[0].price;
        for (const p of rows) {
            currentPrice = currentPrice > p.price ? currentPrice : p.price;
        }
        return currentPrice;
    },

    updateProductCurrentPrice: (entity) => {
        const condition = {
            productID: entity.productID
        };
        delete entity.productID;
        return db.patch('product_single', entity, condition);
    },

    deleteProduct: id => {
        db.del('wish_list', {
            productID: id
        });
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

    productsToEnd: () => db.load(`select * from product_single where endDate > NOW() order by (endDate - NOW()) limit ${config.indexPage.limitProductsToEnd}`),
    productsMostBid: () => db.load(`
        select *, count(ps.productID) as countBid
        from product_single ps join product_bid pb
        on ps.productID = pb.productID and pb.isCancel = 0 and ps.endDate > NOW()
        group by ps.productID
        order by countBid desc
        limit ${config.indexPage.limitProductsMostBid}`),
    productsHighestPrice: () => db.load(`select * from product_single where endDate > NOW() order by currentPrice desc limit ${config.indexPage.limitProductsHighestPrice}`),
    productsNew: () => db.load(`select * from product_single where endDate > NOW() order by beginDate desc limit ${config.indexPage.limitProductsNew}`),

    addWishItem: entity => db.add('wish_list', entity),
    deleteWishItem: (productID, userID) => db.load(`delete from wish_list where userID = ${userID} and productID = "${productID}"`),

    isExistWishItem: async (productID, userID) => {
        const rows = await db.load(`select * from wish_list where productID = "${productID}"`);
        for (const p of rows) {
            if (p.userID === userID)
                return true;
        }
        return false;
    },

    productsHistoryBid: (userID) => db.load(`
    select *
    from product_single ps join product_bid pb
    on ps.productID = pb.productID and pb.bidderID = ${userID}
    group by ps.productID
    order by beginDate desc
    limit ${config.account.limitProductsHistoryBid}`),

    productsWishList: (userID) => db.load(`
    select *, count(ps.productID) as count
    from product_single ps join wish_list wl
    on ps.productID = wl.productID and wl.userID = ${userID}
    group by ps.productID
    order by beginDate desc
    limit ${config.account.limitProductsWishList}`),

    productsSelling: (userID) => db.load(`
    select *
    from product_single
    where seller = ${userID}
    order by beginDate desc
    limit ${config.account.limitProductsSelling}`),

    getSellerNameByProduct: async (productID) => {
        const rows = await db.load(`select * from users u join product_single ps on ps.productID= "${productID}" and ps.seller = u.userID`);
        return rows[0].name;
    }
};