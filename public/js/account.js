$(".datepicker-here").datepicker({
	language: "en",
	maxDate: new Date(),
	minDate: new Date("1900-1-1"),
	startDate: new Date("1999-1-1")
});

$("#link-rating-seller").click(event => {
	$("#seller-up").prop("checked", true);
	const pID = $(event.target).attr("productID");
	const sellerID = $(event.target).attr("sellerID");
	const sellerName = $(event.target).attr("sellerName");
	const sellerEmail = $(event.target).attr("sellerEmail");

	$(".rating-seller-pID").val(pID);
	$(".rating-seller-id").val(sellerID);
	$(".rating-seller-name").text(sellerName);
	$(".rating-seller-email").text(sellerEmail);

	$(".rating-seller-content").val("");
});

$(".btn-rating-seller").click(event => {
	var ratingItem = {
		productID: $(".rating-seller-pID").val(),
		sellerID: $(".rating-seller-id").val(),
		isGood: $(".radio-like#seller-up").prop("checked") === true ? 1 : 0,
		content: $(".rating-seller-content").val()
	};

	$.ajax({
		url: "/evaluation/seller/" + ratingItem.productID,
		type: "post",
		dataType: "json",
		contentType: "application/json",
		data: JSON.stringify(ratingItem),
		success: function(data) {
			if (data == "1") {
				new SnackBar({
					message: "Đánh giá thành công!!",
					status: "success",
					fixed: true,
					timeout: 2000
				});
			} else {
				new SnackBar({
					message: "Bạn đã đánh giá trước đó!!",
					status: "warning",
					fixed: true,
					timeout: 2000
				});
			}
		}
	});

	$("#btn-exit-rating-seller").click();
});

$("#link-rating-winner").click(event => {
	$(".rating-winner-content").val("");

	$("#winner-up").prop("checked", true);
	const pID = $(event.target).attr("productID");
	const winnerID = $(event.target).attr("winnerID");
	const winnerName = $(event.target).attr("winnerName");
	const winnerEmail = $(event.target).attr("winnerEmail");

	$(".rating-winner-pID").val(pID);
	$(".rating-winner-id").val(winnerID);
	$(".rating-winner-name").text(winnerName);
	$(".rating-winner-email").text(winnerEmail);
});

$(".btn-rating-winner").click(event => {
	var ratingItem = {
		productID: $(".rating-winner-pID").val(),
		winnerID: $(".rating-winner-id").val(),
		isGood: $(".radio-like#winner-up").prop("checked") === true ? 1 : 0,
		content: $(".rating-winner-content").val()
	};

	$.ajax({
		url: "/evaluation/winner/" + ratingItem.productID,
		type: "post",
		dataType: "json",
		contentType: "application/json",
		data: JSON.stringify(ratingItem),
		success: function(data) {
			if (data == "1") {
				new SnackBar({
					message: "Đánh giá thành công!!",
					status: "success",
					fixed: true,
					timeout: 2000
				});
			} else {
				new SnackBar({
					message: "Bạn đã đánh giá trước đó!!",
					status: "warning",
					fixed: true,
					timeout: 2000
				});
			}
		}
	});

	$("#btn-exit-rating-winner").click();
});

$(".btn-refuse-winner").click(event => {
	var ratingItem = {
		productID: $(".rating-winner-pID").val(),
		winnerID: $(".rating-winner-id").val(),
		isGood: 0,
		content: "Người thắng không thanh toán!!!"
	};

	$.ajax({
		url: "/refuse/winner/" + ratingItem.productID,
		type: "post",
		dataType: "json",
		contentType: "application/json",
		data: JSON.stringify(ratingItem),
		success: function(data) {
			if (data == "1") {
				new SnackBar({
					message: "Từ chối thành công!!",
					status: "success",
					fixed: true,
					timeout: 2000
				});
			} else {
				new SnackBar({
					message: "Từ chối không hợp lệ, bạn đã đánh giá trước đó!!",
					status: "warning",
					fixed: true,
					timeout: 2000
				});
			}
		}
	});

	$("#btn-exit-rating-winner").click();
});

$(".section-title .title small").click(() => {
	Swal.fire({
		title: "Bán hàng trên Bidhub",
		text:
			"Xác nhận các thông tin bên dưới và bạn sẽ được xem xét để trở thành người bán trong vòng 7 ngày",
		icon: "info",
		confirmButtonText: '<i class="fa fa-thumbs-up"></i> Tuyệt!'
	});
});

$(".btn-term").click(() => {
	Swal.fire({
		title: "Điều khoản dịch vụ",
		icon: "info",
		text:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. At soluta et voluptate ipsam nisi minima sint accusantium doloribus explicabo, ad est assumenda iste libero beatae sunt. Magni tenetur ut aspernatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quia laborum fugit consectetur iste, reprehenderit veritatis voluptate veniam harum provident aperiam quidem esse? Magnam fugiat quidem omnis ratione vero nemo.",
		confirmButtonColor: "#F8694A",
		confirmButtonText: "Đã hiểu"
	});
});

$(".form-group .btn-seller-regis").click(event => {
	event.preventDefault();
	if (!$("#cb-term").prop("checked")) {
		Swal.fire({
			title: "Có lỗi xảy ra",
			html: `Bạn phải đồng ý với các điều khoản dịch vụcủa Bidhub`,
			icon: "error"
		});
	} else {
		const userID = $(event.target).attr("userID");
		Swal.fire({
			title: "Bạn chắc chắn muốn gửi yêu cầu đăng ký này?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#F8694A",
			cancelButtonColor: "#000",
			confirmButtonText: "Đăng ký",
			cancelButtonText: "Hủy"
		}).then(result => {
			if (result.value) {
				const form = {
					userID: userID
				};
				$.ajax({
					url: "/account/seller-regis",
					type: "post",
					dataType: "json",
					contentType: "application/json",
					data: JSON.stringify(form),
					success: function(data) {
						if (data == "1") {
							Swal.fire({
								title: "Đã gửi yêu cầu đăng ký",
								text:
									"Yêu cầu sẽ được QTV kiểm duyệt trước khi chính thức trở thành người bán",
								icon: "success"
							});
							setTimeout(() => {
								location.reload();
							}, 2000);
						} else {
							Swal.fire({
								title: "Có lỗi xảy ra",
								text: "Gửi yêu cầu không thành công. Vui lòng thử lại",
								icon: "error"
							});
						}
					}
				});
			}
		});
	}
});

$(".btn-change-pass").click(event => {
	event.preventDefault();
	const userID = $(event.target).attr("userID");
	const newPass = $("input#newPass").val();
	const oldPass = $("input#oldPass").val();
	if (newPass === "" || newPass === null || newPass === undefined) {
		Swal.fire({
			title: "Mật khẩu mới không hợp lệ",
			text: "Mật khẩu mới không được để trống",
			icon: "error"
		});
	} else if (newPass.length < 8 || newPass.length > 16) {
		Swal.fire({
			title: "Mật khẩu mới không hợp lệ",
			text: "Mật khẩu mới phải có độ dài 8-16 ký tự",
			icon: "error"
		});
	} else {
		Swal.fire({
			title: "Bạn muốn đổi mật khẩu ?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#F8694A",
			cancelButtonColor: "#000",
			confirmButtonText: "Xác nhận",
			cancelButtonText: "Hủy"
		}).then(result => {
			if (result) {
				const form = {
					userID: userID,
					oldPass: oldPass,
					newPass: newPass
				};
				console.log(userID);
				$.ajax({
					url: "/account/change-pass/" + userID,
					type: "post",
					dataType: "json",
					contentType: "application/json",
					data: JSON.stringify(form),
					success: function(data) {
						if (data === "1") {
							Swal.fire({
								title: "Đổi mật khẩu thành công",
								icon: "success"
							});
							setTimeout(() => {
								window.location.href = "/login";
							}, 1500);
						} else if (data === "0") {
							Swal.fire({
								title: "Mật khẩu cũ không chính xác",
								icon: "error"
							});
						} else {
							Swal.fire({
								title: "Có lỗi xảy ra",
								text: "Đổi mật khẩu không thành công. Vui lòng thử lại",
								icon: "error"
							});
						}
					}
				});
			}
		});
	}
});

$(document).ready(() => {
	$("#birthDay").val($("#birthDay").attr("raw"));
	$("#birthDay").on("input", () => {
		console.log($("#birthDay").val());
	});
});
