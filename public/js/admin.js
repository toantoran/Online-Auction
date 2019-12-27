$('.list-links li.sub').click(() => {
    $(this).addClass('link-active')
})

$('.cate-table').DataTable({
    paging: false,
    ordering: false,
    searching: false,
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
    serverSide: true,
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
        ordering: false,
        searching: false,
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
        serverSide: true,
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