<template>
  <div class="sy-pk-step-box">
    <div style="font-weight: normal;">
      <el-select v-model="selectYearValue" :placeholder="$t('select.yearPlaceholder')" class="sy-left mt5" style="width: 130px;">
        <el-option v-for="item in yearList" :key="item.year" :label="item.year" :value="item.year"></el-option>
      </el-select>
      <el-select v-model="selectTermValue" :placeholder="$t('select.termPlaceholder')" class="sy-left mt5" style="margin-left: 10px;width: 130px;">
        <el-option v-for="item in termList" :key="item.id" :label="item.name" :value="item.schoolTerm"></el-option>
      </el-select>
      <span class="ib pl20 lh40">学段：</span>
      <el-radio-group v-model="selectStageId" class="lh40">
        <el-radio v-for="s in stages" :label="s.id" :key="s.id">{{s.name}}</el-radio>
      </el-radio-group>
      <div class="sy-right mt5" v-if="selectStageId == 5  &&  codeList['btn_base_gc_grade_add']">
        <el-button @click="toAddGrade">{{$t('button.add')}}</el-button>
      </div>
    </div>
    <div>
      <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%;">
        <el-table-column width="55">
          <template scope="scope">
            <el-radio class="table-radio" :disabled="scope.row.status === 0" v-model="selectGradeId" :label="scope.row.id"></el-radio>
          </template>
        </el-table-column>
        <el-table-column v-for="item in appColumn" :key="item.prop" :width="item.width" :label="item.label">
          <template scope="scope">
            <span v-if="item.prop === 'isGraudate'">{{scope.row[item.prop] === 0 ? '否' : '是'}}</span>
            <span v-else-if="item.prop === 'status'">{{scope.row[item.prop] === 0 ? '禁用' : '启用'}}</span>
            <span v-else-if="item.prop === 'gradeHead' && scope.row[item.prop]">
              <span v-for="(u, i) in scope.row[item.prop]" :key="i" v-if="u.deputy == 0 && u.realName">{{u.realName}}</span>
            </span>
            <span v-else>{{scope.row[item.prop]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" header-align="center">
          <template scope="scope">
            <span :title="$t('button.update')" @click="handleGradeEdit(scope.$index, scope.row)" class="fa fa-pencil-square-o cp vam" v-if="codeList['btn_base_gc_grade_update']"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="right" style="padding: 10px 0px;">
      <el-button :disabled="(!selectGradeId) || selectGradeId.length == 0 || selectGradeId == '' || (!selectTermValue) || selectTermValue.length == 0 || selectTermValue == ''" @click="toAddClass" v-if="codeList['btn_base_gc_class_add']">{{$t('button.add')}}</el-button>
      <el-button :disabled="(!selectGradeId) || selectGradeId.length == 0 || selectGradeId == '' || (!selectTermValue) || selectTermValue.length == 0 || selectTermValue == ''" @click="toBatchClass" v-if="codeList['btn_base_gc_batchClass_add']">{{$t('button.batch')}}</el-button>
      <el-button :disabled="(!selectGradeId) || selectGradeId.length == 0 || selectGradeId == '' || (!selectTermValue) || selectTermValue.length == 0 || selectTermValue == ''" @click="importHistoryClass" v-if="codeList['btn_base_gc_ClassH_import']">{{$t('button.import')}}</el-button>
    </div>
    <div>
      <el-table ref="multipleTable" :data="classData" border tooltip-effect="dark" style="width: 100%;">
        <el-table-column v-for="item in appColumn2" :key="item.prop" :width="item.width" :label="item.label">
          <template scope="scope">{{scope.row[item.prop]}}</template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" header-align="center">
          <template scope="scope">
            <span :title="$t('button.update')" @click="handleClassEdit(scope.$index, scope.row)" class="fa fa-pencil-square-o cp vam" style="margin-right: 10px;" v-if="codeList['btn_base_gc_class_update']"></span>
            <span :title="$t('button.delete')" @click="handleClassDelete(scope.$index, scope.row)" class="el-icon-delete cp vam" v-if="codeList['btn_base_gc_class_delete']"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增年级 -->
    <sy-dialog title="新增年级" :visible.sync="dialogGradeFormVisible" :close-on-click-modal="false" position="middle" height="auto" width="650px" slide="fade" size="small">
      <div slot="body" v-loading="loading">
        <el-form :rules="addGradeFormRules" label-width="100px" :model="addGradeForm" ref="addGradeForm" style="margin: 20px 40px 5px 30px;">
          <el-row>
            <el-col :span="12">
              <el-form-item label="temp" prop="name">
                                <span slot="label">
                                    <font class="xing"></font>年级名称：</span>
                <el-input v-model="addGradeForm.name"></el-input>
              </el-form-item>
              <el-form-item label="年级组长：">
                <div class="el-input el-input--small cp" @click="selectUsers('addNJZZ')">
                  <div class="el-input__inner" style="line-height: 22px;" v-if="addGradeForm.njzzNames && addGradeForm.njzzNames.length > 0">{{addGradeForm.njzzNames}}</div>
                  <div class="el-input__inner" style="line-height: 22px;text-align: center;" v-else>点击选择</div>
                </div>
              </el-form-item>
              <el-form-item label="是否毕业年级：">
                <el-radio-group v-model="addGradeForm.graduated">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="序号：" prop="sort">
                <el-input v-model.trim="addGradeForm.sort" @change="$removeZero(addGradeForm.sort, addGradeForm, 'sort')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="简称：">
                <el-input v-model="addGradeForm.shortName"></el-input>
              </el-form-item>
              <el-form-item label="年级副组长：">
                <div class="el-input el-input--small cp" @click="selectUsers('addFNJZZ')">
                  <div class="el-input__inner" style="line-height: 22px;" v-if="addGradeForm.njfzzNames && addGradeForm.njfzzNames.length > 0">{{addGradeForm.njfzzNames}}</div>
                  <div class="el-input__inner" style="line-height: 22px;text-align: center;" v-else>点击选择</div>
                </div>
              </el-form-item>
              <el-form-item label="是否启用：">
                <el-radio-group v-model="addGradeForm.status">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="temp" prop="prevGrade" v-show="tableData && tableData.length > 0">
                                <span slot="label">
                                    <font class="xing"></font>上一年级：</span>
                <el-select v-model="addGradeForm.prevGrade" placeholder="请慎重选择，选择后不可更改。" style="width: 100%;">
                  <el-option v-for="item in tableData" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogGradeFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveGrade">确 定</el-button>
      </div>
    </sy-dialog>
    <!--新增班级-->
    <sy-dialog title="新增班级" :visible.sync="dialogClassFormVisible" :close-on-click-modal="false" position="middle" height="auto" width="750px" slide="fade" size="small">
      <div slot="body" v-loading="loading">
        <el-form :rules="classFormRules" label-position="right" label-width="120px" :model="addClassForm" ref="addClassForm" style="margin: 20px 35px 5px 0px;">
          <el-row>
            <el-col :span="12">
              <el-form-item label="学段：" prop="stageName">{{addClassForm.stageName}}</el-form-item>
              <el-form-item label="temp" prop="name">
                <span slot="label">
                  <font class="xing"></font>班级名称：</span>{{addClassForm.name}}
                <!-- <el-input v-model.trim="addClassForm.name"></el-input> -->
              </el-form-item>
              <el-form-item label="班主任：">
                <div class="el-input el-input--small cp" @click="selectUsers('addBZR')">
                  <div class="el-input__inner" style="line-height: 22px;" v-if="addClassForm.headTeacherName && addClassForm.headTeacherName.length > 0">{{addClassForm.headTeacherName}}</div>
                  <div class="el-input__inner" style="line-height: 22px;text-align: center;" v-else>点击选择</div>
                </div>
              </el-form-item>
              <el-form-item label="荣誉称号：" prop="rych">
                <el-input v-model.trim="addClassForm.rych"></el-input>
              </el-form-item>
              <el-form-item label="序号：" prop="sort">
                <el-input v-model.trim="addClassForm.sort" @change="$removeZero(addClassForm.sort, addClassForm, 'sort')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年级：" prop="gradeName">{{addClassForm.gradeName}}</el-form-item>
              <el-form-item label="班级简称：" prop="shortName">
                <el-input v-model.trim="addClassForm.shortName"></el-input>
              </el-form-item>
              <el-form-item label="副班主任：">
                <div class="el-input el-input--small cp" @click="selectUsers('addFBZR')">
                  <div class="el-input__inner" style="line-height: 22px;" v-if="addClassForm.fbzrName && addClassForm.fbzrName.length > 0">{{addClassForm.fbzrName}}</div>
                  <div class="el-input__inner" style="line-height: 22px;text-align: center;" v-else>点击选择</div>
                </div>
              </el-form-item>
              <el-form-item label="班级地点：">
                <el-dropdown menu-align="start" style="width: 100%;">
                  <span class="el-dropdown-link">
                      <el-input readonly v-model="addClassForm.addressName" placeholder="请选择教室" size="small" style="cursor: pointer;"></el-input>
                  </span>
                  <el-dropdown-menu slot="dropdown" style="min-width: 254px;">
                    <el-tree ref="adddropdowntree" :border="false" highlight-current :expand-on-click-node="false" :data="placeTypes" :props="placeTypesProps" :load="loadNode" accordion node-key="domId" lazy @current-change="roomsChange"></el-tree>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClassFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveClass">确 定</el-button>
      </div>
    </sy-dialog>
    <!--批量新增班级-->
    <sy-dialog title="批量新增班级" :visible.sync="dialogClassesFormVisible" :close-on-click-modal="false" position="middle" height="auto" width="345px" slide="fade">
      <div slot="body" v-loading="loading">
        <div style="height: 20px;"></div>
        <el-form label-width="110px" :model="batchClassForm" ref="batchClassForm" :rules="batchClassFormRules">
          <el-form-item label="temp" prop="classNum">
                        <span slot="label">
                            <font class="xing"></font>班级数量：</span>
            <el-input v-model.trim="batchClassForm.classNum" @change="$removeZero(batchClassForm.classNum, batchClassForm, 'classNum')" style="width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="建班年月：">
            <el-date-picker size="small" :editable="false" style="width: 200px;" v-model="batchClassForm.jbny" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogClassesFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="batchClass">确 定</el-button>
            </span>
    </sy-dialog>
    <!--修改年级-->
    <sy-dialog title="修改年级" :visible.sync="editorGradeDialog" :close-on-click-modal="false" position="middle" height="auto" width="650px" slide="fade" size="small">
      <div slot="body" v-loading="loading">
        <el-form :rules="addGradeFormRules" label-width="100px" :model="editorGradeForm" ref="editorGradeForm" style="margin: 20px 40px 5px 30px;">
          <el-row>
            <el-col :span="12">
              <el-form-item label="temp" prop="name">
                <span slot="label">
                    <font class="xing"></font>年级名称：</span>{{editorGradeForm.name}}
              </el-form-item>
              <el-form-item label="年级组长：">
                <div class="el-input el-input--small cp" @click="selectUsers('updateNJZZ')">
                  <div class="el-input__inner" style="line-height: 22px;" v-if="editorGradeForm.njzzNames && editorGradeForm.njzzNames.length > 0">{{editorGradeForm.njzzNames}}</div>
                  <div class="el-input__inner" style="line-height: 22px;text-align: center;" v-else>点击选择</div>
                </div>
              </el-form-item>
              <el-form-item label="是否毕业年级：">
                <el-radio-group v-model="editorGradeForm.graduated">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="序号：" prop="sort">
                <el-input v-model.trim="editorGradeForm.sort" @change="$removeZero(editorGradeForm.sort, editorGradeForm, 'sort')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="简称：">
                <el-input v-model="editorGradeForm.shortName"></el-input>
              </el-form-item>
              <el-form-item label="年级副组长：">
                <div class="el-input el-input--small cp" @click="selectUsers('updateFNJZZ')">
                  <div class="el-input__inner" style="line-height: 22px;" v-if="editorGradeForm.njfzzNames && editorGradeForm.njfzzNames.length > 0">{{editorGradeForm.njfzzNames}}</div>
                  <div class="el-input__inner" style="line-height: 22px;text-align: center;" v-else>点击选择</div>
                </div>
              </el-form-item>
              <el-form-item label="是否启用：">
                <el-radio-group v-model="editorGradeForm.status">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- <el-form-item label="temp" prop="prevGrade" v-if="selectStageId == 5 && updateShowPrevGrade">
                      <span slot="label"><font class="xing"></font>上一年级：</span>
                      <el-select v-model="editorGradeForm.prevGrade" placeholder="请选择">
                          <el-option v-for="item in tableData" :label="item.name" :value="item.id" :key="item.id"></el-option>
                      </el-select>
                  </el-form-item> -->
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer mr10 ml10">
                <el-button @click="editorGradeDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateGrade">确 定</el-button>
            </span>
    </sy-dialog>
    <!--修改班级-->
    <sy-dialog title="修改班级" :visible.sync="editorClassDialog" :close-on-click-modal="false" position="middle" height="auto" width="750px" slide="fade">
      <div slot="body" v-loading="loading">
        <el-form :rules="classFormRules" label-width="120px" style="margin: 20px 35px 5px 0px;" :model="editorClassForm" ref="editorClassForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="temp" prop="name">
                                <span slot="label">
                                    <font class="xing"></font>班级名称：</span>{{editorClassForm.name}}
              </el-form-item>
              <el-form-item label="班主任：">
                <div class="el-input el-input--small cp" @click="selectUsers('updateBZR')">
                  <div class="el-input__inner" style="line-height: 22px;" v-if="editorClassForm.headTeacherName && editorClassForm.headTeacherName.length > 0">{{editorClassForm.headTeacherName}}</div>
                  <div class="el-input__inner" style="line-height: 22px;text-align: center;" v-else>点击选择</div>
                </div>
              </el-form-item>
              <el-form-item label="班长：">
                <el-select filterable v-model="editorClassForm.bz" placeholder="请选择班长" style="width: 100%;">
                  <el-option v-for="s in classStudents" :key="s.id" :label="s.realName" :value="s.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="荣誉称号：" prop="rych">
                <el-input v-model="editorClassForm.rych"></el-input>
              </el-form-item>
              <el-form-item label="序号：" prop="sort">
                <el-input v-model.trim="editorClassForm.sort" @change="$removeZero(editorClassForm.sort, editorClassForm, 'sort')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="班级简称：" prop="shortName">
                <el-input v-model="editorClassForm.shortName"></el-input>
              </el-form-item>
              <el-form-item label="副班主任：">
                <div class="el-input el-input--small cp" @click="selectUsers('updateFBZR')">
                  <div class="el-input__inner" style="line-height: 22px;" v-if="editorClassForm.fbzrName && editorClassForm.fbzrName.length > 0">{{editorClassForm.fbzrName}}</div>
                  <div class="el-input__inner" style="line-height: 22px;text-align: center;" v-else>点击选择</div>
                </div>
              </el-form-item>
              <el-form-item label="副班长：">
                <el-select filterable v-model="editorClassForm.fbz" placeholder="请选择副班长" style="width: 100%;">
                  <el-option v-for="s in classStudents" :key="s.id" :label="s.realName" :value="s.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="班级地点">
                <el-dropdown menu-align="start" style="width: 100%;">
                  <span class="el-dropdown-link">
                      <el-input readonly v-model="editorClassForm.addressName" placeholder="请选择教室" size="small"></el-input>
                  </span>
                  <el-dropdown-menu slot="dropdown" style="min-width: 254px;">
                    <el-tree ref="editdropdowntree" :border="false" highlight-current :expand-on-click-node="false" :data="placeTypes" :props="placeTypesProps" :load="loadNode" accordion node-key="domId" lazy @current-change="roomsChange"></el-tree>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer mr10 ml10">
                <el-button @click="editorClassDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateClass">确 定</el-button>
            </span>
    </sy-dialog>
  </div>
  </div>
</template>
<script>
  import _ from 'lodash';
  import moment from 'moment';
  import { Loading } from 'element-ui';
  import { getUnitTree, getStages, getGradeList, getGrade, getClassList, getClass, getYearList, getTermList, gradeNameExist, saveClass, classNameExist, saveGrade, updateGrade, updateClass, beachSaveClass, deleteClass, getPlaceType, getPlace, getClassStudent, getClassName } from './request.js';
  import config from './config.js';
  import pager from '../../config.js';
  import {getRcCodeList} from '../../request'
  export default {
    data() {
      return {
        loading: false,
        showTree: false,
        classStudents: [],
        placeTypes: [],
        placeTypesProps: {
          label: 'name',
          children: 'children'
        },
        addGradeForm: {
          graduated: 0,
          status: 1,
          prevGrade: ""
        },
        batchClassForm: {
          classNum: "",
          jbny: ""
        },
        addClassForm: {
          stageName: '',
          stageId: '',
          name: '',
          headTeacherName: '',
          headTeacher: [],
          fbzrName: '',
          fbzr: [],
          rych: '',
          gradeName: '',
          gradeId: '',
          shortName: '',
          address: '',
          addressName: '',
          year: '',
          term: '',
          sort: ''
        },
        editorGradeForm: {
          id: '',
          unitId: '03852eb9-0014-47ed-b5cf-08f97ace8c75',
          name: '',
          oldName: '',
          shortName: '',
          stageId: '',
          graduated: '',
          status: '',
          prevGrade: '',
          njzz: [],
          njzzNames: '',
          njfzz: [],
          njfzzNames: ''
        },
        editorClassForm: {
          id: '',
          unitId: '',
          name: '',
          oldName: '',
          gradeId: '',
          headTeacher: [],
          headTeacherName: '',
          fbzr: [],
          fbzrName: '',
          rych: '',
          shortName: '',
          bz: '',
          bzName: '',
          fbz: '',
          fbzName: '',
          address: '',
          addressName: '',
          sort: ''
        },
        yearValue: '',
        filterText: '',
        gradeStatus: this.status,
        classStatus: this.status,
        dialogGradeFormVisible: false,
        dialogClassFormVisible: false,
        dialogClassesFormVisible: false,
        editorClassDialog: false,
        editorGradeDialog: false,
        tableData: [],
        classData: [],
        pageSizes: pager.pageSizes,
        pageSize: pager.pageSize,
        appColumn: config.gradeList1,
        appColumn2: config.gradeList2,
        imageUrl: '',
        batchClassFormRules: {
          classNum: [{
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value.length == 0) {
                callback(new Error('请填写班级数！'));
                return;
              }
              if (!(/^([1-9]|1[\d]|20)$/g.test(value))) {
                callback(new Error('请输入1-20之间的数字！'));
                return;
              }
              callback();
            }
          }]
        },
        classFormRules: {
          sort: [{
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value !== '' && !(/^\d{1,5}$/g.test(value))) {
                callback(new Error('序号为：0-99999之间的数字！'));
                return;
              }
              callback();
            }
          }],
          shortName: [{
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value && value.length > 0 && value.length > 50) {
                callback(new Error("班级简称长度为：1-50！"));
                return;
              }
              callback();
            }
          }],
          rych: [{
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value && value.length > 0 && value.length > 50) {
                callback(new Error("荣誉称号长度为：1-50！"));
                return;
              }
              callback();
            }
          }],
          stageName: [{
            required: true,
            message: '学段不能为空！',
            trigger: 'change'
          }],
          gradeName: [{
            required: true,
            message: '年级不能为空！',
            trigger: 'change'
          }],
          name: [{
            validator: (rule, value, callback) => {
              if (!value || value.replace(/^\s+|\s+$/g, '').length == 0) {
                callback(new Error("请输入班级名称！"));
                return;
              }
              if (value && value.length == 0 || value.length > 50) {
                callback(new Error("班级名称长度为：1-50！"));
                return;
              }
              if (this.dialogClassFormVisible) {
                classNameExist({
                  gradeId: this.selectGradeId,
                  year: this.selectYearValue,
                  term: this.selectTermValue,
                  unitId: this.selectTreeNodeId,
                  name: value
                }).then((d) => {
                  if (!d.data) {
                    callback(new Error("该班级名称已存在！"));
                  } else {
                    callback();
                  }
                });
                return;
              }
              callback();
            },
            trigger: 'change'
          }]
        },
        addGradeFormRules: {
          prevGrade: [{
            trigger: 'change',
            validator: (rule, value, callback) => {
              if ((!value || value.length < 1) && this.tableData && this.tableData.length > 0) {
                callback(new Error("上一年级不能为空！"));
                return false;
              }
              callback();
            }
          }],
          sort: [{
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (value !== '' && !(/^\d{1,5}$/g.test(value))) {
                callback(new Error('序号为：0-99999之间的数字！'));
                return;
              }
              callback();
            }
          }],
          name: [{
            trigger: 'change',
            validator: (rule, value, callback) => {
              if (!value || value.replace(/^\s+|\s+$/g, '').length == 0) {
                callback(new Error("请输入年级名称！"));
                return;
              } else if (this.dialogGradeFormVisible) {
                gradeNameExist({
                  unitId: this.selectTreeNodeId,
                  name: value
                }).then((d) => {
                  if (!d.data) {
                    callback(new Error("该年级名称已存在！"));
                  } else {
                    callback();
                  }
                });
                return;
              } else {
                callback();
              }
            }
          }]
        },
        isvisible: false,
        obj: {
          color: '#f00'
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        treeData: [],
        selectTreeNodeId: '',
        selectTreeNodeName: '',
        selectStageId: '',
        selectGradeId: '',
        firstGradeId: '',
        selectYearValue: '',
        stages: [],
        yearList: [],
        selectTermValue: '',
        termList: [],
        codeList: {
          btn_base_gc_grade_add: false, //  新增年级
          btn_base_gc_grade_update: false, //  修改年级
          btn_base_gc_grade_delete: false, //  删除自定义年级
          btn_base_gc_class_add: false, //  新增班级
          btn_base_gc_batchClass_add: false, //  批量新增班级
          btn_base_gc_ClassH_import: false, //  导入历史年级
          btn_base_gc_class_update: false, //  修改班级
          btn_base_gc_class_delete: false, //  删除班级
        }
      }
    },
    computed: {
      updateShowPrevGrade: function() {
        return _.filter(this.tableData, (g) => {
          return g.id !== this.editorGradeForm.id;
        }).length > 0;
      }
    },
    watch: {
      selectGradeId(curVal, oldVal) {
        // 有效性检查
        if (curVal && curVal.length > 0) {
          let grade = _.filter(this.tableData || [], {
            id: curVal
          });
          if (grade && grade.length > 0 && grade[0].status != 1) {
            this.selectGradeId = oldVal;
            return false;
          }
        }
        this.getClassList();
      },
      selectStageId(val, oldVal) {
        this.getGradeList();
      },
      selectTreeNodeId(val, oldVal) {
        this.getYearList();
        this.placeTypes = [];
        getPlaceType(val).then((d) => {
          if (!d || !d.data || !d.data.length) {
            return false;
          }
          let data = d.data,
            length = data.length;
          for (let i = 0; i < length; i++) {
            let t = data[i];
            this.placeTypes.push({
              id: t.id,
              domId: ('type' + t.id),
              type: 'type',
              name: t.name
            });
          }
        });
      },
      selectYearValue(val, oldVal) {
        this.selectTermValue = '';
        this.termList = [];
        if (this.selectTreeNodeId.length == 0 || val.length == 0) {
          return false;
        }
        getTermList({
          unitId: this.selectTreeNodeId,
          year: val
        }).then((data) => {
          if (!data.data || data.data.length == 0) {
            return false;
          }
          let _this = this,
            _term = this.$route.params.term;
          _this.termList = data.data;
          if (_term) {
            _this.selectTermValue = _term;
            this.$route.params.term = undefined;
          } else {
            _this.termList.forEach(function(y) {
              if (y.current) {
                _this.selectTermValue = y.schoolTerm;
                return;
              }
            });
            if (!_this.selectTermValue || _this.selectTermValue.length == 0) {
              _this.selectTermValue = '1';
            }
          }
        });
        this.getStages();
      },
      selectTermValue(val, oldVal) {
        this.getClassList();
      }
    },
    created() {
      getRcCodeList('category_base_gc', this.codeList).then(() => {
        this.getTree();
      })
      this.$parent.$emit('currentPage', '/base/grade');
    },
    methods: {
      handleIconClick() {
        this.$refs.tree.filter(this.filterText);
      },
      getDropdownTree() {
        // 新增
        if (this.dialogClassFormVisible) {
          return this.$refs['adddropdowntree'];
        }
        // 修改
        return this.$refs['editdropdowntree'];
      },
      roomsChange(node) {
        let $dropdowntree_ = this.getDropdownTree();
        if (node.type === 'type') {
          if (!$dropdowntree_) {
            return false;
          }
          for (let i = 0; i < $dropdowntree_.$children.length; i++) {
            if ($dropdowntree_.$children[i] && $dropdowntree_.$children[i].node['key'] == node.domId) {
              $dropdowntree_.$children[i].handleExpandIconClick();
            }
          }
          return false;
        }
        if (this.dialogClassFormVisible) {
          this.addClassForm.address = node.id;
          this.addClassForm.addressName = node.address;
        } else if (this.editorClassDialog) {
          this.editorClassForm.address = node.id;
          this.editorClassForm.addressName = node.address;
        }
        $dropdowntree_.$parent.$parent.hide();
      },
      loadNode(node, resolve) {
        var datas = [];
        if (node.level === 1) {
          getPlace({
            unitId: this.selectTreeNodeId,
            placeTypeId: node.data.id
          }).then((d) => {
            if (!d || !d.data || !d.data.list || !d.data.list.length) {
              resolve(datas);
              return false;
            }
            let data = d.data.list,
              length = data.length,
              $dropdowntree_ = this.getDropdownTree();
            for (let i = 0; i < length; i++) {
              let t = data[i];
              datas.push({
                id: t.id,
                domId: ('room' + t.id),
                type: 'room',
                name: t.name,
                address: t.name
              });
            }
            resolve(datas);
            if ($dropdowntree_) {
              setTimeout(()=>{
                for (let i = 0; i < $dropdowntree_.$children.length; i++) {
                  if ($dropdowntree_.$children[i] && $dropdowntree_.$children[i].node['key'] == node['key']) {
                    let _node_ = $dropdowntree_.$children[i];
                    for (let j = 0; j < _node_.$children.length; j++) {
                      if (_node_.$children[j] && _node_.$children[j].handleExpandIconClick) {
                        _node_.$children[j].handleExpandIconClick();
                      }
                    }
                  }
                }
              }, 100);
            }
          });
        } else {
          resolve(datas);
        }
      },
      selectUsers(t) {
        let _this = this;
        if (t == 'addNJZZ' || t == 'addFNJZZ') {
          this.$SelectUsers({
            selectUserType: 2,
            userTypes: [2],
            unitId: this.selectTreeNodeId,
            selectUserIds: this.addGradeForm[t == 'addNJZZ' ? 'njzz' : 'njfzz']
          }, function(users) {
            if (users.length > 1) {
              _this.$notify.info({
                message: '只能选择一个用户！'
              });
              return false;
            }
            let uNames = [];
            _this.addGradeForm[t == 'addNJZZ' ? 'njzz' : 'njfzz'] = [];
            for (let u in users) {
              _this.addGradeForm[t == 'addNJZZ' ? 'njzz' : 'njfzz'].push(users[u].id);
              uNames.push(users[u].realName);
            }
            _this.addGradeForm[t == 'addNJZZ' ? 'njzzNames' : 'njfzzNames'] = uNames.join('/');
          });
        } else if (t == 'updateNJZZ' || t == 'updateFNJZZ') {
          this.$SelectUsers({
            selectUserType: 2,
            userTypes: [2],
            unitId: this.selectTreeNodeId,
            selectUserIds: this.editorGradeForm[t == 'updateNJZZ' ? 'njzz' : 'njfzz']
          }, function(users) {
            if (users.length > 1) {
              _this.$notify.info({
                message: '只能选择一个用户！'
              });
              return false;
            }
            let uNames = [];
            _this.editorGradeForm[t == 'updateNJZZ' ? 'njzz' : 'njfzz'] = [];
            for (let u in users) {
              _this.editorGradeForm[t == 'updateNJZZ' ? 'njzz' : 'njfzz'].push(users[u].id);
              uNames.push(users[u].realName);
            }
            _this.editorGradeForm[t == 'updateNJZZ' ? 'njzzNames' : 'njfzzNames'] = uNames.join('/');
          });
        } else if (t == 'addBZR' || t == 'addFBZR') {
          this.$SelectUsers({
            selectUserType: 2,
            userTypes: [2],
            unitId: this.selectTreeNodeId,
            selectUserIds: this.addClassForm[t == 'addBZR' ? 'headTeacher' : 'fbzr']
          }, function(users) {
            if (users.length > 1) {
              _this.$notify.info({
                message: '只能选择一个用户！'
              });
              return false;
            }
            let uNames = [];
            _this.addClassForm[t == 'addBZR' ? 'headTeacher' : 'fbzr'] = [];
            for (let u in users) {
              _this.addClassForm[t == 'addBZR' ? 'headTeacher' : 'fbzr'].push(users[u].id);
              uNames.push(users[u].realName);
            }
            _this.addClassForm[t == 'addBZR' ? 'headTeacherName' : 'fbzrName'] = uNames.join('/');
          });
        } else if (t == 'updateBZR' || t == 'updateFBZR') {
          this.$SelectUsers({
            selectUserType: 2,
            userTypes: [2],
            unitId: this.selectTreeNodeId,
            selectUserIds: this.editorClassForm[t == 'updateBZR' ? 'headTeacher' : 'fbzr']
          }, function(users) {
            if (users.length > 1) {
              _this.$notify.info({
                message: '只能选择一个用户！'
              });
              return false;
            }
            let uNames = [];
            _this.editorClassForm[t == 'updateBZR' ? 'headTeacher' : 'fbzr'] = [];
            for (let u in users) {
              _this.editorClassForm[t == 'updateBZR' ? 'headTeacher' : 'fbzr'].push(users[u].id);
              uNames.push(users[u].realName);
            }
            _this.editorClassForm[t == 'updateBZR' ? 'headTeacherName' : 'fbzrName'] = uNames.join('/');
          });
        }
      },
      getYearList() {
        this.yearList = [];
        this.selectYearValue = '';
        if (this.selectTreeNodeId.length == 0) {
          return false;
        }
        getYearList(this.selectTreeNodeId).then((data) => {
          if (!data.data || data.data.length == 0) {
            return false;
          }
          let _this = this,
            _year = this.$route.params.year;
          _this.yearList = data.data;
          if (_year) {
            _this.selectYearValue = _year;
            this.$route.params.year = undefined;
          } else {
            _this.yearList.forEach(function(y) {
              if (y.current) {
                _this.selectYearValue = y.year;
                return;
              }
            });
          }
        });
      },
      getClassList() {
        this.classData = [];
        if (this.selectGradeId.length == 0 || this.selectYearValue.length == 0 || this.selectTermValue.length == 0) {
          return false;
        }
        getClassList({
          gradeId: this.selectGradeId,
          year: this.selectYearValue,
          schoolterm: this.selectTermValue
        }).then((data) => {
          if (!data.data || data.data.length == 0) {
            return false;
          }
          this.classData = data.data;
        });
      },
      getGradeList() {
        this.tableData = [];
        this.selectGradeId = '';
        if (this.selectTreeNodeId.length == 0 || this.selectStageId.length == 0 || this.selectYearValue.length == 0) {
          return false;
        }
        getGradeList({
          unitId: this.selectTreeNodeId,
          stageId: this.selectStageId,
          year: this.selectYearValue
        }).then((data) => {
          if (!data.data || data.data.length == 0) {
            return false;
          }
          this.tableData = data.data;
          let _gradeId = this.$route.params.gradeId;
          if (_gradeId) {
            this.selectGradeId = _gradeId;
            this.$route.params.gradeId = undefined;
          } else {
            for (let i = 0; i < this.tableData.length; i++) {
              if (this.tableData[i].status == 1) {
                this.selectGradeId = this.tableData[i].id;
                break;
              }
            }
          }
        });
      },
      getStages() {
        this.stages = [];
        this.selectStageId = '';
        if (this.selectTreeNodeId.length == 0) {
          return false;
        }
        getStages(this.selectTreeNodeId).then((data) => {
          this.stages = [];
          if (!data.data || data.data.length == 0) {
            return false;
          }
          this.stages = data.data;
          let _stage = this.$route.params.stage;
          if (_stage) {
            this.selectStageId = _stage;
            this.$route.params.stage = undefined;
          } else {
            this.selectStageId = this.stages[0].id;
          }
        });
      },
      getTree() {
        getUnitTree().then((data) => {
          if (data.data && data.data.length > 0) {
            let _unitId = this.$route.params.unitId;
            if (_unitId) {
              this.selectTreeNodeId = _unitId;
              this.selectTreeNodeName = (_.find(data.data, {
                unitId: _unitId
              }) ? _.find(data.data, {
                unitId: _unitId
              }).name : '');
              this.$route.params.unitId = undefined;
            } else {
              for (let i = 0; i < data.data.length; i++) {
                if (_unitId && _unitId === data.data[i].unitId) {

                } else if (data.data[i].unitType == 2) {
                  this.selectTreeNodeId = data.data[i].unitId;
                  this.selectTreeNodeName = data.data[i].name;
                  break;
                }
              }
            }
            this.treeData = this.$data2tree(data.data, 'unitId', 'parentId');
          }
        });
      },
      onHasList() {
        this.isHasList = !this.isHasList;
      },
      filterNode(value, data) {
        if (!value) {
          return true;
        }
        return data.name.indexOf(value) !== -1;
      },
      currentNodeClick(data) {
        this.selectTreeNodeName = data.name;
        // 教育局没操作
        if (data.unitType == 1) {
          this.selectTreeNodeId = '';
          this.selectYearValue = '';
          this.selectStageId = '';
          this.selectTermValue = '';
          this.selectGradeId = '';
          this.stages = [];
          this.tableData = [];
          this.classData = [];
          return false;
        }
        this.selectTreeNodeId = data.unitId;
      },
      merge(target) {
        for (let i = 1, j = arguments.length; i < j; i++) {
          let source = arguments[i] || {};
          for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
              let value = source[prop];
              if (value !== undefined) {
                target[prop] = value;
              }
            }
          }
        }
      },
      saveGrade() {
        this.$refs.addGradeForm.validate((valid) => {
          if (!valid) {
            return false;
          }
          this.addGradeForm.stageId = this.selectStageId;
          this.addGradeForm.unitId = this.selectTreeNodeId;
          this.addGradeForm.njzz = this.addGradeForm.njzz.join(',');
          this.addGradeForm.njfzz = this.addGradeForm.njfzz.join(',');
          this.loading = true;
          saveGrade(this.addGradeForm).then((data) => {
            this.getGradeList();
            this.dialogGradeFormVisible = false;
            this.loading = false;
            this.$notify({
              message: '操作成功！',
              type: 'success'
            });
          });
        });
      },
      //新增年级
      toAddGrade() {
        this.$refs.addGradeForm.resetFields();
        this.addGradeForm = {
          graduated: 0,
          status: 1,
          prevGrade: '',
          njzz: [],
          njfzz: [],
          njzzNames: '',
          njfzzNames: '',
          sort: ''
        };
        this.dialogGradeFormVisible = true;
      },
      saveClass() {
        this.$refs.addClassForm.validate((valid) => {
          if (!valid) {
            return false;
          }
          this.addClassForm.unitId = this.selectTreeNodeId;
          this.addClassForm.year = this.selectYearValue;
          this.addClassForm.term = this.selectTermValue;
          let grade = _.find(this.tableData, { id: this.selectGradeId });
          this.addClassForm.ji = grade.ji;
          this.addClassForm.jie = grade.jie;
          this.addClassForm.headTeacher = this.addClassForm.headTeacher.join(',');
          this.addClassForm.fbzr = this.addClassForm.fbzr.join(',');
          this.loading = true;
          saveClass(this.addClassForm).then((data) => {
            this.getClassList();
            this.dialogClassFormVisible = false;
            this.loading = false;
            this.$notify({
              message: '操作成功！',
              type: 'success'
            });
          });
        });
      },
      //新增班级
      toAddClass() {
        if (!this.selectGradeId || this.selectGradeId.length == 0) {
          return false;
        }
        this.$refs.addClassForm.resetFields();
        this.addClassForm = {
          stageName: _.result(_.find(this.stages, { 'id': this.selectStageId }), 'name'),
          stageId: this.selectStageId,
          name: '',
          headTeacherName: '',
          headTeacher: [],
          fbzrName: '',
          fbzr: [],
          rych: '',
          gradeName: _.result(_.find(this.tableData, { 'id': this.selectGradeId }), 'name'),
          gradeId: this.selectGradeId,
          shortName: '',
          address: '',
          addressName: '',
          year: '',
          term: '',
          sort: ''
        };
        getClassName({
          gradeId: this.selectGradeId,
          year: this.selectYearValue,
          schoolterm: this.selectTermValue
        }).then((res) => {
          if (res.status == 200 && (typeof res.data == 'string') && res.data.length > 0) {
            this.addClassForm.name = res.data;
          } else {
            this.addClassForm.name = (this.addClassForm.gradeName + ((this.classData || []).length + 1) + '班');
          }
          this.dialogClassFormVisible = true;
        });
      },
      //导入历史班级
      importHistoryClass() {
        if (!this.selectTreeNodeId || this.selectTreeNodeId.length <= 0) {
          return false;
        }
        this.$router.push({
          path:'/pk/pre/manager/baseData/historyClass',
          params: {
            unitId: this.selectTreeNodeId,
            year: this.selectYearValue,
            term: this.selectTermValue,
            stage: this.selectStageId,
            gradeId: this.selectGradeId
          }
        });
      },
      //批量新增班级
      toBatchClass() {
        this.dialogClassesFormVisible = true;
      },
      batchClass() {
        this.$refs['batchClassForm'].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.loading = true;
          beachSaveClass({
            num: this.batchClassForm.classNum,
            jbny: (this.batchClassForm.jbny ? moment(this.batchClassForm.jbny).format('YYYY-MM-DD') : ""),
            unitId: this.selectTreeNodeId,
            gradeId: this.selectGradeId,
            year: this.selectYearValue,
            term: this.selectTermValue
          }).then((data) => {
            this.getClassList();
            this.dialogClassesFormVisible = false;
            this.loading = false;
            this.$notify({
              message: '操作成功！',
              type: 'success'
            });
          });
        });
      },
      //修改
      handleGradeEdit(index, row) {
        getGrade(row.id).then((data) => {
          if (!data || !data.data || !data.data.id) {
            this.$notify.info({
              title: '提示',
              message: '没有查到该年级数据！'
            });
            return false;
          }
          data = data.data;
          let njzz = [],
            njzzNames = [],
            njfzz = [],
            njfzzNames = [];
          if (data.njzzvms && data.njzzvms.length > 0) {
            let vms = data.njzzvms,
              length = vms.length;
            for (let i = 0; i < length; i++) {
              let uvm = vms[i];
              if (!uvm || !uvm.id || !uvm.id.length || uvm.deputy === 1) {
                continue;
              }
              njzz.push(uvm.id);
              njzzNames.push(uvm.realName);
            }
            for (let i = 0; i < length; i++) {
              let uvm = data.njzzvms[i];
              if (!uvm || !uvm.id || !uvm.id.length || uvm.deputy === 0) {
                continue;
              }
              njfzz.push(uvm.id);
              njfzzNames.push(uvm.realName);
            }
          }
          this.editorGradeForm = {
            id: data.id,
            unitId: data.unitId,
            name: data.name,
            oldName: data.name,
            shortName: data.shortName,
            stageId: data.stageId,
            graduated: data.graduated,
            status: data.status,
            prevGrade: data.prevGrade,
            njzz: njzz,
            njzzNames: njzzNames.join('/'),
            njfzz: njfzz,
            njfzzNames: njfzzNames.join('/'),
            sort: (!data.sort && data.sort != 0 ? '' : data.sort)
          };
          this.editorGradeDialog = true;
        });
      },
      updateGrade() {
        this.$refs['editorGradeForm'].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.editorGradeForm.njzz = this.editorGradeForm.njzz.join(',');
          this.editorGradeForm.njfzz = this.editorGradeForm.njfzz.join(',');
          this.loading = true;
          updateGrade(this.editorGradeForm).then((data) => {
            this.getGradeList();
            this.editorGradeDialog = false;
            this.loading = false;
            this.$notify({
              message: '操作成功！',
              type: 'success'
            });
          });
        });
      },
      updateClass() {
        this.$refs['editorClassForm'].validate((valid) => {
          if (!valid) {
            return false;
          }
          if (this.editorClassForm.bz) {
            let bz = _.find(this.classStudents, {
              id: this.editorClassForm.bz
            });
            if (bz) {
              this.editorClassForm.bzName = bz.realName;
            }
          }
          if (this.editorClassForm.fbz) {
            let fbz = _.find(this.classStudents, {
              id: this.editorClassForm.fbz
            });
            if (fbz) {
              this.editorClassForm.fbzName = fbz.realName;
            }
          }
          this.editorClassForm.headTeacher = this.editorClassForm.headTeacher.join(',');
          this.editorClassForm.fbzr = this.editorClassForm.fbzr.join(',');
          this.editorClassForm.year = this.selectYearValue;
          this.editorClassForm.term = this.selectTermValue;
          this.loading = true;
          updateClass(this.editorClassForm).then((data) => {
            this.getClassList();
            this.editorClassDialog = false;
            this.loading = false;
            this.$notify({
              message: '操作成功！',
              type: 'success'
            });
          });
        });
      },
      handleClassEdit(index, row) {
        getClass({
          classId: row.id,
          year: this.selectYearValue,
          schoolterm: this.selectTermValue,
          unitId: this.selectTreeNodeId
        }).then((data) => {
          if (!data || !data.data || !data.data.id) {
            this.$notify.info({
              title: '提示',
              message: '没有查到该班级数据！'
            });
            return false;
          }
          data = data.data;
          let njzz = [],
            njzzNames = [],
            njfzz = [],
            njfzzNames = [];
          this.editorClassForm = {
            id: data.id,
            unitId: this.selectTreeNodeId,
            name: data.name,
            oldName: data.name,
            gradeId: data.gradeId,
            headTeacher: [data.bzrId],
            headTeacherName: data.bzrName,
            fbzr: [data.fbzrId],
            fbzrName: data.fbzrName,
            rych: data.bjrych,
            shortName: data.shortName,
            bz: data.bzId,
            bzName: data.bzName,
            sort: (!data.sort && data.sort != 0 ? '' : data.sort),
            fbz: data.fbzId,
            fbzName: data.fbzName,
            address: data.classRoomId,
            addressName: data.classRoomName
          };
          this.classStudents = [];
          getClassStudent({
            unitId: this.selectTreeNodeId,
            clazz: data.id,
            year: this.selectYearValue,
            term: this.selectTermValue
          }).then((d) => {
            if (d && d.data && d.data.length > 0) {
              this.classStudents = d.data;
              // 班长不存在，则置空
              if (!_.find(this.classStudents, {
                  id: data.bzId
                })) {
                this.editorClassForm.bz = '';
                this.editorClassForm.bzName = '';
              }
              // 副班长不存在，则置空
              if (!_.find(this.classStudents, {
                  id: data.fbzId
                })) {
                this.editorClassForm.fbz = '';
                this.editorClassForm.fbzName = '';
              }
            }
            this.editorClassDialog = true;
          });
        });
      },
      handleClassDelete(index, row) {
        this.$confirm('此操作将删除该班级，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteClass(row.id, {
            unitId: this.selectTreeNodeId,
            year: this.selectYearValue,
            term: this.selectTermValue
          }).then((data) => {
            if (data && data.code && data.code == 'data_validate_failed_error') {
              if (data.data && data.data.length > 0) {
                let msgs = [];
                data.data.forEach((el) => {
                  msgs.push((el.fieldName && el.fieldName.length > 0 ? ("字段：" + el.fieldName + "  ") : "") + el.message);
                });
                this.$notify({
                  title: '失败',
                  message: (msgs.length > 0 ? msgs.join('    ') : '操作失败！'),
                  type: 'error'
                });
              }
            } else {
              this.$notify({
                message: '删除成功！',
                type: 'success'
              });
              this.getClassList();
            }
          });
        }).catch(() => { });
      }
    }
  }
</script>
<style scoped>
  .sy-left {
    float: left;
  }

  .sy-right {
    float: right;
  }

  .ib {
    display: inline-block;
  }

  .lh40 {
    height: 40px;
    line-height: 40px;
  }

  .mt10 {
    margin-top: 10px;
  }

  .ml10 {
    margin-left: 10px;
  }

  .mr10 {
    margin-right: 10px;
  }

  .pl20 {
    padding-left: 20px
  }

  .mt5 {
    margin-top: 5px;
  }

  .sy-top-layout {
    position: absolute;
    top: 0px;
    width: 100%;
    height: 50%;
    z-index: 1;
  }

  .sy-bottom-layout {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 50%;
    z-index: 1;
  }

  .el-dropdown-menu {
    padding: 0px;
  }

  .el-dropdown-menu .el-tree {
    border: none;
  }
  .app-container-box {
    top:185px;
    bottom:50px;
  }

</style>
