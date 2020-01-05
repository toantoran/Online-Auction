const productModel = require("../models/product.model");
const userModel = require("../models/user.model");
const mailer = require("../middlewares/mail.mdw");
const CronJob = require('cron').CronJob;

const job = new CronJob({
  cronTime: '*/5 * * * *',
  onTick: async function () {
    mailer.sendMail();

    const productsEndBid = await productModel.productsEndBidToSendMail();
    for (const p of productsEndBid) {
        const bidder = await productModel.getWinnerOfBidByProduct(p.productID);
        let isBided = true;
        if (bidder == false) isBided = false;
        const rows = await userModel.getUserById(p.seller);
        const seller = rows[0];
        if (isBided == true) {
          await mailer.sendMailEndBidToBidder(bidder.email, p);
          await mailer.sendMailEndBidToSeller(seller.email, p, isBided);
        } else {
          await mailer.sendMailEndBidToSeller(seller.email, p, isBided);
        }
      await productModel.updateMailEndBid({
        productID: p.productID,
        isSendMailEndBid: 1,
      })
    }
  },

  start: true,
  timeZone: 'Asia/Ho_Chi_Minh'
});

module.exports = job;