import $ from 'jquery';

$.extend(true, $.fn.zTree.consts.node, {
    SYCURSELECTED: 'sy-curSelectedNode'
});

$.extend(true, $.fn.zTree._z.view, {
    makeDOMNodeLine: function(html, setting, node) {
        var consts = $.fn.zTree.consts;
        html.push('<div class="sy-tree-row" style="padding-left: ', (node.level * 18), 'px;">', "<span id='", node.tId, consts.id.SWITCH, "' title='' class='", this.makeNodeLineClass(setting, node), "' treeNode", consts.id.SWITCH, "></span>");
    },
    makeDOMNodeNameAfter: function(html, setting, node) {
        html.push("</a></div>");
    },
    cancelPreSelectedNode: function(setting, node, excludeNode) {
        var data = $.fn.zTree._z.data,
            consts = $.fn.zTree.consts,
            list = data.getRoot(setting).curSelectedList,
            i, n;
        for (i = list.length - 1; i >= 0; i--) {
            n = list[i];
            if (node === n || (!node && (!excludeNode || excludeNode !== n))) {
                $.fn.zTree._z.tools.$(n, consts.id.A, setting).removeClass(consts.node.CURSELECTED).closest('.sy-tree-row').removeClass(consts.node.SYCURSELECTED);
                if (node) {
                    data.removeSelectedNode(setting, node);
                    break;
                } else {
                    list.splice(i, 1);
                    setting.treeObj.trigger(consts.event.UNSELECTED, [setting.treeId, n]);
                }
            }
        }
    },
    selectNode: function(setting, node, addFlag) {
        var data = $.fn.zTree._z.data,
            consts = $.fn.zTree.consts,
            tools = $.fn.zTree._z.tools;
        if (!addFlag) {
            this.cancelPreSelectedNode(setting, null, node);
        }
        tools.$(node, consts.id.A, setting).addClass(consts.node.CURSELECTED).closest('.sy-tree-row').addClass(consts.node.SYCURSELECTED);
        data.addSelectedNode(setting, node);
        setting.treeObj.trigger(consts.event.SELECTED, [setting.treeId, node]);
    }
});

function zTreeObj(dom, setting, zNodes) {
    return $.fn.zTree.init(dom, setting, zNodes);
}
export default zTreeObj;