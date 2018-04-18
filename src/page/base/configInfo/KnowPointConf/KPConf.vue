<template>
    <div class="app-container-box">
        <sy-grad-4>
            <div slot="headerLeft">
                <span>单位</span>
            </div>
            <div slot="headerRight" class="line-height-56">
                <span class="ib">{{selectUnitName + ' '}}知识点</span>
            </div>
            <div slot="bodyLeft">
                <sy-grad-4 :border="false">
                    <div slot="headerRight" class="line-height-56" style="background:#fff;">
                        <el-input :placeholder="$t('input.searchPlaceholder')" icon="search" v-model.trim="inputValue" size="small" @keyup.enter.native="handleIconClick" :on-icon-click="handleIconClick">
                        </el-input>
                    </div>
                    <div slot="bodyRight">
                        <el-tree :empty-text="emptyTextTree" :data="data" style="border: none;" highlight-current class="full-parent" @node-click="handleNodeClick" :props="defaultProps" node-key="id" :current-node-key="defaultKey" :default-expanded-keys="defaultKeys" :filter-node-method="filterNode" ref="unitTree"></el-tree>
                    </div>
                </sy-grad-4>
            </div>
            <div slot="bodyRight">
                <sy-grad-4 :border="false">
                    <div slot="headerRight" class="line-height-56">
                        <div class="sy-period" v-show="selPeriods">
                            <span class="sy-span-crb">学段 :</span>
                            <el-select v-model="periodValue" placeholder="请选择学段" @change="showGrade" size="small">
                                <el-option v-for="period in periods" :key="period.id" :label="period.name" :value="period.id"></el-option>
                            </el-select>
                        </div>
                        <div class="sy-grade" v-show="selGrade">
                            <span class="sy-span-crb">年级:</span>
                            <el-select v-model="gradeValue" placeholder="请选择年级" @change="showKnowPoint" size="small">
                                <el-option v-for="grade in grades" :key="grade.id" :label="grade.gradeName" :value="grade.id"></el-option>
                            </el-select>
                        </div>
                        <el-button v-if="codeList['btn_base_knowledgepoint_add'] && btnAdd" @click="showClass" class="sy-button-add" size="small">新增一级节点</el-button>
                    </div>
                    <div slot="bodyRight" style="overflow: auto">
                        <el-tree :empty-text="emptyTextTreeKnow" id="tree" class="kpTree" :data="knowData" style="border:none;background: #FBFCFC" node-key="id" :props="knowDefaultProps" :render-content="renderContent"></el-tree>
                    </div>
                </sy-grad-4>
            </div>
        </sy-grad-4>
        <sy-dialog title="新增一级节点" position="middle" height="auto" slide="fade" width="30%" :visible.sync="isvisible">
            <div slot="body" style="padding: 0px 10px 8px 10px">
                <el-form :model="newNodeForm" :rules="nodeRules" ref="newNodeForm" class="newNodeForm">
                    <el-form-item prop="checkList" style="margin-top:10px;" label-width="80px" label="课程名称">
                        <el-checkbox-group v-model="newNodeForm.checkList">
                            <el-checkbox v-for="item in checkKnowList" :key="item.courseId" :label="item.courseId" name="checkList">{{item.courseName}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button size="small" @click="isvisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click=" submitForm('newNodeForm')" :loading="loading">确 定</el-button>
            </div>
        </sy-dialog>
        <sy-dialog title="修改" position="middle" height="auto" slide="fade" width="20%" :visible.sync="isvisibleEdit">
            <div slot="body">
                <el-form :label-position="labelPosition" label-width="80px" ref="formEdit" :rules="editNewName" :model="formEdit" style="padding:20px">
                    <el-form-item label="请输入新名称:" prop="name">
                        <el-input v-model.trim="formEdit.name"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button size="small" @click="isvisibleEdit = false">取 消</el-button>
                <el-button size="small" type="primary" @click=" submitEdit()" :loading="loading">确 定</el-button>
            </div>
        </sy-dialog>
        <sy-dialog title="添加知识点" position="middle" height="auto" slide="fade" width="30%" :visible.sync="addPointShow">
            <div slot="body" style="margin-bottom: 15px;">
                <div class="sy-div-selAddNum">
                    <div class="sy-div-selOptions">
                        <el-row>
                            <el-col :span="8" style="background: #DEEEFD;text-align: center;">
                                <span>父级节点：</span>
                            </el-col>
                            <el-col :span="16" style="padding:0 8px">
                                <span>{{fatherNode}}</span>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="sy-div-selOptions">
                        <el-row>
                            <el-col :span="8" style="background: #DEEEFD;text-align: center">
                                <span>添加数目：</span>
                            </el-col>
                            <el-col :span="16" style="padding:0 8px">
                                <el-form ref="selNumForm" :model="selNumForm" style="width:40%;display: inline-block">
                                    <el-form-item prop="selNum" style="margin-bottom:0px;" messageIsTooltip :rules="[{ validator: checkNum, trigger: 'change, blur' }]">
                                        <el-input v-model="selNumForm.selNum" @blur="appendItem"></el-input>
                                    </el-form-item>
                                </el-form>
                                <span style="color:#CCCCCC;font-size:12px">注：只能是(1-30)的数字</span>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="sy-div-addPointAppend">
                    <el-form :model="appendNodeForm" ref="appendNodeForm" class="appendNode">
                        <el-table border ref="appendNode"  style="width:100%;overflow: auto" :data="appendNodeForm.appendData">
                            <el-table-column type="index" label="序号" width="80">
                            </el-table-column>
                            <el-table-column label="知识点名称">
                                <template scope="scope">
                                    <span class="xing" display="inline-block"></span>
                                    <el-form-item prop="name" messageIsTooltip style="margin-bottom: 0px;display: inline-block;width:60%" :rules="[{ trigger: 'change', validator: nameValidator, options: { row: scope.row, datas:appendNodeForm.appendData} }]">
                                        <el-input v-model="scope.row.name" size="small"></el-input>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form>
                </div>
            </div>
            <div slot="footer" style="margin-top:5px;">
                <el-button @click="addPointShow = false">取 消</el-button>
                <el-button size="small" type="primary" @click="subMitAppend()" :loading="saveLoading">确 定</el-button>
            </div>
        </sy-dialog>
    </div>
</template>
<script>
import {
    getUnitTree,
    ERR_OK,
    getPeriod,
    Periods,
    getGrade,
    getKnowPoint,
    addKnowPointRoot,
    getClass,
    addPoint,
    editPoint,
    delPoint,
    checkPoint,
    getPointById
} from '../requestApi'
import { getCurrentYear, getTerm } from '../../base/year/request'
import config from './config.js';
import pager from '../../config.js';
import _ from 'lodash';
import {getRcCodeList} from '../../request'

export default {
    name: '',
    components: {},
    data() {
        var checkExist = (rule, value, callback) => {
            console.log(this.tplId)
            checkPoint({
                unitId: this.tplId,
                name: value
            }).then((res) => {
                if (res.code === ERR_OK) {
                    if (res.data) {
                        callback(new Error('知识点名称不能重复！'))
                    } else {
                        callback()
                    }
                }
            })
        }

        //  长度校验
        var checkLength = (rule, value, callback) => {
            if (!value) {
                callback
            }
            if (value.length > 50) {
                callback(new Error('知识点名称不可超过50字符！'))
            } else {
                callback()
            }
        }

        return {
            saveLoading: false,
            loading: false,
            emptyTextTree: '正在加载中...',
            emptyTextTreeKnow: '正在加载中...',
            inputValue: '',
            editNewName: {
                name: [
                    { required: true, message: '知识点名称不能为空！', trigger: 'change' },
                    { validator: checkExist, trigger: 'blur' },
                    { validator: checkLength, trigger: 'change' }
                ]
            },
            tplNodeData: [],
            appendNodeForm: {
                appendData: []
            },
            editId: '',
            formEdit: {
                name: ''
            },
            labelPosition: 'top',
            isvisibleEdit: false,

            selNumForm: {
                selNum: ''
            },
            tplKnowData: [],
            initNum: 0,
            addPointShow: false,
            fatherNode: '',
            dialogFormVisible: false,
            dialogEditFormVisible: false,
            dialogFormVisible1: false,
            dialogEditFormVisible1: false,
            tplGradeId: '',
            defaultKey: '',
            tplCurrentYear: '',
            defaultKeys: [],
            data: [],
            dataList: [],
            knowData: [],
            periods: [],
            grades: [],
            tplId: '',
            tplTerm: '',
            defaultProps: config.defaultProps,
            knowDefaultProps: config.knowDefaultProps,
            selPeriods: true,
            selGrade: true,
            value: '',
            gradeValue: '',
            periodValue: '',
            isvisible: false,
            btnAdd: false,
            checkKnowList: [],
            newNodeForm: {
                checkList: []
            },
            nodeRules: {
                checkList: [
                    { type: 'array', required: true, message: "请选择课程！", trigger: 'change' }
                ]
            },
            selectUnitName: '',
            codeList: {
                btn_base_knowledgepoint_add: false,
                btn_base_knowledgepoint_addchild: false,
                btn_base_knowledgepoint_edit: false,
                btn_base_knowledgepoint_del: false,
            }
        }
    },
    beforeCreate() {

    },
    created() {
        getRcCodeList('category_base_knowledgepoint', this.codeList).then(() => {
            this._init()
        })
        this.$parent.$emit('currentPage', '/base/knowPointConf');

    },
    methods: {
        //  知识点验证
        nameValidator(rule, value, callback) {
            value = rule.options.row[rule.field];
            // 非空校验
            if (!value || value.replace(/^\s+|\s+$/g, '').length == 0) {
                callback(new Error("知识点名称不能为空！"));
                return;
            }
            // 重复校验
            if (_.filter(rule.options.datas || [], {
                    [rule.field]: value
                }).length > 1) {
                callback(new Error("知识点名称不能重复！"));
                return;
            }
            //  长度校验
            if (value.length > 50) {
                callback(new Error('知识点名称不能超过50字符！'))
                return
            }
            //  重名校验
            checkPoint({
                unitId: this.tplId,
                name: value
            }).then((res) => {
                if (res.code === ERR_OK) {
                    if (res.data) {
                        callback(new Error('知识点名称不能重复！'))
                    } else {
                        callback();
                    }
                }
            })
        },

        //  校验数字
        checkNum(rule, value, callback) {
            if (value) {
                let reg = /^[0-9]\d*$/;
                if (reg.test(value)) {
                    return callback()
                } else {
                    return callback(new Error('知识点数目只能是大于等于0的整数！'))
                }
            } else {
                return callback(new Error('知识点数目不可为空！'))
            }
        },

        //  search按钮点击过滤
        handleIconClick() {
            this.$refs.unitTree.filter(this.inputValue);
        },

        //  过滤函数
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },

        //  校验批量增加的子项
        checkItem(store, row, scope) {
            this.tplNodeData = []
            this.appendNodeForm.name = row.name
            store.states.data.forEach((val, index) => {
                if (index !== scope.$index) {
                    this.tplNodeData.push(val)
                }
            })
        },

        //  修改
        submitEdit() {
            this.$refs.formEdit.validate((valid) => {
                if (valid) {
                    this._editPoint({
                        id: this.editId,
                        name: this.formEdit.name
                    })
                }
            })
        },

        //  批量增加子节点
        subMitAppend() {
            this.saveLoading = true
            this.$refs.selNumForm.validate((v) => {
                if (!v) {
                    this.saveLoading = false
                    return v;
                }
                this.$refs.appendNodeForm.validate((valid) => {
                    if (valid) {
                        let paramArr = []
                        for (let i = 0; i < this.appendNodeForm.appendData.length; i++) {
                            paramArr.push({
                                name: this.appendNodeForm.appendData[i].name,
                                unitId: this.tplId,
                                parentPointId: this.tplParentPointId,
                                sort: this.initNum + (i + 1)
                            })
                        }
                        this._addPoint(paramArr)
                    } else {
                        this.saveLoading = false
                    }
                });
            });
        },

        //  渲染自子知识点条目
        appendItem() {
            this.$refs.selNumForm.validate((valid) => {
                if (valid) {
                    this.appendNodeForm.appendData = []
                    if (this.selNumForm.selNum > 30) {
                        this.selNumForm.selNum = 30
                        for (let i = 0; i < 30; i++) {
                            this.appendNodeForm.appendData.push({
                                name: ''
                            })
                        }
                    } else if (this.selNumForm.selNum === 0) {
                        this.selNumForm.selNum = 1
                        this.appendNodeForm.appendData.push({
                            name: ''
                        })
                    } else {
                        for (let i = 0; i < this.selNumForm.selNum; i++) {
                            this.appendNodeForm.appendData.push({
                                name: ''
                            })
                        }
                    }
                } else {
                    this.appendNodeForm.appendData = []
                }
            })
        },


        //  渲染知识点树
        renderContent(h, { node, data, store }) {
            return h('span', {
                attrs: {
                    class: "sy-span-kpconf"
                }
            }, [
                h('span', node.label),
                h('span', {
                    attrs: {
                        style: "margin-left: 60px;",
                        class: 'sy-span-resBtn'
                    }
                }, [
                    h('i', {
                        attrs: {
                            class: "fa fa-plus",
                            style: `margin-left:8px;color:green;display:${this.codeList['btn_base_knowledgepoint_addchild'] ? 'inline-block' : 'none'}`,
                            title: '新增'
                        },
                        on: {
                            click: (e) => {
                                e.stopPropagation()
                                this.saveLoading = false
                                this.$refs.selNumForm.resetFields()
                                this.$refs.appendNodeForm.resetFields()
                                this.fatherNode = data.name
                                this.addPointShow = true
                                this.appendNodeForm.appendData = []
                                this.tplParentPointId = data.id
                                this.initNum = (data && data.children ? data.children.length : 0)
                            }
                        }
                    }),
                    h('i', {
                        attrs: {
                            class: "fa fa-pencil-square-o",
                            style: `margin-left:10.5px;color:#49C1DB;display:${data.isEdit && this.codeList['btn_base_knowledgepoint_edit'] ? 'inline-block' : 'none'}`,
                            "aria-hidden": true,
                            title: '编辑'
                        },
                        on: {
                            click: (e) => {
                                e.stopPropagation();
                                console.log(data)
                                this.$refs.formEdit.resetFields()
                                if (data.id !== '') {
                                    this._getPointById({
                                        id: data.id
                                    })
                                    this.editId = data.id
                                }
                                // this.tplParentPointId = data.parentPointId ? data.parentPointId : ''
                            }
                        }
                    }),
                    h('i', {
                        attrs: {
                            class: "fa fa-times",
                            style: `margin-left:8px;font-size:18px;color:red;display:${data.isEdit && this.codeList['btn_base_knowledgepoint_del'] ? 'inline-block' : 'none'}`,
                            "aria-hidden": true,
                            title: '删除'
                        },
                        on: {
                            click: (e) => {
                                e.stopPropagation()
                                this.$confirm('您确定要删除么？ 是否继续?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    if (data && data.children && data.children.length > 0) {
                                        this.$notify({
                                            title: '提示',
                                            message: '存在子知识点不可删除！',
                                            type: 'error'
                                        });
                                    } else {
                                        this._delPoint({
                                            id: data.id
                                        })
                                    }
                                })
                            }
                        }
                    })
                ])
            ])
        },

        //  单位树点击
        handleNodeClick(data) {
            this.emptyTextTreeKnow = '正在加载中...'
            if (data.type === 'unit') {
                this.selectUnitName = data.name;
            } else if (data.type === 'grade') {
                let _parent = _.find(this.dataList, {
                    id: data.parentId
                });
                this.selectUnitName = ((_parent ? _parent.name : '') + ' ' + data.name);
            }
            // console.log(data);
            // if (data.unitType === 2 || data.type === 'grade') {
            if (data.type === 'unit') {
                this.btnAdd = false
                this.periodValue = ''
                this.periods = []
                this.selPeriods = true
                this.selGrade = true
                this.tplId = data.id
                this._getPeriod({
                    unitId: this.tplId
                })
            } else if (data.type == 'grade') {
                this.btnAdd = true
                this.selPeriods = false
                this.selGrade = false
                this.tplId = data.parentId
                if (this.gradeValue == data.id) {
                    this.gradeValue = data.id;
                    this.showKnowPoint(data.id);
                } else {
                    this.gradeValue = data.id;
                }
            }
            // }
        },

        // 获取知识点
        showKnowPoint(value) {
            if (value !== '' && this.tplId !== '') {
                this._getKnowPoint({
                    grade: this.gradeValue,
                    unitId: this.tplId
                })
            }
        },

        //  获取年级
        showGrade(value) {
            if (this.periodValue !== '' && this.tplId !== '') {
                this._getGrade({
                    unitId: this.tplId,
                    period: value
                })
            }
        },

        //  获取课程
        showClass() {
            this.loading = false
            this.$refs.newNodeForm.resetFields()
            // this.$refs.appendNodeForm.resetFields()
            this.checkKnowList = []
            if (this.tplId !== '') {
                this._getClassAbout({
                    unitId: this.tplId
                })
            }
        },

        //  提交表单操作
        submitForm(formName) {
            this.loading = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this._addKnowPointRoot({
                        courseIds: this.newNodeForm.checkList,
                        grade: this.gradeValue,
                        unitId: this.tplId
                    });
                } else {
                    this.loading = false
                }
            });
        },

        //  查询单位树
        _getUnitTree() {
            getUnitTree().then((res) => {
                if (res.code === ERR_OK) {
                    this.data = this.$data2tree(res.data, 'domId', 'domPid')
                }
            })
        },

        //  查询学段
        _getPeriod(param) {
            this.periods = [];
            this.periodValue = '';
            getPeriod(param).then((res) => {
                if (res.data.length === 0) {
                    this.emptyTextTreeKnow = '暂无数据'
                }
                if (res.code === ERR_OK && res.data && res.data.length > 0) {
                    this.periods = res.data
                    this.periodValue = this.periods[0].id
                }
            })
        },

        //  查询年级
        _getGrade(param) {
            this.grades = []
            this.gradeValue = ''
            getGrade(param).then((res) => {
                if (res.data.length === 0) {
                    this.emptyTextTreeKnow = '暂无数据'
                }
                if (res.code === ERR_OK && res.data && res.data.length > 0) {
                    this.grades = res.data
                    this.gradeValue = this.grades[0].id
                    this.btnAdd = true
                }

                this.knowData = []
                this.tplKnowData = []
            })
        },

        //  查询知识点
        _getKnowPoint(param) {
            this.emptyTextTreeKnow = '正在加载中...'
            this.knowData = []
            this.tplKnowData = []
            getKnowPoint(param).then((res) => {
                if (res.code === ERR_OK) {
                    if (res.data.length === 0) {
                        this.emptyTextTreeKnow = '暂无数据'
                    }
                    this.tplKnowData = res.data
                    this.knowData = this.$data2tree(res.data, 'id', 'parentPointId')
                }
            })
        },

        //  添加一级知识点
        _addKnowPointRoot(param) {
            addKnowPointRoot(param).then((res) => {
                if (res.data && res.data === 'success') {
                    this.$notify({
                        title: '成功',
                        message: '操作成功！',
                        type: 'success'
                    });
                } else if (res.data && res.data === 'failure') {
                    this.$notify({
                        title: '成功',
                        message: '操作成功！部分未新增成功的数据，是因为在本单位父级或子级单位中已存在！',
                        type: 'info'
                    });
                } else {
                    this.$notify({
                        title: '失败',
                        message: '操作失败！',
                        type: 'error'
                    })   
                }
                // this.loading = false
                this.isvisible = false
                this._getKnowPoint({
                    grade: this.gradeValue,
                    unitId: this.tplId
                });
                // this.newNodeForm.checkList = [];
            })
        },

        //  获取课程
        _getClass(param) {
            getClass(param).then((res) => {
                if (res.code === ERR_OK) {
                    let nowPoint = []
                    this.tplKnowData.forEach((val, index) => {
                        if (!val.parentPointId) {
                            nowPoint.push(val.name)
                        }
                    })
                    res.data.forEach((val, index) => {
                        if (nowPoint.indexOf(val.courseName) == -1) {
                            this.checkKnowList.push(val)
                        }
                    })
                    if (this.checkKnowList.length === 0) {
                        this.$notify({
                            title: '提示',
                            message: '暂无数据',
                            type: 'info'
                        })
                    } else {
                        this.isvisible = true
                    }
                }
            })
        },

        //  获取课程相关操作
        _getClassAbout(param) {
            if (this.gradeValue && this.gradeValue.length > 0 && this.tplId && this.tplId.length > 0) {
                this._getClass({
                    grade: this.gradeValue,
                    unitId: this.tplId
                })
            }
        },

        //  指定单位下批量增加知识点
        _addPoint(param) {
            this.loading = true
            addPoint(param).then((res) => {
                if (res.code === ERR_OK) {
                    this.$notify({
                        title: '成功',
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.loading = false
                    this.addPointShow = false
                    this._getKnowPoint({
                        grade: this.gradeValue,
                        unitId: this.tplId
                    })
                } else {
                    this.$notify({
                        title: '失败',
                        message: '操作失败！',
                        type: 'error'
                    })
                    this.loading = false
                }
            })
        },

        //  根据id查询知识点
        _getPointById(param) {
            getPointById(param).then((res) => {
                if (res.code === ERR_OK) {
                    this.formEdit.name = res.data.name
                    this.isvisibleEdit = true
                }
            })
        },

        //  编辑知识点
        _editPoint(param) {
            this.loading = true
            editPoint(param).then((res) => {
                if (res.code === ERR_OK) {
                    this.$notify({
                        title: '成功',
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.loading = false
                    this.isvisibleEdit = false
                    this._getKnowPoint({
                        grade: this.gradeValue,
                        unitId: this.tplId
                    })
                } else {
                    this.$notify({
                        title: '失败',
                        message: '操作失败！',
                        type: 'error'
                    });
                    this.loading = false
                }
            })
        },

        //  删除知识点
        _delPoint(param) {
            delPoint(param).then((res) => {
                if (res.code === ERR_OK) {
                    this.$notify({
                        title: '成功',
                        message: '操作成功！',
                        type: 'success'
                    });
                    this._getKnowPoint({
                        grade: this.gradeValue,
                        unitId: this.tplId
                    })
                } else {
                    this.$notify({
                        title: '失败',
                        message: '操作失败！',
                        type: 'error'
                    });
                }
            })
        },

        //  整理数据
        _normalize(item) {
            let tpl = []
            item.forEach((val, index) => {
                tpl.push(new Periods({
                    id: val.id,
                    name: val.name
                }))
            })
            return tpl
        },

        //  初始化数据
        _init() {
            getUnitTree().then((res) => {
                if (res.code === ERR_OK) {
                    if (res.data.length === 0) {
                        this.emptyTextTree = '暂无数据'
                    }
                    if (res.data[0].unitType) {
                        this.selectUnitName = res.data[0].name;
                        this.defaultKey = res.data[0].id
                        this.defaultKeys.push(res.data[0].id)
                        this.tplId = res.data[0].id
                        getPeriod({
                            unitId: this.tplId
                        }).then((resPeriod) => {
                            if (resPeriod.data.length === 0) {
                                this.emptyTextTreeKnow = '暂无数据'
                            }
                            if (resPeriod.code === ERR_OK && resPeriod.data && resPeriod.data.length > 0) {
                                this.periods = resPeriod.data
                                this.periodValue = this.periods[0].id
                            }
                        })
                    } else {
                        this.selPeriods = false
                        this.selGrade = false
                        this.btnAdd = true
                        this.defaultKeys.push(res.data[0].parentId)
                        this.defaultKey = res.data[0].id
                        let _parent = _.find(res.data, {
                            id: res.data[0].parentId
                        });
                        this.selectUnitName = ((_parent ? _parent.name : '') + ' ' + res.data[0].name);
                        this.tplId = res.data[0].parentId
                        this.gradeValue = res.data[0].id
                    }
                    this.dataList = res.data;
                    this.data = this.$data2tree(res.data, 'domId', 'domPid')
                }
            })
        }
    }
}
</script>
<style scoped>
.sy-sel-about {
    overflow: hidden;
}


.sy-period,
.sy-grade {
    float: left;
}

.sy-grade {
    padding-left: 10px;
}

.sy-button-add {
    display: inline-block;
    right: 10px;
    position: absolute;
    top: 5px;
}

.sy-div-selAddNum {
    margin-top: 20px;
    padding: 0 8px;
}

.sy-div-selAddNum .sy-div-selOptions {
    height: 40px;
    line-height: 40px;
    border: 1px solid #eee;
}

.sy-div-selAddNum .sy-div-selOptions:nth-child(1) {
    border-bottom: none;
}

.sy-div-addPointAppend {
    padding: 0 8px;
    margin-top: 10px;
}
</style>
