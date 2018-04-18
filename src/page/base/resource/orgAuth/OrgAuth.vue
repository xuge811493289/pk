<template>
    <div class="app-container-box">
        <sy-grad-4>
            <div slot="headerLeft">
                <span>单位</span>
            </div>
            <div slot="headerRight" class="line-height-56">
                <span>授权</span>
            </div>
            <div slot="bodyLeft" style="padding: 0;">
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
                            :data="data" 
                            :props="defaultProps"
                            :empty-text="emptyTreeText"
                            ref="unitTree"
                            node-key="id" 
                            style="border:0;"
                            class="full-parent"
                            :highlight-current="true"
                            :filter-node-method="filterNode"
                            :current-node-key="currentUnitId"
                            :default-expanded-keys="defaultExpandedKeys"
                            @node-click="handleNodeClick">
                        </el-tree>
                    </div>
                </sy-grad-4>
            </div>
            <div slot="bodyRight" style="padding: 0;">
                <sy-grad-4>
                    <div slot="bodyRight" style="padding:0;overflow-y:auto;">
                        <!-- <el-tree 
                            :data="resoureTreeData" 
                            :props="defaultProps"
                            ref="tree"
                            @check-change="handleCheckChange"
                            show-checkbox
                            node-key="id" 
                            style="border:0;overflow:auto;left:0;right:0;"
                            class="full-parent-height"
                            highlight-current
                            default-expand-all
                            :default-checked-keys="defaultCheckedKey">
                        </el-tree> -->
                        <sy-ztree 
                            :treeData="resoureTreeData"
                            :chkboxType="chkboxType"
                            :defaultChecked="defaultChecked"
                            :isExpendAll="isExpendAll"
                            @checked-node="checkedNode"
                            showCheckBox>
                        </sy-ztree>
                    </div>
                    <div slot="footer" class="left">
                        <el-button type="" size="small" :disabled="isDisabled" @click="changeExpande('save')" v-if="codeList['btn_base_auth_org_add']">保存</el-button>
                        <el-button type="" size="small" @click="changeExpande('expend')">展开</el-button>
                        <el-button type="" size="small" @click="changeExpande('unexpend')">收缩</el-button>
                    </div>
                </sy-grad-4>
                
            </div>
        </sy-grad-4>
    </div>
</template>

<script>
import _ from 'lodash';
import config from './config.js';
import {getTree,getResoureTree,getChoiceOrgresource,saveOrgRes} from '../request.js';
import {getRcCodeList} from '../../request'
export default {
    name: 'teacher',
    components: {
        
    },
    data () {
        return {
            chkboxType: {
                "Y": "ps", 
                "N": "s" 
            },
            emptyTreeText: '正在加载中...',
            defaultChecked: [],
            currentChexedKeys: [],
            isExpendAll: true,
            inputValue: '',
            getAuthList: false,
            isDisabled: true,
            data: [],
            resoureTreeData: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            isexpand: true,
            defaultExpandedKeys: [],
            defaultExpandedAll: false,
            defaultCheckedKey: [],
            expandedKeys: [],
            oldTreeData: '',
            currentUnitId: '',
            orgId: '',
            currentType: '',
            oldResoureTreeData: [],
            codeList: {
                btn_base_auth_org_add: false, //  保存
                btn_base_auth_org_slowup: false, //  展开
                btn_base_auth_org_slowdown: false //  收缩
            }
        }
    },
    beforeCreate(){
        
    },
    created(){
        this.$parent.$emit('currentPage','/base/orgAuth');
        getRcCodeList('category_base_auth_org', this.codeList).then(() => {
            this.getTree();
        }) 
    },
    watch:{
        // inputValue: function(val) {
        //     if (val) {
        //         this.$refs.unitTree.filter(val);
        //     } else {
        //         this.getTree();
        //     }
        // }
    },
    methods:{
        checkedNode(nodes){
            this.currentChexedKeys = _.map(nodes.allCeckNodes, 'id');
            console.log(this.currentChexedKeys);
        },
        handleCheckChange(data, checked, indeterminate){
            let cId = data.id;
            let pId = data.parentId;
            let arr = [cId];
            let d = ()=>{
                if(checked){
                    if(pId){
                        let pdata = _.find(this.oldResoureTreeData,{id:pId});
                        arr.push(pdata.id);
                        pId = pdata.parentId;
                        if(pId){
                            d();
                        }else{
                            return;
                        }
                    }else{
                        arr = [cId];
                    }
                }else{
                    arr = [];
                }
            }
       
        },
        handleIconClick() {
            if (this.inputValue) {
                this.$refs.unitTree.filter(this.inputValue);
            } else {
                this.getTree();
            }
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        make(datas, idprop, pIdprop){
            if (!idprop) {
                idprop = 'id';
            }
            if (!pIdprop) {
                pIdprop = 'parentId';
            }
            let nodes = [];
            let subNodes = [];
            let c = function(obj) {
                let _c = [];
                for (let i = 0; i < datas.length; i++) {
                    let _d = _.cloneDeep(datas[i]);
                    if (_d[pIdprop + ''] == obj[idprop + '']) {
                        _c.push(_d);
                        c(_d);
                    }
                }
                obj.children = _.sortBy(_c, function(item) {
                    return item.sort;
                });
                // obj.children = _c.sort((a,b)=>{return a.sort>b.sort});
            };
            for (let i = 0; i < datas.length; i++) {
            let _d = _.cloneDeep(datas[i]);
                if ((!_d[pIdprop + ''] && _d[pIdprop + ''] != '') || (!_.result(_.find(datas, {[idprop]: _d[pIdprop + '']}), idprop))) {
                    c(_d);
                    nodes.push(_d);
                }
            }
            return nodes;
        },
        // 获取组织架构树
        getTree(){
            this.emptyTreeText = '正在加载中...';
            getTree().then((data)=>{
                console.log('data',data.data);
                if(data && data.data.length>0){
                    this.oldTreeData = _.cloneDeep(data.data);
                    this.data = this.make(data.data, 'domId', 'domPid');
                    this.currentUnitId = this.data[0].id;
                    this.defaultExpandedKeys = [this.data[0].id];
                    this.getResoureTree(this.currentUnitId);
                    this.getChoiceOrgresource(this.currentUnitId);
                }else{
                    this.emptyTreeText = '暂无数据';
                }
            })
        },
        // 授权资源树
        getResoureTree(id){
            getResoureTree(id).then((data)=>{
                if(data && data.data.length>0){
                    this.resoureTreeData = data.data;
                    this.oldResoureTreeData = [];
                    let s = (arr)=>{
                        if(arr.length>0){
                            arr.forEach((_a,i)=>{
                                this.oldResoureTreeData.push(_a)
                                if(_a.children.length>0){
                                    s(_a.children)
                                }
                            })
                        }else{
                            return
                        }
                    }
                    s(data.data);
                }
            })
        },
        // 组织资源授权的选中的id集合
        getChoiceOrgresource(id){
            this.defaultChecked = [];
            getChoiceOrgresource(id).then((data)=>{
                if(data && data.data){
                    // this.$refs.allTree.setCheckedKeys(data.data);
                    // this.$refs.tree.setCheckedKeys(data.data);
                    this.defaultChecked = data.data;
                }else{
                    // this.$refs.allTree.setCheckedKeys([]);
                    // this.$refs.tree.setCheckedKeys([]);
                    this.defaultChecked = [];
                }
            })
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        // 展开收缩
        changeExpande(t){
            if(t === 'expend'){
                // this.$refs.allTree.setCheckedKeys(uniq);
                this.isExpendAll = true;
            }else if(t === 'unexpend'){
                this.isExpendAll = false;
                // this.$refs.tree.setCheckedKeys(uniq);
            }else if(t === 'save'){
                // 保存授权
                let obj = {
                    unitId: this.currentUnitId,
                    orgIds: this.orgId,
                    resIds: this.currentChexedKeys.join(',')
                    // resIds: this.$refs.tree.getCheckedKeys().join(',')
                }
                if(this.currentType === 'organization'){

                    saveOrgRes(obj).then((data)=>{
                        if(data && data.code === 'ok'){
                            this.$notify({
                                title: '成功',
                                message: '保存成功',
                                type: 'success'
                            });
                            this.currentChexedKeys = [];
                            this.getChoiceOrgresource(this.orgId);
                        }
                    })
                }else{
                    this.$notify.info({
                        title: '提示',
                        message: '请选择部门授权'
                    });
                }       
            }
        },
        handleNodeClick(data) {
            console.log(data);
            this.currentChexedKeys = [];
            if(data.type === 'organization'){
                this.currentType = 'organization';
                this.currentUnitId = data.unitId;
                this.orgId = data.id;
                this.isDisabled = false;
                this.getChoiceOrgresource(data.id);
                this.getResoureTree(this.currentUnitId);
            }else if(data.type === 'unit'){
                this.currentType = 'unit';
                this.currentUnitId = data.id;
                this.isDisabled = true;
                this.orgId = '';
                this.getResoureTree(this.currentUnitId);
            }else if(data.type === 'root'){
                this.currentType = 'unit';
                this.currentUnitId = data.id;
                this.isDisabled = true;
                this.orgId = '';
                this.getResoureTree(this.currentUnitId);
            }
        }
    }
}
</script>

<style scoped>
</style>
