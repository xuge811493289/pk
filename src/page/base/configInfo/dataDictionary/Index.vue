<template>
  <div class="content">
    <sy-grad-4 :border="false">
      <div slot="headerRight" class="left1">
        <span style="font-weight: normal">维护字段：</span>
        <el-input v-model="value" size="small" style="width: auto" placeholder="输入维护字段名称查询"
                  @keyup.enter.native="inquiry"></el-input>
        <el-button style="margin-left: 5px" size="small" @click="inquiry">查询</el-button>
      </div>
      <div slot="bodyRight" style="width:100%; height:100%; padding:0 10px 0 10px">
        <el-table
          :data="tableData"
          border
          height="100%"
          :empty-text="emptyText"
          style="width:100%; height:100%">
          <el-table-column label="序号"
                           prop="sort">
          </el-table-column>
          <el-table-column v-for="item in tableList"
                           :type="item.type"
                           :label="item.label"
                           :prop="item.prop"
                           :key="item.prop"
                           :width="item.width">
          </el-table-column>
          <el-table-column label="操作" width="100" align="center" header-align="center">
            <template scope="scope">
              <!--<el-tooltip effect="light" content="查看维护" placement="right">-->
              <el-button
                v-if="codeList.category_base_details"
                type="text"
                @click="toDataDic(scope.$index,scope.row)">
                <i class="fa fa-cogs" aria-hidden="true" title="查看维护"></i>
              </el-button>
              <!--</el-tooltip>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-pagination
          v-if="isvisible"
          style="text-align: right;margin-top: 4px"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </sy-grad-4>
  </div>
</template>

<script>
  import _ from 'lodash';
  import config from './indexConfig.js';
  import pager from '../../config.js';
  import {getRcCodeList} from '../../request.js';

  export default {
    name: 'app',
    components: {},
    data () {
      return {
        emptyText: "正在加载中...",
        codeId: "",
        tableList: config.tableList,
        value: "",
        tableData: [],
        currentPage: 1,
        pageSize: window.ShiYue.pageSize,
        currentSize: 0,
        total: 0,
        allData: [],
        isvisible: false,
        codeList: {
          'category_base_details': false
        }
      }
    },
    beforeCreate(){

    },
    created(){
      this.$parent.$emit('currentPage', '/base/dataDictionary');
      getRcCodeList('category_base_dictionary', this.codeList).then(() => {
        this.getTableData();
        this.isvisible = true;
      });
    },
    methods: {
      toDataDic(index, row){
        this.codeId = row.id;
        this.$router.push({path: '/base/dataDicTurnTo/' + this.codeId});
      },
      handleCurrentChange(val) {
        this.getTableData(val);
      },
      inquiry(){
        this.getTableData();
      },
      getTableData(currentPage = 1){
        this.emptyText = "正在加载中...";
        this.tableData = [];
        if (this.value) this.value = this.value.trim();
        config.getTableData({
          keyword: this.value,
          page: currentPage,
          size: 30
        }).then((data) => {
          this.emptyText = "暂无数据";
          if (data && data.status == 200) {
            this.total = data.data.total;
            this.currentPage = data.data.pageNum;
            this.currentSize = data.data.size;
            let data0 = data.data.list;
            for (let i = 0; i < data0.length; i++) {
              data0[i].sort = i + 1 + (this.currentPage - 1) * this.pageSize;
              this.tableData.push(data0[i]);
            }
          }

        });
      }
    },
  }
</script>

<style scoped>
  .content {
    position: absolute;
    top: 0px;
    width: 100%;
    bottom: 0;
  }

  .left1 {
    line-height: 40px;
  }

  .pagination {
    text-align: center;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    height: 45px;
    box-sizing: border-box;
    padding-top: 10px;
  }

  .table-rightbody {
    position: absolute;
    max-height: 100%;
    left: 10px;
    right: 10px;
    width: auto;
    height: auto;
    margin-top: 5px;
    overflow: hidden;
  }
</style>
