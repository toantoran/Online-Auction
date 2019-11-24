let productSuccess =
    '<div class="col-md-3 col-sm-4 col-xs-6">\
<div class="product product-single">\
<div class="product-thumb" >\
        <div class="product-label">\
    <span class="sale">Hot <i class="fab fa-hotjar"></i></span>\
    <span>Mới</span>\
</div>\
    <ul class="product-countdown">\
        <li><span>00 H</span></li>\
        <li><span>00 M</span></li>\
        <li><span>00 S</span></li>\
    </ul>\
    <button class="main-btn quick-view"><i class="fas fa-money-check-alt"></i> Thanh toán</button>\
    <button class="watch-list btn-wish"><i class="fa fa-heart"></i></button>\
    <img src="./img/product01.jpg" alt="">\
</div>\
<div class="product-body">\
    <h2 class="product-name"><a href="product-page.html">Product Name Goes Here</a></h2>\
    <p class="product-text">Giá hiện tại: <span class="product-price" style="color: green">5,900,000₫</span></p>\
    <p class="product-text">Giá của bạn: <span class="product-price" style="color: green">5,900,000₫</span></p>\
    <p class="product-text">Trạng thái: <span class="product-price" style="color: red">Đã kết thúc</span></p>\
    <p class="product-text">Kết quả: <span class="product-price" style="color: green">Thắng cuộc</span></p>\
    <div class="product-footer">\
        <small><span>90</span> lượt ra giá</small>\
        <small>Từ <span>20/11/2019</span></small>\
    </div>\
</div>\
</div>\
</div>';

let productFail =
    '<div class="col-md-3 col-sm-4 col-xs-6">\
<div class="product product-single">\
<div class="product-thumb" >\
        <div class="product-label">\
    <span class="sale">Hot <i class="fab fa-hotjar"></i></span>\
    <span>Mới</span>\
</div>\
    <ul class="product-countdown">\
        <li><span>00 H</span></li>\
        <li><span>00 M</span></li>\
        <li><span>00 S</span></li>\
    </ul>\
    <button class="main-btn quick-view"><i class="fa fa-search-plus"></i> Xem chi tiết</button>\
    <button class="watch-list btn-wish"><i class="fa fa-heart"></i></button>\
    <img src="./img/product01.jpg" alt="">\
</div>\
<div class="product-body">\
    <h2 class="product-name"><a href="product-page.html">Product Name Goes Here</a></h2>\
    <p class="product-text">Giá hiện tại: <span class="product-price" style="color: red">6,300,000₫</span></p>\
    <p class="product-text">Giá của bạn: <span class="product-price" style="color: green">5,900,000₫</span></p>\
    <p class="product-text">Trạng thái: <span class="product-price" style="color: red">Đã kết thúc</span></p>\
    <p class="product-text">Kết quả: <span class="product-price" style="color: orange">Thất bại</span></p>\
    <div class="product-footer">\
        <small><span>90</span> lượt ra giá</small>\
        <small>Từ <span>20/11/2019</span></small>\
    </div>\
</div>\
</div>\
</div>';


let productWish =
    '<div class="col-md-3 col-sm-4 col-xs-6">\
    <div class="product product-single">\
        <div class="product-thumb" >\
            <div class="product-label">\
                <span class="sale">Hot <i class="fab fa-hotjar"></i></span>\
                <span>Mới</span>\
            </div>\
            <ul class="product-countdown">\
                <li><span>00 H</span></li>\
                <li><span>00 M</span></li>\
                <li><span>00 S</span></li>\
            </ul>\
            <button class="main-btn quick-view"><i class="fa fa-search-plus"></i> Xem chi tiết</button>\
            <button class="watch-list btn-wish"><i class="fa fa-heart"></i></button>\
            <img src="./img/product01.jpg" alt="">\
        </div>\
        <div class="product-body">\
            <h2 class="product-name"><a href="product-page.html">Product Name Goes Here</a></h2>\
            <p class="product-text">Giá hiện tại: <span class="product-price">6,300,000₫</span></p>\
            <div class="product-footer">\
                <small><span>90</span> lượt ra giá</small>\
                <small>Từ <span>20/11/2019</span></small>\
            </div>\
        </div>\
        </div>\
    </div>';



let productHistory = $('.section .container .product-container#history');
let productWishList = $('.section .container .product-container#wish-list');
let productSoldList = $('.section .container .product-container#sold-product');

for (let i = 0; i < 2; i++) {
    productHistory.append(productSuccess);
}
for (let i = 0; i < 2; i++) {
    productHistory.append(productFail);
}

for (let i = 0; i < 6; i++) {
    productWishList.append(productWish);
}
for (let i = 0; i < 4; i++) {
    productSoldList.append(productWish);
}

$('.datepicker-here').datepicker({
    dateFormat: 'dd/mm/yyyy',
    startDate: new Date('1999-1-1')
})