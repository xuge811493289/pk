<template>
  <div class="app-container-box">
    <sy-grad-4>
      <div slot="headerLeft">
        <span>部门</span>
      </div>
      <div slot="headerRight" style="line-height: 40px">
        <span>部门一览表</span>
      </div>
      <div slot="bodyLeft">
        <sy-grad-4 :border="false">
          <div slot="headerRight" class="line-height-56" style="background:#fff;">
            <el-input
              placeholder="请输入关键字"
              icon="search"
              v-model.trim="filterText"
              @keyup.enter.native="handleSearch"
              size="small"
              :on-icon-click="handleSearch">
            </el-input>
          </div>
          <div slot="bodyRight">
            <el-tree
              :data="data"
              :props="defaultProps"
              highlight-current
              class="full-parent"
              node-key="id"
              :default-expanded-keys="treeSelect0"
              :current-node-key="treeSelect"
              :filter-node-method="filterNode"
              @node-click="currentNodeClick"
              :empty-text="emptyText_"
              style="border:0;"
              ref="tree">
            </el-tree>
          </div>
        </sy-grad-4>
      </div>
      <div slot="bodyRight">
        <sy-grad-4 :border="false">
          <div slot="headerRight" class="right line-height-56">
            <el-button v-if="codeList.btn_base_org_add" @click="addOrg">新增</el-button>
          </div>
          <div slot="bodyRight" style="width:100%; height:100%; padding:0px 10px 10px 10px">
            <el-table ref="multipleTable" :data="tableData" border height="100%" style="width:100%; height:100%" :empty-text="emptyText">
              <el-table-column v-for="item in appColumn" :key="item.prop" :width="item.width" :label="item.label"
                               :prop="item.prop" :align="item.prop=='sort'?'center':'left'">
              </el-table-column>
              <el-table-column label="操作" :width="100" align="center">
                <template scope="scope">
                  <!--<el-tooltip effect="light" content="修改" placement="right">-->
                    <el-button v-if="codeList.btn_base_org_update" size="small" type="text" @click="dialogTitle='修改',addOrEdit=false,orgEdit(scope.$index, scope.row)">
                      <i class="fa fa-pencil-square-o" aria-hidden="true" title="修改"></i>
                    </el-button>
                  <!--</el-tooltip>-->
                  <!--<el-tooltip effect="light" content="删除" placement="right">-->
                    <el-button v-if="codeList.btn_base_org_delete" size="small" type="text" @click="handleDelete(scope.$index, scope.row)">
                      <i class="el-icon-delete" title="删除"></i>
                      <!--<i class="fa fa-times" aria-hidden="true"  style="color:#FF4949"></i>-->
                    </el-button>
                  <!--</el-tooltip>-->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </sy-grad-4>
      </div>
    </sy-grad-4>
    <sy-dialog :title="dialogTitle"
               :visible.sync="addOrgVisible"
               :fullscreen="true"
               :close-on-click-modal="false"
               position="middle"
               height="auto"
               width="650px"
               slide="fade">
      <div slot="body" style="height:auto">
        <el-row>
          <el-form :model="addOrgForm" ref="addOrgForm" :rules="rules" label-width="100px" style="margin:10px;height:auto">
            <el-col :span="12">
              <el-form-item label="部门名称：" prop="name">
                <el-input v-model="addOrgForm.name"></el-input>
              </el-form-item>
              <el-form-item label="上级部门：">
                <el-select v-model="dropDownSelect" placeholder="点击选择" style="width:100%; text-align: left; font-size: 12px">
                  <el-option
                    v-for="item in dropDownList"
                    v-if="item.id !== addOrgForm.id"
                    style="font-size: 12px"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系电话：" prop="contactPhone">
                <el-input v-model.trim="addOrgForm.contactPhone"></el-input>
              </el-form-item>
              <el-form-item label="分管领导：">
                <el-button v-model="addOrgForm.leader" @click="selectLeader" class="selectBtn-in-dialog" :style="{color: lName==='点击选择'?'#99A9BF':''}">{{lName}}</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门编号：" prop="code" label-width="120px">
                <el-input v-model.trim="addOrgForm.code" @change="$removeZero(addOrgForm.code,addOrgForm,'code')"></el-input>
              </el-form-item>
              <el-form-item label="部门负责人：" label-width="120px">
                <el-button v-model="addOrgForm.manager" @click="selectManager" class="selectBtn-in-dialog" :style="{color: mName==='点击选择'?'#99A9BF':''}">{{mName}}</el-button>
              </el-form-item>
              <el-form-item label="序号：" prop="sort" label-width="120px">
                <el-input v-model.trim="addOrgForm.sort" @change="$removeZero(addOrgForm.sort,addOrgForm,'sort')"></el-input>
              </el-form-item>
              <el-form-item label="部门副负责人：" label-width="120px">
                <el-button v-model="addOrgForm.deputyManager" @click="selectDeManager" class="selectBtn-in-dialog" :style="{color: dmName==='点击选择'?'#99A9BF':''}">{{dmName}}
                </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="部门描述：" prop="memo">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 5}" style="width:100%; height:auto; margin:5px 0" v-model="addOrgForm.memo"></el-input>
              </el-form-item>
            </el-col>
            <!--<el-col :span="22" style="margin-left:10px">-->
              <!--<el-form-item style="height:50px; text-align: right">-->
                <!---->
              <!--</el-form-item>-->
            <!--</el-col>-->
          </el-form>
        </el-row>
      </div>
      <div slot="footer">
        <el-button @click="addOrgVisible = false">取 消</el-button>
        <el-button type="primary" @click="dataSubmit()">确 定</el-button>
      </div>
    </sy-dialog>
  </div>
</template>

<script>
  import _ from 'lodash';
  import config from './config.js';
  import pager from '../../config.js';
  import {Loading} from 'element-ui';
  import {getRcCodeList} from '../../request.js';

  export default {
    components: {
    },
    data () {
      //验证联系电话
      var checkPhone = (rule, value, callback) => {
        if(this.$checkContact(value)){
          return callback();
        }
        return callback(new Error("联系电话输入有误！"))
      };
      //验证部门名称是否重复
      var checkNameExist = (rule, val, callback) => {
        let value = val.trim();
        if(!value.length){
          return callback(new Error("部门名称不能为空！"))
        }
        if (this.addOrEdit) {
          config.NameExistSave({
            name: this.addOrgForm.name,
            unitId: this.unitId,
            orgType: 1
          }).then((data) => {
            if (data.data) {
              callback(new Error("部门名称重复！"));
            } else {
              callback();
            }
          })
        } else {
          if(value!==this.editName){
            config.NameExistSave({
              name: this.addOrgForm.name,
              unitId: this.unitId,
              orgId: this.editId,
              orgType: 1
            }).then((data) => {
              if (data.data) {
                callback(new Error("部门名称重复！"));
              } else {
                callback();
              }
            })
          }else
            return callback();
        }
      };
      //验证部门编号是否重复
      var checkCodeExist = (rule, value, callback) => {
        if (this.addOrEdit) {
          config.CodeExistSave({
            code: this.addOrgForm.code,
            unitId: this.unitId,
            orgType: 1
          }).then((data) => {
            if (data.data) {
              callback(new Error("部门编号重复！"));
            } else {
              callback();
            }
          })
        } else {
          if(value!==this.editCode){
            config.CodeExistSave({
              code: this.addOrgForm.code,
              unitId: this.unitId,
              orgId: this.editId,
              orgType: 1
            }).then((data) => {
              if (data.data) {
                callback(new Error("部门编号重复！"));
              } else {
                callback();
              }
            })
          }else
            callback();
        }
      };
      //验证序号
      var checkSort = (rule, value, callback) => {
        let n = /^\d{0,}$/;
        let v = parseInt(value);
        if (n.test(value)) {
          if ((v > -1 && v < 10000) || value === "")
            callback();
          callback(new Error("序号大小不能超过9999！"));
        }
        else
          callback(new Error("请输入非负整数！"));
      };
      //验证是否为非负整数
      var checkNumber = (rule, value, callback) => {
        let n = /^\d+$/;
        let v = value;
        if (n.test(v))
          callback();
        else
          callback(new Error("请输入非负整数！"));
      };

      //去掉name前后的空格
      var nameTrim = (rule, value, callback) => {
        this.addOrgForm.name = this.addOrgForm.name.trim();
        callback();
      };

      //memo长度校验
      var memoLength = (rule, value, callback) => {
        if(value&&value.length>0) {
          var v = value.trim();
          if (v.length > 2000) {
            return callback(new Error('不能超过2000个字符！'));
          }
        }
        return callback();
      }
      return {
        emptyText:"正在加载中...",
        emptyText_:"正在加载中...",
        editName:"",
        editCode:"",
        firstEnter: true,
        treeSelect: "",
        treeSelect0: [],
        addOrEdit: true,//true表示添加，false表示修改
        dialogTitle: "",
        a: false,
        id: "",
        unitId: "",
        unitName: "",
        name: "",
        mName: "",
        lName: "",
        dmName: "",
        editId: "",
        parentId: '',
        type: "",
        dropDownSelect: "",
        dropDownList: [],
        addOrgForm: {
          parentId: '',
          name: '',
          manager: '',
          deputyManager: '',
          leader: '',
          code: '',
          orgType: 1,
          contact: '',
          contactPhone: '',
          sort: '',
          unitId: this.unitId,
          memo: ''
        },
        addOrgVisible: false,
        tableData: [],
        appColumn: config.orgList,
        isvisible: false,
        filterText: '',
        data: [],
        defaultProps: {
          children: 'children',
          label: 'name',
          key: "id"
        },
        rules: {
          name: [
            {validator: nameTrim, trigger: 'blur'},
            {required: true, message: '部门名称不能为空！', trigger: 'blur'},
            {min: 0, max: 50, message: '不能超过50个字符！', trigger: 'blur'},
            {validator: checkNameExist, trigger: 'blur'}
          ],
          contactPhone: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          code: [
            {required: true, message: '部门编号不能为空！', trigger: 'blur'},
            {validator: checkNumber, trigger: 'blur'},
            {min: 0, max: 32, message: '不能超过32个字符！', trigger: 'blur'},
            {validator: checkCodeExist, trigger: 'blur'},
          ],
          sort: [
            {validator: checkSort, trigger: 'blur'}
          ],
          memo: [
            {validator: memoLength, trigger: 'change'},
          ]
        },
        codeList:{
          'btn_base_org_add':false,
          'btn_base_org_update':false,
          'btn_base_org_delete':false
        }
      }
    },
    beforeCreate(){

    },
    created(){
      this.$parent.$emit('currentPage', '/base/orgsMag');
      getRcCodeList('category_base_org',this.codeList).then(()=>{
        this.firstEnter = true;
        this.getTree();
      });
    },
    watch: {},
    methods: {
      //选人控件-leader
      selectLeader(){
        let _m = [];
        if (this.addOrgForm.leader !== "" && this.addOrgForm.leader !== undefined)
          _m.push(this.addOrgForm.leader);
        this.$SelectUsers({
          unitType: this.unitType,
          selectUserType: 2,
          unitId: this.unitId,
          selectUserIds: _m,
          beforeClose: (selectUsers, instance)=>{
            if (selectUsers.length > 1) {
              this.$notify({
                title: '警告',
                message: '最多选择一个！',
                type: 'warning'
              });
              return true;
            } else {
              if (selectUsers.length === 1) {
                this.lName = selectUsers[0].realName;
                this.addOrgForm.leader = selectUsers[0].id
              } else {
                this.lName = "点击选择";
                this.addOrgForm.leader = "";
              }
            }
          }
        }, () => {

        })
      },

      //选人控件-manager
      selectManager(){
        let _m = [];
        if (this.addOrgForm.manager !== "" && this.addOrgForm.manager !== undefined)
          _m.push(this.addOrgForm.manager);
        this.$SelectUsers({
          unitType: this.unitType,
          selectUserType: 2,
          unitId: this.unitId,
          selectUserIds: _m,
          beforeClose: (selectUsers, instance)=>{
            if (selectUsers.length > 1) {
              this.$notify({
                title: '警告',
                message: '最多选择一个！',
                type: 'warning'
              });
              return true;
            } else {
              if (selectUsers.length === 1) {
                this.mName = selectUsers[0].realName;
                this.addOrgForm.manager = selectUsers[0].id
              } else {
                this.mName = "点击选择";
                this.addOrgForm.manager = "";
              }
            }
          }
        }, () => {
        })
      },

      //选人控件-deputyManager
      selectDeManager(){
        let _m = [];
        if (this.addOrgForm.deputyManager !== "" && this.addOrgForm.deputyManager !== undefined)
          _m.push(this.addOrgForm.deputyManager);
        this.$SelectUsers({
          unitType: this.unitType,
          selectUserType: 2,
          unitId: this.unitId,
          selectUserIds: _m,
          beforeClose: (selectUsers, instance)=>{
            if (selectUsers.length > 1) {
              this.$notify({
                title: '警告',
                message: '最多选择一个！',
                type: 'warning'
              });
              return true;
            } else {
              if (selectUsers.length === 1) {
                this.dmName = selectUsers[0].realName;
                this.addOrgForm.deputyManager = selectUsers[0].id
              } else {
                this.dmName = "点击选择";
                this.addOrgForm.deputyManager = "";
              }
            }
          }
        }, () => {

        })
      },

      //生成部门树
      make(datas, idprop, pIdprop){
        if (!idprop) {
          idprop = 'id';
        }
        if (!pIdprop) {
          pIdprop = 'parentId';
        }
        let nodes = [];
        let pid = '';
        for (var i = 0; i < datas.length; i++) {
          let d = datas[i];
          if (d.unitType * 1 === 1) {
            datas.push(
              {
                name: "本单位部门",
                type: d.type,
                domId: "zidingyi_" + d.id,
                domPid: d.domId,
                sort: -1,
                parentId: d.id,
                unitId: d.id
              }
            );
            pid = d.domId;
          }
          if (d.type == "organization" && d.domPid === pid) {
            d.domPid = 'zidingyi_' + d.unitId;
          }
        }
        let subNodes = [];
        let c = function (obj) {
          let _c = [];
          for (let i = 0; i < datas.length; i++) {
            let _d = _.cloneDeep(datas[i]);
            if (_d[pIdprop + ''] == obj[idprop + '']) {
              _c.push(_d);
              c(_d);
            }
          }
          obj.children = _c.sort((a, b) => {
            return a.sort > b.sort
          });
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

      //获取部门树
      getTree(){
        this.emptyText_ = "正在加载中...";
        this.data = [];
        config.getTree().then((data) => {
          this.emptyText_ = "暂无数据";
          if (data && data.data && data.data.length > 0) {
            //部门树排序
            let c = (tree) => {
              let a;
              for (let i = 0; i < tree.length; i++) {
                if (tree[i].children && tree[i].children.length > 0) {
                  let t = c(tree[i].children);
                  tree[i].children = t;
                }
                if (i === tree.length - 1) {
                  a = tree.sort((a, b) => {
                    return a.sort - b.sort
                  });
                }
              }
              return a;
            }
            let _c = this.make(data.data, 'domId', 'domPid')
            this.data = c(_c);
//            this.data =this.make(data.data, 'domId', 'domPid');
            if (this.firstEnter) {
              this.treeSelect = this.data[0].id;
              this.treeSelect0.push(this.treeSelect);
              this.id = this.data[0].id;
              this.type = this.data[0].type;
              this.parentId = this.data[0].parentId;
              this.unitId = this.data[0].unitId === null ? this.data[0].id : this.data[0].unitId;
              this.name = this.data[0].name;
            }
            this.getTable();
            this.firstEnter = false;
          }
        })
      },

      //获取列表
      getTable(id = this.id){
        this.emptyText = "正在加载中...";
        this.tableData = [];
        config.getTable({
          type: this.type,
          id: id,
        }).then((data) => {
          this.emptyText = "暂无数据";
          if (data && data.data) {
            this.tableData = data.data;
          }
          config.getTable({
            type: "",
            id: this.unitId
          }).then((data0) => {
            if (data0 && data0.data && data0.data.length > 0) this.dropDownList = data0.data;
            else this.dropDownList = [];
            config.getUnit(this.unitId).then((data1) => {
              if (data1 && data1.data && data1.data.name && data1.data.name.length > 0)
                this.dropDownList.unshift({name: data1.data.name, id: ""})
            })
          })
        })
      },

      //搜索左侧树
      handleSearch() {
        this.$refs.tree.filter(this.filterText);
      },
      filterNode(value, data, node) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },

      //修改
      orgEdit(index, _row){
        let row = _row;
        this.$refs.addOrgForm.resetFields();
        this.editId = row.id;
        this.addOrgVisible = true;
        config.getOrg(row.id).then((data) => {
          this.addOrgForm = data.data;
          this.dropDownSelect = "";
          if (data.data.parentId && data.data.parentId.length > 0) this.dropDownSelect = data.data.parentId;
          if(!Boolean(this.addOrgForm.sort)) this.addOrgForm.sort = "";
          else this.addOrgForm.sort+='';
          this.editCode = this.addOrgForm.code;
          this.editName = this.addOrgForm.name;
          this.lName = data.data.leaderName === null || data.data.leaderName === undefined ? "点击选择" : data.data.leaderName;
          this.mName = data.data.managerName === null || data.data.managerName === undefined ? "点击选择" : data.data.managerName;
          this.dmName = data.data.deputyManagerName === null || data.data.deputyManagerName === undefined ? "点击选择" : data.data.deputyManagerName;
        })
      },
      //点击树节点事件
      currentNodeClick(data){
        this.type = data.type;
        if (typeof(data.id) !== 'undefined' && data.id.length > 0) {
          this.id = data.id;
        }
        else {
          this.id = data.parentId;
        }
        this.unitId = (typeof(data.unitId) === 'undefined' || data.unitId === null) ? data.id : data.unitId;
        this.name = data.name;
        this.getTable();
      },
      //添加
      addOrg(){
        this.$refs.addOrgForm.resetFields();
        this.addOrgForm.manager="";
        this.addOrgForm.deputyManager="";
        this.addOrgForm.leader="";
        this.lName = "点击选择";
        this.mName = "点击选择";
        this.dmName = "点击选择";
        this.dialogTitle = '新增';
        this.dropDownSelect = "";
        for (let val of this.dropDownList) {
          if (val.id === this.id) this.dropDownSelect = this.id
        }
        this.addOrEdit = true;
        this.addOrgVisible = true;
        this.addOrgForm.orgType = 1;
        this.addOrgForm.unitId = this.unitId;
      },
      //表单提交（包括新增和修改）
      dataSubmit(){
//        this.addOrgForm.parentId=this.dropDownSelect;
        this.$refs.addOrgForm.validate((valid) => {
          if (valid) {
            let doc=document.getElementsByClassName('sy-dialog');
            let loadingInstance = Loading.service({
              target:doc[doc.length-1]
            })
            if(this.addOrgForm.memo)  this.addOrgForm.memo = this.addOrgForm.memo.trim();
            if (this.addOrEdit) {
              config.addData({
                name: this.addOrgForm.name,
                unitId: this.unitId,
                parentId: this.dropDownSelect,
                manager: this.addOrgForm.manager,
                deputyManager: this.addOrgForm.deputyManager,
                leader: this.addOrgForm.leader,
                code: this.addOrgForm.code,
                contact: this.addOrgForm.contact,
                contactPhone: this.addOrgForm.contactPhone,
                sort: this.addOrgForm.sort,
                memo: this.addOrgForm.memo,
                orgType: this.addOrgForm.orgType
              }).then(() => {
                this.$notify({
                  title: '成功',
                  message: '操作成功！',
                  type: 'success'
                });
                this.treeSelect = this.id;
                this.treeSelect0.push(this.treeSelect);
                this.getTree();
                loadingInstance.close();
                this.addOrgVisible = false;
              })
            } else {
              config.editData({
                id: this.addOrgForm.id,
                name: this.addOrgForm.name,
                unitId: this.unitId,
                parentId: this.dropDownSelect,
                manager: this.addOrgForm.manager,
                deputyManager: this.addOrgForm.deputyManager,
                leader: this.addOrgForm.leader,
                code: this.addOrgForm.code,
                contact: this.addOrgForm.contact,
                contactPhone: this.addOrgForm.contactPhone,
                sort: this.addOrgForm.sort,
                memo: this.addOrgForm.memo,
                orgType: this.addOrgForm.orgType
              }).then(() => {
                this.$notify({
                  title: '成功',
                  message: '操作成功！',
                  type: 'success'
                });
                this.treeSelect = this.id;
                this.treeSelect0.push(this.treeSelect);
                this.getTree();
                loadingInstance.close();
                this.addOrgVisible = false;
              })
            }
          }
        })
      },
      //删除
      handleDelete(index, row) {
        this.$confirm('此操作将删除该部门及其子部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          config.delData(row.id).then(() => {
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.treeSelect = this.id;
            this.treeSelect0.push(this.treeSelect);
            this.getTree();
          })

        }).catch(() => {

        });
      }
    }
  }
</script>

<style scoped>
  .selectBtn-in-dialog{
    width:100%;
    padding:3px 10px;
    border-color: #bfcbd9;
    height:30px;
    font-size: 12px;
    text-align: left;
  }

  .full-parent {
    position: relative;
    height: 100%;
  }
</style>
