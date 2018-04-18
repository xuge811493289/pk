<!--数据字典-->
<template>
  <div class="content">
    <sy-grad-4 :border="false" footerH="10px">
      <div slot="headerRight" class="right" style="line-height: 40px">
        <el-button v-back size="small">返回</el-button>
        <el-button v-if="codeList.btn_base_details_add" size="small" @click="addData()">新增</el-button>
      </div>
      <div slot="bodyRight" style="width:100%; height:100%; padding:0px 10px 0px 10px">
        <el-table
          :data="tableData"
          border
          height="100%"
          :empty-text="emptyText"
          style="width:100%; height:100%">
          <el-table-column v-for="item in tableList"
                           :prop="item.prop"
                           :key="item.prop"
                           :width="item.width"
                           :label="item.label" :header-align="(item.prop == 'status' ? 'center' : 'left')"
                           :align="(item.prop == 'status' ? 'center' : 'left')">
            <template scope="scope">
              <span v-if="!item.hasOwnProperty('isBtn')">{{scope.row[item.prop]}}</span>
              <el-button
                v-else-if="item.hasOwnProperty('isBtn')&&codeList.btn_base_details_on"
                type="text"
                :disabled="scope.row.init"
                @click="stateChange(scope.$index,scope.row)">
                <i v-if="scope.row.status !== 0" class="fa fa-unlock" aria-hidden="true"
                   :style="{color: scope.row.init ? '#bfcbd9' : (scope.row.status === 0 ? '#ff4949' : '')}"
                   title="已启用"></i>
                <i v-else class="fa fa-unlock-alt" aria-hidden="true"
                   :style="{color: scope.row.init ? '#bfcbd9' : (scope.row.status === 0 ? '#ff4949' : '')}"
                   title="已禁用"></i>
              </el-button>
              <span v-else>
              	<i v-if="scope.row.status !== 0" class="fa fa-unlock" aria-hidden="true"
                   :style="{color: scope.row.init ? '#bfcbd9' : (scope.row.status === 0 ? '#ff4949' : '')}"
                   title="已启用"></i>
                <i v-else class="fa fa-unlock-alt" aria-hidden="true"
                   :style="{color: scope.row.init ? '#bfcbd9' : (scope.row.status === 0 ? '#ff4949' : '')}"
                   title="已禁用"></i>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="center" header-align="center" v-if="(codeList.btn_base_details_edit || codeList.btn_base_details_delete)">
            <template scope="scope">
              <!--<el-tooltip effect="light" content="修改" placement="right">-->
              <el-button
                v-if="codeList.btn_base_details_edit"
                size="small"
                type="text"
                v-show="!scope.row.init"
                @click="isvisible = true, newOrEdit = false, dialogTitle='修改',handleEdit(scope.$index, scope.row)">
                <i class="fa fa-pencil-square-o" aria-hidden="true" title="修改"></i>
              </el-button>
              <!--</el-tooltip>-->
              <!--<el-tooltip effect="light" content="删除" placement="right">-->
              <el-button
                v-if="codeList.btn_base_details_delete"
                size="small"
                type="text"
                v-show="!scope.row.init"
                @click="handleDelete(scope.$index, scope.row)">
                <i class="el-icon-delete" title="删除"></i>
              </el-button>
              <!--</el-tooltip>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
      </div>
    </sy-grad-4>
    <sy-dialog
      :title="dialogTitle"
      position="middle"
      height="auto"
      slide="fade"
      width="340px"
      :visible.sync="isvisible">
      <div slot="body" style="height:auto">
        <el-form :model="newDataForm" :rules="rules" ref="newDataForm" label-width="100px"
                 style="position:relative; padding: 10px 10px 0 10px; height:auto">
          <div class="dialog-spacing">
            <el-form-item label="代码编号：" prop="value">
              <el-input v-model.trim="newDataForm.value"></el-input>
            </el-form-item>
          </div>
          <div class="dialog-spacing">
            <el-form-item label="代码名称：" prop="name">
              <el-input v-model="newDataForm.name"></el-input>
            </el-form-item>
          </div>
          <div class="dialog-spacing">
            <el-form-item label="代码序号：" prop="sort">
              <el-input v-model.trim="newDataForm.sort"
                        @change="$removeZero(newDataForm.sort,newDataForm,'sort')"></el-input>
            </el-form-item>
          </div>
          <div class="dialog-spacing">
            <el-form-item label="代码说明：" prop="details">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="newDataForm.details"
                        style="margin:5px 0; height:auto"></el-input>
            </el-form-item>
          </div>
          <div class="dialog-spacing">
            <el-form-item label="状态：" prop="status" style="margin-top: -10px">
              <el-radio v-model="newDataForm.status" :label="1">启用</el-radio>
              <el-radio v-model="newDataForm.status" :label="0">禁用</el-radio>
              <!--<el-switch on-text="启用" off-text="禁用" v-model="newDataForm.status"></el-switch>-->
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="isvisible = false ,resetForm('newDataForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </sy-dialog>
  </div>
</template>

<script>
  import _ from 'lodash';
  import config from './dataDicConfig.js';
  import pager from '../../config.js';
  import {getRcCodeList} from '../../request.js';
  export default {
    name: 'app',
    components: {},
    data () {
      var nameExist = (rule, val, callback) => {
        let value = val.trim();
        if (!value.length) {
          return callback(new Error("代码名称不能为空！"))
        } else {
          if (!this.newOrEdit) {
            if (value == this.editName) {
              return callback();
            } else {
              config.checkName({
                codeId: this.$route.params.codeId,
                name: value
              }).then((data) => {
                if (data.data) {
                  return callback(new Error('代码名称重复！'));
                }
                else {
                  return callback();
                }
              })
            }
          } else {
            config.checkName({
              codeId: this.$route.params.codeId,
              name: value
            }).then((data) => {
              if (data.data) {
                return callback(new Error('代码名称重复！'));
              }
              else {
                return callback();
              }
            })
          }
        }

      };
      var codeExist = (rule, value, callback) => {
        if (!this.newOrEdit) {
          if (value == this.editCode) {
            return callback();
          } else {
            config.checkNum({
              codeId: this.$route.params.codeId,
              value: value
            }).then((data) => {
              if (data.data)
                return callback(new Error('代码编号重复！'));
              else
                return callback();
            })
          }
        } else {
          config.checkNum({
            codeId: this.$route.params.codeId,
            value: value
          }).then((data) => {
            if (data.data)
              return callback(new Error('代码编号重复！'));
            else
              return callback();
          })

        }
      };
      //验证序号
      var checkSort = (rule, value, callback) => {
        let n = /^\d{0,}$/;
        let v = parseInt(value);
        if (n.test(value)) {
          if ((v > -1 && v < 100000) || value === "")
            callback();
          callback(new Error("序号不能大于99999！"));
        }
        else
          callback(new Error("请输入非负整数！"));
      };

      var nameTrim = (rule, value, callback) => {
        this.newDataForm.name = this.newDataForm.name.trim();
        callback();
      };

      var memoLength = (rule, value, callback) => {
        if (value && value.length > 0) {
          var v = value.trim();
          if (v.length > 150) {
            return callback(new Error('不能超过150个字符！'));
          }
        }
        return callback();
      }
      return {
        emptyText:"正在加载中...",
        btnSubmit: false,
        editName: "",
        editCode: "",
        dialogTitle: "",
        tableList: config.tableList,
        dialogFormVisible: false,
        dialogEditFormVisible: false,
        tableData: [],
        isvisible: false,
        obj: {
          color: '#FF4949'
        },
        delIsvisible: true,//控制删除按钮的显示
        total: 400,
        allData: [],
        newOrEdit: '',
        //表单数据
        newDataForm: {
          value: '',
          name: '',
          sort: '',
          details: '',
          status: 1
        },
        //表单验证规则
        rules: {
          value: [
            {required: true, message: "代码编号不能为空！", trigger: 'blur',},
            {min: 0, max: 50, message: '不能超过50个字符', trigger: 'blur'},
            {validator: codeExist, trigger: 'blur'}
          ],
          name: [
            {validator: nameTrim, trigger: 'blur'},
            {required: true, message: '代码名称不能为空！', trigger: 'blur'},
            {min: 0, max: 50, message: '不能超过50个字符', trigger: 'blur'},
            {validator: nameExist, trigger: 'blur'}
          ],
          sort: [
//            {validator: delZero, trigger: 'change'},
            {required: true, message: "代码序号不能为空！", trigger: 'blur',},
            {validator: checkSort, trigger: 'blur'}
          ],
          details: [
            {validator: memoLength, trigger: 'change'},
          ]
        },
        codeList: {
          'btn_base_details_add': false,
          'btn_base_details_on': false,
          'btn_base_details_delete': false,
          'btn_base_details_edit': false
        }
      }
    },
    created(){
      this.$parent.$emit('currentPage', '/base/dataDictionary');
      getRcCodeList('category_base_details', this.codeList).then(() => {
        this.getTableData();
      });
    },
    methods: {
      getTableData(){
        this.emptyText = "正在加载中...";
        this.tableData = [];
        config.getTableData(this.$route.params.codeId).then((data) => {
          this.emptyText = "暂无数据"
          if(data && data.status == 200) {
            this.tableData = data.data;
          }
        })
      },
      addData(){
        this.isvisible = true;
        this.newOrEdit = true;
        this.dialogTitle = '新增';
        this.$refs.newDataForm.resetFields();
      },
      submitForm() {
        let res;
        this.$refs.newDataForm.validate((valid) => {
          if (valid) {
            if (this.newOrEdit) {
              config.addData({
                codeId: this.$route.params.codeId,
                value: this.newDataForm.value,
                name: this.newDataForm.name,
                sort: this.newDataForm.sort,
                status: parseInt(this.newDataForm.status),
                details: this.newDataForm.details.trim()
              }).then((_res) => {
                  res=_res;
                  this.isvisible = false;
                  this.newDataForm = {
                    value: '',
                    name: '',
                    sort: '',
                    details: '',
                    status: 0
                  };
                  this.getTableData();
              }).then(()=>{
                  if (res.status >= 10000) {
                    this.showErrorMsg(res.fieldErrors);
                  } else {
                    this.$notify({
                      title: '成功',
                      message: '操作成功！',
                      type: 'success'
                    });
                  }
              })
            } else {
              if (this.newDataForm.details) {
                this.newDataForm.details = this.newDataForm.details.trim();
              }
              config.editData(this.newDataForm).then((_res) => {
                res=_res;
                this.isvisible = false;
                this.newDataForm = {
                  value: '',
                  name: '',
                  sort: '',
                  details: '',
                  status: 0
                };
                this.getTableData();
              }).then(()=>{
                if (res.status >= 10000) {
                  this.showErrorMsg(res.fieldErrors);
                } else {
                  this.$notify({
                    title: '成功',
                    message: '操作成功！',
                    type: 'success'
                  });
                }
              })
            }
          }
//          else{
//            this.$message.error('提交失败！');
//            return false;
//          }
        });
      },
      handleSizeChange(val) {
        this.tableData = this.allData.slice((this.currentPage - 1) * val, this.currentPage * val);
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.tableData = this.allData.slice((val - 1) * this.pageSize, val * this.pageSize);
        this.currentPage = val;
      },
      handleEdit(index, _row){
        let row = _.cloneDeep(_row);
        this.$refs.newDataForm.resetFields();
        this.newDataForm = [];
        this.newDataForm = row;
        this.newDataForm.sort = this.newDataForm.sort + "";
        this.editName = row.name;
        this.editCode = row.value;
      },
      handleDelete(index, row) {
        let _res;
        this.$confirm('您确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          config.deleteRow(row.id).then((res) => {
            _res = res;
            this.getTableData();
          }).then(() => {
            if (_res.status >= 10000) {
              this.showErrorMsg(_res.fieldErrors);
            } else {
              this.$notify({
                title: '成功',
                message: '操作成功！',
                type: 'success'
              });
            }
          });
        }).catch(() => {
        });
      },
      showErrorMsg(msgs) {
        if (!msgs || msgs.length <= 0) {
          return false;
        }
        let msg = [];
        for (let i = 0; i < msgs.length; i++) {
          msg.push(msgs[i].message);
        }
        if (!msg || msg.length <= 0) {
          return false;
        }
        this.$notify({
          type: 'error',
          title: '错误',
          message: msg.join('  ')
        });
      },
      stateChange(index, row){
        let s = parseInt(row.status == 1 ? 0 : 1)
        let _res;
        config.changeStatus({
          id: row.id,
          status: s
        }).then((res) => {
          _res=res;
          this.getTableData();
        }).then(()=>{
          if (_res.status >= 10000) {
            this.showErrorMsg(_res.fieldErrors);
          } else {
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
          };
        })
//        this.tableData[index].status= row.status === false ? true : false
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
  .content {
    position: absolute;
    top: 0px;
    width: 100%;
    bottom: 0;
  }

  .dialog-spacing {
    margin-bottom: 20px;
  }

  .table-rightbody {
    position: absolute;
    max-height: 100%;
    left: 10px;
    right: 10px;
    width: auto;
    height: auto;
    margin-top: 5px;
    overflow: auto;
  }

  .left1 {
    padding-top: 10px;
  }
</style>
