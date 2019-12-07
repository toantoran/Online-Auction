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

let productContainer = $('.section .container .product-container');

for (let i = 0; i < 5; i++) {
  productContainer.append(productSingle);
}

$('.main-btn.icon-btn.btn-delete').click(() => {
  Swal.fire({
    title: 'Bạn chắc chắn muốn gỡ bỏ sản phẩm này?',
    text: 'Bạn không thể hoàn tác',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#F8694A',
    cancelButtonColor: '#000',
    confirmButtonText: 'Chắc chắn <i class="fas fa-trash"></i>',
    cancelButtonText: 'Hủy'
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        title: 'Sản phẩm đã được gỡ bỏ',
        icon: 'success',
        footer: '<a href="product-page.html">Xem sản phẩm?</a>',
        timer: 4000,
        footer: 'Điều hướng về trang chủ'
      })
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 4000)
    }
  })
})

//Bid Table

function Bid(time, name, price) {
  this.time = time;
  this.name = name;
  this.price = price;
  return this;
};
$('#bid-table').DataTable({
  searching: false,
  sort: false,
  paging: true,
  data: [
    new Bid("20/11/2019 19:20", "****Toàn", "6,300,000"),
    new Bid("20/11/2019 19:20", "****Toàn", "6,300,000"),
    new Bid("20/11/2019 19:20", "****Toàn", "6,300,000"),
    new Bid("20/11/2019 19:20", "****Toàn", "6,300,000"),
    new Bid("20/11/2019 19:20", "****Toàn", "6,300,000"),
    new Bid("20/11/2019 19:20", "****Toàn", "6,300,000"),
    new Bid("20/11/2019 19:20", "****Toàn", "6,300,000"),
    new Bid("20/11/2019 19:20", "****Toàn", "6,300,000"),
    new Bid("20/11/2019 19:20", "****Toàn", "6,300,000"),
    new Bid("20/11/2019 19:20", "****Toàn", "6,300,000"),
    new Bid("20/11/2019 19:20", "****Toàn", "6,300,000"),
    new Bid("20/11/2019 19:20", "****Toàn", "6,300,000")
  ],
  columns: [{
      data: 'time',
      sTitle: 'Thời gian'
    },
    {
      data: 'name',
      sTitle: 'Người đấu giá'
    },
    {
      data: 'price',
      sTitle: 'Giá'
    }
  ],
  "language": {
    "emptyTable": "Chưa có lượt ra giá nào",
    "info": "",
    "infoEmpty": "",
    "lengthMenu": "Hiện _MENU_ lượt ra giá",
    "paginate": {
      "first": "Đầu",
      "last": "Cuối",
      "next": "Sau",
      "previous": "Trước"
    }
  }
});

$('tbody tr').append("<td><button class='main-btn refuse-btn'>Từ chối</button></td>");
$('.refuse-btn').click(() => {
  Swal.fire({
    title: 'Bạn có chắc chắn muốn từ chối lượt đấu giá này?',
    text: "Bạn không thể hoàn tác",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#F8694A',
    cancelButtonColor: '#000',
    confirmButtonText: 'Chắn chắn',
    cancelButtonText: 'Hủy bỏ'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Đã từ chối lượt đấu giá !',
        'Người này không thể tham gia đấu giá sản phẩm này nữa',
        'success'
      )
    }
  })
})

var myMenu =
  '<div>\
    <a href="https://facebook.com/" target="_blank"><i class="fab fa-facebook-square fa-2x"></i></a>\
    <a href="https://twitter.com/" target="_blank"><i class="fab fa-twitter-square fa-2x"></a>\
    <a href="https://www.youtube.com/" target="_blank"><i class="fab fa-youtube fa-2x"></i></a>\
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

$('.note-btn').click(() => {
  $('.note-btn').prop('disabled', true);
  var d = new Date();
  var strDate = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  $('.note-btn').parent().parent().parent().append(
    '<div class="note">\
        <p><i class="fas fa-edit"></i> <span class="note-date">' + strDate + '</span></p>\
        <textarea></textarea>\
      </div>\
      <div class="deletable pull-right">\
        <button class="main-btn" id="done-note-btn">Xong</button>\
        <button class="main-btn" id="cancel-note-btn">Hủy bỏ</button>\
      </div>');

  $('#done-note-btn').click(() => {
    if ($('.note textarea').val().trim().length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Hmm......',
        text: 'Nội dung không được để trống'
      })
    } else {
      Swal.fire({
        title: 'Thêm ghi chú này?',
        text: "Bạn không thể hoàn tác",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#F8694A',
        cancelButtonColor: '#000',
        confirmButtonText: 'Thêm',
        cancelButtonText: 'Hủy bỏ'
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: 'Đã thêm ghi chú!',
            icon: 'success'
          })
          $('.note textarea').replaceWith('<p>' + $('.note textarea').val() + '<p>');
          $('.note-btn').prop('disabled', false);
          $('.deletable').remove();
        } else {
          $('#cancel-note-btn').trigger('click');
        }
      })
    }
  });

  $('#cancel-note-btn').click(() => {
    $('.note-btn').prop('disabled', false);
    $('.deletable').remove();
    $('.note:last-child').remove();
  });

});

$('.btn-bid').click(() => {
  let priceStr = $('.btn-bid').parent().find('input.price-input').val();
  let price = parseInt(priceStr.slice(0, priceStr.length - 1).replace(/,/g, ''));
  console.log(price);

  if (price <= getCurrentPrice()) {
    Swal.fire({
      icon: 'error',
      title: 'Giá không hợp lệ!',
      text: 'Giá đưa ra phải lớn hơn giá hiện tại'
    })
  } else {
    Swal.fire({
      title: priceStr,
      text: "Bạn có chắc chắn với mức giá này?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F8694A',
      cancelButtonColor: '#000',
      confirmButtonText: 'Ra giá <i class="fas fa-gavel"></i>',
      cancelButtonText: 'Hủy bỏ'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Ra giá thành công',
          icon: 'success'
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Đã hủy lượt ra giá'
        })
      }
    })
  }
});