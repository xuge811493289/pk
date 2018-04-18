<template>
    <div class="sy-pk-step-container sy-theme-tableBorder" style="height: auto;">
        <div style="padding: 10px;">
            <el-select v-model="gradeValue" placeholder="请选择" size="small" style="width:130px" @change="gradeChange">
                <el-option v-for="item in options" :key="item.gradeId" :label="item.gradeName" :value="item.gradeId">
                </el-option>
            </el-select>
        </div>
        <div style="padding: 0 10px 10px;">
            <el-table :data="tableData" border :empty-text="emptyText">
                <el-table-column fixed label="总课程表" prop="name" align="center" width="120px"></el-table-column>
                <el-table-column v-for="(we,index) in columes" :key="we.id" :label="we.name" align="center">

                    <el-table-column v-for="(jie,i) in we.children" :key="jie.id" :label="jie.name" align="center" width="120">
                        <template scope="scope">
                            <div>{{scope.row.courseInfo[i + we.children.length * index].name}}</div>
                            <div>{{scope.row.courseInfo[i + we.children.length * index].teacher}}</div>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import { getGradeListByPlan, getBb, getFestival, getClassSheetsById } from '../../request.js'
    export default {
        data() {
            return {
                options: [],
                gradeValue: '',
                columes: [],
                tableData: [],
                emptyText: '正在加载中...',
                flag: '',
            }
        },
        created() {
            this._init()
        },
        methods: {
            //  初始化
            _init() {
                this._getTableHeader()
            },

            //  根据方案获取年级
            _getGradeListByPlan(id) {
                getGradeListByPlan(id).then((res) => {
                    this.options = res
                    if (this.options.length > 0) {
                        setTimeout(() => {
                            this.gradeValue = this.options[0].gradeId
                        }, 20)
                    }
                }).catch(() => {
                    this.emptyText = '暂无数据'
                    this.tableData = []
                })
            },

            //  年级改变
            gradeChange(val) {
                if (val) {
                    this._getClassSheetsById({
                        unitId: this.$store.state.unitId,
                        year: this.$route.query.year,
                        term: this.$route.query.term,
                        gradeId: val,
                        solutionId: this.$route.query.id
                    })
                }
            },

            //  获取表头信息
            _getTableHeader() {
                getBb('XQ').then((resXQ) => {
                    if (resXQ && resXQ.status == 200 && resXQ.data && resXQ.data.length > 0) {
                        let tplXqOptions = []
                        resXQ.data.forEach((_d, i) => {
                            tplXqOptions.push({
                                name: _d.name,
                                id: _d.id,
                                children: []
                            })
                        })
                        getFestival({
                            unitId: this.$store.state.unitId
                        }).then((resFes) => {
                            if (resFes && resFes.status == 200 && resFes.data && resFes.data.length > 0) {
                                let tplSecOptions = []
                                resFes.data.forEach((_v, o) => {
                                    tplSecOptions.push({
                                        id: _v.id,
                                        name: _v.name
                                    })
                                })
                                for (let m = 0; m < tplXqOptions.length; m++) {
                                    tplXqOptions[m].children = tplSecOptions
                                }
                                this.columes = tplXqOptions;
                                this._getGradeListByPlan(this.$route.query.id)
                            } else {
                                this.tableData = []
                                this.emptyText = '暂无数据'
                                this.flag = '暂无节次数据'
                                this._getGradeListByPlan(this.$route.query.id)
                            }
                        })
                    } else {
                        this.columes = []
                        this.tableData = []
                        this.emptyText = '暂无数据'
                        this.flag = '暂无星期数据'
                        this._getGradeListByPlan(this.$route.query.id)
                    }
                })
            },

            //  查询教师列表
            _getClassSheetsById(param) {
                if (this.flag) {
                    this.$notify({
                        title: '提示',
                        message: this.flag,
                        type: 'info'
                    })
                    return false
                }
                this.tableData = []
                this.emptyText = '正在加载中...'
                getClassSheetsById(param).then((res) => {
                    let tplResArr = []
                    if (res.length > 0) {
                        for (let r = 0; r < res.length; r++) {
                            let tplResObj = {}
                            tplResObj.courseInfo = []
                            tplResObj.name = `${res[r].gradeName}${res[r].className}`
                            let currentRowData = []
                            if (res[r].courseSheets && res[r].courseSheets.length > 0) {
                                for (let t = 0; t < res[r].courseSheets.length; t++) {
                                    let fdIndex = currentRowData.findIndex((fdv, fdi) => {
                                        return ((fdv.weekId == res[r].courseSheets[t].weekId) && (fdv.festivalId == res[r].courseSheets[t].festivalId))
                                    })
                                    if (fdIndex >= 0) {
                                        currentRowData[fdIndex].teacherNames += `,${res[r].courseSheets[t].teacherNames}`
                                    } else {
                                        currentRowData.push({
                                            weekId: res[r].courseSheets[t].weekId,
                                            festivalId: res[r].courseSheets[t].festivalId,
                                            courseName: `${res[r].courseSheets[t].courseName}${res[r].courseSheets[t].single == 0 ? '' : res[r].courseSheets[t].single == 1 ? '(单周)' : '(双周)'}`,
                                            courseShortName: res[r].courseSheets[t].courseShortName,
                                            teacherNames: res[r].courseSheets[t].teacherNames,
                                        })
                                    }
                                }
                            }
                            if (currentRowData.length > 0) {
                                for (let y = 0; y < this.columes.length; y++) {
                                    for (let u = 0; u < this.columes[y].children.length; u++) {
                                        let secIndex = currentRowData.findIndex((sv, si) => {
                                            return ((sv.weekId == this.columes[y].id) && (sv.festivalId == this.columes[y].children[u].id))
                                        })
                                        if (secIndex >= 0) {
                                            tplResObj.courseInfo.push({
                                                name: currentRowData[secIndex].courseName,
                                                teacher: currentRowData[secIndex].teacherNames
                                            })
                                        } else {
                                            tplResObj.courseInfo.push({
                                                name: '',
                                                teacher: ''
                                            })
                                        }
                                    }
                                }
                            } else {
                                for (let w = 0; w < this.columes.length; w++) {
                                    for (let e = 0; e < this.columes[w].children.length; e++) {
                                        tplResObj.courseInfo.push({
                                            name: '',
                                            teacher: ''
                                        })
                                    }
                                }
                            }
                            tplResArr.push(tplResObj)
                        }
                        this.tableData = tplResArr
                    } else {
                        this.emptyText = '暂无数据'
                        this.tableData = []
                    }
                }).catch(() => {
                    this.emptyText = '暂无数据'
                    this.tableData = []
                })
            }


        }
    }

</script>
<style scoped>
</style>