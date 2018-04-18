<template>
    <div class="app-container-box" >
        <div class="sy-up" >
            <el-button size="small" style="float: right;margin-top: 6px" @click=" clearInfo()" v-if="codeList['btn_base_properties_IPsettings_add']">新增</el-button>
        </div>
        <div class="sy-down" >
            <el-table :empty-text="emptyText" :data="tableData" border ref='tableTab' highlight-current-row style="width: 100%;">
                <el-table-column align="center" label="序号" type="index" width="70">
                </el-table-column>
                <el-table-column v-for="item in appColumn" align="center" :prop="item.prop" :key="item.prop" :width="item.width" :label="item.label">
                </el-table-column>
                <el-table-column align="left" label="描述" prop="detail">
                </el-table-column>
                <el-table-column label="操作" width="150" align="center" header-align="center">
                    <template scope="scope">
                        <i class="fa fa-pencil-square-o" style="line-height: 41px;cursor: pointer;" @click="handleEdit(scope.$index, scope.row)" aria-hidden="true" title="修改" v-if="codeList['btn_base_properties_IPsettings_update']"></i>
                        <i class="fa fa-times" style="line-height: 41px;color: red;padding-left:8px;vertical-align: 2px;cursor: pointer;" aria-hidden="true" title="删除" @click="handleDelete(scope.$index, scope.row)" v-if="codeList['btn_base_properties_IPsettings_delete']"></i>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <sy-dialog title="新增" position="middle" height="auto" slide="fade" width="400px" :visible.sync="isvisibleAdd">
            <div slot="body" style="padding: 20px 10px 5px 0px;">
                <el-form :model="newIpConfigForm" :rules="addRules" ref="newIpConfigForm" label-width="100px">
                    <el-form-item label="IP开始段：" prop="begin">
                        <el-tooltip class="item" effect="dark" content="例：192.168.1.1" placement="bottom-end">
                            <el-input size="small" v-model="newIpConfigForm.begin"></el-input>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item label="IP结束段：" prop="end" style="margin-bottom: 20px;">
                        <el-tooltip class="item" effect="dark" content="例：192.168.1.1" placement="bottom-end">
                            <el-input size="small" v-model="newIpConfigForm.end"></el-input>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item label="描述：" prop="detail" style="margin-bottom: 20px;" class="sy-form-ip">
                        <el-input type="textarea" :rows="rows" v-model="newIpConfigForm.detail" resize="none"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" style="padding-right: 1px;">
                <el-button @click="isvisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('newIpConfigForm')" :loading="loading">确 定</el-button>
            </div>
        </sy-dialog>
        <sy-dialog title="修改" position="middle" height="auto" slide="fade" width="400px" :visible.sync="isvisible">
            <div slot="body" style="padding: 20px 10px 5px 0px;">
                <el-form :model="editIpConfigForm" :rules="editRules" ref="editIpConfigForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="IP开始段：" prop="begin">
                        <el-tooltip class="item" effect="dark" content="例：192.168.1.1" placement="bottom-end">
                            <el-input size="small" v-model="editIpConfigForm.begin"></el-input>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item label="IP结束段：" prop="end" style="margin-bottom: 20px;">
                        <el-tooltip class="item" effect="dark" content="例：192.168.1.1" placement="bottom-end">
                            <el-input size="small" v-model="editIpConfigForm.end"></el-input>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item label="描述：" prop="detail" style="margin-bottom: 20px;" class="sy-form-ip">
                        <el-input type="textarea" v-model="editIpConfigForm.detail" :rows="rows" resize="none"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" style="padding-right: 1px;">
                <el-button size="small" @click="isvisible = false">取 消</el-button>
                <el-button size="small" type="primary" :loading="loading" @click="submitForm('editIpConfigForm')">确 定</el-button>
            </div>
        </sy-dialog>
    </div>
</template>

<script>
import _ from 'lodash';
import config from './config.js';
import pager from '../../config.js';
import { getTableData, ERR_OK, addIpConfig, editIpConfig, delIpConfig, getIpById } from '../requestApi'
import { getRcCodeList } from '../../request'
export default {
    name: 'app',
    components: {

    },
    data() {
        //  ip格式校验
        var checkIp = (rule, value, callback) => {
            var reg = /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-4]|2[0-4]\d|((1\d{2})|[1-9]\d|[1-9])))$/;
            if (reg.test(value)) {
                callback();
            } else {
                callback(new Error('请输入有效的IP！'));
            }
        }
        //  添加时ip结束段不可与开始相同校验
        var checkipEndAdd = (rule, value, callback) => {
            if (value === this.newIpConfigForm.begin) {
                callback(new Error('请输入有效的IP！'))
            } else {
                callback()
            }
        };
        //  编辑时ip结束段不可与开始段相同校验
        var checkipEndEdit = (rule, value, callback) => {
            if (value === this.editIpConfigForm.begin) {
                callback(new Error('请输入有效的IP！'))
            } else {
                callback()
            }
        };
        //  校验网段
        var checkSegmentAdd = (rule, value, callback) => {
            if (!this.newIpConfigForm.begin) {
                callback()
            } else {
                let checkArr = []
                let end = value.split('.')
                let begin = this.newIpConfigForm.begin.split('.')
                for (let i = 0; i < 3; i++) {
                    if (begin[i] == end[i]) {
                        checkArr.push(begin[i])
                    }
                }
                if (checkArr.length !== 3) {
                    callback(new Error('请输入有效的IP！'))
                } else {
                    callback()
                }
            }
        }
        //  编辑时校验网段
        var checkSegmentEdit = (rule, value, callback) => {
            if (!this.newIpConfigForm.begin) {
                callback()
            } else {
                let checkArr = []
                let end = value.split('.')
                let begin = this.editIpConfigForm.begin.split('.')
                for (let i = 0; i < 3; i++) {
                    if (begin[i] == end[i]) {
                        checkArr.push(begin[i])
                    }
                }
                if (checkArr.length !== 3) {
                    callback(new Error('请输入有效的IP！'))
                } else {
                    callback()
                }
            }
        }
        //  添加时开始段不可大于结束段校验
        var checkAdd = (rule, value, callback) => {
            if (!this.newIpConfigForm.begin) {
                callback()
            } else {
                let end = value.split('.')
                let begin = this.newIpConfigForm.begin.split('.')
                let checkArr = []
                for (let i = 0; i < 4; i++) {
                    if (parseInt(begin[i]) <= parseInt(end[i])) {
                        checkArr.push(begin[i])
                    }
                }
                if (checkArr.length < 4) {
                    callback(new Error('请输入有效的IP！'))
                } else {
                    callback()
                }
            }
        }
        //  编辑时开始段不可小于结束段校验
        var checkEdit = (rule, value, callback) => {
            if (!this.editIpConfigForm.begin) {
                callback()
            } else {
                let end = value.split('.')
                let begin = this.editIpConfigForm.begin.split('.')
                let checkArr = []
                for (let i = 0; i < 4; i++) {
                    if (parseInt(begin[i]) <= parseInt(end[i])) {
                        checkArr.push(begin[i])
                    }
                }
                if (checkArr.length < 4) {
                    callback(new Error('请输入有效的IP！'))
                } else {
                    callback()
                }
            }
        }
        //  长度不过50校验
        var checkLength = (rule, value, callback) => {
            if (!value) {
                callback()
            } else {
                if (value.length > 50) {
                    callback(new Error('不可超过50个字符'))
                } else {
                    callback()
                }
            }

        }
        return {
            emptyText: '正在加载中...',
            loading: false,
            tplId: '',
            rows: 4,
            tableData: [],
            appColumn: config.options,
            isvisible: false,
            isvisibleAdd: false,
            newIpConfigForm: {
                begin: '',
                end: '',
                detail: ''
            },
            editIpConfigForm: {
                begin: '',
                end: '',
                detail: ''
            },
            addRules: {
                begin: [
                    { required: true, message: 'IP段开始IP不能为空！', trigger: 'blur' },
                    { validator: checkIp, trigger: 'blur' }
                ],
                end: [
                    { required: true, message: 'IP段结束IP不能为空！', trigger: 'blur' },
                    { validator: checkIp, trigger: 'blur' },
                    { validator: checkipEndAdd, trigger: 'blur' },
                    { validator: checkAdd, trigger: 'blur' },
                    { validator: checkSegmentAdd, trigger: 'blur' }
                ],
                detail: [
                    { validator: checkLength, trigger: 'blur' }
                ]
            },
            editRules: {
                begin: [
                    { required: true, message: 'IP段开始IP不能为空！', trigger: 'blur' },
                    { validator: checkIp, trigger: 'blur' }
                ],
                end: [
                    { required: true, message: 'IP段结束IP不能为空！', trigger: 'blur' },
                    { validator: checkIp, trigger: 'blur' },
                    { validator: checkipEndEdit, trigger: 'blur' },
                    { validator: checkEdit, trigger: 'blur' },
                    { validator: checkSegmentEdit, trigger: 'blur' }
                ],
                detail: [
                    { validator: checkLength, trigger: 'blur' }
                ]
            },
            obj: {
                color: '#f00'
            },
            codeList: {
                btn_base_properties_IPsettings_add: false, //  新增
                btn_base_properties_IPsettings_update: false, //  修改
                btn_base_properties_IPsettings_delete: false, //  删除
            }
        }
    },
    beforeCreate() {

    },
    created() {
        getRcCodeList('category_base_properties_IPsettings', this.codeList).then(() => {
            this._getTableData();
        })
        this.$parent.$emit('currentPage', '/base/iiconfig');
    },
    methods: {
        //  增加按钮操作
        clearInfo() {
            this.$refs.newIpConfigForm.resetFields()
            setTimeout(() => {
                this.isvisibleAdd = true
            }, 100);

        },

        //  提交表单操作
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true
                    if (formName === 'newIpConfigForm') {
                        this._addIpConfig(this.newIpConfigForm)
                    }
                    if (formName === 'editIpConfigForm') {
                        this._editIpConfig({
                            id: this.tplId,
                            begin: this.editIpConfigForm.begin,
                            end: this.editIpConfigForm.end,
                            detail: this.editIpConfigForm.detail
                        })
                    }
                }
            });
        },

        //  编辑按钮操作
        handleEdit(index, row) {
            this.$refs.editIpConfigForm.resetFields()
            this.tplId = row.id
            if (row.id !== '') {
                this._getIpById({
                    id: row.id
                })
            }
        },

        //  删除数据
        handleDelete(index, row) {
            this.$confirm('您确定要删除吗？, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (row.id !== '') {
                    this._delIpConfig({
                        id: row.id
                    })
                }
            }).catch(() => {
            });
        },

        //  获取ip数据
        _getTableData() {
            getTableData().then((res) => {
                if (res.code === ERR_OK) {
                    if (res.data.length === 0) {
                        this.emptyText = '暂无数据'
                    }
                    this.tableData = res.data
                }
            })
        },

        //  增加ip段
        _addIpConfig(param) {
            addIpConfig(param).then((res) => {
                if (res.code === ERR_OK) {
                    this.$notify({
                        title: '提示',
                        message: '操作成功！',
                        type: 'success'
                    })
                    this.isvisibleAdd = false
                    this.loading = false
                    this._getTableData()
                } else {
                    this.$notify({
                        title: '提示',
                        message: '操作失败！',
                        type: 'error'
                    })
                }
            })
        },

        //  编辑ip段
        _editIpConfig(param) {
            editIpConfig(param).then((res) => {
                if (res.code === ERR_OK) {
                    this.$notify({
                        title: '提示',
                        message: '操作成功！',
                        type: 'success'
                    })
                    this.isvisible = false
                    this.loading = false
                    this._getTableData()
                } else {
                    this.$notify({
                        title: '提示',
                        message: '操作失败！',
                        type: 'error'
                    })
                }
            });
        },

        //  删除ip段
        _delIpConfig(param) {
            delIpConfig(param).then((res) => {
                if (res.code === ERR_OK) {
                    this.$notify({
                        title: '提示',
                        message: '操作成功！',
                        type: 'success'
                    })
                    this._getTableData()
                } else {
                    this.$notify({
                        title: '提示',
                        message: '操作失败！',
                        type: 'error'
                    })
                }
            })
        },

        //  根据id查询ip
        _getIpById(param) {
            getIpById(param).then((res) => {
                if (res.code === ERR_OK) {
                    this.editIpConfigForm.begin = res.data.begin
                    this.editIpConfigForm.end = res.data.end
                    this.editIpConfigForm.detail = res.data.detail
                    this.isvisible = true
                }
            })
        }
    }
}
</script>

<style scoped>

</style>

