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

$(".list-links li.sub").click(() => {
	$(this).addClass("link-active");
});

const cateTable = $(".cate-table").DataTable({
	paging: false,
	ordering: true,
	searching: true,
	language: {
		emptyTable: "Không có danh mục",
		info: "",
		infoEmpty: "",
		lengthMenu: "Hiện _MENU_ danh mục",
		loadingRecords: "Đang tải...",
		processing: "Đang xử lý...",
		search: "Tìm kiếm:",
		zeroRecords: "Không tìm thấy danh mục",
		paginate: {
			first: "Đầu",
			last: "Cuối",
			next: "Sau",
			previous: "Trước"
		}
	},
	processing: true,
	// serverSide: true,
	ajax: `/admin/getCateTable`,
	columns: [
		{
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
});

function createTable(table, cateID) {
	return table.DataTable({
		paging: false,
		ordering: true,
		searching: true,
		language: {
			emptyTable: "Không có danh mục con",
			info: "",
			infoEmpty: "",
			lengthMenu: "Hiện _MENU_ danh mục con",
			loadingRecords: "Đang tải...",
			processing: "Đang xử lý...",
			search: "Tìm kiếm:",
			zeroRecords: "Không tìm thấy danh mục",
			paginate: {
				first: "Đầu",
				last: "Cuối",
				next: "Sau",
				previous: "Trước"
			}
		},
		processing: true,
		// serverSide: true,
		ajax: `/admin/getSubcateTable/${cateID}`,
		columns: [
			{
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
	});
}

const tables = $(".subcate-table");
const subcateTable = [];
for (let i of tables) {
	const cateID = $(i).attr("cateID");
	subcateTable.push(createTable($(`.subcate-table[cateID=${cateID}]`), cateID));
}

function deleteSubcate(event) {
	event.preventDefault();
	const cateID = $(event.target).attr("cateID");
	const cateName = $(event.target).attr("cateName");
	const subcateID = $(event.target).attr("subcateID");
	const subcateName = $(event.target).attr("subcateName");

	Swal.fire({
		title: `Xóa "${subcateName}" ra khỏi "${cateName}?"`,
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
				subcateName: subcateID
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
							title: `Đã xóa thành công "${subcateName}`,
							icon: "success"
						});
						resetTable();
					} else if (data === "-1") {
						Swal.fire({
							title: "Có lỗi xảy ra",
							text: "Xóa không thành công. Vui lòng thử lại",
							icon: "error"
						});
					} else {
						Swal.fire({
							title: `Không thể xóa "${subcateName}`,
							text: "Danh mục đang chứa sản phẩm",
							icon: "error"
						});
					}
				}
			});
		}
	});
}

function deleteCate(event) {
	event.preventDefault();
	const cateID = $(event.target).attr("cateID");
	const cateName = $(event.target).attr("cateName");
	Swal.fire({
		title: `Xóa danh mục "${cateName}"?`,
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
							title: `Đã xóa thành công "${cateName}`,
							icon: "success"
						});
						setTimeout(() => {
							location.reload();
						}, 2000);
					} else if (data === "-1") {
						Swal.fire({
							title: "Có lỗi xảy ra",
							text: "Xóa không thành công. Vui lòng thử lại",
							icon: "error"
						});
					} else {
						Swal.fire({
							title: `Không thể xóa "${cateName}`,
							text: "Danh mục đang chứa sản phẩm",
							icon: "error"
						});
					}
				}
			});
		}
	});
}

function resetTable() {
	cateTable.ajax.reload();
	for (a of subcateTable) {
		a.ajax.reload();
	}
}
