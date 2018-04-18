<template>
    <div class="app-container-box">
        <sy-grad-4>
            <div slot="headerLeft" v-if="visSign">
                <span style="line-height: 40px">单位</span>
            </div>
            <div slot="headerRight">
                <span style="line-height: 40px">年度学期</span>
            </div>
            <div slot="bodyLeft" v-if="visSign">
                <sy-grad-4 :border="false">
                    <div slot="headerRight" class="line-height-56" style="background:#fff;">
                        <el-input icon="search" placeholder="请输入关键字" @keyup.enter.native="handleSearch" v-model.trim="filterText" :on-icon-click="handleIconClick"></el-input>
                    </div>
                    <div slot="bodyRight">
                        <el-tree :empty-text="emptyTextTree" :data="data" accordion :props="defaultProps" highlight-current node-key="unitId" style="border:none" class="full-parent" @node-click="handleClick" :default-expanded-keys="defaultKeys" :current-node-key="defaultKey" :filter-node-method="filterNode" ref="tree">
                        </el-tree>
                    </div>
                </sy-grad-4>
            </div>
            <div slot="bodyRight" v-show="isSchool">
                <div class="sy-row" style="padding:0px 10px ">
                    <div class="sy-row" style="line-height: 40px">
                        <el-select v-model="selShowVal" placeholder="请选择" class="sy-left" @change="getChangeValue">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                        <span class="currentYear sy-right">当前年度：{{currentYear}}学年</span>
                    </div>
                    <el-table ref="yearUnitType2" :empty-text="emptyText" v-loading="tableDataloading" :data="tableData" border style="width:100%;text-align: center">
                        <el-table-column align="center" type="index" width="80px" label="序号">
                        </el-table-column>
                        <el-table-column align="center" property="name" label="学期名称">
                            <template scope="scope">
                                <span>{{scope.row.schoolTerm === '1'? '第一学期' : '第二学期'}}
                                    <span v-if="scope.row.current" style="color:red">【当前学期】</span>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" property="beginDate" label="开始日期">
                        </el-table-column>
                        <el-table-column align="center" property="endDate" label="结束日期">
                        </el-table-column>
                        <el-table-column label="操作" width="180" align="center" v-if="codeList['btn_base_ys_si_update']">
                            <template scope="scope">
                                <i class="fa fa-edit" style="cursor:pointer" @click="handleEdit(scope.$index, scope.row)" title="修改" v-if="codeList['btn_base_ys_si_update']"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <sy-dialog title="修改" :visible.sync="dialogEditFormVisible" :close-on-click-modal="false" position="middle" height="auto" width="30%" slide="fade">
                    <div slot="body" style="padding:10px 10px 15px">
                        <el-row>
                            <el-col :span="1">
                                <span class="xing" style="line-height: 36px"></span>
                            </el-col>
                            <el-col :span="12">
                                <span style="line-height: 36px">开始日期</span>
                            </el-col>
                            <el-col :span="1">
                                <span class="xing" style="line-height: 36px"></span>
                            </el-col>
                            <el-col :span="10">
                                <span style="line-height: 36px">结束日期</span>
                            </el-col>
                        </el-row>
                        <el-form ref="form" :model="form" :rules="DateRule" style="overflow: hidden" class="dateForm">
                            <el-col :span="11">
                                <el-form-item prop="date1" messageIsTooltip>
                                    <el-date-picker type="date" :editable="editAble" placeholder="选择开始日期" v-model="form.date1" style="width: 100%;" @change="beginTime"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="2" style="text-align: center;line-height: 36px">-</el-col>
                            <el-col :span="11">
                                <el-form-item prop="date2" messageIsTooltip>
                                    <el-date-picker type="date" :editable="editAble" placeholder="选择结束日期" v-model="form.date2" style="width: 100%;" @change="endTime"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer" style="padding-right:1px">
                        <el-button @click="dialogEditFormVisible=false">取 消</el-button>
                        <el-button type="primary" :loading="loading" @click="submitForm('form')">确 定</el-button>
                    </div>
                </sy-dialog>
            </div>

        </sy-grad-4>
    </div>
</template>

<script>
import config from './config.js';
import pager from '../../config.js';
import {
    getUnit,
    ERR_OK,
    getCurrentYear,
    getAllYear,
    getTerm,
    editTerm,
    getTermById
} from './request'
import { getRcCodeList } from '../../request'
export default {
    name: 'app',
    components: {

    },
    data() {
        //  第二学期的开始不可小于第一学期的结束
        var checkBeginTwo = (rule, value, callback) => {
            if (this.tplTerm !== '2') {
                callback()
            } else {
                if (value) {
                    let beginYear = value.getFullYear()
                    let beginMonth = value.getMonth() + 1
                    let beginDay = value.getDate()
                    let termOneEnd = ''
                    let termOneEndArr = []
                    this.tableData.forEach((val, index) => {
                        if (val.schoolTerm === '1') {
                            termOneEnd = val.endDate.slice(0, 10)
                        }
                    })
                    termOneEndArr = termOneEnd.split('-')
                    if (termOneEndArr[1].slice(0, 1) === '0') {
                        termOneEndArr[1] = termOneEndArr[1].slice(-1)
                    }
                    if (termOneEndArr[2].slice(0, 1) === '0') {
                        termOneEndArr[2] = termOneEndArr[1].slice(-1)
                    }
                    if (beginYear > termOneEndArr[0]) {
                        callback()
                    } else if (beginYear == termOneEndArr[0]) {
                        if (beginMonth > termOneEndArr[1]) {
                            callback()
                        } else if (beginMonth == termOneEndArr[1]) {
                            if (beginDay > termOneEndArr[2]) {
                                callback()
                            } else {
                                callback(new Error('第二学期开始不可小于第一学期结束！'))
                            }
                        } else {
                            callback(new Error('第二学期开始不可小于第一学期结束！'))
                        }
                    } else {
                        callback(new Error('第二学期开始不可小于第一学期结束！'))
                    }
                }

            }
        }

        //  开始不可大于结束日期
        var checkBegin = (rule, value, callback) => {
            if (!this.form.date2) {
                callback()
            } else {
                if (value) {
                    let beginYear = value.getFullYear()
                    let beginMonth = value.getMonth() + 1
                    let beginDay = value.getDate()
                    let endYear = this.form.date2.getFullYear()
                    let endMonth = this.form.date2.getMonth() + 1
                    let endDay = this.form.date2.getDate()
                    if (endYear > beginYear) {
                        callback()
                    } else if (endYear == beginYear) {
                        if (endMonth > beginMonth) {
                            callback()
                        } else if (endMonth == beginMonth) {
                            if (endDay > beginDay) {
                                callback()
                            } else {
                                callback(new Error('开始日期不可大于结束日期！'))
                            }
                        } else {
                            callback(new Error('开始日期不可大于结束日期！'))
                        }
                    } else {
                        callback(new Error('开始日期不可大于结束日期！'))
                    }
                }

            }
        }

        //  开始段与当前年度的比较
        var checkBeginYear = (rule, value, callback) => {
            if (value) {
                let beginYear = value.getFullYear()
                let pre = this.selShowVal.slice(0, 4)
                let cur = this.selShowVal.slice(-4)
                if (this.tplTerm === '1') {
                    if (beginYear >= cur) {
                        callback(new Error('不可大于当前学年！'))
                    } else if (beginYear < pre) {
                        callback(new Error('不可小于当前学年！'))
                    } else {
                        callback()
                    }
                } else {
                    if (beginYear > cur) {
                        callback(new Error('不可大于当前学年！'))
                    } else if (beginYear < pre) {
                        callback(new Error('不可小于当前学年！'))
                    } else {
                        callback()
                    }
                }
            }

        }

        //  结束段与年度对比
        var checkEndYear = (rule, value, callback) => {
            if (value) {
                let endYear = value.getFullYear()
                let pre = this.selShowVal.slice(0, 4)
                let cur = this.selShowVal.slice(-4)
                if (this.tplTerm === '1') {
                    if (endYear > cur) {
                        callback(new Error('不可大于当前学年！'))
                    } else if (endYear < pre) {
                        callback(new Error('不可小于当前学年！'))
                    } else {
                        callback()
                    }
                } else {
                    if (endYear > cur) {
                        callback(new Error('不可大于当前学年！'))
                    } else if (endYear <= pre) {
                        callback(new Error('不可小于当前学年！'))
                    } else {
                        callback()
                    }
                }
            }
        }

        //  结束段不可小于开始段
        var checkEnd = (rule, value, callback) => {
            if (!this.form.date1) {
                callback()
            } else {
                if (value) {
                    let endYear = value.getFullYear()
                    let endMonth = value.getMonth() + 1
                    let endDay = value.getDate()
                    let beginYear = this.form.date1.getFullYear()
                    let beginMonth = this.form.date1.getMonth() + 1
                    let beginDay = this.form.date1.getDate()
                    if (endYear > beginYear) {
                        callback()
                    } else if (endYear == beginYear) {
                        if (endMonth > beginMonth) {
                            callback()
                        } else if (endMonth == beginMonth) {
                            if (endDay > beginDay) {
                                callback()
                            } else {
                                callback(new Error('结束日期不可小于开始日期！'))
                            }
                        } else {
                            callback(new Error('结束日期不可小于开始日期！'))
                        }
                    } else {
                        callback(new Error('结束日期不可小于开始日期！'))
                    }
                }

            }
        }

        //  第一学期结束不可大于第二学期开始
        var checkEndOne = (rule, value, callback) => {
            if (this.tplTerm !== '1') {
                callback()
            } else {
                if (value) {
                    let endYear = value.getFullYear()
                    let endMonth = value.getMonth() + 1
                    let endDay = value.getDate()
                    let termTwoBegin = ''
                    let termTwoBeginArr = []
                    this.tableData.forEach((val, index) => {
                        if (val.schoolTerm === '2') {
                            termTwoBegin = val.beginDate.slice(0, 10)
                        }
                    })
                    termTwoBeginArr = termTwoBegin.split('-')
                    if (termTwoBeginArr[1].slice(0, 1) === '0') {
                        termTwoBeginArr[1] = termTwoBeginArr[1].slice(-1)
                    }
                    if (termTwoBeginArr[2].slice(0, 1) === '0') {
                        termTwoBeginArr[2] = termTwoBeginArr[1].slice(-1)
                    }
                    if (endYear < termTwoBeginArr[0]) {
                        callback()
                    } else if (endYear == termTwoBeginArr[0]) {
                        if (endMonth < termTwoBeginArr[1]) {
                            callback()
                        } else if (endMonth == termTwoBeginArr[1]) {
                            if (endDay < termTwoBeginArr[2]) {
                                callback()
                            } else {
                                callback(new Error('第一学期结束不可大于第二学期开始！'))
                            }
                        } else {
                            callback(new Error('第一学期结束不可大于第二学期开始！'))
                        }
                    } else {
                        callback(new Error('第一学期结束不可大于第二学期开始！'))
                    }
                }

            }
        }
        return {
            emptyTextTree: '正在加载中...',
            emptyText: '正在加载中...',
            isSchool: false,
            tableDataloading: false,
            editAble: false,
            loading: false,
            form: {
                date1: '',
                date2: ''
            },
            visSign: false,
            defaultKeys: [],
            defaultKey: '',
            inputStatus: false,
            dialogEditFormVisible: false,
            tplId: '',
            tplTerm: '',
            tableData: [],
            filterText: '',
            selShowVal: '',
            options: [],
            beginDate: '',
            endDate: '',
            mainId: '',
            selectedYear: '',
            isCur: false,
            currentYear: '',
            obj: {
                color: '#f00'
            },
            data: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            isHasList: true,
            DateRule: {
                date1: [
                    { type: 'date', required: true, message: '请选择开始日期！', trigger: 'blur' },
                    { validator: checkBeginTwo, trigger: 'change' },
                    { validator: checkBegin, trigger: 'change' },
                    { validator: checkBeginYear, trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择结束日期！', trigger: 'blur' },
                    { validator: checkEndOne, trigger: 'change' },
                    { validator: checkEnd, trigger: 'change' },
                    { validator: checkEndYear, trigger: 'change' }

                ]
            },
            codeList: {
                'btn_base_ys_si_update': false, //  修改学期
            }
        }
    },
    beforeCreate() {

    },
    created() {
        this.$parent.$emit('currentPage', '/base/year');
        getRcCodeList('category_base_ys', this.codeList).then(() => {
            this._init()
        })
    },
    methods: {
        //  开始时间赋值
        beginTime(val) {
            this.beginDate = val
        },

        //  结束时间赋值
        endTime(val) {
            this.endDate = val
        },

        //  手动回车搜索
        handleSearch() {
            this.$refs.tree.filter(this.filterText)
        },

        //  点击search搜索
        handleIconClick() {
            this.$refs.tree.filter(this.filterText)
        },

        //  单位树过滤函数
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },

        //  单位树点击
        handleClick(data) {
            if (data.unitType !== 1) {
                this.emptyText = '正在加载中...'
                this.isSchool = true
                this.options = []
                this.selShowVal = ''
                this.currentYear = ''
                this.tplId = data.unitId
                if (this.tplId !== '') {
                    this._getAllYear({
                        unitId: data.unitId
                    })
                }
            } else {
                this.isSchool = false
            }
        },

        //  编辑按钮操作
        handleEdit(index, row) {
            this.$refs.form.resetFields()
            this.mainId = row.id
            this.isCur = row.isCurrent
            this.tplTerm = row.schoolTerm
            this._getTermById({
                id: row.id
            })
        },

        //  年度变化时操作
        getChangeValue(selVal) {
            if (this.selShowVal !== '' && this.tplId !== '') {
                this._getTerm({
                    unitId: this.tplId,
                    year: selVal
                })
            }
        },

        //  重置表单
        resetForm(ruleForm) {
            this.$refs[formName].resetFields();
        },

        //  提交表单操作
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true
                    this._editTerm({
                        id: this.mainId,
                        beginDate: this.beginDate,
                        endDate: this.endDate,
                        isCurrent: this.isCur,
                        unitId: this.tplId,
                        year: this.selShowVal
                    })
                }
            });
        },

        //  渲染单位树
        renderContent(h, { node, data, store }) {
            return h('span', {
                attrs: {
                    class: 'sy-span-resAuth'
                }
            }, [
                    h('span', node.label)
                ])
        },

        //  初始化
        _init() {
            getUnit().then((res) => {
                if (res.code === ERR_OK) {
                    if (!(res.data.length <= 1 && res.data[0].unitType === 2)) {
                        this.visSign = true
                    }
                    if (res.data.length === 0) {
                        this.emptyTextTree = '暂无数据'
                    }
                    if (res.data.length == 1 && res.data[0].unitType == 1) {
                        this.isSchool = false
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].unitType === 2) {
                            this.tplId = res.data[i].unitId
                            this.defaultKey = res.data[i].unitId
                            this.isSchool = true
                            this.defaultKeys.push(res.data[i].parentId)
                            getAllYear({
                                unitId: this.tplId
                            }).then((res) => {
                                if (res.code === ERR_OK) {
                                    res.data.forEach((val, index) => {
                                        if (val.current) {
                                            this.selShowVal = val.year
                                            this.currentYear = val.year
                                        }
                                        this.options.push({
                                            label: val.year,
                                            value: val.year,
                                            current: val.current
                                        })
                                    })
                                }
                            })
                            break
                        }
                    }
                    this.data = this.$data2tree(res.data, 'unitId', 'parentId')
                }
            })
        },

        //  获取当前年度
        _getCurrentYear(param) {
            getCurrentYear(param).then((res) => {
                if (res.code === ERR_OK) {
                    this.currentYear = res.data.year
                }
            })
        },

        //  获取所有年度
        _getAllYear(param) {
            getAllYear(param).then((res) => {
                if (res.code === ERR_OK) {
                    res.data.forEach((val, index) => {
                        if (val.current) {
                            this.selShowVal = val.year
                            this.currentYear = val.year
                        }
                        this.options.push({
                            value: val.year,
                            label: val.year,
                            current: val.current
                        })
                    })
                }
            })
        },

        //  获取学期数据
        _getTerm(param) {
            this.tableData = []
            this.tableDataloading = true;
            getTerm(param).then((res) => {
                this.tableDataloading = false;
                if (res.code === ERR_OK) {
                    if (res.data.length === 0) {
                        this.emptyText = '暂无数据'
                    }
                    res.data.forEach((val, index) => {
                        let tpl = {}
                        val.beginDate = val.beginDate.slice(0, 10)
                        val.endDate = val.endDate.slice(0, 10)
                        if (val.schoolTerm === '1') {
                            this.tableData.unshift(val)
                        } else {
                            this.tableData.push(val)
                        }
                    })
                }
            }).catch(()=>{
                this.tableDataloading = false;
            })
        },

        //  编辑学期数据
        _editTerm(param) {
            editTerm(param).then((res) => {
                if (res.code === ERR_OK) {
                    this.$notify({
                        title: '成功',
                        message: '操作成功！',
                        type: 'success'
                    })
                    this.loading = false
                    this.tableData = []
                    this.dialogEditFormVisible = false
                    this._getTerm(param)
                } else {
                    this.loading = false
                }
            })
        },

        //  根据单位id查询学期
        _getTermById(param) {
            getTermById(param).then((res) => {
                if (res.code === ERR_OK) {
                    let tplDate1 = res.data.beginDate.slice(0, 10)
                    this.form.date1 = new Date(tplDate1.replace(/-/g, "/"))
                    let tplDate2 = res.data.endDate.slice(0, 10)
                    this.form.date2 = new Date(tplDate2.replace(/-/g, "/"))
                    this.dialogEditFormVisible = true;
                }
            })
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
</style>
