$('#link-rating-seller').click((event) => {
    // console.log($(event.target));
    $('#seller-up').prop('checked', true)
    const pID = $(event.target).parent().attr('productID')
    const sellerID = $(event.target).parent().attr('sellerID')
    const sellerName = $(event.target).parent().attr('sellerName')
    const sellerEmail = $(event.target).parent().attr('sellerEmail')

    $('.rating-seller-pID').val(pID);
    $('.rating-seller-id').val(sellerID);
    $('.rating-seller-name').text(sellerName);
    $('.rating-seller-email').text(sellerEmail);

    $('.rating-seller-content').val('')
})

$('.btn-rating-seller').click((event) => {
    var ratingItem = {
        productID: $('.rating-seller-pID').val(),
        sellerID: $('.rating-seller-id').val(),
        isGood: ($('.radio-like#seller-up').prop('checked') === true) ? 1 : 0,
        content: $('.rating-seller-content').val()
    };

    //để thửu coi
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
            } else {
                new SnackBar({
                    message: "Bạn đã đánh giá trước đó!!",
                    status: "warning",
                    fixed: true,
                    timeout: 2000
                });
            }
        },
    });

    $('#btn-exit-rating-seller').click()
});


$('.btn-rating-top').click((event) => {
    // console.log($(event.target));
    // console.log("flag"); 

    $('.rating-winner-content').val('')

    $('#winner-up').prop('checked', true)
    const pID = $(event.target).parent().attr('productID')
    const winnerID = $(event.target).parent().attr('winnerID')
    const winnerName = $(event.target).parent().attr('winnerName')
    const winnerEmail = $(event.target).parent().attr('winnerEmail')

    $('.rating-winner-pID').val(pID);
    $('.rating-winner-id').val(winnerID);
    $('.rating-winner-name').text(winnerName);
    $('.rating-winner-email').text(winnerEmail);
})

$('.btn-rating-winner').click((event) => {
    var ratingItem = {
        productID: $('.rating-winner-pID').val(),
        winnerID: $('.rating-winner-id').val(),
        isGood: ($('.radio-like#winner-up').prop('checked') === true) ? 1 : 0,
        content: $('.rating-winner-content').val()
    };

    //để thửu coi roi lam tiep di :v
    console.log(ratingItem);
    $.ajax({
        url: '/evaluation/winner/' + ratingItem.productID,
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
            } else {
                new SnackBar({
                    message: "Bạn đã đánh giá trước đó!!",
                    status: "warning",
                    fixed: true,
                    timeout: 2000
                });
            }
        },
    });

    $('#btn-exit-rating-winner').click()
});