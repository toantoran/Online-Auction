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

let isSeller = document.getElementById("isSeller").value;

function checkBid() {
    let flag = true;

    if (isSeller === "true") {
        new SnackBar({
            message: "Bạn là người bán sản phẩm này, không thể ra giá!",
            status: "warning",
            fixed: true,
            timeout: 2000
        });
        flag = false;
    }
    return flag;
}