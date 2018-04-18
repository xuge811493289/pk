<template>
  <div class="app-container-box">
    <sy-grad-4>
      <div slot="headerLeft" v-if="showLeft">单位</div>
      <div slot="headerRight" style="line-height:40px">上课节次</div>
      <div slot="bodyLeft" v-if="showLeft">
        <sy-grad-4 :border="false">
          <div slot="headerRight" class="line-height-56" style="background:#fff;">
            <el-input
              size="small"
              placeholder="请输入关键字"
              icon="search"
              v-model="input"
              @keyup.enter.native="handleSearch"
              :on-icon-click="handleSearch">
            </el-input>
          </div>
          <div slot="bodyRight">
            <el-tree
              ref="tree"
              highlight-current
              node-key="open"
              class="full-parent"
              :filter-node-method="filterNode"
              :current-node-key="1"
              :data="treeData"
              :props="defaultProps"
              :empty-text="emptyText_"
              style="border:0;"
              @node-click="handleNodeClick">
            </el-tree>
          </div>
        </sy-grad-4>
      </div>
      <div slot="bodyRight">
        <sy-grad-4 :border="false">
          <div slot="headerRight" style="line-height:40px">
            <div class="sy-col sy-20 right" v-show="showTable">
              <el-button v-if="codeList.btn_base_initialization" size="small" @click="isvisible2 = true">初始化</el-button>
              <el-button v-if="codeList.btn_base_period_add" size="small" @click="handleAdd">新增</el-button>
            </div>
          </div>
          <div slot="bodyRight" style="width:100%; height:100%; padding:0 10px">
            <el-table
              :empty-text="emptyText"
              ref="multipleTable"
              :data="tableData"
              border
              tooltip-effect="dark"
              height="100%"
              style="width:100%; height:100%"
              v-show="showTable"
              @selection-change="handleSelectionChange">
              <el-table-column
                v-if="codeList.btn_base_period_delete"
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                v-for="item in appColumn"
                :key="item.prop"
                :width="item.width"
                :label="item.label">
                <template scope="scope">{{scope.row[item.prop]}}</template>
              </el-table-column>
              <el-table-column label="操作" width="100" align="center" header-align="center">
                <template scope="scope">
                  <el-button
                    v-if="codeList.btn_base_period_edit"
                    size="small"
                    type="text"
                    v-show="!scope.row.init"
                    @click="isvisible = true, newOrEdit = false, dialogTitle='修改',addOrEdit=false,handleEdit(scope.$index, scope.row)">
                    <i class="fa fa-pencil-square-o" aria-hidden="true" title="修改"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div slot="footer">
            <el-button v-if="codeList.btn_base_period_delete" size="small" type="danger" v-show="showTable" @click="handleDelete" :disabled="multipleSelection.length < 1">删除
            </el-button>
          </div>
        </sy-grad-4>
      </div>
    </sy-grad-4>
    <sy-dialog
      title="初始化"
      position="middle"
      height="200px"
      slide="fade"
      width="340px"
      :visible.sync="isvisible2">
      <div slot="body" style="padding-top: 50px; text-align: center; height:auto">
        <el-radio v-model="radio" label="xls">夏令时</el-radio>
        <el-radio v-model="radio" label="dls">冬令时</el-radio>
      </div>
      <div slot="footer">
        <el-button size="small" @click="isvisible2 = false">取 消</el-button>
        <el-button size="small" type="primary" @click="initialization(), isvisible2 = false">确 定</el-button>
      </div>
    </sy-dialog>

    <sy-dialog
      :title="dialogTitle"
      position="middle"
      height="498px"
      slide="fade"
      width="300px"
      :visible.sync="isvisible">
      <div slot="body" style="height:auto">
        <el-form :model="newDataForm" ref="newDataForm" :rules="rules" label-width="100px"
                 style="position:relative; padding-top: 10px;padding-right: 10px; height:auto">
          <div class="dialog-spacing">
            <el-form-item label="序号：" prop="sort">
              <el-input size="small" v-model.trim="newDataForm.sort" @change="$removeZero(newDataForm.sort,newDataForm,'sort')"></el-input>
            </el-form-item>
          </div>
          <div class="dialog-spacing">
            <el-form-item label="名称：" prop="name">
              <el-input size="small" v-model="newDataForm.name"></el-input>
            </el-form-item>
          </div>
          <div class="dialog-spacing">
            <el-form-item label="开始时间：" prop="begin">
              <el-input size="small" v-model.trim="newDataForm.begin"></el-input>
            </el-form-item>
          </div>
          <div class="dialog-spacing">
            <el-form-item label="结束时间：" prop="end">
              <el-input size="small" v-model.trim="newDataForm.end"></el-input>
            </el-form-item>
          </div>
          <div class="dialog-spacing">
            <el-form-item label="适用星期：">
              <template>
                <el-checkbox-group
                  v-model="newDataForm.weekIds"
                  :min="0"
                  :max="7">
                  <el-checkbox v-for="w in weeks" :label="w.id" :key="w.id" style="margin-left: 15px">{{w.name}}</el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div slot="footer">
        <el-button size="small" @click="isvisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm">确 定</el-button>
      </div>
    </sy-dialog>
  </div>
</template>

<script>
  import config from './config.js';
  import pager from '../../config.js';
  import {Loading} from 'element-ui';
  import {getRcCodeList} from '../../request.js';
  export default {
    name: 'app',
    components: {
    },
    data () {
      //验证序号
      var checkSort = (rule, value, callback) => {
        let n = /^\d{0,}$/;
        let v = parseInt(value);
        if (n.test(value)) {
          if ((v > -1 && v < 100000) || value === "")
            callback();
          callback(new Error("序号大小不能超过99999！"));
        }
        else
          callback(new Error("请输入非负整数！"));
      };
      //验证时间格式
      var checkTime = (rule, value, callback) => {
        let n = /^(20|21|22|23|[0-1]\d):[0-5]\d$/;
        let v = value;
        if (n.test(v))
          callback();
        else
          callback(new Error("请输入正确的时间。格式：08:30"));
      }
      //结束时间是否大于开始时间
      var biggerThan = (rule, value, callback) => {
        if (value > this.newDataForm.begin)
          callback();
        else
          callback(new Error("结束时间必须大于开始时间"));
      };
      //验证节次名称是否重复
      var nameExist = (rule, val, callback) => {
        let dup = "";
        let value = val.trim();
        if(!value.length){
          return callback(new Error("名称不能为空！"))
        }
        if (this.addOrEdit)
          config.checkName({
            unitId: this.unitId,
            name: value
          }).then((data) => {
            dup = data.data;
          }).then(()=>{
            if (dup) {
              return callback(new Error('名称重复！'));
            }else{
              return callback();
            }
          })
        else {
          if (value !== this.editName) {
            config.checkName({
              unitId: this.unitId,
              name: value
            }).then((data) => {
              dup = data.data;
            }).then(()=>{
              if (dup) {
                return callback(new Error('名称重复！'));
              }else{
                return callback();
              }
            })
          }else{
            return callback();
          }

        }
      };
      //去掉name前后的空格
      var nameTrim = (rule, value, callback) => {
        this.newDataForm.name=this.newDataForm.name.trim();
        callback();
      };
      return {
        emptyText:"正在加载中...",
        emptyText_:"正在加载中...",
        arr:[1],
        btn_canClick:false,
        editName: "",
        weekIdss: [],
        addOrEdit: "",
        dialogTitle: "",
        input: "",
        treeData: [],
        appColumn: config.tableList,
        defaultProps: {
          children: "children",
          label: "name"
        },
        unitId: '',
        radio: "dls",
        showLeft: false,
        showTable: false,
        tableData: [],
        multipleSelection: [],
        isvisible: false,
        isvisible2: false,
        newDataForm: {
          sort: '',
          name: '',
          begin: '',
          end: '',
          weekIds: []
        },
        rules: {
          sort: [
            {required: true, message: '序号不能为空！', trigger: 'blur'},
            {validator: checkSort, trigger: 'blur'}
          ],
          name: [
            {validator: nameTrim, trigger: 'blur'},
            {required: true, message: '名称不能为空！', trigger: 'blur'},
            {min: 0, max: 50, message: '不能超过50个字符', trigger: 'blur'},
            {validator: nameExist, trigger: 'blur'}
          ],
          begin: [
            {required: true, message: '开始时间不能为空！', trigger: 'blur'},
            {validator: checkTime, trigger: 'blur'},
          ],
          end: [
            {required: true, message: '结束时间不能为空！', trigger: 'blur'},
            {validator: checkTime, trigger: 'blur'},
            {validator: biggerThan, trigger: 'blur'}
          ]
        },
        weeks: [],
        codeList:{
          'btn_base_initialization':false,
          'btn_base_period_add':false,
          'btn_base_period_delete':false,
          'btn_base_period_edit':false,
        }
      }
    },
    beforeCreate(){
    },
    created(){
      this.$parent.$emit('currentPage', '/base/classTime');
      getRcCodeList('category_base_period',this.codeList).then(()=> {
        this.getTree();
        this.getWeek();
      });
    },
    methods: {
      //获取一周的天数信息
      getWeek(){
        config.getWeeks().then((data) => {
          this.weeks = data.data;
        });
      },

      //新增按钮点击事件
      handleAdd(){
        this.isvisible = true;
        this.dialogTitle = '新增';
        this.addOrEdit = true;
        this.$refs.newDataForm.resetFields();
        this.newDataForm = {
          sort: '',
          name: '',
          begin: '',
          end: '',
          weekIds: []
        }
      },

      //编辑按钮点击事件
      handleEdit(index, row){
        this.editName=row.name;
        this.$refs.newDataForm.resetFields();
        let doc=document.getElementsByClassName('sy-dialog');
        let loadingInstance = Loading.service({
          target:doc[doc.length-1]
        })
        config.beforeEdit(row.id).then((data) => {
          if (data && data.data && data.data !== {}) {
            this.newDataForm = data.data;
            this.newDataForm.sort = this.newDataForm.sort + "";
            this.newDataForm.weekIds = [];
            if (this.newDataForm.weekRModels && this.newDataForm.weekRModels.length > 0) {
              for (let i = 0; i < this.newDataForm.weekRModels.length; i++) {
                this.newDataForm.weekIds.push(this.newDataForm.weekRModels[i].weekId);
              }
            }
            loadingInstance.close()
          }
        });
      },

      //获取单位树
      getTree(){
        this.emptyText_ = "正在加载中..."
        this.treeData = [];
        config.getTree().then((data) => {
          this.emptyText_ = "暂无数据"
          if (data.data && data.data.length > 0) {
            if (data.data.length > 1||(data.data.length<2&&data.data[0].unitType==1)) {
              this.showLeft = true;
              this.treeData = this.$data2tree(data.data, 'unitId', 'parentId');
              this.treeData[0].open=1;
              this.unitId=data.data[0].unitId;
            } else {
              this.showLeft = false;
              this.unitId = data.data[0].unitId;
            }
            this.getTable();
          }
        })
      },

      //获取表格
      getTable(unit = this.unitId){
        this.emptyText = "正在加载中..."
        this.tableData = [];
        this.showTable = true;
        config.getTable({unitId: unit}).then((data0) => {
          this.emptyText = "暂无数据"
          if(data0 && data0.status == 200) {
            this.tableData = data0.data;
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].weekRModels !== null) {
                let arr = [];
                for (let j = 0; j < this.tableData[i].weekRModels.length; j++)
                  arr.push(this.tableData[i].weekRModels[j].weekName);
                this.tableData[i].weekRModels = "";
                this.tableData[i].weekRModels = arr.join(",");
              }
            }
          }
        });
      },

      //初始化按钮点击事件
      initialization(){
        config.setInit({
          unitId: this.unitId,
          type: this.radio
        }).then(() => {
          this.getTable();
        }).then(()=>{
          this.$notify({
            title: '成功',
            message: '操作成功！',
            type: 'success'
          });
        })
      },

      //树节点点击事件
      handleNodeClick(data) {
//        if (data.unitType == 2) {
          this.unitId = data.unitId;
//          this.btn_canClick = true;
          this.getTable();
//        }else{
//          this.tableData=[];
//          this.btn_canClick = false;
//        }
      },

      //表格中复选框改变的触发事件
      handleSelectionChange(val){
        this.multipleSelection = val;
      },

      //搜索
      handleSearch(){
        this.input = this.input.trim()
        this.$refs.tree.filter(this.input);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },

      //删除按钮点击事件
      handleDelete(){
        if(!this.multipleSelection.length){
          this.$notify({
            title: '提示',
            message: '请选择至少一条数据',
            type: 'info'
          });
          return;
        }
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            config.deleteData(this.multipleSelection[i].id).then(() => {
              if (i === this.multipleSelection.length - 1) this.getTable();
            })
          }
          this.$notify({
            title: '成功',
            message: '操作成功！',
            type: 'success'
          });
        })
      },

      //提交按钮点击事件
      submitForm() {
        this.$refs.newDataForm.validate((valid) => {
          if (valid) {
            if (this.addOrEdit) {
              config.addRow({
                begin: this.newDataForm.begin,
                end: this.newDataForm.end,
                name: this.newDataForm.name,
                sort: this.newDataForm.sort,
                unitId: this.unitId,
                weekIds: this.newDataForm.weekIds
              }).then(() => {
                this.newDataForm = {
                  sort: '',
                  name: '',
                  begin: '',
                  end: '',
                  weekIds: []
                };
                this.isvisible = false;
                this.getTable();
              }).then(()=>{
                this.$notify({
                  title: '成功',
                  message: '操作成功！',
                  type: 'success'
                });
              });
            } else {
              config.editRow({
                id: this.newDataForm.id,
                begin: this.newDataForm.begin,
                end: this.newDataForm.end,
                name: this.newDataForm.name,
                sort: this.newDataForm.sort,
                unitId: this.unitId,
                weekIds: this.newDataForm.weekIds
              }).then(() => {
                this.newDataForm = {
                  sort: '',
                  name: '',
                  begin: '',
                  end: '',
                  weekIds: []
                };
                this.isvisible = false;
                this.getTable();
              }).then(()=>{
                this.$notify({
                  title: '成功',
                  message: '操作成功！',
                  type: 'success'
                });
              });
            }
          }
        });
      }
    },
  }
</script>

<style scoped>

  .sy-top {
    position: absolute;
    top: 0;
    height: 45px;
    width: 100%;
    line-height: 45px;
    box-sizing: border-box;

    padding: 0 15px;
  }

  .sy-body {
    position: absolute;
    top: 45px;
    width: 100%;
    bottom: 45px;
    box-sizing: border-box;
    padding: 15px;
  }

  .sy-bottom {
    position: absolute;
    height: 45px;
    width: 100%;
    bottom: 0;
    line-height: 45px;
    box-sizing: border-box;
    padding: 0 15px;
  }

  .sy-row {
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }

  .sy-col {
    float: left;
    vertical-align: top;
    box-sizing: border-box;
  }

  .sy-1 {
    width: 5%;
  }

  .sy-2 {
    width: 10%;
  }

  .sy-3 {
    width: 15%;
  }

  .sy-4 {
    width: 20%;
  }

  .sy-5 {
    width: 25%;
  }

  .sy-6 {
    width: 30%;
  }

  .sy-7 {
    width: 35%;
  }

  .sy-8 {
    width: 40%;
  }

  .sy-9 {
    width: 45%;
  }

  .sy-10 {
    width: 50%;
  }

  .sy-11 {
    width: 55%;
  }

  .sy-12 {
    width: 60%;
  }

  .sy-13 {
    width: 65%;
  }

  .sy-14 {
    width: 70%;
  }

  .sy-15 {
    width: 75%;
  }

  .sy-16 {
    width: 80%;
  }

  .sy-17 {
    width: 85%;
  }

  .sy-18 {
    width: 90%;
  }

  .sy-19 {
    width: 95%;
  }

  .sy-20 {
    width: 100%;
  }

  .border {
    border: 1px solid #ccc;
  }

  .full-parent {
    position: relative;
    height: 100%;
  }

  .right {
    text-align: right;
  }

  .left {
    text-align: left;
  }

  .center {
    text-align: center;
  }

  .teacher-content, .teacher {
    position: relative;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 30px 20px;
  }

  .teacher-content {
    padding: 0;
  }

  .teacher-content-top {
    position: absolute;
    height: 30px;
    top: 0;
    width: 100%;
    line-height: 30px;
  }

  .teacher-content-bottom {
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

  .register-form {
    text-align: center;
  }

  .open-hide {
    position: absolute;
    top: 40%;
    left: 0;
    cursor: pointer;
    z-index: 500;
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
    overflow: auto;
  }
</style>

