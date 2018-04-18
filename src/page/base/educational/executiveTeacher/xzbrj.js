import _ from 'lodash';
import {
    getGradeTree,
    getYearList,
    getClazzTeachersList,
    getTheacherList,
    administrationTeach,
    getTermList,
    deleteistrationTeach
} from './request.js';
import config from './config.js';
import { getRcCodeList } from '../../request.js';
import pager from '../../config.js';
export default {
    name: 'teacher',
    components: {

    },
    data() {
        return {
            openOrHide: '/common/images/left.png',
            form: {
                year: '',
                term: ''
            },
            emptyText: '暂无数据',
            emptyTreeText: '正在加载中...',
            yearList: [],
            termList: [],
            value8: '',
            options: [],
            isHasList: true,
            selectTeacherId: '',
            selectTeacherIds: [],
            data: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            tableData: [],
            selectUserTeacher: '',
            multipleSelection: [],
            taableColums: config.taableColums,
            inputValue: '',
            input: '',
            arrs: [{
                    label: '一',
                    value: 1
                },
                {
                    label: '二',
                    value: 2
                },
                {
                    label: '三',
                    value: 3
                },
                {
                    label: '四',
                    value: 4
                },
            ],
            currentNodeKey: '',
            defaultExpandedkeys: [],
            currentUnitId: '',
            currentUnit: '',
            currentClazzId: '',
            currentCourseId: '',
            params: {
                unitId: '',
                gradeId: '',
                yearId: '',
                termId: ''
            },
            columnX: [],
            oldOptions: [],
            isShowTable: false,
            dialogAddMore: false,
            oldShowSelectKey: '',
            codeList: {
                'btn_base_classteaching_import': false, // 导入
                'btn_base_classteaching_edit': false, // "修改"
                'btn_base_classteaching_del': false, // 删除
            }
        }
    },
    beforeCreate() {

    },
    watch: {
        'form': {
            handler(newVal, oldVal) {
                if (newVal.year && newVal.term) {
                    this.refreshList();
                }
            },
            deep: true
        },
        selectUserTeacher: function(newVal, oldVal) {
            console.log(newVal, oldVal);
            if (!newVal) { return }
            if (newVal != oldVal) {
                this.submitNewList();
            }
        },
        // inputValue(val) {
        //     if (val) {
        //         this.$refs.tree.filter(val);
        //     } else {
        //         this.getTree();
        //     }

        // }
    },
    created() {
        this.$parent.$emit('currentPage', '/base/executiveTeacher');
        // 获取权限
        getRcCodeList('category_base_classteaching', this.codeList).then(() => {
            this.getTree();
        });
    },
    mounted() {

    },
    methods: {
        removeTeacher(clazzId, courseId, tag) {
            this.$confirm('是否删除任教?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteistrationTeach({
                    unitId: this.params.unitId,
                    courseId: courseId,
                    gradeId: this.params.gradeId,
                    classId: clazzId,
                    userId: tag.userId,
                    yearId: this.params.yearId,
                    termId: this.params.termId
                }).then((data) => {
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success'
                    });
                    this.refreshList();
                })
            }).catch(() => {

            });
        },
        getTheacherList() {
            this.oldOptions = [];
            this.options = [];
            getTheacherList(this.currentUnitId).then((data) => {
                if (data && data.data && data.data.list && data.data.list.length > 0) {
                    data.data.list.forEach((_d, i) => {
                        if (_d.status == 1) {
                            this.oldOptions.push({
                                label: _d.realName,
                                value: _d.id
                            })
                            this.options.push({
                                label: _d.realName,
                                value: _d.id
                            })
                        }
                    })
                    this.dialogAddMore = true;
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: data.message
                    });
                }
            })
        },
        // 过滤
        handleIconClick() {
            if (this.inputValue) {
                this.$refs.tree.filter(this.inputValue);
            } else {
                this.getTree();
            }
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        make(datas, idprop, pIdprop) {
            if (!idprop) {
                idprop = 'id';
            }
            if (!pIdprop) {
                pIdprop = 'parentId';
            }
            let nodes = [];
            let c = function(obj) {
                let _c = [];
                for (let i = 0; i < datas.length; i++) {
                    let _d = _.cloneDeep(datas[i]);
                    if (_d[pIdprop + ''] == obj[idprop + '']) {
                        _c.push(_d);
                        c(_d);
                    }
                }
                obj.children = _c.sort((a, b) => { return a.sort > b.sort });
            };
            for (let i = 0; i < datas.length; i++) {
                let _d = _.cloneDeep(datas[i]);
                if ((!_d[pIdprop + ''] && _d[pIdprop + ''] != '') || (!_.result(_.find(datas, {
                        [idprop]: _d[pIdprop + '']
                    }), idprop))) {
                    c(_d);
                    nodes.push(_d);
                }
            }
            return nodes;
        },
        // 获取组织架构树
        getTree() {
            this.emptyTreeText = '正在加载中...';
            getGradeTree().then((data) => {
                if (data && data.data.length > 0) {
                    this.oldTreeData = _.cloneDeep(data.data);
                    this.data = this.make(data.data, 'domId', 'domPid');
                    let sessMsg = this.$route.params;
                    let current = '';
                    if (sessMsg.currentNodeKey) {
                        current = _.find(this.oldTreeData, { id: sessMsg.params.unitId });
                        this.params = sessMsg.params;
                        this.refreshList();
                        this.currentNodeKey = sessMsg.currentNodeKey;
                        this.isShowTable = true;
                    } else {
                        current = this.data[0];
                        this.currentNodeKey = current.id;
                    }
                    this.defaultExpandedkeys = [current.id];
                    this.currentUnitId = current.id;
                    this.params.unitId = current.id;
                    let currentObj = _.find(this.oldTreeData, { id: current.id });
                    this.currentUnit = currentObj.name;
                    this.getYearList();
                } else {
                    this.emptyTreeText = '暂无数据';
                }
            })
        },
        // 获取学年
        getYearList() {
            console.log(this.currentUnitId);
            getYearList(this.currentUnitId).then((data) => {
                this.yearList = [];
                if (data.data && data.data.length > 0) {
                    data.data.forEach((_d, i) => {
                        this.yearList.push({
                            label: _d.year,
                            value: _d.year
                        });
                        if (_d.current) {
                            this.form.year = _d.year
                            this.getTermList(this.form.year);
                        }
                    })
                }
            })
        },
        // 获取学期
        getTermList() {
            getTermList(this.currentUnitId, this.form.year).then((data) => {
                this.termList = [];
                if (data.data && data.data.length > 0) {
                    data.data.forEach((_d, i) => {
                        this.termList.push({
                            label: _d.schoolTerm * 1 === 1 ? '第一学期' : '第二学期',
                            value: _d.schoolTerm
                        });
                        if (_d.current) {
                            this.form.term = _d.schoolTerm
                        }
                    })
                }
            })
        },
        // 树节点点击事件
        handleNodeClick(data) {
            // console.log(data);
            this.currentNodeKey = data.id;
            this.currentUnit = data.name;
            if (data.type === 'unit') {
                this.currentUnitId = data.id;
                this.params.unitId = data.id;
                this.getYearList();
                this.getTheacherList();
            } else if (data.type === 'grade') {
                this.currentUnitId = data.parentId;
                this.params.unitId = data.parentId;
                this.params.gradeId = data.id;
                this.isShowTable = true;
                this.getYearList();
                this.refreshList();
                this.getTheacherList();
            } else if (data.type === 'clazz') {

            }
        },
        // 改变学年 刷新列表
        changeYear(val) {
            this.form.year = val;
            // this.refreshList();
        },
        // 改变学期 刷新列表
        changeTerm(val) {
            this.form.term = val;
            // this.refreshList();
        },
        // 获取列表
        refreshList() {
            this.oldShowSelectKey = '';
            this.params.yearId = this.form.year;
            this.params.termId = this.form.term;
            this.params.unitId = this.currentUnitId;
            if (!this.params.gradeId) {
                return;
            }
            if (!this.params.yearId) {
                return;
            }
            if (!this.params.termId) {
                return;
            }
            this.emptyText = '正在加载中...';
            getClazzTeachersList(this.params).then((data) => {
                // console.log(data);
                if (data && data.data) {
                    if (data.data.administrationTeachClassVMS && data.data.administrationTeachClassVMS.length > 0) {
                        let arrx = [];
                        arrx.push({
                            label: '学科',
                            prop: 'courseName',
                            width: '100',
                            fixed: true
                        });
                        data.data.administrationTeachClassVMS.forEach((_class, i) => {
                            arrx.push({
                                label: _class.clazzName,
                                prop: _class.clazzId,
                                width: '200',
                                fixed: false
                            });
                        })
                        this.columnX = arrx;
                    } else {
                        this.columnX = [];
                        this.emptyText = '暂无数据';
                    }
                    if (data.data.administrationTeachCourseVMS && data.data.administrationTeachCourseVMS.length > 0) {
                        let tableArr = [];
                        data.data.administrationTeachCourseVMS.forEach((_cour, i) => {
                            let row = {
                                courseName: _cour.courseName,
                                courseId: _cour.courseId,
                                userId: '',
                                and: false
                            };
                            if (this.columnX.length > 0) {
                                this.columnX.forEach((_x, index) => {
                                    if (data.data.administrationTeachVMS && data.data.administrationTeachVMS.length > 0) {
                                        let user = _.find(data.data.administrationTeachVMS, { 'classId': _x.prop, 'courseId': _cour.courseId });
                                        if (user) {
                                            row[_x.prop + '_' + _cour.courseId + 'ids'] = _.map(user.administrationTeacherVMS, 'userId');
                                            row[_x.prop + '_' + _cour.courseId + '_user'] = user.administrationTeacherVMS;
                                            row[_x.prop + '_' + _cour.courseId + '_show'] = false;
                                            row[_x.prop + '_' + _cour.courseId] = true;
                                        } else {
                                            row[_x.prop + '_' + _cour.courseId + 'ids'] = [];
                                            row[_x.prop + '_' + _cour.courseId] = false;
                                        }
                                    }
                                })
                                tableArr.push(row);
                            }
                        });
                        // console.log(tableArr);
                        this.tableData = tableArr;
                    } else {
                        this.tableData = [];
                    }
                }
            })
        },
        submitNewList() {
            this.selectTeacherIds = [this.selectUserTeacher];
            this.updataUser();
        },
        // 更新
        updataUser() {
            let obj = {
                termId: this.form.term,
                yearId: this.form.year,
                classId: this.currentClazzId,
                gradeId: this.params.gradeId,
                courseId: this.currentCourseId,
                unitId: this.currentUnitId,
                userIds: this.selectTeacherIds.join(',')
            }
            administrationTeach(obj).then((data) => {
                if (data.status > 1000) {
                    this.$notify({
                        title: '失败',
                        message: data.message,
                        type: 'error'
                    });
                } else {
                    if (data && data.data === 'success') {
                        this.$notify({
                            title: '成功',
                            message: '更新成功',
                            type: 'success'
                        });
                        this.refreshList();
                        this.dialogAddMore = false;
                        this.selectUserTeacher = '';
                    }
                }
            })
        },
        handlerCellClick(row, column, cell, event) {
            let oldShow = _.find(this.tableData, {
                [this.oldShowSelectKey]: true
            });
            if (oldShow && column.property + '_' + row.courseId + '_show' !== this.oldShowSelectKey) {
                oldShow[this.oldShowSelectKey] = false;
            }
            let tagName = event.target.tagName;
            this.currentClazzId = column.property;
            this.currentCourseId = row.courseId;
            this.selectTeacherId = '';
            this.selectTeacherIds = row[column.property + '_' + row.courseId + 'ids'];
            if (row[column.property + '_' + row.courseId + 'ids'].length === 0 && row[column.property + '_' + row.courseId] && tagName === 'DIV') {
                row[column.property + '_' + row.courseId + '_show'] = true;
                this.oldShowSelectKey = column.property + '_' + row.courseId + '_show';
            } else if (row[column.property + '_' + row.courseId + 'ids'].length > 0 && row[column.property + '_' + row.courseId] && tagName === 'SPAN' && this.codeList['btn_base_classteaching_del']) {
                this.$confirm('是否确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.selectTeacherIds = [];
                    this.updataUser();
                }).catch(() => {

                });
            }
            if (tagName === 'I' && event.target.className === 'fa fa-user-plus') {
                this.$SelectUsers({
                    unitType: 1,
                    selectUserType: 2,
                    userTypes: [2],
                    unitId: this.currentUnitId,
                    selectUserIds: this.selectTeacherIds,
                    // beforeClose: (selectUser, instance) => {
                    //     if (selectUser && selectUser.length > 2) {
                    //         this.$notify({
                    //             type: 'error',
                    //             message: '最多只能设置两名任课教师！'
                    //         });
                    //         return true;
                    //     }
                    // }
                }, (selectUser, instance) => {
                    let ids = _.map(selectUser, 'id');
                    let names = _.map(selectUser, 'realName');
                    this.selectTeacherIds = ids;
                    this.updataUser();
                    this.form.userNames = names.join('/');
                })
            }
        },
        importTeachers() {
            if (!this.currentUnitId) {
                this.$notify.info({
                    title: '提示',
                    message: '请选择组织'
                });
                return
            }
            if (this.columnX.length === 0) {
                this.$notify.info({
                    title: '提示',
                    message: '请选择有班级的年级导入'
                });
                return
            }
            if (!this.params.gradeId) {
                this.$notify.info({
                    title: '提示',
                    message: '请选择年级'
                });
                return
            }
            this.$router.push({ name: 'importTeacher', query: { currentNodeKey: this.currentNodeKey, ...this.params } });
        }
    }
}