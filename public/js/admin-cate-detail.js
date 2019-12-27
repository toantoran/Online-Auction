$('#cateIcon').on('input', function () {
    console.log('object');
    $('#generate-icon').html(`<i class="fas fa-${$('#cateIcon').val()}"></i>`)
});