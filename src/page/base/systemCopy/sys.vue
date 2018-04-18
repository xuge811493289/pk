<template>
  <div class="app-container-box" >
    <sy-grad-4 :border="false">
      <div slot="headerRight" class="line-height-56 right">
        <el-button type="" size="small" @click="cloneVisible=true">添加备份</el-button>
      </div>
      <div slot="bodyRight" style="padding:0 10px;height:100%;">
        <el-table
          :data="appData"
          border
          height="100%"
          style="height:100%;">
          <el-table-column
            prop="name"
            width="300"
            label="备份名称">
          </el-table-column>
          <el-table-column
            align="center"
            prop="time"
            width="150"
            label="备份时间">
          </el-table-column>
          <el-table-column
            align="center"
            prop="type"
            width="100"
            label="备份内容">
            <template scope="scope">
              <span>{{scope.row.type == 1 ? '系统数据' : scope.row.type == 2 ? '资源数据' : ''}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="path"
            label="备份路径">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="70">
            <template scope="scope">
              <el-button type="text" size="small" @click="handleRemove(scope.$index, scope.row)">
                <i class="el-icon-delete" style="color:#f00" title="删除"></i>
              </el-button>
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
    <sy-dialog
      title="添加备份"
      position="middle"
      height="26%"
      slide="fade"
      width="360px"
      :closeOnClickModal="false"
      :visible.sync="cloneVisible">
      <div slot="body">
          <div class="sy-div-cloneApp">
            <span class="sy-span-cloneL">主题：</span>
            <span>{{dataFormat}}</span>
          </div>
          <div class="sy-div-cloneApp">
            <span class="sy-span-cloneL">备份内容：</span>
            <el-radio-group v-model="radio" style="display: inline-block;">
              <el-radio :label="1">系统数据</el-radio>
              <el-radio :label="2">资源数据</el-radio>
            </el-radio-group>
          </div>
      </div>
      <div slot="footer">
        <el-button type="primary" :loading="submitBrn" @click="submit">本地服务器备份</el-button>
      </div>
    </sy-dialog>
  </div>
</template>

<script>
import _ from "lodash";
import { getSYScopyList, saveSYScopy, deleteSYScopy } from "./request.js";
import config from "./config.js";

export default {
  name: "",
  components: {},
  data() {
    let currentDate = new Date();
    let Y = currentDate.getFullYear();
    let M = currentDate.getMonth() * 1 + 1;
    let D = currentDate.getDate();
    return {
      dataFormat: `${Y}年${M}月${D}日备份`,
      cloneVisible: false,
      submitBrn: false,
      appData: [],
      radio: 1,
      defaultProps: {
        label: "label",
        children: "children"
      },
      listParmars: {
        // 列表参数
        start: 1,
        size: 30
      },
      totals: 0
    };
  },
  beforeCreate() {},
  created() {
    this.$parent.$emit("currentPage", "/base/sysCopy");
    this.getList();
  },
  methods: {
    getList() {
      getSYScopyList(this.listParmars).then(data => {
        if (data && data.code === "ok") {
          console.log(data);
          this.appData = data.data.list;
          this.totals = data.data.toatal;
        }
      });
    },
    // 切换分页
    handleCurrentChange(val) {
      this.listParmars.start = val;
      this.getList();
    },
    submit() {
      this.submitBrn = true;
      saveSYScopy({
        type: this.radio
      }).then(data => {
        this.submitBrn = false;
        if (data && data.code === "ok" && data.data === "success") {
          this.$notify({
            title: "成功",
            message: "备份成功！",
            type: "success"
          });
          this.cloneVisible = false;
          this.getList();
        } else {
          this.$notify({
            title: "失败",
            message: data.fieldErrors,
            type: "error"
          });
        }
      });
    },
    handleRemove(index, row) {
      this.$confirm("是否继续删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteSYScopy(row.id).then(data => {
          if (data && data.code === "ok" && data.data === "success") {
            this.$notify({
              title: "成功",
              message: "删除成功！",
              type: "success"
            });
            this.getList();
          } else {
            this.$notify({
              title: "失败",
              message: data.fieldErrors,
              type: "error"
            });
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.sy-div-appCenter {
  padding: 20px 30px;
}
.sy-div-appCenter .sy-div-addClone {
  overflow: hidden;
}
.sy-i-iconHandle {
  display: inline-block;
  color: #20a0ff;
  font-size: 14px;
  line-height: 24px;
  margin-right: 5px;
}
.sy-div-cloneApp {
  height: 50px;
  line-height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
}

.sy-span-cloneL {
  background: #eef3f6;
  text-align: center;
  display: inline-block;
  width: 20%;
  height: 50px;
  padding: 0 8px;
  border-right: 1px solid #ccc;
}
</style>
