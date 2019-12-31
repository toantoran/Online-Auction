$('#cateIcon').on('input', function () {
    console.log('object');
    $('#generate-icon').html(`<i class="fas fa-${$('#cateIcon').val()}"></i>`)
});

let cateID = (window.location.pathname.slice(-1));
$('.list-links').children('.sub').eq(cateID).children().addClass('link-active')