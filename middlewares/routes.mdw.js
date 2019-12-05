module.exports = function (app) {
    app.use('/', require('../routes/bidder/bidder.routes'));
};