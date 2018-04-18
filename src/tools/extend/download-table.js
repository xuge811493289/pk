import $ from 'jquery';

let _styles = {
    td: 'text-align: center;',
    th: 'text-align: center;font-weight: bold;background: #CCCCCC;'
};

/**
 * 解析表格上的options属性
 * @author Say
 * @date 2017年11月15日
 * @return
 */
function parseOptions($table, _opt) {
    let _options = {},
        _s = $.trim($table.attr('data-download-options'));
    if (_s) {
        if (_s.substring(0, 1) != '{') {
            _s = '{' + _s + '}';
        }
        _options = (new Function('return ' + _s))();
    }
    return $.extend(true, {}, _options, _opt);
}

/**
 * 解析表格Html代码
 * @author Say
 * @date 2017年11月15日
 * @return
 */
function parseHtml($table, _opt) {
    let _options = parseOptions($table, _opt);
    return {
        html: $table.clone().removeAttr('class').removeAttr('style').find('tr:first').before(function() {
            let _title = '';
            if (typeof _options.title == 'undefined') {
                return _title;
            }
            let _colspan = 0;
            $(this).find('th,td').each(function() {
                _colspan += parseInt($(this).attr('colspan') || 1);
            });
            if (_colspan) {
                var __title = _options.title;
                if (!$.isArray(__title)) {
                    __title = [__title];
                }
                $.each(__title, function(t, ti) {
                    _title += '<tr><th' + (_styles['th'] ? (' style="' + _styles['th'] + '"') : '') + (_colspan > 1 ? (' colspan="' + _colspan + '"') : '') + '>' + ti + '</th></tr>';
                });
            }
            return _title;
        }).end().find('*').removeAttr('class').removeAttr('style').end().find('td,th').each(function() {
            $(this).attr('style', _styles[this.nodeName.toLocaleLowerCase()]).html($(this).text());
        }).end().prop('outerHTML'),
        fileName: _options.fileName
    };
}

export default (_opt = {}) => {
    let $tables = $('table[data-download-options]', this.$el),
        _fileName,
        _html = '';

    // 指令传入配置项
    if (_opt.tables && _opt.refs) {
        $.each(_opt.tables, function(i, e) {
            let id = e,
                title;
            if (Object.prototype.toString.call(id) == '[object Object]') {
                id = e.id;
                title = e.title;
            }
            let table = _opt.refs[id];
            if (!table) {
                return true;
            }
            let obj = parseHtml($(table), $.extend(true, {}, _opt, {
                title
            }));
            _html += obj.html;
            _fileName = obj.fileName;
        });
    } else {
        $tables.each(function(i, table) {
            let $table = $(table),
                obj = parseHtml($(table), _opt);
            _html += obj.html;
            _fileName = obj.fileName;
        });
    }
    // console.log(_html)
    $('<form/>', {
        method: 'post',
        action: window.ShiYue.base + '/api/base/common/table2xls',
        'class': 'table2xls',
        css: {
            position: 'absolute',
            top: '-1000px',
            display: 'none'
        }
    }).append($('<input/>', {
        type: 'hidden',
        name: 'title',
        val: (_fileName || '下载')
    })).append($('<textarea/>', {
        name: 'data',
        val: _html,
        css: {
            display: 'none'
        }
    })).appendTo($('body').find('.table2xls').remove().end()).submit().remove().end().each(function() {
        if (_opt.$but) {
            setTimeout(function() {
                _opt.$but.removeClass('is-loading').find('[class*="el-icon"]:eq(0)').each(function() {
                    if ($(this).data('class')) {
                        $(this).attr('class', $(this).data('class'));
                    } else {
                        $(this).remove();
                    }
                });
            }, 800);
        }
    });
};