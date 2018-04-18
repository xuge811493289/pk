<template>
  <div class="app-container-box">
    <sy-grad-4>
      <div slot="headerLeft" v-if="isvisible_left">单位</div>
      <div slot="bodyLeft" v-if="isvisible_left">
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
              :empty-text="emptyText_"
              ref="tree"
              :data="treeData"
              :props="defaultProps"
              :filter-node-method="filterNode"
              node-key="id"
              style="border:0;"
              class="full-parent"
              highlight-current
              :current-node-key="1"
              @node-click="handleNodeClick">
            </el-tree>
          </div>
        </sy-grad-4>
      </div>
      <div slot="headerRight" style="line-height: 40px">
        <span v-if="unitType==1">教研室</span>
        <span v-else>教研备课组</span>
      </div>
      <div slot="bodyRight">
        <sy-grad-4 :border="false" headerH="40px">
          <div slot="headerRight" style="line-height: 40px">
            <span v-show="isvisible_back" style="font-weight: normal">当前操作：{{operating}}</span>
            <span class="button-right">
                  <el-button v-if="isvisible_back" size="small" @click="handelBack">返回</el-button>
                  <el-button v-if="(!isvisible_back)&&(codeList.btn_base_teachinggroup_add)" size="small" @click="newJY()">新增</el-button>
                  <el-button v-if="(isvisible_back)&&(codeList.btn_base_teachinggroup_addBKZ)" size="small" @click="newBKZ()">新增
                  </el-button>
                </span>
          </div>
          <div slot="bodyRight" style="width:100%; height:100%; padding:0px 10px 10px 10px">
            <el-table
              :empty-text="emptyText_JY"
              v-if="!isvisible_back"
              ref="multipleTable"
              :data="tableData"
              border
              height="100%"
              style="width:100%; height:100%">
              <el-table-column v-for="item in tableList"
                               :label="unitType==1?item.label1:item.label"
                               :prop="item.prop"
                               :key="item.prop"
                               :width="item.width">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template scope="scope">
                  <el-button
                    v-if="(unitType===2)&&(codeList.btn_base_teachinggroup_maintenance)"
                    size="small"
                    type="text"
                    @click="lSetting(scope.$index, scope.row)">
                    <i class="fa fa-cogs" aria-hidden="true" title="备课组维护"></i>
                  </el-button>
                  <el-button
                    v-if="codeList.btn_base_teachinggroup_update"
                    size="small"
                    type="text"
                    @click="addOrEdit=false,lEdit(scope.$index, scope.row)">
                    <i class="fa fa-pencil-square-o" aria-hidden="true" title="修改"></i>
                  </el-button>
                  <el-button
                    v-if="codeList.btn_base_teachinggroup_delete"
                    size="small"
                    type="text"
                    @click="lDelete(scope.$index, scope.row)">
                    <i class="el-icon-delete" title="删除"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              :empty-text="emptyText_BKZ"
              v-else
              ref="multipleTable"
              :data="tableData2"
              border
              height="100%"
              style="width:100%; height:100%">
              <el-table-column v-for="item in settingList"
                               :label="item.label"
                               :prop="item.prop"
                               :key="item.prop"
                               :width="item.width">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template scope="scope">
                  <el-button
                    v-if="codeList.btn_base_teachinggroup_editBKZ"
                    size="small"
                    type="text"
                    @click="addOrEdit=false,sEdit(scope.$index, scope.row)">
                    <i class="fa fa-pencil-square-o" aria-hidden="true" title="修改"></i>
                  </el-button>
                  <el-button
                    v-if="codeList.btn_base_teachinggroup_deleteBKZ"
                    size="small"
                    type="text"
                    @click="sDelete(scope.$index, scope.row)">
                    <i class="el-icon-delete" title="删除"></i>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </sy-grad-4>
      </div>
    </sy-grad-4>
    <sy-dialog
      :title="dialogTitle"
      position="middle"
      height="auto"
      slide="fade"
      width="633px"
      :visible.sync="isvisible_dialog">
      <div slot="body" style="height: auto">
        <el-form :model="JYdata" ref="JYdata" :rules="rules" label-width="120px" style="height:auto; margin:10px 10px 0 0;">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称：" prop="name">
                <el-input v-model.trim="JYdata.name"></el-input>
              </el-form-item>
              <el-form-item label="教研组副组长：" prop="deManager">
                <el-button v-model="JYdata.deManagerId" class="selectBtn-in-dialog" :style="{color: deManagerLabel==='点击选择'?'#99A9BF':''}" @click="selectDeManager">{{deManagerLabel}}</el-button>
              </el-form-item>
              <el-form-item label="电话号码：" prop="contactPhone">
                <el-input v-model.trim="JYdata.contactPhone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="教研组组长：" prop="manager">
                <el-button v-model="JYdata.managerId" class="selectBtn-in-dialog" :style="{color: managerLabel==='点击选择'?'#99A9BF':''}" @click="selectManager">{{managerLabel}}</el-button>
              </el-form-item>
              <el-form-item label="分管领导：" prop="leader">
                <el-button v-model="JYdata.leaderId" class="selectBtn-in-dialog" :style="{color: leaderLabel==='点击选择'?'#99A9BF':''}" @click="selectLeader">{{leaderLabel}}</el-button>
              </el-form-item>
              <el-form-item label="序号：" prop="sort" @change="$removeZero(JYdata.sort,JYdata,'sort')">
                <el-input v-model.trim="JYdata.sort"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="包含课程：" class="is-required">
                <el-button :class="JYcourseBtn" style="text-overflow: ellipsis; overflow: hidden" :style="{color: subjectLabel==='可选择多个'?'#99A9BF':''}" :title="subjectLabel" @click="isvisible_course=true"><nobr>{{subjectLabel}}</nobr></el-button>
              </el-form-item>
              <el-form-item prop="checkedSubjects" style="margin-top: -15px">
                <el-input v-show="false" v-model="JYdata.checkedSubjects"></el-input>
              </el-form-item>

              <el-form-item :label="selectLabel" class="is-required">
                <el-button :class="JYgradeBtn"  style="text-overflow: ellipsis; overflow: hidden" :style="{color: gradeLabel==='可选择多个'?'#99A9BF':''}" :title="gradeLabel" @click="unitType==1?isvisible_stage=true:isvisible_grade=true"><nobr>{{gradeLabel}}</nobr></el-button>
              </el-form-item>
              <el-form-item prop="checkedGrades" style="margin-top: -15px">
                <el-input v-show="false" v-model="JYdata.checkedGrades"></el-input>
              </el-form-item>

              <el-form-item label="描述信息：" prop="memo">
                <el-input v-model="JYdata.memo" type="textarea" :autosize="{ minRows: 2, maxRows: 5}"
                          style="width:100%; height:auto; margin:5px 0"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="isvisible_dialog=false">取消</el-button>
        <el-button type="primary" @click="submitJY()">确定</el-button>
      </div>
    </sy-dialog>

    <sy-dialog
      :title="sDialogTitle"
      position="middle"
      slide="fade"
      height="auto"
      width="593px"
      :visible.sync="isvisible_sDialog">
      <div slot="body" style="height: auto; overflow: hidden">
        <el-form :model="BKZdata" :rules="rules2" ref="BKZdata" label-width="100px" style="margin:10px 10px 0 0; height:auto">
          <el-col :span="12">
            <el-form-item label="名称：" prop="name">
              <el-input v-model.trim="BKZdata.name"></el-input>
            </el-form-item>
            <el-form-item label="备课副组长：">
              <el-button v-model="BKZdata.deputyLessonPreparationLeaderId" class="selectBtn-in-dialog" :style="{color: BKZdeCaptin==='点击选择'?'#99A9BF':''}" @click="selectDeLeader2">{{BKZdeCaptin}}</el-button>
            </el-form-item>

            <el-form-item label="包含学科：" class="is-required">
              <el-button type="textarea" :class="BKZcourseBtn" style="text-overflow: ellipsis; overflow: hidden" :style="{color: BKZsubject==='可选择多个'?'#99A9BF':''}" :title="BKZsubject" @click="isvisible_course2=true"><nobr>{{BKZsubject}}</nobr></el-button>
            </el-form-item>
            <el-form-item prop="courseIds" style="margin-top: -22px">
              <el-input v-show="false" v-model="BKZdata.courseIds"></el-input>
            </el-form-item>

            <el-form-item label="包含年级：" class="is-required">
              <el-button :class="BKZgradeBtn" style="text-overflow: ellipsis; overflow: hidden" :style="{color: BKZgrade==='可选择多个'?'#99A9BF':''}" :title="BKZgrade" @click="isvisible_grade2=true"><nobr>{{BKZgrade}}</nobr></el-button>
            </el-form-item>
            <el-form-item prop="gradeIds" style="margin-top: -22px">
              <el-input v-show="false" v-model="BKZdata.gradeIds"></el-input>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="备课组长：">
              <el-button v-model="BKZdata.lessonPreparationLeaderId" class="selectBtn-in-dialog" :style="{color: BKZcaptin==='点击选择'?'#99A9BF':''}" @click="selectLeader2">{{BKZcaptin}}</el-button>
            </el-form-item>
            <el-form-item label="联系电话：" prop="contact">
              <el-input v-model="BKZdata.contact"></el-input>
            </el-form-item>
            <el-form-item label="序号：" prop="sort" @change="$removeZero(BKZdata.sort,BKZdata,'sort')">
              <el-input v-model.trim="BKZdata.sort"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="isvisible_sDialog=false">取消</el-button>
        <el-button @click="submitBKZ()" type="primary">确定</el-button>
      </div>
    </sy-dialog>

    <sy-dialog
      title="选择课程"
      position="middle"
      slide="fade"
      height="500px"
      width="300px"
      :visible.sync="isvisible_course">
      <div slot="body">
        <sy-tree
          :data="courseData"
          :props="defaultProps"
          style="border:0;"
          class="full-parent"
          ref="course"
          node-key="id"
          :default-expanded-keys="cIds"
          :default-checked-keys="cIds"
          :check-strictly="true"
          show-checkbox
          @node-click="courseNodeClick"
          :filter-node-method="courseFilter">
        </sy-tree>
      </div>
      <div slot="footer">
        <el-button @click="isvisible_course=false">取消</el-button>
        <el-button @click="courseSelect" type="primary">确定</el-button>
      </div>
    </sy-dialog>

    <sy-dialog
      title="选择课程"
      position="middle"
      slide="fade"
      height="500px"
      width="300px"
      :visible.sync="isvisible_course2">
      <div slot="body">
        <sy-tree
          :data="courseData2"
          :props="defaultProps"
          style="border:0;"
          class="full-parent"
          ref="course2"
          node-key="id"
          :check-strictly="true"
          show-checkbox
          @node-click="course2NodeClick">
        </sy-tree>
      </div>
      <div slot="footer">
        <el-button @click="isvisible_course2=false">取消</el-button>
        <el-button @click="courseSelect2" type="primary">确定</el-button>
      </div>
    </sy-dialog>

    <sy-dialog
      title="选择年级"
      position="middle"
      slide="fade"
      height="500px"
      width="300px"
      :visible.sync="isvisible_grade">
      <div slot="body">
        <sy-tree
          :data="gradeData"
          :props="defaultProps"
          style="border:0;"
          class="full-parent"
          ref="grade"
          node-key="id"
          :default-expanded-keys="gIds"
          :default-checked-keys="gIds"
          :check-strictly="true"
          show-checkbox
          @node-click="gradeNodeClick">
        </sy-tree>
      </div>
      <div slot="footer">
        <el-button @click="isvisible_grade=false">取消</el-button>
        <el-button @click="gradeSelect" type="primary">确定</el-button>
      </div>
    </sy-dialog>

    <sy-dialog
      title="选择年级"
      position="middle"
      slide="fade"
      height="500px"
      width="300px"
      :visible.sync="isvisible_grade2">
      <div slot="body">
        <sy-tree
          :data="gradeData2"
          :props="defaultProps"
          style="border:0;"
          class="full-parent"
          ref="grade2"
          node-key="id"
          :check-strictly="true"
          @node-click="grade2NodeClick"
          show-checkbox>
        </sy-tree>
      </div>
      <div slot="footer">
        <el-button @click="isvisible_grade2=false">取消</el-button>
        <el-button @click="gradeSelect2" type="primary">确定</el-button>
      </div>
    </sy-dialog>

    <sy-dialog
      title="选择学段"
      position="middle"
      slide="fade"
      height="500px"
      width="300px"
      :visible.sync="isvisible_stage">
      <div slot="body">
        <el-tree
          :data="stageData"
          :props="defaultProps"
          style="border:0;"
          class="full-parent"
          ref="stage"
          node-key="id"
          :default-expanded-keys="sIds"
          :default-checked-keys="sIds"
          :check-strictly="true"
          show-checkbox
          @node-click="stageNodeClick">
        </el-tree>
      </div>
      <div slot="footer">
        <el-button @click="isvisible_stage=false">取消</el-button>
        <el-button @click="stageSelect" type="primary">确定</el-button>
      </div>
    </sy-dialog>
  </div>
</template>

<script>
  import config from './config.js';
  import pager from '../../config.js';
  import _ from 'lodash';
  import {Loading} from 'element-ui';
  import {getRcCodeList} from '../../request.js';

  export default {
    name: 'tlLessons',
    components: {},
    data () {
      //验证联系电话
      var checkPhone = (rule, value, callback) => {
        if (this.$checkContact(value)) {
          return callback();
        }
        return callback(new Error("联系电话输入有误！"))
      };

      //验证序号
      var checkSort = (rule, value, callback) => {
        if(value == null || value == ''){ return callback();}
        let n = /^\d{0,}$/;
        let v = parseInt(value);
        if (n.test(value)) {
          if ((v > -1 && v < 10000) || value === "")
            return callback();
          return callback(new Error("序号大小不能超过9999！"));
        }
        else
          return callback(new Error("请输入非负整数！"));
      };

      //验证备课组名称是否重复
      var checkBKZNameExist = (rule, val, callback) => {
        let dup = "";
        let value = val.trim();
        if(!value.length){
          return callback(new Error("备课组名称不能为空！"))
        }
        if (this.addOrEdit) {
          config.BKZExist_add({
            name: this.BKZdata.name,
            orgId: this.id,
          }).then((data) => {
            dup = data.data;
          }).then(() => {
            if (dup) {
              return callback(new Error("备课组名称重复！"));
            } else {
              return callback();
            }
          })
        } else {
          config.BKZExist_edit({
            name: this.BKZdata.name,
            orgId: this.id,
            lessonId: this.BKZdata.id,
          }).then((data) => {
            dup = data.data;
          }).then(() => {
            if (dup) {
              return callback(new Error("备课组名称重复！"));
            } else {
              return callback();
            }
          })
        }
      };

      //验证教研室/教研组名称是否重复
      var checkJYNameExist = (rule, val, callback) => {
        let dup = "";
        let value = val.trim();
        if(!value.length){
          return callback(new Error("教研室/教研组名称不能为空！"))
        }
        if (this.addOrEdit) {
          config.JYExist_add({
            name: this.JYdata.name,
            unitId: this.unitId,
            orgType:2
          }).then((data) => {
            dup = data.data;
          }).then(()=>{
            if (dup) {
              return callback(new Error("教研室/教研组名称重复！"));
            } else {
              return callback();
            }
          })
        } else {
          if(value!==this.JYname){
            config.JYExist_add({
              name: this.JYdata.name,
              unitId: this.unitId,
              orgType:2
            }).then((data) => {
              dup = data.data;
            }).then(()=>{
              if (dup) {
                return callback(new Error("教研室/教研组名称重复！"));
              } else {
                return callback();
              }
            })
          }
          else return callback();
        }
      };

      //去掉name前后的空格
      var nameTrim = (rule, value, callback) => {
        this.JYdata.name = this.JYdata.name.trim();
        return callback();
      };
      var nameTrim2 = (rule, value, callback) => {
        this.BKZdata.name = this.BKZdata.name.trim();
        return callback();
      };
      //memo长度校验
      var memoLength = (rule, value, callback) => {
        if(value&&value.length>0){
          var v = value.trim();
          if(v.length>2000){
            return callback(new Error('不能超过2000个字符！'));
          }
        }
        return callback();
      };

      var JYcourseRequired = (rule, value, callback) => {
        if(!value||value.length<1){
          this.JYcourseBtn = 'selectBtn-in-dialog border-red';
          return callback(new Error('请选择课程！'));
        }else{
          this.JYcourseBtn = 'selectBtn-in-dialog border-gray';
          return callback();
        }
      };
      var JYgradeRequired = (rule, value, callback) => {
        if(!value||value.length<1){
          this.JYgradeBtn = 'selectBtn-in-dialog border-red';
          return callback(new Error('请选择年级！'));
        }else{
          this.JYgradeBtn = 'selectBtn-in-dialog border-gray';
          return callback();
        }
      };
      var BKZcourseRequired = (rule, value, callback) => {
        if(!value||value.length<1){
          this.BKZcourseBtn = 'selectBtn-in-dialog border-red';
          return callback(new Error('请选择课程！'));
        }else{
          this.BKZcourseBtn = 'selectBtn-in-dialog border-gray';
          return callback();
        }
      };
      var BKZgradeRequired = (rule, value, callback) => {
        if(!value||value.length<1){
          this.BKZgradeBtn = 'selectBtn-in-dialog border-red';
          return callback(new Error('请选择年级！'));
        }else{
          this.BKZgradeBtn = 'selectBtn-in-dialog border-gray';
          return callback();
        }
      };
      return {
        emptyText_JY:"正在加载中...",
        emptyText_BKZ:"正在加载中...",
        emptyText_:"正在加载中...",
        JYcourseBtn:"selectBtn-in-dialog border-gray",
        JYgradeBtn:"selectBtn-in-dialog border-gray",
        BKZcourseBtn:"selectBtn-in-dialog border-gray",
        BKZgradeBtn:"selectBtn-in-dialog border-gray",
        JYname:"",
        BKZname:"",
        addOrEdit: false,//true为add,false为edit
        countG: 0,
        countC: 0,
        countS: 0,
        unitId: "",
        unitType: "",
        parentId: "",
        id: "",
        operating: "",
        operationIn: false,
        dialogTitle: "",
        sDialogTitle: "",
        cIds: [],
        gIds: [],
        sIds: [],
        cNames: [],
        gNames: [],
        input: "",
        selectLabel: "",
        managerLabel: "点击选择",
        leaderLabel: "点击选择",
        deManagerLabel: "点击选择",
        subjectLabel: "可选择多个",
        gradeLabel: "可选择多个",
        BKZcaptin: "点击选择",
        BKZdeCaptin: "点击选择",
        BKZsubject: "可选择多个",
        BKZgrade: "可选择多个",
        treeData: [],
        courseData: [],
        courseData2: [],
        gradeData: [],
        gradeData2: [],
        stageData: [],
        tableList: config.tableList,
        settingList: config.settingTableList,
        tableData: [],
        tableData2: [],
        JYdata: {
//          parentId:"",
          name: "",
          code: "",
          contactPhone: "",
          managerId: "",
          deManagerId: "",
          leaderId: "",
          sort: "",
          checkedSubjects: "",
          checkedGrades: "",
          memo: "",
        },
        BKZdata: {
          gradeIds: "",
          courseIds: "",
          name: "",
          contact: "",
          sort: "",
          lessonPreparationLeaderId: "",
          deputyLessonPreparationLeaderId: "",
          orgId: "",
          unitId: "",
          id: ""
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        isvisible_left: false,
        isvisible_dialog: false,
        isvisible_back: false,
        isvisible_sDialog: false,
        isvisible_course: false,
        isvisible_course2: false,
        isvisible_grade: false,
        isvisible_grade2: false,
        isvisible_stage: false,
        rules: {
          name: [
            {validator: nameTrim, trigger: 'change'},
            {required: true, message: '教研室/教研组名称不能为空！', trigger: 'blur'},
            {min: 0, max: 50, message: '不能超过50个字符！', trigger: 'blur'},
            {validator: checkJYNameExist, trigger: 'blur'}
          ],
          checkedSubjects: [
            {required: true, validator:JYcourseRequired, trigger: 'change'},
          ],
          checkedGrades: [
            {required: true, validator:JYgradeRequired, trigger: 'change'},
          ],
          contactPhone: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          sort: [
            {validator: checkSort, trigger: 'blur'}
          ],
          memo: [
            {validator: memoLength, trigger: 'change'},
          ]
        },
        rules2: {
          name: [
            {validator: nameTrim2, trigger: 'change'},
            {required: true, message: '备课组名称不能为空！', trigger: 'blur'},
            {min: 0, max: 50, message: '不能超过50个字符！', trigger: 'blur'},
            {validator: checkBKZNameExist, trigger: 'blur'}
          ],
          courseIds: [
            {required: true, validator:BKZcourseRequired, trigger: 'change'},
          ],
          gradeIds: [
            {required: true, validator:BKZgradeRequired, trigger: 'change'},
          ],
          contact: [
            {validator: checkPhone, trigger: 'blur'}
          ],
          sort: [
            {validator: checkSort, trigger: 'blur'}
          ]
        },
        codeList:{
          'btn_base_teachinggroup_add':false,
          'btn_base_teachinggroup_update':false,
          'btn_base_teachinggroup_delete':false,
          'btn_base_teachinggroup_maintenance':false,
          'btn_base_teachinggroup_addBKZ':false,
          'btn_base_teachinggroup_editBKZ':false,
          'btn_base_teachinggroup_deleteBKZ':false,
        }
      }
    },
    beforeCreate(){

    },
    created(){
      this.$parent.$emit('currentPage', '/base/tlLessons');
      getRcCodeList('category_base_teachinggroup',this.codeList).then(()=> {
        this.getTree();
      });
    },
    methods: {
      //选人控件-manager-教研室/教研组
      selectManager(){
        let _m = [];
        if (this.JYdata.managerId !== "" && this.JYdata.managerId !== undefined)
          _m.push(this.JYdata.managerId);
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
              this.selectManager();
            } else {
              if (selectUsers.length === 1) {
                this.managerLabel = selectUsers[0].realName;
                this.JYdata.managerId = selectUsers[0].id
              } else {
                this.managerLabel = "点击选择";
                this.JYdata.managerId = "";
              }
            }
          }
        }, () => {

        })
      },
      //选人控件-deputyManager-教研室/教研组
      selectDeManager(){
        let _m = [];
        if (this.JYdata.deManagerId && this.JYdata.deManagerId.length > 0)
          _m.push(this.JYdata.deManagerId);
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
              this.selectDeManager();
            } else {
              if (selectUsers.length === 1) {
                this.deManagerLabel = selectUsers[0].realName;
                this.JYdata.deManagerId = selectUsers[0].id
              } else {
                this.deManagerLabel = "点击选择";
                this.JYdata.deManagerId = "";
              }
            }
          }
        }, () => {

        })
      },
      //选人控件-leader-教研室/教研组
      selectLeader(){
        let _l = [];
        if (this.JYdata.leaderId && this.JYdata.leaderId !== "")
          _l.push(this.JYdata.leaderId);
        this.$SelectUsers({
          unitType: this.unitType,
          selectUserType: 2,
          unitId: this.unitId,
          selectUserIds: _l,
          beforeClose: (selectUsers, instance)=>{
            if (selectUsers.length > 1) {
              this.$notify({
                title: '警告',
                message: '最多选择一个！',
                type: 'warning'
              });
              this.selectLeader();
            } else {
              if (selectUsers.length === 1) {
                this.leaderLabel = selectUsers[0].realName;
                this.JYdata.leaderId = selectUsers[0].id
              } else {
                this.leaderLabel = "点击选择";
                this.JYdata.leaderId = "";
              }
            }
          }
        }, () => {

        })
      },
      //选人控件-leader-备课组
      selectLeader2(){
        let _l = [];
        if (this.BKZdata.lessonPreparationLeaderId && this.BKZdata.lessonPreparationLeaderId !== "")
          _l.push(this.BKZdata.lessonPreparationLeaderId);
        this.$SelectUsers({
          unitType: this.unitType,
          selectUserType: 2,
          unitId: this.unitId,
          selectUserIds: _l,
          beforeClose: (selectUsers, instance)=>{
            if (selectUsers.length > 1) {
              this.$notify({
                title: '警告',
                message: '最多选择一个！',
                type: 'warning'
              });
              this.selectLeader2();
            } else {
              if (selectUsers.length === 1) {
                this.BKZcaptin = selectUsers[0].realName;
                this.BKZdata.lessonPreparationLeaderId = selectUsers[0].id
              } else {
                this.BKZcaptin = "点击选择";
                this.BKZdata.lessonPreparationLeaderId = "";
              }
            }
          }
        }, () => {

        })
      },

      //选人控件-deputyManager-备课组
      selectDeLeader2(){
        let _l = [];
        if (this.BKZdata.deputyLessonPreparationLeaderId && this.BKZdata.deputyLessonPreparationLeaderId !== "")
          _l.push(this.BKZdata.deputyLessonPreparationLeaderId);
        this.$SelectUsers({
          unitType: this.unitType,
          selectUserType: 2,
          unitId: this.unitId,
          selectUserIds: _l,
          beforeClose: (selectUsers, instance)=>{
            if (selectUsers.length > 1) {
              this.$notify({
                title: '警告',
                message: '最多选择一个！',
                type: 'warning'
              });
              this.selectDeLeader2();
            } else {
              if (selectUsers.length === 1) {
                this.BKZdeCaptin = selectUsers[0].realName;
                this.BKZdata.deputyLessonPreparationLeaderId = selectUsers[0].id
              } else {
                this.BKZdeCaptin = "点击选择";
                this.BKZdata.deputyLessonPreparationLeaderId = "";
              }
            }
          }
        }, () => {

        })
      },

      //树节点过滤
      handleSearch(){
        this.input = this.input.trim()
        this.$refs.tree.filter(this.input);
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },

      //获取表格-教研室/教研组
      getTable(unit = this.unitId, type = 2){
        this.emptyText_JY = "正在加载中..."
        this.tableData = [];
        this.showTable = true;
        config.getTable({
          unitId: unit,
          organizationType: type,
        }).then((data0) => {
          this.emptyText_JY = "暂无数据"
          this.tableData = data0.data;
          for (let i = 0; i < data0.data.length; i++) {
            this.tableData[i].cNames = "";
            this.tableData[i].cIds = [];
            for (let j = 0; j < data0.data[i].teachgroupCourseVMS.length; j++) {
              this.tableData[i].cNames += data0.data[i].teachgroupCourseVMS[j].name;
              if (j != data0.data[i].teachgroupCourseVMS.length - 1)
                this.tableData[i].cNames += ","
              this.tableData[i].cIds.push(data0.data[i].teachgroupCourseVMS[j].id);
            }
          }
          if (this.unitType === 1) {
            for (let i = 0; i < data0.data.length; i++) {
              this.tableData[i].gNames = "";
              this.tableData[i].sIds = [];
              for (let j = 0; j < data0.data[i].teachgroupStageVMS.length; j++) {
                this.tableData[i].gNames += data0.data[i].teachgroupStageVMS[j].name;
                if (j != data0.data[i].teachgroupStageVMS.length - 1)
                  this.tableData[i].gNames += ","
                this.tableData[i].sIds.push(data0.data[i].teachgroupStageVMS[j].id);
              }
            }
          } else {
            for (let i = 0; i < data0.data.length; i++) {
              this.tableData[i].gNames = "";
              this.tableData[i].gIds = [];
              for (let j = 0; j < data0.data[i].teachgroupGradeVMS.length; j++) {
                this.tableData[i].gNames += data0.data[i].teachgroupGradeVMS[j].name;
                if (j != data0.data[i].teachgroupGradeVMS.length - 1)
                  this.tableData[i].gNames += ","
                this.tableData[i].gIds.push(data0.data[i].teachgroupGradeVMS[j].id);
              }
            }
          }
        });
      },

      //获取表格-备课组
      getBKZ(id = this.id){
        this.emptyText_BKZ = "正在加载中..."
        this.tableData2 = [];
        config.getBKZ(id).then((data) => {
          this.emptyText_BKZ = "暂无数据"
          this.tableData2 = data.data;
          for (let i = 0; i < data.data.length; i++) {
            this.tableData2[i].cNames = "";
            this.tableData2[i].cIds = [];
            for (let j = 0; j < data.data[i].lessonPreparationGroupCourseVMS.length; j++) {
              this.tableData2[i].cNames += data.data[i].lessonPreparationGroupCourseVMS[j].name;
              if (j != data.data[i].lessonPreparationGroupCourseVMS.length - 1)
                this.tableData2[i].cNames += ","
              this.tableData2[i].cIds.push(data.data[i].lessonPreparationGroupCourseVMS[j].id);
            }
          }
          for (let i = 0; i < data.data.length; i++) {
            this.tableData2[i].gNames = "";
            this.tableData2[i].gIds = [];
            for (let j = 0; j < data.data[i].lessonPreparationGroupGradeVMS.length; j++) {
              this.tableData2[i].gNames += data.data[i].lessonPreparationGroupGradeVMS[j].name;
              if (j != data.data[i].lessonPreparationGroupGradeVMS.length - 1)
                this.tableData2[i].gNames += ","
              this.tableData2[i].gIds.push(data.data[i].lessonPreparationGroupGradeVMS[j].id);
            }
          }
        })
      },

      //获取单位树
      getTree(){
        this.emptyText_ = "正在加载中..."
        this.treeData = [];
        config.getTree().then((data) => {
          this.emptyText_ = "暂无数据"
          if (data && data.data) {
            if (data.data.length != 1 || data.data[0].unitType == 1) this.isvisible_left = true;
            this.treeData = this.$data2tree(data.data, 'unitId', 'parentId');
            this.treeData[0].id = 1;
            this.unitId = this.treeData[0].unitId;
            this.parentId = this.treeData[0].parentId;
            this.unitType = this.treeData[0].unitType;
            this.getTable();
          }

        });
      },

      //单位树节点点击事件
      handleNodeClick(data) {
        this.unitId = data.unitId;
        this.parentId = data.parentId;
        this.unitType = data.unitType;
        this.isvisible_back = false;
        this.getTable();
      },

      //筛选课程树
      courseFilter(value, data){
        if (!value) return true;
        return data.id.indexOf(value) === -1;
      },
      getCourse(unitId = this.unitId){
        config.getCourse(unitId).then((data) => {
          for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].nodeAttribute === "course")
              data.data[i].isSshowCheckBox = true;
          }
          this.courseData = this.$data2tree(data.data, 'id', 'parentId');
        })
      },
      //课程树节点点击事件-教研室/教研组
      courseNodeClick(val){
          this.$selectNodeClick(this,val,'course','nodeAttribute','course');
      },
      //选择课程确定按钮点击事件-教研室/教研组
      courseSelect(){
        this.isvisible_course = false;
        let data = this.$refs.course.getCheckedNodes();
        this.subjectLabel = "";
        if (data.length === 0)
          this.subjectLabel = "可选择多个";
        else
          for (this.countC = 0; this.countC < data.length; this.countC++) {
            this.subjectLabel += data[this.countC].name;
            if (this.countC !== data.length - 1)
              this.subjectLabel += ","
            this.JYdata[`teachgroupCourseVMS[${this.countC}].name`] = data[this.countC].name;
            this.JYdata[`teachgroupCourseVMS[${this.countC}].id`] = data[this.countC].id;
          }
        this.JYdata.checkedSubjects = this.subjectLabel === "可选择多个" ? "" : this.subjectLabel;
      },

      //课程树节点点击事件-备课组
      course2NodeClick(val){
        this.$selectNodeClick(this,val,'course2');
      },

      //选择课程确定按钮点击事件-备课组
      courseSelect2(){
        this.isvisible_course2 = false;
        let data = this.$refs.course2.getCheckedNodes();
        this.BKZsubject = "";
        this.BKZdata.courseIds = "";
        if (data.length === 0)
          this.BKZsubject = "可选择多个";
        else
          for (this.countC = 0; this.countC < data.length; this.countC++) {
            this.BKZsubject += data[this.countC].name;
            this.BKZdata.courseIds += data[this.countC].id;
            if (this.countC !== data.length - 1) {
              this.BKZsubject += ",";
              this.BKZdata.courseIds += ",";
            }
          }
      },

      //获取学段
      getStage(unitId = this.unitId){
        config.getStage(unitId).then((data) => {
          this.stageData = data.data;
        })
      },

      //学段树节点点击事件
      stageNodeClick(val){
        this.$selectNodeClick(this,val,'stage');
      },

      //选择学段确定按钮点击事件
      stageSelect(){
        this.isvisible_stage = false;
        let data = this.$refs.stage.getCheckedNodes();
        this.gradeLabel = "";
        if (data.length === 0)
          this.gradeLabel = "可选择多个";
        else
          for (this.countS = 0; this.countS < data.length; this.countS++) {
            this.gradeLabel += data[this.countS].name;
            if (this.countS !== data.length - 1)
              this.gradeLabel += ","
            this.JYdata[`teachgroupStageVMS[${this.countS}].name`] = data[this.countS].name;
            this.JYdata[`teachgroupStageVMS[${this.countS}].id`] = data[this.countS].id;
          }
        this.JYdata.checkedGrades = this.gradeLabel === "可选择多个" ? "" : this.gradeLabel;
      },

      //获取年级树
      getGrade(unitId = this.unitId){
        let stage = [];
        let grade = [];
        config.getStage(unitId).then((data) => {
          stage = data.data;
          config.getGrade(unitId).then((data1) => {
            grade = data1.data;
            for (let i = 0; i < stage.length; i++) {
              stage[i].children = [];
              for (let j = 0; j < grade.length; j++) {
                if ((stage[i].id + "") === (grade[j].stageId + "")) {
                  grade[j].isSshowCheckBox = true;
                  stage[i].children.push(grade[j]);
                }
              }
            }
            this.gradeData = stage;
          });
        });
      },

      //年级树节点点击事件-教研室/教研组
      gradeNodeClick(val){
        this.$selectNodeClick(this,val,'grade');
      },

      //选择年级按钮点击事件-教研室/教研组
      gradeSelect(){
        this.isvisible_grade = false;
        let data = this.$refs.grade.getCheckedNodes();
        this.gradeLabel = "";
        if (data.length === 0)
          this.gradeLabel = "可选择多个";
        else
          for (this.countG = 0; this.countG < data.length; this.countG++) {
            this.gradeLabel += data[this.countG].name;
            if (this.countG !== data.length - 1)
              this.gradeLabel += ","
            this.JYdata[`teachgroupGradeVMS[${this.countG}].name`] = data[this.countG].name;
            this.JYdata[`teachgroupGradeVMS[${this.countG}].id`] = data[this.countG].id;
          }
        this.JYdata.checkedGrades = this.gradeLabel === "可选择多个" ? "" : this.gradeLabel;
      },


      //年级树节点点击事件-备课组
      grade2NodeClick(val){
        this.$selectNodeClick(this,val,'grade2');
      },

      //选择年级按钮点击事件按-备课组
      gradeSelect2(){
        this.isvisible_grade2 = false;
        let data = this.$refs.grade2.getCheckedNodes();
        this.BKZgrade = "";
        this.BKZdata.gradeIds = "";
        if (data.length === 0)
          this.BKZgrade = "可选择多个";
        else
          for (this.countG = 0; this.countG < data.length; this.countG++) {
            this.BKZgrade += data[this.countG].name;
            this.BKZdata.gradeIds += data[this.countG].id;
            if (this.countG !== data.length - 1) {
              this.BKZgrade += ",";
              this.BKZdata.gradeIds += ",";
            }
          }
      },

      //新增备课组的提交
      addBKZ(BKZdata = this.BKZdata){
        let doc=document.getElementsByClassName('sy-dialog');
        let loadingInstance = Loading.service({
          target:doc[doc.length-6]
        })
        config.addBKZ({
          gradeIds: BKZdata.gradeIds,
          courseIds: BKZdata.courseIds,
          name: BKZdata.name,
          contact: BKZdata.contact,
          sort: BKZdata.sort,
          lessonPreparationLeaderId: BKZdata.lessonPreparationLeaderId,
          deputyLessonPreparationLeaderId: BKZdata.deputyLessonPreparationLeaderId,
          orgId: this.id,
          unitId: this.unitId,
        }).then(() => {
          this.getBKZ();
          loadingInstance.close();
          this.$notify({
            title: '成功',
            message: '操作成功！',
            type: 'success'
          });
        })
      },

      //编辑备课组的提交
      editBKZ(BKZdata = this.BKZdata){
        let doc=document.getElementsByClassName('sy-dialog');
        let loadingInstance = Loading.service({
          target:doc[doc.length-6]
        })
        config.editBKZ({
          gradeIds: BKZdata.gradeIds,
          courseIds: BKZdata.courseIds,
          name: BKZdata.name,
          contact: BKZdata.contact,
          sort: BKZdata.sort,
          lessonPreparationLeaderId: BKZdata.lessonPreparationLeaderId,//userId,
          deputyLessonPreparationLeaderId: BKZdata.deputyLessonPreparationLeaderId,//deputyLeaderId,
          orgId: this.id,
          id: BKZdata.id,
          unitId: this.unitId,
        }).then(() => {
          this.getBKZ();
          loadingInstance.close();
          this.$notify({
            title: '成功',
            message: '操作成功！',
            type: 'success'
          });
        })
      },

      //教研室/教研组提交（包括新增和修改）
      submitJY(){
        this.$refs.JYdata.validate((valid) => {
          if (valid) {
            let doc=document.getElementsByClassName('sy-dialog');
            let loadingInstance = Loading.service({
              target:doc[doc.length-7]
            })
            let grade = {};
            let course = {};
            let stage = {};
            for (let i = 0; i < this.countG; i++) {
              grade[`teachgroupGradeVMS[${i}].id`] = this.JYdata[`teachgroupGradeVMS[${i}].id`]
              grade[`teachgroupGradeVMS[${i}].name`] = this.JYdata[`teachgroupGradeVMS[${i}].name`]
            }
            for (let i = 0; i < this.countC; i++) {
              course[`teachgroupCourseVMS[${i}].id`] = this.JYdata[`teachgroupCourseVMS[${i}].id`]
              course[`teachgroupCourseVMS[${i}].name`] = this.JYdata[`teachgroupCourseVMS[${i}].name`]
            }
            for (let i = 0; i < this.countS; i++) {
              stage[`teachgroupStageVMS[${i}].id`] = this.JYdata[`teachgroupStageVMS[${i}].id`]
              stage[`teachgroupStageVMS[${i}].name`] = this.JYdata[`teachgroupStageVMS[${i}].name`]
            }
            if (this.addOrEdit) {
              config.addData({
                'organizationSaveVM.manager': this.JYdata.managerId,
                'organizationSaveVM.deputyManager': this.JYdata.deManagerId,
                'organizationSaveVM.leader': this.JYdata.leaderId,
                'organizationSaveVM.name': this.JYdata.name,
                'organizationSaveVM.code': this.JYdata.code,
                'organizationSaveVM.orgType': 2,
                'organizationSaveVM.contact': this.JYdata.contact,
                'organizationSaveVM.contactPhone': this.JYdata.contactPhone,
                'organizationSaveVM.sort': this.JYdata.sort,
                'organizationSaveVM.unitId': this.unitId,
                'organizationSaveVM.memo': this.JYdata.memo,
                ...grade,
                ...course,
                ...stage
              }).then(() => {
                loadingInstance.close();
                this.isvisible_dialog = false;
                this.countC = 0;
                this.countG = 0;
                this.countS = 0;
                this.getTable();
                this.$notify({
                  title: '成功',
                  message: '操作成功！',
                  type: 'success'
                });
              })
            } else {
              config.editData({
                'organizationVM.manager': this.JYdata.managerId,
                'organizationVM.deputyManager': this.JYdata.deManagerId,
                'organizationVM.leader': this.JYdata.leaderId,
                'organizationVM.name': this.JYdata.name,
                'organizationVM.code': this.JYdata.code,
                'organizationVM.orgType': 2,
                'organizationVM.contact': this.JYdata.contact,
                'organizationVM.contactPhone': this.JYdata.contactPhone,
                'organizationVM.sort': this.JYdata.sort,
                'organizationVM.unitId': this.unitId,
                'organizationVM.memo': this.JYdata.memo,
                'organizationVM.id': this.JYdata.id,
                ...grade,
                ...course,
                ...stage
              }).then(() => {
                loadingInstance.close();
                this.isvisible_dialog = false;
                this.countC = 0;
                this.countG = 0;
                this.countS = 0;
                this.getTable();
                this.$notify({
                  title: '成功',
                  message: '操作成功！',
                  type: 'success'
                });
              })
            }
          } else {
            return false;
          }
        })
      },

      //备课组提交（包括新增和编辑）
      submitBKZ(){
        this.$refs.BKZdata.validate((valid) => {
          if (valid) {
            if (this.addOrEdit)
              this.addBKZ();
            else
              this.editBKZ();
            this.isvisible_sDialog = false;
          } else {

          }
        })
      },

      //新增按钮点击事件-教研室/教研组
      newJY(){
        this.$refs.JYdata.resetFields();
        this.JYcourseBtn = 'selectBtn-in-dialog border-gray';
        this.JYgradeBtn = 'selectBtn-in-dialog border-gray';
        this.isvisible_dialog = true;
        this.addOrEdit = true;
        this.dialogTitle = '新增';
        this.managerLabel = '点击选择';
        this.leaderLabel = '点击选择';
        this.deManagerLabel = '点击选择';
        this.subjectLabel = '可选择多个';
        this.gradeLabel = '可选择多个';
        this.selectLabel = this.unitType == 1 ? "所属学段：" : "包含年级：";
        this.getCourse();
        this.unitType == 1 ? this.getStage() : this.getGrade();
        this.sIds = [];
        this.gIds = [];
        this.cIds = [];
        this.JYdata = {
          name: "",
          code: "",
          contactPhone: "",
          managerId: "",
          deManagerId: "",
          leaderId: "",
          sort: "",
          checkedSubjects: "",
          checkedGrades: "",
          memo: "",
        }
      },

      //新增按钮点击事件-备课组
      newBKZ(){
        this.$refs.BKZdata.resetFields();
        this.BKZcourseBtn = 'selectBtn-in-dialog border-gray';
        this.BKZgradeBtn = 'selectBtn-in-dialog border-gray';
        this.isvisible_sDialog = true;
        this.addOrEdit = true;
        this.sDialogTitle = '新增';
        this.BKZdeCaptin = '点击选择';
        this.BKZcaptin = '点击选择';
        this.BKZsubject = '可选择多个';
        this.BKZgrade = '可选择多个';
        this.gIds = [];
        this.cIds = [];
        this.$refs.course2.setCheckedKeys(this.cIds);
        this.$refs.grade2.setCheckedKeys(this.gIds);
        this.BKZdata = {
          gradeIds: "",
          courseIds: "",
          name: "",
          contact: "",
          sort: "",
          lessonPreparationLeaderId: "",
          deputyLessonPreparationLeaderId: "",
          orgId: "",
          unitId: "",
          id: ""
        };
      },

      //进入备课组页面
      lSetting(index, row){
//        this.operationIn = true;
        this.operating = row.name;
        this.isvisible_back = true;
        this.id = row.id;
        this.courseData2 = row.teachgroupCourseVMS;
        this.gradeData2 = row.teachgroupGradeVMS
        if (this.courseData2)
          for (let i = 0; i < this.courseData2.length; i++)
            this.courseData2[i].isSshowCheckBox = true;
        if (this.gradeData2)
          for (let i = 0; i < this.gradeData2.length; i++)
            this.gradeData2[i].isSshowCheckBox = true;
        this.getBKZ();
      },

      //编辑按钮点击事件-教研室/教研组
      lEdit(index, row1){
        let row = _.cloneDeep(row1);
        this.$refs.JYdata.resetFields();
        this.JYcourseBtn = 'selectBtn-in-dialog border-gray';
        this.JYgradeBtn = 'selectBtn-in-dialog border-gray';
        this.selectLabel = this.unitType == 1 ? "所属学段：" : "包含年级：";
        this.id = row.id;
        this.JYname = row.name;
        this.isvisible_dialog = true;
        this.dialogTitle = '编辑'
        this.getCourse();
        this.unitType == 1 ? this.getStage() : this.getGrade();
        this.JYdata = row;
        this.cIds = row.cIds;
        this.unitType == 1 ? this.sIds = row.sIds : this.gIds = row.gIds;
        this.countC = row.cIds.length;
        this.unitType == 1 ? this.countS = row.sIds.length : this.countG = row.gIds.length;
        this.managerLabel = (row.managerName === undefined || row.managerName === null) ? "点击选择" : row.managerName;
        this.deManagerLabel = (row.deManagerName === undefined || row.deManagerName === null) ? "点击选择" : row.deManagerName;
        this.leaderLabel = (row.leaderName === undefined || row.leaderName === null) ? "点击选择" : row.leaderName;
        this.subjectLabel = (!row.cNames || row.cNames === "") ? "可选择多个" : row.cNames;
        this.gradeLabel = (!row.gNames || row.gNames === "") ? "可选择多个" : row.gNames;
        this.JYdata.checkedSubjects = row.cNames;
        this.JYdata.checkedGrades = row.gNames;
      },

      //删除按钮点击事件-教研室/教研组
      lDelete(index, row){
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          config.delData(row.id).then(() => {
            this.getTable();
            this.$notify({
              message: '操作成功',
              title: '成功',
              type: 'success'
            });
          })
        }).catch(() => {

        });
      },

      //编辑按钮点击事件-备课组
      sEdit(index, row1){
        let row = _.cloneDeep(row1)
        this.$refs.BKZdata.resetFields();
        this.BKZcourseBtn = 'selectBtn-in-dialog border-gray';
        this.BKZgradeBtn = 'selectBtn-in-dialog border-gray';
        this.isvisible_sDialog = true;
        this.sDialogTitle = '修改';
        this.BKZdata = row;
        if (!this.BKZdata.sort || this.BKZdata.sort === null) this.BKZdata.sort = "";
        if (!this.BKZdata.contact || this.BKZdata.contact === null) this.BKZdata.contact = "";
        this.cIds = row.cIds;
        this.gIds = row.gIds;
        this.countC = row.cIds.length;
        this.countG = row.gIds.length;
        this.$refs.course2.setCheckedKeys(this.cIds);
        this.$refs.grade2.setCheckedKeys(this.gIds);
        this.BKZcaptin = (row.userName === undefined || row.userName === null) ? "点击选择" : row.userName;
        this.BKZdeCaptin = (row.deputyLeaderName === undefined || row.deputyLeaderName === null) ? "点击选择" : row.deputyLeaderName;
        this.BKZsubject = (row.cNames === undefined || row.cNames === null) ? "可选择多个" : row.cNames;
        this.BKZgrade = (row.gNames === undefined || row.gNames === null) ? "可选择多个" : row.gNames;
        this.BKZdata.courseIds = "";
        this.BKZdata.gradeIds = "";
        this.BKZdata.lessonPreparationLeaderId = row.userId;
        this.BKZdata.deputyLessonPreparationLeaderId = row.deputyLeaderId;
        for (let i = 0; i < row.cIds.length; i++) {
          this.BKZdata.courseIds += row.cIds[i];
          if (i !== row.cIds.length - 1)
            this.BKZdata.courseIds += ",";
        }
        for (let i = 0; i < row.gIds.length; i++) {
          this.BKZdata.gradeIds += row.gIds[i];
          if (i !== row.gIds.length - 1)
            this.BKZdata.gradeIds += ",";
        }
      },

      //删除按钮点击事件-备课组
      sDelete(index, row){
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          config.delBKZ(row.id).then(() => {
            this.getBKZ();
            this.$notify({
              message: '操作成功',
              title: '成功',
              type: 'success'
            });
          })
        }).catch(() => {

        });
      },

      //返回按钮点击事件
      handelBack(){
        this.isvisible_back = false;
        this.operationIn = false;
        this.tableData = [];
        this.getTable();
      },
    }
  }
</script>

<style scoped>
  .selectBtn-in-dialog{
    width:100%;
    padding:3px 10px;
    height:30px;
    font-size: 12px;
    text-align: left
  }

  .border-gray{
    border-color: #bfcbd9;
  }

  .border-red{
    border-color: #ff4949;
  }

  .button-right {
    float: right;
    padding-left: 8px;
  }

  /*.table-rightbody {*/
    /*position: absolute;*/
    /*max-height: 100%;*/
    /*left: 10px;*/
    /*right: 10px;*/
    /*width: auto;*/
    /*height: auto;*/
    /*overflow: auto;*/
  /*}*/
</style>
