<template>
    <div class="app-container-box">
        <sy-grad-4>
            <div slot="headerLeft" v-if="isHiddenTree">
                <span>组织架构</span>
            </div>
            <div slot="headerRight" class="line-height-56">
                <span>{{currentText}} 家长列表</span>
            </div>
            <div slot="bodyLeft" style="padding: 0;" v-if="isHiddenTree">
                <sy-grad-4 :border="false">
                    <div slot="headerRight" class="line-height-56" style="background:#fff;">
                        <el-input
                            placeholder="请输入关键字"
                            icon="search"
                            v-model.trim="inputValue"
                            size="small"
                            @keyup.enter.native="handleIconClick"
                            :on-icon-click="handleIconClick">
                        </el-input>
                    </div>
                    <div slot="bodyRight" style="padding: 0;">
                        <el-tree 
                            :data="treeData" 
                            :props="defaultProps"
                            :empty-text="emptyTreeText"
                            node-key="id" 
                            ref="tree"
                            style="border:0;"
                            :filter-node-method="filterNode"
                            @node-expand="handleNodeClick"
                            class="full-parent"
                            :current-node-key="currentNodeKey"
                            :highlight-current="true"
                            :default-expanded-keys="defaultKeys"
                            @node-click="handleNodeClick">
                        </el-tree>
                    </div>
                </sy-grad-4>
            </div>
            <div slot="bodyRight" style="padding: 0;">
                <sy-grad-4 :border="false">
                    <div slot="headerRight" class="line-height-56">
                        <div class="sy-row">
                            <div class="sy-col sy-10">
                                <span style="fontSize:12px ;font-weight: normal;">关键字：</span>
                                <el-input
                                    style="width:256px;" 
                                    placeholder="账号、姓名、联系电话"
                                    icon="search"
                                    size="small" 
                                    @keyup.enter.native="handleKeyIconClick"
                                    v-model.trim="listParmars.keyword"
                                    :on-icon-click="handleKeyIconClick">
                                </el-input>
                            </div>
                            <div class="sy-col sy-10 right">
                                <el-button type="" size="small" @click="openDownLoadDialog" v-if="codeList['btn_base_patriarch_download']">下载</el-button>
                            </div>
                        </div>
                    </div>
                    <div slot="bodyRight" style="height:100%;width:100%;padding:0px 10px;">
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            border
                            stripe
                            :empty-text="emptyText"
                            tooltip-effect="dark"
                            v-loading="loading"
                            element-loading-text="拼命加载中..."
                            height="100%"
                            style="height:100%;width:100%;"
                            @selection-change="handleSelectionChange">
                            <el-table-column v-for="item in appColumn" 
                                :key="item.prop"
                                :prop="item.prop"
                                :width="item.width"
                                :label="item.label">
                                <template scope="scope">
                                    <span v-if="item.prop !== 'sex' && item.prop !== 'status'">{{scope.row[item.prop]}}</span>
                                    <span v-if="item.prop === 'sex'">{{scope.row[item.prop] === 1 ? '男' : scope.row[item.prop] === 2 ? '女' : ''}}</span>
                                    <span v-if="item.prop === 'status'">{{scope.row[item.prop] === 0 ? '禁用' : '启用'}}</span>
                                </template>  
                            </el-table-column>
                            <el-table-column label="操作" width="150" align="center">
                                <template scope="scope">
                                    <el-button
                                    size="small"
                                    type="text"
                                    v-if="codeList['btn_base_patriarch_update']"
                                    @click="handleEdit(scope.$index, scope.row)"><i class="fa fa-pencil-square-o" title="编辑"></i></el-button>
                                    <el-button
                                    size="small"
                                    type="text"
                                    v-if="codeList['btn_base_patriarch_showPermission']"
                                    @click="handleAuthority(scope.$index, scope.row)"><i class="fa fa-eye" aria-hidden="true" title="查看权限"></i></el-button>
                                    <el-button
                                        size="small"
                                        type="text"
                                        v-if="codeList['btn_base_patriarch_dellock']"
                                        @click="handleClearMsg(scope.$index, scope.row)"><i class="fa fa-eraser" aria-hidden="true" title="清除登录错误信息"></i></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div slot="footer">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="listParmars.start"
                            :page-size="listParmars.size"
                            class="pagination-mf"
                            layout="total, prev, pager, next"
                            :total="totals">
                        </el-pagination>
                    </div>
                </sy-grad-4>
            </div>
        </sy-grad-4>
        <sy-dialog
            title="用户下载"
            :close-on-click-modal="false"
            position="middle"
            height="auto"
            width="500px"
            slide="fade"
            :visible.sync="downLoadDialog">
            <div slot="body" style="padding:10px;">
                <el-form ref="downLoadForm" :model="downLoadForm" label-width="140px" label-position="left">
                     <!-- <input onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">  -->
                    <el-form-item label="选择要下载的年级：">
                        <el-select v-model="downLoadForm.gradeId" clearable placeholder="" style="width:100%;" @change="handleChangeGrade">
                            <el-option
                                v-for="item in gradeOptions"
                                :key="item.value + 'department1'"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择要下载的班级：">
                        <el-select v-model="downLoadForm.classId" clearable placeholder="" style="width:100%;">
                            <el-option
                                v-for="item in classOptions"
                                :key="item.value + 'department1'"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择要下载的字段：">
                        <div class="border">
                            <el-checkbox-group v-model="downLoadForm.downloadOptions">
                                <el-checkbox  
                                    v-for="item in downloadDatas" 
                                    :label="item.value"
                                    :checked="item.isSelected"
                                    :disabled="item.isSelected"
                                    :key="item.label" 
                                    style="marginLeft:5px;">
                                    {{item.label}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </div>
                        
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button type="" @click="downLoadDialog = false">取 消</el-button>
                <el-button type="primary" @click="downLoad">导 出</el-button>
            </div>
        </sy-dialog>
        <sy-dialog
            title="用户权限"
            :close-on-click-modal="false"
            position="middle"
            height="50%"
            width="400px"
            slide="fade"
            :visible.sync="authorityDialog">
            <div slot="body" style="padding:10px;">
                <el-tree :data="authData" :empty-text="emptyauthText" style="border:0;" :props="defaultProps"></el-tree>
            </div>
        </sy-dialog>
        <sy-dialog
            title="编辑"
            :close-on-click-modal="false"
            position="middle"
            height="auto"
            width="500px"
            slide="fade"
            :visible.sync="editorDialog">
            <div slot="body" style="padding:10px 20px 10px 10px;">
                <el-form label-position="right" label-width="85px" :model="editForm" ref="editForm" :rules="rules">
                    <el-row :gutter="20">
                        <el-col :span="11">
                            <div class="register-form">
                                <el-form-item label="账号：">
                                    <el-input v-model="editForm.loginName" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="密码：" prop="loginPasswd">
                                    <el-input v-model="editForm.loginPasswd" :type="ispassword" @focus="passwordOnFocus"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="register-form">
                                <el-form-item label="姓名：" prop="realName">
                                    <el-input v-model="editForm.realName"></el-input>
                                </el-form-item>
                                <el-form-item label="联系电话：" prop="loginMobile">
                                    <el-input v-model="editForm.loginMobile"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div slot="footer">
                <el-button type="" @click="editorDialog = false">取 消</el-button>
                <el-button :loading="editBtn" type="primary" @click="updataParentList('editForm')">确 定</el-button>
            </div>
        </sy-dialog>
    </div>
</template>

<script>
import _ from 'lodash';
import {getClassCourseTree,
        getClassTree,
        getClassByGradId,
        getParentList,
        updataParentList,
        getParentExcelList,
        clearLoginErrorMsg,
        getClassList,
        getUserAuth,
        getGrad} from '../request.js';
import config from './config.js';
import { getRcCodeList } from '../../request.js';
import pager from '../../config.js';
import data from '../data.js';
export default {
    name: 'students',
    components: {
        
    },
    mixins: [data],
    data () {
        let checkPpassword = (rule, value, callback) => {
            if (!value) {
                callback();
            } else {
                if (!(/^[a-zA-Z0-9_]+$/.test(value))) {
                    callback(new Error('只能输入字母、数字、下划线！'));
                    setTimeout(() => {
                        this.editForm.loginPasswd = '';
                        this.$refs.editForm.validateField('loginPasswd');
                    }, 500);
                } else {
                    if (value.length <= 16 && value.length >= 8) {
                        callback()
                    } else {
                        callback(new Error('长度在8~16位之间！'));
                        // setTimeout(() => {
                        //     this.editForm.loginPasswd = '';
                        //     this.$refs.editForm.validateField('loginPasswd');
                        // }, 500);
                    }
                }
            }
        };
        let checkPphone = (rule, value, callback) => {
            if (this.$checkContact(value)) {
                return callback();
            }
            return callback(new Error("联系电话输入有误！"))
        };
        return {
            emptyText: '正在加载中...',
            emptyTreeText: '正在加载中...',
            emptyauthText: '正在加载中...',
            inputValue: '',
            defaultKeys: [],
            ispassword: 'password',
            currentNodeKey: '',
            gradeOptions: [],
            currentText: '',
            downloadDatas: [],
            defaultSelected: [],
            authData: [], // 权限树
            editForm:{
                id: null,
                realName: null,
                loginName: null,
                loginPasswd: 'shiyue_123',
                loginMobile: null
            },
            oldparentPhone: '',
            rules: {
                loginMobile: [
                    { validator: checkPphone, trigger: 'blur' }
                ],
                realName: [
                    { min: 0, max: 50, message: '长度小于50个字符', trigger: 'blur' }
                ],
                loginPasswd: [
                    { validator: checkPpassword, trigger: 'blur' }
                ],
            },
            classOptions: [],
            loading: false,
            downLoadForm: {
                unitId: null,
                gradeId: null,
                classId: null,
                departmentId: null,
                downloadOptions: []
            },
            downLoadDialog: false,
            authorityDialog: false,
            editorDialog: false,
            tableData: [],
            keywords: '',
            appColumn: config.list,
            isvisible: false,
            obj:{
                color: '#f00'
            },
            data: [],
            treeData: [],
            oldTreeData: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            multipleSelection: [],
            listParmars: {  // 列表参数
                unitId: null,
                keyword: null,
                start: 1,
                size: pager.pageSize,
                clazz: null,
                gradeId: null
            },
            totals: 0,
            oldloginMobile: '',
            isHiddenTree: true,
            oldParentMsg: {},
            codeList: {
                'btn_base_patriarch_download': false, // 下载
                'btn_base_patriarch_update': false, //修改
                'btn_base_patriarch_showPermission': false, // 权限
                'btn_base_patriarch_dellock': false, // 解锁
            }
        }
    },
    watch:{
        'downLoadForm.gradeId': function(newVal, oldVal) {
            if (!newVal) { return };
            if (newVal && !oldVal) { return }
            setTimeout(() => {
                this.downLoadForm.classId = '';
            }, 50)
        },
        // inputValue: function(val) {
        //     if (val) {
        //         this.$refs.tree.filter(val);
        //     } else {
        //         this.getTree();
        //     }
        // }
    },
    created(){
        
        this.$parent.$emit('currentPage','/base/parents');
        // 获取权限
        getRcCodeList('category_base_patriarch', this.codeList).then(() => {
            this.getTree();
            // 获取Excel列
            getParentExcelList().then((data)=>{
                this.downloadDatas = [];
                if(data.data.length>0){
                    data.data.forEach((_d,i)=>{
                        let value = '';
                        for(let key in _d){
                            if(key !== 'required'){
                                value = key;
                            }
                        }
                        if(_d.required === "true"){
                            this.defaultSelected.push(value);
                        }
                        this.downloadDatas.push({
                            label: _d[value],
                            value: value,
                            isSelected: _d.required === "true" ? true : false
                        });
                    })
                }
            })
        });
       
    },
    methods:{
        passwordOnFocus(){
            this.editForm.loginPasswd = '';
            this.ispassword = 'text';
        },
        checkPhone(value, obj, key){
            if (!value) { return; }
            if (this.oldloginMobile === this.$trim(value)) { return; }
            if (this.$checkPhoneNumber(this.$trim(value))) {
                
            } else {
                this.$notify({
                    message: '手机号码格式有误！',
                    type: 'error'
                });
                obj[key] = '';
            }
        },
        // 过滤
        handleIconClick() {
            if (this.inputValue) {
                this.$refs.tree.filter(this.inputValue);
            } else {
                this.getTree();
            }
        },
        filterNode(value, data) {
             if (!value) return true;
            if (data.name) return data.name.indexOf(value) !== -1;
        },
        make(datas, idprop, pIdprop){
            if (!idprop) {
                idprop = 'id';
            }
            if (!pIdprop) {
                pIdprop = 'parentId';
            }
            let nodes = [];
            let c = function(obj) {
                let _c = [];
                for (let i = 0; i < datas.length; i++) {
                    let _d = _.cloneDeep(datas[i]);
                    if (_d[pIdprop + ''] == obj[idprop + '']) {
                        _c.push(_d);
                        c(_d);
                    }
                }
                if (obj.type === 'grade') {
                    obj.children = [{}]
                } else {
                    obj.children = _.sortBy(_c, function(item) {
                        return item.sort;
                    });
                    // obj.children = _c.sort((a, b) => { return a.sort > b.sort });
                }
            };
            for (let i = 0; i < datas.length; i++) {
                let _d = _.cloneDeep(datas[i]);
                if ((!_d[pIdprop + ''] && _d[pIdprop + ''] != '') || (!_.result(_.find(datas, {
                        [idprop]: _d[pIdprop + '']
                    }), idprop))) {
                    c(_d);
                    nodes.push(_d);
                }
            }
            return nodes;
        },
        // 获取组织架构树
        getTree(){
            this.defaultKeys = [];
            this.emptyTreeText = '正在加载中...';
            getClassTree().then((data)=>{
                // console.log(data);
                if(data && data.data.length>0){
                    this.oldTreeData = _.cloneDeep(data.data);
                    if (this.oldTreeData.length === 1 && this.oldTreeData[0].unitType === 2) {
                        this.isHiddenTree = false;
                    } else {
                        this.isHiddenTree = true;
                    }
                    this.treeData = this.make(data.data, 'domId', 'domPid');
                    let unitId = '';
                    let unitName = '';
                    let arr = [];
                    let getId = function(child) {
                        if (!child && child.length > 0) { return };
                        child.forEach((_c, i) => {
                            if (_c.unitType === 2) {
                                arr.push(_c);
                            } else if (_c.unitType === 1 && _c.children.length > 0) {
                                getId(_c.children)
                            }
                        })
                    }
                    getId(this.treeData);
                    unitId = arr[0].id;
                    unitName = arr[0].name;
                    this.defaultKeys.push(unitId);
                    this.listParmars.unitId = unitId;
                    this.currentNodeKey = unitId;
                    this.currentText = unitName;
                    this.getParentList();
                }else{
                    this.emptyTreeText = '暂无数据';
                }
            })
        },
        // 树节点点击事件
        handleNodeClick(data) {
            this.isHaveClass = false;
            this.listParmars.keyword = null;
            if(data.type === 'unit'){
                if(this.listParmars.clazz){
                    this.listParmars.clazz = null;
                }
                if(this.listParmars.gradeId){
                    this.listParmars.gradeId = null;
                }
                this.listParmars.unitId = data.id;
                this.getParentList();
            }else if(data.type === 'grade'){
                if(this.listParmars.clazz){
                    this.listParmars.clazz = null;
                }
                if(data.children && data.children.length>0){
                    this.isHaveClass = true;
                }
                this.listParmars.unitId = data.parentId;
                this.listParmars.gradeId = data.id;
                this.getParentList();
                getClassByGradId({
                    gradeId: data.id
                }).then((cl) => {
                    if (cl && cl.data && cl.data.length > 0) {
                        cl.data.forEach((_cl, i) => {
                            _cl.type = 'clazz';
                            _cl.unitType = null;
                            _cl.parentId = data.id;
                        })
                        data.children = cl.data;
                    } else {
                        data.children = [];
                    }

                })
            }else if(data.type === 'clazz'){
                this.listParmars.clazz = data.id;
                this.listParmars.gradeId = data.parentId;
                this.listParmars.unitId = _.find(this.oldTreeData,{id: data.parentId}).parentId;
                this.getParentList();
            }
            this.currentText = data.name;
        },
        // 获取家长列表
        getParentList(){
            this.emptyText = '正在加载中...';
            // this.loading = true;
            getParentList(this.listParmars).then((data)=>{
                // console.log(data);
                if(data && data.data && data.data.list && data.data.list.length>0){
                    this.totals = data.data.total;
                    this.tableData = data.data.list;
                }else{
                    this.tableData = [];
                    this.emptyText = '暂无数据';
                }
                // this.loading = false;
            })
        },
        // 编辑家长弹出框
        handleEdit(index,row){
            this.$refs['editForm'].resetFields();
            this.ispassword = 'password';
            this.editBtn = false;
            // console.log(row);
            this.editForm.id = row.id;
            this.oldParentMsg = row;
            this.editForm.loginName = row.loginName;
            this.editForm.realName = row.realName;
            this.editForm.loginMobile = row.loginMobile;
            this.oldparentPhone = row.loginMobile;
            this.editForm.loginPasswd = 'shiyue_123';
            this.editorDialog = true;
        },
        // 修改家长信息
        updataParentList(formName){
            this.editBtn = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.oldParentMsg.loginName === this.editForm.loginName &&
                        this.oldParentMsg.realName === this.editForm.realName &&
                        this.oldParentMsg.loginMobile === this.editForm.loginMobile &&
                        this.editForm.loginPasswd === 'shiyue_123'
                    ){
                        this.editorDialog = false;
                        return;
                    }
                    if(this.editForm.loginPasswd === 'shiyue_123'){
                        this.editForm.loginPasswd = null;
                    }
                    updataParentList(this.editForm).then((data)=>{
                        // console.log(data);
                        this.editBtn = false;
                        if(data && data.code === 'ok'){
                            this.$notify({
                                title: '成功',
                                message: '编辑成功！',
                                type: 'success'
                            });
                            this.editorDialog = false;
                            this.getParentList();
                        }
                    })
                } else {
                    this.editBtn = false;
                    return false;
                }
            });
            
        },
        // 关键字搜索
        handleKeyIconClick(){
            this.getParentList();
        },
        // 下载
        downLoad(){ 
            let obj = {
                unitId: this.listParmars.unitId,
                gradeId: this.downLoadForm.gradeId,
                classId: this.downLoadForm.classId,
                downloadOptions: this.downLoadForm.downloadOptions.join(',')
            }
            // console.log(obj);
            if(obj.unitId){
                this.$downloade('/zuul/api/base/parent/download','POST',obj);
                this.downLoadDialog = false;
                this.downLoadForm.downloadOptions = this.defaultSelected;
            }else{
                this.$notify({
                    title: '警告',
                    message: '请选择组织机构后点击下载',
                    type: 'warning'
                });
            }
        },
        // 切换分页
        handleCurrentChange(val) {
            this.listParmars.start = val;
            this.getParentList();
        },
        // 列表复选事件
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 查看权限
        handleAuthority(index,row) {
            this.authorityDialog = true;
            this.getUserAuth(row.id);
        },
        // 查看权限
        getUserAuth(id){
            this.authData = [];
            this.emptyauthText = '正在加载中...';
            getUserAuth(id).then((data)=>{
                if(data && data.data.length>0){
                    this.authData = data.data;
                }else{
                    this.emptyauthText = '暂无数据';
                }
            });
        },
        // 打开下载弹出框
        openDownLoadDialog(){
            this.downLoadForm.gradeId = null;
            this.downLoadForm.classId = null;
            this.downLoadDialog = true;
            this.getSelectGradeList();
        },
        // 获取年级
        getSelectGradeList(){
            getGrad(this.listParmars.unitId).then((data)=>{
                // console.log('年级',data);
                this.gradeOptions = [];
                if(data && data.data.length>0){
                    data.data.forEach((_data,index)=>{
                        this.gradeOptions.push(
                            {
                                label: _data.gradeName,
                                value: _data.id
                            }
                        );
                    })
                }
            });
        },
        // 选择年级
        handleChangeGrade(val){
            if(!val){
                this.downLoadForm.classId = '';
                this.classOptions = [];
                return;
            }
            this.getClassLists(val);
        },
        // 获取班级
        getClassLists(id){
            this.classOptions = [];
            getClassList(id).then((data)=>{
                if(data && data.data.length>0){
                    data.data.forEach((_data,index)=>{
                        this.classOptions.push(
                            {
                                label: _data.name,
                                value: _data.id
                            }
                        );
                    })
                }
            })
        },
        // 清除用户错误登录信息
        handleClearMsg(index, row) {
            clearLoginErrorMsg(row.id).then((data) => {
                if (data && data.code == 'ok') {
                    if (data.data == 'success') {
                        this.$notify({
                            title: '成功',
                            message: '操作成功！',
                            type: 'success'
                        });
                    }
                } else {
                    this.$notify({
                        title: '成功',
                        message: '操作失败！',
                        type: 'error'
                    });
                }
            })
        }
    }
}
</script>

<style scoped>
    .sy-top{
        position: absolute;
        top: 0;
        height: 45px;
        width: 100%;
        line-height: 45px;
        box-sizing: border-box;
        padding: 0 15px;
    }
    .sy-body{
        position: absolute;
        top: 45px;
        width: 100%;
        bottom: 45px;
        box-sizing: border-box;
        padding: 15px;
    }
    .sy-bottom{
        position: absolute;
        height: 45px;
        width: 100%;
        bottom: 0;
        line-height: 45px;
        box-sizing: border-box;
        padding: 0 15px;
    }
    .sy-row{
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
    }
    .sy-col{
        float: left;
        vertical-align: top;
        box-sizing: border-box;
    }
    .sy-1{
        width: 5%;
    }
    .sy-2{
        width: 10%;
    }
    .sy-3{
        width: 15%;
    }
    .sy-4{
        width: 20%;
    }
    .sy-5{
        width: 25%;
    }
    .sy-6{
        width: 30%;
    }
    .sy-7{
        width: 35%;
    }
    .sy-8{
        width: 40%;
    }
    .sy-9{
        width: 45%;
    }
    .sy-10{
        width: 50%;
    }
    .sy-11{
        width: 55%;
    }
    .sy-12{
        width: 60%;
    }
    .sy-13{
        width: 65%;
    }
    .sy-14{
        width: 70%;
    }
    .sy-15{
        width: 75%;
    }
    .sy-16{
        width: 80%;
    }
    .sy-17{
        width: 85%;
    }
    .sy-18{
        width: 90%;
    }
    .sy-19{
        width: 95%;
    }
    .sy-20{
        width: 100%;
    }
    .border{
        border: 1px solid #ccc;
    }
    .full-parent{
        position: relative;
        height: 100%;
    }
    .right{
        text-align: right;
    }
    .left{
        text-align: left;
    }
    .center{
        text-align: center;
    }
    .teacher-content,.teacher{
        position: relative;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 30px 20px;
    }
    .teacher-content{
        padding: 0;
    }
    .teacher-content-top{
        position: absolute;
        height: 30px;
        top: 0;
        width: 100%;
        line-height: 30px;
    }
    .teacher-content-bottom{
        position: absolute;
        top: 30px;
        bottom: 0;
        width: 100%;
    }
    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        margin: 0 auto;
        width: 100px;
        height: 100px;
    }
    .avatar-uploader:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        text-align: center;
        width: 100px;
        height: 100px;
        line-height: 100px;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
    .register-form{
        text-align: center;
    }
    .open-hide{
        position: absolute;
        top: 40%;
        left: 0;
        cursor: pointer;
        z-index: 500;
    }
</style>
