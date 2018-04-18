<template>
    <div class="app-container-box" v-loading="loading" element-loading-text="正在加载中...">
        <div class="sy-up">
            <el-select v-model="year" placeholder="请选择" @change="yearChange" style="width: 150px;margin-right: 10px;">
                <el-option v-for="item in yearOptions" :key="item.year" :label="item.year" :value="item.year">
                </el-option>
            </el-select>
            <el-select v-model="term" placeholder="请选择" @change="termChange" style="width: 150px;margin-right: 10px;">
                <el-option v-for="item in termOptions" :key="item.schoolTerm" :label="item.name" :value="item.schoolTerm">
                </el-option>
            </el-select>
            <!-- <span>第</span> -->
            <el-select v-model="week" @change="weekChange" style="width: 150px;">
                <el-option v-for="item in weekOptions" :key="item.week" :label="item.weekMessage" :value="item.week">
                </el-option>
            </el-select>
            <!-- <span>周</span> -->
            <el-button @click="print" style="float: right;margin-top: 6px;margin-left: 10px;" v-if="codeList['btn_pk_kb_my_print']">打印</el-button>
            <el-button v-download="{ table:true,refs: $refs, tables: [{id:'myTableBody'}],fileName: '我的课表'}" v-if="codeList['btn_pk_kb_my_download']" style="float: right;margin-top: 6px">下载</el-button>
        </div>
        <div class="sy-down" style="bottom: 10px;">
            <div class="sy-pk-my_tHead" :style="{'position':'absolute', 'width': tableWidth + 'px'}">
                <table ref="myTableHead" style="border-collapse: collapse;
                            text-align: center;
                            width: 100%;
                            box-sizing: border-box;
                            table-layout: fixed;
                            line-height: 36px;
                            border-top: 1px solid #dfe6ec;
                            border-left: 1px solid #dfe6ec;
                            border-right: 1px solid #dfe6ec;">
                    <thead>
                        <tr>
                            <th v-show="showTable" style="width: 120px;white-space: nowrap;;text-overflow: ellipsis;overflow: hidden;box-sizing: border-box;background-color: #eef1f6;height: 60px;border-right: 1px solid #dfe6ec">
                                <div style="width: 120px;height: 1px;background-color: #dfe6ec;transform: skewY(25deg)"></div>
                                <div style="position:absolute; top: 0; left: 88px">星期</div>
                                <div style="position:absolute; bottom: 0; left: 8px">节次</div>
                            </th>
                            <th v-for="item in headerOptions" :key="item.id" :style="{'whiteSpace': 'nowrap', 'textOverflow': 'ellipsis', 'overflow': 'hidden', 'boxSizing': 'border-box', 'paddingLeft': 10+'px', 'paddingRight': 10 + 'px', 'backgroundColor': '#eef1f6', 'minHeight': 36 + 'px', 'borderRightStyle': 'solid', 'borderRightWidth': 1 + 'px', 'borderRightColor': '#dfe6ec'}">{{item.name}}</th>
                            <th :style="{'width': isScorll ? 5 + 'px' : 0,'backgroundColor': '#eef1f6','minHeight': 36 + 'px','borderRightStyle': 'solid', 'borderRightWidth': 1 + 'px', 'borderRightColor': '#dfe6ec'}"></th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="sy-pk-my_tBody" id="myTable" :style="{'overflowY': 'auto','height': tableHeight + 'px', 'borderRightWidth': 1+'px','borderRightStyle': !isScorll ? 'none' : 'solid', 'borderRightColor': '#dfe6ec', 'width': !isScorll ? tableWidth + 'px' : (tableWidth - 1.4) + 'px'}">
                <table ref="myTableBody" class="sy-pk-my_tableBody" style="border-collapse: collapse;
                            text-align: center;
                            width: 100%;
                            box-sizing: border-box;
                            table-layout: fixed;
                            line-height: 36px;
                            border-top: 1px solid #dfe6ec;
                            border-left: 1px solid #dfe6ec;
                            border-right: 1px solid #dfe6ec;
                            ">
                    <colgroup>
                        <col width="120">
                        <col>
                        <col>
                        <col>
                        <col>
                        <col>
                        <col>
                        <col>
                    </colgroup>
                    <tbody>
                        <tr style="border-bottom: 1px solid #dfe6ec;">
                            <td style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;box-sizing: border-box;background-color: #eef1f6;height: 60px;border-right: 1px solid #dfe6ec;">
                                <div>节次/星期</div>
                            </td>
                            <td v-for="item in headerOptions" :key="item.id" style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;box-sizing: border-box;padding: 0 10px;background-color: #eef1f6;min-height: 36px;border-right: 1px solid #dfe6ec">{{item.name}}</td>
                        </tr>
                        <tr v-for="(item, index) in sectionOptions" :key="index">
                            <td style="overflow: hidden;min-height: 36px;padding: 0 10px;text-align: center;color: #666;background-color: #fff;border-bottom: 1px solid #dfe6ec;border-right: 1px solid #dfe6ec;">
                                {{item.sectionName}}
                            </td>
                            <td v-for="(cItem, cIndex) in item.courseInfo" :key="cIndex" :style="{'overflow': 'hidden','minHeight': 36 + 'px','textAlign': 'center','color': '#666','backgroundColor': '#fff', 'borderRightWidth': 1+'px','borderRightStyle': cIndex == item.courseInfo.length - 1 ? 'none' : 'solid', 'borderRightColor': '#dfe6ec','borderBottomWidth': 1+'px','borderBottomStyle': 'solid', 'borderBottomColor': '#dfe6ec' }">
                                <div>{{cItem.clazz}}</div>
                                <div>{{cItem.course}}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import {
        getAllYear,
        getCurrentYear,
        getTerm,
        getWeeks,
        getXQ,
        getClassTime,
        getMyKb
    } from './request.js'
    import { getRcCodeList } from '../../../../../service/index.js'
    export default {
        name: '',
        data() {
            return {
                showTable: true,
                loading: false,
                headerOptions: [],
                emptyText: '',
                isScorll: false,
                year: '',
                yearOptions: [],
                term: '',
                termOptions: [],
                week: '',
                weekOptions: [],
                sectionOptions: [],
                tableHeight: 0,
                tableWidth: 0,
                tplUnitId: '',
                currentYear: '',
                secOptions: [],
                errorMsg: '',
                codeList: {
                    'btn_pk_kb_my_print': false,
                    'btn_pk_kb_my_download': false
                }
            }
        },
        created() {
            this.$parent.$emit('currentPage', '/pk/kb/my')
            window.addEventListener('resize', this.handleResize)
            getRcCodeList('category_pk_kb_my', this.codeList).then(() => {
                this._init()
            })
            
        },
        mounted() {
            let parentHeight = Number($('.sy-down').css('height').slice(0, -2))
            let tHeadHeight = Number($('.sy-pk-my_tHead').css('height').slice(0, -2))
            this.tableHeight = parentHeight - tHeadHeight - 1 + 60
            this.tableWidth = Number($('.sy-down').css('width').slice(0, -2)) - 20
            this.$nextTick(() => {
                let tBodyHeight = Number($('.sy-pk-my_tableBody').css('height').slice(0, -2))
                if (tBodyHeight > this.tableHeight) {
                    this.isScorll = true
                } else {
                    this.isScorll = false
                }

            })
        },
        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        },
        methods: {
            //  初始化
            _init() {
                if (this.$store.state.unitId) {
                    this.tplUnitId = this.$store.state.unitId
                    this._getCurrentYear({
                        unitId: this.tplUnitId
                    })
                    this.getHeaderData()
                }
            },

            //  获取表头数据
            getHeaderData() {
                getXQ({
                    code: 'XQ'
                }).then((res) => {
                    if (res && res.status == 200 && res.data) {
                        this.headerOptions = res.data
                        getClassTime({
                            unitId: this.tplUnitId
                        }).then((resC) => {
                            if (resC && resC.status == 200 && resC.data && resC.data.length > 0) {
                                let tplSecOptions = []
                                resC.data.forEach((_v, o) => {
                                    tplSecOptions.push({
                                        id: _v.id,
                                        name: _v.name
                                    })
                                })
                                this.secOptions = tplSecOptions
                                this._getAllYear({
                                    unitId: this.tplUnitId
                                })
                            } else {
                                this.secOptions = []
                                this.errorMsg = 'sec'
                                this._getAllYear({
                                    unitId: this.tplUnitId
                                })
                            }
                        })
                    } else {
                        this.headerOptions = []
                        this.errorMsg = 'xq'
                        this._getAllYear({
                            unitId: this.tplUnitId
                        })
                    }
                })
            },

            //  大小改变
            handleResize(e) {
                let parentHeight = Number($('.sy-down').css('height').slice(0, -2))
                let tHeadHeight = Number($('.sy-pk-my_tHead').css('height').slice(0, -2))
                this.tableHeight = parentHeight - tHeadHeight - 1 + 60
                let tBodyHeight = Number($('.sy-pk-my_tableBody').css('height').slice(0, -2))
                this.tableWidth = Number($('.sy-down').css('width').slice(0, -2)) - 20
                if (tBodyHeight > this.tableHeight) {
                    this.isScorll = true
                } else {
                    this.isScorll = false
                }
            },

            //  获取年度
            _getAllYear(param) {
                this.year = ''
                this.emptyText = '正在加载中...'
                getAllYear(param).then((res) => {
                    if (res && res.status === 200 && res.data && res.data.length > 0) {
                        res.data.forEach((_d, i) => {
                            if (_d.current) {
                                this.year = _d.year
                            }
                        })
                        this.yearOptions = res.data
                    } else {
                        this.emptyText = '暂无数据'
                        this.yearOptions = []
                    }
                })
            },

            //  获取当前年度
            _getCurrentYear(param) {
                getCurrentYear(param).then((res) => {
                    if (res && res.status === 200 && res.data) {
                        this.currentYear = res.data.year
                    }
                })
            },

            //  年度变化
            yearChange(val) {
                if (val) {
                    this.term = ''
                    this.termOptions = []
                    this._getTerm({
                        unitId: this.tplUnitId,
                        year: this.year
                    })
                }
            },

            //  获取学期
            _getTerm(param) {
                this.emptyText = '正在加载中...'
                getTerm(param).then((res) => {
                    if (res && res.status === 200 && res.data && res.data.length > 0) {
                        this.termOptions = res.data
                        if ((parseInt(param.year.slice(-4)) <= parseInt(this.currentYear.slice(0, 4))) || (parseInt(this.currentYear.slice(-4)) <= parseInt(param.year.slice(0, 4)))) {
                            this.term = "1"
                        } else {
                            res.data.forEach((_d, i) => {
                                if (_d.current) {
                                    this.term = _d.schoolTerm
                                }
                            })
                        }
                    } else {
                        this.emptyText = '暂无数据'
                        this.termOptions = []
                    }

                })
            },

            //  学期改变
            termChange(val) {
                this.week = ''
                this.weekOptions = []
                if (val) {
                    this._getWeeks({
                        year: this.year,
                        term: val
                    })

                }
            },

            //  获取周次
            _getWeeks(param) {
                getWeeks(param).then((res) => {
                    if (res && res.status == 200 && res.data && res.data.length > 0) {
                        this.weekOptions = res.data
                        let tplWeek = ''
                        for (let i = 0; i < res.data.length; i++) {
                            if (res.data[i].current == 'true') {
                                tplWeek = res.data[i].week
                                break
                            }
                        }
                        if (tplWeek) {
                            setTimeout(() => {
                                this.week = tplWeek
                            }, 20)
                        } else {
                            setTimeout(() => {
                                this.week = res.data[0].week
                            }, 20)
                        }
                    } else {
                        if (this.errorMsg) {
                            if (this.errorMsg = 'xq') {
                                this.showTable = false
                                this.$notify({
                                    title: '提示',
                                    message: "暂未查询到星期数据！",
                                    type: 'info'
                                })
                            } else if (this.errorMsg = 'sec') {
                                this.showTable = true
                                this.$notify({
                                    title: '提示',
                                    message: "暂未查询到节次数据！",
                                    type: 'info'
                                })
                            }
                        } else {
                            let emptyData = []
                            for (let j = 0; j < this.secOptions.length; j++) {
                                let emptyObj = {}
                                emptyObj.sectionName = this.secOptions[j].name
                                emptyObj.courseInfo = []
                                for (let k = 0; k < this.headerOptions.length; k++) {
                                    emptyObj.courseInfo.push({
                                        clazz: '',
                                        course: ''
                                    })
                                }
                                emptyData.push(emptyObj)
                            }
                            this.sectionOptions = emptyData
                        }
                    }
                })
            },

            //  周次变化
            weekChange(val) {
                if (val) {
                    this._getMyKb({
                        unitId: this.tplUnitId,
                        year: this.year,
                        term: this.term,
                        week: val
                    })
                }
            },

            //  获取我的课表
            _getMyKb(param) {
                this.loading = true
                getMyKb(param).then((resK) => {
                    let resDataArr = []
                    if (resK && resK.status == 200 && resK.data) {
                        for (let m = 0; m < this.secOptions.length; m++) {
                            let tplResObj = {}
                            tplResObj.sectionName = this.secOptions[m].name
                            tplResObj.courseInfo = []
                            if (resK.data.length > 0 && resK.data[0].courseSheets && resK.data[0].courseSheets.length > 0) {
                                let currentRowData = []
                                resK.data[0].courseSheets.forEach((_val, ind) => {
                                    if (_val.festivalId == this.secOptions[m].id) {
                                        currentRowData.push(_val)
                                    }
                                })
                                if (currentRowData.length > 0) {
                                    for (let j = 0; j < this.headerOptions.length; j++) {
                                        let fIndex = currentRowData.findIndex((fv, fi) => {
                                            return fv.weekId == this.headerOptions[j].id
                                        })
                                        if (fIndex >= 0) {
                                            let hasObj = {}
                                            hasObj.course = `${currentRowData[fIndex].courseName}${currentRowData[fIndex].single == 0 ? '' : currentRowData[fIndex].single == 1 ? '(单周)' : '(双周)'}`
                                            if (currentRowData[fIndex].classNames && currentRowData[fIndex].classNames.length > 0) {
                                                let tplNameArr = []
                                                currentRowData[fIndex].classNames.forEach((_c, c) => {
                                                    tplNameArr.push(_c.shortName)
                                                })
                                                hasObj.clazz = tplNameArr.join(',')
                                            } else {
                                                hasObj.clazz = ''
                                            }
                                            tplResObj.courseInfo.push(hasObj)
                                        } else {
                                            tplResObj.courseInfo.push({
                                                clazz: '',
                                                course: ''
                                            })
                                        }
                                    }
                                } else {
                                    for (let n = 0; n < this.headerOptions.length; n++) {
                                        tplResObj.courseInfo.push({
                                            clazz: '',
                                            course: ''
                                        })
                                    }
                                }
                            } else {
                                for (let n = 0; n < this.headerOptions.length; n++) {
                                    tplResObj.courseInfo.push({
                                        clazz: '',
                                        course: ''
                                    })
                                }
                            }
                            resDataArr.push(tplResObj)
                        }
                    } else {
                        for (let q = 0; q < this.secOptions.length; q++) {
                            let tplEmptyObj = {}
                            tplEmptyObj.sectionName = this.secOptions[q].name
                            tplEmptyObj.courseInfo = []
                            for (let w = 0; w < this.headerOptions.length; w++) {
                                tplEmptyObj.courseInfo.push({
                                    clazz: '',
                                    course: ''
                                })
                            }
                            resDataArr.push(tplEmptyObj)
                        }
                    }
                    this.sectionOptions = resDataArr
                })
                this.loading = false
            },

            //  打印
            print() {
                this.$print('#myTable');

            },
        }
    }
</script>

<style scope>
    .sy-pk-my_tBody {
        /* width: 100%;
        overflow-y: auto; */
    }
</style>