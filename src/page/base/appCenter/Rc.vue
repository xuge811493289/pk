<template>
    <div class="app-container-box">
        <sy-grad-4>
            <div slot="headerRight" style="line-height:40px;" >
                <span>应用模块：</span>
                <el-select v-model="value" placeholder="请选择" @change="hanleChangeApplication">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="" size="small" @click="add" style="float:right;margin-top:5px;">新增</el-button>
            </div>
            <div slot="bodyRight">
                <sy-grad-4>
                     <div slot="headerLeft">
                        <el-input
                            placeholder="请输入关键字"
                            icon="search"
                            v-model.trim="filterText"
                            @keyup.enter.native="handleTreIconClick"
                            size="small"
                            :on-icon-click="handleTreIconClick">
                        </el-input>
                    </div> 
                    <div slot="bodyLeft">
                        <el-tree 
                            :data="treeData" 
                            :props="defaultProps"
                            node-key="id" 
                            ref="atree"
                            :current-node-key="currentUnitId"
                            :default-expanded-keys="defaultKeys"
                            style="border:0;"
                            class="full-parent-height"
                            :highlight-current="true"
                            :filter-node-method="filterNode"
                            @node-click="handleNodeClick">
                        </el-tree>
                    </div>
                    <div slot="bodyRight" style="padding:10px;height: 100%;">
                         <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                            <el-table-column
                                label="字段名称"
                                width="100"
                                prop="name">
                            </el-table-column>
                            <el-table-column
                                label="值"
                                prop="value">
                                <template scope="scope">
                                    <span v-if="scope.row.type !== 'control'">{{scope.row.value}}</span>
                                    <el-button :disabled="!scope.row.parentId" v-if="scope.row.type === 'control'" size="small" type="warning" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                                    <el-button :disabled="!scope.row.parentId" v-if="scope.row.type === 'control'" size="small" type="success" @click="handleAuthority(scope.$index, scope.row)">授权</el-button>
                                    <el-button :disabled="!scope.row.parentId" v-if="scope.row.type === 'control'" size="small" type="danger" @click="handleRemove(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </sy-grad-4>
            </div>
        </sy-grad-4>
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
                            ref="authtree"
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
        <sy-dialog
            title="新增"
            :close-on-click-modal="false"
            position="middle"
            height="auto"
            width="500px"
            slide="fade"
            :visible.sync="addDialog">
            <div slot="body" style="padding:10px;">
                <el-row :gutter="0">
                    <el-col :span="24">
                        <el-form :model="ruleForm" :rules="ruleFormRules" label-position="right" ref="ruleForm" label-width="85px" class="demo-ruleForm">
                            <el-form-item label="上级节点：" prop="parentId">
                                <el-button type="" @click="openCodeTree" style="width:100%;text-align: left;">{{ruleForm.parentId}}</el-button>
                            </el-form-item>
                            <el-form-item label="图标名称：" prop="icon">
                                <el-input v-model="ruleForm.icon"></el-input>
                            </el-form-item>
                            <el-form-item label="前端路由：" prop="menuRoute">
                                <el-input v-model="ruleForm.menuRoute"></el-input>
                            </el-form-item>
                            <el-form-item label="资源序号：" prop="sort">
                                <el-input style="width:100%;" size="small" v-model.number="ruleForm.sort"></el-input>
                            </el-form-item>
                            <el-form-item label="资源名称：" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="资源编码：" prop="code">
                                <span><b>模块：</b>app_字母或下划线</span><br>
                                <span><b>栏目：</b>category_字母或下划线</span><br>
                                <span><b>页面：</b>page_字母或下划线</span><br>
                                <span><b>按钮：</b>btn_字母或下划线</span>
                                <el-input v-model="ruleForm.code"></el-input>
                            </el-form-item>
                            <el-form-item label="资源类型：" prop="resourceType">
                                <el-select v-model="ruleForm.resourceType" placeholder="请选择" style="width:100%;">
                                    <el-option
                                    v-for="item in resourceTypeoptions"
                                    :key="item.id+'resourceType'"
                                    :label="item.name"
                                    :value="item.id+''">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="组织类型：" prop="unitType">
                                <el-select v-model="ruleForm.unitType" placeholder="请选择" style="width:100%;">
                                    <el-option label="公用" :value="null"></el-option>
                                    <el-option label="教育局" :value="1"></el-option>
                                    <el-option label="学校" :value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="资源组：" prop="menuGroup">
                                <el-input v-model="ruleForm.menuGroup"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer">
                <el-button type="" @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="submit('ruleForm')">确 定</el-button>
            </div>
        </sy-dialog>
        <sy-dialog
            title="选择节点"
            :close-on-click-modal="false"
            position="middle"
            height="300px"
            width="200px"
            slide="fade"
            :visible.sync="choiceDialog">
            <div slot="body" style="padding:10px;">
                <el-tree 
                    :data="treeData" 
                    :props="defaultProps"
                    node-key="id" 
                    ref="codetree"
                    highlight-current
                    style="border:0;"
                    @node-click="handleNodeChoice"
                    class="full-parent-height">
                </el-tree>
            </div>
            <div slot="footer">
                <el-button type="" @click="choiceDialog = false">取 消</el-button>
                <el-button type="primary" @click="hanleChoice">确 定</el-button>
            </div>
        </sy-dialog>
        <sy-dialog
            title="编辑"
            :close-on-click-modal="false"
            position="middle"
            height="auto"
            width="500px"
            slide="fade"
            :visible.sync="editDialog">
            <div slot="body" style="padding:10px;">
                <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="85px" class="demo-ruleForm">
                    <el-form-item label="上级节点：" prop="parentId">
                        <el-button type="" @click="openCodeTree" style="width:100%;text-align: left;">{{editForm.parentId}}</el-button>
                    </el-form-item>
                    <el-form-item label="图标名称：" prop="icon">
                        <el-input v-model="editForm.icon"></el-input>
                    </el-form-item>
                    <el-form-item label="前端路由：" prop="menuRoute">
                        <el-input v-model="editForm.menuRoute"></el-input>
                    </el-form-item>
                    <el-form-item label="资源序号：" prop="sort">
                        <el-input style="width:100%;" size="small" v-model.number="editForm.sort"></el-input>
                    </el-form-item>
                    <el-form-item label="资源名称：" prop="name">
                        <el-input v-model="editForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="资源编码：" prop="code">
                        <span><b>模块：</b>app_字母或下划线</span><br>
                        <span><b>栏目：</b>category_字母或下划线</span><br>
                        <span><b>页面：</b>page_字母或下划线</span><br>
                        <span><b>按钮：</b>btn_字母或下划线</span>
                        <el-input v-model="editForm.code"></el-input>
                    </el-form-item>
                    <el-form-item label="资源类型：" prop="resourceType">
                        <el-select v-model="editForm.resourceType" placeholder="请选择" style="width:100%;">
                            <el-option
                            v-for="item in resourceTypeoptions"
                            :key="item.id+'resourceType'"
                            :label="item.name"
                            :value="item.id+''">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="组织类型：" prop="unitType">
                        <el-select v-model="editForm.unitType" placeholder="请选择" style="width:100%;">
                            <el-option label="公用" :value="null"></el-option>
                            <el-option label="教育局" :value="1"></el-option>
                            <el-option label="学校" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="资源组：" prop="menuGroup">
                        <el-input v-model="editForm.menuGroup"></el-input>
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
import _ from 'lodash';
import {saveMoreApiCodes,
        searchCodeBy,
        getApplicationModels,
        saveInsideRc,
        getResourceType,
        updataInsideRc,
        getRcById,
        deleteInsideRc,
        getCodeByCodesTree,
        saveCodeByCodes,
        deleteCodeByCodes,
        checkCodes,
        checkRcNameUniq,
        getRcTreeByCodeTree} from './request.js';
export default {
    name: 'api',
    data(){
        let checkeditRcName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('资源名称不能为空'));
            } else {
                checkRcNameUniq({
                    parentId: this.editForm.parentId,
                    id: this.currentId,
                    name: value,
                    flag: true
                }).then((data) => {
                    if (data.data) {
                        callback()
                    } else {
                        callback(new Error('资源名称已存在！'))
                    }
                })
            }
        };
        let checkenewRcName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('资源名称不能为空'));
            } else {
                checkRcNameUniq({
                    parentId: this.ruleForm.parentId,
                    id: this.currentId,
                    name: value,
                    flag: false
                }).then((data) => {
                    if (data.data) {
                        callback()
                    } else {
                        callback(new Error('资源名称已存在！'))
                    }
                })
            }
        };
        let checknewcode = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('资源编码不能为空'));
            } else {
                checkCodes({
                    parentId: this.ruleForm.parentId,
                    code: value
                }).then((data) => {
                    if (typeof data.data === 'boolean'){
                        if (data.data) {
                            callback()
                        } else {
                            callback(new Error('资源编码已存在！'))
                        }
                    }else{
                        callback(new Error(_.map(data.data,'message').join('，')))
                    }
                    
                })
            }
        };
        let checkeditcode = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('资源编码不能为空'));
            } else {
                if( this.oldCode == value){
                    callback()
                }else{
                    checkCodes({
                        parentId: this.editForm.parentId,
                        code: value
                    }).then((data) => {
                        if (typeof data.data === 'boolean'){
                            if (data.data) {
                                callback()
                            } else {
                                callback(new Error('资源编码已存在！'))
                            }
                        }else{
                            callback(new Error(_.map(data.data,'message').join('，')))
                        }
                    })
                }
            }
        };
        return {
            loading: false,
            choiceDialog: false,
            authDialog: false,
            authData: [],
            name: '',
            searchApis: [],
            isAddapi: false,
            input: '',
            resourceTypeoptions: [],
            method: 'GET',
            tableData: [],
            height: window.innerHeight - 60 - 40 - 20,
            value: 'base',
            options: [{
                label: '基础模块',
                value: 'base'
            }],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            filterText: '',
            treeData: [],
            currentUnitId: '',
            currentId: '',
            currentParentId: '',
            oldcurrentParentId: '',
            currentCodeId: '',
            defaultKeys: [],
            currentCode: '',
            currentData: {},
            addDialog: false,
            editDialog: false,
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            ruleForm: {
                code: '',
                name: '',
                parentId: '',
                resourceType: '',
                unitType: '',
                menuRoute: '',
                sort: '',
                icon: '',
                menuGroup: ''
            },
            oldCode: '',
            editForm: {
                id: '',
                code: '',
                name: '',
                parentId: '',
                resourceType: '',
                unitType: '',
                menuRoute: '',
                sort: '',
                icon: '',
                menuGroup: ''
            },
            editFormRules: {
                parentId: [
                    { required: true, message: '请选择上级节点', trigger: 'change' }
                ],
                name: [
                    { required: true, validator: checkeditRcName, trigger: 'blur' },
                    { min: 0, max: 50, message: '长度在 50 个字符内', trigger: 'blur' }
                ],
                menuRoute: [
                    { required: true, message: '请输入前端路由', trigger: 'blur' },
                    { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
                ],
                icon: [
                    { required: true, message: '请输入图标名称', trigger: 'blur' },
                    { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '请输入序号'},
                    { type: 'number', message: '序号必须为数字值'}
                ],
                code: [
                    { required: true, validator: checkeditcode, trigger: 'blur' },
                    { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
                ],
                menuGroup: [
                    { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
                ],
                resourceType: [
                    { required: true, message: '请选择资源类型', trigger: 'change' }
                ]
            },
            ruleFormRules: {
                parentId: [
                    { required: true, message: '请选择上级节点', trigger: 'change' }
                ],
                name: [
                    { required: true, validator: checkenewRcName, trigger: 'blur' },
                    { min: 0, max: 50, message: '长度在 50 个字符内', trigger: 'blur' }
                ],
                menuRoute: [
                    { required: true, message: '请输入前端路由', trigger: 'blur' },
                    { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
                ],
                icon: [
                    { required: true, message: '请输入图标名称', trigger: 'blur' },
                    { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '请输入序号'},
                    { type: 'number', message: '序号必须为数字值'}
                ],
                code: [
                    { required: true, validator: checknewcode, trigger: 'blur' },
                    { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
                ],
                menuGroup: [
                    { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
                ],
                resourceType: [
                    { required: true, message: '请选择资源类型', trigger: 'change' }
                ]
            },
            changeTreeNode: ''
        }
    },
    created(){
        this.$parent.$emit('currentPage','/base/rc');
        this.getApplicationModels();
    },
    watch:{
        filterText: function(val) {
            if (val) {
                this.$refs.atree.filter(val);
            } else {
                this.getRcTreeByCodeTree();
            }
        }
    },
    methods:{
        // 选择上级节点
        handleNodeChoice(data){
            this.changeTreeNode = data;
        },
        hanleChoice(){
            this.ruleForm.parentId = this.changeTreeNode.code;
            this.choiceDialog = false;
        },
        // 树过滤
        handleTreIconClick(){
            if (this.filterText) {
                this.$refs.atree.filter(this.filterText);
            } else {
                this.getRcTreeByCodeTree();
            }
        },
        handleIconClick(){
            console.log('asfasfasdf');
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
        hanleChangeApplication(val){
            this.getRcTreeByCodeTree();
        },
        getRcTreeByCodeTree(){
            this.treeData = [];
            getRcTreeByCodeTree(this.value).then((data)=>{
                if(data && data.code === 'ok'){
                    this.treeData = data.data;
                    this.currentUnitId = data.data[0].id,
                    this.defaultKeys = [data.data[0].id];
                    this.currentCode = data.data[0].id
                    this.currentParentId = data.data[0].id;
                    this.getRcById();
                }
            })
        },
        handleNodeClick(data){
            console.log(data);
            this.currentParentId = data.id;
            this.currentCode = data.code;
            this.getRcById();
        },
        getRcById(){
            getRcById(this.currentCode).then((data)=>{
                console.log(data);
                if(data && data.code === 'ok' && data.data){
                    this.currentData = data.data;
                    this.tableData = [
                        {
                            name: '图标名称',
                            value: data.data.icon,
                            type: 'nomal',
                            parentId: true,
                            code: data.data.code
                        },
                        {
                            name: '前端路由',
                            value: data.data.menuRoute,
                            type: 'nomal',
                            parentId: true,
                            code: data.data.code
                        },
                        {
                            name: '资源序号',
                            value: data.data.sort,
                            type: 'nomal',
                            parentId: true,
                            code: data.data.code
                        },
                        {
                            name: '资源名称',
                            value: data.data.name,
                            type: 'nomal',
                            parentId: true,
                            code: data.data.code
                        },
                        {
                            name: '资源编码',
                            value: data.data.code,
                            type: 'nomal',
                            parentId: true,
                            code: data.data.code
                        },
                        {
                            name: '资源类型',
                            value: data.data.resourceTypeName,
                            type: 'nomal',
                            parentId: true,
                            code: data.data.code
                        },
                        {
                            name: '组织类型',
                            value: data.data.unitTypeName,
                            type: 'nomal',
                            parentId: true,
                            code: data.data.code
                        },
                        {
                            name: '资源组',
                            value: data.data.menuGroup,
                            type: 'nomal',
                            parentId: true,
                            code: data.data.code
                        },
                        {
                            name: '操作',
                            value: '',
                            type: 'control',
                            code: data.data.code,
                            id: data.data.id,
                            parentId: data.data.parentId ? true : false
                        }
                    ]
                }
            })
        },
        getApplicationModels(){
            this.options = [];
            getApplicationModels().then((data)=>{
                let arr = [];
                if(data && data.code === 'ok'){
                    data.data.forEach((_d,i)=>{
                        arr.push({
                            label: _d.name,
                            value: _d.code,
                            id: _d.id
                        })
                    })
                    this.value = data.data[0].id;
                    this.options = arr;
                    this.getRcTreeByCodeTree();
                }else{
                }
            })
        },
        conectCodesApi(code){
            saveCodeByCodes({
                authorityId: code.code,
                resourceId: this.currentCodeId
            }).then((data)=>{
                console.log(data);
                if(data && data.code === 'ok'){
                    this.$notify({
                        title: '成功',
                        message: '授权成功！',
                        type: 'success'
                    });
                    this.getCodeByCodesTree();
                }else{
                    this.$notify.error({
                        title: '失败',
                        message: data.data
                    });
                }
            })
        },
        removeApiGuanxi(){
            this.$confirm('您确定要取消授权吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let resIds = this.$refs.authtree.getCheckedKeys();
                deleteCodeByCodes({
                    resourceId: this.currentCodeId,
                    authorityIds: resIds.join(',')
                }).then((data)=>{
                    if(data && data.code === 'ok'){
                        this.$notify({
                            title: '成功',
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.getCodeByCodesTree();
                    }else{
                        this.$notify.error({
                            title: '失败',
                            message: data.data
                        });
                    }
                })
            }).catch(() => {

            });
        },
        getCodeByCodesTree(){
            getCodeByCodesTree(this.currentCodeId).then((data)=>{
                console.log(data);
                if(data && data.code === 'ok'){
                    this.authData = data.data;
                }
            })
        },
        handleAuthority(index,row){
            this.name = row.name;
            this.currentCodeId = row.id;
            this.authData = [];
            this.getCodeByCodesTree();
            this.authDialog = true;
        },
        handleAddapi(){
            this.isAddapi = true;
        },
        add(){
            this.oldCode = '';
            this.$refs.ruleForm.resetFields();
            this.ruleForm.parentId = this.currentParentId;
            this.addDialog = true;
            this.resourceTypeoptions = [];
            getResourceType(this.ruleForm.parentId).then((data)=>{
                if(data && data.code === 'ok'){
                    this.resourceTypeoptions = data.data;
                }
            })  
        },
        submit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    saveInsideRc(this.ruleForm).then((data)=>{
                        if(data && data.code === 'ok' && data.data === 'success'){
                            this.$notify({
                                title: '成功',
                                message: '新增成功！',
                                type: 'success'
                            });
                            this.addDialog = false;
                            this.getRcTreeByCodeTree();
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
            this.$refs.editForm.resetFields();
            getRcById(row.code).then((data)=>{  
                if(data && data.code === 'ok' && data.data){
                    this.currentId = data.data.id;
                    this.editForm.sort = data.data.sort;
                    this.editForm.id = data.data.id;
                    this.editForm.unitType = data.data.unitType;
                    this.editForm.resourceType = data.data.resourceType+'';
                    this.editForm.name = data.data.name;
                    this.editForm.menuRoute = data.data.menuRoute;
                    this.editForm.icon = data.data.icon;
                    this.editForm.code = data.data.code;
                    this.oldCode = data.data.code;
                    this.editForm.parentId = data.data.parentId; 
                    this.resourceTypeoptions = [];
                    this.editForm.menuGroup = data.data.menuGroup; 
                    getResourceType(this.editForm.parentId).then((data)=>{
                        if(data && data.code === 'ok'){
                            this.resourceTypeoptions = data.data;
                        }
                    })  
                }
                this.editDialog = true;
            })
            
        },
        edit(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    updataInsideRc(this.editForm).then((data)=>{
                        if(data && data.code === 'ok' && data.data === 'success'){
                            this.$notify({
                                title: '成功',
                                message: '编辑成功！',
                                type: 'success'
                            });
                            this.getRcById();
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
        handleRemove(inxex,row){
            this.$confirm('您确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(row);
                deleteInsideRc(row.id).then((data)=>{
                    if(data && data.code === 'ok' && data.data === 'success'){
                        this.$notify({
                            title: '成功',
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.getRcTreeByCodeTree();
                    }else{
                        this.$notify.error({
                            title: '失败',
                            message: data.data
                        });
                    }
                })
            }).catch(() => {

            });
        },
        openCodeTree(){
            this.choiceDialog = true;
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        
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
        overflow: auto;
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

