<template>
    <div class="app-container-box">
        <sy-grad-4 :border="false">
            <div slot="headerRight" style="line-height:40px;" class="right">
                <el-button type="" size="small" @click="add">新增</el-button>
            </div>
            <div slot="bodyRight" style="padding: 0 10px;height: 100%;">
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
                        prop="name"
                        label="资源名称">
                    </el-table-column>
                    <el-table-column 
                        prop="memo"
                        label="资源描述">
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template scope="scope">
                            <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                            <el-button size="small" type="success" @click="handleAuthority(scope.$index, scope.row)">授权</el-button>
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
            <div slot="body" style="padding:10px;">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="85px" class="demo-ruleForm">
                    <el-form-item label="资源名称：" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="资源描述：" prop="memo">
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
            <div slot="body" style="padding:10px;">
                <el-form :model="editForm" :rules="rules" ref="editForm" label-width="85px" class="demo-ruleForm">
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
        <sy-dialog
            :title="'授权('+name+')'"
            :close-on-click-modal="false"
            position="middle"
            height="500px"
            width="80%"
            slide="fade"
            :visible.sync="authDialog">
            <div slot="body">
                
                <div class="sy-api-auth-row1">
                    <div class="row1-row1">
                         <el-tree 
                            :data="authData" 
                            :props="defaultProps"
                            ref="tree"
                            show-checkbox
                            node-key="code" 
                            style="border:0"
                            :check-strictly="true"
                            highlight-current
                            :default-expand-all="false">
                        </el-tree>
                    </div>
                    <div class="row1-row2 right">
                         <el-button type="" @click="removeApiGuanxi">取消授权</el-button>
                    </div>
                </div>
                <div class="sy-api-auth-row2">
                    <h3>
                        <el-radio-group v-model="method" size="small">
                            <el-radio-button label="GET"></el-radio-button>
                            <el-radio-button label="POST"></el-radio-button>
                            <el-radio-button label="PUT"></el-radio-button>
                            <el-radio-button label="DELETE"></el-radio-button>
                        </el-radio-group>
                        <el-input
                            placeholder="请输入关键字"
                            icon="search"
                            style="marginTop: 5px;"
                            @keyup.enter.native="handleIconClick"
                            v-model="input"
                            :on-icon-click="handleIconClick">
                        </el-input>
                    </h3>
                    <div>
                        <el-card :body-style="{ padding: '0px' }" v-for="item in searchApis" :key="item.id">
                            <div style="padding: 10px;">
                                <div class="bottom clearfix">
                                    <span>{{ item.method }}</span><span style="padding: 0 0 0 10px;">{{ item.path }}</span>
                                    <el-button style="padding:5px;" type="text" class="button" @click="conectCodesApi(item)">授权</el-button>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>
            <!-- <div slot="footer">
                <el-button type="" @click="authDialog = false">取 消</el-button>
                 <el-button type="primary" @click="save">确 定</el-button> 
            </div> -->
        </sy-dialog>
    </div>
</template>

<script>

import {getApiList,
        getApiById,
        getApiChice,
        saveApiList,
        updateApi,
        giveApiAuth,
        deleteApi,
        saveMoreApiCodes,
        searchCodeBy,
        getApiConectTree,
        deleteApiConect} from './request.js';
export default {
    name: 'api',
    data(){
        return {
            loading: false,
            searchApis: [],
            method: 'GET',
            name: '',
            input: '',
            tableData: [{name: '基础',memo:'基础请求'}],
            authData: [],
            authDialog: false,
            addDialog: false,
            editDialog: false,
            oldApiId: '',
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            ruleForm: {
                name: '',
                memo: ''
            },
            editForm: {
                id: '',
                name: '',
                memo: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入资源名称', trigger: 'blur' }
                ],
                memo: [
                    { required: true, min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
                ]
            },
            params: {
                start: 1,
                size: 30
            },
            toatal: 0,
            currentApiId: ''
        }
    },
    created(){
        this.$parent.$emit('currentPage','/base/api');
        this.getApiList();
    },
    methods:{
        handleIconClick(){
            this.searchApis= [];
            if(!this.input){return};
            searchCodeBy({
                method: this.method,
                name: this.input
            }).then((data)=>{
                if(data && data.code === 'ok'){
                    this.searchApis = data.data
                }
            })
        },
        handleAuthority(index,row){
            this.name = row.name;
            this.currentApiId = row.id;
            console.log(row);
            this.authDialog = true;
            this.getAPICodeTree();
        },
        getAPICodeTree(){
            getApiConectTree(this.currentApiId).then((data)=>{
                console.log(data);
                if(data && data.code === 'ok'){
                    this.authData = data.data;
                    // this.authData = [{name:"服务",id:'asdfasdfasdfasd'}]
                }
                console.log(data);
            })
        },
        conectCodesApi(code){
            saveMoreApiCodes({
                authorityId: code.code,
                apiId: this.currentApiId
            }).then((data)=>{
                console.log(data);
                if(data && data.code === 'ok'){
                    this.$notify({
                        title: '成功',
                        message: '授权成功！',
                        type: 'success'
                    });
                    this.getAPICodeTree();
                }else{
                    this.$notify.error({
                        title: '失败',
                        message: data.data
                    });
                }
            })
        },
        removeApiGuanxi(){
            let resIds = this.$refs.tree.getCheckedKeys();
            deleteApiConect({
                apiId: this.currentApiId,
                authorityIds: resIds.join(',')
            }).then((data)=>{
                if(data && data.code === 'ok'){
                    this.$notify({
                        title: '成功',
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.getAPICodeTree();
                }else{
                    this.$notify.error({
                        title: '失败',
                        message: data.data
                    });
                }
            })
        },
        getApiList(){
            getApiList(this.params).then((data)=>{
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
            this.getApiList();
        },
        add(){
            this.$refs.ruleForm.resetFields();
            this.addDialog = true;
        },
        submit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    saveApiList(this.ruleForm).then((data)=>{
                        if(data && data.code === 'ok' && data.data === 'success'){
                            this.$notify({
                                title: '成功',
                                message: '新增成功！',
                                type: 'success'
                            });
                            this.getApiList();
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
            getApiById(row.id).then((data)=>{
                this.editForm.id = data.data.id;
                this.editForm.name = data.data.name;
                this.editForm.memo = data.data.memo;
                this.oldApiId = data.data.id;
                this.editDialog = true;
            })
        },
        edit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    updateApi(this.editForm).then((data)=>{
                        if(data && data.code === 'ok' && data.data === 'success'){
                            this.$notify({
                                title: '成功',
                                message: '编辑成功！',
                                type: 'success'
                            });
                            this.editDialog = false;
                            this.getApiList();
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
        save(){
            let resIds = this.$refs.tree.getCheckedKeys();
            this.authDialog = false;
        },
        handleRemove(index, row){
            this.$confirm('您确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteApi(row.id).then((data)=>{
                    if(data && data.code === 'ok' && data.data === 'success'){
                        this.$notify({
                            title: '成功',
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.getApiList();
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
    .sy-api-auth-row1,.sy-api-auth-row2{
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        bottom: 0;
    }
    .sy-api-auth-row2{
        right: 0;
        top: 0;
        left: 50%;
        bottom: 0;
        border-left: 1px solid #ccc;
    }
    .sy-api-auth-row2 h3{
        margin: 0;
        padding: 5px 10px;
        border-right: 1px solid #ccc;
    }
    .sy-api-auth-row2>div{
        position: absolute;
        top: 65px;
        bottom: 0;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border-right: 1px solid #ccc;
        overflow-y: auto;
    }

    .sy-api-auth-row1>div.row1-row1{
        position: absolute;
        top: 0;
        bottom: 50px;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        overflow-y: auto;
    }
    .sy-api-auth-row1>div.row1-row2{
        height: 50px;
        bottom: 0;
        box-sizing: border-box;
        width: 100%;
        position: absolute;
        line-height: 50px;
        padding: 0 10px;
    }
</style>

