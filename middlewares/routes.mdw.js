const check = require('./user.mdw')

module.exports = function (app) {
    //Cái này để yên vậy, chỉ việc sửa các file .routes.js kia thôi

    //Đường dẫn bắt đầu bằng /user/... sẽ do cái file này xử lí
    app.use('/', require('../routes/bidder.routes'));
    app.use('/seller', check.checkSeller, require('../routes/seller.routes'));

    //Đường dẫn bắt đầu bằng /seller/... sẽ do cái file này xử lí
    //app.use('/seller', require('../routes/seller.routes'));

    //Đường dẫn bắt đầu bằng /admin/... sẽ do cái file này xử lí
    //app.use('/admin', require('../routes/admin.routes'));
};