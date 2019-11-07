let productNameList = new Array(15).fill('');
productNameList = productNameList.map((product,index) => product = "Product Name abc xysy hk" + index);

let productPriceList = new Array(15).fill('');
productPriceList = productPriceList.map(product => parseInt((Math.random() * 100))*100000);

let expiredTimeList = new Array(15).fill('');
expiredTimeList = expiredTimeList.map(time => new Date((new Date().getTime() + Math.random() * 100000000)).toString());

let beginTimeList = new Array(15).fill('');
beginTimeList = beginTimeList.map(time => new Date((new Date().getTime() - Math.random() * 100000000)).toString());

expiredTimeList[1] = new Date('7 Nov 2019 18:40:00')
$(document).ready(() => {
    initDropdownNavbar();
    initThumbnail();

    $('.card-title').each(function (index) {
        $(this).html(formatProductName(productNameList[index]));
    });
    $('.card-subtitle').each(function (index) {
        $(this).html('Giá hiện tại: ' + '<strong>' + formatProductPrice(productPriceList[index]) + " ₫" + '</strong>');
    });

    $('.countdown-text').each(function (index) {
        $(this).attr('expired-time', expiredTimeList[index]);
        $(this).attr('begin-time', beginTimeList[index]);
        showCountDown($(this));   
    });
    $('.card').hover(function() { $(this).toggleClass('shadow')});

});



    
    


function showCountDown(object) {
    let expiredTime = new Date(object.attr('expired-time'));
    let x = setInterval(function() {
      let now = new Date().getTime();
      let distance = expiredTime - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      hours += days*24;
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      object.html(hours + " giờ " + minutes + " phút " + seconds + " giây "); 
      if (distance < 0) {
        clearInterval(x);
        object.html("Phiên đấu giá đã kết thúc");
      }
    }, 1000);
}





//card-body == thumbnail
function initThumbnail() {
    $('.card-body').addClass('p-2');
    $('.card-body').append('<p class="card-title mb-1"></p>').append('<p class="card-subtitle"></p>').append('<i class="fas fa-hourglass-half mr-2"></i><small class="countdown-text"> </small>')
}

function initDropdownNavbar() {
    $(function () {
        $('#main_navbar').bootnavbar();
    })
}

function formatProductPrice(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function formatProductName(name) {
    const maxLength = 20;
    if (name.length > maxLength) 
        return name.slice(0, maxLength).concat("...");
    return name;
}