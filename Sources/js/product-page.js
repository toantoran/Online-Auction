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
            <span class="main-btn watch-list"><i class="fa fa-heart"></i></span>\
            <img src="./img/product01.jpg" alt="">\
        </div>\
        <div class="product-body">\
            <h2 class="product-name"><a href="#">Product Name Goes Here</a></h2>\
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

var myMenu =  
'<div>\
    <a href="#"><i class="fab fa-facebook-square fa-2x"></i></a>\
    <a href="#"><i class="fab fa-twitter-square fa-2x"></a>\
    <a href="#"><i class="fab fa-google-plus-square fa-2x"></i></a>\
    <a href="#"><i class="fab fa-youtube fa-2x"></i></a>\
</div>';
$('#myPopUp').popup({	
    content: myMenu,	
    position: "bottom",
    style: "orange",	
    animation: "standard",	
    event: "click",		
    hideOnClick: true,	
    zIndex: 100 
});
    


