$('#link-rating-seller').click((event) => {
    // console.log($(event.target));
    const pID = $(event.target).parent().attr('productID')
    const sellerID = $(event.target).parent().attr('sellerID')
    const sellerName = $(event.target).parent().attr('sellerName')
    const sellerEmail = $(event.target).parent().attr('sellerEmail')

    $('.rating-seller-pID').val(pID);
    $('.rating-seller-id').val(sellerID);
    $('.rating-seller-name').text(sellerName);
    $('.rating-seller-email').text(sellerEmail);
})

$('.btn-rating-seller').click((event) => {
    var ratingItem = {
        productID: $('.rating-seller-pID').val(),
        sellerID: $('.rating-seller-id').val(),
    };
    console.log(ratingItem);
    $.ajax({
        url: '/evaluation/seller/' + ratingItem.productID,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(ratingItem),
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