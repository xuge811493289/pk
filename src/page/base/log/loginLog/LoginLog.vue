<template>
    <div class="app-container-box">
        <sy-grad-4 :border="false">
            <div slot="headerRight">
                <div class="sy-row">
                    <span class="sy-condition">
                        全部时间：
                        <el-select v-model="period" @change="periodChange" class="sy-condition-width ">
                            <el-option v-for="item in periods" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </span>
                    <span class="sy-condition">
                        操作人：
                        <el-input v-model="name" size="small" placeholder="请输入操作人" class="sy-condition-width "></el-input>
                    </span>
                    <span class="sy-condition">
                        是否操作成功：
                        <el-select v-model="state" @change="stateChange" class="sy-condition-width ">
                            <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </span>
                    <span class="sy-condition">
                        <el-button @click="search" size="small">查询</el-button>
                    </span>
                </div>
            </div>
            <div slot="bodyRight">
                <div class="full-parent-height">
                    <el-table :data="tableData" :empty-text="emptyText"
     border height="100%" style="width:100%;height:100%;">
    <el-table-column v-for="item in appColumn" :key="item.prop" :label="item.label" :align="item.align" :width="item.width">
        <template scope="scope">
            <span v-if="item.prop === 'logSuc'" :style="{color: scope.row[item.prop] === '失败' ? '#f00' : ''}">{{scope.row[item.prop]}}</span>
            <span v-else>{{scope.row[item.prop]}}</span>
        </template>
    </el-table-column>
    </el-table>
    </div>
    </div>
    <div slot="footer">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" class="pagination-mf" layout="total, prev, pager, next" :total="total">
        </el-pagination>
    </div>
    </sy-grad-4>
    </div>
</template>
<script>
import config from './config.js';
import pager from '../../config.js';/*引入分页*/
import { getlogList } from '../request.js';
import { getRcCodeList } from '../../request.js';
export default {
    name: 'loginLog',
    components: {

    },
    data() {
        return {
            emptyText: '正在加载中...',
            period: 'ALL',
            name: '',
            state: '',
            periods: config.periods,
            states: config.states,
            tableData: [],
            appColumn: config.appColumn,
            currentPage: 1,
            //pageSizes: pager.pageSizes,可选择显示的每页条数数组
            pageSize: pager.pageSize,//每页显示多少条数据
            total: 0,//总数据
            codeList: {
                category_base_log_operating: false
            },
        }
    },
    created() {
        getRcCodeList('category_base_log', this.codeList).then(() => {
             this.$parent.$emit('currentPage', '/base/loginLog');/*刷新后页面和左侧栏目都保持在当前的状态*/
            if (this.period && this.currentPage && this.pageSize) {
                this.getlogList({ period: this.period, start: this.currentPage, size: this.pageSize, requestUri: '/oauth/login' });
            }
        })
    },
    methods: {
        getlogList(parm) {
            this.tableData = [];
            getlogList(parm).then((res) => {
                if (res.data && res.data.list && res.data.list.length > 0) {
                    this.total = res.data.total ? res.data.total : this.total;
                    this.tableData = [];//如果没有搜索到匹配的内容，将表格内容清空
                    res.data.list.forEach((val) => {
                        this.tableData.push({
                            userName: val.nickName ? val.realName + "（" + val.nickName + "）" : val.realName,
                            loginIp: val.clientIp,
                            logDetails: val.modular,//操作模块
                            logging: val.logging,//操作内容
                            logSuc: val.successful == 1 ? "成功" : "失败",
                            logRequestTime: val.requestTime,
                        })
                    })
                } else {
                    this.emptyText = '';
                }
            })
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            if (this.period && this.currentPage && this.pageSize) {
                this.name = this.name.trim();
                if (this.name) {
                    if (this.state) {
                        this.getlogList({ period: this.period, accounts: this.name, start: this.currentPage, size: this.pageSize, requestUri: '/oauth/login', successful: this.state });
                    } else {
                        this.getlogList({ period: this.period, accounts: this.name, start: this.currentPage, size: this.pageSize, requestUri: '/oauth/login' });
                    }

                } else {

                    if (this.state) {
                        this.getlogList({ period: this.period, start: this.currentPage, size: this.pageSize, requestUri: '/oauth/login', successful: this.state });
                    } else {
                        this.getlogList({ period: this.period, start: this.currentPage, size: this.pageSize, requestUri: '/oauth/login' });
                    }
                }
            }
        },
        periodChange() {
            if (this.period && this.currentPage && this.pageSize) {
                this.name = this.name.trim();
                if (this.name) {
                    if (this.state) {
                        this.getlogList({ period: this.period, accounts: this.name, start: this.currentPage, size: this.pageSize, requestUri: '/oauth/login', successful: this.state });
                    } else {
                        this.getlogList({ period: this.period, accounts: this.name, start: this.currentPage, size: this.pageSize, requestUri: '/oauth/login' });
                    }
                } else {
                    if (this.state) {
                        this.getlogList({ period: this.period, start: this.currentPage, size: this.pageSize, requestUri: '/oauth/login', successful: this.state });
                    } else {
                        this.getlogList({ period: this.period, start: this.currentPage, size: this.pageSize, requestUri: '/oauth/login' });
                    }
                }
            }
        },
        search(formName) {
            if (this.period && this.currentPage && this.pageSize) {
                this.name = this.name.trim();
                if (this.name) {
                    if (this.state) {
                        this.getlogList({ period: this.period, accounts: this.name, start: this.currentPage, size: this.pageSize, requestUri: '/oauth/login', successful: this.state });
                    } else {
                        this.getlogList({ period: this.period, accounts: this.name, start: this.currentPage, size: this.pageSize, requestUri: '/oauth/login' });
                    }
                } else {
                    if (this.state) {
                        this.getlogList({ period: this.period, start: this.currentPage, size: this.pageSize, requestUri: '/oauth/login', successful: this.state });
                    } else {
                        this.getlogList({ period: this.period, start: this.currentPage, size: this.pageSize, requestUri: '/oauth/login', });
                    }
                }
            }
        },
        stateChange() {
            if (this.period && this.currentPage && this.pageSize) {
                this.name = this.name.trim();
                if (this.name) {
                    if (this.state) {
                        this.getlogList({ period: this.period, accounts: this.name, start: this.currentPage, size: this.pageSize, requestUri: '/oauth/login', successful: this.state });
                    } else {
                        this.getlogList({ period: this.period, accounts: this.name, start: this.currentPage, size: this.pageSize, requestUri: '/oauth/login', });
                    }
                } else {
                    if (this.state) {
                        this.getlogList({ period: this.period, start: this.currentPage, size: this.pageSize, requestUri: '/oauth/login', successful: this.state });
                    } else {
                        this.getlogList({ period: this.period, start: this.currentPage, size: this.pageSize, requestUri: '/oauth/login', });
                    }
                }
            }
        }
    }
}
</script>
<style tyle="text/css" scoped>
.box-header {
    text-align: left
}

.sy-condition-width {
    width: 10%;
    padding-top: 5px
}

.sy-condition-width .el-input,
.sy-condition-width .el-input__inner {
    width: 100%;
}
</style>

