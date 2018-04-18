<template>
    <div class="app-container-box">
        <sy-grad-4>
            <div slot="headerLeft" v-if="isHiddenTree">
                <span>单位</span>
            </div>
            <div slot="headerRight" class="line-height-56">
                <span>角色列表</span>
            </div>
            <div slot="bodyLeft" style="padding: 0;" v-if="isHiddenTree">
                <sy-grad-4 :border="false">
                    <div slot="headerRight" class="line-height-56" style="background:#fff;">
                        <el-input
                            placeholder="请输入关键字"
                            icon="search"
                            v-model.trim="filterText"
                            size="small"
                            @keyup.enter.native="handleIconClick"
                            :on-icon-click="handleIconClick">
                        </el-input>
                    </div>
                    <div slot="bodyRight">
                        <el-tree 
                            :data="treeData" 
                            :props="defaultProps"
                            :empty-text="emptyTreeText"
                            node-key="unitId" 
                            ref="tree"
                            :current-node-key="currentUnitId"
                            style="border:0;"
                            class="full-parent"
                            :highlight-current="true"
                            default-expand-all
                            :filter-node-method="filterNode"
                            @node-click="handleNodeClick">
                        </el-tree>
                    </div>
                </sy-grad-4>
            </div>
            <div slot="bodyRight" style="padding: 0;">
                <sy-grad-4 :border="false">
                    <div slot="headerRight" class="right line-height-56" v-if="codeList['btn_base_auth_role_add']">
                        <el-button type="" size="small" @click="openDialog" v-if="codeList['btn_base_auth_role_add']">新增</el-button>
                    </div>
                    <div slot="bodyRight" style="width:100%;height:100%;padding: 0 10px;">
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            height="100%"
                            border
                            tooltip-effect="dark"
                            :empty-text="emptyText"
                            style="width:100%;height:100%;"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection" 
                                :selectable="handleSelectable"
                                width="55">
                            </el-table-column>
                            <el-table-column
                                v-for="item in taableColums"
                                :key="item.prop"
                                :align="item.align"
                                :width="item.width"
                                :prop="item.prop"
                                :label="item.label">
                                <template scope="scope">
                                    <span v-if="item.prop === 'status'">{{scope.row[item.prop] === 0 ? '否' : '是'}}</span>
                                    <span v-else-if="item.prop === 'roleType'">{{scope.row[item.prop] === 0 ? '自定义角色' : '内置角色'}}</span>
                                    <span v-else>{{scope.row[item.prop]}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="center"
                                width="100">
                                <template scope="scope">
                                    <el-button type="text" size="small" @click="openEditeDialog(scope.row)" v-if="codeList['btn_base_auth_role_update']">
                                        <i class="fa fa-pencil-square-o" title="编辑"></i>
                                    </el-button>
                                    <el-button type="text" size="small" @click="openAuthDialog(scope.row)" v-if="codeList['btn_base_auth_role_auth']">
                                        <i class="fa fa-user-o" aria-hidden="true" title="授权"></i>
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div slot="footer" class="left">
                        <el-button :loading="deleteBtn" :disabled="multipleSelection.length === 0" type="danger" size="small" @click="handleClick('delete')" v-if="codeList['btn_base_auth_role_delete']">删除</el-button>
                        <el-button type="" size="small" :disabled="multipleSelection.length === 0" @click="handleClick('give')" v-if="codeList['btn_base_auth_role_auth']">授权</el-button>
                        <el-button :disabled="multipleSelection.length === 0" type="" size="small" @click="handleClick('lock')" v-if="codeList['btn_base_auth_role_lock']">锁定</el-button>
                        <el-button :disabled="multipleSelection.length === 0" type="" size="small" @click="handleClick('unlock')" v-if="codeList['btn_base_auth_role_activat']">激活</el-button>
                    </div>
                </sy-grad-4>
            </div>
        </sy-grad-4>
        <!-- 新增 -->
        <sy-dialog
            title="新增"
            :close-on-click-modal="false"
            position="middle"
            height="auto"
            width="650px"
            slide="fade"
            :visible.sync="addNewRoleDialog">
            <div slot="body" style="height:404px;">
                <el-row class="sy-base-role-auth">
                    <el-col :span="15" style="border-right: 1px dashed #ccc;padding: 0 15px 0 10px;height:400px;">
                        <div class="tree-style" style="height:100%;width:100%;position: relative;overflow:hidden;">
                            <sy-grad-4 :border="false">
                                <div slot="headerRight" style="padding: 8px 0 0 0;background-color: #fff;">
                                    角色基本信息
                                </div>
                                <div slot="bodyRight" style="overflow-y:auto;background-color: #fff;">
                                    <el-form ref="form" :model="form" label-width="85px" :rules="rules">
                                        <el-form-item label="角色名称：" prop="name">
                                            <el-input v-model="form.name"></el-input>
                                        </el-form-item>
                                        <el-form-item label="角色委派：">
                                            <el-input type="textarea" :rows="4" resize="none" placeholder="点击选择" v-model="form.userNames" @focus="openSelects"></el-input>
                                        </el-form-item>
                                        <el-form-item label="是否激活：">
                                            <el-radio-group v-model="form.status">
                                                <el-radio :label="1">是</el-radio>
                                                <el-radio :label="0">否</el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                        <el-form-item label="序号:" prop="sort">
                                            <el-input v-model.number="form.sort" style="width:100%"></el-input>
                                        </el-form-item>
                                        <el-form-item label="角色描述：" prop="memo">
                                            <el-input type="textarea" :rows="4" resize="none" placeholder="" v-model="form.memo"></el-input>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </sy-grad-4>
                        </div>
                    </el-col>
                    <el-col :span="9" style="padding: 0 0 0 15px;height:400px;">
                        <div class="tree-style" style="height:100%;width:100%;position: relative;overflow:hidden;">
                            <sy-grad-4 :border="false">
                                <div slot="headerRight" style="padding: 8px 0 0 0;background-color: #fff;">
                                    授权
                                    <el-button type="" size="mini" style="float:right;" @click="changeExpande('unexpend')">收缩</el-button>                                
                                    <el-button type="" size="mini" style="float:right;margin-right:10px;" @click="changeExpande('expend')">展开</el-button>
                                </div>
                                <div slot="bodyRight" style="overflow-y:auto;background-color: #fff;">
                                    <sy-ztree 
                                        style="overflow:hidden;overflow-y:auto;"
                                        :treeData="resoureTreeData"
                                        :chkboxType="chkboxType"
                                        :defaultChecked="defaultChecked"
                                        :isExpendAll="isExpendAll"
                                        @checked-node="checkedNode"
                                        showCheckBox>
                                    </sy-ztree>
                                </div>
                            </sy-grad-4>
                            <!-- <el-tree 
                                :data="resoureTreeData" 
                                :props="defaultProps"
                                ref="suthtree"
                                show-checkbox
                                node-key="id" 
                                style="border:0"
                                highlight-current>
                            </el-tree> -->
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div slot="footer">
                <el-button type="" @click="addNewRoleDialog = false" size="small">取 消</el-button>
                <el-button type="primary" :loading="saveBtn" @click="submitForm('add')">确 定</el-button>
            </div>
        </sy-dialog>
        <!-- 角色授权 -->
        <sy-dialog
            title="角色授权"
            :close-on-click-modal="false"
            position="middle"
            height="600px"
            width="300px"
            slide="fade"
            :visible.sync="authRoleDialog">
            <div slot="body" style="padding:20px;">
               <el-tree 
                    :data="resoureTreeData" 
                    :props="defaultProps"
                    ref="restree"
                    show-checkbox
                    :empty-text="emptyauthText"
                    node-key="id" 
                    style="border:0"
                    highlight-current
                    :default-expand-all="false">
                </el-tree>
            </div>
            <div slot="footer">
                <el-button type="" @click="authRoleDialog = false" size="small">取 消</el-button>
                <el-button type="primary" :loading="authBtn" @click="submitAuth">确 定</el-button>
            </div>
        </sy-dialog>
        <!-- 修改 -->
        <sy-dialog
            title="修改"
            :close-on-click-modal="false"
            position="middle"
            height="auto"
            width="500px"
            slide="fade"
            :visible.sync="editDialog">
            <div slot="body" style="padding:20px;">
                <el-form ref="editform" :model="editform" label-width="100px" :rules="rules">
                    <el-form-item label="角色名称：" prop="name">
                        <el-input v-model="editform.name" :disabled="isdisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="角色用户：" v-show="editform.businessType != 1">
                        <!-- <el-button style="width:100%;" type="" @click="openEditSelects" size="small">{{editform.usernames}}</el-button> -->
                        <el-input type="textarea" 
                            ref="textarea"
                            resize="none" :rows="4" 
                            placeholder="点击选择" 
                            :disabled="editform.businessType == 1" 
                            v-model="editform.usernames" 
                            @focus="openEditSelects"></el-input> 
                    </el-form-item>
                    <el-row>
                        <el-col :span="10" v-show="!isdisabled">
                            <el-form-item label="是否激活：">
                                <el-radio-group v-model="editform.status">
                                    <el-radio :disabled="isdisabled" :label="1">是</el-radio>
                                    <el-radio :disabled="isdisabled" :label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="14">
                            <el-form-item label="序号：">
                                <el-input v-model="editform.sort" style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="角色描述：" prop="memo">
                        <el-input type="textarea" :rows="4" resize="none" placeholder="" v-model="editform.memo"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer">
                <el-button type="" @click="editDialog = false" size="small">取 消</el-button>
                <el-button type="primary" :loading="editBtn" @click="submitUpdata">确 定</el-button>
            </div>
        </sy-dialog>
    </div>
</template>

<script>
import _ from 'lodash';
import {getUnitTree,
        addnewRole,
        getResoureTree,
        roleRresMinix,
        getRoleRresMinix,
        updataRole,
        lockRole,
        checkNameIsRepeat,
        getRoleById,
        unlockRole,
        deleteRoles,
        getRolesList} from '../request.js';
import config from './config.js';
import pager from '../../config.js';
import {getRcCodeList} from '../../request'

export default {
    name: 'teacher',
    components: {
        
    },
    data () {
        let checkLoginName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('角色名称不能为空！'));
            }else{
                if(this.roleName === value){
                    callback()
                }else{
                    if(value.length>50 ){
                        return callback(new Error('角色名不能大于50个字符!'));
                    }else{
                        checkNameIsRepeat(this.currentUnitId,value).then((data)=>{
                            if(data.data){
                                callback(new Error('角色名称不能重复！'))
                            }else{
                                callback()
                            }
                        })
                    }
                } 
            }
        };
        let checkSort = (rule, value, callback) => {
            if (!value && value != 0) {
            return callback(new Error('序号不能为空!'));
            }
            setTimeout(() => {
                if (!(/^[0-9_]+$/.test(value))) {
                    callback(new Error('序号只能输入数字！'));
                    setTimeout(()=>{
                        this.form.sort = '';
                    },100)
                } else {
                    if(value*1 >= 0 && value*1 < 10000){
                        callback();
                    }else{
                        callback(new Error('请输入0-9999之间的数字！'));
                        setTimeout(()=>{
                            this.form.sort = '';
                        },100)
                    }
                }
            }, 500);
        };
        return {
            chkboxType: {
                "Y": "ps", 
                "N": "s" 
            },
            emptyText: '正在加载中...',
            emptyTreeText: '正在加载中...',
            emptyauthText: '正在加载中...',
            defaultChecked: [],
            currentChexedKeys: [],
            isExpendAll: false,
            openOrHide: '/common/images/left.png',
            isHasList: true,
            treeData: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            tableData: [],
            resoureTreeData: [],
            multipleSelection: [],
            taableColums: config.taableColums,
            inputValue:'',
            editDialog: false,
            authRoleDialog: false,
            isdisabled: false,
            form: {
                name: '',
                sort: null,
                userNames: '',
                unitId: '',
                status: '1',
                memo: '',
                resIds: '',
                userIds: ''
            },
            rules: {
                name: [
                    { required: true, validator: checkLoginName, trigger: 'blur' }
                ],
                sort: [
                    { required: true, validator: checkSort,trigger: 'blur'}
                ],
                memo: [
                    { min: 0, max: 2000, message: '长度小于2000个字符', trigger: 'blur' }
                ]
            },
            editform: {
                code: '',
                id: '',
                memo: '',
                name: '',
                roleType: '',
                sort: '',
                status: '',
                unitId: '',
                userids: [],
                usernames: '',
                businessType: ''
            },
            oldeditform: {},
            currentUnitId: '',
            addNewRoleDialog: false,
            currentRoleId: '',
            moreRoles: false,
            filterText: '',
            roleName: '',
            isGorlsAuth: false,
            isHiddenTree: false,
            saveBtn: false,
            editBtn: false,
            authBtn: false,
            deleteBtn: false,
            codeList: {
                btn_base_auth_role_add: false, //  新增角色
                btn_base_auth_role_delete: false, //  删除
                btn_base_auth_role_auth: false, //授权
                btn_base_auth_role_lock: false, // 锁定
                btn_base_auth_role_activat: false, // 激活
                btn_base_auth_role_update: false // 修改
            }
        }
    },
    watch: {
        // filterText(val){
        //     this.$refs.tree.filter(val);
        // }
    },
    beforeCreate(){
        
    },
    created(){
        this.$parent.$emit('currentPage','/base/roleAuth');
        getRcCodeList('category_base_auth_role', this.codeList).then(() => {
            this.getUnitTree();
            this.getResoureTree();
        })  
    },
    methods:{
        // 新增展开收缩树
        changeExpande(t){
            if(t === 'unexpend'){
                // 收缩
                this.isExpendAll = false;
            }else{
                // 展开
                this.isExpendAll = true;
            }
        },
        checkedNode(nodes){
            console.log(nodes);
            this.currentChexedKeys = _.map(nodes.allCeckNodes, 'id');
        },
        handleSelectable(row,index){
            // return row.roleType === 0 ? true : false;
            return true
        },
        // 过滤
        handleIconClick() {
            this.$refs.tree.filter(this.filterText);
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        // 获得单位数
        getUnitTree(){
            this.emptyTreeText = '正在加载中...';
            getUnitTree().then((data)=>{
                if(data && data.data.length>0){
                    this.oldTreeData = _.cloneDeep(data.data);
                    if (this.oldTreeData.length === 1 && this.oldTreeData[0].unitType === 2) {
                        this.isHiddenTree = false;
                    } else {
                        this.isHiddenTree = true;
                    }
                    this.treeData = this.$data2tree(data.data, 'unitId', 'parentId');
                    this.currentUnitId = data.data[0].unitId;
                    this.getRolesList();
                }else{
                    this.emptyTreeText = '暂无数据';
                }
            })
        },
        // 授权树
        getResoureTree(){
            getResoureTree(this.$store.state.unitId).then((data)=>{
                if(data && data.data.length>0){
                    this.resoureTreeData = data.data;
                }
            })
        },
        // 单位树点击
        handleNodeClick(data) {
            // console.log(data);
            this.currentUnitId = data.unitId;
            this.getRolesList();
        },
        // 组织资源授权的选中的id集合
        getChoiceOrgresource(){
            getChoiceOrgresource().then((data)=>{
                // console.log(data);
            })
        },
        // 获取角色列表
        getRolesList(){
            this.tableData = [];
            this.emptyText = '正在加载中...';
            getRolesList(this.currentUnitId).then((data)=>{
                // console.log(data);
                if(data && data.data && data.data.length>0){
                    data.data.forEach((_d,i)=>{
                        _d.number = i*1+1;
                        this.tableData.push(_d);
                    })
                }else{
                     this.tableData = [];
                     this.emptyText = '暂无数据';
                }
            })
        },
        // 打开弹出框
        openDialog(){
            this.saveBtn = false;
            this.currentChexedKeys = [];
            this.defaultChecked = [];
            this.addNewRoleDialog = true;
            this.$emptyObj(this.form);
            this.$refs.form.resetFields();
            this.form.status = 1;
            // this.$refs.suthtree.setCheckedKeys([]);
        },
        // 新增角色
        addnewRole(){
            // let resArr = this.$refs.suthtree.getCheckedKeys();
            let resArr = this.currentChexedKeys;
            let obj = {
                name: this.form.name,
                status: this.form.status,
                sort: this.form.sort,
                unitId: this.currentUnitId,
                memo: this.form.memo,
                resIds: resArr.join(','),
                userIds: this.form.userIds
            }
            this.saveBtn = true;
            addnewRole(obj).then((data)=>{
                this.saveBtn = false;
                if(data && data.code == 'ok'){
                    this.$notify({
                        message: '角色新增成功！',
                        type: 'success'
                    });
                    this.addNewRoleDialog = false;
                    this.getRolesList();
                }
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // let isType = _.find(this.multipleSelection, function(o){ return o.roleType > 0});
            // this.isGorlsAuth = isType ? true : false;
        },
        // 编辑
        openEditeDialog(row){
            this.currentRoleId = row.id;
            if(row.roleType*1 > 0){
                this.isdisabled = true;
            }else{
                this.isdisabled = false;
            }
            getRoleById(row.id).then((data)=>{
                // console.log(data);
                if(data && data.data){
                    this.oldeditform = _.cloneDeep(data.data);
                    this.editform.id = data.data.id;
                    this.editform.memo = data.data.memo;
                    this.editform.businessType = data.data.businessType;
                    this.editform.status = data.data.status;
                    this.editform.name = data.data.name;
                    this.editform.roleType = data.data.roleType;
                    this.editform.sort = data.data.sort;
                    this.editform.unitId = data.data.unitId;
                    this.editform.usernames = _.map(data.data.users, 'realName').join('、');
                    this.$refs.textarea.setCurrentValue(_.map(data.data.users, 'realName').join('、'));
                    this.editform.userids = _.map(data.data.users, 'id');
                    this.roleName = data.data.name;
                }        
                this.editDialog = true;
            })
        },
        // 打开选人控件
        openEditSelects(t){
            // console.log(this.$refs.textarea);
            this.$SelectUsers({
                unitType: 1,
                selectUserType: 2,
                unitId: this.currentUnitId,
                selectUserIds: this.editform.userids
            },(selectUser,instance)=>{
                
                let aids = _.map(selectUser, 'id');
                let anames = _.map(selectUser, 'realName').join('、');
                // console.log('asdfasfasdf',anames);
                this.$refs.textarea.setCurrentValue(anames);
                this.editform.userids = aids;
                // setTimeout(()=>{
                //     this.editform.userids = aids;
                //     this.editform.usernames = anames.join('、');  
                // },500)
            })
        },
        openSelects(){
            this.$SelectUsers({
                unitType: 1,
                selectUserType: 2,
                unitId: this.currentUnitId,
                selectUserIds: []
            },(selectUser,instance)=>{
                let ids = _.map(selectUser, 'id');
                let names = _.map(selectUser, 'realName');
                this.form.userIds = ids.join(',');
                this.form.userNames = names.join('、');
            })
        },
        // 提交修改
        submitUpdata(){
            let obj = {
                id: this.editform.id,
                name: this.editform.name,
                status: this.editform.status,
                sort: this.editform.sort,
                memo: this.editform.memo,
                unitId: this.currentUnitId,
                userIds: this.editform.userids.join(',')
            }
            if(this.isdisabled){
                this.updataRoleMsg(obj);
            }else{
                if(this.roleName === this.editform.name){
                    this.updataRoleMsg(obj);
                }else{
                    this.$refs['editform'].validate((valid) => {
                        if (valid) {
                            this.updataRoleMsg(obj);
                        } else {
                            return false;
                        }
                    });
                }
            }
            
        },
        updataRoleMsg(obj){
            this.editBtn = true;
            updataRole(obj).then((data)=>{
                console.log(data);
                this.editBtn = false;
                if(data && data.code == 'ok'){
                    this.$notify({
                        title: '成功',
                        message: '角色编辑成功！',
                        type: 'success'
                    });
                    this.editDialog = false;
                    this.getRolesList();
                }else{
                    this.$notify({
                        message: data.message,
                        type: 'error'
                    });
                }
            })
        },
        // 提交信息并关闭弹出框
        submitForm(t){
            if(t === 'add'){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.addnewRole();
                    } else {
                        return false;
                    }
                });
            }
        },
        // 打开授权弹出框
        openAuthDialog(row){
            this.$refs.restree.setCheckedKeys([]);
            this.currentRoleId = row.id;
            this.moreRoles = false;
            if(row && row.id){
                this.emptyauthText = '正在加载中...';
                getResoureTree(this.currentUnitId).then((data)=>{
                    if(data && data.code === 'ok' &&data.data.length>0){
                        this.resoureTreeData = data.data;
                        getRoleRresMinix(row.id,row.unitId).then((data)=>{
                            if(data && data.data && data.data.length>0){
                                this.$refs.restree.setCheckedKeys(data.data);
                            }else{
                                this.$refs.restree.setCheckedKeys([]);
                            }
                            this.authRoleDialog = true;
                        })
                    }else{
                        this.resoureTreeData = [];
                        this.emptyauthText = '暂无数据';
                    }
                })
            }
        },
        // 提交授权
        submitAuth(){
            let roleIds = '';
            let resIds = this.$refs.restree.getCheckedKeys();
            if(this.moreRoles){
                let arr = _.map(this.multipleSelection, 'id');
                roleIds = arr.join(',')
            }else{
                roleIds = this.currentRoleId;
            }
            this.authBtn = true;
            roleRresMinix(this.currentUnitId,roleIds,resIds.join(',')).then((data)=>{
                this.authBtn = false;
                if(data && data.data && data.data === 'success'){
                    this.$notify({
                        title: '成功',
                        message: '授权成功！',
                        type: 'success'
                    });
                    this.authRoleDialog = false;
                }
            })
        },
        // 操作
        handleClick(t){
            let ids = _.map(this.multipleSelection, 'id');
            let isType = _.find(this.multipleSelection, function(o){ return o.roleType > 0});
            if(ids.length === 0){
                return;
            };
            if(t === 'delete'){
                if(isType){
                    this.$notify({
                        title: '警告',
                        message: '内置角色不能删除，请重新选择',
                        type: 'warning'
                    });
                }else{
                    this.$confirm('您确定要删除吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.deleteBtn = true;
                        deleteRoles(ids.join(',')).then((data)=>{
                            this.deleteBtn = false;
                            if(data && data.code === 'ok'){
                                this.$notify({
                                    title: '成功',
                                    message: '删除成功！',
                                    type: 'success'
                                });
                                this.getRolesList();
                            }
                        })
                    }).catch(() => {

                    });
                }
            }else if(t === 'give'){
                if(this.multipleSelection.length>0){
                    this.moreRoles = true;
                    // console.log(this.multipleSelection);
                    let isActive = _.find(this.multipleSelection, {status: 0})
                    if(isActive){
                        this.$notify({
                            title: '警告',
                            message: '未激活的角色不能授权',
                            type: 'warning'
                        });
                    }else{
                        this.$refs.restree.setCheckedKeys([]);
                        let rolesIds = _.map(this.multipleSelection, 'id');
                        getResoureTree(this.currentUnitId).then((data)=>{
                            if(data && data.code === 'ok' &&data.data.length>0){
                                this.resoureTreeData = data.data;
                                getRoleRresMinix( rolesIds.join(','),this.currentUnitId).then((data)=>{
                                    if(data && data.data && data.data.length>0){
                                        this.$refs.restree.setCheckedKeys(data.data);
                                    }else{
                                        this.$refs.restree.setCheckedKeys([]);
                                    }
                                    this.authRoleDialog = true;
                                })
                            }else{
                                this.resoureTreeData = [];
                            }
                        })
                    }
                    
                }
            }else if(t === 'lock'){
                if(isType){
                    this.$notify({
                        title: '警告',
                        message: '内置角色不能锁定！',
                        type: 'warning'
                    });
                }else{
                    this.$confirm('您确定要锁定吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if(ids){
                            lockRole(ids.join(',')).then((data)=>{
                                if(data && data.code === 'ok'){
                                    this.$notify({
                                        title: '成功',
                                        message: '成功锁定！',
                                        type: 'success'
                                    });
                                    this.getRolesList();
                                }
                            }) 
                        }
                    }).catch(() => {

                    });
                    
                }
            }else if(t === 'unlock'){
                if(isType){
                    this.$notify({
                        title: '警告',
                        message: '内置角色不能激活！',
                        type: 'warning'
                    });
                }else{
                    if(ids){
                        unlockRole(ids.join(',')).then((data)=>{
                            if(data && data.code === 'ok'){
                                this.$notify({
                                    title: '成功',
                                    message: '成功激活！',
                                    type: 'success'
                                });
                                this.getRolesList();
                            }
                        })
                    }
                }
            }
        }

    }
}
</script>

<style>
    .sy-base-role-auth .sy-header-right{
        background-color: #ffffff!important
    }
    .tree-style .sy-ztree {
        background-color: #fff;
    }
</style>
