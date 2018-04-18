import $ from 'jquery';
import tableDownload from './download-table.js';

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
function parseOptions($table) {
    let _options = {},
        _s = $.trim($table.attr('data-download-options'));
    if (_s) {
        if (_s.substring(0, 1) != '{') {
            _s = '{' + _s + '}';
        }
        _options = (new Function('return ' + _s))();
    }
    return _options;
}

function parseHtml(_refs, _tables) {
    let _html = '';
    $.each(_tables, function(i, e) {
        var id = e,
            title;
        if (Object.prototype.toString.call(id) == '[object Object]') {
            id = e.id;
            title = e.title;
        }
        let _table = _refs[id];
        if (_table && $.isArray(_table)) {
            _table = _table[0];
        }
        if (!_table || _table.$options._componentTag != 'el-table' || !_table.$el) {
            return true;
        }
        let $el = $(_table.$el);
        let _options = parseOptions($el);
        if (_options && typeof _options.title != 'undefined') {
            title = _options.title;
        }
        let $body = $el.find('.el-table__body-wrapper .el-table__body:eq(0)').clone().find('colgroup,.gutter').remove().end();
        let $head = $el.find('.el-table__header-wrapper .el-table__header:eq(0)').clone().find('colgroup,.gutter').remove().end();
        if ($head.length > 0) {
            $body.find('tbody').before($head.find('thead').prop('outerHTML'));
        }
        _html += $body.find('td,th').removeAttr('class').each(function(j, l) {
            let _nodeName = this.nodeName.toLocaleLowerCase(),
                _colspan = parseInt($(this).attr('colspan') || 0),
                _rowspan = parseInt($(this).attr('rowspan') || 0);
            $(this).replaceWith('<' + _nodeName + (_styles[_nodeName] ? (' style="' + _styles[_nodeName] + '"') : '') + (_colspan > 1 ? (' colspan="' + _colspan + '"') : '') + (_rowspan > 1 ? (' rowspan="' + _rowspan + '"') : '') + '>' + $.trim($(this).text()) + '</' + _nodeName + '>')
        }).end().find('tr').removeAttr('class').end().removeAttr('class').find('tr:first').before(function() {
            var _colspan = 0,
                _title = '';
            $(this).find('th,td').each(function() {
                _colspan += parseInt($(this).attr('colspan') || 1);
            });
            if (_colspan && title) {
            	if (!$.isArray(title)) {
            		title = [title];
            	}
            	$.each(title, function(t, ti) {
        			_title += '<tr><th ' + (_styles['th'] ? (' style="' + _styles['th'] + '"') : '') + (_colspan > 1 ? (' colspan="' + _colspan + '"') : '') + '>' + ti + '</th></tr>';
        		});
            }
            return _title;
        }).end().prop('outerHTML');
    });
    return _html;
}

export default {
    bind(el, binding) {
        let $but = $(el);
        $but.unbind().bind('click.download', function() {
            let _options = binding.value;
            if (!_options || (!_options.table && (!_options.refs))) {
                $but.unbind();
                return false;
            }
            let _tables = _options.tables,
                _refs = _options.refs;
            if (typeof _tables == 'undefined') {
                _tables = [];
                for (let key in _refs) {
                    if (key && key.indexOf('element-table-download') != -1) {
                        _tables.push(key);
                    }
                }
                _options.tables = _tables;
            }
            if (!_tables) {
                $but.unbind();
                return false;
            }
            if (typeof _tables == 'string') {
                _options.tables = [_tables];
                _tables = _options.tables;
            }
            if (!_options.table && !$.isArray(_tables)) {
                $but.unbind();
                return false;
            }
            $but.trigger('blur').addClass('is-loading').prepend(function(index, html) {
                let $icon = $(this).find('[class*="el-icon"]:eq(0)');
                if ($icon.length > 0) {
                    $icon.data('class', $icon.attr('class')).attr('class', 'el-icon-loading');
                } else {
                    return '<i class="el-icon-loading"></i>';
                }
            });
            // 非element表格
            if (_options.table) {
                tableDownload($.extend(true, {}, _options, {
                    $but
                }));
                return false;
            }
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
                val: (_options.fileName || '下载')
            })).append($('<textarea/>', {
                name: 'data',
                val: parseHtml(_refs, _tables),
                css: {
                    display: 'none'
                }
            })).appendTo($('body').find('.table2xls').remove().end()).submit().remove().end().each(function() {
                setTimeout(function() {
                    $but.removeClass('is-loading').find('[class*="el-icon"]:eq(0)').each(function() {
                        if ($(this).data('class')) {
                            $(this).attr('class', $(this).data('class'));
                        } else {
                            $(this).remove();
                        }
                    });
                }, 800);
            });
        });
    }
};