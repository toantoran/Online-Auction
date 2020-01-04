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

    const bidderTable = createTable($('.bidder-table'), '/admin/users/getAllBidder');
    const sellerTable = createTable($('.seller-table'), '/admin/users/getAllSeller');
    const regisTable = createTable($('.regis-table'), '/admin/users/getAllRegis');
    const adminTable = createTable($('.admin-table'), '/admin/users/getAllAdmin');

    function createTable(table, url) {
        return table.DataTable({
            paging: true,
            ordering: true,
            searching: true,
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
            // serverSide: true,
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

    function deleteUserClick(event) {
        event.preventDefault();
        const userID = $(event.target).attr('userID');
        // console.log(userID);
        Swal.fire({
            title: 'Bạn có chắn chắn muốn xóa User này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#F8694A',
            cancelButtonColor: '#000',
            confirmButtonText: `Xóa <i class="fas fa-trash-alt"></i>`,
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.value) {
                const form = {
                    userID: userID
                }
                $.ajax({
                    url: '/admin/user/delete/' + userID,
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(form),
                    success: function (data) {
                        if (data == "1") {
                            new SnackBar({
                                message: 'Đã xóa thành công User',
                                status: "success",
                                fixed: true,
                                timeout: 2000
                            });
                            setTimeout(() => {
                                window.location.href = '/admin/users'
                            }, 2000);
                        } else {
                            Swal.fire({
                                title: 'Có lỗi xảy ra',
                                text: 'Xóa không thành công. Vui lòng thử lại',
                                icon: 'error'
                            })
                        }
                    },
                });
                resetTable()
            }
        })
    }

    function upgradeUserClick(event) {
        event.preventDefault();
        const userID = $(event.target).attr('userID');
        // console.log(userID);
        Swal.fire({
            title: 'Bạn muốn cho phép User này thành người bán',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#F8694A',
            cancelButtonColor: '#000',
            confirmButtonText: `Xác nhận <i class="fas fa-angle-double-up"></i>`,
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.value) {
                const form = {
                    userID: userID
                }
                $.ajax({
                    url: '/admin/user/upgrade/' + userID,
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(form),
                    success: function (data) {
                        if (data == "1") {
                            new SnackBar({
                                message: 'Cấp quyền người bán thành công',
                                status: "success",
                                fixed: true,
                                timeout: 2000
                            });
                        } else {
                            Swal.fire({
                                title: 'Có lỗi xảy ra',
                                text: 'Vui lòng thử lại',
                                icon: 'error'
                            })
                        }
                    },
                });
                resetTable()
            }
        })
    }

    function downgradeUserClick(event) {
        event.preventDefault();
        const userID = $(event.target).attr('userID');
        // console.log(userID);
        Swal.fire({
            title: 'Bạn muốn hủy quyền người bán của User này?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#F8694A',
            cancelButtonColor: '#000',
            confirmButtonText: `Xác nhận <i class="fas fa-angle-double-down"></i>`,
            cancelButtonText: 'Hủy bỏ'
        }).then((result) => {
            if (result.value) {
                const form = {
                    userID: userID
                }
                $.ajax({
                    url: '/admin/user/downgrade/' + userID,
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(form),
                    success: function (data) {
                        if (data == "1") {
                            new SnackBar({
                                message: 'Hủy quyền người bán thành công',
                                status: "success",
                                fixed: true,
                                timeout: 2000
                            });
                        } else {
                            Swal.fire({
                                title: 'Có lỗi xảy ra',
                                text: 'Vui lòng thử lại',
                                icon: 'error'
                            })
                        }
                    },
                });
                resetTable()
            }
        })
    }

    function resetTable() {
        bidderTable.ajax.reload();
        sellerTable.ajax.reload();
        regisTable.ajax.reload();
        adminTable.ajax.reload();
    }