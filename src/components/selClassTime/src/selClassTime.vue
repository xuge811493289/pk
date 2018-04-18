<template>
    <div class="selBox">
        <el-table v-if="showBox" :data="tableData" border @cell-click="selClass" :highlight-current-row="lightCur" :stripe="lightCur"
            @cell-mouse-enter="colorOk" @cell-mouse-leave="colorNo">
            <el-table-column prop="name" label="" width="100" align="center"></el-table-column>
            <el-table-column v-for="(item, index) in options" align="center" :key="index" :label="item.name" :prop="item.prop">
                <template scope="scope">
                    <span style="display:block;line-height:40px;height: 40px;" :class="scope.row[`${item.prop}`] === '1' ? 'check':'nocheck'">{{scope.row[`${item.prop}_check`] ? '√' : ''}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="seltitle" v-else>课表正在努力加载中...</div>
    </div>
</template>

<script>
    import config from './config'
    import { getXQ, getClassTime } from './request'
    export default {
        name: 'SelClasstime',
        components: {},
        props: {
            seleted: {
                type: Array,
                default() {
                    return []
                }
            },
            disAll: {
                type: Boolean,
                default: false
            },
            isWarn: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                showBox: false,
                lightCur: false,
                tableData: [],
                options: [],
                selectData: [],
                sortData: [],
                tplUnitId: '',
                limitNumbers: 0,
            }
        },
        created() {
            if (this.$store.state.unitId) {
                this.tplUnitId = this.$store.state.unitId
            }
            if (this.seleted.length > 0) {
                this.selectData = this.seleted
            }
            this._init()
        },
        methods: {
            //  初始化
            _init() {
                getXQ({
                    code: 'XQ'
                }).then((res) => {
                    if (res && res.status === 200 && res.data) {
                        res.data.forEach((val, index) => {
                            val.prop = `${val.name}_${val.sort}_${val.id}`
                        })
                        this.options = res.data
                        getClassTime({ unitId: this.tplUnitId }).then((res) => {
                            if (res && res.status === 200 && res.data) {
                                let limitNum = 0
                                for (let n = 0; n < res.data.length; n++) {
                                    let weekArr = []
                                    res.data[n].weekRModels.forEach((val, index) => {
                                        weekArr.push(val.weekName)
                                    })
                                    let tplArr = []
                                    if (this.disAll) {
                                        for (let m = 0; m < this.options.length; m++) {
                                            tplArr.push('0')
                                        }
                                    } else {
                                        for (let m = 0; m < this.options.length; m++) {
                                            if ((weekArr.indexOf(this.options[m].name) < 0)) {
                                                tplArr.push('0')
                                                
                                            } else {
                                                limitNum ++
                                                tplArr.push('1')
                                            }
                                        }
                                    }
                                    let tplObj = {}
                                    for (let j = 0; j < tplArr.length; j++) {
                                        tplObj[`${this.options[j].prop}`] = tplArr[j]
                                        if (this.seleted.length > 0) {
                                            let checkStr = `${this.options[j].prop}|${res.data[n].name}_${res.data[n].sort}_${res.data[n].id}`
                                            if (this.seleted.indexOf(checkStr) != -1) {
                                                // tplObj[`${this.options[j].prop}_check`] = true
                                                this.$set(tplObj, `${this.options[j].prop}_check`, true)
                                            } else {
                                                // tplObj[`${this.options[j].prop}_check`] = false
                                                this.$set(tplObj, `${this.options[j].prop}_check`, false)
                                            }
                                        } else {
                                            tplObj[`${this.options[j].prop}_check`] = false
                                        }

                                    }
                                    this.tableData.push(Object.assign({ name: res.data[n].name, id: res.data[n].id, sort: res.data[n].sort }, tplObj))
                                }
                                this.limitNumbers = limitNum
                                this.showBox = true
                            }

                        })
                    }
                })
            },

            //  获取上课时间
            _getClassTime(param) {
                getClassTime(param).then((res) => {
                    if (res.status === 200 && res.data) {
                        for (let n = 0; n < res.data.length; n++) {
                            this.tableData[n]['name'] = res.data[n].name
                            let weekArr = []
                            res.data[n].weekRModels.forEach((val, index) => {
                                weekArr.push(val.weekName)
                            })
                            for (let m = 0; m < this.options.length; m++) {
                                if ((weekArr.indexOf(this.options[m]) > 0)) {
                                    this.tableData[n][`week${m}`] = true
                                } else {
                                    this.tableData[n][`week${m}`] = false
                                }
                            }
                        }
                    }
                })
            },

            //  获取星期
            _getXQ() {
                getXQ({
                    code: 'XQ'
                }).then((res) => {
                    if (res.status === 200 && res.data) {
                        res.data.forEach((val, index) => {
                            val.prop = `week${index}`
                        })
                        this.options = res.data
                    }
                })
            },

            //  选择时间操作
            selClass(row, column, cell, event) {
                if (!(row[column.property] === '0') && column.property !== 'name') {
                    let checkStr = `${column.property}|${row.name}_${row.sort}_${row.id}`
                    let checkIndex = false
                    for (let k = 0; k < this.selectData.length; k++) {
                        if (checkStr == this.selectData[k]) {
                            checkIndex = true
                            this.selectData.splice(k, 1)
                            row[`${column.property}_check`] = false
                            break
                        }
                    }
                    if (!checkIndex) {
                        this.selectData.push(checkStr)
                        if (this.isWarn && (this.selectData.length == (this.limitNumbers - 1))) {
                            this.$notify({
                                title: '提示',
                                message: `您好，一周共计${this.limitNumbers}节课，您已限制${this.limitNumbers-1}节课，望注意！`,
                                type: 'info'
                            })
                        }
                        row[`${column.property}_check`] = true
                    }
                    this.sortData = this.normalize(this.selectData)
                    this.$emit('sel-change', this.sortData)
                }

            },

            colorOk(row, column, cell, event) {
                if (cell.previousSibling) {
                    cell.parentNode.childNodes.forEach((val, index) => {
                        val.style.backgroundColor = '#EEEFF6'
                    })
                    cell.style.background = "#CFE7F6"
                }
            },

            colorNo(row, column, cell, event) {
                cell.parentNode.childNodes.forEach((val, index) => {
                    val.style.backgroundColor = '#fff'
                })
            },

            sort(arr) {
                arr.sort(function (a, b) {
                    return a.sort > b.sort
                })
                return arr
            },

            normalize(arr) {
                //  提出最外层
                var mapRes = arr.map((item, index, array) => {
                    let posIndex = item.indexOf('|')
                    let mapArr = item.slice(0, posIndex)
                    return mapArr
                })
                //  去重
                var newArr = []
                for (let i = 0; i < mapRes.length; i++) {
                    if ((newArr.indexOf(mapRes[i]) < 0)) {
                        newArr.push(mapRes[i])
                    }
                }
                //  处理父级数据
                var oneArr = []
                for (let o = 0; o < newArr.length; o++) {
                    let fatherArr = newArr[o].split('_')
                    oneArr.push({
                        name: fatherArr[0],
                        sort: parseInt(fatherArr[1]),
                        id: fatherArr[2],
                        children: []
                    })
                }
                //  处理后排序(父级)
                let outArr = this.sort(oneArr)
                //  放入节次
                for (let m = 0; m < outArr.length; m++) {
                    for (let n = 0; n < arr.length; n++) {
                        let positionInd = arr[n].indexOf('|')
                        if (arr[n].slice(0, positionInd) == `${outArr[m].name}_${outArr[m].sort}_${outArr[m].id}`) {
                            let childArr = arr[n].slice((positionInd + 1)).split('_')
                            outArr[m].children.push({
                                childName: childArr[0],
                                sort: parseInt(childArr[1]),
                                id: childArr[2]
                            })
                        }
                    }
                }
                //  节次排序
                outArr.forEach((finValue, finIndex) => {
                    finValue.children = this.sort(finValue.children)
                })
                let resultArrStr = []
                for (let j = 0; j < outArr.length; j++) {
                    for (let k = 0; k < outArr[j].children.length; k++) {
                        resultArrStr.push(`${outArr[j].name}|${outArr[j].children[k].childName}`)
                    }
                }
                return {
                    showArr: resultArrStr,
                    formArr: outArr
                }
            }
        },

    }

</script>

<style scoped>
    .selBox {
        width: 100%;
        height: auto;
    }

    .check {
        cursor: pointer
    }

    .nocheck {
        cursor: not-allowed;
    }

    .seltitle {
        width: 100%;
        line-height: 40px;
        text-align: center;
    }
</style>