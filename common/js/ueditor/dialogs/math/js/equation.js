/**
 * 数学公式
 * @author Say
 * @date 2016-08-07
 */
UE.registerUI('dialog', function(editor, uiName) {
    // 创建dialog
    var dialog = new UE.ui.Dialog({
        // 指定弹出层中页面的路径，这里只能支持页面
        iframeUrl: 'dialogs/math/index.html',
        // 需要指定当前的编辑器实例
        editor: editor,
        // 指定dialog的名字
        name: uiName,
        // dialog的标题
        title: "公式输入",
        className:'edui-for-' + uiName,
        // 指定dialog的外围样式
        cssRules: "width:600px;height:350px;",
        // 如果给出了buttons就代表dialog有确定和取消
        buttons: [{
            className: 'edui-okbutton',
            label: '确定',
            onclick: function() {
            	var $iframe = $("#" + dialog.id + "_iframe").contents(),
            		$math = $iframe.find("#jme-math"),
            		$mathCode = $iframe.find("#matheqCode");
                // 获取html显示
                var _math = $math.html(),
                	_mathCode = $mathCode.html();
                if (_math == '') {
                    dialog.close(true);
                    return;
                }
                _math = '<span data-code=' + _mathCode + ' data-png-src="http://latex.codecogs.com/png.latex?' + _mathCode + '" data-gif-src="http://latex.codecogs.com/gif.latex?' + _mathCode + '" class="mathquill-rendered-math" style="font-size: 20px;" >' + _math + '</span><span>&nbsp;</span>';
                this.editor.execCommand('insertHtml', _math);
                dialog.close(true);
            }
        }, {
            className: 'edui-cancelbutton',
            label: '取消',
            onclick: function() {
                dialog.close(true);
            }
        }]
    });

    // 参考
    var btn = new UE.ui.Button({
        name: 'equation' + uiName,
        title: '插入公式',
        // 需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
        cssRules: 'background: url("' + editor.options.UEDITOR_HOME_URL + 'dialogs/math/images/icon.png") !important',
        onclick: function() {
            // 渲染dialog
            dialog.render();
            dialog.open();
        }
    });
    
    // 当点到编辑内容上时，按钮要做的状态反射
    /*editor.addListener('selectionchange', function() {
		var state = editor.queryCommandState(uiName);
		if (state == -1) {
			btn.setDisabled(true);
			btn.setChecked(false);
		} else {
			btn.setDisabled(false);
			btn.setChecked(state);
		}
	});*/

    /*
     * index 指定添加到工具栏上的那个位置，默认时追加到最后,editorId
     * 指定这个UI是那个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮
     */
    return btn;
});
