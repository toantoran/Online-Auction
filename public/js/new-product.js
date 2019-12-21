$.fn.scrollView = function () {
    return this.each(function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 500);
    });
}

$('input.price').on('input', function () {
    let number = numeral(this.value)
    this.value = number.format('0,0');
});

$('input.price').focusout((event) => {
    let a = $(event.target);
    if (a.val().includes(',')) {
        a.val(a.val().replace(/,\d\d\d(?!,)/, ',000'));
    }
})

tinymce.init({
    selector: '#desc-editor',
    height: 600,
    plugins: 'paste image link autolink lists table media',
    menubar: false,
    toolbar: [
        'undo redo | bold italic underline strikethrough | numlist bullist | alignleft aligncenter alignright forecolor backcolor',
        'table link image media',
    ],
});


$('#file-input-thumb').filer({
    clipBoardPaste: true,
    addMore: true,
    extensions: ["jpg", "png", "gif"],
    showThumbs: true,
    templates: {
        box: '<ul class="jFiler-items-list jFiler-items-default"></ul>',
        item: '<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-icon pull-left">{{fi-icon}}</div><div class="jFiler-item-info pull-left"><div class="jFiler-item-title" title="{{fi-name}}">{{fi-name | limitTo:30}}</div><div class="jFiler-item-others"><span>size: {{fi-size2}}</span><span>type: {{fi-extension}}</span><span class="jFiler-item-status">{{fi-progressBar}}</span></div><div class="jFiler-item-assets"><ul class="list-inline"><li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li></ul></div></div></div></div></li>',
        itemAppend: '<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-icon pull-left">{{fi-icon}}</div><div class="jFiler-item-info pull-left"><div class="jFiler-item-title">{{fi-name | limitTo:35}}</div><div class="jFiler-item-others"><span>size: {{fi-size2}}</span><span>type: {{fi-extension}}</span><span class="jFiler-item-status"></span></div><div class="jFiler-item-assets"><ul class="list-inline"><li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li></ul></div></div></div></div></li>',
        progressBar: '<div class="bar"></div>',
        itemAppendToEnd: true,
        removeConfirmation: false,
        canvasImage: true,
        _selectors: {
            list: '.jFiler-items-list',
            item: '.jFiler-item',
            progressBar: '.bar',
            remove: '.jFiler-item-trash-action'
        }
    },
    afterShow: () => {
        $('.jFiler-items-default .jFiler-item-assets a').html('<i class="fas fa-trash-alt"></i>')
    }
});

$('#file-input-main').filer({
    limit: 1,
    clipBoardPaste: true,
    extensions: ["jpg", "png", "gif", "jfif"],
    showThumbs: true,
    templates: {
        box: '<ul class="jFiler-items-list jFiler-items-default"></ul>',
        item: '<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-icon pull-left">{{fi-icon}}</div><div class="jFiler-item-info pull-left"><div class="jFiler-item-title" title="{{fi-name}}">{{fi-name | limitTo:30}}</div><div class="jFiler-item-others"><span>size: {{fi-size2}}</span><span>type: {{fi-extension}}</span><span class="jFiler-item-status">{{fi-progressBar}}</span></div><div class="jFiler-item-assets"><ul class="list-inline"><li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li></ul></div></div></div></div></li>',
        itemAppend: '<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-icon pull-left">{{fi-icon}}</div><div class="jFiler-item-info pull-left"><div class="jFiler-item-title">{{fi-name | limitTo:35}}</div><div class="jFiler-item-others"><span>size: {{fi-size2}}</span><span>type: {{fi-extension}}</span><span class="jFiler-item-status"></span></div><div class="jFiler-item-assets"><ul class="list-inline"><li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li></ul></div></div></div></div></li>',
        progressBar: '<div class="bar"></div>',
        itemAppendToEnd: true,
        removeConfirmation: false,
        canvasImage: true,
        _selectors: {
            list: '.jFiler-items-list',
            item: '.jFiler-item',
            progressBar: '.bar',
            remove: '.jFiler-item-trash-action'
        }
    },
    afterShow: () => {
        $('.jFiler-items-default .jFiler-item-assets a').html('<i class="fas fa-trash-alt"></i>')
    }
});


$('.main-btn.btn-new').click(() => {
    Swal.fire({
        title: 'Tạo phiên đấu giá cho sản phẩm này ?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#F8694A',
        cancelButtonColor: '#000',
        confirmButtonText: '<a onclick="formSubmit()">Đấu giá sản phẩm <i class="fas fa-gavel"></i></a>',
        cancelButtonText: 'Hủy bỏ'
    });
});

function formSubmit() {
    $('#btn-submit').click();
}

function validateNewProduct(event) {
    // event.preventDefault();
    // alert('abc')
    const product = {
        name: $('input#productName').val(),
        cate: $('select#productCate option:selected').attr('cateID'),
        subcate: $('select#productCate option:selected').attr('subcateID'),
        brand: $('input#brand').val(),
        from: $('input#pFrom').val(),
        beginPrice: numeral($('input#beginPrice').val()).value(),
        stepPrice: numeral($('input#stepPrice').val()).value(),
        immePrice: numeral($('input#immePrice').val()).value(),
        autoExtend: document.querySelector('.js-switch').checked,
        mainImg: $('input#file-input-main').val(),
        thumb: $('#frmNew > div:nth-child(3) > div:nth-child(2) > div > div > div.jFiler-input > div.jFiler-input-caption > span').text()
    }

    const msg = {
        name: $('p.err-validate#err-name'),
        cate: $('p.err-validate#err-cate'),
        beginPrice: $('p.err-validate#err-begin'),
        stepPrice: $('p.err-validate#err-step'),
        immePrice: $('p.err-validate#err-imme'),
        mainImg: $('p.err-validate#err-mainImg'),
        thumb: $('p.err-validate#err-thumb')
    }

    if (product.name == '' || product.name == null) {
        msg.name.html('<i class="fas fa-exclamation-triangle"></i>&nbsp;Tên sản phẩm không được để trống').css('display', 'block')
        msg.name.scrollView();
        return false;
    } else {
        msg.name.css('display', 'none')
    }
    if (!(product.cate && product.subcate)) {
        msg.cate.html('<i class="fas fa-exclamation-triangle"></i>&nbsp;Hãy chọn danh mục cho sản phẩm của bạn').css('display', 'block')
        msg.cate.scrollView();
        return false;
    } else {
        msg.cate.css('display', 'none')
    }
    if (product.beginPrice == 0 || product.beginPrice == null) {
        msg.beginPrice.html('<i class="fas fa-exclamation-triangle"></i>&nbsp;Hãy nhập giá khởi điểm cho sản phẩm của bạn').css('display', 'block')
        msg.beginPrice.scrollView();
        return false;
    } else {
        if (product.beginPrice < 100000) {
            msg.beginPrice.html('<i class="fas fa-exclamation-triangle"></i>&nbsp;Giá khởi điểm tối thiểu là 100,000 đồng').css('display', 'block')
            msg.beginPrice.scrollView();
            return false;
        } else {
            msg.beginPrice.css('display', 'none')
        }
    }
    if (product.stepPrice == 0 || product.stepPrice == null) {
        msg.stepPrice.html('<i class="fas fa-exclamation-triangle"></i>&nbsp;Hãy nhập bước giá cho sản phẩm của bạn').css('display', 'block')
        msg.stepPrice.scrollView();
        return false;
    } else {
        if (product.stepPrice < 10000) {
            msg.stepPrice.html('<i class="fas fa-exclamation-triangle"></i>&nbsp;Bước giá tối thiểu là 10,000 đồng').css('display', 'block')
            msg.stepPrice.scrollView();
            return false;
        } else {
            msg.stepPrice.css('display', 'none')
        }
    }
    if (product.immePrice != 0 && product.immePrice != null) {
        if (product.immePrice <= product.beginPrice) {
            msg.immePrice.html('<i class="fas fa-exclamation-triangle"></i>&nbsp;Giá mua ngay phải lớn hơn giá khởi điểm').css('display', 'block')
            msg.immePrice.scrollView();
            return false;
        } else {
            msg.immePrice.css('display', 'none')
        }
    }

    if (product.mainImg == '') {
        msg.mainImg.html('<i class="fas fa-exclamation-triangle"></i>&nbsp;Sản phẩm phải có một ảnh chính').css('display', 'block')
        msg.mainImg.scrollView();
        return false;
    } else {
        msg.mainImg.css('display', 'none')
    }

    if (product.thumb.includes('Upload') || product.thumb.includes('1') || product.thumb.includes('2')) {
        msg.thumb.html('<i class="fas fa-exclamation-triangle"></i>&nbsp;Sản phẩm phải có ít nhất 3 ảnh phụ').css('display', 'block')
        msg.thumb.scrollView();
        return false;
    } else {
        msg.thumb.css('display', 'none')
    }
    return true;
}