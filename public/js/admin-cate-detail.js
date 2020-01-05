let cateID = window.location.pathname.slice(-1);
$(".list-links")
	.children(".sub")
	.eq(cateID)
	.children()
	.addClass("link-active");

$("#cateIcon").on("input", function() {
	console.log("object");
	$("#generate-icon").html(`<i class="fas fa-${$("#cateIcon").val()}"></i>`);
});

$(".btn-delete-cate").click(event => {
	event.preventDefault();
	const cateID = $(event.target).attr("cateID");
	if ($("#productsCount").val() > 0) {
		Swal.fire({
			title: "Không thể xóa danh mục này",
			text: "Danh mục đang chứa sản phẩm",
			icon: "error"
		});
	} else {
		Swal.fire({
			title: "Xác nhận xóa",
			text: "Danh mục này và các danh mục con của nó sẽ bị xóa",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#F8694A",
			cancelButtonColor: "#000",
			confirmButtonText: `Xóa <i class="fas fa-trash-alt"></i>`,
			cancelButtonText: "Hủy bỏ"
		}).then(result => {
			if (result.value) {
				const form = {
					cateID: cateID
				};
				$.ajax({
					url: "/admin/category/delete/" + cateID,
					type: "post",
					dataType: "json",
					contentType: "application/json",
					data: JSON.stringify(form),
					success: function(data) {
						if (data === "1") {
							Swal.fire({
								title: "Đã xóa thành công danh mục",
								icon: "success"
							});
							setTimeout(() => {
								window.location.href = "/admin/category#all";
							}, 2000);
						} else if (data === "-1") {
							Swal.fire({
								title: "Có lỗi xảy ra",
								text: "Xóa không thành công. Vui lòng thử lại",
								icon: "error"
							});
						} else {
							Swal.fire({
								title: "Không thể xóa danh mục này",
								text: "Danh mục đang chứa sản phẩm",
								icon: "error"
							});
						}
					}
				});
			}
		});
	}
});
$(".btn-update-cate").click(event => {
	event.preventDefault();
	const cateID = $(event.target).attr("cateID");
	Swal.fire({
		title: "Lưu thay đổi?",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#F8694A",
		cancelButtonColor: "#000",
		confirmButtonText: `Lưu <i class="fas fa-save"></i>`,
		cancelButtonText: "Hủy bỏ"
	}).then(result => {
		if (result.value) {
			const form = {
				cateID: $("input[name=cateID]").val(),
				cateName: $("input[name=cateName]").val(),
				cateIcon: $("input[name=cateIcon]").val()
			};
			$.ajax({
				url: "/admin/category/edit/" + cateID,
				type: "post",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(form),
				success: function(data) {
					if (data === "1") {
						Swal.fire({
							title: "Các thay đổi đã được lưu lại",
							icon: "success"
						});
						setTimeout(() => {
							window.location.href = "/admin/category";
						}, 2000);
					} else {
						Swal.fire({
							title: "Có lỗi xảy ra",
							text: "Thay đổi chưa được lưu. Vui lòng thử lại",
							icon: "error"
						});
					}
				}
			});
		}
	});
});

$(".change-btn").click(() => {
	$("#subcate-img").filer({
		limit: 1,
		clipBoardPaste: true,
		extensions: ["jpg"],
		showThumbs: true,
		templates: {
			box: '<ul class="jFiler-items-list jFiler-items-default"></ul>',
			item:
				'<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-icon pull-left">{{fi-icon}}</div><div class="jFiler-item-info pull-left"><div class="jFiler-item-title" title="{{fi-name}}">{{fi-name | limitTo:30}}</div><div class="jFiler-item-others"><span>size: {{fi-size2}}</span><span>type: {{fi-extension}}</span><span class="jFiler-item-status">{{fi-progressBar}}</span></div><div class="jFiler-item-assets"><ul class="list-inline"><li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li></ul></div></div></div></div></li>',
			itemAppend:
				'<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-icon pull-left">{{fi-icon}}</div><div class="jFiler-item-info pull-left"><div class="jFiler-item-title">{{fi-name | limitTo:35}}</div><div class="jFiler-item-others"><span>size: {{fi-size2}}</span><span>type: {{fi-extension}}</span><span class="jFiler-item-status"></span></div><div class="jFiler-item-assets"><ul class="list-inline"><li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li></ul></div></div></div></div></li>',
			progressBar: '<div class="bar"></div>',
			itemAppendToEnd: true,
			removeConfirmation: false,
			canvasImage: true,
			_selectors: {
				list: ".jFiler-items-list",
				item: ".jFiler-item",
				progressBar: ".bar",
				remove: ".jFiler-item-trash-action"
			}
		},
		afterShow: () => {
			$(".jFiler-items-default .jFiler-item-assets a").html(
				'<i class="fas fa-trash-alt"></i>'
			);
		}
	});

	$(".change-btn").prop("disabled", true);
});

$(".btn-delete-subcate").click(event => {
	event.preventDefault();
	const cateID = $(event.target).attr("cateID");
	const subcateID = $(event.target).attr("subcateID");
	if ($("#productsCount").val() > 0) {
		Swal.fire({
			title: "Không thể xóa danh mục này",
			text: "Danh mục đang chứa sản phẩm",
			icon: "error"
		});
	} else {
		Swal.fire({
			title: "Xác nhận xóa",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#F8694A",
			cancelButtonColor: "#000",
			confirmButtonText: `Xóa <i class="fas fa-trash-alt"></i>`,
			cancelButtonText: "Hủy bỏ"
		}).then(result => {
			if (result.value) {
				const form = {
					cateID: cateID,
					subcateID: subcateID
				};
				$.ajax({
					url: `/admin/category/sub/delete/${cateID}/${subcateID}`,
					type: "post",
					dataType: "json",
					contentType: "application/json",
					data: JSON.stringify(form),
					success: function(data) {
						if (data === "1") {
							Swal.fire({
								title: "Đã xóa thành công danh mục",
								icon: "success"
							});
							setTimeout(() => {
								window.location.href = `/admin/category#sub-${cateID}`;
							}, 2000);
						} else if (data === "-1") {
							Swal.fire({
								title: "Có lỗi xảy ra",
								text: "Xóa không thành công. Vui lòng thử lại",
								icon: "error"
							});
						} else {
							Swal.fire({
								title: "Không thể xóa danh mục này",
								text: "Danh mục đang chứa sản phẩm",
								icon: "error"
							});
						}
					}
				});
			}
		});
	}
});
$(".btn-update-subcate").click(event => {
	event.preventDefault();
	const cateID = $(event.target).attr("cateID");
	const subcateID = $(event.target).attr("subcateID");
	Swal.fire({
		title: "Lưu thay đổi?",
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#F8694A",
		cancelButtonColor: "#000",
		confirmButtonText: `Lưu <i class="fas fa-save"></i>`,
		cancelButtonText: "Hủy bỏ"
	}).then(result => {
		if (result.value) {
			const form = {
				cateID: $("input[name=cateID]").val(),
				subcateID: $("input[name=subcateID]").val(),
				subcateName: $("input[name=subcateName]").val()
			};
			$.ajax({
				url: `/admin/category/sub/edit/${cateID}/${subcateID}`,
				type: "post",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(form),
				success: function(data) {
					if (data === "1") {
						Swal.fire({
							title: "Các thay đổi đã được lưu lại",
							icon: "success"
						});
						setTimeout(() => {
							window.location.href = `/admin/category#sub-${cateID}`;
						}, 2000);
					} else {
						Swal.fire({
							title: "Có lỗi xảy ra",
							text: "Thay đổi chưa được lưu. Vui lòng thử lại",
							icon: "error"
						});
					}
				}
			});
		}
	});
});
