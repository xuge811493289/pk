<template>
    <div class="app-container-box">
        <sy-grad-4>
            <div slot="headerLeft" v-if="isHiddenTree">
                <span>单位</span>
            </div>
            <div slot="bodyLeft" style="padding: 0;" v-if="isHiddenTree">
                <sy-grad-4 :border="false">
                    <div slot="headerRight" class="line-height-56" style="background:#fff;">
                        <el-input
                            placeholder="请输入关键字"
                            icon="search"
                            @keyup.enter.native="handleIconClick"
                            v-model.trim="filterText"
                            size="small"
                            :on-icon-click="handleIconClick">
                        </el-input>
                    </div>
                    <div slot="bodyRight">
                        <el-tree 
                            :data="treeData" 
                            :props="defaultProps"
                            node-key="unitId" 
                            ref="tree"
                            :empty-text="emptyTreeText"
                            :current-node-key="currentUnitId"
                            style="border:0;"
                            class="full-parent"
                            :highlight-current="true"
                            default-expand-all
                            :filter-node-method="filterNode"
                            :default-expanded-keys="[2, 3, 4]"
                            @node-click="handleNodeClick">
                        </el-tree>
                    </div>
                </sy-grad-4>
            </div>
            <div slot="headerRight" class="line-height-56">
                <span>关键字：</span>
                <el-input 
                    v-model.trim="keyword" 
                    placeholder="输入账号或姓名" 
                    size="small" 
                    @keyup.enter.native="handleSearch"
                    style="width:200px;paddingRight: 10px;"></el-input>
                <el-button type="" size="small" @click="handleSearch">查询</el-button>
            </div>
            <div slot="bodyRight" style="padding: 0;">
                <sy-grad-4 :border="false">
                    <div slot="bodyRight" style="padding: 5px 10px 0;">
                        <el-table
                            :data="tableData"
                            border
                            :empty-text="emptyText"
                            height="100%"
                            style="width:100%;height:100%;"
                            >
                            <el-table-column
                                v-for="item in tableColums"
                                :key="item.prop"
                                :prop="item.prop"
                                :label="item.label">
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                align="center"
                                width="70">
                                <template scope="scope">
                                    <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small" v-if="codeList['btn_base_permissionshow_show']"><i class="fa fa-eye" aria-hidden="true" title="查看权限" ></i></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div slot="footer">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="parmas.page"
                            :page-size="parmas.size"
                            class="pagination-mf"
                            layout="total, prev, pager, next"
                            :total="total">
                        </el-pagination>
                    </div>
                </sy-grad-4>
            </div>
        </sy-grad-4>
        <sy-dialog
            title="用户权限"
            height="50%"
            width="300px"
            position="middle"
            slide="fade"
            :visible.sync="authorityDialog">
            <div slot="body">
                <el-tree 
                    :data="data" 
                    :empty-text="emptyauthText"
                    style="border:0;"
                    :props="defaultProps">
                </el-tree>
            </div>
        </sy-dialog>
    </div>
</template>

<script>
import _ from 'lodash';
import {getUserOrgRoleList,
        getUnitTree,
        getResourceTreeByUserId} from '../request.js';
import config from './config.js';
import pager from '../../config.js';
import {getRcCodeList} from '../../request'

export default {
    name: 'teacher',
    components: {
        
    },
    data () {
        return {
            emptyText: '正在加载中...',
            emptyTreeText: '正在加载中...',
            emptyauthText: '正在加载中...',
            keyword: '',
            tableData: [],
            currentPage: 1,
            currentUnitId: '',
            treeData: [],
            pageSizes: pager.pageSizes,
            pageSize: pager.pageSize,
            tableColums: config.tableColums,
            authorityDialog: false,
            data: config.treeData,
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            total: 0,
            parmas: {
                unitId: null,
                size: pager.pageSize,
                start: 1,
                acountOrName: null
            },
            oldTreeData: [],
            filterText: '',
            isHiddenTree: false,
            codeList: {
                btn_base_permissionshow_show: false //  展示
            }
        }
    },
    beforeCreate(){
        
    },
    created(){
        this.$parent.$emit('currentPage','/base/overView');
        getRcCodeList('category_base_permissionshow', this.codeList).then(() => {
            this.getUnitTree();
        }) 
    },
    watch: {
        // filterText: function(val) {
        //     if (val) {
        //         this.$refs.tree.filter(val);
        //     } else {
        //         this.getUnitTree();
        //     }
        // }
    },
    methods:{
        // 过滤
        handleIconClick() {
            if (this.filterText) {
                this.$refs.tree.filter(this.filterText);
            } else {
                this.getUnitTree();
            }
            // this.$refs.tree.filter(this.filterText);
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
                    this.parmas.unitId = data.data[0].unitId;
                    this.getUserOrgRoleList();
                }else{
                    this.emptyTreeText = '暂无数据';
                }
            })
        },
        // 单位树点击
        handleNodeClick(data) {
            // console.log(data);
            this.currentUnitId = data.unitId;
            this.parmas.unitId = data.unitId;
            this.getUserOrgRoleList();
        },
        // 获取列表
        getUserOrgRoleList(){
            this.emptyText = '正在加载中...';
            getUserOrgRoleList(this.parmas).then((data)=>{
                this.total = data.data.total;
                if(data.data && data.data.list && data.data.list.length>0){
                    this.tableData = data.data.list;
                }else{
                    this.tableData = [];
                    this.emptyText = '暂无数据';
                }
            })
        },
        // 搜索
        handleSearch(){
            this.keyword = this.keyword.trim();
            this.parmas.acountOrName = this.keyword;
            if(this.parmas.acountOrName){
                this.getUserOrgRoleList();
            }else{
                this.parmas.acountOrName = null;
                this.getUserOrgRoleList();
            }
        },
        // 查看权限
        handleClick(index,row){
            this.emptyauthText = '正在加载中...';
            getResourceTreeByUserId(row.id).then((data)=>{
                // console.log(data);
                if(data && data.data && data.data.length>0){
                     this.data = data.data;
                }else{
                    this.data = [];
                    this.emptyauthText = '暂无数据';
                }
                this.authorityDialog = true;
            })
        },
        // 分页
        handleCurrentChange(val) {
            this.parmas.start = val;
            this.getUserOrgRoleList();
        },
    }
}
</script>

<style scoped>
</style>
