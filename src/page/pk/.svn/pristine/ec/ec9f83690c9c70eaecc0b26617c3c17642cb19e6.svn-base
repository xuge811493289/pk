<template>
    <div class="sy-pk-step-box">
        <div slot="bodyRight">
            <div v-if="isTreeDatasEmpty" style="text-align: center;line-height: 300px;font-size: 14px;">暂无数据</div>
            <ul v-else id="coursesTree" class="ztree sy-course-tree"></ul>
        </div>
        <!--修改课程父节点-->
        <sy-dialog :title="'修改' + (updateModel.nodeType == 'course_type' ? '分类' : '课程')" :visible.sync="updateVisible" :close-on-click-modal="false" position="middle" width="350px" slide="fade" height="auto">
            <div slot="body" style="padding: 20px 20px 0px 10px;">
                <el-form ref="updateModel" :rules="updateModelRules" :model="updateModel" label-width="65px" class="sy-courses-update-dialog">
                    <el-form-item label="temp" v-if="updateModel.nodeType == 'course'" prop="courseNum">
                        <span class="ib" slot="label"><span class="xing ib"></span>编号：</span>
                        {{updateModel.courseNum}}
                    </el-form-item>
                    <el-form-item label="temp" v-if="updateModel.nodeType == 'course'" prop="name">
                        <span class="ib" slot="label"><span class="xing ib"></span>名称：</span>
                        {{updateModel.name}}
                    </el-form-item>
                    <el-form-item label="temp" v-else prop="name">
                        <span class="ib" slot="label"><span class="xing ib"></span>名称：</span>
                        <el-input v-model.trim="updateModel.name"></el-input>
                    </el-form-item>
                    <el-form-item label="temp" v-if="updateModel.nodeType == 'course'" prop="shortName">
                        <span class="ib" slot="label"><span class="xing ib"></span>简称：</span>
                        <el-input v-model.trim="updateModel.shortName"></el-input>
                    </el-form-item>
                    <el-form-item label="temp" v-if="updateModel.nodeType == 'course'">
                        <span class="ib" slot="label"><span class="xing ib"></span>属性：</span>
                        <el-select v-model="updateModel.kcsx" size="small" style="width: 100%;">
                            <el-option v-for="item in [{value: '', label: '无'}, {value: 1, label: '等级考'}, {value: 2, label: '合格考'}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="temp" prop="sort">
                        <span class="ib" slot="label"><span class="xing ib"></span>序号：</span>
                        <el-input-number v-model="updateModel.sort" :debounce="0" :min="0" :max="500" :controls="false" size="small" style="width: 100%;"></el-input-number>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-switch v-model="updateModel.status" on-color="#13ce66" off-color="#ff4949" on-text="开启" off-text="关闭" :on-value="1" :off-value="0"></el-switch>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取 消</el-button>
                <el-button type="primary" @click="update">确 定</el-button>
            </div>
        </sy-dialog>
        <!--添加课程和课程类型-->
        <sy-dialog title="新增" :visible.sync="addVisible" :close-on-click-modal="false" class="dialogs" position="middle" height="auto" width="650px" slide="fade">
            <div slot="body">
                <el-form :model="addModel" ref="addModel" style="margin: 20px;" class="sy-courses-dialog">
                    <el-row v-show="addModel.parentType == 'course_type'">
                        <el-col :span="24">
                            <el-radio-group v-model="addModel.addType" @change="changeType">
                                <el-radio :label="1">分类</el-radio>
                                <el-radio :label="2">课程</el-radio>
                            </el-radio-group>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">添加数：
                            <el-input size="mini" style="width: 45px;height: 25px;" v-model.trim="addModel.nums"></el-input>只能是（1-20）之间的数字<span style="float: right; margin-right:20px" v-if="addModel.parentName">父级{{(addModel.parentType == 'course_type' ? '分类' : '课程')}}：{{addModel.parentName}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-table border style="width: 100%;" :data="addModel.typeDatas" max-height="300" v-if="addModel.addType == '1'">
                                <el-table-column label="序号" header-align="center" align="center">
                                    <template scope="scope">
                                        <span class="xing ib"></span>
                                        <el-input-number :debounce="0" v-model="scope.row.sort = scope.$index" :min="0" :max="1000" :controls="false" size="small" style="width: 270px;display: inline-block;"></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column label="名称" header-align="center" align="center">
                                    <template scope="scope">
                                        <span class="xing ib"></span>
                                        <el-form-item prop="name" messageIsTooltip :rules="[{ trigger: 'change', validator: nameValidator, options: { row: scope.row, datas: addModel.typeDatas } }]">
                                            <el-input v-model="scope.row.name" size="small" style="width: 270px;display: inline-block;"></el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-table border style="width: 100%" :data="addModel.courseDatas" max-height="300" v-if="addModel.addType == '2'">
                                <el-table-column label="序号" prop="sort" header-align="center" align="center">
                                    <template scope="scope">
                                        <span class="xing ib"></span>
                                        <el-input-number :debounce="0" v-model="scope.row.sort = scope.$index" :min="0" :max="1000" :controls="false" size="small" style="width: 90px;display: inline-block;"></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column label="编号" header-align="center" align="center">
                                    <template scope="scope">
                                        <span class="xing ib"></span>
                                        <el-form-item prop="courseNum" messageIsTooltip :rules="[{ trigger: 'change', validator: courseNumValidator, options: { row: scope.row, datas: addModel.courseDatas } }]">
                                            <el-input v-model.trim="scope.row.courseNum" size="small" style="width: 90px;display: inline-block;"></el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column label="名称" header-align="center" align="center">
                                    <template scope="scope">
                                        <span class="xing ib"></span>
                                        <el-form-item prop="name" messageIsTooltip :rules="[{ trigger: 'change', validator: nameValidator, options: { row: scope.row, datas: addModel.courseDatas } }]">
                                            <el-input v-model.trim="scope.row.name" size="small" style="width: 90px;display: inline-block;"></el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column label="简称" header-align="center" align="center">
                                    <template scope="scope">
                                        <span class="xing ib"></span>
                                        <el-form-item prop="shortName" messageIsTooltip :rules="[{ trigger: 'change', validator: shortNameValidator, options: { row: scope.row, datas: addModel.courseDatas } }]">
                                            <el-input v-model.trim="scope.row.shortName" size="small" style="width: 90px;display: inline-block;"></el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column label="属性" header-align="center" align="center">
                                    <template scope="scope">
                                        <el-select v-model="scope.row.kcsx" size="small">
                                            <el-option v-for="item in [{value: '', label: '无'}, {value: 1, label: '等级考'}, {value: 2, label: '合格考'}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="add">确 定</el-button>
            </div>
        </sy-dialog>
    </div>
</template>
<script>
import {
    getUnitCourseTree,
    addTreeCourseTypeNode,
    addTreeCourseNode,
    courseIdFind,
    courseTypeIdFind,
    editTreeCourseTypeNode,
    editTreeCourseNode,
    delectCourse,
    delectCourseType,
    vifCourseSame,
    vifCourseTypeSame,
    vifCourseNumSame
} from './require.js';
import config from './config.js';
import _ from 'lodash';
import {getRcCodeList} from '../../request'

export default {
    name: 'course',
    data() {
        // 当前登录用户的unitId
        let currentUnitId = JSON.parse(window.sessionStorage.getItem('user')).data.unitId;
        return {
            treeNodeOpenState: {},
            currentUnitId: currentUnitId,
            isTreeDatasEmpty: false,
            $treeObj: undefined,
            $treeNode: undefined,
            addModel: {
                typeColumns: config.typeColumns,
                typeDatas: [],
                courseColumns: config.courseColumns,
                courseDatas: [],
                parentName: '',
                addType: 1,
                nums: '',
                parentType: ''
            },
            updateModelRules: {
		        sort: [{
		        	trigger: 'change',
		        	validator: (rule, value, callback) => {
		        		if (value == 0) {
		        			callback();
		        			return;
		        		}
		        		// 非空校验
			            if (!value || value.length == 0) {
			                callback(new Error("序号不能为空！"));
			                return;
			            }
			            callback();
		        	}
		        }],
		        shortName: [{
		        	trigger: 'change',
		        	validator: (rule, value, callback) => {
		        		// 非空校验
			            if (!value || value.replace(/^\s+|\s+$/g, '').length == 0) {
			                callback(new Error("简称不能为空！"));
			                return;
			            }
			            callback();
		        	}
		        }],
                name: [{
                    trigger: 'change',
                    validator: (rule, value, callback) => {
                        // 非空校验
                        if (!value || value.replace(/^\s+|\s+$/g, '').length == 0) {
                            callback(new Error("名称不能为空！"));
                            return;
                        }
                        if (value == this.updateModel.oldName) {
                            callback();
                            return;
                        }
                        // 重复校验
                        if (this.updateModel.nodeType == 'course_type') {
                            vifCourseTypeSame({
                                unitId: this.currentUnitId,
                                name: value,
                                parentId: this.updateModel.parentId
                            }).then(function(r) {
                                if (r && r.data == false) {
                                    callback(new Error("名称不能重复！"));
                                } else {
                                    callback();
                                }
                            });
                        } else if (this.updateModel.nodeType == 'course') {
                            vifCourseSame({
                                unitId: this.currentUnitId,
                                name: value,
                            }).then(function(r) {
                                if (r && r.data == false) {
                                    callback(new Error("名称不能重复！"));
                                } else {
                                    callback();
                                }
                            });
                        }
                    }
                }],
                courseNum: [{
                    trigger: 'change',
                    validator: (rule, value, callback) => {
                        // 非空校验
                        if (!value || value.replace(/^\s+|\s+$/g, '').length == 0) {
                            callback(new Error("编号不能为空！"));
                            return;
                        }
                        if (!(/^[\w\-]{1,20}$/g.test(value))) {
                            callback(new Error("请输入1-20位编号！允许输入：A-Z a-z 0-9 _ -"));
                            return;
                        }
                        if (value == this.updateModel.oldCourseNum) {
                            callback();
                            return;
                        }
                        vifCourseNumSame({
                            unitId: this.currentUnitId,
                            courseNum: value,
                        }).then(function(r) {
                            if (r && r.data == false) {
                                callback(new Error("编号不能重复！"));
                            } else {
                                callback();
                            }
                        });
                    }
                }]
            },
            updateModel: {
                id: '',
                name: '',
                oldName: '',
                sort: '',
                status: '',
                kcsx: '',
                courseNum: '',
                oldCourseNum: '',
                shortName: '',
                oldShortName: '',
                nodeType: '',
                parentId: '',
                unitId: ''
            },
            typeId: '',
            parentId: '',
            addVisible: false,
            updateVisible: false,
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            treeData: [],
            codeList: {
                btn_base_courseManager_add: false, //  新增
                btn_base_courseManager_edit: false, //  修改
                btn_base_courseManager_del: false //  删除
            }
        }
    },
    watch: {
        addVisible(val, oldVal) {
            if (!val) {
                $('.addBut,.editBut,.deleteBut', '.ztree').remove();
            }
        },
        updateVisible(val, oldVal) {
            if (!val) {
                $('.addBut,.editBut,.deleteBut', '.ztree').remove();
            }
        },
        'addModel.nums': {
            handler(n, o) {
                let _this = this,
                    _array = (this.addModel.addType == 1 ? this.addModel.typeDatas : this.addModel.courseDatas);
                if (n > 20) {
                    setTimeout(function() {
                        _this.addModel.nums = 20;
                    }, 50);
                    return false;
                }
                if (!/^(([1-9])|(1[0-9])|(20))$/gi.test(n) && n !== '') {
                    setTimeout(function() {
                        _this.addModel.nums = (_array && _array.length > 0 ? _array.length : '');
                    }, 50);
                    return false;
                }
                if (n > 20) {
                    n = 20;
                }
                if (!n || n < _array.length) {
                    let count = (_array.length - (!n ? 0 : parseInt(n)));
                    for (var i = 0; i < count; i++) {
                        _array.pop();
                    }
                } else if (n > _array.length) {
                    let count = (parseInt(n) - _array.length);
                    for (let i = 0; i < count; i++) {
                        _array.push({
                            sort: undefined,
                            name: undefined,
                            shortName: undefined,
                            courseNum: undefined,
                            kcsx: '',
                        });
                    }
                }
            },
            deep: true
        }
    },
    mounted() {
        getRcCodeList('category_base_courseManager', this.codeList).then(() => {
            this.getCourseTree();
        })
        this.$parent.$emit('currentPage', config.url);
    },
    methods: {
        nameValidator(rule, value, callback) {
            value = rule.options.row[rule.field];
            // 非空校验
            if (!value || value.replace(/^\s+|\s+$/g, '').length == 0) {
                callback(new Error("名称不能为空！"));
                return;
            }
            // 重复校验
            if (_.filter(rule.options.datas || [], {
                    [rule.field]: value
                }).length > 1) {
                callback(new Error("名称不能重复！"));
                return;
            }
            if (this.addVisible) {
                if (this.addModel.addType == 1) {
                    vifCourseTypeSame({
                        unitId: this.currentUnitId,
                        name: value,
                        parentId: this.$treeNode.id
                    }).then(function(r) {
                        if (r && r.data == false) {
                            callback(new Error("名称不能重复！"));
                        } else {
                            callback();
                        }
                    });
                } else if (this.addModel.addType == 2) {
                    vifCourseSame({
                        unitId: this.currentUnitId,
                        name: value
                    }).then(function(r) {
                        if (r && r.data == false) {
                            callback(new Error("名称不能重复！"));
                        } else {
                            callback();
                        }
                    });
                }
                return;
            }
            callback();
        },
        courseNumValidator(rule, value, callback) {
            value = rule.options.row[rule.field];
            // 非空校验
            if (!value || value.replace(/^\s+|\s+$/g, '').length == 0) {
                callback(new Error("编号不能为空！"));
                return;
            }
            if (!(/^[\w\-]{1,20}$/g.test(value))) {
                callback(new Error("请输入1-20位编号！允许输入：A-Z a-z 0-9 _ -"));
                return;
            }
            // 重复校验
            if (_.filter(rule.options.datas || [], {
                    [rule.field]: value
                }).length > 1) {
                callback(new Error("编号不能重复！"));
                return;
            }
            vifCourseNumSame({
                unitId: this.currentUnitId,
                courseNum: value,
            }).then(function(r) {
                if (r && r.data == false) {
                    callback(new Error("编号不能重复！"));
                } else {
                    callback();
                }
            });
        },
        shortNameValidator(rule, value, callback) {
            value = rule.options.row[rule.field];
            // 非空校验
            if (!value || value.replace(/^\s+|\s+$/g, '').length == 0) {
                callback(new Error("简称不能为空！"));
                return;
            }
            // 重复校验
            if (_.filter(rule.options.datas || [], {
                    [rule.field]: value
                }).length > 1) {
                callback(new Error("简称不能重复！"));
                return;
            }
            callback();
        },
        //获取教学课程树
        getCourseTree() {
            // 备份操作前的展开状态
            this.treeNodeOpenState = {};
            let $treeObj_ = $.fn.zTree.getZTreeObj('coursesTree');
            if ($treeObj_) {
                $.each($treeObj_.transformToArray($treeObj_.getNodes()) || [], (index, el) => {
                    this.treeNodeOpenState[el.id] = el.open;
                });
            }
            getUnitCourseTree().then((res) => {
                if (!res || !res.data || !res.data.length) {
                    this.isTreeDatasEmpty = true;
                    this.$notify.info({
                        title: '提示',
                        message: '没有查到相关数据！'
                    });
                    return false;
                }
                var _this = this;
                // 还原展开状态
                $.each(res.data, (index, el) => {
                    el.open = (this.treeNodeOpenState[el.id] ? true : false);
                });
                this.$treeObj = this.$ztree($('#coursesTree'), {
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

                            // 如果自己和父级类型都是课程，则不能在进行添加操作。
                            if (treeNode.nodeAttribute == 'course' && treeNode.getParentNode() && treeNode.getParentNode().nodeAttribute == 'course') {
                                _buts = [];
                            }
                            if (!_this.codeList['btn_base_courseManager_add']) {
                                _buts = []
                            }
                            // 当前登录用户的单位
                            if (treeNode.level !== 0 && treeNode.unitId == _this.currentUnitId) {
                                if (_this.codeList['btn_base_courseManager_edit']) {
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
                                }
                                if (_this.codeList['btn_base_courseManager_del']) {
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
                            let $nodeIcon = $('#' + treeNode.tId + '_ico');
                            let _class = $nodeIcon.attr('class').split(' ');
                            _class.unshift(treeNode.nodeAttribute);
                            $nodeIcon.attr('class', _class.join(' '));
                        },
                        selectedMulti: false,
                        txtSelectedEnable: false,
                        autoCancelSelected: false,
                        dblClickExpand: false
                    }
                }, res.data);
            });
        },
        changeType(val) {
            this.addModel.typeDatas = [];
            this.addModel.courseDatas = [];
            this.addModel.nums = '';
        },
        // 打开修改界面
        toUpdate(node) {
            this.$refs.updateModel.resetFields();
            this.updateModel = {
                id: '',
                name: '',
                oldName: '',
                sort: '',
                status: '',
                kcsx: '',
                courseNum: '',
                oldCourseNum: '',
                shortName: '',
                oldShortName: '',
                parentId: '',
                unitId: '',
                nodeType: node.nodeAttribute
            };
            if (node.nodeAttribute == 'course_type') {
                courseTypeIdFind(node.id).then((res) => {
                    if (!res || !res.data) {
                        return false;
                    }
                    this.updateModel.id = res.data.id;
                    this.updateModel.name = res.data.name;
                    this.updateModel.oldName = res.data.name;
                    this.updateModel.sort = res.data.sort;
                    this.updateModel.status = res.data.status;
                    if (res.data.parent) {
                        this.updateModel.parentId = res.data.parent;
                    }
                    if (res.data.unitId) {
                        this.updateModel.unitId = res.data.unitId;
                    }
                    this.updateVisible = true;
                });
            } else if (node.nodeAttribute == 'course') {
                courseIdFind(node.id).then((res) => {
                    if (!res || !res.data) {
                        return false;
                    }
                    this.updateModel.id = res.data.id;
                    this.updateModel.name = res.data.name;
                    this.updateModel.oldName = res.data.name;
                    this.updateModel.sort = res.data.sort;
                    this.updateModel.status = res.data.status;
                    this.updateModel.kcsx = (res.data.kcsx ? res.data.kcsx : '');
                    this.updateModel.courseNum = res.data.courseNum;
                    this.updateModel.oldCourseNum = res.data.courseNum;
                    this.updateModel.shortName = res.data.shortName;
                    this.updateModel.oldShortName = res.data.shortName;
                    this.updateVisible = true;
                });
            }
        },
        // 修改
        update() {
            this.$refs.updateModel.validate((valid) => {
                if (!valid) {
                    return false;
                }
                if (this.updateModel.nodeType == 'course_type') {
                    editTreeCourseTypeNode({
                        id: this.updateModel.id,
                        name: this.updateModel.name,
                        sort: this.updateModel.sort,
                        status: this.updateModel.status,
                        unitId: this.updateModel.unitId
                    }).then((res) => {
                        this.$notify({
                            title: '成功',
                            message: '修改成功！',
                            type: 'success'
                        });
                        this.getCourseTree();
                        this.updateVisible = false;
                    });
                    return false;
                }
                if (this.updateModel.nodeType == 'course') {
                    editTreeCourseNode({
                        id: this.updateModel.id,
                        name: this.updateModel.name,
                        shortName: this.updateModel.shortName,
                        kcsx: this.updateModel.kcsx,
                        sort: this.updateModel.sort,
                        courseNum: this.updateModel.courseNum,
                        status: this.updateModel.status
                    }).then((res) => {
                        this.$notify({
                            title: '成功',
                            message: '修改成功！',
                            type: 'success'
                        });
                        this.getCourseTree();
                        this.updateVisible = false;
                    });
                }
            });
        },
        // 添加
        toAdd(node) {
            this.$refs.addModel.resetFields();
            this.addModel.$treeNode = node;
            this.addModel.parentType = (node ? node.nodeAttribute : 'course_type');
            this.addModel.nums = '';
            this.addModel.typeDatas = [];
            this.addModel.courseDatas = [];
            this.addModel.parentName = (node ? node.name : '');
            if (this.addModel.parentType == 'course_type') {
                this.addModel.addType = 1;
            }
            if (this.addModel.parentType == 'course') {
                this.addModel.addType = 2;
            }

            // 一级节点不传父级和类型
            if (!node || node.level == 0) {
                this.addModel.parentId = '';
                this.addModel.typeId = '';
            }
            this.addVisible = true;
        },
        //提交添加按钮
        add() {
            // 学科类型
            if (this.addModel.addType == 1) {
                this.$refs.addModel.validate((valid) => {
                    if (!valid || !this.addModel.typeDatas || this.addModel.typeDatas.length < 1) {
                        return false;
                    }
                    let _parems = {},
                        _parent = this.addModel.$treeNode ? this.addModel.$treeNode.id : undefined;
                    for (let i = 0; i < this.addModel.typeDatas.length; i++) {
                        _parems['courseTypeVMS[' + i + '].name'] = this.addModel.typeDatas[i].name;
                        _parems['courseTypeVMS[' + i + '].sort'] = this.addModel.typeDatas[i].sort;
                        if (_parent) {
                            _parems['courseTypeVMS[' + i + '].parent'] = _parent;
                        }
                    }
                    addTreeCourseTypeNode(_parems).then((res) => {
                        this.$notify({
                            title: '成功',
                            message: '新增成功！',
                            type: 'success'
                        });
                        this.getCourseTree();
                        this.addVisible = false;
                    });
                });
                return false;
            }
            // 学科
            if (this.addModel.addType == 2) {
                this.$refs.addModel.validate((valid) => {
                    if (!valid || !this.addModel.courseDatas || this.addModel.courseDatas.length < 1) {
                        return false;
                    }
                    let _parems = {
                        unitId: this.currentUnitId
                    };
                    if (this.addModel.$treeNode) {
                        if (this.addModel.$treeNode.nodeAttribute == 'course_type') {
                            _parems['typeId'] = this.addModel.$treeNode.id;
                        }
                        if (this.addModel.$treeNode.nodeAttribute == 'course') {
                            _parems['parentId'] = this.addModel.$treeNode.id;
                        }
                    }
                    for (let i = 0; i < this.addModel.courseDatas.length; i++) {
                        _parems['vms[' + i + '].name'] = this.addModel.courseDatas[i].name;
                        _parems['vms[' + i + '].shortName'] = this.addModel.courseDatas[i].shortName;
                        _parems['vms[' + i + '].courseNum'] = this.addModel.courseDatas[i].courseNum;
                        _parems['vms[' + i + '].kcsx'] = this.addModel.courseDatas[i].kcsx;
                        _parems['vms[' + i + '].sort'] = this.addModel.courseDatas[i].sort;
                    }
                    addTreeCourseNode(_parems).then((res) => {
                        this.$notify({
                            title: '成功',
                            message: '新增成功！',
                            type: 'success'
                        });
                        this.getCourseTree();
                        this.addVisible = false;
                    });
                });
            }
        },
        toDelete(node, $treeObj) {
            this.$confirm(this.$t('message.delete'), '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (node.nodeAttribute == 'course') {
                    delectCourse(node.id).then((res) => {
                        this.$notify({
                            title: '成功',
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.getCourseTree();
                    });
                } else if (node.nodeAttribute == 'course_type') {
                    delectCourseType(node.id).then((res) => {
                        this.$notify({
                            title: '成功',
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.getCourseTree();
                    });
                }
            }).catch(() => {
                $treeObj.cancelSelectedNode();
                $('.addBut,.editBut,.deleteBut', '.ztree').remove();
            });
        }
    }
}
</script>
<style scoped>
.el-row,
.el-form-item {
    margin-bottom: 10px;
}

.el-row {
    line-height: 36px;
}

.sy-right {
    float: right;
}
.app-container-box {
  top:185px;
  bottom:50px;
}
</style>
