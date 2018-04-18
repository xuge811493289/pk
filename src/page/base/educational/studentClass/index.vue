<template>
    <div class="app-container-box">
        <el-tabs v-model="activeName" class="sy-tabs-divide" @tab-click="tabClick" ref="elTabs">
            <el-tab-pane label="行政班分班" name="page_base_sPlacement_administration" v-if="codeList['page_base_sPlacement_administration']">
                <sy-grad-4 v-loading="loadingDivide" element-loading-text="正在分班...">
                    <div slot="headerLeft">
                        <span>单位</span>
                    </div>
                    <div slot="headerRight" class="line-height-56">
                        <span>分班</span>
                    </div>
                    <div slot="bodyLeft">
                        <sy-grad-4 :border="false">
                            <div slot="headerRight" class="line-height-56" style="background:#fff;">
                                <el-input size="small" placeholder="请输入关键字" icon="search" v-model.trim="schoolData" @keyup.enter.native="handleSearch" :on-icon-click="handleIconClick">
                                </el-input>
                            </div>
                            <div slot="bodyRight">
                                <el-tree :empty-text="emptyTextOne" :current-node-key="defaultKey" highlight-current :data="classData" :props="defaultProps" class="full-parent" node-key="id" :default-expanded-keys="defaultKeys" @node-click="handleNodeClick" style="border:none" ref="schoolTree" :filter-node-method="searchSchool">
                                </el-tree>
                            </div>
                        </sy-grad-4>
                    </div>
                    <div slot="bodyRight" v-show="notGrade">
                        <div class="sy-up">
                            <div class="sy-div-divideYear">
                                <span>学年：</span>
                                <el-select size="small" @change="yearChange" v-model="yearValue" placeholder="请选择" style="width:140px;">
                                    <el-option v-for="item in yearOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="sy-div-divideTerm">
                                <span>学期：</span>
                                <el-select size="small" v-model="termValue" @change="termChange" placeholder="请选择" style="width:140px;">
                                    <el-option v-for="item in termOptions" :key="item.schoolTerm" :label="item.name" :value="item.schoolTerm">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="sy-down">
                            <div class="sy-div-radioClass">
                                <span>班级名称：</span>
                                <el-radio-group v-model="radio" @change="handleRadio">
                                    <el-radio v-for="item in radioOptions" :key="item.id" :label="item.id">{{item.name.slice(0, -1)}}<span style="opacity: 0" v-if="item.name.slice(0, -1).length == 1">0</span>{{item.name.slice(-1)}}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="sy-div-transBox" v-show="showTransfer">
                                <el-transfer ref="transfer" id="transfer" @change="handleTrans" :filter-method="filterMethod" :titles="['未分班学生', '已分班学生']" v-model="transValue" :data="transData">
                                    <span slot="left-footer" style="padding-left:5px">未分班学生</span>
                                    <el-input class="sy-transfer-footer" ref="inpKeyOne" icon="search" slot="left-footer" v-model.trim="keyWordOne" @keyup.enter.native="leftSearch" size="small" placeholder="请输入关键字" :on-icon-click="leftSearch">操作</el-input>
                                    <span slot="right-footer" style="padding-left:5px">已分班学生</span>
                                    <el-input class="sy-transfer-footer" icon="search" v-model.trim="keyWordTwo" slot="right-footer" @keyup.enter.native="rightSearch" size="small" placeholder="请输入关键字" :on-icon-click="rightSearch">操作</el-input>
                                </el-transfer>
                            </div>
                        </div>
                    </div>
                </sy-grad-4>
            </el-tab-pane>
            <el-tab-pane label="批量分班" name="page_base_sPlacement_batchClass" v-if="codeList['page_base_sPlacement_batchClass']">
                <sy-grad-4 >
                    <div slot="headerLeft">
                        <span>单位</span>
                    </div>
                    <div slot="headerRight" class="line-height-56">
                        <span>批量分班</span>
                    </div>
                    <div slot="bodyLeft">
                        <div class="sy-up">
                            <el-input size="small" placeholder="请输入关键字" icon="search" v-model.trim="schoolData1" @keyup.enter.native="handleSearch1" :on-icon-click="handleIconClick">
                            </el-input>
                        </div>
                        <div class="sy-down">
                            <el-tree :empty-text="emptyTextTwo" highlight-current ref="schoolTree1" :data="classData" :props="defaultProps" node-key="id" :current-node-key="defaultKey" :default-expanded-keys="defaultKeys" @node-click="handleNodeClickTwo" style="border:none" :filter-node-method="searchSchool">
                            </el-tree>
                        </div>
                    </div>
                    <div slot="bodyRight">
                        <div class="sy-up">
                            <div class="sy-div-divideYear">
                                <span>学年：</span>
                                <el-select size="small" v-model="yearValueTwo" placeholder="请选择" @change="selYear" style="width:140px;">
                                    <el-option v-for="item in yearOptionsTwo" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="sy-div-divideTerm">
                                <span>学期：</span>
                                <el-select size="small" v-model="termValueTwo" placeholder="请选择" style="width:140px;" @change="termTwoChange">
                                    <el-option v-for="item in termOptionsTwo" :key="item.schoolTerm" :label="item.name" :value="item.schoolTerm">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="sy-down">
                            <el-button size="small" v-if="downLoadBtn" class="sy-btn-divideDowload" @click="downloadTemp">下载批量导入模板</el-button>
                            <div class="sy-div-divideImport sy-import" v-if="uploadVis">
                                <span class="span-divide-title">导入文件：</span>
                                <el-upload style="position: relative" ref="upload" :multiple="mul" :show-file-list="state" :action="baseUrl" :data="uploadParam" :before-upload="beforeUpload" :on-change="showFileName" :on-success="uploadSuccess" :on-error="uploadErr" :auto-upload="false">
                                    <div slot="trigger" class="sy-import-file-name el-input__inner">
                                        <div class="sy-import-file-name-div">{{fileName}}</div>
                                        <span class="fa fa-folder-o"></span>
                                    </div>
                                    <el-button class="sy-import-button" :loading="loading" size="small" @click="submitUpload">导入</el-button>
                                </el-upload>
                            </div>
                            <div class="div-divide-log" v-if="logVis">
                                <span class="span-divide-title">导入日志：</span>
                                <div class="sy-div-showLog" v-for="(item, index) in log" :key="index">
                                    <span :class="'fa' + item.type"></span>
                                    <span v-if="!item.success" style="color:#ff4949">{{item.msg}}</span>
                                    <span v-else style="color:#13CE66">{{item.msg}}</span>
                                </div>
                            </div>
                            <div class="sy-div-divideWarn">
                                <span class="span-divide-title">提示：</span>
                                <span class="sy-span-divideWarnInfo">
                                    <i class="el-icon-warning" style="color:#FBA162"></i>
                                    <span>Excel导入格式如下</span>
                                </span>
                                <el-table :data="tplExcel" border style="width:100%;margin-bottom:20px">
                                    <el-table-column prop="stuId" label="学号"></el-table-column>
                                    <el-table-column prop="stuName" label="姓名"></el-table-column>
                                    <el-table-column prop="gradeName" label="年级名称"></el-table-column>
                                    <el-table-column prop="className" label="班级名称"></el-table-column>
                                </el-table>
                                <span class="sy-span-divideWarnInfo">
                                    <i class="el-icon-warning" style="color:#FBA162"></i>
                                    <span>学号、姓名、年级名称和班级名称都必须填写。</span>
                                </span>
                                <span class="sy-span-divideWarnInfo">
                                    <i class="el-icon-warning" style="color:#FBA162"></i>
                                    <span>年级名称和班级名称都必须和本系统的年级名称、班级名称保持一致</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </sy-grad-4>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>
import _ from 'lodash';
import $ from 'jquery'
import { getUnitTree, ERR_OK } from '../../configInfo/requestApi';
import { getAllYear, getCurrentYear, getTerm } from '../../base/year/request'
import { getClass, getClassStu, getNoClassStu, delClassStu, addClassStu } from './request'
import { getRcCodeList } from '../../request'
import config from './config.js';
import pager from '../../config.js';

export default {
    name: '',
    components: {

    },
    data() {
        return {
            impLoading: false,
            emptyTextOne: '正在加载中...',
            emptyTextTwo: '正在加载中...',
            loadingDivide: false,
            checkedNum: 0,
            keyWordTwo: '',
            keyWordOne: '',
            showTransfer: false,
            notGrade: true,
            logVis: false,
            loading: false,
            currentYearTwo: '',
            currentYear: '',
            query: '',
            classStu: '',
            noClassStu: '',
            uploadVis: false,
            yearVisTwo: false,
            termVisTwo: false,
            downLoadBtn: false,
            mul: false,
            log: [],
            baseUrl: window.ShiYue.base + `/zuul/api/base/clazz_student_r/import`,
            fileName: '',
            classData: [],
            tplGradeId: '',
            tplClassId: '',
            state: false,
            defaultKey: '',
            activeName: '',
            yearOptions: [],
            yearOptionsTwo: [],
            defaultKeys: [],
            yearValue: '',
            yearValueTwo: '',
            termOptions: [],
            termOptionsTwo: [],
            radioOptions: [],
            tplUnitId: '',
            tplUnitIdTwo: '',
            tplTerm: '',
            tplExcel: [{
                stuId: '01',
                stuName: '王小虎',
                gradeName: '高一',
                className: '1班'
            }, {
                stuId: '02',
                stuName: '王小鸭',
                gradeName: '高一',
                className: '2班'
            }, {
                stuId: '03',
                stuName: '王小鱼',
                gradeName: '高一',
                className: '3班'
            }],
            termValue: '',
            termValueTwo: '',
            schoolData: '',
            schoolData1: '',
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            radio: '',
            transData: [],
            transValue: [],
            uploadParam: {},
            codeList: {
                page_base_sPlacement_administration: false,
                page_base_sPlacement_batchClass: false
            }
        }
    },
    beforeCreate() {

    },
    created() {
        getRcCodeList('category_base_sPlacement', this.codeList).then(() => {
            this.activeName = this.codeList['page_base_sPlacement_administration'] ? 'page_base_sPlacement_administration' : this.codeList['page_base_sPlacement_batchClass'] ? 'page_base_sPlacement_batchClass' : '';
            this._init()
        })
        this.$parent.$emit('currentPage', '/base/studentClass');
    },
    mounted() {

    },
    methods: {
        leftSearch(e) {
            let _keyword = e.target.parentNode.querySelector('input').value;
            this.$refs.transfer.$children[0].query = _keyword;
        },

        rightSearch(e) {
            this.checkedNum = 0
            var _keyword = e.target.parentNode.querySelector('input').value;
            this.$refs.transfer.$children[3].query = _keyword;
        },

        filterMethod(query, item) {
            if (!query) return true;
            query = query.replace(/(^\s+)|(\s+$)/g, "");
            return item.label.indexOf(query) !== -1;
            return item.label.indexOf(query) > -1;
        },

        //  图标搜索
        handleIconClick() {
            this.$refs.schoolTree.filter(this.schoolData);
        },

        handleIconClick1() {
            this.$refs.schoolTree1.filter(this.schoolData1);
        },

        //  enter搜索
        handleSearch() {
            this.$refs.schoolTree.filter(this.schoolData);
        },

        handleSearch1() {
            this.$refs.schoolTree1.filter(this.schoolData1);
        },

        //  手动切换学生分班
        handleTrans(cur, dirc, keys) {
            if (dirc === 'left') {
                if (this.tplClassId !== '' && keys !== [] && this.yearValue !== '' && this.tplUnitId !== '' && this.termValue !== '') {
                    this.loadingDivide = true
                    this._delClassStu({
                        classId: this.tplClassId,
                        studentIds: keys.join(','),
                        yearValue: this.yearValue,
                        termValue: this.termValue,
                        unitId: this.tplUnitId
                    })
                }
            }
            if (dirc === 'right') {
                if (this.tplClassId !== '' && keys !== [] && this.yearValue !== '' && this.tplUnitId !== '' && this.termValue !== '') {
                    this.loadingDivide = true
                    this._addClassStu({
                        classId: this.tplClassId,
                        studentIds: keys.join(','),
                        yearValue: this.yearValue,
                        termValue: this.termValue,
                        unitId: this.tplUnitId
                    })
                }
            }
        },

        //  tab切换
        tabClick(val) {
            this.emptyTextOne = '正在加载中...'
            this.emptyTextTwo = '正在加载中...'
            this._init()
        },

        //  单位树过滤
        searchSchool(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },

        //  上传提交
        submitUpload() {
            if (this.fileName === '') {
                this.$notify({
                    title: '提示',
                    message: '请选择文件后导入！',
                    type: 'warning'
                })
            } else {
                this.$refs.upload.submit();
            }

        },

        //  成功提交
        uploadSuccess(response) {
            setTimeout(() => {
                this.fileName = '';
            }, 100);
            if (response.code !== 'ok') {
                this.$notify({
                    title: '失败',
                    message: response.message,
                    type: 'error'
                });
                this.loading = false;
                return;
            }
            let arr = [];
            let check = 0
            if (response && response.data) {
                response.data.forEach((val, index) => {
                    if (val.status == 'failure') {
                        arr.push({
                            msg: val.message,
                            success: false
                        })
                    } else {
                        arr.push({
                            msg: val.message,
                            success: true
                        })
                        check += 1
                    }
                })
                if (check == 0) {
                    this.$notify({
                        title: '失败',
                        message: '导入失败！',
                        type: 'error'
                    });
                }
                if (check > 0 && check < response.data.length) {
                    this.$notify({
                        title: '警告',
                        message: '导入数据部分有误！',
                        type: 'warning'
                    });
                }
                if (check == response.data.length) {
                    this.$notify({
                        title: '成功',
                        message: '导入成功！',
                        type: 'success'
                    });
                }

            } else {
                arr = []
            }
            this.log = arr;
            this.logVis = true
            this.loading = false;
        },

        //  提交失败
        uploadErr(err) {
            console.log(err.data)
            setTimeout(() => {
                this.fileName = '';
            }, 100);
            this.$notify({
                title: '失败',
                message: '操作失败！',
                type: 'error'
            })
            this.loading = false
        },

        //  显示上传文件
        showFileName(file, fileList) {
            this.fileName = file.name;
            if (fileList.length <= 1) {
                return
            }
            fileList.splice(0, fileList.length - 1)
        },

        //  上传前检验
        beforeUpload(file) {
            const isXls = file.type === 'application/vnd.ms-excel'
            const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            if (isXls || isXlsx) {
                this.loading = true
                return true
            } else {
                this.$notify({
                    title: '提示',
                    message: '只能导入xls或xlsx格式',
                    type: 'error'
                })
                return false
            }
        },

        //  左侧树点击
        handleNodeClick(data) {
            if (data.type === 'grade') {
                this.notGrade = true
                this.showTransfer = false
                this.yearValue = ''
                this.yearOptions = []
                this.termOptions = []
                this.termValue = ''
                this.radioOptions = []
                this.radio = ''
                this.transValue = []
                this.transData = []
                this.tplGradeId = data.id
                this.tplUnitId = data.parentId
                if (this.tplUnitId) {
                    this._getAllYear({
                        unitId: this.tplUnitId
                    })
                }
            } else {
                this.notGrade = false
            }
        },

        //  批量操作树点击
        handleNodeClickTwo(data) {
            if (data.type === 'grade') {
                this.fileName = ''
                this.downLoadBtn = false
                this.uploadVis = false
                this.logVis = false
                this.yearOptionsTwo = []
                this.yearValueTwo = ''
                this.termOptionsTwo = []
                this.termValueTwo = ''
                this.tplUnitIdTwo = data.parentId
                if (this.tplUnitIdTwo !== '') {
                    this._getAllYear({
                        unitId: this.tplUnitIdTwo
                    })
                }
            }
        },

        //  年度值变化函数
        yearChange(val) {
            this.showTransfer = false
            if (this.yearValue !== '' && this.tplUnitId !== '') {
                this._getTerm({
                    unitId: this.tplUnitId,
                    year: val
                })
            }
        },

        //  学期值变化函数
        termChange(val) {
            this.showTransfer = false
            if (this.termValue !== '' && this.tplGradeId !== '' && this.yearValue !== '') {
                this._getClass({
                    gradeId: this.tplGradeId,
                    year: this.yearValue,
                    schoolTerm: val
                })
            }
        },

        //  批量分班年度变化
        selYear(val) {
            this.downLoadBtn = false
            this.uploadVis = false
            this.logVis = false
            if (this.yearValueTwo !== '' && this.tplUnitIdTwo !== '') {
                this._getTermTwo({
                    unitId: this.tplUnitIdTwo,
                    year: val
                })
            }
        },

        //  批量分班学期变化
        termTwoChange(val) {
            //        if (val !== this.termValueTwo) {
            //          this.downLoadBtn = false
            //          this.uploadVis = false
            //        }
        },

        //  班级值变化函数
        handleRadio(val) {
            this.showTransfer = false
            this.tplClassId = val
            if (this.radio !== '' && this.tplUnitId !== '' && this.yearValue !== '' && this.termValue !== '') {
                this._getClassStu({
                    unitId: this.tplUnitId,
                    clazz: val,
                    year: this.yearValue,
                    term: this.termValue,
                })
            }
        },

        //  下载
        downloadTemp() {
            let url = `/api/base/student/download/class/template`
            let param = {
                unitId: this.tplUnitIdTwo,
                year: this.yearValueTwo,
                term: this.termValueTwo
            }
            this.$downloade(url, 'POST', param)
        },

        //  获取所有年度
        _getAllYear(param) {
            getAllYear(param).then((res) => {
                if (res.code === ERR_OK) {
                    res.data.forEach((val, index) => {
                        if (this.$refs.elTabs.currentName === 'page_base_sPlacement_administration') {
                            this.yearOptions.push({
                                value: val.year,
                                label: val.year,
                                current: val.current
                            })
                            if (val.current) {
                                this.yearValue = val.year
                                this.currentYear = val.year.slice(0, 4)
                            }
                        } else {
                            this.yearOptionsTwo.push({
                                value: val.year,
                                label: val.year,
                                current: val.current
                            })
                            if (val.current) {
                                this.yearValueTwo = val.year
                                this.currentYearTwo = val.year.slice(0, 4)
                            }
                        }
                    })
                }
            })
        },

        //  获取学期
        _getTerm(param) {
            this.termValue = ''
            this.termOptions = []
            getTerm(param).then((res) => {
                if (res.code === ERR_OK) {
                    res.data.forEach((val, index) => {
                        if (val.schoolTerm === '1') {
                            this.termOptions.unshift(val)
                        } else {
                            this.termOptions.push(val)
                        }
                    })
                    let selEndYear = param.year.slice(-4)
                    if (selEndYear <= this.currentYear) {
                        this.termValue = '1'
                    } else {
                        for (let i = 0; i < this.termOptions.length; i++) {
                            if (this.termOptions[i].current) {
                                this.termValue = this.termOptions[i].schoolTerm
                            }
                        }
                    }
                }
            })
        },

        //  批量分班获取学期
        _getTermTwo(param) {
            this.termOptionsTwo = []
            this.termValueTwo = ''
            getTerm(param).then((res) => {
                if (res.code === ERR_OK) {
                    if (res.data.length === 0) {
                        this.$notify({
                            title: '提示',
                            message: '学期数据为空！',
                            type: 'info'
                        })
                    } else {
                        res.data.forEach((val, index) => {
                            if (val.schoolTerm === '1') {
                                this.termOptionsTwo.unshift(val)
                            } else {
                                this.termOptionsTwo.push(val)
                            }
                        })
                        let selEndYear = param.year.slice(-4)
                        if (selEndYear <= this.currentYearTwo) {
                            this.termValueTwo = '1'
                        } else {
                            for (let i = 0; i < this.termOptionsTwo.length; i++) {
                                if (this.termOptionsTwo[i].current) {
                                    this.termValueTwo = this.termOptionsTwo[i].schoolTerm
                                }
                            }
                        }
                        this.downLoadBtn = true
                        this.uploadVis = true
                        this.uploadParam = {
                            yearValue: this.yearValueTwo,
                            termValue: this.termValueTwo,
                            unitId: this.tplUnitIdTwo
                        }
                    }
                }
            })
        },

        //  获取班级
        _getClass(param) {
            this.radioOptions = []
            this.radio = ''
            getClass(param).then((res) => {
                if (res.code === ERR_OK) {
                    if (res.data.length !== 0) {
                        this.showTransfer = true
                        res.data.forEach((val, index) => {
                            this.radioOptions.push(val)
                        })
                        if (this.radioOptions.length !== 0) {
                            this.radio = this.radioOptions[0].id
                        }
                    }
                }
            })
        },

        //  获取分班学生
        _getClassStu(param) {
            this.transValue = []
            this.transData = []
            let trans = []
            getClassStu(param).then((res) => {
                if (res.code === ERR_OK) {
                    res.data.forEach((val, index) => {
                        this.transValue.push(val.id)
                        trans.push({
                            key: val.id,
                            label: val.realName + '(' + val.loginName + ')',
                        })
                    })
                    getNoClassStu({
                        unitId: this.tplUnitId,
                        year: this.yearValue,
                        term: this.termValue
                    }).then((res1) => {
                        if (res1.code === ERR_OK) {
                            res1.data.forEach((val, index) => {
                                this.transData.push({
                                    key: val.id,
                                    label: val.realName + '(' + val.loginName + ')'
                                })
                            })
                            trans.forEach((val, index) => {
                                this.transData.push(val)
                            })
                            this.showTransfer = true
                        }
                    })
                    this.loadingDivide = false
                } else {
                    this.loadingDivide = false
                }
            })
        },

        //  删除分班学生
        _delClassStu(param) {
            delClassStu(param).then((res) => {
                if (res.code === ERR_OK) {
                    this.$notify({
                        titie: '成功',
                        type: 'success',
                        message: '分班成功！'
                    });
                    this.loadingDivide = false
                } else {
                    this.$notify({
                        title: '失败',
                        type: 'error',
                        message: '分班失败！'
                    })
                    this._getClassStu({
                        unitId: this.tplUnitId,
                        clazz: this.tplClassId,
                        year: this.yearValue,
                        term: this.termValue,
                    })
                }
            })
        },

        //  增加分班学学生
        _addClassStu(param) {
            addClassStu(param).then((res) => {
                if (res.code === ERR_OK) {
                    this.$notify({
                        title: '成功',
                        type: 'success',
                        message: '分班成功！'
                    })
                    this.loadingDivide = false
                } else {
                    this.$notify({
                        title: '失败',
                        type: 'error',
                        message: '分班失败！'
                    })
                    this._getClassStu({
                        unitId: this.tplUnitId,
                        clazz: this.tplClassId,
                        year: this.yearValue,
                        term: this.termValue,
                    })
                }
            })
        },

        //  初始化
        _init() {
            this.yearValue = ''
            this.yearValueTwo = ''
            this.yearOptionsTwo = []
            this.yearOptions = []
            getUnitTree().then((res) => {
                if (res.code === ERR_OK) {
                    if (res.data.length === 0) {
                        this.emptyTextOne = '暂无数据'
                        this.emptyTextTwo = '暂无数据'
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].type === 'grade') {
                            this.defaultKeys.push(res.data[i].parentId)
                            this.tplUnitId = res.data[i].parentId
                            this.tplUnitIdTwo = res.data[i].parentId
                            this.tplGradeId = res.data[i].id
                            this.defaultKey = res.data[i].id
                            break
                        }
                    }
                    this.classData = this.$data2tree(res.data, 'domId', 'domPid')
                    getAllYear({
                        unitId: this.tplUnitId
                    }).then((res) => {
                        if (res.code === ERR_OK) {
                            res.data.forEach((val, index) => {
                                this.yearOptions.push({
                                    value: val.year,
                                    label: val.year,
                                    current: val.current
                                })
                                this.yearOptionsTwo.push({
                                    value: val.year,
                                    label: val.year,
                                    current: val.current
                                })
                                if (val.current) {
                                    this.yearValue = val.year
                                    this.currentYear = val.year.slice(0, 4)
                                    this.yearValueTwo = val.year
                                    this.currentYearTwo = val.year.slice(0, 4)
                                }
                            })
                        }
                    })
                }
            })
        },

    }
}
</script>

<style scoped>
.sy-tabs-divide {
    height: 100%;
}

.sy-div-divideYear,
.sy-div-divideTerm {
    float: left;
}

.sy-div-divideTerm {
    padding-left: 10px;
}

.sy-div-radioClass {
    line-height: 40px;
}

.sy-div-transBox {
    height: 94%;
    padding-top: 20px;
    position: relative;
    z-index: 0;
}

.sy-btn-divideDowload {
    position: absolute;
    right: 10px;
    overflow: hidden;
}

.sy-div-divideWarn {
    margin-top: 10px;
    padding-top: 40px;
}

.sy-div-divideWarn .sy-span-divideWarnInfo {
    display: block;
    margin-bottom: 20px;
    font-size: 14px;
}

.sy-div-divideWarn .sy-span-divideWarnInfo span {
    padding-left: 8px;
}

.sy-div-divideImport {
    margin-top: 20px;
}

.sy-i-fileSel {
    font-size: 16px;
    color: #F6B78B;
    padding: 0px 5px;
    line-height: 28px;
    background: #EEEEEE;
    position: absolute;
    top: -29px;
    left: 172px
}

.div-divide-log {
    margin-top: 20px;
}

.span-divide-title {
    display: block;
    padding: 10px 0;
    font-size: 15px;
    font-weight: 700;
}

.sy-div-showLog {
    max-height: 132px;
    overflow: auto;
}

.sy-transfer-footer {
    position: absolute;
    top: 2px;
    right: 10px;
    width: 40%;
}

.chan {
    background: red;
}
</style>
