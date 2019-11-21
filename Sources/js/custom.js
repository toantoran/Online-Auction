let productSingle = 
    '<div class="product product-single">\
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
            <span class="main-btn watch-list"><i class="fa fa-heart"></i></span>\
            <img src="./img/product01.jpg" alt="">\
        </div>\
        <div class="product-body">\
            <h2 class="product-name"><a href="#">Product Name Goes Here</a></h2>\
            <h5 class="product-text">Giá hiện tại: <span class="product-price">6,300,000₫</span></h5>\
            <h5 class="product-text">Giá mua ngay: <span class="product-price">8,900,000₫</span></h5>\
            <div class="product-footer">\
                <small><span>90</span> lượt ra giá</small>\
                <small>Từ <span>20/11/2019</span></small>\
            </div>\
        </div>\
    </div>';

let latestSlick = $('.section#latest').find('#product-slick-latest');
for (let i =0; i < 10; i++) {
    latestSlick.append(productSingle);
}
for (let i =0; i < 5; i++) {
    $('.product-slick').append(productSingle);
}



$("#cart-container").width($("#cart-total").width() + 60);

$("#account-container").width(200);



$('.cat-list>li>a').addClass('cat-link').attr('cat-order', index => index);

$('.cat-link').hover((event) => {
    changeCatImage(event);
});


function changeCatImage(event) {
    let img = $(event.target).closest('.row').find('.cat-img');

    img.attr('src', 'img/' + $(event.target).attr('cat-order') + '.jpg')
}