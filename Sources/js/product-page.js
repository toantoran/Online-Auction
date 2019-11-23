let productSingle = 
'<div class="col-md-5ths col-sm-4 col-xs-6">\
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

let productContainer =  $('.section .container .product-container');

for (let i=0;i<5;i++) {
   productContainer.append(productSingle);
}


    


