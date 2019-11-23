(function($) {
  "use strict"

  $("#btn-call-signup").on('click', function() {  
    $('#btn-exit-signin').trigger('click');
    $('#link-signup').trigger('click');
  });
  $("#btn-call-signin").on('click', function() {  
    $('#btn-exit-signup').trigger('click');
    $('#link-signin').trigger('click');
  });


  // NAVIGATION
  var responsiveNav = $('#responsive-nav'),
    catToggle = $('#responsive-nav .category-nav .category-header'),
    catList = $('#responsive-nav .category-nav .category-list'),
    menuToggle = $('#responsive-nav .menu-nav .menu-header'),
    menuList = $('#responsive-nav .menu-nav .menu-list');

  catToggle.on('click', function() {
    menuList.removeClass('open');
    catList.toggleClass('open');
  });

  menuToggle.on('click', function() {
    catList.removeClass('open');
    menuList.toggleClass('open');
  });

  $(document).click(function(event) {
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
        to: function(value) {
          return value.toFixed(0) + ' triệu';
        },
        from: function(value) {
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

  function Bid (time, name, price) {
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
      { data: 'time' },
      { data: 'name' },
      { data: 'price' },
    ],
    'headers': ["Thời gian", "Người mua", 'Giá'],
    "language": {
      "emptyTable": "Chưa có lượt ra giá nào",
      "info": "",
      "infoEmpty": "",
      "lengthMenu": "Hiện _MENU_ lượt ra giá",
      "paginate": {
        "first":      "Đầu",
        "last":       "Cuối",
        "next":       "Sau",
        "previous":   "Trước"
      }
    }
  });

  const autoNumericOptionsEuro = {
    digitGroupSeparator: ' ',
    currencySymbol: '₫',
    decimalPlaces: 0,
    currencySymbolPlacement: AutoNumeric.options.currencySymbolPlacement.suffix,
    roundingMethod: AutoNumeric.options.roundingMethod.halfUpSymmetric
  };

  // Initialization
  new AutoNumeric('.price-input', autoNumericOptionsEuro);


 

  
})(jQuery);



