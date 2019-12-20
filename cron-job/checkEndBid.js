const productModel = require("../models/product.model");
const userModel = require("../models/user.model");
const mailer = require("../middlewares/mail.mdw");
const CronJob = require('cron').CronJob;
const moment = require('moment');

const job = new CronJob({
  cronTime: '*/10 * * * *',
  onTick: async function () {
    console.log(moment(Date.now()).format("DD/MM/YYYY HH:mm:ss"));
    // mailer.sendMail();

    // const productsEndBid = await productModel.productsEndBid();
    // for (const p of productsEndBid) {
    //   const bidder = await productModel.getWinnerOfBidByProduct(p.productID);
    //   let isBided = true;
    //   if (bidder == false) isBided = false;
    //   const rows = await userModel.getUserById(p.seller);
    //   const seller = rows[0];
    //   if (isBided == true) {
    //     await mailer.sendMailEndBidToBidder(bidder.email, p);
    //     await mailer.sendMailEndBidToSeller(seller.email, p, isBided);
    //   } else {
    //     await mailer.sendMailEndBidToSeller(seller.email, p, isBided);
    //   }
    // }
  },

  start: true,
  timeZone: 'Asia/Ho_Chi_Minh'
});

module.exports = job;