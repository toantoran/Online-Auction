$('#link-rating').click((event) => {
    // console.log($(event.target));
    const pID = $(event.target).parent().attr('productID')
    $('.message-pID').val(pID);
})