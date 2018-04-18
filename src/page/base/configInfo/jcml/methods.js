import request from '../../../../api';
export default {
    methods: {
        handleClick(tab, event) {
            console.log(tab);
        },
        toAdd() {
            this.addVisible = true;
        },
        toUpdate() {
            this.editVisible = true;
        },
        //获取教学课程树
        getTree(id, data) {
            var _this = this;
            this.$treeObj = this.$ztree($('#' + id), {
                data: {
                    simpleData: {
                        enable: true,
                        idKey: 'id',
                        pIdKey: 'parentId'
                    }
                },
                callback: {
                    onClick: function(event, treeId, treeNode) {
                        let $treeObj = this.getZTreeObj(treeId);
                        $treeObj.cancelSelectedNode();
                        if (!$(event.target).hasClass('node_name')) {
                            return false;
                        }
                        $treeObj.expandNode(treeNode, !treeNode.open, false, false);
                    }
                },
                view: {
                    addHoverDom: function(treeId, treeNode) {
                        let $treeObj = this.getZTreeObj(treeId);
                        $treeObj.cancelSelectedNode();
                        let $span = $('#' + treeNode.tId + '_span'),
                            $parent = $span.parent();
                        if ($('>.el-button', $parent).length > 0) {
                            return false;
                        }
                        let _buts = [$('<button/>', {
                            'type': 'button',
                            'class': 'el-button el-button--primary el-button--mini addBut',
                            'title': _this.$t('button.add'),
                            'css': {
                                padding: '4px',
                                fontSize: '12px'
                            }
                        }).bind('click', function() {
                            _this.$treeNode = treeNode;
                            _this.toAdd(treeNode);
                        }).append($('<i/>', {
                            'class': 'el-icon-plus'
                        }))];
                        // 当前登录用户的单位
                        if (treeNode.level !== 0 && treeNode.unitId == _this.currentUnitId) {
                            _buts = [];
                            _buts.push($('<button/>', {
                                'type': 'button',
                                'class': 'el-button el-button--primary el-button--mini editBut',
                                'title': _this.$t('button.update'),
                                'css': {
                                    padding: '4px',
                                    fontSize: '12px',
                                    height: '24px',
                                    width: '24px',
                                    marginTop: '-2px',
                                    verticalAlign: 'middle'
                                }
                            }).bind('click', function() {
                                _this.$treeNode = treeNode;
                                _this.toUpdate(treeNode);
                            }).append($('<i/>', {
                                'class': 'fa fa-pencil-square-o',
                                'css': {
                                    fontSize: '16px'
                                }
                            })));
                            _buts.push($('<button/>', {
                                'type': 'button',
                                'class': 'el-button el-button--primary el-button--mini deleteBut',
                                'title': _this.$t('button.delete'),
                                'css': {
                                    padding: '4px',
                                    fontSize: '12px'
                                }
                            }).bind('click', function() {
                                _this.$treeNode = treeNode;
                                _this.toDelete(treeNode, $treeObj);
                            }).append($('<i/>', {
                                'class': 'el-icon-delete'
                            })));
                        }

                        $span.css({
                            marginRight: '10px',
                            width: '200'
                        });
                        _buts.forEach((b) => {
                            $parent.append(b);
                        });
                    },
                    removeHoverDom: function(treeId, treeNode) {
                        $('#' + treeNode.tId + '_span').parent().find('>.el-button').unbind().remove();
                    },
                    addDiyDom: function(treeId, treeNode) {
                        $('#' + treeNode.tId + '_ico').remove();
                    },
                    selectedMulti: false,
                    txtSelectedEnable: false,
                    autoCancelSelected: false,
                    dblClickExpand: false
                }
            }, data);
            this.$treeObj.expandAll(true);
        },
        openAdd() {

        }
    }
}