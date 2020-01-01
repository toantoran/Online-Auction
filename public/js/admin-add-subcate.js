$('#subcate-img').filer({
    limit: 1,
    clipBoardPaste: true,
    extensions: ["jpg", "png", "gif", "jfif"],
    showThumbs: true,
    templates: {
        box: '<ul class="jFiler-items-list jFiler-items-default"></ul>',
        item: '<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-icon pull-left">{{fi-icon}}</div><div class="jFiler-item-info pull-left"><div class="jFiler-item-title" title="{{fi-name}}">{{fi-name | limitTo:30}}</div><div class="jFiler-item-others"><span>size: {{fi-size2}}</span><span>type: {{fi-extension}}</span><span class="jFiler-item-status">{{fi-progressBar}}</span></div><div class="jFiler-item-assets"><ul class="list-inline"><li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li></ul></div></div></div></div></li>',
        itemAppend: '<li class="jFiler-item"><div class="jFiler-item-container"><div class="jFiler-item-inner"><div class="jFiler-item-icon pull-left">{{fi-icon}}</div><div class="jFiler-item-info pull-left"><div class="jFiler-item-title">{{fi-name | limitTo:35}}</div><div class="jFiler-item-others"><span>size: {{fi-size2}}</span><span>type: {{fi-extension}}</span><span class="jFiler-item-status"></span></div><div class="jFiler-item-assets"><ul class="list-inline"><li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li></ul></div></div></div></div></li>',
        progressBar: '<div class="bar"></div>',
        itemAppendToEnd: true,
        removeConfirmation: false,
        canvasImage: true,
        _selectors: {
            list: '.jFiler-items-list',
            item: '.jFiler-item',
            progressBar: '.bar',
            remove: '.jFiler-item-trash-action'
        }
    },
    afterShow: () => {
        $('.jFiler-items-default .jFiler-item-assets a').html('<i class="fas fa-trash-alt"></i>')
    }
});

let cateID = (window.location.pathname.slice(-1));
$('.list-links').children('.sub').eq(cateID - 1).children().addClass('link-active')