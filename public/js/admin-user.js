// window.history.pushState(null, null, "/admin/users")

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

$('.list-links li.sub').click(() => {
    $(this).addClass('link-active')
})

createTable($('.bidder-table'), '/admin/users/getAllBidder');
createTable($('.seller-table'), '/admin/users/getAllSeller')
createTable($('.admin-table'), '/admin/users/getAllAdmin')

function createTable(table, url) {
    table.DataTable({
        paging: false,
        ordering: false,
        searching: false,
        "language": {
            "emptyTable": "Không có User",
            "info": "",
            "infoEmpty": "",
            "lengthMenu": "Hiện _MENU_ User",
            "loadingRecords": "Đang tải...",
            "processing": "Đang xử lý...",
            "search": "Tìm kiếm:",
            "zeroRecords": "Không tìm thấy User",
            "paginate": {
                "first": "Đầu",
                "last": "Cuối",
                "next": "Sau",
                "previous": "Trước"
            }
        },
        processing: true,
        serverSide: true,
        ajax: url,
        columns: [{
                data: "userID"
            },
            {
                data: "name"
            },
            {
                data: "email"
            },
            {
                data: "tel"
            },
            {
                data: "address"
            },
            {
                data: "birthDay"
            },
            {
                data: "point"
            },
            {
                data: "button"
            }
        ]
    })
}

function confirmDelete(userID) {
    Swal.fire({
        title: 'Bạn có chắn chắn muốn xóa User này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F8694A',
        cancelButtonColor: '#000',
        confirmButtonText: `<a onclick="deteUser(${userID})">Xóa <i class="fas fa-trash-alt"></i></a>`,
        cancelButtonText: 'Hủy bỏ'
    });
}

function deleteUser(userID) {
    $(`button[type="submit"][formaction="/admin/user/detele/${userID}"]`).click();
}

function confirmDowngrade(userID) {
    Swal.fire({
        title: 'Bạn có chắn chắn muốn hủy quyền "Người bán" của User này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#F8694A',
        cancelButtonColor: '#000',
        confirmButtonText: `<a onclick="deteUser(${userID})">Chắc chắn <i class="fas fa-angle-double-down"></i></a>`,
        cancelButtonText: 'Hủy bỏ'
    });
}

function downgradeUser(userID) {
    $(`button[type="submit"][formaction="/admin/user/downgrade/${userID}"]`).click();
}