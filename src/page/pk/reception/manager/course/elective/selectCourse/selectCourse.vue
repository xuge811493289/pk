<template>
  <div class="sy-pk-course-container-box">
    <sy-grad-4 :border="false">
      <div slot="headerRight" style="padding-top: 5px;">
        <div class="sy-pk-bodyr">
          <span class="sy-row">
            <span class="sy-col sy-13">
              <span class="sy-col sy-4">
                <el-select v-model="valueYear" size="small" placeholder="学年" :disabled="!btn_canClick" @change="onChangeSelect('year')" style="margin-right: 5px">
                  <el-option
                    v-for="year in years"
                    :key="year.id"
                    :label="year.year"
                    :value="year.year">
                  </el-option>
                </el-select>
              </span>
              <span class="sy-col sy-4">
                <el-select v-model="valueTerm" size="small" placeholder="学期" :disabled="!btn_canClick" @change="onChangeSelect('term')" style="margin-right:5px">
                  <el-option
                    v-for="term in terms"
                    :key="term.schoolTerm"
                    :label="term.name"
                    :value="term.schoolTerm">
                  </el-option>
                </el-select>
              </span>
              <span class="sy-col sy-4">
                <el-select v-model="valueClass" size="small" placeholder="课程类型" :disabled="!btn_canClick" @change="onChangeSelect('class')" style="margin-right: 5px">
                  <el-option
                    v-for="classType in classTypes"
                    :key="classType.id"
                    :label="classType.name"
                    :value="classType.id">
                  </el-option>
                </el-select>
              </span>
              <span class="sy-col sy-4">
                <el-select v-model="valueGrade" size="small" placeholder="年级" :disabled="!btn_canClick" @change="onChangeSelect('grade')" style="margin-right: 5px">
                  <el-option
                    v-for="grade in grades"
                    :key="grade.id"
                    :label="grade.name"
                    :value="grade.id">
                  </el-option>
                </el-select>
              </span>
              <span class="sy-col sy-4">
                <el-input
                  :disabled="!btn_canClick"
                  size="small"
                  placeholder="输入选修班名称、简称"
                  icon="search"
                  v-model="input"
                  @keyup.enter.native="handleSearch"
                  style="width:auto"
                  :on-icon-click="handleSearch">
                </el-input>
              </span>
            </span>
            <span class="sy-col1 sy-7">
              <el-button v-if="codeList.btn_base_electivecourse_copy" :disabled="(!btn_canClick)||isCurrentTerm" size="small" style="margin-left:5px;margin-right:2px" @click="isvisible_copy=true, valueTerm2='', valueYear2='', tableData_copy=[]">复制选修班</el-button>
              <el-button style="margin-left:2px" v-download="{
                  refs:$refs,
                  tables:'multipleTable',
                  fileName:('选修班学生')
                }" >导出学生</el-button>
              <el-button style="margin-left:2px" v-if="codeList.btn_base_electivecourse_importstudent"
                          :disabled="(!btn_canClick)||isCurrentTerm" size="small" @click="importSs"
                          >导入学生</el-button>
              <el-button style="margin-left:2px" v-if="codeList.btn_base_electivecourse_addclass" :disabled="(!btn_canClick)||isCurrentTerm"
                          size="small" @click="newElClass">新建选修班</el-button>
              <el-button style="margin-left:2px" v-if="codeList.btn_base_electivecourse_importclass"
                          :disabled="(!btn_canClick)||isCurrentTerm" size="small" @click="importCs"
                          >导入选修班</el-button>  
            </span>
          </span>
        </div>
      </div>
      <!-- 表格部分开始 -->
      <div slot="bodyRight" style="padding: 0 10px 10px;">
          <el-table ref="multipleTable" style="width:100%;height: 100%;" hight="100%" :data="tableData" border @selection-change="handleSelectionChange">
            <el-table-column v-if="codeList.btn_base_electivecourse_delete" type="selection" width="46px">
            </el-table-column>
            <el-table-column align="center" label="选修班名称" prop="name" key="name" width="auto" min-width="97px">
            </el-table-column>
            <el-table-column align="center" label="简称"prop="shortName"key="shortName"width="auto"min-width="61px">
            </el-table-column>
            <el-table-column align="center" label="开设课程名称"prop="courseName"key="courseName"width="auto"min-width="109px">
            </el-table-column>
            <el-table-column align="center" label="周课时数"prop="weekHour"key="weekHour"width="auto"min-width="85px">
            </el-table-column>
            <el-table-column align="center" label="总课时数"prop="sumHour"key="sumHour"width="auto"min-width="85px">
            </el-table-column>
            <el-table-column align="center" label="上课教室"prop="classRoomName"key="classRoomName"width="auto"min-width="85px">
            </el-table-column>
            <el-table-column align="center" label="学生来源"prop="gradeNames"key="gradeNames"width="auto"min-width="85px">
            </el-table-column>
            <el-table-column align="center" label="课程学期"prop="courseTerm"key="courseTerm"width="auto"min-width="85px">
            </el-table-column>
            <el-table-column align="center" label="开课学年学期"width="auto"min-width="109px">
              <template scope="scope">
                <span>{{scope.row.yearName}}学年</span></br>
                <span>第{{scope.row.termName == 1 ? "一" : "二"}}学期</span>
              </template>
            </el-table-column>
          </el-table>
      </div>
      <div slot="footer">
          <el-button v-if="codeList.btn_base_electivecourse_delete" size="small" type="danger" style="float: left"
            :disabled="(!btn_canClick)||isCurrentTerm" @click="deleteData()">
            删除
          </el-button>
          <el-pagination
            style="text-align: right"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="clazztotal">
          </el-pagination>
      </div>
    </sy-grad-4>
    <!--复制选修班-->
    <sy-dialog
      title="复制选修班"
      position="middle"
      height="480px"
      slide="fade"
      width="591px"
      :visible.sync="isvisible_copy">
      <div slot="body" style="height: auto">
        <div style="position: relative; margin-left: 10px;margin-top:10px; height:auto">
          <span>选择学年学期：</span>
          <el-select v-model="valueYear2" size="small" placeholder="学年" style="width:150px"
                     @change="checkSelection_copy()">
            <el-option
              v-for="year in years"
              :key="year.id"
              :label="year.year"
              :value="year.year">
            </el-option>
          </el-select>
          <el-select v-model="valueTerm2" size="small" placeholder="学期" style="width:108px"
                     @change="checkSelection_copy()">
            <el-option
              v-for="term in terms"
              :key="term.schoolTerm"
              :label="term.name"
              :value="term.schoolTerm">
            </el-option>
          </el-select>
        </div>
        <el-table
          ref="multipleTable_copy"
          :data="tableData_copy"
          border
          class="_full-parent-height"
          @selection-change="handleSelectionChange_copy">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column v-for="item2 in tableList_copy"
                           :label="item2.label"
                           :prop="item2.prop"
                           :key="item2.prop"
                           :width="item2.width">
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button size="small" type="primary" @click="submitCopy">复制</el-button>
      </div>
    </sy-dialog>
    <!--新建/编辑选修班-->
    <sy-dialog
      :title="dialogTitle"
      position="middle"
      height="auto"
      slide="fade"
      width="400px"
      :visible.sync="isvisible_new">
      <div slot="body" style="padding:10px 10px 0 10px; height:auto">
        <el-form :model="elClassData" ref="addData" :rules="rules" label-width="110px" label-position="right"
                 style="height: auto">
          <el-form-item label="选择课程：" class="is-required">
            <el-button @click="onSelectClazz" :class="courseBtn" :style="{color: courseName==='点击选择'?'#99A9BF':''}">{{courseName}}</el-button>
            <!--<el-cascader-->
            <!--size="small"-->
            <!--style="width:100%"-->
            <!--:options="classTree"-->
            <!--:props="props"-->
            <!--:placeholder="courseName"-->
            <!--:show-all-levels="false"-->
            <!--v-model="courseId">-->
            <!--</el-cascader>-->
          </el-form-item>
          <el-form-item prop="courseId" style="margin-top: -15px">
            <el-input v-show="false" v-model.trim="elClassData.courseId"></el-input>
          </el-form-item>

          <el-form-item label="选修班名称：" prop="name">
            <el-input v-model="elClassData.name" style="width:100%"></el-input>
          </el-form-item>

          <el-form-item label="简称：" prop="shortName">
            <el-input v-model="elClassData.shortName" style="width:100%"></el-input>
          </el-form-item>

          <el-form-item label="任课教师：" prop="courseTeacher">
            <el-button @click="selectTeachers()" class="selectBtn-in-dialog border-gray"
                       style="text-overflow: ellipsis; overflow: hidden" :title="teacherNames"
                       :style="{color: teacherNames==='可选择多个'?'#99A9BF':''}">
              <nobr>{{teacherNames}}</nobr>
            </el-button>
          </el-form-item>
          <el-form-item prop="courseTeacher" style="margin-top: -22px">
            <el-input v-show="false" v-model="elClassData.courseTeacherIds"></el-input>
          </el-form-item>

          <el-form-item label="学生来源：" prop="gradeIds">
            <el-button @click="isvisible_grade=true" class="selectBtn-in-dialog border-gray"
                       style="text-overflow: ellipsis; overflow: hidden" :title="gradeNames"
                       :style="{color: gradeNames==='可选择多个'?'#99A9BF':''}">
              <nobr>{{gradeNames}}</nobr>
            </el-button>
          </el-form-item>
          <el-form-item prop="gradeIds" style="margin-top: -22px">
            <el-input v-show="false" v-model.trim="elClassData.gradeIds"></el-input>
          </el-form-item>

          <el-form-item label="课程学期：" prop="courseTerm">
            <el-select v-model="elClassData.courseTerm" placeholder="点击选择" style="width:100%">
              <el-option v-for="term in term_new"
                         :key="term.id"
                         :value="term.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="周课时数：" prop="weekHour">
            <el-input v-model.trim="elClassData.weekHour"
                      @change="$removeZero(elClassData.weekHour,elClassData,'weekHour')" style="width:100%"></el-input>
          </el-form-item>

          <el-form-item label="总课时数：" prop="sumHour">
            <el-input v-model.trim="elClassData.sumHour"
                      @change="$removeZero(elClassData.sumHour,elClassData,'sumHour')" style="width:100%"></el-input>
          </el-form-item>

          <el-form-item label="上课教室：" prop="classRoom">
            <el-cascader
              v-model="elClassData.arrClassRoom"
              :options="places"
              :props="props"
              :placeholder="className"
              :show-all-levels="false"
              ref="places"
              size="small"
              style="width:100%"
              @active-item-change="handleClassRoomChange_item"
              @change="handleClassRoomChange">
            </el-cascader>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <div class="right">
          <el-button type="" size="small" @click="isvisible_new = false">取消</el-button>
          <el-button type="primary" size="small" @click="submitData()">提交</el-button>
        </div>
      </div>
    </sy-dialog>
    <!--查看选修学生-->
    <sy-dialog
      title="查看选修班学生"
      position="middle"
      height="427px"
      slide="fade"
      width="665px"
      :visible.sync="isvisible_see">
      <div slot="body">
        <sy-grad-4 :border="false">
          <div slot="headerRight" style="padding:5px">
            <div style="width:100%">
              <el-button style="float: right" @click="exportSs()">导出</el-button>
            </div>
          </div>
          <div slot="bodyRight" style="width:100%; height:100%; padding:0 10px 10px 10px">
            <el-table
              :data="tableData2"
              border
              height="100%"
              style="width:100%; height:100%">
              <el-table-column v-for="item in tableList2"
                               :label="item.label"
                               :prop="item.prop"
                               :key="item.prop"
                               :width="item.width">
              </el-table-column>
            </el-table>
          </div>
        </sy-grad-4>
      </div>
    </sy-dialog>
    <!--选择课程-->
    <sy-dialog
      title="选择课程"
      position="middle"
      height="70%"
      slide="fade"
      width="300px"
      :visible.sync="isvisible_choose">
      <div slot="body" style="padding-left:10px">
        <sy-tree
          :data="classTree"
          :props="defaultProps"
          ref="course"
          node-key="id"
          style="border:0;"
          class="full-parent"
          show-checkbox
          :check-strictly="true"
          @node-click="classNodeClick"
          @check-change="classCheckChange"
          :default-expanded-keys="cIds"
          :default-checked-keys="cIds">
        </sy-tree>
      </div>
      <div slot="footer">
        <el-button @click="isvisible_choose = false">取消</el-button>
        <el-button @click="classSelect" type="primary">确定</el-button>
      </div>
    </sy-dialog>
    <!--选择教师-->
    <sy-dialog
      title="选择教师"
      position="middle"
      height="60%"
      slide="fade"
      width="30%"
      :visible.sync="isvisible_teacher">
      <div slot="body">
        <sy-grad-4>
          <div slot="headerRight" style="padding:0px">
          </div>
        </sy-grad-4>
      </div>
    </sy-dialog>
    <!-- 选择学生来源 -->
    <sy-dialog
      title="选择学生来源"
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
          show-checkbox
          :check-strictly="true"
          :default-expanded-keys="gradeIds"
          @node-click="gradeNodeClick">
        </sy-tree>
      </div>
      <div slot="footer">
        <el-button @click="isvisible_grade = false">取消</el-button>
        <el-button @click="gradeSelect" type="primary">确定</el-button>
      </div>
    </sy-dialog>
  </div>
</template>

<script>
  import _ from 'lodash';
  import config from './config.js';
  import pager from './config2.js';
  import {getRcCodeList} from './request.js';
  export default {
    name: 'electiveClass',
    data () {
      //班级名称/简称去重
      var nameExist = (rule, val, callback) => {
        let value = val.trim();
        if (!value.length) {
          return callback(new Error("选修班名称/简称不能为空！"))
        }
        if (this.addOrEdit) {
          config.checkName({
            nameOrShotName: value,
            yearValue: this.valueYear,
            termValue: this.valueTerm,
            unitId: this.unitId
          }).then((data) => {
            if (!data.data)
              return callback(new Error('选修班名称/简称重复！'));
            return callback();
          })
        } else {
          if (value !== this.editName || value !== this.editShortName) {
            config.checkName({
              nameOrShotName: value,
              yearValue: this.valueYear,
              termValue: this.valueTerm,
              unitId: this.unitId
            }).then((data) => {
              if (!data.data)
                return callback(new Error('选修班名称/简称重复！'));
              else
                return callback();
            })
          }
          return callback();
        }
      };

      //周课时数范围
      var numberLessThan100 = (rule, value, callback) => {
        let v = "";
        if (value) v = value + "";
        let n = /(^\d{0,}$)|(^0?\.5$)/;
        if (n.test(v)) {
          if ((v > 0 && v < 101) || v.length < 1) callback();
          return callback(new Error('周课时数为0.5或1-100间的整数'));
        }
        return callback(new Error('周课时数为0.5或1-100间的整数'));
      };
      //总课时数范围
      var numberLessThan1000 = (rule, value, callback) => {
        let v = "";
        if (value) v = value + "";
        let n = /^\d{0,}$/;
        if (n.test(v)) {
          if ((v > 0 && v < 1001) || v.length < 1) callback();
          return callback(new Error('总课时数为1-1000间的整数'));
        }
        return callback(new Error('总课时数为1-1000间的整数'));
      };
      //总课时数大于等于周课时数
      var biggerThanWeekHour = (rule, value, callback) => {
        if ((value) && (this.elClassData.weekHour)) {
          if (parseInt(value) >= parseInt(this.elClassData.weekHour)) {
            return callback();
          }
          else {
            return callback(new Error('总课时数不能小于周课时数！'));
          }
        }
        return callback();
      }

      //名称/简称首尾去空格
      var nameTrim = (rule, value, callback) => {
        this.elClassData.name = this.elClassData.name.trim();
        return callback();
      };
      var shortNameTrim = (rule, value, callback) => {
        this.elClassData.shortName = this.elClassData.shortName.trim();
        return callback();
      };

      var courseRequired = (rule, value, callback) => {
        if (!value || value.length < 1) {
          this.courseBtn = 'selectBtn-in-dialog border-red';
          return callback(new Error('课程不能为空！'));
        } else {
          this.courseBtn = 'selectBtn-in-dialog border-gray';
          return callback();
        }
      };
      return {
        _red: '#ff4949',
        cIds: [],
        courseBtn: 'selectBtn-in-dialog border-gray',
        gradeIds: [],
        isCurrentTerm: false,
        btn_canClick: false,
        editName: "",
        editShortName: "",
        exportId: "",
        addOrEdit: true,
        unitId: "",
        filterText: '',
        unitType: "",
        parentId: "",
        id: "",
        valueYear: "",
        valueYear2: "",
        valueTerm: "",
        valueTerm2: "",
        valueTerm_new: "",
        valueClass: "",
        valueGrade: [],
        valueSource: "",
        valuePlace: "",
        input: "",
        input_teacher: "",
        treeData: [],
        classTree: [],
        dialogTitle: "",
        elClassData: {
          id: "",
          name: "",
          shortName: "",
          courseId: "",
          courseTerm: "",
          weekHour: "",
          sumHour: "",
          arrClassRoom: [],
          classRoom: "",
          gradeIds: "",
          courseTeacher: "",
          unitId: "",
          yearValue: "",
          termValue: ""
        },
        courseName: "点击选择",
        teacherNames: "可选择多个",
        gradeNames: "可选择多个",
        className: "点击选择",
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        props: {
          label: 'name',
          value: 'id',
          children: 'children'
        },
        currentPage: 1,
        pageSizes: pager.pageSizes,
        pageSize: pager.pageSize,
        currentPage_copy: 1,
        pageSize_copy: config.pageSize,
        total: 400,
        total_copy: 50,
        allData: [],
        allData_copy: [],
        tableData: [],
        tableData2: [],
        tableData_copy: [],
        multipleSelection: [],
        multipleSelection_copy: [],
        years: [],
        cYear: "",
        terms: [],
        cTerm: [],
        term_new: config.term_new,
        classTypes: [],
        grades: [],
        stages: [],
        places: [],
        tableList2: config.tableList2,
        tableList_copy: config.copy,
        classPlace: config.classPlace,
        isvisible_left: false,
        isvisible_copy: false,
        isvisible_new: false,
        isvisible_choose: false,
        isvisible_teacher: false,
        isvisible_grade: false,
        isvisible_see: false,
        cpyBtnCtrl: true,
        gradeData: [],
        students: [],
        className_new: "点我选课",
        teacher_new: "选择一位或多位教师",
        radio: 2,
        rules: {
          name: [
            {validator: nameTrim, trigger: 'change'},
            {required: true, message: '班级名称不能为空！', trigger: 'blur'},
            {min: 0, max: 50, message: '不能超过50个字符', trigger: 'blur'},
            {validator: nameExist, trigger: 'blur'}
          ],
          shortName: [
            {validator: shortNameTrim, trigger: 'change'},
            {required: true, message: '班级简称不能为空！', trigger: 'blur'},
            {min: 0, max: 50, message: '不能超过50个字符', trigger: 'blur'},
            {validator: nameExist, trigger: 'blur'}
          ],
          courseId: [
            {required: true, validator: courseRequired, trigger: 'change'}
          ],
          courseTerm: [
            {required: true, message: '课程学期不能为空！', trigger: 'change'}
          ],
          weekHour: [
            {validator: numberLessThan100, trigger: 'blur'}
          ],
          sumHour: [
            {validator: numberLessThan1000, trigger: 'blur'},
            {validator: biggerThanWeekHour, trigger: 'blur'}
          ]
        },
        listParams: {
          yearValue: '',
          termValue: '',
          typeId: '',
          gradeId: '',
          keyword: '',
          page: 1,
          pageSize: pager.pageSize,
          unitId: ''
        },
        clazztotal: 0,
        currentYear: '',
        currentTerm: '',
        sess: {
          id: 'open',
          arr: [1],
          unitId: 1,
          sYear: '',
          sTerm: '',
          sClass: '',
          sGrade: '',
        },
        codeList: {
          'btn_base_electivecourse_copy': false,
          'btn_base_electivecourse_export': false,
          'btn_base_electivecourse_importstudent': false,
          'btn_base_electivecourse_addclass': false,
          'btn_base_electivecourse_importclass': false,
          'btn_base_electivecourse_delete': false,
          'btn_base_electivecourse_downloadSs': false,
          'btn_base_electivecourse_downloadCs': false,
          'btn_base_electivecourse_edit': false,
          'btn_base_electivecourse_fenpei': false,
          'btn_base_electivecourse_chakan': false,
        }
      }
    },
    created(){
      this.$parent.$emit('currentPage', '/base/electiveClass');
      getRcCodeList('category_base_electivecourse', this.codeList).then(() => {
        if (this.$route.params&&JSON.stringify(this.$route.params) != "{}") {
          this.sess = this.$route.params;
          this.sess.arr=[this.sess.unitId];
          this.sess.sYear=this.sess.sYear=='_'?"":this.sess.sYear;
          this.sess.sTerm=this.sess.sTerm=='_'?"":this.sess.sTerm;
          this.sess.sGrade=this.sess.sGrade=='_'?"":this.sess.sGrade;
          this.sess.sClass=this.sess.sClass=='_'?"":this.sess.sClass;
        }
        this.getTree();
      })
    },
    methods: {
      // 树节点过滤
      handleIconClick() {
        this.$refs.tree.filter(this.filterText.trim());
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      // 获取单位树
      getTree(){
        config.getTree().then((data) => {
          if (data.data && data.data.length > 0) {
            if (data.data.length == 1 && data.data[0].unitType != 1) {
              this.isvisible_left = false;
              this.unitId = data.data[0].unitId;
              this.parentId = data.data[0].parentId;
              this.unitType = data.data[0].unitType;
              this.listParams.unitId = data.data[0].unitId;
              this.btn_canClick = this.unitType == 2 ? true : false;
            } else {
              this.treeData = this.$data2tree(data.data, 'unitId', 'parentId');
              let c = (tree, first) => {
                for (let i = 0; i < tree.length; i++) {
                  if (tree[i].children && tree[i].children.length !== 0) {
                    let _c = c(tree[i].children, false);
                    if (_c)  return true;
                  } else {
                    if (tree[i].unitType === 2) {
                      tree[i].open = 1;
                      this.unitId = tree[i].unitId;
                      this.parentId = tree[i].parentId;
                      this.unitType = tree[i].unitType;
                      this.listParams.unitId = tree[i].unitId;
                      this.btn_canClick = true;
                      return true;
                    }
                  }
                  if (first) {
                    tree[i].open = 1;
                    this.unitId = tree[i].unitId;
                    this.parentId = tree[i].parentId;
                    this.unitType = tree[i].unitType;
                    this.listParams.unitId = tree[i].unitId;
                    this.btn_canClick = false;
                    return false;
                  }
                }
              }
              c(this.treeData, true);
              this.isvisible_left = true;
              this.$nextTick(() => {
                this.$refs.tree.store.key = this.sess.id;
              })
            }
          }
        }).then(() => {
          if (this.sess.id == "open") {
            this.getYears();
            this.getcType();
            this.getGrade();
          } else {
            this.getYears(this.sess.unitId);
            this.getcType(this.sess.unitId);
            this.getGrade(this.sess.unitId);
          }
        });
      },

      // 获取列表
      getTable(year = this.valueYear, term = this.valueTerm){
        if (year != this.currentYear || term != this.currentTerm) this.isCurrentTerm = true;
        else this.isCurrentTerm = false;
        this.listParams.yearValue = year;
        this.listParams.termValue = term;
        if (this.sess.unitId && this.sess.unitId.length > 0) this.unitId = this.sess.unitId;
        this.listParams.unitId = this.unitId;
        config.getTable(this.listParams).then((data) => {
          if (data && data.data && data.data.list) {
            this.tableData = data.data.list;
            this.clazztotal = data.data.total;
          } else {
            this.tableData = [];
            this.clazztotal = 0;
          }
        })
      },
      //选人控件-教师
      selectTeachers(){
        let _d = [];
        if (this.elClassData.courseTeacherIds && this.elClassData.courseTeacherIds.length > 0) {
          _d = this.elClassData.courseTeacherIds.split(",");
        }
        this.$SelectUsers({
          unitType: this.unitType,
          selectUserType: 2,
          userTypes: [2],
          unitId: this.unitId,
          selectUserIds: _d
        }, (selectUsers, instance) => {
          if (selectUsers.length === 0) {
            this.teacherNames = "可选择多个";
            this.elClassData.courseTeacher = "";
          } else {
            this.teacherNames = "";
            this.elClassData.courseTeacher = "";
            for (let i = 0; i < selectUsers.length; i++) {
              this.teacherNames += selectUsers[i].realName;
              this.elClassData.courseTeacher += selectUsers[i].id;
              if (i !== selectUsers.length - 1) {
                this.teacherNames += ",";
                this.elClassData.courseTeacher += ",";
              }

            }
          }
        })
      },

      //选人控件-学生
      selectStudents(row){
        let gradeIds = [];
        if(row.gradeIds&&row.gradeIds.length>0){
          gradeIds = row.gradeIds.split(",")
        }
        let _d = [];
        config.getStudents({
          unitId: this.unitId,
          clazzId: row.id,
          yearValue: this.valueYear,
          termValue: this.valueTerm
        }).then((data) => {
          if (data && data.data) {
            for (let i in data.data) {
              _d.push(data.data[i].id)
            }
            this.$SelectUsers({
              unitType: this.unitType,
              selectUserType: 1,
              secondGroups: gradeIds,
              userTypes: [1],
              unitId: this.unitId,
              selectUserIds: _d
            }, (selectUsers, instance) => {
              let Ss = "";
              if (selectUsers)
                for (let i = 0; i < selectUsers.length; i++) {
                  Ss += selectUsers[i].id;
                  if (i !== selectUsers.length - 1)
                    Ss += ","
                }
              if (selectUsers) {
                config.giveStudents({
                  unitId: this.unitId,
                  classId: this.exportId,
                  studentIds: Ss
                }).then(() => {
                  this.$notify({
                    title: '成功',
                    message: '操作成功！',
                    type: 'success'
                  });
                })
              }
            })
          }
        })
      },

      // 单位树点击
      handleUnitNodeClick(data) {
        this.listParams.unitId = data.unitId;
        this.unitId = data.unitId;
        this.parentId = data.parentId;
        this.unitType = data.unitType;
        this.sess = {};
        if (data.unitType === 2) {
          this.btn_canClick = true;
          this.getYears();
          this.getcType();
          this.getGrade();
        } else {
          this.tableData = [];
          this.btn_canClick = false;
        }
      },

      // 获取总学年
      getYears(unitId = this.listParams.unitId){
        config.getYears(unitId).then((dataY) => {
          if (dataY.data && dataY.data.length > 0) {
            this.years = dataY.data;
            for (let i = 0; i < this.years.length; i++) {
              if (this.years[i].current === true) {
                this.valueYear = this.years[i].year;
                this.currentYear = this.years[i].year;
                this.listParams.yearValue = this.valueYear;
                if (this.sess.sYear && this.sess.sYear.length > 0) this.valueYear = this.sess.sYear;
              }
            }
            this.getTerms(unitId, this.valueYear)
          }
        })
      },

      // 获取总学期
      getTerms(unitId = this.listParams.unitId, year){
        config.getTerms({
          unitId: unitId,
          year: year
        }).then((dataT) => {
          if (dataT.data && dataT.data.length > 0) {
            this.terms = dataT.data;
            for (let i = 0; i < this.terms.length; i++) {
              if (this.terms[i].current == 1) {
                this.valueTerm = this.terms[i].schoolTerm;
                this.currentTerm = this.terms[i].schoolTerm;
                this.listParams.termValue = this.valueTerm;
                if (this.sess.sTerm && this.sess.sTerm.length > 0) this.valueTerm = this.sess.sTerm;
              }
            }
            if (!this.currentTerm || this.currentTerm.length < 1) {
              this.valueTerm = this.terms[0].schoolTerm;
              if (this.sess.sTerm && this.sess.sTerm.length > 0) this.valueTerm = this.sess.sTerm;
              this.currentTerm = this.terms[0].schoolTerm;
              this.listParams.termValue = this.terms[0].schoolTerm;
            }
            this.getTable(this.valueYear, this.valueTerm);
          }
        })
      },

      //获取总课程类型
      getcType(unitId = this.unitId){
        config.getcType(unitId).then((data) => {
          if (data.data && data.data.length > 0) {
            this.classTypes = data.data;
            this.classTypes.unshift({
              name: "课程类型：",
              id: ""
            });
            if (this.sess.sClass && this.sess.sClass.length > 0) this.valueClass = this.sess.sClass;
          }
        })
      },

      //获取总年级
      getGrade(unitId = this.unitId){
        config.getGrade(unitId).then((data) => {
          if (data.data && data.data.length > 0) {
            this.grades = data.data;
            for(let i = 0; i < this.grades.length; i++){
              this.grades[i].name=this.grades[i].gradeName;
            }
            this.grades.unshift({
              name: "年级：",
              id: ""
            });
            if (this.sess.sGrade && this.sess.sGrade.length > 0) this.valueGrade = this.sess.sGrade;
          }
        })
      },

      // 下拉框选项改变时间
      onChangeSelect(t){
        if (t === 'year') {
          this.listParams.yearValue = this.valueYear;
        } else if (t === 'term') {
          this.listParams.termValue = this.valueTerm;
        } else if (t === 'grade') {
          this.listParams.gradeId = this.valueGrade;
        } else if (t === 'class') {
          this.listParams.typeId = this.valueClass;
        }
        this.listParams.unitId = this.unitId;
        if (this.listParams.unitId && this.listParams.termValue && this.listParams.yearValue) {
          this.getTable(this.listParams.yearValue, this.listParams.termValue);
        }
      },
      // 搜索
      handleSearch(){
        this.input = this.input.trim();
        this.listParams.keyword = this.input;
        if (this.listParams.unitId && this.listParams.termValue && this.listParams.yearValue) {
          this.getTable();
        }
      },

      // 分页
      handleCurrentChange(val) {
        this.listParams.page = val;
        if (this.listParams.unitId && this.listParams.termValue && this.listParams.yearValue) {

          this.getTable();
        }
      },

      // 获取课程树
      onSelectClazz(){
        this.isvisible_choose = true;
      },
      getClassTree(){
        config.getClassTree({unitId: this.listParams.unitId}).then((data) => {
          for (let _d of data.data) {
            if (_d.nodeAttribute == "course")
              _d.isSshowCheckBox = true;
            if (_d.shortName && _d.shortName.length > 0)
              _d.name = _d.shortName;
          }
          if (data && data.data && data.data.length > 0) {
            this.classTree = this.$data2tree(data.data, 'id', 'parentId');
          }
        })
      },

      //课程树节点点击
      classNodeClick(val){
        let refName = 'course';
        let noSelect = 'nodeAttribute';
        let noSelectContent = 'course';
        let data = this.$refs[refName].getCheckedNodes();
        if (noSelect && noSelectContent) {
          if (val[noSelect] !== noSelectContent) {
            return;
          }
        }
        if (!Boolean(val.children) || val.children.length < 1) {
          if (data.length > 0) {
            let z = _.findIndex(data, (obj) => {
              return JSON.stringify(obj) == JSON.stringify(val);
            });
            if (z > -1) {
              data.splice(z, 1)
              this.$refs[refName].setCheckedNodes(data);
              return;
            }
          }
          data = [];
          data.push(val);
          this.$refs[refName].setCheckedNodes(data);
          return;
        }
      },

      //课程树节点选中
      classCheckChange(val){
        if (this.$refs.course.getCheckedNodes().length > 1) {
          let v = [];
          v.push(val);
          this.$refs.course.setCheckedNodes(v)
        }
      },
      //选择课程树
      classSelect(){
        this.isvisible_choose = false;
        if (this.$refs.course.getCheckedNodes() && this.$refs.course.getCheckedNodes().length > 0) {
          let data = this.$refs.course.getCheckedNodes();
          this.elClassData.courseId = data[0].id;
          this.courseName = data[0].name;
        } else {
          this.elClassData.courseId = "";
          this.courseName = "点击选择";
        }
      },
      //选择上课教室
      handleClassRoomChange_item(val){
        config.getPlace({
          unitId: this.unitId,
          placeTypeId: val[0],
          start: 1,
          size: 9999
        }).then((data) => {
          if (data && data.data && data.data.list && data.data.list.length > 0) {
            _.find(this.places, {
              id: val[0]
            }).children = []

            data.data.list.forEach((_p, i) => {
              _.find(this.places, {
                id: val[0]
              }).children.push({
                name: _p.name,
                id: _p.id
              });
            });
            this.$refs.places.menu.activeValue.push(data.data.list[0].id);
          }
        })
      },
      handleClassRoomChange(val){
        this.elClassData.classRoom = val[1];
      },

      // 选择班级
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      // 学生导出
      exportSs(){
        this.$downloade(config.downStudent, 'POST', {
          unitId:this.unitId,
          classId: this.exportId,
          yearValue: this.valueYear,
          termValue: this.valueTerm
        });
      },

      // 复制选修班
      checkSelection_copy(){
        if (this.valueYear2.length > 0 && this.valueTerm2.length > 0)
          if (this.valueYear2 === this.currentYear && this.valueTerm2 === this.currentTerm) {
            this.$notify.info({
              title: '提示',
              message: '不能选择当前学年学期'
            });
            this.tableData_copy = [];
          } else {
            let obj = {
              unitId: this.listParams.unitId,
              keyword: '',
              termValue: this.valueTerm2,
              yearValue: this.valueYear2
            }
            config.getOldClass(obj).then((data) => {
              if (data && data.data && data.data.length > 0) {
                this.tableData_copy = data.data;
              } else {
                this.tableData_copy = [];
              }
            })
          }
      },

      // 选择历史选修班课程
      handleSelectionChange_copy(val){
        this.multipleSelection_copy = val;
      },

      // 提交复制选修班
      submitCopy(){
        if (this.multipleSelection_copy.length > 0) {
          if (this.valueYear2 === this.currentYear && this.valueTerm2 === this.currentTerm) {
            this.$notify.info({
              title: '提示',
              message: '不能选择当前学年学期'
            });
          } else {
            let obj = {
              unitId: this.listParams.unitId,
              classIds: '',
              yearValue: this.valueYear,
              termValue: this.valueTerm
            }
            let arr = [];
            this.multipleSelection_copy.forEach((_mul, i) => {
              arr.push(_mul.id);
            })
            obj.classIds = arr.join(',');
            config.getOldClassToCurrentYear(obj).then((data) => {
              if (data && data.data) {
                if (data.data === "success") {
                  this.$notify({
                    title: '成功',
                    message: '操作成功！',
                    type: 'success'
                  });
                } else {
                  this.$notify({
                    title: '提示',
                    message: '操作成功！名称重复的班级未复制成功！',
                    type: 'success'
                  });
                }
                this.getTable();
                this.isvisible_copy = false;
              }
            })
          }
        } else {
          this.$notify.info({
            title: '提示',
            message: '选择至少一条数据'
          });
        }
      },
      //获取新增/修改列表中的年级树
      getGrade2(unitId = this.unitId){
        let stage = [];
        let grade = [];
        this.gradeData = [];
        config.getStage(unitId).then((data) => {
          if (data && data.data && data.data.length > 0) {
            if (data.data.length < 2) {
              for (let i = 0; i < this.grades.length; i++) {
                if (this.grades[i].id !== "") {
                  this.grades[i].isSshowCheckBox = true;
                  this.gradeData.push(this.grades[i])
                }
              }
              return ;
            }
            stage = data.data;
            grade = this.grades;
            for (let i = 0; i < stage.length; i++) {
              stage[i].children = [];
              if (grade.length > 0)
                for (let j = 0; j < grade.length; j++) {
                  if ((stage[i].id + "") === (grade[j].stageId + "")) {
                    grade[j].isSshowCheckBox = true;
                    stage[i].children.push(grade[j]);
                  }
                }
            }
            this.gradeData = stage;
          }
        });
      },

      gradeNodeClick(val){
        this.$selectNodeClick(this, val, 'grade');
      },

      //新增/修改列表中的年级选择
      gradeSelect(){
        this.isvisible_grade = false;
        let data = this.$refs.grade.getCheckedNodes();
        this.gradeNames = "";
        this.elClassData.gradeIds = "";
        if (data.length === 0) {
          this.gradeNames = "可选择多个";
        }
        else {
          for (let i = 0; i < data.length; i++) {
            this.elClassData.gradeIds += data[i].id;
            this.gradeNames += data[i].name;
            if (i !== data.length - 1) {
              this.elClassData.gradeIds += ",";
              this.gradeNames += ",";
            }
          }
        }
      },

      //新建选修班
      newElClass(){
        this.$refs.addData.resetFields();
        this.courseBtn = 'selectBtn-in-dialog border-gray';
        this.isvisible_new = true;
        this.addOrEdit = true;
        this.dialogTitle = "添加";
        this.courseName = "点击选择";
        this.teacherNames = "可选择多个";
        this.gradeNames = "可选择多个";
        this.className = "点击选择";
        this.cIds = [];
        this.gradeIds = [];
        this.places = [];
        this.elClassData = {
          id: "",
          name: "",
          shortName: "",
          courseId: "",
          courseTerm: "",
          weekHour: "",
          sumHour: "",
          arrClassRoom: [],
          classRoom: "",
          gradeIds: "",
          courseTeacher: "",
          unitId: "",
          yearValue: "",
          termValue: ""
        }
        this.getClassTree();
        this.getGrade2();
        config.getPlaceType(this.unitId).then((data) => {
          if (data && data.data && data.data.length > 0) {
            data.data.forEach((_p, i) => {
              this.places.push({
                name: _p.name,
                id: _p.id,
                children: []
              });
            });
          }
        });
      },
      //提交新建/编辑选修班
      submitData(){
        this.elClassData.unitId = this.unitId;
        this.elClassData.yearValue = this.valueYear;
        this.elClassData.termValue = this.valueTerm;
        this.$refs.addData.validate((valid) => {
          if (valid) {
            if (this.addOrEdit) {
              config.addData(this.elClassData).then(() => {
                this.getTable();
                this.isvisible_new = false;
                this.$notify({
                  title: '成功',
                  message: '操作成功！',
                  type: 'success'
                });
              })
            } else {
              config.editTable(this.elClassData).then(() => {
                this.getTable();
                this.isvisible_new = false;
                this.$notify({
                  title: '成功',
                  message: '操作成功！',
                  type: 'success'
                });
              })
            }
          } else {

          }
        })
      },
      //批量删除
      deleteData(){
        if (!this.multipleSelection.length) {
          this.$notify.info({
            message: '请选择至少一条数据',
            title: '提示'
          });
          return;
        }
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delIds = "";
          for (let i = 0; i < this.multipleSelection.length; i++) {
            delIds += this.multipleSelection[i].id;
            if (i != this.multipleSelection.length - 1)
              delIds += ",";
          }
          config.deleteData({
            ids: delIds,
            unitId: this.unitId
          }).then(() => {
            this.getTable();
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
          })
        }).catch(() => {

        });
      },

      handleCurrentChange_copy(val) {
        this.tableData_copy = this.allData_copy.slice((val - 1) * this.pageSize_copy, val * this.pageSize_copy);
        this.currentPage_copy = val;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      // 导入学生
      importSs(){
        this.sess = {
          id: 'unitId',
          unitId: this.unitId,
          sYear: this.valueYear ? this.valueYear : "_",
          sTerm: this.valueTerm ? this.valueTerm : "_",
          sClass: this.valueClass ? this.valueClass : "_",
          sGrade: this.valueGrade ? this.valueGrade : "_",
        }
        this.$router.push({name: 'elective_importSs', params: this.sess})
      },

      // 导入班级
      importCs(){
        this.sess = {
          id: 'unitId',
          unitId: this.unitId,
          sYear: this.valueYear ? this.valueYear : "_",
          sTerm: this.valueTerm ? this.valueTerm : "_",
          sClass: this.valueClass ? this.valueClass : "_",
          sGrade: this.valueGrade ? this.valueGrade : "_",
        }
        this.$router.push({name: 'elective_importCs', params: this.sess})
      }
    }
  }
</script>

<style scoped>
  .sy-pk-course-container-box{ 
    position: relative;
    height: 100%;
  }
  .sy-pk-bodyr{
    width:100%;
    height:40px;
  }
  .sy-pk-bodyRight{
    position: absolute;
    width:100%;
    top:0px;
    bottom:0px;
    overflow: scroll;
  }
  .footer{
    position: absolute;
    height:30px;
    width:100%;
  }
  .selectBtn-in-dialog {
    width: 100%;
    padding: 3px 10px;
    height: 30px;
    font-size: 12px;
    text-align: left
  }
  .border-gray {
    border-color: #bfcbd9;
  }
  .border-red {
    border-color: #ff4949;
  }
  .left1 {
    padding-top: 5px;
  }
  .sy-col1 {
    float: right;
    vertical-align: top;
    box-sizing: border-box;
    margin: 0;
  }
  ._full-parent-height {
    position: absolute;
    width: auto;
    height: 330px;
    margin: 10px 10px 0 10px;
    overflow: auto;
  }
  
</style>
