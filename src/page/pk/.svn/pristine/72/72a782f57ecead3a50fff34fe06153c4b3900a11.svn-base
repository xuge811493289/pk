<template>
    <div class="sy-app-container">
        <sy-grad-4>
            <div slot="headerRight" style="padding: 4px 0 0 0;">
                <el-select v-model="parmasList.yearValue" placeholder="请选择学年" style="width: 120px;" @change="handleChangeYear">
                    <el-option
                        v-for="item in yearsOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="parmasList.termValue" placeholder="请选择学期" style="width: 120px;margin: 0 10px;" @change="handleChangeTerm">
                    <el-option
                        v-for="item in termOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <span>日期：</span>
                <el-date-picker
                    v-model="parmasTimeList.startTime"
                    type="date"
                    style="width: 120px;"
                    :clearable="false"
                    @change="handleChangeTime"
                    :picker-options="pickerOptions0"
                    placeholder="选择日期">
                </el-date-picker>
                <span>——</span>
                <el-date-picker
                    v-model="parmasTimeList.endTime"
                    style="width: 120px;"
                    :clearable="false"
                    :picker-options="pickerOptions1"
                    @change="handleChangeTime"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <el-input v-model="parmasList.keywords" placeholder="请输入教师名称" icon="search" :on-icon-click="handleIconClick" style="width: 150px;margin-left:10px;"></el-input>
                <el-button style="float:right;margin-left:10px;" v-if="codeList.btn_pk_place_table_download" v-download="{table:true}">下载</el-button>
                <el-button style="float:right;" v-if="codeList.btn_pk_place_table_print" @click="print">打印</el-button>
            </div>
            <div slot="bodyRight" style="width:100%;height:100%;" >
                <sy-grad-4 :border="false">
                    <div slot="headerRight" style="line-height: 40px;">
                        <p style="font-size:18px;text-align: center;">{{timeLimit}}</p>
                    </div>
                    <div slot="bodyRight" style="width:100%;height:100%;padding: 0 10px 10px;" >
                        <el-table id="myCount" ref="multipleTable" :data="tableData" height="100%" border style="width: 100%;height: 100%;">
                            <el-table-column prop="sort0" label="序号" align="center"></el-table-column>
                            <el-table-column prop="teacherName0" label="姓名" align="center"></el-table-column>
                            <el-table-column prop="courseCount0" label="课时数" align="center"></el-table-column>
                            <el-table-column prop="sort1" label="序号" align="center"></el-table-column>
                            <el-table-column prop="teacherName1" label="姓名" align="center"></el-table-column>
                            <el-table-column prop="courseCount1" label="课时数" align="center"></el-table-column>
                            <el-table-column prop="sort2" label="序号" align="center"></el-table-column>
                            <el-table-column prop="teacherName2" label="姓名" align="center"></el-table-column>
                            <el-table-column prop="courseCount2" label="课时数" align="center"></el-table-column>
                            <el-table-column prop="sort3" label="序号" align="center"></el-table-column>
                            <el-table-column prop="teacherName3" label="姓名" align="center"></el-table-column>
                            <el-table-column prop="courseCount3" label="课时数" align="center"></el-table-column>
                        </el-table>
                    </div>
                </sy-grad-4>
            </div>
        </sy-grad-4>
    </div>
</template>
<script>
    import {
        getYearList,
        getTermList,
        getCourseCount,
        getRcCodeList,
        getYear,
        getTermAllData,
    } from "../../request.js";
    export default {
        data() {
            return {
                pickerOptions0: {},
                pickerOptions1: {},
                yearsOptions: [],
                termOptions: [],
                tableData: [],
                timeLimit: "",
                parmasList: {
                    yearValue: "",
                    termValue: "",
                    keywords: ""
                },
                parmasTimeList: {
                    startTime: "",
                    endTime: ""
                },
                codeList: {
                    btn_pk_place_table_see: false,
                    btn_pk_place_table_download: false,
                    btn_pk_place_table_print: false
                },
                time: {
                    start: '',
                    end: ''
                }
            };
        },
        watch: {
        },
        created() {
            this.$parent.$emit("currentPage", "/pk/kb/stat");
            this.init();
            // getRcCodeList("category_pk_place_table", this.codeList).then(() => {
            //     getYear({
            //         unitId: this.$store.state.unitId
            //     }).then(res => {
            //         if (res && res.status == 200 && res.data && res.data.length > 0) {
            //             this.years = res.data;
            //             this.$nextTick(() => {
            //                 res.data.forEach(_y => {
            //                 if (_y.current) {
            //                     this.year = _y.year;
            //                 }
            //                 });
            //             });
            //         } else {
            //             this.list = [];
            //             this.checkList = [];
            //             this.emptyText = "暂无数据";
            //             this.tableData = [];
            //             this.emptyTextTable = "暂无数据";
            //             this.curTime = new Date();
            //         }
            //     });
            // });
        },
        methods: {
            init() {
                this.getYearList();
            },
            // 学年列表
            getYearList() {
                return new Promise((resolve, reject) => {
                    getYearList({ unitId: this.$store.state.unitId }).then(data => {
                        let arr = [];
                        if (data.data) {
                            data.data.forEach((_s, s) => {
                                arr.push({
                                    label: _s.year,
                                    value: _s.year
                                });
                                if (_s.current) {
                                    this.parmasList.yearValue = _s.year;
                                }
                            });
                        }
                        this.yearsOptions = arr;
                        resolve(data);
                    }).catch(err => {
                        reject(err);
                    });
                });
            },
            // 学期列表
            getTermList() {
                return new Promise((resolve, reject) => {
                    getTermList({
                        unitId: this.$store.state.unitId,
                        year: this.parmasList.yearValue
                    })
                    .then(data => {
                        let arr = [];
                        if (data.data) {
                            data.data.forEach((_s, s) => {
                                arr.push({
                                    label: _s.name,
                                    value: _s.schoolTerm
                                });
                                if (_s.current == 1) {
                                    this.parmasList.termValue = _s.schoolTerm;
                                }
                            });
                        }
                        this.termOptions = arr;
                        resolve(data);
                    })
                    .catch(err => {
                        reject(err);
                    });
                });
            },
            // 查询时间
            getDate(){
                return new Promise((resolve,reject)=>{
                    getTermAllData({
                        unitId: this.$store.state.unitId,
                        year: this.parmasList.yearValue,
                        term: this.parmasList.termValue
                    }).then(res=>{
                        this.time.start = new Date(this.$moment(res.beginDate).format());
                        this.time.end = new Date(this.$moment(res.endDate).format());
                        this.parmasTimeList.startTime = this.time.start;
                        this.parmasTimeList.endTime = this.time.end;
                        this.getList();
                        resolve(res)
                    }).catch(err=>{
                        reject(err)
                    })
                })
            },
            handleChangeTime(val){
                let obj = {...this.parmasList, ...this.parmasTimeList};
                if (obj.yearValue && obj.termValue && obj.startTime && obj.endTime) {
                    this.timeLimit = `${obj.yearValue}学年度${obj.termValue == 1? '第一学期' : '第二学期'} ${this.$moment(obj.startTime).format("MM月DD日")}~${this.$moment(obj.endTime).format("MM月DD日")} 教师课时量统计表`;
                }
                let start = this.time.start.getTime();
                let end = this.time.end.getTime();
                let changeStart = this.parmasTimeList.endTime.getTime();
                let changeEnd = this.parmasTimeList.startTime.getTime();
                this.pickerOptions0 = {
                    disabledDate(time) {
                        return time.getTime() < start || time.getTime() > changeStart;
                    }
                }
                this.pickerOptions1 = {
                    disabledDate(time) {
                        return time.getTime() < changeEnd || time.getTime() > end;
                    }
                }
            },
            handleChangeYear(val) {
                if (val) {
                    this.getTermList().then(data => {
                        this.getDate();
                    });
                } else {
                    this.parmasList.termValue = "";
                    this.termOptions = [];
                }
            },
            handleChangeTerm(val) {
                if (val) {
                    this.getList();
                }
            },
            getList() {
                getCourseCount({
                    unitId: this.$store.state.unitId,
                    year: this.parmasList.yearValue,
                    term: this.parmasList.termValue,
                    keyWord: this.parmasList.keywords || undefined,
                    startDate: this.parmasTimeList.startTime ? this.$moment(this.parmasTimeList.startTime).format('YYYY-MM-DD') : undefined,
                    endDate: this.parmasTimeList.endTime ? this.$moment(this.parmasTimeList.endTime).format('YYYY-MM-DD') : undefined
                }).then(data => {
                    let arr = [];
                    let num = 0;
                    let obj = {};
                    data.forEach((_d,d)=>{
                        if(num <= 3){ 
                            if(d == data.length -1){
                                arr.push(obj)
                            }
                        }else{
                            arr.push(obj)
                            num = 0;
                            obj = {};
                        }
                        obj['sort'+num]= d+1;
                        obj['teacherName'+num]= _d.teacherName;
                        obj['courseCount'+num]= _d.courseCount;
                        num++;
                        
                    })
                    // console.log(arr);
                    this.tableData = arr;
                }).catch(err => {});
            },
            //关键字搜索
            handleIconClick() {
                this.getList();
            },
            //  打印
            print() {
                this.$print("#myCount");
            }
        }
    };
</script>