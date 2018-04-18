<template>
    <div class="sy-app-container kb">
        <sy-grad-4 :border='false'>
            <div slot="headerRight" style="line-height: 40px">
                <el-select v-model="yearValue" placeholder="请选择学年" style="margin-right:10px" @change="yearChange">
                    <el-option
                            v-for="item in yearOptions"
                            :key="item.value"
                            :label="item.value"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="termValue" placeholder="请选择学期" style="margin-right:10px" @change="termChange">
                    <el-option v-for="item in termOptions"
                               :key="item.schoolTerm"
                               :label="item.name"
                               :value="item.schoolTerm">
                    </el-option>
                </el-select>
                <el-date-picker
                        @change="termChange"
                        v-model="dateValue"
                        type="date"
                        :clearable="false"
                        placeholder="请选择日期">
                </el-date-picker>
                <el-input v-if="!type"
                          v-model="keyValue"
                          placeholder="请输入教师"
                          icon="search"
                          :on-icon-click="handleSearch"
                          :maxlength="50"
                          style="width:140px; margin-left:10px"></el-input>
                <el-button style="float:right;margin: 5px 0 0 10px" @click="handlePrint()" v-if="type?codeList.btn_pk_kb_clazzday_print:codeList.btn_pk_kb_teacherday_print">打印</el-button>
                <el-button style="float:right;margin-top: 5px" v-download="{table:true}" v-if="type?codeList.btn_pk_kb_clazzday_download:codeList.btn_pk_kb_teacherday_download">下载</el-button>
            </div>
            <div slot="bodyRight">
                <sy-grad-4 :border='false'>
                    <div slot="headerLeft">
                        <div class="sy-pk-title sy-theme-lightGray-background">
                            <span>{{type ? '年级-班级' : '教师'}}</span>
                        </div>
                    </div>
                    <div slot="bodyLeft" style="overflow: inherit">
                        <div :style="{height:(type?35:70)+'px'}" style="position: absolute; width: 100%">
                            <el-select v-model="gradeValue" placeholder="请选择年级" @change="gradeChange"
                                       style="position:absolute; top:5px; left:10px; right:10px">
                                <el-option
                                        v-for="item in gradeOptions"
                                        :key="item.gradeId"
                                        :label="item.gradeName"
                                        :value="item.gradeId">
                                </el-option>
                            </el-select>
                            <el-select v-if="!type" v-model="courseValue" placeholder="请选择课程" @change="courseChange"
                                       style="position:absolute; top:40px; left:10px; right:10px">
                                <el-option v-for="item in courseOptions"
                                           :key="item.courseId"
                                           :label="item.courseName"
                                           :value="item.courseId">
                                </el-option>
                            </el-select>
                        </div>
                        <div style="position:absolute; bottom: 10px;  left:10px; right:10px; background-color: #fff"
                             :style="{top:(type?40:75)+'px'}">
                            <el-checkbox-group v-model="leftValue" @change="getTable(type?0:1)"
                                               style="position:absolute; top:-5px; width:100%; bottom:0; overflow: auto">
                                <p v-for="item in leftOptions" style="margin:8px 0 8px 5px;">
                                    <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
                                </p>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <div slot="headerRight">
                        <div class="sy-pk-title sy-theme-lightGray-background">
                            <span>课表</span>
                            <div style="display: inline-block; float: right;">
                                <el-checkbox-group v-model="rightValue" style="display:inline-block;">
                                    <el-checkbox :label="type?'教师':'班级'"></el-checkbox>
                                    <el-checkbox label="场地"></el-checkbox>
                                </el-checkbox-group>
                                <el-switch
                                        style="margin:0 8px"
                                        v-model="nameValue"
                                        on-text="全称"
                                        off-text="简称"
                                        on-color="#20A0FF"
                                        off-color="#20A0FF">
                                </el-switch>
                                <el-switch
                                        v-model="typeValue"
                                        on-text="横向"
                                        off-text="纵向"
                                        on-color="#20A0FF"
                                        off-color="#20A0FF">
                                </el-switch>
                            </div>
                        </div>
                    </div>
                    <div slot="bodyRight" style="padding:0 10px">
                        <div style="position: absolute; top:-5px; left:10px; right: 10px; z-index: 2" :style="{right:(scrollW>10?scrollW:10)+'px'}">
                            <table v-if="typeValue && tableData.length>0" style="border-collapse: collapse;
                                    text-align: center;
                                    width: 100%;
                                    box-sizing: border-box;
                                    table-layout: fixed;
                                    line-height: 36px;
                                    border-top: 1px solid #dfe6ec;
                                    border-left: 1px solid #dfe6ec;
                                    border-right: 1px solid #dfe6ec;
                                    margin-top:10px;">
                                <thead style="background-color: #eef1f6;">
                                    <tr>
                                        <th rowspan="2" style="white-space: nowrap;
                                                        width:120px;
                                                        overflow: hidden;
                                                        background-color: rgb(238, 239, 246);
                                                        text-align: center;
                                                        border-right: 1px solid #dfe6ec;">
                                            <div style="border-bottom: 76px solid rgb(230, 231, 238);
                                                        border-right: 120px solid rgb(238, 239, 246);
                                                        height:77px; width:120px">
                                                <span style="display: inline; float: left; margin: 35px 0 0 5px; height:0;">
                                                    <span v-show="type">班级</span><span v-show="type" style="color:blue">(教室)</span>
                                                    <span v-show="!type">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;教师</span>
                                                </span>
                                                <span style="display: inline; height:0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;节次</span>
                                            </div>
                                        </th>
                                        <th :colspan="tableList.length" style="white-space: nowrap;
                                                        overflow: hidden;
                                                        background-color: rgb(238, 239, 246);
                                                        text-align: center;
                                                        border-right: 1px solid #dfe6ec;
                                                        border-bottom: 1px solid #dfe6ec;">
                                            {{dateValue.getFullYear() + '年' + (dateValue.getMonth() + 1) + '月' + dateValue.getDate() + '日  ' + weekList[dateValue.getDay()]}}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th v-for="item in tableList" :key="item.id" style="white-space: nowrap;
                                                        overflow: hidden;
                                                        background-color: rgb(238, 239, 246);
                                                        text-align: center;
                                                        border-right: 1px solid #dfe6ec;">
                                            {{item.name}}
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                            </div>
                            <div v-if="typeValue && tableData.length>0" ref="tabBox1" id="print1" style="position:absolute;
                                    z-index:1;
                                    top:5px;
                                    bottom: 10px;
                                    left:10px;
                                    overflow: auto"
                                :style="{right:hasScroll1?(scrollW>10?0:10-scrollW+'px'):'10px'}">
                            <table style="border-collapse: collapse;
                                    text-align: center;
                                    width: 100%;
                                    box-sizing: border-box;
                                    line-height: 36px;
                                    table-layout: fixed;
                                    border-top: 1px solid #dfe6ec;
                                    border-left: 1px solid #dfe6ec;
                                    border-right: 1px solid #dfe6ec;" ref="tab1"
                                   :data-download-options="JSON.stringify({title:type?'班级日课表':'教师日课表',fileName:type?'班级日课表':'教师日课表'})">
                                <thead style="background-color: #eef1f6;">
                                <tr>
                                    <th rowspan="2" style="white-space: nowrap;
                                                        width:120px;
                                                        overflow: hidden;
                                                        background-color: rgb(238, 239, 246);
                                                        text-align: center;
                                                        border-right: 1px solid #dfe6ec;">
                                        <div style="border-bottom: 76px solid rgb(230, 231, 238);
                                                        border-right: 120px solid rgb(238, 239, 246);
                                                        height:77px; width:120px">
                                                <span style="display: inline; float: left; margin: 35px 0 0 5px; height:0;">
                                                    <span v-show="type">班级</span><span v-show="type" style="color:blue">(教室)</span>
                                                    <span v-show="!type">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;教师</span>
                                                </span>
                                            <span style="display: inline; height:0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;节次</span>
                                        </div>
                                    </th>
                                    <th :colspan="tableList.length" style="white-space: nowrap;
                                                        overflow: hidden;
                                                        background-color: rgb(238, 239, 246);
                                                        text-align: center;
                                                        border-right: 1px solid #dfe6ec;
                                                        border-bottom: 1px solid #dfe6ec;">
                                        {{dateValue.getFullYear() + '年' + (dateValue.getMonth() + 1) + '月' + dateValue.getDate() + '日  ' + weekList[dateValue.getDay()]}}
                                    </th>
                                </tr>
                                <tr>
                                    <th v-for="item in tableList" :key="item.id" style="white-space: nowrap;
                                                        overflow: hidden;
                                                        background-color: rgb(238, 239, 246);
                                                        text-align: center;
                                                        border-right: 1px solid #dfe6ec;">
                                        {{item.name}}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in tableData" :key="item.id"
                                    style="text-align: center;
                                            background-color: #fff;
                                            border-bottom: 1px solid #dfe6ec;
                                            min-height: 46px;">
                                    <td style="border-right: 1px solid #dfe6ec; padding:5px; width: 123px; box-sizing: border-box">
                                        <div v-if="type" style="min-height: 45px">
                                            <li>{{item.classShortName ? item.classShortName : item.className}}</li>
                                            <li v-if="item.roomName != null" style="color:blue">{{"("+item.roomName+")"}}</li>
                                        </div>
                                        <div v-else style="min-height: 45px">
                                            <li>{{item.teacherName}}</li>
                                        </div>
                                    </td>
                                    <td v-for="_item in item.courseSheets" style="border-right: 1px solid #dfe6ec;padding:5px 0; padding:5px">
                                        <li>
                                            <span v-if="nameValue">{{_item.courseName}}</span>
                                            <span v-else>{{_item.courseShortName}}</span>
                                        </li>
                                        <li v-if="rightValue.indexOf(type?'教师':'班级') != -1">{{_item.teacherNames}}</li>
                                        <li v-if="(rightValue.indexOf('场地') != -1) && (_item.roomNames)" style="color:blue">{{"("+_item.roomNames+")"}}</li>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                            <div style="position:absolute; z-index: 2; left:10px; top:-5px" :style="{right:(scrollW>10?scrollW:10)+'px'}">
                            <table v-if="(!typeValue) && tableData.length>0" style="border-collapse: collapse;
                                    text-align: center;
                                    width: 100%;
                                    box-sizing: border-box;
                                    table-layout: fixed;
                                    line-height: 36px;
                                    border-top: 1px solid #dfe6ec;
                                    border-left: 1px solid #dfe6ec;
                                    border-right: 1px solid #dfe6ec;
                                    margin-top:10px;">
                                <thead style="background-color: #eef1f6;">
                                <tr>
                                    <th colspan="2" style="white-space: nowrap;
                                                        width:140px;
                                                        overflow: hidden;
                                                        background-color: rgb(238, 239, 246);
                                                        text-align: center;
                                                        border-right: 1px solid #dfe6ec;">
                                        <div style="border-bottom: 77px solid rgb(230, 231, 238);
                                                        border-right: 140px solid rgb(238, 239, 246);
                                                        height:77px; width:140px">
                                            <span style="display: inline; float: left; margin: 35px 0 0 5px; height:0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;节次</span>
                                            <span v-show="type" style="display: inline; height:0;"><span>&nbsp;&nbsp;&nbsp;&nbsp;班级</span><span style="color:blue">(教室)</span></span>
                                            <span v-show="!type">教师</span>
                                        </div>
                                    </th>
                                    <th  v-for="item in tableData" :key="item.classShortName" style="white-space: nowrap;
                                                        overflow: hidden;
                                                        background-color: rgb(238, 239, 246);
                                                        text-align: center;
                                                        border-right: 1px solid #dfe6ec;">
                                        <li v-if="type" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" :title="item.classShortName ? item.classShortName : item.className">{{item.classShortName ? item.classShortName : item.className}}</li>
                                        <li v-if="type && item.roomName != null" style="color:blue;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" :title="item.roomName">{{"("+item.roomName+")"}}</li>
                                        <li v-if="!type">{{item.teacherName}}</li>
                                    </th>
                                </tr>
                                </thead>
                            </table>
                            </div>
                            <div v-if="(!typeValue) && tableData.length>0"
                                 id="print2"
                                 ref="tabBox2"
                                 style="position:absolute;
                                    z-index:1;
                                    top:5px;
                                    bottom: 10px;
                                    left:10px;
                                    right:10px;
                                    overflow: auto;"
                                 :style="{right:hasScroll2?(scrollW>10?0:10-scrollW+'px'):'10px'}">
                            <table style="border-collapse: collapse;
                                    text-align: center;
                                    width: 100%;
                                    box-sizing: border-box;
                                    line-height: 36px;
                                    table-layout: fixed;
                                    border-top: 1px solid #dfe6ec;
                                    border-left: 1px solid #dfe6ec;
                                    border-right: 1px solid #dfe6ec;" ref="tab2"
                                   :data-download-options="JSON.stringify({title:type?'班级日课表':'教师日课表',fileName:type?'班级日课表':'教师日课表'})">
                                <thead style="background-color: #eef1f6;">
                                <tr>
                                    <th colspan="2" style="white-space: nowrap;
                                                        width:140px;
                                                        overflow: hidden;
                                                        background-color: rgb(238, 239, 246);
                                                        text-align: center;
                                                        border-right: 1px solid #dfe6ec;">
                                        <div style="border-bottom: 77px solid rgb(230, 231, 238);
                                                        border-right: 140px solid rgb(238, 239, 246);
                                                        height:77px; width:140px">
                                            <span style="display: inline; float: left; margin: 35px 0 0 5px; height:0;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;节次</span>
                                            <span v-show="type" style="display: inline; height:0;"><span>&nbsp;&nbsp;&nbsp;&nbsp;班级</span><span style="color:blue">(教室)</span></span>
                                            <span v-show="!type">教师</span>
                                        </div>
                                    </th>
                                    <th  v-for="item in tableData" :key="item.classShortName" style="white-space: nowrap;
                                                        overflow: hidden;
                                                        background-color: rgb(238, 239, 246);
                                                        text-align: center;
                                                        border-right: 1px solid #dfe6ec;">
                                        <li v-if="type">{{item.classShortName ? item.classShortName : item.className}}</li>
                                        <li v-if="type && item.roomName != null" style="color:blue">{{"("+item.roomName+")"}}</li>
                                        <li v-if="!type">{{item.teacherName}}</li>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,idx) in tableList" :key="item.id"
                                    style="text-align: center;
                                                background-color: #fff;
                                                border-bottom: 1px solid #dfe6ec;
                                                min-height: 46px;">
                                    <td style="border-right: 1px solid #dfe6ec; padding:5px; width: 62px; box-sizing: border-box" :rowspan="tableList.length" v-if="idx==0">
                                        <li>{{dateValue.getFullYear() + '年'}}</li>
                                        <li>{{(dateValue.getMonth() + 1) + '月' + dateValue.getDate() + '日  '}}</li>
                                        <li>{{weekList[dateValue.getDay()]}}</li>
                                    </td>
                                    <td style="border-right: 1px solid #dfe6ec; padding:5px; width: 81px; box-sizing: border-box">
                                        {{item.name}}
                                    </td>
                                    <td v-for="_item in tableData" style="border-right: 1px solid #dfe6ec;padding:5px 0; padding:5px">
                                        <!--<li>{{_item.courseSheets[idx]}}</li>-->
                                        <li>
                                            <span v-if="nameValue">{{_item.courseSheets[idx].courseName}}</span>
                                            <span v-else>{{_item.courseSheets[idx].courseShortName}}</span>
                                        </li>
                                        <li v-if="rightValue.indexOf(type?'教师':'班级') != -1">{{_item.courseSheets[idx].teacherNames}}</li>
                                        <li v-if="(rightValue.indexOf('场地') != -1) && (_item.courseSheets[idx].roomNames)" style="color:blue">{{"("+_item.courseSheets[idx].roomNames+")"}}</li>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <span v-if="tableData.length < 1" class="sy-empty-text">
                            {{emptyText}}
                        </span>
                    </div>
                </sy-grad-4>
            </div>
        </sy-grad-4>
    </div>
</template>
<script>
    import config from './config.js';
    import {getRcCodeList} from '../../request.js';
    export default {
        name: "day",
        props: {
            type: {  //true为班级，false为教师
                type: Boolean
            }
        },
        data(){
            return {
                scrollW:6,
                unitId:this.$store.state.unitId,
                initing:true,
                emptyText:"正在加载中...",
                yearValue: "",
                yearOptions: [],
                termValue: "",
                termOptions: [],
                dateValue: new Date(),
                keyValue:"",
                gradeVisible:true,
                gradeValue: "",
                gradeOptions: [],
                courseValue: "",
                courseOptions: [],
                leftValue: [],
                leftOptions: [],
                rightValue:[],
                nameValue: true,
                typeValue: true,
                tableList:[],
                tableData:[],
                weekList:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
                hasScroll1:false,
                hasScroll2:false,
                codeList: {
                    'btn_pk_kb_clazzday_see': false,
                    'btn_pk_kb_clazzday_download': false,
                    'btn_pk_kb_clazzday_print': false,
                    'btn_pk_kb_teacherday_see': false,
                    'btn_pk_kb_teacherday_download': false,
                    'btn_pk_kb_teacherday_print': false
                }
            }
        },
        created(){
            if(this.type) {
                this.$parent.$emit('currentPage', '/pk/kb/clazzday');
                getRcCodeList('category_pk_clazz_kb_day', this.codeList).then(() => {
                    this.init()

                })
            } else {
                this.$parent.$emit('currentPage', '/pk/kb/teacherday');
                getRcCodeList('category_pk_teacher_kb_day', this.codeList).then(() => {
                    this.init()

                })
            }
            if(navigator.userAgent.indexOf('Trident') > -1 || (navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1)) {
                this.scrollW = 18
            }
        },
        updated(){
           this.$nextTick(()=>{
               if(this.typeValue) {
                   let _b = this.$refs.tabBox1
                   let _i = this.$refs.tab1
                   if(_b && _i) {
                       this.hasScroll1 = _i.offsetHeight > _b.offsetHeight
                   } else {
                       this.hasScroll1 = false
                   }
               } else {
                   let _b = this.$refs.tabBox2
                   let _i = this.$refs.tab2
                   if(_b && _i) {
                       this.hasScroll2 = _i.offsetHeight > _b.offsetHeight
                   } else {
                       this.hasScroll2 = false
                   }
               }
           })
        },
        methods: {
            init(){
                this.rightValue=[this.type?'教师':'班级','场地']
                config.getYears(this.unitId).then((data) => {
                    if (data && data.status == 200&&data.data.length>0) {
                        data.data.forEach(val => {
                            this.yearOptions.push({
                                value: val.year
                            })
                            if (val.current) {
                                this.yearValue = val.year
                            }
                        })
                    }
                })

                config.getFestival({unitId:this.unitId}).then((data) => {
                    if(data && data.status == 200&&data.data.length>0) {
                        data.data.forEach(val => {
                            this.tableList.push({
                                name:val.name,
                                id:val.id
                            })
                        })
                    }
                })

            },
            yearChange(value) {
                config.getTerms(this.unitId,this.yearValue).then((data) => {
                    if (data && data.status == 200&&data.data.length>0) {
                        this.termOptions = data.data
                        let tV = "";
                        data.data.forEach(val => {
                            if (val.current) {
                                tV = val.schoolTerm
                            }
                        })
                        this.gradeVisible = false;
                        if (!tV) {
                            this.termValue = "1"
                        } else {
                            this.termValue = tV;
                        }
                        setTimeout(()=>{
                            this.gradeVisible = true;
                            this.termChange();
                        },0)
                    }
                })
            },
            termChange(value) {
                if(!this.gradeVisible) return;
                this.gradeValue = [];
                config.getGrades({
                    type: 'open',
                    year:this.yearValue,
                    term:this.termValue,
                    unitId:this.unitId,
                    date:this.$moment(this.dateValue).format("YYYY-MM-DD")
                }).then((data) => {
                    if (data && data.data&&data.data.length>0) {
                        this.gradeOptions = data.data;
                        this.gradeValue = data.data[0].gradeId;
                    } else {
                        this.gradeOptions = []
                        this.gradeValue = ""
                        if(!this.type) {
                            this.courseOptions = []
                            this.courseValue = ""
                        }
                        this.leftOptions = []
                        this.leftValue = []
                        this.tableData = []
                        this.emptyText = "暂无数据"
                    }
                })
            },
            handleSearch(){
                this.keyValue = this.keyValue.trim();
                this.getTable(this.keyValue?2:0)
            },
            gradeChange(value) {
                if((!this.gradeValue) || this.gradeValue.length < 1) return;
                if(this.type) {
                    this.leftValue = [];
                    config.getClazzes({gradeId: this.gradeValue, year:this.yearValue, schoolTerm:this.termValue}).then((data) => {
                        if(data && data.data && data.data.length>0) {
                            let lO = []
                            let lV = []
                            data.data.forEach(val => {
                                lO.push({name: val.name, id:val.id})
                                lV.push(val.id)
                            })
                            this.leftOptions = lO
                            this.leftValue = lV
                            setTimeout(() => {
                                this.getTable()
                            },0)
                        } else {
                            this.leftOptions = []
                            this.leftValue = []
                            this.tableData = []
                            this.emptyText = "暂无数据"
                        }
                        this.initing = false
                    }) 
                } else {
                    this.courseValue = ""
                    config.getCourses({
                        gradeId: this.gradeValue,
                        year:this.yearValue,
                        term:this.termValue,
                        unitId:this.unitId,
                        date:this.$moment(this.dateValue).format("YYYY-MM-DD")
                    }).then((data)=>{
                        if(data && data.data && data.data.length > 0) {
                            this.courseOptions = data.data
                            this.courseValue = data.data[0].courseId
                        } else {
                            this.courseOptions = []
                            this.courseValue = ""
                            this.leftOptions = []
                            this.leftValue = []
                            this.tableData = []
                            this.emptyText = "暂无数据"
                        }
                    })
                }
            },
            courseChange(value) {
                if((!value) || value.length < 1) return;
                this.leftValue = [];
                config.getTeachers({
                    gradeId: this.gradeValue,
                    courseId: this.courseValue,
                    year:this.yearValue,
                    term:this.termValue,
                    unitId:this.unitId,
                    date:this.$moment(this.dateValue).format("YYYY-MM-DD")
                }).then((data)=>{
                    if(data && data.status == 200&&data.data.length>0) {
                        let lO = []
                        let lV = []
                        data.data.forEach(val => {
                            lO.push({name: val.teacherName, id:val.teacherId})
                            lV.push(val.teacherId)
                        })
                        this.leftOptions = lO
                        this.leftValue = lV
                        setTimeout(() => {
                            this.initing = false
                            this.getTable(this.type?0:1)
                        },0)
                    }
                })
            },
            getTable(_f=0){
                if(this.initing) return;

                this.emptyText = "正在加载中..."
                let gData = {
                    flag:this.type,
                    unitId:this.unitId,
                    year:this.yearValue,
                    term:this.termValue,
                    gradeId:this.gradeValue,
                    date:this.$moment(this.dateValue).format("YYYY-MM-DD"),
                };

                if(this.type) {
                    if(this.leftValue.length < 1) {
                        this.tableData = []
                        this.emptyText = "暂无数据"
                        return;
                    }
                    gData.classIds = this.leftValue.join(",")
                } else {
                    if(_f === 2) {
                        gData.keyWord = this.keyValue;
                    } else {
                        if(this.leftValue.length < 1) {
                            this.tableData = []
                            this.emptyText = "暂无数据"
                            return;
                        }
                        gData.teacherIds = this.leftValue.join(",")
                        if(_f === 1) {
                            this.keyValue = "";
                        } else {
                            gData.keyWord = this.keyValue;
                        }
                    }
                }

                config.getTable(gData).then((data) => {
                    this.tableData = []
                    if(data && data && data.data.length > 0) {
                        data.data.forEach((val,idx) => {
                            this.tableData.push({
                                teacherName:val.teacherName,
                                className:val.className,
                                classShortName: val.classShortName,
                                courseSheets:[],
                                roomName:val.roomName?val.roomName.name:"",
                            })
                            for(let i = 0; i < this.tableList.length; i++) {
                                let isEmpty = true;
                                for(let j = 0; j < val.courseSheets.length; j++) {
                                    if(this.tableList[i].id == val.courseSheets[j].festivalId) {
                                        isEmpty = false
                                        let names = []
                                        let pNames = []
                                        if(this.type) {
                                            val.courseSheets[j].roomNames.forEach(v => {
                                                names.push(v.name)
                                            })
                                        } else {
                                            val.courseSheets[j].classNames.forEach(v => {
                                                names.push(v.name)
                                                pNames.push(v.shortName)
                                            })
                                        }

                                        this.tableData[idx].courseSheets.push({
                                            courseName:val.courseSheets[j].courseName,
                                            courseShortName:val.courseSheets[j].courseShortName,
                                            teacherNames:this.type ? val.courseSheets[j].teacherNames : pNames.join(","),
                                            roomNames:names.join(",")
                                        })
                                        break;
                                    }
                                }
                                if(isEmpty) {
                                    this.tableData[idx].courseSheets.push({
                                        teacherName:"",
                                        courseName:"",
                                        courseShortName:"",
                                        teacherNames:"",
                                        roomNames:""
                                    })
                                }
                            }
                        })
                    } else {
                        this.emptyText = "暂无数据"
                    }
                })
            },
            handlePrint(){
                //打印
                this.$print(this.typeValue?'#print1':'#print2')
            }
        }
    }
</script>
<style scoped>
    table li {
        list-style-type:none;
        word-break:break-all;
        line-height: 22px;
    }
</style>