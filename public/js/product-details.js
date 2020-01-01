let productID = document.getElementById("productID").value;
window.history.pushState(null, null, `/product/${productID}`);

let status = document.getElementById("status").value;
let message = document.getElementById("message").value;

if (message !== "") {
    if (status === "true") {
        new SnackBar({
            message: message,
            status: "success",
            fixed: true,
            timeout: 2000
        });
    } else {
        new SnackBar({
            message: message,
            status: "warning",
            fixed: true,
            timeout: 2000
        });
    }
}

tinymce.init({
    selector: '#desc-editor',
    height: 500,
    plugins: 'paste image link autolink lists table media',
    menubar: false,
    toolbar: [
        'undo redo | bold italic underline strikethrough | numlist bullist | alignleft aligncenter alignright forecolor backcolor',
        'table link image media',
    ],
});

$('#btn-bid').click((event) => {
    event.preventDefault();
    Swal.fire({
        title: "Bạn có chắc chắn với mức giá này?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F8694A',
        cancelButtonColor: '#000',
        confirmButtonText: '<a onclick="bidSubmit()">Ra giá <i class="fas fa-gavel"></i></a>',
        cancelButtonText: 'Hủy bỏ'
    })
})

$('.main-btn.icon-btn.btn-confirm-delete').click(() => {
    Swal.fire({
        title: 'Bạn chắc chắn muốn gỡ bỏ sản phẩm này?',
        text: 'Bạn không thể hoàn tác',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F8694A',
        cancelButtonColor: '#000',
        confirmButtonText: '<a onclick="deleteSubmit()">Chắc chắn <i class="fas fa-trash"></i></a>',
        cancelButtonText: 'Hủy'
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: 'Sản phẩm đã được gỡ bỏ',
                icon: 'success',
            })
        }
    })
})

function bidSubmit() {
    // alert('abc');
    $('#btn-submit').click();
}

function deleteSubmit() {
    $('#btn-delete').click();
}

function noteSubmit() {
    // alert('abc')
    $('#submit-note-btn').click();
}

function checkBid() {
    let a = $('input#bidPrice');
    let step = numeral($('span#step').text()).value();
    let current = numeral($('span#current').text()).value();
    let msg = $('p.err-validate#err-bidPrice');
    let min = current + step;
    if (numeral(a.val()).value() < min) {
        msg.html(`<i class="fas fa-exclamation-triangle"></i>&nbsp;Giá tối thiểu là ${numeral(min).format(0,0) +' đ'}`).css('display', 'block')
        return false;
    } else if (numeral(a.val()).value() % step != 0) {
        msg.html('<i class="fas fa-exclamation-triangle"></i>&nbsp;Giá đưa ra phải là bội của bước giá: ' + $('span#step').text()).css('display', 'block')
        return false;
    } else {
        msg.css('display', 'none');
    }

    return true;
}

function checkNote() {

    return true;
}

$('input#bidPrice').val(numeral($('input#bidPrice').val()).format('0,0'))
$('input#bidPrice').on('input', function () {
    $('input#bidPrice').val(numeral($('input#bidPrice').val()).format('0,0'));
});

$('input#bidPrice').focusout(() => {
    let a = $('input#bidPrice');
    if (a.val().includes(',')) {
        a.val(a.val().replace(/,\d\d\d(?!,)/, ',000'));
    }
    if ($('#immePrice').length > 0) {
        if (numeral($('input#bidPrice').val()).value() > numeral($('#immePrice').text()).value()) {
            $('input#bidPrice').val(numeral($('#immePrice').text()).format('0,0'))
        }
    }

})

$('.note-btn').click(() => {
    $('.note-btn').prop('disabled', true);
    var d = new Date();
    var strDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} [${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}]`;
    let rtn = "return checkNote()";
    const productID = $('.note-btn').attr('productID');
    $('.note-btn').parent().parent().parent().append(
        `<form method="post" action="/seller/product/${productID}/addDesc" class="deletable" onsubmit="${rtn}">\
            <div class="note">\
                <p><i class="fas fa-edit"></i> <span class="note-date">${strDate}</span></p>\
                <textarea id="desc-editor" name="desc"></textarea>\
            </div>\
            <div class="pull-right">\
                <button class="main-btn" id="submit-note-btn" type="submit" style="display: none">Xong</button>\
                <button class="main-btn" id="done-note-btn">Xong</button>\
                <button class="main-btn" id="cancel-note-btn">Hủy bỏ</button>\
            </div>\
        </form>`);
    tinymce.init({
        selector: '#desc-editor',
        height: 400,
        plugins: 'paste image link autolink lists table media',
        menubar: false,
        toolbar: [
            'undo redo | bold italic underline strikethrough | numlist bullist | alignleft aligncenter alignright forecolor backcolor',
            'table link image media',
        ],
    });

    $('#done-note-btn').click((event) => {
        event.preventDefault();
        tinyMCE.triggerSave();
        if ($('#desc-editor').val().trim().length == 0) {
            Swal.fire({
                icon: 'error',
                title: 'Nội dung không được để trống',
                confirmButtonColor: '#F8694A'
            });
        } else {
            Swal.fire({
                title: 'Thêm mô tả này ?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#F8694A',
                cancelButtonColor: '#000',
                confirmButtonText: '<a onclick="noteSubmit()">Thêm</a>',
                cancelButtonText: 'Hủy bỏ'
            })
        }
    });

    $('#cancel-note-btn').click(() => {
        $('.note-btn').prop('disabled', false);
        tinymce.remove('#desc-editor');
        $('.deletable').remove();
    });

});

const isSeller = $('#isSeller').val();
let action = `/product/getbidtable/${productID}`;
if (isSeller === 'true') {
    action = `/seller/product/getbidtable/${productID}`;
    $('.bid-table').DataTable({
        paging: true,
        ordering: false,
        searching: true,
        "language": {
            "emptyTable": "Chưa có lượt ra giá nào",
            "info": "HIện _START_ đến _END_ trong tổng số _TOTAL_ lượt",
            "infoEmpty": "",
            "lengthMenu": "Hiện _MENU_ lượt",
            "loadingRecords": "Đang tải...",
            "processing": "Đang xử lý...",
            "search": "Tìm kiếm:",
            "zeroRecords": "Không tìm thấy kết quả",
            "infoFiltered": "(Lọc từ _MAX_ lượt ra giá)",
            "paginate": {
                "first": "Đầu",
                "last": "Cuối",
                "next": "Sau",
                "previous": "Trước"
            }
        },
        processing: true,
        // serverSide: true,
        ajax: action,
        columns: [{
                data: "bidTime"
            },
            {
                data: "bidderName"
            },
            {
                data: "price"
            },
            {
                data: "button"
            }
        ]
    })
} else {
    $('.bid-table').DataTable({
        paging: true,
        ordering: false,
        searching: true,
        "language": {
            "emptyTable": "Chưa có lượt ra giá nào",
            "info": "HIện _START_ đến _END_ trong tổng số _TOTAL_ lượt",
            "infoEmpty": "",
            "lengthMenu": "Hiện _MENU_ lượt",
            "loadingRecords": "Đang tải...",
            "processing": "Đang xử lý...",
            "search": "Tìm kiếm:",
            "zeroRecords": "Không tìm thấy kết quả",
            "infoFiltered": "(Lọc từ _MAX_ lượt ra giá)",
            "paginate": {
                "first": "Đầu",
                "last": "Cuối",
                "next": "Sau",
                "previous": "Trước"
            }
        },
        processing: true,
        // serverSide: true,
        ajax: action,
        columns: [{
                data: "bidTime"
            },
            {
                data: "bidderName"
            },
            {
                data: "price"
            }
        ]
    })
}

// $('tbody > tr > td:nth-child(4)').css('width', '170px')

setEventRefuseBtn($('.refuse-btn'))

function setEventRefuseBtn(object) {
    for (let i = 0; i < object.length; i++) {
        object[i].onclick = () => {
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
                    var wishItem = wishData[i];
                    $.ajax({
                        url: '/product/' + wishItem.productID + '/refuseBid',
                        type: 'post',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify(wishItem),
                        success: function (data) {
                            if (data === "1") {
                                new SnackBar({
                                    message: "Từ chối đấu giá thành công",
                                    status: "success",
                                    fixed: true,
                                    timeout: 2000
                                });
                                Swal.fire({
                                    title: 'Đã từ chối lượt đấu giá !',
                                    text: 'Người này không thể tham gia đấu giá sản phẩm này nữa',
                                    icon: 'success'
                                }).then((result) => {
                                    if (result.value) {
                                        window.location = '/product/' + wishItem.productID;
                                    }
                                })
                            } else {
                                new SnackBar({
                                    message: "Bạn không có thẩm quyền từ chối!",
                                    status: "warning",
                                    fixed: true,
                                    timeout: 2000
                                });
                            }
                        }
                    });
                }
            })
        }
    }
}

// $('#DataTables_Table_0').css('width', '100%')

showCountDown($('.product-body'))

function showCountDown(object) {
    console.log(object.length);
    for (let i = 0; i < object.length; i++) {
        let demoExpDate = object.find("#endDate")[i].value;
        let h = object.find('.product-countdown li:nth-child(1) span')[i];
        let m = object.find('.product-countdown li:nth-child(2) span')[i];
        let s = object.find('.product-countdown li:nth-child(3) span')[i];
        let x = setInterval(function () {
            let now = new Date().getTime();
            let distance = demoExpDate - now;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            hours += days * 24;
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            h.innerHTML = hours + ' H';
            m.innerHTML = minutes + ' M';
            s.innerHTML = seconds + ' S';
            if (distance < 0) {
                clearInterval(x);
                h.innerHTML = 0 + ' H';
                m.innerHTML = 0 + ' M';
                s.innerHTML = 0 + ' S';
            }
        }, 1000);
    }
}