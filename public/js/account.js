$('#link-rating').click((event) => {
    // console.log($(event.target));
    const pID = $(event.target).parent().attr('productID')
    $('.message-pID').val(pID);
})

$('.btn-ratting-seller').click((event) => {
    let target = $(event.target).closest('.btn-ratting-seller')

    var productID = target.attr("productID");
    var sellerID = target.attr("sellerID");

    var wishItem = {
        productID,
        sellerID
    };
    $.ajax({
        url: '/evaluation/seller' + productID,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(wishItem),
        success: function (data) {
          if (data == "1") {
            new SnackBar({
              message: "Đánh giá thành công!!",
              status: "success",
              fixed: true,
              timeout: 2000
            });
          }
        },
      });
  });