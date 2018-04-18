<template>
    <div class="app-container-box">
        <div class="sy-tabs">
            <div class="full-parent-height">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name">
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div class="sy-tabs-body">
            <sy-grad-4>
                <div slot="headerLeft" v-if="isShowLeft">单位</div>
                <div slot="headerRight" v-text="titleName" class="line-height-56"></div>
                <div slot="bodyLeft" v-if="isShowLeft">
                    <sy-grad-4 :border="false">
                        <div slot="headerRight" class="line-height-56" style="background:#fff;">
                            <el-input placeholder="请输入关键字" icon="search" v-model.trim="filterText" @keyup.enter.native="handleIconClick" size="small" :on-icon-click="handleIconClick">
                            </el-input>
                        </div>
                        <div slot="bodyRight">
                            <el-tree :data="unitTreeData" :empty-text="emptyText" style="border:0;" :props="defaultProps" class="full-parent" default-expand-all :highlight-current="true" :current-node-key="defaultKey" :default-expanded-keys="openArrList" @node-click="handleNodeClick" :filter-node-method="filterNode" node-key="unitId" ref="tree"></el-tree>
                        </div>
                    </sy-grad-4>
                </div>
                <div slot="bodyRight">
                    <sy-grad-4 :border="false">
                        <div slot="headerRight" class="padding-top-5 padding-bottom-5 ">
                            <div class="sy-row">
                                <div class="sy-col sy-18">
                                    <div class="sy-row">
                                        <span class="sy-condition">学年:
                                            <el-select class="width100" v-model="year" placeholder="学年" @change="yearChange">
                                                <el-option v-for="item in years" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </span>
                                        <span class="sy-condition ">学期:
                                            <el-select class="width100" v-model="term " placeholder="学期 " @change="termChange">
                                                <el-option v-for="item in terms" :key="item.value" :value="item.value" :label="item.label"></el-option>
                                            </el-select>
                                        </span>
                                        <span class="sy-condition " v-show="isShowClassType">班级类型:
                                            <el-select class="width100" v-model="classType " placeholder="班级类型 " @change="classTypeChange">
                                                <el-option v-for="item in classTypes" :key="item.value" :label="item.label" :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </span>
                                        <span class="sy-condition " v-show="isShowGrade ">年级:
                                            <el-select class="width100" v-model="grade " placeholder="年级 " @change="gradeChange">
                                                <el-option v-for="item in grades" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </span>
                                        <span class="sy-condition" v-show="isShowDimension ">维度:
                                            <el-select class="width100" v-model="dimension" placeholder="维度 " @change="dimensionChange">
                                                <el-option v-for="item in dimensions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </span>
                                        <span class="sy-condition" v-show="isShowPeriod ">学段:
                                            <el-select class="width100" v-model="stage " placeholder="学段 " @change="periodChange">
                                                <el-option v-for="item in periods" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                            </el-select>
                                        </span>
                                    </div>
                                </div>
                                <div class="sy-col sy-2 right">
                                    <el-button @click="downLoad" :disabled="downLoadDisabled">下载</el-button>
                                </div>
                            </div>
                        </div>
                        <div slot="bodyRight" style="width:100%;height:100%;padding: 0 10px 10px;">
                            <div class="teaching" v-if="activeName=='page_base_academicinquiry_appointTeacher'" style="width:100%;height:100%;">
                                <el-table style="width:100%;height:100%;" :data="tableData1" :empty-text="emptyText" border height="100%" v-show="classType == '1'">
                                    <el-table-column v-for="item in teaching" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :align="item.align" :fixed="item.fixed"></el-table-column>
                                </el-table>
                                <div class="elective full-parent-height" v-show="classType == '2'">
                                    <div class="administrationClass" v-for="item in administrationClass" :key="item.id">
                                        <div class="administrationClassName">{{item.name}}</div>
                                        <el-table :data="tableData2" :empty-text="emptyText" border>
                                            <el-table-column v-for="column in item.courseNames" :key="column.prop" :prop="column.prop" :label="column.label" :width="column.width" :fixed="column.fixed" :align="column.align"></el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </div>
                            <el-table :data="tableData3" :empty-text="emptyText" border height="100%" style="width:100%;height:100%;" v-else-if="activeName=='page_base_academicinquiry_teacherGroup'">
                                <el-table-column fixed prop="dimension" label="部门分组" width="150" align="center" v-if="dimension =='0'"></el-table-column>
                                <el-table-column fixed prop="dimension" label="学科分组" width="150" align="center" v-else-if="dimension =='1'"></el-table-column>
                                <el-table-column fixed prop="dimension" label="年级分组" width="150" align="center" v-else></el-table-column>
                                <el-table-column v-for="item in teachersType" :key="item.prop" :prop="item.prop" :label="item.label" :align="item.align" :width="item.width"></el-table-column>
                            </el-table>
                            <el-table :data="tableData4" :empty-text="emptyText" border height="100%" style="width:100%;height:100%;" v-else-if="activeName=='page_base_academicinquiry_courseNumber'">
                                <el-table-column v-for="item in classTimes" :key="item.prop" :prop="item.prop" :label="item.label" :width="item.width" :fixed="item.fixed" :align="item.align"></el-table-column>
                            </el-table>
                        </div>
                    </sy-grad-4>
                </div>
            </sy-grad-4>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import config from './config.js';
import pager from '../../config.js';
import { getCodeList, getUnitTree, getYears, getNowYear, getTermList, getCurrentTerm, getStageList, getGradeList, getNowStage, getTeachSituations, getTeachSituationsDownload, getTeacherGroup, getCourseHour } from './request.js';

import { getRcCodeList } from '../../request.js';

export default {
    name: 'eduAffair',
    components: {
    },
    data() {
        return {
            emptyText: '正在加载中...',
            isShowLeft: false,
            firstClick: true,//true为第一次点击
            activeName: '任教查询',
            tabs: config.tabs,
            titleName: '',
            unitTreeData: [],//单位树结构
            filterText: '',//选择过滤树
            defaultProps: {//树配置选项
                label: 'name',
                children: 'children'
            },
            defaultKey: '',//默认选中的树节点 unitID
            openArrList: [],//默认打开的节点数组
            year: '',
            term: '',
            classType: '1',
            grade: '',
            dimension: '0',
            stage: '',
            years: [],
            terms: [],
            periods: [],//学段
            grades: [],//年级
            classTypes: config.classTypes,
            dimensions: config.dimensions,//维度
            isShowClassType: true,
            isShowGrade: true,
            isShowDimension: '',
            downLoadDisabled: true,//下载按钮是否可以使用
            isShowPeriod: '',
            teaching: [],//行政班任教表头
            // courseNames: [],//选修班任教表头
            administrationClass: [{
                courseNames: []
            }],//选修班的课程
            tableData1: [],//任教查询行政班
            tableData2: [],//任教查询选修班
            tableData3: [],//教师分组查询
            teachersType: config.teachersType,//教师分组查询表头
            tableData4: [],//课时查询
            classTimes: [],//课时查询表头
        }
    },
    beforeCreate() {
    },
    created() {
        this.tabs = [];
        getCodeList().then((res) => {
            (res.data || []).forEach((el, i) => {
                if (el.resourceType == 3) {
                    this.tabs.push({
                        label: el.name,
                        name: el.code
                    });
                }
            });
            if (this.tabs.length == 0) {
                return false;
            }
            this.activeName = this.tabs[0].name;
            this.$parent.$emit('currentPage', '/base/eduAffair');/*刷新后页面和左侧栏目都保持在当前的状态*/
            this.getUnitTree();
            this.handleClick();
        });
    },
    methods: {
        getUnitTree() {
            getUnitTree().then((data) => {
                if (data.data && data.data.length > 0) {
                    if (data.data.length == 1) {
                        if (data.data[0].unitType == 2) {
                            this.isShowLeft = false;
                        } else {
                            this.isShowLeft = true;
                        }
                    } else {
                        this.isShowLeft = true;
                    }
                    this.defaultKey = data.data[0].unitId
                    this.openArrList.push(data.data[0].parentId)

                    this.unitTreeData = this.$data2tree(data.data, 'unitId', 'parentId');
                    //单位树初始化成功之后，初始化左侧
                    if (this.defaultKey) {
                        this.grade = [];
                        this.years = [];
                        this.getYearList({ unitId: this.defaultKey });
                        this.getGradeList({ unitId: this.defaultKey });
                        if (this.year && this.term) {
                            if (this.classType) {
                                if (this.classType == "1") {
                                    if (this.grade) {
                                        this.getTeachSituations({ unitId: this.defaultKey, yearValue: this.year, termValue: this.term, bjlxm: this.classType, gradeId: this.grade });
                                    }
                                } else {
                                    this.getTeachSituations({ unitId: this.defaultKey, yearValue: this.year, termValue: this.term, bjlxm: this.classType });
                                }
                            }
                        }
                    }
                } else {
                    this.emptyText = '';
                }
            });
        },
        handleNodeClick(data) {
            if (this.activeName == "page_base_academicinquiry_appointTeacher") {
                if (this.classType == '1') {
                    this.teaching = [];//重置表头
                    this.tableData1 = [];//重置表中的数据
                } else {
                    this.tableData2 = [];
                    this.administrationClass = [];
                }
            } else if (this.activeName == "page_base_academicinquiry_teacherGroup") {
                this.tableData3 = [];
            } else {
                this.tableData4 = [];
                this.classTimes = [];
            };
            if (this.firstClick) {
                if (data.unitType == 1) {
                    this.years = [];
                    this.year = "";
                    this.terms = [];
                    this.term = "";
                    this.classTypes = [];
                    this.classType = "";
                    this.dimensions = [];//维度
                    this.dimension = "";
                    this.grade = "";
                    this.grades = [];
                    this.stage = "";
                    this.downLoadDisabled = true;
                } else {
                    this.emptyText = '';
                    if (data.unitId) {
                        //初始化所有的方法
                        this.years = [];
                        this.year = "";
                        this.terms = [];
                        this.term = "";
                        if (this.activeName == "page_base_academicinquiry_appointTeacher") {
                            this.classTypes = config.classTypes;
                            this.classType = "1";
                        } else if (this.activeName == "page_base_academicinquiry_teacherGroup") {
                            this.dimensions = config.dimensions;//维度
                            this.dimension = "0";
                        }
                        this.grade = "";
                        this.grades = [];
                        this.stage = "";
                        this.stages = [];
                        this.downLoadDisabled = false;
                        this.defaultKey = data.unitId;
                        this.getYearList({ unitId: this.defaultKey });
                        this.getNowStage({ unitId: this.defaultKey });
                        this.firstClick = false;

                    }
                }
            } else {
               this.emptyText = '';
                if (this.defaultKey !== data.unitId) {
                    this.firstClick = true;
                    this.handleNodeClick(data);
                }
            }
        },
        // 过滤
        handleIconClick() {
            this.$refs.tree.filter(this.filterText);
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) != -1;
        },
        getYearList(param) {
            getYears(param).then((res) => {
                if (res.data && res.data.length > 0) {
                    res.data.forEach((val) => {
                        this.years.push({
                            value: val.year,
                            label: val.year,
                        })
                        if (val.current == true) {
                            this.year = val.year
                        }
                    })
                } else {
                    this.emptyText = '';
                }
            })
        },
        //学期
        getTermList(param) {
            getTermList(param).then((res) => {
                this.terms = [];
                if (res.data && res.data.length > 0) {
                    res.data.forEach((val) => {
                        this.terms.push({
                            value: val.schoolTerm,
                            label: val.name,
                        })
                        if (val.current == true) {
                            this.term = val.schoolTerm
                        } else {
                            this.term = res.data[0].schoolTerm
                        }
                    })
                } else {
                    this.emptyText = '';
                }
            })
        },
        //年级
        getGradeList(param) {
            getGradeList(param).then((res) => {
                this.grades = [];
                if (res.data && res.data.length > 0) {
                    res.data.forEach((val, index) => {
                        this.grades.push({
                            value: val.id,
                            label: val.gradeName,
                        })
                        this.grade = res.data[0].id
                    })
                } else {
                    this.emptyText = '';
                }
            })
        },
        //获得学段并默认设置第一个学段为当前学段
        getNowStage(param) {
            getNowStage(param).then((res) => {
                this.periods = [];
                if (res.data && res.data.length > 0) {
                    res.data.forEach((val, index) => {
                        this.periods.push({
                            value: val.id,
                            label: val.name,
                        })
                    })
                    this.stage = res.data[0].id
                } else {
                    this.emptyText = '';
                }
            })
        },
        //任教查询的表格   
        getTeachSituations(param) {
            this.teaching = [];//重置表头
            this.tableData1 = [];//重置表中的数据
            this.tableData2 = [];
            this.administrationClass = [];
            this.emptyText = "正在加载中...";
            getTeachSituations(param).then((res) => {
                if (res.data) {
                    if (this.classType == "1") {
                        this.tableData2 = [];
                        this.administrationClass = [];
                        this.downLoadDisabled = true;
                        //行政班
                        //获取表头的数据
                        //表头的固定内容
                        if (res.data.teachSituationTableHeaderVMS) {
                            if (res.data.teachSituationTableHeaderVMS.length > 0) {
                                this.downLoadDisabled = false;
                                this.teaching.push(
                                    {
                                        label: "班级",
                                        prop: "className",
                                        fixed: true,
                                        align: "center",
                                        width: "100",
                                    }, {
                                        label: "班主任",
                                        prop: "classWork",
                                        fixed: true,
                                        align: "center",
                                        width: "120",
                                    })
                                res.data.teachSituationTableHeaderVMS.forEach((_d) => {
                                    //获取的表头内容
                                    this.teaching.push({
                                        label: _d.content,
                                        prop: 'content_' + _d.id,
                                        fixed: false,
                                        align: "center",
                                        width: " ",
                                    }
                                    )
                                })
                                let tarr = [];
                                if (res.data.teachSituationListVMS && res.data.teachSituationListVMS.length > 0) {
                                    res.data.teachSituationListVMS.forEach((_t) => {
                                        let obj = {
                                            className: _t.className,
                                            classWork: _t.bzrName
                                        }
                                        if (_t.teachSituationCourseLists && _t.teachSituationCourseLists.length > 0) {
                                            _t.teachSituationCourseLists.forEach((_list) => {
                                                let names = [];
                                                if (_list.teachSituationCourseTeaLists && _list.teachSituationCourseTeaLists.length > 0) {
                                                    _list.teachSituationCourseTeaLists.forEach((_teacher) => {
                                                        names.push(_teacher.teaName);
                                                    })
                                                    obj['content_' + _list.courseId] = names.join('、');
                                                }
                                            })
                                        }
                                        tarr.push(obj);
                                    })
                                    this.tableData1 = tarr;
                                }
                            } else {
                                this.emptyText = '';
                            }
                        } else {
                            this.emptyText = '';
                        }
                    } else {
                        //选修班
                        this.downLoadDisabled = true;
                        this.teaching = [];
                        this.tableData1 = [];
                        this.tableData2 = [];
                        this.administrationClass = [];
                        //表格数据
                        let obj2 = {
                            teacher: "任课教师"
                        }
                        if (res.data.teachSituationListVMS && res.data.teachSituationListVMS.length > 0) {
                            res.data.teachSituationListVMS.forEach((val) => {
                                let obj = {
                                    name: val.className,
                                    id: val.classId
                                }
                                let arr = [];
                                if (val.teachSituationCourseLists && val.teachSituationCourseLists.length > 0) {
                                    arr.push({
                                        label: "",
                                        prop: "teacher",
                                        fixed: true,
                                        align: "center",
                                        width: "100",
                                    });
                                    this.downLoadDisabled = false;
                                    val.teachSituationCourseLists.forEach((value) => {
                                        arr.push({
                                            label: value.courseName,
                                            prop: value.courseId,
                                            fixed: false,
                                            align: "",
                                            width: "",
                                        });
                                        var namess = [];
                                        if (value.teachSituationCourseTeaLists && value.teachSituationCourseTeaLists.length > 0) {
                                            value.teachSituationCourseTeaLists.forEach((v) => {
                                                namess.push(v.teaName);
                                            })
                                            obj2[value.courseId] = namess.join(",");
                                        }
                                    });
                                    obj.courseNames = arr;
                                    this.administrationClass.push(obj);
                                }
                            })
                            this.tableData2.push(obj2)
                        } else {
                            this.emptyText = '';
                            this.administrationClass = [];
                            this.administrationClass.push({
                                courseNames: []
                            });
                        }
                    }
                }
            });
        },
        //教师分组查询
        getTeacherGroup(param) {
            this.emptyText = "正在加载中...";
            getTeacherGroup(param).then((res) => {
                this.tableData3 = [];
                if (res.data && res.data.length > 0) {
                    this.downLoadDisabled = false;
                    res.data.forEach((val) => {
                        let arr = [];
                        if (val.teacher) {
                            Object.keys(val.teacher).forEach((_val, i) => {
                                arr.push(val.teacher[_val])
                            })
                            arr = arr.join("、");
                        }
                        this.tableData3.push({
                            dimension: val.groupName,
                            peoples: val.count,
                            teachers: arr ? arr : "",
                        })
                    })
                } else {
                    this.emptyText = '';
                }
            })
        },
        //课时查询
        getCourseHour(param) {
            this.emptyText = "正在加载中...";
            getCourseHour(param).then((res) => {
                // 重置表格信息
                this.classTimes = []
                this.tableData4 = [];
                if (res.data) {
                    let tableData4Obj = {};
                    let classIds = [];
                    if (res.data.cgList) {
                        if (res.data.cgList.length > 0) {
                            this.downLoadDisabled = false;
                            this.classTimes = [];
                            this.classTimes.push({
                                label: "科目",
                                prop: "course",
                                fixed: true,
                                align: "center",
                                width: "100",
                            })
                            res.data.cgList.forEach((val, index) => {
                                classIds.push(val.gradeId);
                                this.classTimes.push({
                                    label: val.name,
                                    prop: val.gradeId,
                                    fixed: false,
                                    align: "center",
                                    width: " ",
                                })
                            })
                        } else {
                            this.emptyText = '';
                        }
                    };
                    if (res.data.clList && res.data.clList.length > 0) {
                        res.data.clList.forEach((val, index) => {
                            tableData4Obj = { course: val.courseName };
                            for (var i = 0; i < classIds.length; i++) {
                                let classId = classIds[i];
                                for (var a = 0; a < this.classTimes.length; a++) {
                                    if (this.classTimes[a].prop != "course") {
                                        tableData4Obj[this.classTimes[a].prop] = res.data.gradeCourseMap[this.classTimes[a].prop + '_' + val.courseId];
                                    }
                                }
                            }
                            this.tableData4.push(tableData4Obj);
                        })
                    }
                }
            })
        },
        //下载
        downLoad() {
            if (this.term && this.year) {
                if (this.activeName == "page_base_academicinquiry_appointTeacher") {
                    let url = `/api/base/teachSituations/download`;
                    if (this.classType && this.grade) {
                        if (this.classType == "1") {
                            if (this.grade) {
                                this.$downloade(url, 'post', { unitId: this.defaultKey, yearValue: this.year, termValue: this.term, bjlxm: this.classType, gradeId: this.grade })
                            }
                        } else {
                            this.$downloade(url, 'post', { unitId: this.defaultKey, yearValue: this.year, termValue: this.term, bjlxm: this.classType })
                        }
                    }
                } else if (this.activeName == "page_base_academicinquiry_teacherGroup") {
                    let url = `/api/base/teachergroup/download`;
                    if (this.dimension) {
                        this.$downloade(url, 'post', { unitId: this.defaultKey, schoolterm: this.term, group: this.dimension, year: this.year })
                    }
                } else if (this.activeName == "page_base_academicinquiry_courseNumber") {
                    let url = `/api/base/grade_course_r/download`;
                    if (this.stage) {
                        this.$downloade(url, 'post', { yearValue: this.year, termValue: this.term, stageId: this.stage, unitId: this.defaultKey })
                    }
                }
            }
        },
        //tabs切换
        handleClick() {
            if (this.activeName == "page_base_academicinquiry_appointTeacher") {
                this.isShowClassType = true;
                this.isShowGrade = true;
                this.isShowDimension = false;
                this.isShowPeriod = false;
                this.titleName = this.tabs[0].label;
                if (this.year && this.term) {
                    if (this.classType) {
                        if (this.classType == "1") {
                            if (this.grade) {
                                this.getTeachSituations({ unitId: this.defaultKey, yearValue: this.year, termValue: this.term, bjlxm: this.classType, gradeId: this.grade });
                            }
                        } else {
                            this.getTeachSituations({ unitId: this.defaultKey, yearValue: this.year, termValue: this.term, bjlxm: this.classType });
                        }
                    }
                }
            } else if (this.activeName == "page_base_academicinquiry_teacherGroup") {
                this.isShowClassType = false;
                this.isShowGrade = false;
                this.isShowDimension = true;
                this.isShowPeriod = false;
                this.titleName = this.tabs[1].label;
                //初始化教师分组
                if (this.year && this.term) {
                    if (this.dimension) {
                        this.getTeacherGroup({ unitId: this.defaultKey, schoolterm: this.term, group: this.dimension, year: this.year })
                    }
                }
            } else if (this.activeName == "page_base_academicinquiry_courseNumber") {
                this.isShowClassType = false;
                this.isShowGrade = false;
                this.isShowDimension = false;
                this.isShowPeriod = true;
                this.titleName = this.tabs[2].label;
                this.getNowStage({ unitId: this.defaultKey });
                //初始化课时数查询
                if (this.year && this.term) {
                    if (this.stage) {
                        this.getCourseHour({ yearValue: this.year, termValue: this.term, stageId: this.stage, unitId: this.defaultKey })
                    }
                }
            }
        },
        yearChange() {
            if (this.year) {
                //初始化时
                this.getTermList({ unitId: this.defaultKey, year: this.year });
                //初始化页面以后在页面上操作学年的选项此时调用的接口
                if (this.term) {
                    if (this.activeName == "page_base_academicinquiry_appointTeacher") {
                        if (this.classType) {
                            if (this.classType == "1") {
                                if (this.grade) {
                                    this.getTeachSituations({ unitId: this.defaultKey, yearValue: this.year, termValue: this.term, bjlxm: this.classType, gradeId: this.grade });
                                }
                            } else {
                                this.getTeachSituations({ unitId: this.defaultKey, yearValue: this.year, termValue: this.term, bjlxm: this.classType });
                            }
                        }
                    } else if (this.activeName == "page_base_academicinquiry_teacherGroup") {
                        if (this.dimension) {
                            this.getTeacherGroup({ unitId: this.defaultKey, schoolterm: this.term, group: this.dimension, year: this.year })
                        }
                    }
                    else {
                        if (this.stage) {
                            this.getCourseHour({ yearValue: this.year, termValue: this.term, stageId: this.stage, unitId: this.defaultKey })
                        }
                    }
                }
            }
        },
        termChange(val) {
            if (this.term) {
                //初始化页面以后在页面上操作学期的选项此时调用的接口
                if (this.activeName == "page_base_academicinquiry_appointTeacher") {
                    if (this.classType) {
                        if (this.classType == "1") {
                            if (this.grade) {
                                this.getTeachSituations({ unitId: this.defaultKey, yearValue: this.year, termValue: this.term, bjlxm: this.classType, gradeId: this.grade });
                            }
                        } else {
                            this.getTeachSituations({ unitId: this.defaultKey, yearValue: this.year, termValue: this.term, bjlxm: this.classType });
                        }
                    }
                } else if (this.activeName == "page_base_academicinquiry_teacherGroup") {
                    if (this.dimension) {
                        this.getTeacherGroup({ unitId: this.defaultKey, schoolterm: this.term, group: this.dimension, year: this.year })
                    }
                }
                else {
                    if (this.stage) {
                        this.getCourseHour({ yearValue: this.year, termValue: this.term, stageId: this.stage, unitId: this.defaultKey })
                    }
                }
            }
        },
        periodChange() {
            if (this.stage) {
                //初始化时
                this.getGradeList({ unitId: this.defaultKey });
                if (this.term && this.year) {
                    this.getCourseHour({ yearValue: this.year, termValue: this.term, stageId: this.stage, unitId: this.defaultKey })
                }
            }
        },
        classTypeChange() {
            if (this.classType) {
                if (this.classType == 1) {
                    this.isShowGrade = true;
                    if (this.year && this.term && this.grade) {
                        this.getTeachSituations({ unitId: this.defaultKey, yearValue: this.year, termValue: this.term, bjlxm: this.classType, gradeId: this.grade });
                    }
                } else {
                    this.isShowGrade = false;
                    if (this.year && this.term) {
                        this.getTeachSituations({ unitId: this.defaultKey, yearValue: this.year, termValue: this.term, bjlxm: this.classType });
                    }
                }
            }
        },
        gradeChange() {
            if (this.grade) {
                if (this.activeName == "page_base_academicinquiry_appointTeacher") {
                    if (this.year && this.term) {
                        if (this.classType) {
                            this.getTeachSituations({ unitId: this.defaultKey, yearValue: this.year, termValue: this.term, bjlxm: this.classType, gradeId: this.grade });
                        }
                    }
                }
            }
        },
        dimensionChange() {
            if (this.year && this.term) {
                if (this.activeName == "page_base_academicinquiry_teacherGroup") {
                    if (this.dimension) {
                        this.getTeacherGroup({ unitId: this.defaultKey, schoolterm: this.term, group: this.dimension, year: this.year })
                    }
                }
            }
        },
    },
    watch: {
        /* filterText(val) {
            this.$refs.tree.filter(val);
        } */
    },
}
</script>

<style scoped>
div {
    box-sizing: border-box;
}

.sy-rf {
    float: right
}

.bottom5 {
    position: absolute;
    bottom: 5px;
    width: 100%;
    top: 0;
}

.elective {
    overflow: auto
}

.width100 {
    width: 17%;
}

























/* 任教查询-选修班 */

.administrationClassName {
    line-height: 30px
}
</style>
