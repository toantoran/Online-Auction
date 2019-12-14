// let productSingle =
//     '<div class="product product-single">\
//         <div class="product-thumb" >\
//             <div class="product-label">\
//                 <span class="sale">Hot <i class="fab fa-hotjar"></i></span>\
//                 <span>Mới</span>\
//             </div>\
//             <ul class="product-countdown">\
//                 <li><span class="cd-h">0 H</span></li>\
//                 <li><span class="cd-m">0 M</span></li>\
//                 <li><span class="cd-s">0 S</span></li>\
//             </ul>\
//             <button class="main-btn quick-view"><i class="fa fa-search-plus"></i> Xem chi tiết</button>\
//             <button class="watch-list btn-wish"><i class="fa fa-heart"></i></button>\
//             <img src="./img/product01.jpg" alt="">\
//         </div>\
//         <div class="product-body">\
//             <h2 class="product-name"><a href="product-page.html">Product Name Goes Here</a></h2>\
//             <p class="product-text">Giá hiện tại: <span class="product-price">6,300,000₫</span></p>\
//             <div class="product-footer">\
//                 <small><span>90</span> lượt ra giá</small>\
//                 <small>Từ <span>20/11/2019</span></small>\
//             </div>\
//         </div>\
//     </div>';

// let latestSlick = $('.section#latest').find('#product-slick-latest');
// for (let i = 0; i < 10; i++) {
//     latestSlick.append(productSingle);
// }
// for (let i = 0; i < 5; i++) {
//     $('.product-slick').append(productSingle);
// }

// Date.prototype.addDays = function (days) {
//     var date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }

showCountDown($('.product.product-single'))

function showCountDown(object) {
    for (let i = 0; i < object.length; i++) {
        let demoExpDate = object.find("#endDate")[i].value;
        let h = object.find('.product-countdown li:nth-child(1) span')[i];
        let m = object.find('.product-countdown li:nth-child(2) span')[i];
        let s = object.find('.product-countdown li:nth-child(3) span')[i];
        let x = setInterval(function () {
            let now = new Date().getTime();
            let distance = demoExpDate - now;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            hours += days * 24;
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            console.log(hours);
            console.log(minutes);
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            console.log(seconds);
            h.innerHTML = hours + ' H';
            m.innerHTML = minutes + ' M';
            s.innerHTML = seconds + ' S';
            if (distance < 0) {
                clearInterval(x);
                object[i].innerHTML = "Phiên đấu giá đã kết thúc";
            }
        }, 1000);
    }
}