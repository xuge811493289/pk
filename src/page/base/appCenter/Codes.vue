<template>
    <div class="app-container-box">
        <sy-grad-4>
            <div slot="headerRight" style="line-height:40px;">
                <el-select v-model="value" placeholder="请选择服务" @change="hanleChangeServer">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="controllerValue" placeholder="请选择controller" @change="hanleChangeController">
                    <el-option
                    v-for="item in controllerOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="" size="small" @click="add" style="float:right;margin-top:5px;">新增</el-button>
            </div>
            <div slot="bodyRight" style="padding:10px;height: 100%;">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    border
                    stripe
                    tooltip-effect="dark"
                    v-loading="loading"
                    element-loading-text="拼命加载中..."
                    height="100%"
                    style="width:100%;height: 100%;">
                    <el-table-column
                        prop="serviceId"
                        label="服务id">
                    </el-table-column>
                    <el-table-column 
                        prop="name"
                        label="名称">
                    </el-table-column>
                    <el-table-column 
                        prop="code"
                        label="权限码">
                    </el-table-column>
                    <el-table-column 
                        prop="method"
                        width="100"
                        label="请求方式">
                    </el-table-column>
                    <el-table-column 
                        prop="path"
                        label="URL">
                    </el-table-column>
                    <el-table-column 
                        prop="controller"
                        label="controller">
                    </el-table-column>
                    <el-table-column 
                        prop="memo"
                        label="描述">
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template scope="scope">
                            <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                            <el-button size="small" type="danger" @click="handleRemove(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="right">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="params.start"
                    :page-size="params.size"
                    class="pagination-mf"
                    layout="total, prev, pager, next"
                    :total="toatal">
                </el-pagination>
            </div>
        </sy-grad-4>
        <sy-dialog
            title="新增"
            :close-on-click-modal="false"
            position="middle"
            height="auto"
            width="450px"
            slide="fade"
            :visible.sync="addDialog">
            <div slot="body" style="padding:10px 20px 10px 0;">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="服务id：" prop="serviceId">
                        <el-select v-model="ruleForm.serviceId" placeholder="请选择" style="width:100%;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="名称：" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="权限码：" prop="code">
                        <el-input v-model="ruleForm.code"></el-input>
                    </el-form-item>
                    <el-form-item label="请求方式：" prop="method">
                        <el-radio-group v-model="ruleForm.method" size="small">
                            <el-radio-button label="GET"></el-radio-button>
                            <el-radio-button label="POST"></el-radio-button>
                            <el-radio-button label="PUT"></el-radio-button>
                            <el-radio-button label="DELETE"></el-radio-button>
                        </el-radio-group>
                        <!-- <el-input v-model="ruleForm.methd"></el-input> -->
                    </el-form-item>
                    <el-form-item label="URL：" prop="path">
                        <el-input v-model="ruleForm.path"></el-input>
                    </el-form-item>
                    <el-form-item label="controller：" prop="controller">
                        <el-input v-model="ruleForm.controller"></el-input>
                    </el-form-item>
                    <el-form-item label="描述：" prop="memo">
                        <el-input v-model="ruleForm.memo"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button type="" @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
            </div>
        </sy-dialog>
        <sy-dialog
            title="编辑"
            :close-on-click-modal="false"
            position="middle"
            height="auto"
            width="450px"
            slide="fade"
            :visible.sync="editDialog">
            <div slot="body" style="padding:10px 15px;">
                <el-form :model="editForm" :rules="rules" ref="editForm" label-width="85px" class="demo-ruleForm">
                    <el-form-item label="服务id：" prop="serviceId">
                        <el-select v-model="editForm.serviceId" placeholder="请选择" style="width:100%;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="名称：" prop="name">
                        <el-input v-model="editForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="权限码：" prop="code">
                        <el-input v-model="editForm.code"></el-input>
                    </el-form-item>
                    <el-form-item label="请求方式：" prop="method">
                        <el-radio-group v-model="editForm.method" size="small">
                            <el-radio-button label="GET"></el-radio-button>
                            <el-radio-button label="POST"></el-radio-button>
                            <el-radio-button label="PUT"></el-radio-button>
                            <el-radio-button label="DELETE"></el-radio-button>
                        </el-radio-group>
                        <!-- <el-input v-model="ruleForm.methd"></el-input> -->
                    </el-form-item>
                    <el-form-item label="URL：" prop="path">
                        <el-input v-model="editForm.path"></el-input>
                    </el-form-item>
                    <el-form-item label="controller：" prop="controller">
                        <el-input v-model="editForm.controller"></el-input>
                    </el-form-item>
                    <el-form-item label="描述：" prop="memo">
                        <el-input v-model="editForm.memo"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button type="" @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="edit('editForm')">确 定</el-button>
            </div>
        </sy-dialog>
    </div>
</template>

<script>
import {getServerList,
        getCodeListBy,
        updataCode,
        deleteCode,
        checkCode,
        getSearchController,
        getCodeById,
        saveCode} from './request.js';
export default {
    name: 'api',
    data(){
        let checkCodes = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('操作码不能为空'));
            } else {
                checkCode({
                    newCode: value,
                    oldCode: this.oldCode,
                    flag: this.flag
                }).then((data) => {
                    if (data.data) {
                        callback()
                    } else {
                        callback(new Error('操作码已存在！'))
                    }
                })
            }
        };
        return {
            loading: false,
            oldCode: '',
            flag: false,
            tableData: [],
            value: '',
            controllerValue: '',
            toatal: 0,
            options: [],
            controllerOptions: [],
            addDialog: false,
            editDialog: false,
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            ruleForm: {
                name: '',
                code: '',
                method: '',
                path: '',
                controller: '',
                serviceId: '',
                memo: ''
            },
            editForm: {
                id: '',
                name: '',
                code: '',
                method: '',
                path: '',
                controller: '',
                serviceId: '',
                memo: ''
            },
            rules: {
                serviceId: [
                    { required: true, message: '请输入服务id', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                path: [
                    { required: true, message: '请输入URL', trigger: 'blur' }
                ],
                code: [
                    { required: true, validator: checkCodes,  trigger: 'blur' }
                ],
                controller: [
                    { required: true, min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
                ],
                method: [
                    { required: true, message: '请选择请求方式', trigger: 'change' }
                ],
            },
            params: {
                size: 30,
                start: 1,
                serviceId: '',
                controller: ''
            }
        }
    },
    created(){
        this.$parent.$emit('currentPage','/base/codes');
        this.getServerList();
    },
    methods:{
        getServerList(){
            this.options = [];
            getServerList().then((data)=>{
                let arr = [];
                if(data && data.code === 'ok'){
                    data.data.forEach((_d,i)=>{
                        arr.push({
                            label: _d.name,
                            value: _d.id
                        })
                    })
                    this.value = data.data[0].id;
                    this.params.serviceId = data.data[0].id;
                    this.options = arr;
                    this.getSearchController();
                }else{
                }
            })
        },
        getSearchController(){
            getSearchController(this.params.serviceId).then((data)=>{
                let sarr = [];
                if(data && data.code === 'ok' && data.data.length>0){
                    data.data.forEach((_d,i)=>{
                        sarr.push({
                            label: _d,
                            value: _d
                        })
                    })
                    this.controllerValue = data.data[0];
                    this.params.controller = data.data[0];
                    this.controllerOptions = sarr;
                    this.getCodeListBy();
                }else{
                    this.controllerValue = '';
                    this.controllerOptions = [];
                }
            })
        },
        getCodeListBy(){
            this.tableData = [];
            getCodeListBy(this.params).then((data)=>{
                if(data && data.code === 'ok'){
                    this.tableData = data.data.list;
                    this.toatal = data.data.toatal;
                }else{
                    this.tableData = [];
                }
            })
        },
        // 切换分页
        handleCurrentChange(val) {
            this.params.start = val;
            this.getCodeListBy();
        },
        hanleChangeServer(val){
            this.params.serviceId = val;
            this.getSearchController();
            this.getCodeListBy();
        },
        hanleChangeController(val){
            this.params.controller = val;
            this.getCodeListBy();
        },
        add(){
            this.flag = false;
            this.$refs.ruleForm.resetFields();
            this.ruleForm.serviceId = this.value;
            this.addDialog = true;
        },
        submit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    saveCode(this.ruleForm).then((data)=>{
                        if(data && data.code === 'ok' && data.data === 'success'){
                            this.$notify({
                                title: '成功',
                                message: '新增成功！',
                                type: 'success'
                            });
                            this.getCodeListBy();
                            this.addDialog = false;
                        }else{
                            this.$notify.error({
                                title: '失败',
                                message: data.data
                            });
                            this.addDialog = false;
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        handleEdit(index,row){
            this.flag = true;
            getCodeById(row.id).then((data)=>{
                if(data && data.code === 'ok' && data.data){
                    this.editForm.id = data.data.id;
                    this.editForm.name = data.data.name;
                    this.editForm.memo = data.data.memo;
                    this.oldCode = data.data.code;
                    this.editForm.path  = data.data.path ;
                    this.editForm.method  = data.data.method ;
                    this.editForm.code = data.data.code;
                    this.editForm.serviceId = data.data.serviceId;
                    this.editForm.controller = data.data.controller;
                    this.editDialog = true;
                    this.flag = true;
                }else{
                    this.$notify.error({
                        title: '失败',
                        message: '根据id查询失败'
                    });
                    this.editDialog = false;
                }
            })
        },
        edit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    updataCode(this.editForm).then((data)=>{
                        if(data && data.code === 'ok' && data.data === 'success'){
                            this.$notify({
                                title: '成功',
                                message: '编辑成功！',
                                type: 'success'
                            });
                            this.getCodeListBy();
                            this.editDialog = false;
                        }else{
                            this.$notify.error({
                                title: '失败',
                                message: data.data
                            });
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        handleRemove(index,row){
            this.$confirm('您确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteInsideRc(row.id).then((data)=>{
                    if(data && data.code === 'ok' && data.data === 'success'){
                        this.$notify({
                            title: '成功',
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.getCodeListBy();
                    }else{
                        this.$notify.error({
                            title: '失败',
                            message: data.data
                        });
                    }
                })
            }).catch(() => {

            });
        }
    }
}
</script>

<style scoped>

</style>

