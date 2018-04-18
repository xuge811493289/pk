import { getBaseStageByUnitId, getCoursByStageId, getCatalogList, checkName, saveCatalog, updataCatalog, deleteCatalog } from '../request.js';
export default {
    components: {},
    data() {
        let checkBMName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('目录名称不能为空！'));
            } else {
                if (value.length > 50) {
                    return callback(new Error('长度小于50位字符！'));
                } else {
                    if (this.oldTreeNode.name === value) {
                        callback()
                    } else {
                        checkName({
                            unitId: this.unitId,
                            parentId: this.checkParentId,
                            name: value
                        }).then((data) => {
                            // console.log(data);
                            if (data.data) {
                                callback()
                            } else {
                                callback(new Error('账号已存在！'))
                            }
                        })
                    }
                }

            }
        };
        return {
            unitId: this.$store.state.unitId,
            activeName: '',
            $treeObj: '',
            checkParentId: '',
            addVisible: false,
            editVisible: false,
            form: {
                name: '',
                sort: '',
                parentId: ''
            },
            oldTreeNode: '',
            editForm: {
                name: '',
                sort: '',
                id: ''
            },
            rules: {
                name: [
                    { required: true, validator: checkBMName, trigger: 'blur' }
                ],
                sort: [{
                        required: true,
                        validator: (rule, value, callback) => {
                            if (!value) {
                                return callback(new Error('序号不能为空！'));
                            } else {
                                if (value < 0 || value % 1 !== 0) {
                                    return callback(new Error('序号必须为非负整数！'));
                                } else {
                                    callback();
                                }
                            }
                        }
                    },
                    { type: 'number', message: '序号必须为数字值', trigger: 'blur' }
                ]
            },
            stageList: [],
            courseList: [],
            activeCoure: '',
            treeData: []
        }
    },
    created() {
        this.$parent.$emit('currentPage', '/base/basejcml');
        this.getBaseStageList();
    },
    methods: {
        checkRcMsg(msg) {
            this.activeCoure = msg.courseValue;
            this.getCatalogList();
        },
        getBaseStageList() {
            this.stageList = [];
            getBaseStageByUnitId(this.unitId).then((data) => {
                if (data && data.code === 'ok' && data.data.length > 0) {
                    this.stageList = data.data || [];
                    this.activeName = data.data[0].id + '';
                    this.getCoursList();
                }
            })
        },
        getCoursList() {
            this.courseList = [];
            getCoursByStageId(this.activeName).then((data) => {
                if (data && data.code === 'ok' && data.data.length > 0) {
                    this.courseList = data.data;
                    this.activeCoure = data.data[0].courseValue;
                    this.getCatalogList();
                } else {
                    this.$nextTick(() => {
                        this.getTree('jcmlTree', []);
                    })
                }
            })
        },
        getCatalogList() {
            this.treeData = [];
            getCatalogList({
                unitId: this.unitId,
                courseValue: this.activeCoure,
                stageId: this.activeName
            }).then((data) => {
                // console.log(data);
                if (data && data.code === 'ok' && data.data.length > 0) {
                    this.treeData = data.data;

                }
                this.refreshTree();
            })
        },
        handleClick(tab) {
            // console.log(tab);
            this.activeName = tab.name;
            this.getCoursList();
        },
        toAdd(treeNode) {
            this.oldName = '';
            this.oldTreeNode = treeNode;
            this.$refs.form.resetFields();
            this.form.parentId = treeNode.id;
            this.checkParentId = treeNode.id;
            this.addVisible = true;
        },
        add(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    saveCatalog(this.form).then((data) => {
                        if (data && data.code === 'ok' && data.data === 'success') {
                            this.$notify({
                                title: '成功',
                                message: '添加成功',
                                type: 'success'
                            });
                            this.addVisible = false;
                            // this.$nextTick(() => {
                            //     this.$treeObj.addNodes(this.oldTreeNode, -1, [this.form]);
                            // });
                            this.getCatalogList();
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        toUpdate(treeNode) {
            this.$refs.editForm.resetFields();
            this.oldTreeNode = treeNode;
            this.editForm.name = treeNode.name;
            this.editForm.sort = treeNode.sort;
            this.editForm.id = treeNode.id;
            this.checkParentId = treeNode.parentId;
            this.editVisible = true;
        },
        edit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    updataCatalog(this.editForm).then((data) => {
                        if (data && data.code === 'ok' && data.data === 'success') {
                            this.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success'
                            });
                            this.editVisible = false;
                            this.$nextTick(() => {
                                this.oldTreeNode.name = this.editForm.name;
                                this.$treeObj.updateNode(this.oldTreeNode);
                            });
                            // this.getCatalogList();
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        toDelete(treeNode) {
            this.$confirm('是否继续删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteCatalog(treeNode.id).then((data) => {
                    if (data && data.code === 'ok' && data.data === 'success') {
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success'
                        });
                        // this.getCatalogList();
                        this.$nextTick(() => {
                            this.$treeObj.removeNode(treeNode);
                        })
                    }
                })
            }).catch(() => {

            });
        },
        refreshTree() {
            this.$nextTick(() => {
                this.getTree('jcmlTree', this.treeData);
                // let treeObj = $.fn.zTree.getZTreeObj("jcmlTree");
                // let nodes = treeObj.transformToArray(treeObj.getNodes());
                // nodes.forEach((_node, i) => {
                //     _node.nocheck = _node.level === 0 || _node.level === 1 ? true : false;
                //     treeObj.updateNode(_node);
                // })
            })
        },
        getNode() {
            console.log(this.$treeObj.getCheckedNodes(true));
        },
        //获取教学课程树
        getTree(id, data) {
            // console.log(id, data);
            var _this = this;
            let topNode = '';
            this.$treeObj = this.$ztree($('#' + id), {
                data: {
                    simpleData: {
                        enable: true,
                        idKey: 'id',
                        pIdKey: 'parentId'
                    }
                },
                // 复选
                // check: {
                //     enable: true,
                //     nocheckInherit: false
                // },
                // 单选
                // check: {
                //     enable: true,
                //     chkStyle: "radio",
                //     radioType: "level"
                // },
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
                        // $treeObj.expandNode(treeNode, treeNode.level === 0, false, false);
                        console.log(treeNode.unitId, _this.unitId);
                        if ($('>.el-button', $parent).length > 0) {
                            return false;
                        }
                        if (treeNode.unitId !== _this.unitId) {
                            return false;
                        }
                        if (!treeNode.parentId) {
                            return false;
                        }
                        console.log(treeNode.level);
                        let _buts = [];
                        if (treeNode.level === 1) {
                            _buts.push($('<button/>', {
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
                            })));
                        }

                        // 当前登录用户的单位
                        if (treeNode.level !== 0 && treeNode.level !== 1) {
                            _buts.push($('<button/>', {
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
                            })));
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
                            width: '300'
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
            let nodes = this.$treeObj.getNodes();
            if (nodes.length > 0) {
                this.$treeObj.expandNode(nodes[0], true, false, false);
            }
        },
        openAdd() {

        }
    },
    mounted() {
        this.refreshTree();
    },
    watch: {},
}