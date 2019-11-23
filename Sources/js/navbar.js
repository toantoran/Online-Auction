$('.cat-list>li>a').addClass('cat-link').attr('cat-order', index => index);

$('.cat-link').hover((event) => {
    changeCatImage(event);
});

function changeCatImage(event) {
    let img = $(event.target).closest('.row').find('.cat-img');

    img.attr('src', 'img/' + $(event.target).attr('cat-order') + '.jpg')
}