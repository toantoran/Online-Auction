(function ($) {
  "use strict"

  $("#btn-call-signup").on('click', function () {
    $('#btn-exit-signin').trigger('click');
    $('#link-signup').trigger('click');
  });
  $("#btn-call-signin").on('click', function () {
    $('#btn-exit-signup').trigger('click');
    $('#link-signin').trigger('click');
  });

  $('.cat-list>li>a').addClass('cat-link').attr('cat-order', index => index);

  $('.cat-link').hover((event) => {
    changeCatImage(event);
  });

  function changeCatImage(event) {
    let img = $(event.target).closest('.row').find('.cat-img');
    img.attr('src', 'img/' + $(event.target).attr('cat-order') + '.jpg')
  }


  $('.quick-view').click((event) => {
    window.location.href = $(event.target).parent().parent().find('.product-body .product-name a').attr('href');
  });
  $('.btn-wish').click((event) => {
    let target = $(event.target).closest('.btn-wish')
    target.toggleClass('focus');
    if (target.hasClass('focus')) {
      new SnackBar({
        message: "Đã thêm vào danh sách yêu thích",
        status: "success",
        fixed: true,
        timeout: 2000
      });
    }
    else {
      new SnackBar({
        message: "Đã xóa khỏi danh sách yêu thích",
        status: "warning",
        fixed: true,
        timeout: 2000
      });
    }
  });


  // NAVIGATION
  var responsiveNav = $('#responsive-nav'),
    catToggle = $('#responsive-nav .category-nav .category-header'),
    catList = $('#responsive-nav .category-nav .category-list'),
    menuToggle = $('#responsive-nav .menu-nav .menu-header'),
    menuList = $('#responsive-nav .menu-nav .menu-list');

  catToggle.on('click', function () {
    menuList.removeClass('open');
    catList.toggleClass('open');
  });

  menuToggle.on('click', function () {
    catList.removeClass('open');
    menuList.toggleClass('open');
  });

  $(document).click(function (event) {
    if (!$(event.target).closest(responsiveNav).length) {
      if (responsiveNav.hasClass('open')) {
        responsiveNav.removeClass('open');
        $('#navigation').removeClass('shadow');
      } else {
        if ($(event.target).closest('.nav-toggle > button').length) {
          if (!menuList.hasClass('open') && !catList.hasClass('open')) {
            menuList.addClass('open');
          }
          $('#navigation').addClass('shadow');
          responsiveNav.addClass('open');
        }
      }
    }
  });

  // HOME SLICK
  $('#home-slick').slick({
    autoplay: true,
    infinite: true,
    speed: 300,
    arrows: true,
  });

  // PRODUCTS SLICK

  let noSlick = {
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 300,
    dots: false,
    arrows: true,
    responsive: [{
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        dots: false,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    ]
  }

  let latestSlick = {
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    infinite: false,
    speed: 500,
    dots: true,
    arrows: true,
    appendDots: '.product-slick-dots-latest',
    responsive: [{
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        dots: false,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    },
    ]
  }
  $('#product-slick-1').slick(noSlick);
  $('#product-slick-2').slick(noSlick);
  $('#product-slick-3').slick(noSlick);
  $('#product-slick-latest').slick(latestSlick);

  // PRODUCT DETAILS SLICK
  $('#product-main-view').slick({
    infinite: true,
    speed: 300,
    dots: false,
    arrows: true,
    fade: true,
    asNavFor: '#product-view',
  });

  $('#product-view').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    focusOnSelect: true,
    asNavFor: '#product-main-view',
  });

  // PRODUCT ZOOM
  $('#product-main-view .product-view').zoom();

  // PRICE SLIDER
  var slider = document.getElementById('price-slider');
  if (slider) {
    noUiSlider.create(slider, {
      start: [0, 50],
      connect: true,
      tooltips: [true, true],
      format: {
        to: function (value) {
          return value.toFixed(0) + ' triệu';
        },
        from: function (value) {
          return value
        }
      },
      step: 0.5,
      range: {
        'min': 0,
        'max': 50
      }
    });
  }

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
    columns: [
      { data: 'time', sTitle: 'Thời gian' },
      { data: 'name', sTitle: 'Người đấu giá' },
      { data: 'price', sTitle: 'Giá' }
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
      }
      else {
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
          }
          else {
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
    }
    else {
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
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Đã hủy lượt ra giá'
          })
        }
      })
    }
  });


  const autoNumericOptionsEuro = {
    digitGroupSeparator: ',',
    currencySymbol: '₫',
    decimalPlaces: 0,
    currencySymbolPlacement: AutoNumeric.options.currencySymbolPlacement.suffix,
    roundingMethod: AutoNumeric.options.roundingMethod.halfUpSymmetric
  };

  // Initialization


  function getValidPrice(currentPrice, priceStep) {
    return currentPrice + priceStep;
  }

  function getCurrentPrice() {
    let a = $('.product-price#current').text();
    return parseInt(a.slice(0, a.length - 1).replace(/,/g, ''));
  }

  $('.price-input').val(getValidPrice(getCurrentPrice(), 100000));

  new AutoNumeric('.price-input', autoNumericOptionsEuro);



})(jQuery);



