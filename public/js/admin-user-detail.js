$(".btn-delete-user").click(event => {
	event.preventDefault();
	const userID = $(event.target).attr("userID");
	// console.log(userID);
	Swal.fire({
		title: "Bạn có chắn chắn muốn xóa User này?",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#F8694A",
		cancelButtonColor: "#000",
		confirmButtonText: `Xóa <i class="fas fa-trash-alt"></i>`,
		cancelButtonText: "Hủy bỏ"
	}).then(result => {
		if (result.value) {
			const form = {
				userID: userID
			};
			$.ajax({
				url: "/admin/user/delete/" + userID,
				type: "post",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(form),
				success: function(data) {
					if (data == "1") {
						new SnackBar({
							message: "Đã xóa thành công User",
							status: "success",
							fixed: true,
							timeout: 1000
						});
						setTimeout(() => {
							window.location.href = "/admin/users";
						}, 1000);
					} else {
						Swal.fire({
							title: "Có lỗi xảy ra",
							text: "Xóa không thành công. Vui lòng thử lại",
							icon: "error"
						});
					}
				}
			});
		}
	});
});

$(".btn-upgrade-user").click(event => {
	event.preventDefault();
	const userID = $(event.target).attr("userID");
	// console.log(userID);
	Swal.fire({
		title: "Bạn muốn cho phép User này thành người bán",
		icon: "info",
		showCancelButton: true,
		confirmButtonColor: "#F8694A",
		cancelButtonColor: "#000",
		confirmButtonText: `Xác nhận <i class="fas fa-angle-double-up"></i>`,
		cancelButtonText: "Hủy bỏ"
	}).then(result => {
		if (result.value) {
			const form = {
				userID: userID
			};
			$.ajax({
				url: "/admin/user/upgrade/" + userID,
				type: "post",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(form),
				success: function(data) {
					if (data == "1") {
						new SnackBar({
							message: "Cấp quyền người bán thành công",
							status: "success",
							fixed: true,
							timeout: 2000
						});
						$(".btn-upgrade-user").css("display", "none");
						$(".btn-refuse-user").css("display", "none");
						$(".btn-downgrade-user").css("display", "inline-block");
					} else {
						Swal.fire({
							title: "Có lỗi xảy ra",
							text: "Vui lòng thử lại",
							icon: "error"
						});
					}
				}
			});
		}
	});
});

$(".btn-refuse-user").click(event => {
	event.preventDefault();
	const userID = $(event.target).attr("userID");
	// console.log(userID);
	Swal.fire({
		title: "Bạn muốn từ chối User này thành người bán",
		icon: "info",
		showCancelButton: true,
		confirmButtonColor: "#F8694A",
		cancelButtonColor: "#000",
		confirmButtonText: `Xác nhận <i class="fas fa-angle-double-down"></i>`,
		cancelButtonText: "Hủy bỏ"
	}).then(result => {
		if (result.value) {
			const form = {
				userID: userID
			};
			$.ajax({
				url: "/admin/user/refuse/" + userID,
				type: "post",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(form),
				success: function(data) {
					if (data == "1") {
						new SnackBar({
							message: "Đã xóa User khỏi danh sách đăng ký",
							status: "success",
							fixed: true,
							timeout: 2000
						});
						$(".btn-upgrade-user").css("display", "none");
						$(".btn-refuse-user").css("display", "none");
						$(".btn-downgrade-user").css("display", "none");
					} else {
						Swal.fire({
							title: "Có lỗi xảy ra",
							text: "Vui lòng thử lại",
							icon: "error"
						});
					}
				}
			});
		}
	});
});

$(".btn-downgrade-user").click(event => {
	event.preventDefault();
	const userID = $(event.target).attr("userID");
	// console.log(userID);
	Swal.fire({
		title: "Bạn muốn hủy quyền người bán của User này?",
		icon: "info",
		showCancelButton: true,
		confirmButtonColor: "#F8694A",
		cancelButtonColor: "#000",
		confirmButtonText: `Xác nhận <i class="fas fa-angle-double-down"></i>`,
		cancelButtonText: "Hủy bỏ"
	}).then(result => {
		if (result.value) {
			const form = {
				userID: userID
			};
			$.ajax({
				url: "/admin/user/downgrade/" + userID,
				type: "post",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(form),
				success: function(data) {
					if (data == "1") {
						new SnackBar({
							message: "Hủy quyền người bán thành công",
							status: "success",
							fixed: true,
							timeout: 2000
						});
						$(".btn-downgrade-user").css("display", "none");
						$(".btn-upgrade-user").css("display", "none");
						$(".btn-refuse-user").css("display", "none");
					} else {
						Swal.fire({
							title: "Có lỗi xảy ra",
							text: "Vui lòng thử lại",
							icon: "error"
						});
					}
				}
			});
		}
	});
});
