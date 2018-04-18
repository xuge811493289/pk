<template>
  <div class="app-container-box" >
    <div class="sy-div-appCenter">

      <el-table
        :data="appData"
        style="width:100%;text-align: center; ">
        <el-table-column
          align="center"
          prop="name"
          label="应用名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="appType"
          label="应用资源类型">
          <template scope="scope">
            <span>{{scope.row.appType === 1 ? '内部应用' : scope.row.appType === 2 ? '手机应用' : scope.row.appType === 3 ? '第三方应用' : ''}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="code"
          label="code">
        </el-table-column>
        <el-table-column
          align="center"
          prop="username"
          label="负责人">
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="状态">
          <template scope="scope">
            <span>{{scope.row.status === 1 ? '启用' : '禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="autoapprove"
          label="自动同步授权">
          <template scope="scope">
            <span>{{scope.row.autoapprove === 'true'  ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="autologout"
          label="自动同步注销">
          <template scope="scope">
            <span>{{scope.row.autologout  ? '是' : '否'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="150">
          <template scope="scope">
            <el-tooltip effect="dark" content="查看详情" placement="top">
              <i class="fa fa-eye sy-i-iconHandle" @click="handleTip(scope.$index, scope.row)" style="cursor: pointer"></i>
            </el-tooltip>
            <el-tooltip effect="dark" content="编辑" placement="top">
              <i class="fa fa-edit sy-i-iconHandle" @click="handleEdit(scope.$index, scope.row)" style="cursor: pointer"></i>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <i class="fa fa-close sy-i-iconHandle" @click="handleRemove(scope.$index, scope.row)" style="color:red;font-size:17px;cursor: pointer"></i>
            </el-tooltip>
            <el-tooltip effect="dark" content="资源授权" placement="top">
              <i class="fa fa-user-secret sy-i-iconHandle" @click="handleShowAuth(scope.$index, scope.row)" style="cursor: pointer"></i>
            </el-tooltip>
            <el-tooltip effect="dark" content="服务授权" placement="top">
              <i class="fa fa-server sy-i-iconHandle" @click="handleShowSerAuth(scope.$index, scope.row)" style="cursor: pointer"></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <sy-dialog
      title="编辑"
      position="middle"
      height="520px"
      slide="fade"
      width="680px"
      :visible.sync="editVisible">
      <div slot="body">
        <el-form :model="appInfoForm"
                 :rules="appInfoRules"
                 ref="appInfoForm"
                 label-width="120px"
                 class="demo-ruleForm"
                 style="padding-right:10px;">
            <el-col :span="12">
              <el-form-item label="应用名称："  prop="name" style="margin-bottom: 10px;margin-top:10px">
                <el-input size="small" v-model="appInfoForm.name" ></el-input>
              </el-form-item>
              <el-form-item label="应用编码：" prop="code" style="margin-bottom: 10px;">
                <el-input size="small" v-model="appInfoForm.code"></el-input>
              </el-form-item>
              <el-form-item label="授权方式：" prop="authorizedGrantTypes" style="margin-bottom: 10px;" >
                <el-checkbox-group v-model="appInfoForm.authorizedGrantTypes" class="sy-checkBox-appCenter">
                  <p style="margin: 0"><el-checkbox label="password" name="authorizedGrantTypes" style="line-height:44px; margin-left: 15px">密码模式</el-checkbox></p>
                  <p style="margin: 0"><el-checkbox label="authorization_code" name="authorizedGrantTypes" style="line-height:44px; margin-left: 15px">授权码模式</el-checkbox></p>
                  <p style="margin: 0"><el-checkbox label="client_credentials" name="authorizedGrantTypes" style="line-height:44px; margin-left: 15px">客户端模式</el-checkbox></p>
                </el-checkbox-group>
              </el-form-item>

              <el-form-item label="token有效期：" prop="accessTokenValidity" style="margin-bottom: 10px;" >
                <el-input size="small" v-model.number="appInfoForm.accessTokenValidity"></el-input>
              </el-form-item>
              <el-form-item label="退出url：" prop="webServerLogoutUri" style="margin-bottom: 10px;">
                <el-input size="small" v-model="appInfoForm.webServerLogoutUri"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应用类型：" prop="appType" style="margin-top:10px; margin-bottom: 10px;">
                <el-select v-model="appInfoForm.appType" placeholder="请选择" style="width:100%">
                  <el-option label="内部应用" value="1"></el-option>
                  <el-option label="手机应用" value="2"></el-option>
                  <el-option label="第三方应用" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="秘钥：" prop="clientSecret" style="margin-bottom: 10px;" >
                <el-input type="password" size="small" v-model="appInfoForm.clientSecret"></el-input>
              </el-form-item>
              <el-form-item label="状态：" prop="status" style="margin-bottom: 10px;" >
                <el-switch
                  v-model="appInfoForm.status"
                  on-color="#13ce66"
                  off-color="#ff4949">
                </el-switch>
              </el-form-item>
              <el-form-item label="自动审核：" prop="autoapprove" style="margin-bottom: 10px;margin-top:10px" >
                <el-switch
                  v-model="appInfoForm.autoapprove"
                  on-color="#13ce66"
                  off-color="#ff4949">
                </el-switch>
              </el-form-item>
              <el-form-item label="自动退出：" prop="autologout" style="margin-bottom: 10px;" >
                <el-switch
                  v-model="appInfoForm.autologout"
                  on-color="#13ce66"
                  off-color="#ff4949">
                </el-switch>
              </el-form-item>
              <el-form-item label="负责人：" style="margin-bottom: 10px;">
                <el-button @click="selPerson" style="width:100%">{{tplUserName}}</el-button>
              </el-form-item>
              <el-form-item label="转发url：" prop="webServerRedirectUri" style="margin-bottom: 10px;">
                <el-input size="small" v-model="appInfoForm.webServerRedirectUri"></el-input>
              </el-form-item>

            </el-col>
          <el-col :span="24">
          <el-form-item label="简介描述：" prop="additionalInformation">
            <el-input type="textarea" v-model="appInfoForm.additionalInformation"></el-input>
          </el-form-item>
          </el-col>
        </el-form>

      </div>
      <div slot="footer">
        <el-button size="small" @click="editVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click=" submitForm('appInfoForm')" >确 定</el-button>
      </div>
    </sy-dialog>
    <sy-dialog
      title="资源授权"
      :fullscreen="false"
      :modalAppendToBody="false"
      position="middle"
      height="60%"
      slide="fade"
      width="30%"
      :closeOnClickModal="true"
      :visible.sync="authVisible">
      <div slot="body">
        <el-tree
          :data="authData"
          :props="defaultProps"
          node-key="id"
          show-checkbox
          @check-change="statusChange"
          :default-checked-keys="arrAuth"
          :expand-on-click-node="false"
          style="border:none;padding-top:10px">
        </el-tree>
      </div>
      <div slot="footer">
        <el-button size="small" @click="authVisible = false">取 消</el-button>
        <el-button type="primary"  @click="subMitAuth">提交</el-button>
      </div>
    </sy-dialog>
    <sy-dialog
      title="服务授权"
      :fullscreen="false"
      :modalAppendToBody="false"
      position="middle"
      height="60%"
      slide="fade"
      width="30%"
      :closeOnClickModal="true"
      :visible.sync="serAuthVisible">
      <div slot="body">
        <el-tree
          :data="serAuthData"
          :props="defaultProps"
          node-key="id"
          show-checkbox
          @check-change="statusSerChange"
          :default-checked-keys="arrSerAuth"
          :expand-on-click-node="false"
          style="border:none;padding-top:10px">
        </el-tree>
      </div>
      <div slot="footer">
        <el-button size="small" @click="serAuthVisible = false">取 消</el-button>
        <el-button type="primary"  @click="subMitSerAuth">提交</el-button>
      </div>
    </sy-dialog>
    <sy-dialog
      title="查看详情"
      position="middle"
      height="auto"
      slide="fade"
      width="40%"
      :closeOnClickModal="true"
      :visible.sync="tipVisiable">
      <div slot="body" style="padding: 10px">
        <el-row class="sy-rowCol-info" style="border-top: 1px solid #DFE6EC">
          <el-col :span="6" class="sy-elCol-info">应用授权id：</el-col>
          <el-col :span="18" class="sy-elCol-infoC">{{tipForm.clientId}}</el-col>
        </el-row>
        <el-row class="sy-rowCol-info">
          <el-col :span="6" class="sy-elCol-info">token有效期：</el-col>
          <el-col :span="18" class="sy-elCol-infoC">{{tipForm.accessTokenValidity}}</el-col>
        </el-row>
        <el-row class="sy-rowCol-info">
          <el-col :span="6" class="sy-elCol-info">应用授权秘钥：</el-col>
          <el-col :span="18" class="sy-elCol-infoC">{{tipForm.clientSecret}}</el-col>
        </el-row>
        <el-row class="sy-rowCol-info">
          <el-col :span="6" class="sy-elCol-info">跳转地址：</el-col>
          <el-col :span="18" class="sy-elCol-infoC">{{tipForm.webServerRedirectUri}}</el-col>
        </el-row>
        <el-row class="sy-rowCol-info">
          <el-col :span="6" class="sy-elCol-info">注销地址：</el-col>
          <el-col :span="18" class="sy-elCol-infoC">{{tipForm.webServerLogoutUri}}</el-col>
        </el-row>
        <el-row class="sy-rowCol-info">
          <el-col :span="6" class="sy-elCol-info">服务名称：</el-col>
          <el-col :span="18" class="sy-elCol-infoC">{{tipForm.serviceNames}}</el-col>
        </el-row>
        <el-row class="sy-rowCol-info">
          <el-col :span="6" class="sy-elCol-info">授权模式：</el-col>
          <el-col :span="18" class="sy-elCol-infoC">
            <el-checkbox-group v-model="tipForm.authorizedGrantTypes" style="display: inline-block" class="sy-checkBox-appCenter">
              <el-checkbox label="password" name="authorizedGrantTypes" disabled style="display: inline-block">密码模式</el-checkbox>
              <el-checkbox label="authorization_code" name="authorizedGrantTypes" style="display: inline-block" disabled>授权码模式</el-checkbox>
              <el-checkbox label="client_credentials" name="authorizedGrantTypes" style="display: inline-block" disabled>客户端模式</el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row class="sy-rowCol-info">
          <el-col :span="6" class="sy-elCol-info">简介描述：</el-col>
          <el-col :span="18" class="sy-elCol-infoC">{{tipForm.additionalInformation}}</el-col>
        </el-row>
        <!--<el-form ref="form" :model="tipForm" label-width="100px" >-->
          <!--<el-form-item label="应用授权id">-->
            <!--<el-input v-model="tipForm.clientId" disabled></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="应用授权秘钥">-->
            <!--<el-input v-model="tipForm.clientSecret" disabled></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="授权模式">-->
            <!--<el-checkbox-group v-model="tipForm.authorizedGrantTypes" class="sy-checkBox-appCenter">-->
              <!--<el-checkbox label="password" name="authorizedGrantTypes" disabled>密码模式</el-checkbox>-->
              <!--<el-checkbox label="authorization_code" name="authorizedGrantTypes" disabled>授权码模式</el-checkbox>-->
              <!--<el-checkbox label="client_credentials" name="authorizedGrantTypes" disabled>客户端模式</el-checkbox>-->
            <!--</el-checkbox-group>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="token有效期">-->
            <!--<el-input v-model="tipForm.accessTokenValidity" disabled></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="跳转地址">-->
            <!--<el-input v-model="tipForm.webServerRedirectUri" disabled></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="注销地址">-->
            <!--<el-input v-model="tipForm.webServerLogoutUri" disabled></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="简介描述">-->
            <!--<el-input type="textarea" v-model="tipForm.additionalInformation" disabled></el-input>-->
          <!--</el-form-item>-->
         <!--</el-form>-->

      </div>
      <div slot="footer">
        <el-button @click="tipVisiable=false">关闭</el-button>
      </div>
    </sy-dialog>


  </div>
</template>

<script>
  import _ from 'lodash';
  // import {add} from '../../api/test.js';
  import config from './config.js';
  import {getAppList,
          ERR_OK,
          getTipList,
          delAppList,
          getAuth,
          postAuth,
          postAppInfo,
          getSerByClientId,
          postSerAuth} from './request'

  export default {
    name: '',
    components: {
    },
    data () {
      //  url 校验
      var web = (rule, value, callback) => {
        if (!value) {
          callback()
        } else {
          var reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
          if(!reg.test(value)) {
            callback(new Error('URL格式不正确'));
          }else{
            callback();
          }
        }
      }

      //  50长度校验
      var lengths = (rule, value, callback) => {
        if (!value) {
          callback()
        } else {
          if (value.length > 50) {
            callback(new Error('长度不能超过50个字符'))
          } else {
            callback()
          }
        }
      }

      //  100长度校验
      var lengthS = (rule, value, callback) => {
        if (value.length > 100) {
          callback(new Error('长度不能超过100个字符'))
        } else {
          callback()
        }
      }

      //  4096长度校验
      var lengthSS = (rule, value, callback) => {
        if (!value) {
          callback()
        } else {
          if (value.length > 4096) {
            callback(new Error('长度不能超过4096个字符'))
          } else {
            callback()
          }
        }
      }

      //  最大数值校验
      var max = (rule, value, callback) => {
        if (!value) {
          callback()
        } else {
          if (value > 2147483647) {
            callback(new Error("最大值不能超过2147483647"))
          } else {
            callback()
          }
        }
      }

      //  重复校验
      var same = (rule, value, callback) => {
        if (!value) {
          callback()
        } else {
          if (value === this.appInfoForm.webServerLogoutUri) {
            callback(new Error("转发url不可与退出url相同"))
          } else {
            callback()
          }
        }
      }

      return {
        arrSerAuth: [],
        serAuthData: [],
        serAuthVisible: false,
        arrAuth: [],
        appData: [],
        ids: '',
        appInfoRules: {
          name: [
            { validator: lengths, trigger: 'blur' }
          ],
          code: [
            { validator: lengths, trigger: 'blur' }
          ],
          accessTokenValidity: [
            { validator: max, trigger: 'blur' },
            { type: 'number', message: '年龄必须为数字值'}
          ],
          clientSecret: [
            { required: true, message: '秘钥不能为空'},
            { validator: lengthS, trigger: 'blur' }
          ],
          webServerLogoutUri: [
            { validator: web, trigger: 'blur' }
          ],
          webServerRedirectUri: [
            { validator: web, trigger: 'blur' },
            { validator: same, trigger: 'blur' }
          ],
          additionalInformation: [
            { validator: lengthSS, trigger: 'blur' }
          ]
        },
        clientId: '',
        editVisible:false,
        authVisible:false,
        cloneVisible:false,
        authData: config.authData,
        tplUserId: [],
        tplUserIds: '',
        tplUserName:"",
        appInfoForm:{
          name: '',
          code: '',
          appType: '',
          authorizedGrantTypes: [],
          autoapprove: false,
          autologout: false,
          accessTokenValidity: '',
          status: false,
          clientSecret: '',
          webServerLogoutUri: '',
          webServerRedirectUri: ''
        },
        tipForm: {},
        tipVisiable: false,
        addCloneRules: {
          name: [
            { required: true, message: "请输入主题", trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择备份内容', trigger: 'change' }
          ]
        },
        radio: "0",
        cloneForm: {
          name: '',
          type: []
        },
        defaultProps: {
          label:'name',
          children: 'children'
        }
      }
    },
    beforeCreate(){

    },
    created(){
      this.$parent.$emit('currentPage','/base/AppCenter');
      this._getAppList()
    },
    mounted() {

    },
    methods:{
      //  服务授权提交
      subMitSerAuth() {
        let serverIds = this.arrSerAuth.join(',')
        this._postSerAuth({
          clientId: this.clientId,
          serviceIds: serverIds
        })
      },

      //  服务授权
      handleShowSerAuth(index, row) {
        this.arrSerAuth = []
        this._getSerByClientId({
          clientId: row.clientId
        })
        this.clientId = row.clientId
      },

      //  选人控件
      selPerson() {
        this.$SelectUsers({
          selectUserType: 2,
          selectUserIds: this.tplUserId
        }, (selectUsers, instance) => {
            console.log(selectUsers);
          if (selectUsers.length > 1) {
            this.$message({
              type: 'warning',
              message: '最多选择一个！'
            });
            this.selPerson();
          } else {
            this.tplUserId = [];
            for(let i = 0; i < selectUsers.length; i++) {
              this.tplUserId.push(selectUsers[i].id);
            }
            this.tplUserName = selectUsers[0].realName;
          }
        })
      },

      //  编辑按钮的操作
      handleEdit(index, val) {
        this.$refs.appInfoForm.resetFields()
        this._editAppInfo({
          clientId: val.clientId
        })
      },

      //  查看详情
      handleTip(index, val) {
        this._getTipList({
          clientId: val.clientId
        })
      },

      //  手动删除
      handleRemove(index, val) {
        this.$confirm('此操作将永久删除该应用, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this._delAppList({
            clientId: val.clientId
          })
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },

      //  选择权限
      statusChange(data, sel) {
        if (sel) {
          for (let i = 0; i < this.arrAuth; i++) {
            if (this.arrAuth[i] === data.id) {
                return
            }
          }
          this.arrAuth.push(data.id)
        } else {
          for (let i = 0; i < this.arrAuth.length; i++) {
            if (this.arrAuth[i] === data.id) {
              this.arrAuth.splice(i, 1)
            }
          }
        }
      },

      //  选择服务权限
      statusSerChange(data, sel) {
        if (sel) {
          for (let i = 0; i < this.arrSerAuth; i++) {
            if (this.arrSerAuth[i] === data.id) {
              return
            }
          }
          this.arrSerAuth.push(data.id)
        } else {
          for (let i = 0; i < this.arrSerAuth.length; i++) {
            if (this.arrSerAuth[i] === data.id) {
              this.arrSerAuth.splice(i, 1)
            }
          }
        }
      },

      //  提交权限
      subMitAuth() {
        this.ids = this.arrAuth.join(',')
        this._postAuth({
          clientId: this.clientId,
          ids: this.ids
        })
        this.arrAuth = []
      },

      //  显示权限
      handleShowAuth(index, val) {
        this.arrAuth = []
        this._getAuth({
          clientId: val.clientId
        })
        this.clientId = val.clientId
      },

      //  提交修改表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (formName === 'appInfoForm') {
              let appInforms = {}
              for (let attr in this.appInfoForm) {
                if (attr === 'authorizedGrantTypes') {
                  appInforms[attr] = this.appInfoForm[attr].join(',')
                } else if (attr === 'autoapprove') {
                  appInforms[attr] = this.appInfoForm[attr].toString()
                } else if (attr === 'appType') {
                  appInforms[attr] = parseInt(this.appInfoForm[attr])
                } else if (attr === 'status') {
                  appInforms[attr] = this.appInfoForm[attr] ? 1 : 0
                } else if (attr === 'autologout') {
                  appInforms[attr] = this.appInfoForm[attr] ? 1 : 0
                } else {
                  appInforms[attr] = this.appInfoForm[attr]
                }
              }
              appInforms.userId = this.tplUserId[0]
              this._postAppInfo(appInforms)
            }
          } else {
            this.$notify({
              title: '提示',
              message: '操作失败',
              type: 'info'
            })
          }
        });
      },

      //  渲染权限树
      renderContent(h,{ node, data, store }) {
        return h('span',{attrs:{
          style:"width:50%"
        }},[
          h('span',node.label)
        ])
      },

      //  获取应用中心相关数据
      _getAppList() {
        getAppList().then((res) => {
          if (res.code === ERR_OK) {
            this.appData = res.data;
          }
        })
      },

      //  获取详情页数据
      _getTipList(param) {
        getTipList(param).then((res) => {
          if (res.code === ERR_OK) {
            for (let attr in res.data) {
              if (attr === 'authorizedGrantTypes') {
                res.data[attr] = res.data[attr].split(',')
              }
            }
            this.tipForm = res.data
            this.tipVisiable = true
          }
        })
      },

      //  删除数据
      _delAppList(param) {
        delAppList(param).then((res) => {
          if (res.code === ERR_OK) {
            this.$notify({
              title: '提示',
              message: '操作成功！',
              type: 'success'
            });
            this._getAppList()
          } else {
            this.$notify({
              title: '提示',
              message: '操作失败！',
              type: 'error'
            });
          }
        })
      },

      //  获取权限数据
      _getAuth(param) {
        getAuth(param).then((res) => {
          if (res.code === ERR_OK) {
            this.authData = res.data
            res.data.forEach((val, index) => {
              for (let attr in val) {
                if (attr == 'isSelect') {
                  if (val[attr]) {
                    this.arrAuth.push(val['id'])
                  }
                }
              }
            })
            this.authVisible = true
          }
        })
      },

      //  发送权限数据
      _postAuth(param) {
        postAuth(param).then((res) => {
          if (res.code === ERR_OK) {
            this.$notify({
              title: '提示',
              message: '操作成功！',
              type: 'success'
            })
          this.authVisible = false
          } else {
            this.$notify({
              title: '提示',
              message: '操作失败！',
              type: 'info'
            });
          }
        })
      },

      //  获取编辑所需应用中心数据
      _editAppInfo(param) {
        getTipList(param).then((res) => {
            console.log(res);
          if (res.code === ERR_OK) {
            for (let attr in res.data) {
              if (attr === 'status') {
                this.appInfoForm[attr] = res.data[attr] === 1 ? true : false
              } else if (attr === 'autologout') {
                this.appInfoForm[attr] = res.data[attr] ? true : false
              } else if (attr === 'authorizedGrantTypes') {
                if (!res.data[attr]) {
                  this.appInfoForm[attr] = ''
                } else {
                  this.appInfoForm[attr] = res.data[attr].split(',')
                }
              } else if (attr === 'appType') {
                if (!res.data[attr]) {
                  this.appInfoForm[attr] = ''
                } else {
                  this.appInfoForm[attr] = res.data[attr].toString()
                }
              } else if (attr === 'autoapprove') {
                this.appInfoForm[attr] = res.data[attr] === "true" ? true : false
              } else if (attr === 'userId') {
                if (!res.data[attr]) {
                  this.tplUserId = []
                  this.tplUserName = "点击选择"
                } else {
                  this.tplUserId.push(res.data[attr])
                  this.tplUserName = res.data.username;
                }
              } else {
                this.appInfoForm[attr] = res.data[attr]
              }
            }
            this.editVisible = true
          }
        })
      },

      //  发送编辑后应用中心数据
      _postAppInfo(param) {
        postAppInfo(param).then((res) => {
          if (res.code === ERR_OK) {
            this.$notify({
              title: '提示',
              message: '操作成功！',
              type: 'success'
            })
            this.editVisible = false
            this._getAppList()
          }
        })
      },

      //  根据clientId获取服务数据
      _getSerByClientId(param) {
        getSerByClientId(param).then((res) => {
          if (res.code === ERR_OK) {
            this.serAuthData = res.data
            res.data.forEach((val, index) => {
              for (let attr in val) {
                if (attr == 'isSelect') {
                  if (val[attr]) {
                    this.arrSerAuth.push(val['id'])
                  }
                }
              }
            })
            this.serAuthVisible = true
          }
        })
      },

      //  提交服务权限
      _postSerAuth(param) {
        postSerAuth(param).then((res) => {
          if (res.code === ERR_OK) {
            this.$notify({
              title: '提示',
              message: '操作成功！',
              type: 'success'
            })
            this.serAuthVisible = false
          } else {
            this.$notify({
              title: '提示',
              message: '操作失败！',
              type: 'info'
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
.sy-div-appCenter{
  padding:10px;
}

.sy-i-iconHandle{
  display: inline-block;
  color:#20A0FF;
  font-size:14px;
  line-height: 24px;
  margin-right:5px;
}
.sy-rowCol-info {
  line-height: 40px;
  border-right: 1px solid #DFE6EC;
  border-left: 1px solid #DFE6EC;
  border-bottom: 1px solid #DFE6EC;
}
.sy-elCol-infoC {
  padding: 0 8px;
}
.sy-elCol-info {
  background: #EEF1F6;
  border-right: 1px solid #DFE6EC;
  text-align: center;
}
</style>
