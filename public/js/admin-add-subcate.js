$("#subcate-img").filer({
	limit: 1,
	clipBoardPaste: true,
	extensions: ["jpg"],
	showThumbs: true,
	theme: "default",
	templates: {
		box: '<ul class="jFiler-items-list jFiler-items-grid"></ul>',
		item:
			'<li class="jFiler-item">\
					<div class="jFiler-item-container">\
						<div class="jFiler-item-inner">\
							<div class="jFiler-item-thumb">\
								<div class="jFiler-item-status"></div>\
								<div class="jFiler-item-thumb-overlay">\
									<div class="jFiler-item-info">\
										<div style="display:table-cell;vertical-align: middle;">\
											<span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span>\
											<span class="jFiler-item-others">{{fi-size2}}</span>\
										</div>\
									</div>\
								</div>\
								{{fi-image}}\
							</div>\
							<div class="jFiler-item-assets jFiler-row">\
								<ul class="list-inline pull-left">\
									<li>{{fi-progressBar}}</li>\
								</ul>\
								<ul class="list-inline pull-right">\
									<li><a class="icon-jfi-trash jFiler-item-trash-action"><i class="fas fa-trash-alt"></i></a></li>\
								</ul>\
							</div>\
						</div>\
					</div>\
				</li>',
		itemAppend:
			'<li class="jFiler-item">\
						<div class="jFiler-item-container">\
							<div class="jFiler-item-inner">\
								<div class="jFiler-item-thumb">\
									<div class="jFiler-item-status"></div>\
									<div class="jFiler-item-thumb-overlay">\
										<div class="jFiler-item-info">\
											<div style="display:table-cell;vertical-align: middle;">\
												<span class="jFiler-item-title"><b title="{{fi-name}}">{{fi-name}}</b></span>\
												<span class="jFiler-item-others">{{fi-size2}}</span>\
											</div>\
										</div>\
									</div>\
									{{fi-image}}\
								</div>\
								<div class="jFiler-item-assets jFiler-row">\
									<ul class="list-inline pull-left">\
										<li><span class="jFiler-item-others">{{fi-icon}}</span></li>\
									</ul>\
									<ul class="list-inline pull-right">\
										<li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
									</ul>\
								</div>\
							</div>\
						</div>\
					</li>',
		progressBar: '<div class="bar"></div>',
		itemAppendToEnd: false,
		canvasImage: true,
		removeConfirmation: false,
		_selectors: {
			list: ".jFiler-items-list",
			item: ".jFiler-item",
			progressBar: ".bar",
			remove: ".jFiler-item-trash-action"
		}
	},
	addMore: false,
	clipBoardPaste: true,
	excludeName: null,
	afterShow: () => {
		$(".jFiler-items-default .jFiler-item-assets a").html(
			'<i class="fas fa-trash-alt"></i>'
		);
	}
});

let cateID = window.location.pathname.slice(-1);
$(".list-links")
	.children(".sub")
	.eq(cateID - 1)
	.children()
	.addClass("link-active");
