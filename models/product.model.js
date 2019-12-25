const db = require('../utils/db');
const config = require('../config/default.json');
const userModel = require("../models/user.model");

module.exports = {
    all: () => db.load('select * from product_single order by cateID'),
    allByCate: (cateID) => db.load(`select * from product_single where cateID = ${cateID} order by subcateID`),
    allBySubCate: (cateID, subcateID) => db.load(`select * from product_single where cateID = ${cateID} and subcateID = ${subcateID} order by subcateID`),
    sameBySubCate: (productID, cateID, subcateID) => db.load(`select * from product_single where cateID = ${cateID} and subcateID = ${subcateID} 
    and productID <> "${productID}" and endDate > NOW() limit 5`),
    countByText: async (textSearch) => {
        const rows = await db.load(`select count(*) as total from product_single`)
        return rows[0].total;
    },
    pageByTextDefault: (textSearch, offset) => db.load(`select * from product_single 
    order by (endDate - NOW()) limit ${config.paginate.limit} offset ${offset}`),
    pageByText: (textSearch, offset, option, order) => db.load(`select * from product_single 
    order by ${option} ${order} limit ${config.paginate.limit} offset ${offset}`),

    countByCateAndText: async (textSearch, cateID) => {
        const rows = await db.load(`select count(*) as total from product_single where cateID = ${cateID}`)
        return rows[0].total;
    },
    pageByCateAndTextDefault: (textSearch, cateID, offset) => db.load(`select * from product_single where cateID = ${cateID} 
    order by (endDate - NOW()) limit ${config.paginate.limit} offset ${offset}`),
    pageByCateAndText: (textSearch, cateID, offset, option, order) => db.load(`select * from product_single where cateID = ${cateID} 
    order by ${option} ${order} limit ${config.paginate.limit} offset ${offset}`),

    countBySubCat: async (cateID, subcateID) => {
        const rows = await db.load(`select count(*) as total from product_single where cateID = ${cateID} and subcateID = ${subcateID}`)
        return rows[0].total;
    },
    pageBySubCatDefault: (cateID, subcateID, offset) => db.load(`select * from product_single where cateID = ${cateID} and subcateID = ${subcateID} 
    order by (endDate - NOW()) limit ${config.paginate.limit} offset ${offset}`),
    pageBySubCat: (cateID, subcateID, offset, option, order) => db.load(`select * from product_single where cateID = ${cateID} and subcateID = ${subcateID} 
    order by ${option} ${order} limit ${config.paginate.limit} offset ${offset}`),

    countBidProduct: async (productID) => {
        const rows = await db.load(`select count(*) as total from product_bid where productID = "${productID}" and isCancel = "0"`)
        return rows[0].total;
    },

    single: (productID) => db.load(`select * from product_single where productID = "${productID}"`),
    singleImgSrcByProduct: (productID) => db.load(`select * from product_img where productID = "${productID}"`),
    singleMainImgSrcByProduct: async (productID) => {
        const rows = await db.load(`select * from product_img where productID = "${productID}" and isMain = 1`);
        return rows[0].imgSrc;
    },
    singleBidByProduct: (productID) => db.load(`select * from product_bid where productID = "${productID}" and isCancel="0" order by bidTime desc`),
    allDescByProduct: (productID) => db.load(`select * from product_description where productID = "${productID}"`),

    addProductSingle: entity => db.add('product_single', entity),
    addProductImg: entity => db.add('product_img', entity),
    addProductBid: entity => db.add('product_bid', entity),
    addProductNote: entity => db.add('product_note', entity),

    addBanBid: entity => db.add('product_ban_bid', entity),
    cancelProductBid: (productID, bidderID) => db.load(`update product_bid set isCancel = 1, isHolder = 0 where productID = "${productID}" and bidderID = ${bidderID}`),
    updateProductBidIsHolder: async (productID) => {
        const rows = await db.load(`
            select *
            from product_bid
            where isCancel = 0 and productID = "${productID}"
            order by price desc, bidTime asc
            limit 1`);
        if (rows.length < 1)
            return false;
        const bidID = rows[0].bidID;
        return db.load(`update product_bid set isHolder = 1 where bidID = ${bidID}`);
    },
    setFalseIsHolderProductBid: (productID) => db.load(`update product_bid set isHolder = 0 where productID = "${productID}"`),
    checkBanBid: async (productID, bidderID) => {
        const rows = await db.load(`select * from product_ban_bid where productID = "${productID}" and bidderID = ${bidderID}`)
        return (rows.length > 0);
    },

    getProductCurrentPrice: async (productID) => {
        const rows = await db.load(`select * from product_bid where productID = "${productID}" and isCancel = 0`);
        let currentPrice = 0;
        for (const p of rows) {
            currentPrice = currentPrice > p.priceHold ? currentPrice : p.priceHold;
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

    updateMailEndBid: (entity) => {
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
        db.del('product_ban_bid', {
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
    order by pb.bidTime desc
    limit ${config.account.limitProductsHistoryBid}`),

    productsWishList: (userID) => db.load(`
    select *
    from product_single ps join wish_list wl
    on ps.productID = wl.productID and wl.userID = ${userID}
    order by beginDate desc
    limit ${config.account.limitProductsWishList}`),

    productsSelling: (userID) => db.load(`
    select *
    from product_single
    where seller = ${userID}
    order by beginDate desc
    limit ${config.account.limitProductsSelling}`),

    productsWinList: (userID) => db.load(`
    select *
    from product_single ps join product_bid pb
    where ps.productID = pb.productID and ps.endDate < NOW() and pb.bidderID = ${userID} and pb.isHolder = 1 and pb.isCancel = 0
    order by ps.endDate desc
    limit ${config.account.limitProductsWinList}`),

    getSellerNameByProduct: async (productID) => {
        const rows = await db.load(`select * from product_single where productID= "${productID}"`);
        const result = await userModel.getNameById(rows[0].seller);
        return result;
    },

    getSellerByProduct: async (productID) => {
        const rows = await db.load(`select * from product_single where productID= "${productID}"`);
        const result = await userModel.getUserById(rows[0].seller);
        return result[0];
    },

    getNameWinnerOfBidByProduct: async (productID) => {
        const rows = await db.load(`
            select *
            from product_bid
            where isCancel = 0 and productID = "${productID}" and isHolder = 1`);
        if (rows.length < 1)
            return false;
        const result = await userModel.getNameById(rows[0].bidderID);
        return result;
    },

    getWinnerOfBidByProduct: async (productID) => {
        const rows = await db.load(`
            select *
            from product_bid
            where isCancel = 0 and productID = "${productID}" and isHolder = 1`);
        if (rows.length < 1)
            return false;
        const result = await userModel.getUserById(rows[0].bidderID);
        return result[0];
    },

    getPriceOfHolderByProduct: async (productID) => {
        const rows = await db.load(`
            select *
            from product_bid
            where isCancel = 0 and productID = "${productID}" and isHolder = 1`);
        if (rows.length < 1)
            return 0;
        return rows[0].price;
    },

    productsEndBid: () => db.load('select * from product_single where endDate < NOW()'),

};