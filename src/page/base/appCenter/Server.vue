<template>
    <div class="app-container-box">
        <sy-grad-4>
            <div slot="headerRight" style="line-height:40px;" class="right">
                <el-button type="" size="small" @click="add">新增</el-button>
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
                        prop="id"
                        label="服务id">
                    </el-table-column>
                    <el-table-column 
                        prop="name"
                        label="服务名称">
                    </el-table-column>
                    <el-table-column 
                        prop="memo"
                        label="服务描述">
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template scope="scope">
                            <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                            <el-button size="small" type="danger" @click="handleRemove(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
            <div slot="body" style="padding:10px 15px;">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm">
                    <el-form-item label="服务id：" prop="id">
                        <el-input v-model="ruleForm.id"></el-input>
                    </el-form-item>
                    <el-form-item label="服务名称：" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="服务描述：" prop="memo">
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
                    <el-form-item label="服务id：" prop="id">
                        <el-input v-model="editForm.id"></el-input>
                    </el-form-item>
                    <el-form-item label="资源名称：" prop="name">
                        <el-input v-model="editForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="资源描述：" prop="memo">
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
        saveServer,
        checkedServerId,
        updateServer,
        deleteServer,
        getServer} from './request.js';
export default {
    name: 'api',
    data(){
        let checkId = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('服务id不能为空'));
            } else {
                checkedServerId({
                    newId: value,
                    oldId: this.oldServerId,
                    flag: this.flag
                }).then((data) => {
                    if (data.data) {
                        callback()
                    } else {
                        callback(new Error('服务id已存在！'))
                    }
                })
            }
        };
        return {
            loading: false,
            tableData: [],
            addDialog: false,
            editDialog: false,
            flag: false,
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            oldServerId: '',
            ruleForm: {
                id: '',
                name: '',
                memo: ''
            },
            editForm: {
                id: '',
                name: '',
                memo: '',
                serviceId: ''
            },
            rules: {
                id: [
                    { required: true, validator: checkId, trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入服务名称', trigger: 'blur' }
                ],
                memo: [
                    { required: true,min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        this.$parent.$emit('currentPage','/base/server');
        this.getServerList();
    },
    methods:{
        getServerList(){
            getServerList().then((data)=>{
                if(data && data.code === 'ok'){
                    this.tableData = data.data;
                }else{
                    this.tableData = [];
                }
            })
        },
        add(){
            this.flag = false;
            this.oldServerId = '';
            this.$refs.ruleForm.resetFields();
            this.addDialog = true;
        },
        submit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    saveServer(this.ruleForm).then((data)=>{
                        if(data && data.code === 'ok' && data.data === 'success'){
                            this.$notify({
                                title: '成功',
                                message: '新增成功！',
                                type: 'success'
                            });
                            this.getServerList();
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
            getServer(row.id).then((data)=>{
                if(data && data.code === 'ok' && data.data){
                    this.editForm.id = data.data.id;
                    this.editForm.name = data.data.name;
                    this.editForm.memo = data.data.memo;
                    this.oldServerId = data.data.id;
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
                    this.editForm.serviceId = this.oldServerId;
                    updateServer(this.editForm).then((data)=>{
                        if(data && data.code === 'ok' && data.data === 'success'){
                            this.$notify({
                                title: '成功',
                                message: '编辑成功！',
                                type: 'success'
                            });
                            this.getServerList();
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
                deleteServer(row.id).then((data)=>{
                    if(data && data.code === 'ok' && data.data === 'success'){
                        this.$notify({
                            title: '成功',
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.getServerList();
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

