const userMdw = require("../middlewares/user.mdw");

module.exports = function(app) {
	app.use("/", require("../routes/bidder.routes"));
	app.use("/seller", require("../routes/seller.routes"));
	app.use("/admin", userMdw.checkAdmin, require("../routes/admin.routes"));
};
