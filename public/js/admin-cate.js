//window.history.pushState(null, null, "/admin/category")

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

$('.cate-table').DataTable({
    paging: false,
    ordering: true,
    searching: true,
    "language": {
        "emptyTable": "Không có danh mục",
        "info": "",
        "infoEmpty": "",
        "lengthMenu": "Hiện _MENU_ danh mục",
        "loadingRecords": "Đang tải...",
        "processing": "Đang xử lý...",
        "search": "Tìm kiếm:",
        "zeroRecords": "Không tìm thấy danh mục",
        "paginate": {
            "first": "Đầu",
            "last": "Cuối",
            "next": "Sau",
            "previous": "Trước"
        }
    },
    processing: true,
    // serverSide: true,
    ajax: `/admin/getCateTable`,
    columns: [{
            data: "cateID"
        },
        {
            data: "cateName"
        },
        {
            data: "cateIcon"
        },
        {
            data: "button"
        }
    ]
})


function createTable(table, cateID) {
    table.DataTable({
        paging: false,
        ordering: true,
        searching: true,
        "language": {
            "emptyTable": "Không có danh mục con",
            "info": "",
            "infoEmpty": "",
            "lengthMenu": "Hiện _MENU_ danh mục con",
            "loadingRecords": "Đang tải...",
            "processing": "Đang xử lý...",
            "search": "Tìm kiếm:",
            "zeroRecords": "Không tìm thấy danh mục",
            "paginate": {
                "first": "Đầu",
                "last": "Cuối",
                "next": "Sau",
                "previous": "Trước"
            }
        },
        processing: true,
        // serverSide: true,
        ajax: `/admin/getSubcateTable/${cateID}`,
        columns: [{
                data: "subcateID"
            },
            {
                data: "subcateName"
            },
            {
                data: "productsCount"
            },
            {
                data: "button"
            }
        ]
    })
}

const length = $('.subcate-table').length
for (let i = 1; i <= length; i++) {
    createTable($(`.subcate-table[cateID=${i}]`), i);
}

function confirmDelete() {
    console.log(arguments);
    if (arguments.length === 1) {
        Swal.fire({
            title: 'Bạn có chắn chắn muốn xóa\ndanh mục này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F8694A',
            cancelButtonColor: '#000',
            confirmButtonText: `<a onclick="deleteCate(${arguments[0]})">Xóa <i class="fas fa-trash-alt"></i></a>`,
            cancelButtonText: 'Hủy bỏ'
        });
    } else {
        Swal.fire({
            title: 'Bạn có chắn chắn muốn xóa\ndanh mục con này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F8694A',
            cancelButtonColor: '#000',
            confirmButtonText: `<a onclick="deleteCate(${arguments[0]}, ${arguments[1]})">Xóa <i class="fas fa-trash-alt"></i></a>`,
            cancelButtonText: 'Hủy bỏ'
        });
    }
}

function deleteCate() {
    if (arguments.length === 1) {
        $(`button[type="submit"][formaction="/admin/category/delete/${arguments[0]}"]`).click();
    } else {
        $(`button[type="submit"][formaction='/admin/category/sub/delete/${arguments[0]}/${arguments[1]}']`).click()
    }
}

// if(status)
// {
//     window.history.pushState(null, null, "/admin/category")
// }