<template>
    <div class="app-container-box">
        <div class="sy-up">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="应用模块:">
                    <el-select v-model="form.module" placeholder="请选择应用模块" @change="selecDesk" size="small">
                        <el-option v-for="item in moduleSel" :key="item.code" :label="item.name" :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="sy-down">
            <el-tree :empty-text="emptyText" class="resTree" v-if="state" :data="options" highlight-current node-key="id" border="false"
                style="border:none" :current-node-key="defaultKey" :default-expanded-keys="defaultKeys" :render-content="renderContent"
                :props="defaultProps">
            </el-tree>
        </div>
        <sy-dialog title="添加外部资源" :fullscreen="false" position="middle" height="auto" slide="fade" width="330px" :visible.sync="isvisible">
            <div slot="body" style="padding:10px 20px 10px 0px">
                <el-form :model="outResForm" :rules="outResRules" ref="outResForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="资源名称：" prop="name">
                        <el-input size="small" v-model="outResForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="资源URL：" prop="indexUrl">
                        <el-input size="small" v-model="outResForm.indexUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="打开窗口方式：" prop="opener">
                        <el-radio-group v-model="outResForm.opener">
                            <el-radio label="0">当前窗口</el-radio>
                            <el-radio label="1">新窗口</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="序号：" prop="sort">
                        <el-input size="small" v-model.number="outResForm.sort"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" style="padding-right:1px">
                <el-button size="small" style="" @click="isvisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click=" submitForm('outResForm')" :loading="loading">确 定</el-button>
            </div>
        </sy-dialog>
        <sy-dialog title="修改" :fullscreen="false" position="middle" height="auto" slide="fade" width="400px" :visible.sync="isvisibleEdit">
            <div slot="body" style="padding:10px 20px 10px 0px">
                <el-form :model="editResForm" :rules="editResRules" ref="editResForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="资源名称：" prop="name">
                        <el-input v-model="editResForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="资源URL：" prop="indexUrl">
                        <el-input v-model="editResForm.indexUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="打开窗口方式：" prop="opener" style="padding-left: 28px">
                        <el-radio-group v-model="editResForm.opener">
                            <el-radio label="0">当前窗口</el-radio>
                            <el-radio label="1">新窗口</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="序号：" prop="sort">
                        <el-input v-model.number="editResForm.sort"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button size="small" style="" @click="isvisibleEdit = false">取 消</el-button>
                <el-button size="small" type="primary" :loading="loading" @click=" submitForm('editResForm')">确 定</el-button>
            </div>
        </sy-dialog>
    </div>
</template>

<script>
    import _ from 'lodash';
    import {
        getAppModule,
        ERR_OK,
        getResTree,
        addRes,
        editRes,
        delRes,
        checkAdd,
        checkEdit,
        getResById
    } from './request';
    import config from './config.js';
    import pager from '../../config.js';
    import { getRcCodeList } from '../../request'

    export default {
        name: '',
        components: {

        },
        data() {
            var numRange = (rule, value, callback) => {
                if (value > 9999 || value < 0) {
                    callback(new Error('序号范围应在0-9999之间！'))
                } else {
                    callback()
                }
            }
            var web = (rule, value, callback) => {
                var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
                if (!reg.test(value)) {
                    callback(new Error('URL格式不正确！'));
                } else {
                    callback();
                }
            }
            var addCheck = (rule, value, callback) => {
                checkAdd({
                    name: value,
                    parentId: this.tplId
                }).then((res) => {
                    if (res.code === ERR_OK) {
                        if (!res.data) {
                            callback(new Error('资源名称不能重复！'))
                        } else {
                            callback()
                        }
                    }
                })
            }
            var editCheck = (rule, value, callback) => {
                checkEdit({
                    name: value,
                    parentId: this.tplPid,
                    id: this.tplEditId
                }).then((res) => {
                    if (res.code === ERR_OK) {
                        if (!res.data) {
                            callback(new Error('资源名称不能重复！'))
                        } else {
                            callback()
                        }
                    }
                })
            }
            return {
                loading: false,
                emptyText: '正在加载中...',
                codeList: {
                    btn_base_resource_manager_add: false, //添加外部资源
                    btn_base_resource_manager_update: false, //修改资源
                    btn_base_resource_manager_delete: false, //删除资源
                },
                btn_base_resource_manager_add: false,
                isTrue: false,
                state: '',
                defaultKey: '',
                defaultKeys: [],
                options: [],
                defaultProps: config.defaultProps,
                isvisible: false,
                resStore: {},
                tplCode: '',
                isvisibleEdit: false,
                editData: {},
                moduleSel: [],
                tplId: '',
                tplPid: '',
                tplEditId: '',
                form: {
                    module: ''
                },
                outResForm: {
                    name: '',
                    indexUrl: '',
                    opener: '1',
                    sort: '',
                },
                editResForm: {
                    name: '',
                    indexUrl: '',
                    opener: '',
                    sort: '',
                },
                editResRules: {
                    name: [
                        { required: true, message: '资源名称不能为空！', trigger: 'blur' },
                        { validator: editCheck, trigger: 'blur' }
                    ],
                    indexUrl: [
                        { required: true, message: '资源URL不能为空！', trigger: 'blur' },
                        { validator: web, trigger: 'blur' }
                    ],
                    opener: [
                        { required: true, message: '请选择打开方式！', trigger: 'change' }
                    ],
                    sort: [
                        { required: true, message: '序号不能为空！' },
                        { type: 'number', message: '序号只能输入数字！' },
                        { validator: numRange, trigger: 'blur' }
                    ]
                },
                outResRules: {
                    name: [
                        { required: true, message: '资源名称不能为空！', trigger: 'blur' },
                        { validator: addCheck, trigger: 'blur' }
                    ],
                    indexUrl: [
                        { required: true, message: '资源URL不能为空！', trigger: 'blur' },
                        { validator: web, trigger: 'blur' }
                    ],
                    opener: [
                        { required: true, message: '请选择打开方式！', trigger: 'change' }
                    ],
                    sort: [
                        { required: true, message: '序号不能为空！' },
                        { type: 'number', message: '序号只能输入数字！' },
                        { validator: numRange, trigger: 'blur' }
                    ]
                },

            }
        },
        beforeCreate() {

        },
        created() {
            this.$parent.$emit('currentPage', '/base/resAuth');
            getRcCodeList('category_base_resource_manager', this.codeList).then(() => {
                this._init()
            })
        },
        methods: {
            //  选择模块
            selecDesk(val) {
                if (this.form.module !== '') {
                    this.emptyText = '正在加载中...'
                    this.tplCode = val
                    this._getResTree({
                        code: val
                    })
                }
            },

            //  渲染资源树
            renderContent(h, { node, data, store }) {
                if (data.resourceType === 1 || data.resourceType === 2) {
                    if (!data.inside) {
                        return h('span', {
                            attrs: {
                                class: 'sy-span-resAuth'
                            }
                        }, [
                                h('span', node.label),
                                h('span', {
                                    attrs: {
                                        class: "sy-span-resBtn",
                                        style: "margin-left:60px"
                                    }
                                }, [
                                        h('i', {
                                            attrs: {
                                                class: "fa fa-plus",
                                                style: `font-size:12px;color:#7DCA96;display:${this.codeList['btn_base_resource_manager_add'] ? 'inlin-block' : 'none'}`,
                                                title: "新增",
                                                "aria-hidden": true,
                                            }, on: {
                                                click: (e) => {
                                                    e.stopPropagation();
                                                    this.$refs.outResForm.resetFields()
                                                    this.isvisible = true;
                                                    this.tplId = data.id
                                                }
                                            }
                                        }),
                                        h('i', {
                                            attrs: {
                                                class: "fa fa-pencil-square-o",
                                                style: `font-size:12px;color:#75D0E2;margin-left:15px;display:${this.codeList['btn_base_resource_manager_update'] ? 'inlin-block' : 'none'}`,
                                                title: "编辑",
                                                "aria-hidden": true
                                            }, on: {
                                                click: (e) => {
                                                    e.stopPropagation();
                                                    this.$refs.editResForm.resetFields()
                                                    this.tplPid = data.parentId
                                                    this.tplEditId = data.id
                                                    if (this.tplEditId !== '') {
                                                        this._getResById({
                                                            id: this.tplEditId
                                                        })
                                                    }
                                                }
                                            }
                                        }),
                                        h('i', {
                                            attrs: {
                                                class: "fa fa-times",
                                                style: `font-size:14px;color:#75D0E2;margin-left:15px;color:red;display:${this.codeList['btn_base_resource_manager_delete'] ? 'inlin-block' : 'none'}`,
                                                title: "删除",
                                                "aria-hidden": true
                                            }, on: {
                                                click: (e) => {
                                                    e.stopPropagation();
                                                    this.$confirm('您确定要删除么？, 是否继续?', '提示', {
                                                        confirmButtonText: '确定',
                                                        cancelButtonText: '取消',
                                                        type: 'warning'
                                                    }).then(() => {
                                                        this._delRes({
                                                            code: this.tplCode,
                                                            id: data.id
                                                        })
                                                    })
                                                }
                                            }
                                        })
                                    ])
                            ]);
                    } else {
                        return h('span', {
                            attrs: {
                                class: 'sy-span-resAuth'
                            }
                        }, [
                                h('span', node.label),
                                h('span', {
                                    attrs: {
                                        class: "sy-span-resBtn",
                                        style: "margin-left:60px"
                                    }
                                }, [
                                        h('i', {
                                            attrs: {
                                                class: "fa fa-plus",
                                                style: `font-size:12px;color:#7DCA96;display:${this.codeList['btn_base_resource_manager_add'] ? 'inlin-block' : 'none'}`,
                                                title: "新增",
                                                "aria-hidden": true,
                                            }, on: {
                                                click: (e) => {
                                                    e.stopPropagation();
                                                    this.$refs.outResForm.resetFields()
                                                    this.isvisible = true;
                                                    this.tplId = data.id
                                                }
                                            }
                                        })
                                    ])
                            ]);
                    }
                } else {
                    if (!data.inside) {
                        return h('span', {
                            attrs: {
                                class: 'sy-span-resAuth'
                            }
                        }, [
                                h('span', node.label),
                                h('span', {
                                    attrs: {
                                        class: "sy-span-resBtn",
                                        style: "margin-left:60px"
                                    }
                                }, [
                                        h('i', {
                                            attrs: {
                                                class: "fa fa-pencil-square-o",
                                                style: `font-size:12px;color:#75D0E2;margin-left:15px;display:${this.codeList['btn_base_resource_manager_update'] ? 'inlin-block' : 'none'}`,
                                                title: "编辑",
                                                "aria-hidden": true
                                            }, on: {
                                                click: (e) => {
                                                    e.stopPropagation();
                                                    this.$refs.editResForm.resetFields()
                                                    this.tplPid = data.parentId
                                                    this.tplEditId = data.id
                                                    if (this.tplEditId !== '') {
                                                        this._getResById({
                                                            id: this.tplEditId
                                                        })
                                                    }
                                                }
                                            }
                                        }),
                                        h('i', {
                                            attrs: {
                                                class: "fa fa-times",
                                                style: `font-size:14px;color:#75D0E2;margin-left:15px;color:red;display:${this.codeList['btn_base_resource_manager_delete'] ? 'inlin-block' : 'none'}`,
                                                title: "删除",
                                                "aria-hidden": true
                                            }, on: {
                                                click: (e) => {
                                                    e.stopPropagation();
                                                    this.$confirm('您确定要删除么？, 是否继续?', '提示', {
                                                        confirmButtonText: '确定',
                                                        cancelButtonText: '取消',
                                                        type: 'warning'
                                                    }).then(() => {
                                                        this._delRes({
                                                            code: this.tplCode,
                                                            id: data.id
                                                        })
                                                    })
                                                }
                                            }
                                        })
                                    ])
                            ]);
                    } else {
                        return h('span', {
                            attrs: {
                                class: 'sy-span-resAuth'
                            }
                        }, [
                                h('span', node.label),
                            ]);
                    }
                }
            },

            //  提交表单操作
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (formName == 'outResForm') {
                            this._addRes({
                                parentId: this.tplId,
                                name: this.outResForm.name,
                                opener: this.outResForm.opener,
                                indexUrl: this.outResForm.indexUrl,
                                sort: this.outResForm.sort,
                                code: this.tplCode
                            })
                        } else {
                            this._editRes({
                                id: this.editResForm.id,
                                name: this.editResForm.name,
                                indexUrl: this.editResForm.indexUrl,
                                opener: this.editResForm.opener,
                                sort: this.editResForm.sort,
                                code: this.tplCode
                            })
                        }
                    }
                });
            },

            //  获取资源树
            _getResTree(param) {
                this.defaultKeys = []
                getResTree(param).then((res) => {
                    if (res.code === ERR_OK) {
                        if (res.data.length === 0) {
                            this.emptyText = '暂无数据'
                        }
                        this.options = res.data
                        this.state = true
                        if (this.tplId === '') {
                            this.defaultKey = res.data[0].id
                            this.defaultKeys.push(res.data[0].id)
                        } else {
                            this.defaultKeys.push(this.tplId)
                            this.defaultKey = this.tplId
                        }
                    }
                })
            },

            //  添加外部资源
            _addRes(param) {
                this.loading = true
                addRes(param).then((res) => {
                    if (res.code === ERR_OK) {
                        this.$notify({
                            title: '成功',
                            message: '操作成功！',
                            type: 'success'
                        })
                        this.loading = false
                        this.isvisible = false
                        this._getResTree({
                            code: param.code
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

            //  根据id获取资源
            _getResById(param) {
                getResById(param).then((res) => {
                    if (res.code === ERR_OK) {
                        res.data.opener = res.data.opener.toString();
                        this.editResForm = res.data
                        this.isvisibleEdit = true;
                    }
                })
            },

            //  编辑外部资源
            _editRes(param) {
                this.loading = true
                editRes(param).then((res) => {
                    if (res.code === ERR_OK) {
                        if (res.code === ERR_OK) {
                            this.$notify({
                                title: '成功',
                                message: '操作成功！',
                                type: 'success'
                            })
                            this.loading = false
                            this.isvisibleEdit = false
                            this._getResTree({
                                code: param.code
                            })
                        }
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

            //  删除外部资源
            _delRes(param) {
                delRes(param).then((res) => {
                    if (res.code === ERR_OK) {
                        this.$notify({
                            title: '成功',
                            message: '操作成功！',
                            type: 'success'
                        })
                        this._getResTree({
                            code: param.code
                        })
                    } else {
                        this.$notify({
                            title: '失败',
                            message: '操作失败！',
                            type: 'error'
                        })
                    }
                })
            },

            //  添加时校验
            _checkAdd(param) {
                checkAdd(param).then((res) => {
                    if (res.code === ERR_OK) {
                        if (res.data) {
                            this.isTrue = true
                        } else {
                            this.isTrue = false
                        }
                    }
                })
            },

            //  修改时校验
            _checkEdit(param) {
                checkEdit(param)
            },

            //  初始化
            _init() {
                getAppModule().then((res) => {
                    if (res.code === ERR_OK) {
                        this.moduleSel = res.data
                        this.form.module = res.data[0].code
                    }
                })
            }
        }
    }

</script>

<style scoped>

</style>