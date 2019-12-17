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

function checkBid() {
    let flag = true;
    return flag;
}

//Bid Table
function Bid(time, name, price) {
    this.time = time;
    this.name = name;
    this.price = price;
    return this;
};

let tempData = [];
let wishData = [];
getdata($('.bid-table-data'))

function getdata(object) {
    for (let i = 0; i < object.length; i++) {
        let bidderName = object.find('#bid-bidderName')[i].value;
        let bidTime = object.find('#bid-bidTime')[i].value;
        let price = object.find('#bid-Price')[i].value;
        let bid = new Bid(bidTime, bidderName, price);
        tempData.push(bid);

        let productID = object.find('#bid-productID')[i].value;
        let bidderID = object.find('#bid-bidderID')[i].value;
        wishData.push({
            productID,
            bidderID,
        });
    }
}
let bibTable = $('.bid-table');
bibTable.DataTable({
    searching: false,
    sort: false,
    paging: false,
    data: tempData,
    columns: [{
            data: 'time',
            sTitle: 'Thời gian'
        },
        {
            data: 'name',
            sTitle: 'Người đấu giá'
        },
        {
            data: 'price',
            sTitle: 'Giá'
        }
    ],
    "language": {
        "emptyTable": "Chưa có lượt ra giá nào",
        "info": "",
        "infoEmpty": "",
        "lengthMenu": "Hiện _MENU_ lượt ra giá",
        "paginate": {
            "first": "Đầu",
            "last": "Cuối",
            "next": "Sau",
            "previous": "Trước"
        }
    }
});

let bodyBibTalbe = bibTable.find('tbody tr');
let isSeller = document.getElementById('isSellerBid').value;
if (isSeller === "true" && tempData.length > 0) {
    bodyBibTalbe.append("<td><button class='main-btn refuse-btn'>Từ chối</button></td>");
}

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
                                    message: "Bạn không phải chủ sở hữu sản phẩm này!",
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
//End bidtable

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